// 2026-11-07: add the partners3 picks (work folder) to data/picks.json + data/links.json. Only picks whose link was issued and verified.
import { readFileSync, writeFileSync } from 'node:fs'
const W = 'C:/Users/sgk76/ego/nutrifit-20261105/coupang/'
const rj = (p) => JSON.parse(readFileSync(p, 'utf8'))
const picks = rj('data/picks.json')
const links = rj('data/links.json')
const issued = new Map(rj(W + 'links.json').map((l) => [l.slug, l]))
const haveLink = new Set(links.map((l) => l.slug))
const havePick = new Set(picks.map((p) => p.id))
let addedPicks = 0, addedLinks = 0
const skipped = []
for (const { _img, ...p } of rj(W + 'partners3/picks-new3.json')) {
  const l = issued.get(p.link)
  if (!l) { skipped.push(p.id); continue }
  if (!haveLink.has(l.slug)) { links.push({ slug: l.slug, url: l.url, target: l.target, lptag: l.lptag, issuedAt: l.issuedAt }); haveLink.add(l.slug); addedLinks++ }
  if (!havePick.has(p.id)) { picks.push(p); havePick.add(p.id); addedPicks++ }
}
writeFileSync('data/picks.json', JSON.stringify(picks, null, 2) + '\n')
writeFileSync('data/links.json', JSON.stringify(links, null, 1))
console.log({ addedPicks, addedLinks, skipped })
