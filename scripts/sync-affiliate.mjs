#!/usr/bin/env node
/**
 * 쿠팡 파트너스 상품·가격을 다시 긁어 src/data/affiliateLinks.ts 를 갱신한다.
 *
 *   node scripts/sync-affiliate.mjs          # 전체 재수집
 *   node scripts/sync-affiliate.mjs --dry    # 파일은 안 쓰고 결과만 출력
 *
 * 키는 ~/dev/A-factory/affiliate-links.json 의 coupang 블록에서 읽는다.
 * 저장소에 키를 두지 않는다 — 이 스크립트는 로컬 맥에서만 돈다.
 *
 * 쿠팡 API는 정가·할인율을 주지 않는다. 그래서 "몇 % 할인"은 만들지 않고,
 * 상품명에서 총 수량을 파싱해 1정당 단가만 계산한다.
 */
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

const ROOT = path.resolve(import.meta.dirname, "..");
const DRY = process.argv.includes("--dry");
const IHERB_RCODE = "NHQ7658";
const HOST = "https://api-gateway.coupang.com";
const B = "/v2/providers/affiliate_open_api/apis/openapi";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const secrets = JSON.parse(
  fs.readFileSync(path.join(os.homedir(), "dev/A-factory/affiliate-links.json"), "utf8"),
).coupang;
const ACCESS = process.env.COUPANG_ACCESS_KEY || secrets.access_key;
const SECRET = process.env.COUPANG_SECRET_KEY || secrets.secret_key;
if (!ACCESS || !SECRET) {
  console.error("쿠팡 키를 찾지 못했습니다.");
  process.exit(1);
}

const keywords = JSON.parse(fs.readFileSync(path.join(ROOT, "scripts/keywords.json"), "utf8"));
const tokens = JSON.parse(fs.readFileSync(path.join(ROOT, "scripts/tokens.json"), "utf8"));
const deny = JSON.parse(fs.readFileSync(path.join(ROOT, "scripts/deny.json"), "utf8"));
const alt = JSON.parse(fs.readFileSync(path.join(ROOT, "scripts/alt.json"), "utf8"));

function authorization(method, apiPath, query) {
  const dt = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "").slice(2);
  const sig = crypto.createHmac("sha256", SECRET).update(dt + method + apiPath + query).digest("hex");
  return `CEA algorithm=HmacSHA256, access-key=${ACCESS}, signed-date=${dt}, signature=${sig}`;
}

async function search(keyword, subId) {
  const p = `${B}/products/search`;
  const query = new URLSearchParams({ keyword, limit: "10", subId }).toString();
  const res = await fetch(`${HOST}${p}?${query}`, {
    headers: { Authorization: authorization("GET", p, query), "Content-Type": "application/json;charset=UTF-8" },
  });
  if (!res.ok) return { err: `HTTP ${res.status}` };
  const j = await res.json();
  return j.rCode === "0" ? { items: j.data?.productData ?? [] } : { err: `rCode ${j.rCode}` };
}

async function deeplink(urls, subId) {
  const p = `${B}/v1/deeplink`;
  const res = await fetch(`${HOST}${p}`, {
    method: "POST",
    headers: { Authorization: authorization("POST", p, ""), "Content-Type": "application/json;charset=UTF-8" },
    body: JSON.stringify({ coupangUrls: urls, subId }),
  });
  if (!res.ok) return {};
  const j = await res.json();
  return Object.fromEntries((j.data ?? []).map((d) => [d.originalUrl, d.shortenUrl]));
}

/* ---------- 관련성 판정 ---------- */
const OK_CATEGORY = new Set(["헬스/건강식품", "식품", "스포츠/레저"]);
const BAD_NAME =
  /(마카펜|마커|형광펜|볼펜|붓|한복|비료|재배|식물칼슘|관주|농자재|사료|관상어|패드|미트|정육|공캡슐|약통|실리카겔|건전지|배터리|장난감|의류|신발|가방|디캔터|담요|거울|주방|도서|출판)/;
const NEG_AFTER = /(없음|무첨가|프리\s|-\s*free)/i;
const norm = (s) => s.replace(/[\s\-_.]/g, "").toUpperCase();

function score(p, must, blocked, queryIndex) {
  if (!p.productName || !p.productUrl) return -1;
  if (BAD_NAME.test(p.productName)) return -1;
  if (!OK_CATEGORY.has(p.categoryName)) return -1;
  if (blocked.some((b) => p.productName.toUpperCase().includes(b.toUpperCase()))) return -1;
  const n = norm(p.productName);
  const ti = must.findIndex((t) => n.includes(norm(t)));
  if (ti < 0) return -1;
  const hit = must[ti];
  const idx = p.productName.toUpperCase().indexOf(hit.toUpperCase());
  if (idx >= 0 && NEG_AFTER.test(p.productName.slice(idx, idx + hit.length + 8))) return -1;

  let s = [40, 26, 14, 6][Math.min(ti, 3)];
  s += Math.max(0, 12 - (p.rank ?? 10));
  s += queryIndex === 0 ? 8 : 0;
  if (p.categoryName === "헬스/건강식품") s += 5;
  if (p.isRocket) s += 6;
  if (p.isFreeShipping) s += 2;
  if (/(정|캡슐|타블렛|소프트젤|파우더|분말|스틱|포)/.test(p.productName)) s += 4;
  return s;
}

/* ---------- 정당 단가 ---------- */
const UNITS = [
  [/(\d[\d,]*)\s*정/, "정"], [/(\d[\d,]*)\s*캡슐/, "정"], [/(\d[\d,]*)\s*타블렛/, "정"],
  [/(\d[\d,]*)\s*소프트젤/, "정"], [/(\d[\d,]*)\s*p\b/, "포"], [/(\d[\d,]*)\s*포/, "포"],
  [/(\d[\d,]*)\s*회분/, "회"],
];
const MULT = /(\d+)\s*개(?:입)?\b|(\d+)\s*박스|(\d+)\s*병|(\d+)\s*통|(\d+)\s*세트/g;

