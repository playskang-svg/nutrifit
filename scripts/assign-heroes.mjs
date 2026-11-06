// Sets heroPhoto on hubs (body/life: their -1 photo) and posts (a variant of their first hub with photos).
// Rerun after new photos land: it only fills empty heroPhoto fields.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'

const photos = JSON.parse(readFileSync('data/photos.json', 'utf8'))
const variants = (prefix) => Object.keys(photos).filter((k) => k.startsWith(`${prefix}-`) && /^\d+$/.test(k.slice(prefix.length + 1))).sort()

// Same FNV-1a as src/lib/photos.ts pickVariant.
const pick = (slug, list) => {
  let hash = 0x811c9dc5
  for (const byte of new TextEncoder().encode(slug)) hash = Math.imul(hash ^ byte, 0x01000193)
  return list[(hash >>> 0) % list.length]
}

const edit = (dir, fn) => {
  let n = 0
  for (const f of readdirSync(dir).filter((x) => x.endsWith('.json'))) {
    const doc = JSON.parse(readFileSync(`${dir}/${f}`, 'utf8'))
    if (doc.heroPhoto && doc.heroPhoto in photos) continue
    const key = fn(doc)
    if (!key) continue
    doc.heroPhoto = key
    writeFileSync(`${dir}/${f}`, JSON.stringify(doc, null, 2) + '\n')
    n++
  }
  return n
}

const hubs = edit('data/hubs', (h) => variants(`${h.kind}-${h.slug}`)[0])
const posts = edit('data/posts', (p) => {
  for (const h of p.hubs ?? []) {
    const list = variants(`${h.kind}-${h.slug}`)
    if (list.length) return pick(p.slug, list)
  }
})
console.log(`heroPhoto set: hubs ${hubs}, posts ${posts}`)
