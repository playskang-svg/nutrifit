// 2026-11-07: put the partners2 picks (work folder) into data/ and give every nutrient page its product cards.
// Only picks whose link was issued and verified (coupang/links.json) are added.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'

const W = 'C:/Users/sgk76/ego/nutrifit-20261105/coupang/'
const rj = (p) => JSON.parse(readFileSync(p, 'utf8'))
const picks = rj('data/picks.json')
const links = rj('data/links.json')
const issued = new Map(rj(W + 'links.json').map((l) => [l.slug, l]))
const haveLink = new Set(links.map((l) => l.slug))
const havePick = new Set(picks.map((p) => p.id))

let addedPicks = 0, addedLinks = 0, skipped = []
for (const { _img, ...p } of rj(W + 'partners2/picks-new.json')) {
  const l = issued.get(p.link)
  if (!l) { skipped.push(p.id); continue }
  if (!haveLink.has(l.slug)) { links.push({ slug: l.slug, url: l.url, target: l.target, lptag: l.lptag, issuedAt: l.issuedAt }); haveLink.add(l.slug); addedLinks++ }
  if (!havePick.has(p.id)) { picks.push(p); havePick.add(p.id); addedPicks++ }
}

// Nutrient cards: up to 5 supplement picks of that nutrient, one per product.
let filled = 0
for (const f of readdirSync('data/nutrients')) {
  const n = rj(`data/nutrients/${f}`)
  const cur = n.picks ?? []
  if (cur.length >= 3) continue
  const seen = new Set(cur.map((id) => picks.find((p) => p.id === id)?.coupangProductId))
  const more = picks.filter((p) => p.kind === 'supplement' && p.nutrient === n.slug && !cur.includes(p.id) && !seen.has(p.coupangProductId) && seen.add(p.coupangProductId))
  const next = [...cur, ...more.map((p) => p.id)].slice(0, 5)
  if (next.length === cur.length) continue
  n.picks = next
  writeFileSync(`data/nutrients/${f}`, JSON.stringify(n, null, 2) + '\n')
  filled++
}
writeFileSync('data/picks.json', JSON.stringify(picks, null, 2) + '\n')
writeFileSync('data/links.json', JSON.stringify(links, null, 1))
console.log({ addedPicks, addedLinks, nutrientsFilled: filled, skippedNoLink: skipped })
