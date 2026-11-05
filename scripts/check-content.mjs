// Runs checkDoc over content JSON files or folders and prints each issue, then counts per code.
// Run: node scripts/check-content.mjs <file|folder>... [--links coupang/links.json] [--out baseline.json] [--no-jev]
// Suspect sentences (FORBIDDEN_CLAIM, OVER_UL) go to Jev; --no-jev keeps them as raw errors (offline).
// Old posts (old/posts) are read as they are: faq {question, answer} and keywords[0] as the primary keyword.
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { basename, join } from 'node:path'

import { checkDoc, loadRules } from './lib/check.mjs'
import { judgeSuspects } from './lib/suspects.mjs'

const args = process.argv.slice(2)
const flag = (name) => {
  const i = args.indexOf(name)
  return i < 0 ? null : args.splice(i, 2)[1]
}
const noJev = args.includes('--no-jev')
if (noJev) args.splice(args.indexOf('--no-jev'), 1)
const out = flag('--out')
const linksPath = flag('--links') ?? (existsSync('data/links.json') ? 'data/links.json' : null)
const rules = loadRules({ links: linksPath ? JSON.parse(readFileSync(linksPath, 'utf8')) : [] })

const files = args.flatMap((p) =>
  statSync(p).isDirectory() ? readdirSync(p).filter((f) => f.endsWith('.json')).map((f) => join(p, f)) : [p],
)
if (!files.length) throw new Error('usage: node scripts/check-content.mjs <file|folder>... [--links file] [--out file]')

const toDoc = (raw) => ({
  ...raw,
  kind: ['body', 'life', 'area'].includes(raw.kind) ? 'hub' : raw.intake || raw.officialClaims ? 'nutrient' : 'post',
  primaryKeyword: raw.primaryKeyword ?? raw.keywords?.[0],
  faq: (raw.faq ?? []).map((f) => ({ q: f.q ?? f.question, a: f.a ?? f.answer })),
})

const counts = {}
const docs = {}
let errors = 0
for (const file of files) {
  const raw = JSON.parse(readFileSync(file, 'utf8'))
  const id = raw.slug ?? basename(file, '.json')
  const doc = toDoc(raw)
  let issues = checkDoc(doc, rules)
  issues = noJev ? issues.map((i) => ({ ...i, severity: i.code === 'OVER_UL' ? 'error' : i.severity })) : await judgeSuspects(doc, issues)
  docs[id] = {}
  for (const i of issues) {
    console.log(`${id}\t${i.severity}\t${i.code}\t${i.where}\t${i.text}`)
    counts[i.code] = (counts[i.code] ?? 0) + 1
    docs[id][i.code] = (docs[id][i.code] ?? 0) + 1
    if (i.severity === 'error') errors++
  }
}
const sorted = Object.fromEntries(Object.entries(counts).sort((a, b) => b[1] - a[1]))
console.log(`
${files.length} files, ${errors} errors${noJev ? " (Jev skipped (--no-jev): suspects kept as raw errors)" : ""}`)
console.table(sorted)
if (out) writeFileSync(out, JSON.stringify({ checkedAt: new Date().toISOString(), files: files.length, counts: sorted, docs }, null, 2) + '\n')
process.exitCode = errors ? 1 : 0
