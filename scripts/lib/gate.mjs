// Content gate (R38): shape, fact lock, compliance check, NF-md conversion and photo collection for one document.
// Pure apart from the caller's inputs; scripts/gate.mjs does the file reading and the CLI wrapper.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'

import { checkDoc, loadRules } from './check.mjs'
import { sameFacts } from './factlock.mjs'
import { NfmdError, nfmdToLexical } from './nfmd.mjs'
import { judgeSuspects } from './suspects.mjs'

export const NF_FIELDS = { post: ['body'], nutrient: ['deficiency', 'excess', 'timing', 'howToChoose'], hub: ['body'] }
export const PHOTO_KEY = /^(nutrient|body|life|area|post)-[a-z0-9-]+-\d+$/

// shortcut: order/picks/publishedAt/updatedAtDisplay are assigned after writing (schedule, Task 22), so they are not required here.
const S = 'string'
const REQUIRED = {
  post: { slug: S, title: S, seoTitle: S, description: S, category: S, primaryKeyword: S, hubs: 'array', keyPoints: 'array', body: S, faq: 'array', sources: 'array', keywords: 'array' },
  nutrient: { slug: S, name: S, aliases: 'array', group: S, summary: S, primaryKeyword: S, verdict: 'object', officialClaims: 'array', intake: 'object', deficiency: S, excess: S, timing: S, interactions: 'object', foods: 'array', howToChoose: S, faq: 'array', sources: 'array', keywords: 'array' },
  hub: { kind: S, slug: S, name: S, summary: S, primaryKeyword: S, body: S, nutrients: 'array', posts: 'array', faq: 'array', sources: 'array', keywords: 'array' },
}
const typeOk = (v, t) => (t === 'array' ? Array.isArray(v) : t === 'object' ? !!v && typeof v === 'object' && !Array.isArray(v) : typeof v === t && v !== '')

const issue = (code, where, text, severity = 'error') => ({ code, severity, where, text })

export function shapeIssues(kind, doc) {
  const out = []
  const bad = (where, text) => out.push(issue('SHAPE', where, text))
  for (const [field, t] of Object.entries(REQUIRED[kind])) if (!typeOk(doc[field], t)) bad(field, `${field}이(가) 없거나 형식이 틀려요(${t})`)
  if (typeof doc.slug === 'string' && !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(doc.slug)) bad('slug', `slug는 영문 소문자 kebab이어야 해요: ${doc.slug}`)
  if (kind === 'post' && doc.category === 'symptom' && !doc.area) bad('area', 'symptom 글에는 area가 필요해요')
  if (kind === 'hub' && !['body', 'life', 'area'].includes(doc.kind)) bad('kind', `hub kind는 body|life|area예요: ${doc.kind}`)
  for (const f of ['publishedAt', 'updatedAtDisplay']) {
    const v = doc[f]
    if (v != null && (typeof v !== 'string' || !/^\d{4}-\d\d-\d\d(T[\d:.]+(Z|[+-]\d\d:?\d\d)?)?$/.test(v) || Number.isNaN(Date.parse(v)))) bad(f, `${f}는 ISO 날짜여야 해요: ${v}`)
  }
  return out
}

const factIssues = (kind, draft, final) => {
  const pairs = NF_FIELDS[kind].map((f) => [f, draft[f] ?? '', final[f] ?? ''])
  // Walk the longer list so a dropped (or added) FAQ item compares against '' and reports its facts.
  const n = Math.max(draft.faq?.length ?? 0, final.faq?.length ?? 0)
  for (let i = 0; i < n; i++) pairs.push([`faq[${i}].a`, draft.faq?.[i]?.a ?? '', final.faq?.[i]?.a ?? ''])
  return pairs.flatMap(([where, a, b]) => {
    const r = sameFacts(String(a), String(b))
    return r.ok ? [] : [issue('FACTS_CHANGED', where, `빠짐: ${r.missing.join(' ') || '-'} / 늘어남: ${r.added.join(' ') || '-'}`)]
  })
}

// Used photo keys with captions from a converted Lexical tree (photo blocks can sit inside callouts).
const photosIn = (node, out) => {
  if (Array.isArray(node)) node.forEach((n) => photosIn(n, out))
  else if (node && typeof node === 'object') {
    if (node.type === 'block' && node.fields?.blockType === 'photo') out.push({ key: node.fields.photo, caption: node.fields.caption })
    Object.values(node).forEach((v) => photosIn(v, out))
  }
}

// env: { links, picks:Set, nutrients:Set, cards:Set<href> }; jev: false to skip, else options for judgeSuspects ({ client }).
export async function runGate({ kind, draft, final, env, jev = {} }) {
  const issues = shapeIssues(kind, final)
  if (issues.length) return { ok: false, slug: final.slug ?? draft.slug ?? '', issues, photos: [] }

  issues.push(...factIssues(kind, draft, final))

  const doc = { ...final, kind: kind === 'post' ? 'post' : final.kind }
  let checked = checkDoc(doc, loadRules({ links: env.links }))
  if (jev) checked = await judgeSuspects(doc, checked, jev)
  issues.push(...checked.map(({ sentence, ...i }) => i))

  const ctx = {
    picks: env.picks,
    nutrients: env.nutrients,
    photos: { has: (k) => PHOTO_KEY.test(k) },
    cards: new Map([...env.cards].map((href) => [href, { title: '', summary: '', image: '' }])),
  }
  const photos = []
  for (const field of NF_FIELDS[kind]) {
    try {
      photosIn(nfmdToLexical(final[field] ?? '', { ...ctx, idPrefix: `${field}-` }), photos)
    } catch (e) {
      if (!(e instanceof NfmdError)) throw e
      issues.push(issue('CONVERT', `${field}:${e.line}`, e.message))
    }
  }
  const unique = photos.filter((p, i) => photos.findIndex((q) => q.key === p.key) === i)
  return { ok: !issues.some((i) => i.severity === 'error'), slug: final.slug, issues, photos: unique }
}

// Photo manifest (jsonl of { slug, key, caption }): drop this slug's old lines, append the new ones.
// A line that does not parse is kept as is and reported as a warn issue.
export function updateManifest(file, slug, photos) {
  const warns = []
  const kept = (existsSync(file) ? readFileSync(file, 'utf8').split(/\r?\n/) : []).filter(Boolean).filter((line, i) => {
    try {
      return JSON.parse(line).slug !== slug
    } catch {
      warns.push(issue('MANIFEST', `${path.basename(file)}:${i + 1}`, '사진 목록의 깨진 줄은 건너뛰고 그대로 뒀어요', 'warn'))
      return true
    }
  })
  mkdirSync(path.dirname(file), { recursive: true })
  writeFileSync(file, [...kept, ...photos.map((p) => JSON.stringify({ slug, key: p.key, caption: p.caption }))].join('\n') + '\n')
  return warns
}
