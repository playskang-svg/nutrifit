import { allPosts } from "../src/content/posts";
import { allPages } from "../src/content/pages";
import { renderMarkdown } from "../src/lib/markdown";

/** 독자가 실제로 화면에서 읽는 글자 수. 표·콜아웃 안의 글까지 포함한다. */
function visibleChars(md: string): { total: number; noSpace: number } {
  const text = renderMarkdown(md)
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return { total: text.length, noSpace: text.replace(/\s/g, "").length };
}

const TARGET = 2000; // 공백 제외 기준
const rows: [string, number, number, string][] = [];
for (const p of allPosts) {
  // 화면에는 요약·핵심요약·FAQ도 함께 나온다. 한 페이지의 실제 분량은 이 전부다.
  const extra = [p.summary, ...p.keyPoints, ...(p.faq ?? []).flatMap((f) => [f.question, f.answer])].join(" ");
  const body = visibleChars(p.body);
  const page = body.noSpace + extra.replace(/\s/g, "").length;
  rows.push([p.slug, body.noSpace, page, page >= TARGET ? "OK" : "부족"]);
}
rows.sort((a, b) => a[2] - b[2]);
console.log("글 (공백 제외)".padEnd(38), "본문".padStart(7), "페이지전체".padStart(10), "  판정");
console.log("-".repeat(70));
for (const [slug, b, t, v] of rows)
  console.log(slug.padEnd(38), String(b).padStart(7), String(t).padStart(10), "  " + v);

console.log("\n정책 페이지 (공백 제외)");
for (const pg of allPages) {
  const c = visibleChars(pg.body);
  console.log("  " + pg.slug.padEnd(12), String(c.noSpace).padStart(6));
}
const short = rows.filter((r) => r[3] === "부족");
console.log(`\n기준 ${TARGET}자 미달: ${short.length}편`);
