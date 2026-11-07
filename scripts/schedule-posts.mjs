// Cutover (Task 27): give unscheduled posts of one category publishedAt/updatedAtDisplay.
// node scripts/schedule-posts.mjs symptom 2026-11-07T10:40:00+09:00 [order.json]
// order.json (optional): array of slugs or [{ slug }] — earlier slugs publish first (e.g. search volume order).
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'

import { scheduleDates } from './lib/schedule.mjs'

const PLANS = {
  symptom: { firstBatch: 2, perDay: 2, times: ['10:40', '16:40'] },
  blog: { firstBatch: 20, perDay: 3, times: ['08:40', '12:40', '19:40'] },
}
const [category, start, orderFile] = process.argv.slice(2)
const plan = PLANS[category === 'symptom' ? 'symptom' : 'blog']
if (!start) throw new Error('usage: node scripts/schedule-posts.mjs <category> <start ISO> [order.json]')

const files = readdirSync('data/posts').filter((f) => f.endsWith('.json'))
const posts = files
  .map((f) => ({ f, p: JSON.parse(readFileSync(`data/posts/${f}`, 'utf8')) }))
  .filter(({ p }) => p.category === category && !p.publishedAt)
const order = orderFile ? JSON.parse(readFileSync(orderFile, 'utf8')).map((x) => x.slug ?? x) : []
const rank = (slug) => (order.includes(slug) ? order.indexOf(slug) : order.length)
posts.sort((a, b) => rank(a.p.slug) - rank(b.p.slug) || a.p.slug.localeCompare(b.p.slug))

const dates = scheduleDates({ start, ...plan, count: posts.length })
posts.forEach(({ f, p }, i) => {
  p.publishedAt = dates[i]
  p.updatedAtDisplay = dates[i]
  writeFileSync(`data/posts/${f}`, JSON.stringify(p, null, 2) + '\n')
})
console.log(`${posts.length} ${category} posts scheduled: ${dates[0]} … ${dates.at(-1)}`)