function unitPrice(name, price) {
  if (!price) return null;
  let count = null, unit = null;
  for (const [re, u] of UNITS) {
    const m = name.match(re);
    if (m) { count = Number(m[1].replace(/,/g, "")); unit = u; break; }
  }
  if (!count) return null;
  let mult = 1;
  for (const m of name.matchAll(MULT)) {
    const v = Number(m.slice(1).find(Boolean));
    if (v > 1 && v <= 20) mult = Math.max(mult, v);
  }
  const totalUnits = count * mult;
  const perUnit = Math.round(price / totalUnits);
  if (!totalUnits || perUnit <= 0 || perUnit > 100000) return null;
  return { perUnit, unit, totalUnits };
}

/* ---------- 수집 ---------- */
const ids = Object.keys(keywords);
const results = {};
let failed = 0;

for (let i = 0; i < ids.length; i++) {
  const id = ids[i];
  const k = keywords[id];
  const subId = `nutrifit-${id}`.replace(/[^a-zA-Z0-9-]/g, "").slice(0, 50);
  const must = tokens[id] ?? [];
  const blocked = deny[id] ?? [];
  let best = null, usedKw = k.ko;

  const queries = [k.ko, ...(alt[id] ?? [])];
  for (let qi = 0; qi < queries.length; qi++) {
    const r = await search(queries[qi], subId);
    await sleep(1100);
    if (r.err) continue;
    const ranked = r.items
      .map((p) => ({ p, s: score(p, must, blocked, qi) }))
      .filter((x) => x.s >= 0)
      .sort((a, b) => b.s - a.s);
    if (ranked[0]) { best = ranked[0].p; usedKw = queries[qi]; break; }
  }

  const searchUrl = `https://www.coupang.com/np/search?q=${encodeURIComponent(usedKw)}`;
  let productUrl = null, canonical = null;
  if (best) {
    const q = new URL(best.productUrl).searchParams;
    const item = q.get("itemId"), vendor = q.get("vendorItemId");
    const base = `https://www.coupang.com/vp/products/${q.get("pageKey") ?? best.productId}`;
    canonical = item && vendor ? `${base}?itemId=${item}&vendorItemId=${vendor}` : base;
  }
  const short = await deeplink(canonical ? [canonical, searchUrl] : [searchUrl], subId);
  await sleep(1100);
  productUrl = canonical ? short[canonical] ?? best.productUrl : null;

  if (!best) failed++;
  results[id] = {
    number: k.number,
    coupang: best && {
      productId: String(best.productId),
      name: best.productName,
      price: typeof best.productPrice === "number" ? best.productPrice : null,
      imageUrl: best.productImage ?? null,
      url: productUrl,
      isRocket: Boolean(best.isRocket),
      isFreeShipping: Boolean(best.isFreeShipping),
      unitPrice: unitPrice(best.productName, best.productPrice),
    },
    coupangSearchUrl: short[searchUrl] ?? searchUrl,
    coupangKeyword: usedKw,
    iherbUrl: `https://kr.iherb.com/search?kw=${encodeURIComponent(k.en)}&rcode=${IHERB_RCODE}`,
    iherbKeyword: k.en,
  };
  process.stdout.write(`${String(i + 1).padStart(3)}/${ids.length} ${id.padEnd(28)} ${best ? "OK" : "상품없음"}\n`);
}

console.log(`\n상품 확보 ${ids.length - failed}/${ids.length}`);
if (DRY) process.exit(0);

/* ---------- 파일 쓰기 ---------- */
const today = new Date().toISOString().slice(0, 10);
const q = (v) => JSON.stringify(v);
const rows = Object.entries(results)
  .sort((a, b) => a[1].number - b[1].number)
  .map(([id, v]) => {
    const c = v.coupang;
    const up = c?.unitPrice
      ? `\n      unitPrice: { perUnit: ${c.unitPrice.perUnit}, unit: ${q(c.unitPrice.unit)}, totalUnits: ${c.unitPrice.totalUnits} },`
      : "";
    const cp = c
      ? `{\n      productId: ${q(c.productId)},\n      name: ${q(c.name)},\n      price: ${c.price ?? "null"},\n      imageUrl: ${c.imageUrl ? q(c.imageUrl) : "null"},\n      url: ${q(c.url)},\n      isRocket: ${c.isRocket},\n      isFreeShipping: ${c.isFreeShipping},${up}\n    }`
      : "null";
    return `  ${q(id)}: {\n    coupang: ${cp},\n    coupangSearchUrl: ${q(v.coupangSearchUrl)},\n    coupangKeyword: ${q(v.coupangKeyword)},\n    iherbUrl: ${q(v.iherbUrl)},\n    iherbKeyword: ${q(v.iherbKeyword)},\n  },`;
  });

const target = path.join(ROOT, "src/data/affiliateLinks.ts");
const current = fs.readFileSync(target, "utf8");
const MARK = "export const affiliateOffers: Record<string, AffiliateOffer> = {\n";
const head = current.slice(0, current.indexOf(MARK) + MARK.length).replace(
  /export const PRICE_COLLECTED_AT = "[^"]*";/,
  `export const PRICE_COLLECTED_AT = "${today}";`,
);
const tail = current.slice(current.indexOf("\n};\n", current.indexOf(MARK)));
fs.writeFileSync(target, head + rows.join("\n") + tail);
console.log(`src/data/affiliateLinks.ts 갱신 (수집일 ${today})`);
