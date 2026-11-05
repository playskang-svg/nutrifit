// Content gate for posts, nutrient pages and hubs: rules come from data/compliance/*.json (WRITE-BRIEF 5·6·12·13·14·18장).
// Each Issue says where it is (field, or body:<line>) so a writer or Jev can find the sentence.
import { readFileSync } from 'node:fs'

import { AID } from './verify.mjs'

const DATA = new URL('../../data/compliance/', import.meta.url)
const read = (file) => JSON.parse(readFileSync(new URL(file, DATA), 'utf8'))

// `links` is the issued Coupang link list (work-folder coupang/links.json now, data/links.json later).
export const loadRules = ({ links = [] } = {}) => ({ ul: read('ul.json'), claims: read('claims.json'), forbidden: read('forbidden.json'), links })

const any = (list) => new RegExp(list.join('|'))
const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const sentencesOf = (text) => text.split(/(?<=[.?!])\s+/).map((s) => s.trim()).filter(Boolean)
const ending = (s) => s.replace(/[^가-힣]/g, '').slice(-2)
const MASS = { g: 1e6, mg: 1e3, μg: 1 }
const AMOUNT = /(\d{1,3}(?:,\d{3})+|\d+(?:\.\d+)?)\s?(mg|μg|µg|mcg|IU|g)(?![A-Za-z])/g
const FOOD_100G = /100\s?g\s?(기준|당|에)/
const COUPANG = /(?:https?:\/\/)?(?:[\w-]+\.)*coupang\.com[^\s)'"]*/g
const SHORT = /^(?:https?:\/\/)?link\.coupang\.com\/a\/([A-Za-z0-9]+)$/

function compile(rules) {
  const f = rules.forbidden
  const claimTexts = rules.claims.items.flatMap((i) => [...i.claims, ...i.claimsSplit])
  // One-syllable names (철, 인) would match inside other words, so they are left out.
  const nutrients = Object.values(rules.ul.items)
    .map((n) => ({ ...n, names: n.names.filter((x) => x.replace(/\s/g, '').length > 1) }))
    .filter((n) => n.ul != null && n.names.length)
    .map((n) => ({ ...n, re: new RegExp(n.names.map(escape).join('|'), 'g') }))
  return {
    phrases: f.phrases.map((p) => ({ re: new RegExp(p.pattern), reason: p.reason })),
    claimRe: new RegExp([...new Set(claimTexts)].sort((a, b) => b.length - a.length).map(escape).join('|'), 'g'),
    care: new RegExp(f.careTreatment, 'g'),
    disease: any(f.diseases),
    effect: new RegExp(f.effects),
    cure: new RegExp(f.cure),
    subject: any(f.subjects.map(escape)),
    experience: any(f.experience),
    professional: any(f.professional),
    hedge: new RegExp(f.hedge, 'g'),
    celeb: any(f.celebs.map(escape)),
    drug: any([...f.drugs.brands.map(escape), ...f.drugs.patterns]),
    badSources: new Set(f.badSources.map((u) => u.replace(/\/$/, ''))),
    nutrients,
  }
}

