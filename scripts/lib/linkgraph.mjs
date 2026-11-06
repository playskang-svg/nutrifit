import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

// Internal pages by href. Hub files are <kind>-<slug>.json; area hubs live under /symptoms.
const HUB_BASE = { body: '/body', life: '/life', area: '/symptoms' }
const CARD = /\{\{card:([^}|]+)\}\}/g

const readDir = (dir) =>
  existsSync(dir) ? readdirSync(dir).filter((f) => f.endsWith('.json')).map((f) => JSON.parse(readFileSync(join(dir, f), 'utf8'))) : []

const cardsIn = (doc) => [...JSON.stringify(doc).matchAll(CARD)].map((m) => m[1].trim())

export function buildGraph(dataDir) {
  const docs = []
  for (const p of readDir(join(dataDir, 'posts'))) docs.push({ href: `/health/${p.slug}`, kind: 'post', doc: p })
  for (const n of readDir(join(dataDir, 'nutrients'))) docs.push({ href: `/nutrients/${n.slug}`, kind: 'nutrient', doc: n })
  for (const h of readDir(join(dataDir, 'hubs'))) docs.push({ href: `${HUB_BASE[h.kind]}/${h.slug}`, kind: 'hub', doc: h })
  // Index pages are routes, not data files.
  const known = new Set([...docs.map((d) => d.href), '/', '/symptoms', '/body', '/life', '/nutrients', '/health', '/search'])
  const inbound = new Map(docs.map((d) => [d.href, 0]))
  const broken = []
  const thin = []
  const hit = (from, to) => {
    if (/^https?:/.test(to)) return
    if (!known.has(to)) broken.push({ from, to })
    else if (to !== from) inbound.set(to, inbound.get(to) + 1)
  }
  for (const { href, kind, doc } of docs) {
    const cards = cardsIn(doc)
    for (const to of cards) hit(href, to)
    for (const slug of doc.relatedPosts ?? []) hit(href, `/health/${slug}`)
    // A hub page lists every post that names it, so membership is an inbound link.
    if (kind === 'post') for (const h of doc.hubs ?? []) h.kind === 'nutrient' ? hit(`/nutrients/${h.slug}`, href) : hit(`${HUB_BASE[h.kind]}/${h.slug}`, href)
    if (kind === 'post' && cards.length < 2) thin.push({ slug: doc.slug, cards: cards.length })
  }
  const orphans = docs.filter((d) => d.kind === 'post' && inbound.get(d.href) === 0).map((d) => d.doc.slug)
  return { orphans, broken, thin }
}
