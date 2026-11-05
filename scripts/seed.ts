// Fills categories, pages, the menus and whatever content data/ holds. Safe to re-run: records are matched by slug (picks by key).
// Run: pnpm payload run scripts/seed.ts   (local D1; then node scripts/push-local-data.mjs copies it to production)
import { type CollectionSlug, getPayload } from 'payload'

import config from '../src/payload.config'
import { FOOTER_LINKS, HEADER_LINKS } from '../src/globals/Navigation'
import {
  buildCtx,
  categoryDoc,
  hubDoc,
  linkDoc,
  nutrientDoc,
  nutrientPickIds,
  pageDoc,
  pickDoc,
  postDoc,
  readData,
  relatedIds,
} from './lib/seed-data.mjs'

const data = readData('data')
const ctx = buildCtx(data)
const payload = await getPayload({ config })

/* eslint-disable @typescript-eslint/no-explicit-any */
const upsert = async (collection: CollectionSlug, where: any, doc: any): Promise<number> => {
  const { docs } = await payload.find({ collection, where, limit: 1, depth: 0, draft: true })
  const saved: any = docs[0]
    ? await payload.update({ collection, id: docs[0].id, data: doc, depth: 0 } as any)
    : await payload.create({ collection, data: doc, depth: 0 } as any)
  return saved.id
}
const bySlug = async (collection: CollectionSlug, items: any[], toDoc: (item: any) => any) => {
  const ids = new Map<string, number>()
  for (const item of items) ids.set(item.slug, await upsert(collection, { slug: { equals: item.slug } }, toDoc(item)))
  return ids
}

const ids: Record<string, Map<string, number>> = {}
ids.links = await bySlug('affiliate-links', data.links, linkDoc)
ids.categories = await bySlug('categories', data.categories, categoryDoc)
ids.nutrients = await bySlug('nutrients', data.nutrients, (item) => nutrientDoc(item, ctx))
ids.picks = new Map()
for (const pick of data.picks) ids.picks.set(pick.id, await upsert('picks', { key: { equals: pick.id } }, pickDoc(pick, ids)))
for (const item of data.nutrients) {
  await payload.update({ collection: 'nutrients', id: ids.nutrients.get(item.slug), data: { picks: nutrientPickIds(item, ids) }, depth: 0 })
}
ids.posts = await bySlug('posts', data.posts, (post) => postDoc(post, ctx, ids))
for (const post of data.posts) {
  await payload.update({
    collection: 'posts',
    id: ids.posts.get(post.slug),
    data: { relatedPosts: relatedIds(post, ids), _status: 'published' },
    depth: 0,
  })
}
for (const hub of data.hubs) {
  await upsert('hubs', { and: [{ kind: { equals: hub.kind } }, { slug: { equals: hub.slug } }] }, hubDoc(hub, ctx, ids))
}
await bySlug('pages', data.pages, (page) => pageDoc(page, ctx))
await payload.updateGlobal({ slug: 'navigation', data: { header: HEADER_LINKS, footer: FOOTER_LINKS } })

const counts: Record<string, number> = {}
for (const collection of ['categories', 'pages', 'posts', 'nutrients', 'hubs', 'picks', 'affiliate-links'] as const) {
  counts[collection] = (await payload.count({ collection })).totalDocs
}
console.log('rows', JSON.stringify(counts))
process.exit(0)
