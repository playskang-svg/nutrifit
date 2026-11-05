// Content gate CLI (R38): node scripts/gate.mjs --kind post|nutrient|hub --draft <writer.json> --final <humanized.json> [--work <dir>] [--no-jev]
// Prints one JSON line { ok, slug, issues, photos } and exits 0 when ok, 1 otherwise.
import { appendFileSync, existsSync, mkdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseArgs } from 'node:util'

import { runGate } from './lib/gate.mjs'

const { values: a } = parseArgs({
  options: { kind: { type: 'string' }, draft: { type: 'string' }, final: { type: 'string' }, work: { type: 'string', default: 'C:/Users/sgk76/ego/nutrifit-20261105' }, 'no-jev': { type: 'boolean' } },
})
const json = (file, fallback) => (existsSync(file) ? JSON.parse(readFileSync(file, 'utf8')) : fallback)
const out = (result) => {
  console.log(JSON.stringify(result))
  process.exit(result.ok ? 0 : 1)
}
const fail = (code, text) => out({ ok: false, slug: '', issues: [{ code, severity: 'error', where: '-', text }], photos: [] })

if (!['post', 'nutrient', 'hub'].includes(a.kind) || !a.draft || !a.final) fail('USAGE', '--kind post|nutrient|hub --draft <file> --final <file>')

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const work = a.work

let result
try {
  const workLinks = path.join(work, 'coupang/links.json')
  const links = json(existsSync(workLinks) ? workLinks : path.join(root, 'data/links.json'), [])
  const picks = json(path.join(work, 'coupang/picks.json'), [])
  const hubList = json(path.join(work, 'briefs/hub-list.json'), {})
  const targets = json(path.join(work, 'briefs/link-targets.json'), {})
  const nutrients = (hubList.nutrients ?? []).map((n) => n.slug)

  const pickKeys = new Set([...picks.map((p) => p.id), ...nutrients.flatMap((s) => [`auto-${s}`, `search-${s}`])])
  const cards = new Set(['/symptoms'])
  for (const list of Object.values(targets).filter(Array.isArray)) for (const t of list) if (t.url) cards.add(t.url)
  for (const h of hubList.area ?? []) cards.add(`/symptoms/${h.slug}`)
  // sise links: every sise.pinda.kr address in the foods file (data/ first, else research/).
  const siseFile = [path.join(root, 'data/sise-foods.json'), path.join(work, 'research/sise-links.json')].find(existsSync)
  if (siseFile) for (const u of readFileSync(siseFile, 'utf8').match(/https:\/\/sise\.pinda\.kr\/[^\s"'\\)]*/g) ?? []) cards.add(u)

  const draft = JSON.parse(readFileSync(a.draft, 'utf8'))
  const final = JSON.parse(readFileSync(a.final, 'utf8'))
  result = await runGate({ kind: a.kind, draft, final, env: { links, picks: pickKeys, nutrients: new Set(nutrients), cards }, jev: a['no-jev'] ? false : {} })
} catch (e) {
  fail('INPUT', e.message)
}

if (result.photos.length) {
  const manifest = path.join(work, 'drafts/_photos.jsonl')
  const seen = new Set(existsSync(manifest) ? readFileSync(manifest, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l).key) : [])
  const fresh = result.photos.filter((p) => !seen.has(p.key))
  if (fresh.length) {
    mkdirSync(path.dirname(manifest), { recursive: true })
    appendFileSync(manifest, fresh.map((p) => JSON.stringify({ ...p, slug: result.slug })).join('\n') + '\n')
  }
}
out(result)
