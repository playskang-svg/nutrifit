import type { Where } from 'payload'

import type { AffiliateLink, Hub, Nutrient, Pick, Post } from '@/payload-types'

import { getClient, publishedWhere } from './payload'

// The one place that reads posts: every query here adds "published and not in the future".
export const POSTS_PER_PAGE = 24

// Lists, feeds and the sitemap never need the body, which is most of a post's weight.
const LIST_FIELDS = { title: true, slug: true, description: true, publishedAt: true, updatedAt: true, updatedAtDisplay: true } as const

const live = (where?: Where): Where => (where ? { and: [publishedWhere(new Date()), where] } : publishedWhere(new Date()))
const isLive = (post: Post, now = new Date()) => post._status === 'published' && new Date(post.publishedAt) <= now

export async function findPublishedPosts({
  where,
  limit,
  page,
  sort = '-publishedAt',
}: {
  where?: Where
  limit: number
  page?: number
  sort?: string
}) {
  const payload = await getClient()
  return payload.find({ collection: 'posts', where: live(where), limit, page, sort, depth: 0, select: LIST_FIELDS })
}

export async function getPublishedPost(slug: string): Promise<Post | null> {
  const payload = await getClient()
  const { docs } = await payload.find({ collection: 'posts', where: live({ slug: { equals: slug } }), limit: 1, depth: 1 })
  const post = docs[0]
  if (!post) return null
  // Populated relations skip the where above, so a scheduled related post is dropped here.
  return { ...post, relatedPosts: post.relatedPosts?.filter((item) => typeof item === 'object' && isLive(item)) }
}

// Area hubs list the symptom posts of that body area; other hubs list posts that name them in `hubs`.
// shortcut: the two `hubs.*` conditions may match different rows of the array; slugs differ across kinds except body/area, which use different paths.
export async function postsForHub(kind: 'nutrient' | 'body' | 'life' | 'area', slug: string, limit: number) {
  const where: Where =
    kind === 'area'
      ? { and: [{ area: { equals: slug } }, { 'category.slug': { equals: 'symptom' } }] }
      : { and: [{ 'hubs.kind': { equals: kind } }, { 'hubs.slug': { equals: slug } }] }
  return (await findPublishedPosts({ where, limit })).docs
}

export async function allPublishedPosts() {
  return (await findPublishedPosts({ limit: 5000 })).docs
}

// Other collections hold no schedule, so these are plain reads.
export async function findDocs<T extends 'nutrients' | 'hubs' | 'categories' | 'pages'>(
  collection: T,
  where?: Where,
  limit = 200,
) {
  const payload = await getClient()
  return (await payload.find({ collection, where, limit, depth: 0, pagination: false })).docs
}

export async function findOne<T extends 'nutrients' | 'hubs' | 'categories' | 'pages'>(collection: T, where: Where, depth = 0) {
  const payload = await getClient()
  return (await payload.find({ collection, where, limit: 1, depth })).docs[0] ?? null
}

export const getHub = (kind: Hub['kind'], slug: string) =>
  findOne('hubs', { and: [{ kind: { equals: kind } }, { slug: { equals: slug } }] }, 1) as Promise<Hub | null>

// Collects what the body blocks point at, so a page loads only those picks, links and nutrients.
export function blockRefs(roots: unknown[]) {
  const refs = { picks: new Set<string>(), links: new Set<string>(), nutrients: new Set<string>() }
  const walk = (node: unknown): void => {
    if (!node || typeof node !== 'object') return
    if (Array.isArray(node)) return node.forEach(walk)
    const { type, fields } = node as { type?: string; fields?: Record<string, unknown> }
    if (type === 'block' && fields) {
      const { blockType, pickId, nutrient } = fields as { blockType: string; pickId?: string; nutrient?: string }
      if (blockType === 'pick' && pickId) {
        const search = /^search-(.+)$/.exec(pickId)?.[1]
        if (search) {
          refs.links.add(pickId)
          refs.nutrients.add(search)
        } else if (!pickId.startsWith('auto-')) refs.picks.add(pickId)
      }
      if ((blockType === 'intakeBar' || blockType === 'timeline') && nutrient) refs.nutrients.add(nutrient)
    }
    Object.values(node).forEach(walk)
  }
  roots.forEach(walk)
  return refs
}

// shortcut: blocks inside a nutrient's own timing text are not followed; add a second pass if timing texts start using picks.
export async function richTextContext(roots: unknown[]) {
  const refs = blockRefs(roots)
  const payload = await getClient()
  const [picks, nutrients, links] = await Promise.all([
    refs.picks.size
      ? payload.find({ collection: 'picks', where: { key: { in: [...refs.picks] } }, depth: 1, pagination: false })
      : null,
    refs.nutrients.size
      ? payload.find({ collection: 'nutrients', where: { slug: { in: [...refs.nutrients] } }, depth: 0, pagination: false })
      : null,
    refs.links.size
      ? payload.find({ collection: 'affiliate-links', where: { slug: { in: [...refs.links] } }, depth: 0, pagination: false })
      : null,
  ])
  return {
    picks: new Map<string, Pick>((picks?.docs ?? []).map((doc) => [doc.key, doc])),
    nutrients: new Map<string, Nutrient>((nutrients?.docs ?? []).map((doc) => [doc.slug, doc])),
    links: new Map<string, AffiliateLink>((links?.docs ?? []).map((doc) => [doc.slug, doc])),
  }
}

// Product cards a nutrient or hub lists by relation, with their affiliate link loaded.
export async function picksById(items: (number | Pick)[] | null | undefined): Promise<Pick[]> {
  const ids = (items ?? []).map((item) => (typeof item === 'object' ? item.id : item))
  if (!ids.length) return []
  const payload = await getClient()
  const { docs } = await payload.find({ collection: 'picks', where: { id: { in: ids } }, depth: 1, pagination: false })
  return ids.map((id) => docs.find((doc) => doc.id === id)).filter((doc): doc is Pick => Boolean(doc))
}
