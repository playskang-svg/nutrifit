// Follows every Coupang link in data/links.json one hop and checks it lands on coupang.com with this account's partner id.
// Also fails when a banned id (lib/verify.mjs) shows up anywhere in data/. Run: node scripts/verify-links.mjs   Exits 1 on any problem.
import fs from 'node:fs'
import path from 'node:path'

import { bannedIn, linkProblem } from './lib/verify.mjs'

let bad = 0
const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => (entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)]))
for (const file of walk('data').filter((name) => name.endsWith('.json'))) {
  const hits = bannedIn(fs.readFileSync(file, 'utf8'))
  if (hits.length) {
    bad += 1
    console.log('BANNED', file, hits.join(', '))
  }
}

const links = fs.existsSync('data/links.json') ? JSON.parse(fs.readFileSync('data/links.json', 'utf8')) : []
for (let i = 0; i < links.length; i += 3) {
  await Promise.all(
    links.slice(i, i + 3).map(async (link) => {
      const res = await fetch(link.url, { redirect: 'manual', signal: AbortSignal.timeout(20000) }).catch((e) => ({ error: e.message }))
      const problem = linkProblem(link, res.headers?.get('location') ?? '')
      if (problem) {
        bad += 1
        console.log('MISMATCH', link.slug, link.url, res.status ?? res.error, problem)
      }
    }),
  )
  await new Promise((resolve) => setTimeout(resolve, 400)) // Coupang answers 403 when hit faster
}
console.log(`checked ${links.length} links, problems ${bad}`)
process.exit(bad ? 1 : 0)
