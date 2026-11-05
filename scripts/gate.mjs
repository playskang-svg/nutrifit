// Content gate CLI (R38): node scripts/gate.mjs --kind post|nutrient|hub --draft <writer.json> --final <humanized.json> [--work <dir>] [--no-jev]
// Prints one JSON line { ok, slug, issues, photos }; exit code 0 when ok, 1 otherwise. Writes <work>/drafts/_photos.jsonl only when ok.
import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseArgs } from 'node:util'

import { runGate, updateManifest } from './lib/gate.mjs'

const { values: a } = parseArgs({
  options: { kind: { type: 'string' }, draft: { type: 'string' }, final: { type: 'string' }, work: { type: 'string', default: 'C:/Users/sgk76/ego/nutrifit-20261105' }, 'no-jev': { type: 'boolean' } },
})
const json = (file, fallback) => (existsSync(file) ? JSON.parse(readFileSync(file, 'utf8')) : fallback)
const out = (result) => {
  console.log(JSON.stringify(result))
  process.exitCode = result.ok ? 0 : 1 // not process.exit: lets stdout flush on Windows pipes
}
const fail = (code, text) => out({ ok: false, slug: '', issues: [{ code, severity: 'error', where: '-', text }], photos: [] })

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const work = a.work

const run = async () => {
  if (!['post', 'nutrient', 'hub'].includes(a.kind) || !a.draft || !a.final) return fail('USAGE', '--kind post|nutrient|hub --draft <file> --final <file>')
  const required = ['briefs/hub-list.json', 'briefs/link-targets.json', 'coupang/picks.json']
  const missing = required.filter((f) => !existsSync(path.join(work, f)))
  if (missing.length) return fail('INPUT', `--work(${work})에 필요한 파일이 없어요: ${missing.join(', ')}`)

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
    return fail('INPUT', e.message)
  }

  if (result.ok) result.issues.push(...updateManifest(path.join(work, 'drafts/_photos.jsonl'), result.slug, result.photos))
  out(result)
}
await run()