// Lines of the NF-markdown body, with paragraphs (joined text lines, also inside callouts) picked out.
function parseBody(body) {
  const lines = body.split('\n').map((raw, i) => ({ text: raw.trim(), line: i + 1 }))
  const paragraphs = []
  let current = null
  for (const l of lines) {
    const t = l.text
    const prose = t && !/^(#|- |\d+\. |> |\||표:|\{\{|:::|---)/.test(t)
    if (prose && current) current.text += ` ${t}`
    else if (prose) paragraphs.push((current = { text: t, line: l.line }))
    // Blank lines end a paragraph but not a run of sentences; any other block ends both.
    else {
      current = null
      if (t) paragraphs.push({ break: true })
    }
  }
  return { lines, paragraphs }
}

function ulIssues(c, text) {
  if (FOOD_100G.test(text)) return []
  const names = c.nutrients.flatMap((n) => [...text.matchAll(n.re)].map((m) => ({ n, at: m.index })))
  if (!names.length) return []
  const out = []
  for (const m of text.matchAll(AMOUNT)) {
    // The amount belongs to the nearest nutrient named before it, else the first one after.
    const owner = names.filter((x) => x.at < m.index).sort((a, b) => b.at - a.at)[0]?.n ?? names.sort((a, b) => a.at - b.at)[0].n
    const unit = m[2].replace(/µg|mcg/, 'μg')
    const value = Number(m[1].replace(/,/g, ''))
    const base = owner.unit.split(' ')[0]
    let amount = null
    if (unit === 'IU') amount = owner.iuPerUnit ? value / owner.iuPerUnit : null
    else if (MASS[base]) amount = (value * MASS[unit]) / MASS[base]
    if (amount != null && amount > owner.ul) out.push(`${owner.name} ${m[0]}: 상한 ${owner.ul.toLocaleString('en-US')}${base}(${owner.ulEdition ?? owner.edition})`)
  }
  return out
}

export function checkDoc(doc, rules) {
  const c = compile(rules)
  const issues = []
  const add = (code, where, text, severity = 'error', sentence) => issues.push({ code, severity, where, text, ...(sentence && { sentence }) })
  const isPost = doc.kind === 'post'
  const title = doc.title ?? doc.name ?? ''
  const body = doc.body ?? [doc.deficiency, doc.excess, doc.timing, doc.howToChoose].filter(Boolean).join('\n\n')
  const faq = doc.faq ?? []
  const sources = doc.sources ?? []
  const { lines, paragraphs } = parseBody(body)

  // Every reader-facing string, one entry per line or field.
  const texts = [
    { where: 'title', text: title },
    { where: 'seoTitle', text: doc.seoTitle ?? '' },
    { where: 'description', text: doc.description ?? '' },
    ...lines.map((l) => ({ where: `body:${l.line}`, text: l.text })),
    ...faq.flatMap((f, i) => [
      { where: `faq[${i}].q`, text: f.q ?? '' },
      { where: `faq[${i}].a`, text: f.a ?? '' },
    ]),
  ].filter((t) => t.text)

  for (const { where, text } of texts) {
    for (const s of sentencesOf(text)) {
      const plain = s.replace(c.claimRe, '').replace(c.care, '')
      const phrase = c.phrases.find((p) => p.re.test(plain))
      const product = c.subject.test(plain)
      if (phrase) add('FORBIDDEN_CLAIM', where, `${s} — ${phrase.reason}`, 'error', s)
      else if (product && c.cure.test(plain)) add('FORBIDDEN_CLAIM', where, `${s} — 제품·성분에 치료 표현(별표1 제1호)`, 'error', s)
      else if (product && c.disease.test(plain) && c.effect.test(plain)) add('FORBIDDEN_CLAIM', where, `${s} — 질병·증상과 효능 연결(별표1 제1호)`, 'error', s)
      if (c.experience.test(s)) add('EXPERIENCE_TONE', where, s)
      if (c.professional.test(s)) add('PROFESSIONAL_ENDORSE', where, s)
      if (c.drug.test(s)) add('DRUG_MENTION', where, s)
      if (c.celeb.test(s)) add('CELEB_NAME', where, s)
      for (const hit of ulIssues(c, s)) add('OVER_UL', where, hit, 'warn', s)
    }
  }

  // Paragraph length and ending runs: body paragraphs in order, then each FAQ answer on its own.
  const runs = [paragraphs, ...faq.map((f, i) => [{ text: f.a ?? '', where: `faq[${i}].a` }])]
  for (const run of runs) {
    let last = null
    let count = 0
    for (const p of run) {
      if (p.break) {
        last = null
        continue
      }
      const where = p.where ?? `body:${p.line}`
      const ss = sentencesOf(p.text)
      if (ss.length >= 4) add('PARA_TOO_LONG', where, `${ss.length}문장: ${p.text.slice(0, 40)}…`)
      for (const s of ss) {
        const end = ending(s)
        count = end.length === 2 && end === last ? count + 1 : 1
        last = end.length === 2 ? end : null
        if (count === 3) add('SAME_ENDING_X3', where, `'${end}' 세 번: ${s}`)
      }
    }
  }

  if (isPost) {
    const chars = lines
      .filter((l) => !/^(\{\{|:::|\|\s*-)/.test(l.text))
      .map((l) => l.text.replace(/[#*=|>]|^[-\d.]+\s/g, ''))
      .join('')
      .replace(/\s/g, '').length
    if (chars < 2000) add('BODY_TOO_SHORT', 'body', `공백 제외 ${chars}자(2,000자 이상)`)
  }
  if (faq.length < 3) add('FAQ_TOO_FEW', 'faq', `${faq.length}개(3개 이상)`)

  if (!sources.length) add('NO_SOURCE', 'sources', '출처가 없어요')
  sources.forEach((s, i) => {
    let url = null
    try {
      url = new URL(s.url)
    } catch {}
    const bare = String(s.url ?? '').replace(/\/$/, '')
    if (!url) add('NO_SOURCE', `sources[${i}]`, `주소가 아니에요: ${s.url}`)
    else if ((url.pathname === '/' || url.pathname === '') && !url.search) add('NO_SOURCE', `sources[${i}]`, `홈페이지예요: ${s.url}`)
    else if (c.badSources.has(bare)) add('NO_SOURCE', `sources[${i}]`, `목록·죽은 주소예요: ${s.url}`)
  })

  if (doc.title != null || doc.seoTitle != null) {
    const key = (doc.primaryKeyword ?? '').replace(/\s/g, '')
    for (const field of ['title', 'seoTitle']) {
      const value = doc[field]
      if (value == null) continue
      if (!key || !value.slice(0, 25).replace(/\s/g, '').includes(key)) add('TITLE_KEYWORD', field, `'${doc.primaryKeyword ?? ''}'이 앞 25자에 없어요: ${value}`)
    }
  }
  if (isPost || doc.description != null) {
    const n = (doc.description ?? '').length
    if (n < 80 || n > 160) add('DESC_LENGTH', 'description', `${n}자(80~160자)`)
  }

  // Links, iHerb and placeholders: every field a reader sees, sources included.
  const all = [...texts, ...sources.map((s, i) => ({ where: `sources[${i}]`, text: `${s.label ?? s.title ?? ''} ${s.url ?? ''}` }))]
  const linked = new Map(rules.links.map((l) => [l.url.replace(/^https?:\/\//, ''), l]))
  for (const { where, text } of all) {
    for (const [hit] of text.matchAll(COUPANG)) {
      const short = SHORT.exec(hit)
      const entry = short && linked.get(hit.replace(/^https?:\/\//, ''))
      if (!short) add('BAD_LINK', where, `쿠팡 단축 링크가 아니에요: ${hit}`)
      else if (!entry) add('BAD_LINK', where, `links.json에 없는 링크예요: ${hit}`)
      else if (entry.lptag !== AID) add('BAD_LINK', where, `lptag ${entry.lptag}: ${AID}가 아니에요`)
    }
    // The old site's other Coupang account and its retired iHerb referral (verify.mjs BANNED).
    if (/AF5563346/.test(text)) add('BAD_LINK', where, '다른 파트너 ID AF5563346')
    if (/iherb|아이허브|rcode|NHQ7658/i.test(text)) add('IHERB', where, text.slice(0, 60))
    if (/〈[^〉]*〉/.test(text)) add('PLACEHOLDER', where, text.match(/〈[^〉]*〉/)[0])
  }
  // Bare URLs in reader text; site-internal links and sources are fine.
  for (const { where, text } of texts) {
    for (const [hit] of text.matchAll(/https?:\/\/[^\s)]+/g)) {
      if (!/^https:\/\/nutrifit\.kr(\/|$)/.test(hit)) add('RAW_URL', where, hit)
    }
  }

  const hedges = texts.reduce((n, t) => n + (t.text.match(c.hedge)?.length ?? 0), 0)
  if (hedges > 2) add('HEDGE_OVERUSE', 'body', `'알려져 있습니다' ${hedges}번(2번까지)`)

  if (doc.category === 'symptom') {
    const box = lines.find((l) => /^:::\s*warn\s+이럴 땐 바로 병원/.test(l.text))
    const firstPick = lines.find((l) => /^\{\{pick:/.test(l.text))
    if (!box) add('RED_FLAG_FIRST', 'body', "'::: warn 이럴 땐 바로 병원' 상자가 없어요")
    else if (firstPick && firstPick.line < box.line) add('RED_FLAG_FIRST', `body:${firstPick.line}`, '상품 자리가 병원 안내 상자보다 앞에 있어요')
  }
  if (doc.redFlag === 'urgent') {
    for (const l of lines.filter((l) => /^\{\{(pick:|banner\}\})/.test(l.text))) add('URGENT_NO_PICK', `body:${l.line}`, l.text)
  }
  if (doc.productNeeds !== undefined) add('PRODUCT_NEEDS_IN_DATA', 'productNeeds', 'productNeeds는 초안 전용이에요(Task 22에서 지움)', 'warn')

  return issues
}
