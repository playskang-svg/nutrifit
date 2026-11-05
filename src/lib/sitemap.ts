import { BODY_AREAS } from '@/collections/Posts'

import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from './payload'

type Doc = { slug: string; updatedAt: string }
type PostDoc = Doc & { publishedAt: string }
type HubDoc = Doc & { kind: 'body' | 'life' | 'area' }

export type SitemapEntry = { loc: string; lastmod?: string }

const HUB_BASE = { body: '/body', life: '/life', area: '/symptoms' } as const
const INDEX_PATHS = ['/', '/nutrients', '/body', '/life', '/symptoms', '/health']

const later = (a: string, b: string) => (new Date(a) > new Date(b) ? a : b)
const isLive = (post: { publishedAt: string }, now: Date) => new Date(post.publishedAt) <= now

// The caller already asks for published posts; dates are checked again so a scheduled post never leaks.
export function sitemapEntries({
  posts,
  nutrients,
  hubs,
  categories,
  pages,
  now,
}: {
  posts: PostDoc[]
  nutrients: Doc[]
  hubs: HubDoc[]
  categories: Doc[]
  pages: Doc[]
  now: Date
}): SitemapEntry[] {
  const at = (path: string, lastmod?: string): SitemapEntry => ({ loc: `${SITE_URL}${path}`, ...(lastmod ? { lastmod } : {}) })
  const areaHub = new Map(hubs.filter((hub) => hub.kind === 'area').map((hub) => [hub.slug, hub.updatedAt]))
  return [
    ...INDEX_PATHS.map((path) => at(path)),
    ...categories.map((item) => at(`/health/c/${item.slug}`, item.updatedAt)),
    ...pages.map((item) => at(`/${item.slug}`, item.updatedAt)),
    ...nutrients.map((item) => at(`/nutrients/${item.slug}`, item.updatedAt)),
    ...hubs.filter((hub) => hub.kind !== 'area').map((hub) => at(`${HUB_BASE[hub.kind]}/${hub.slug}`, hub.updatedAt)),
    // Every area has a page, with or without its hub document.
    ...BODY_AREAS.map((area) => at(`/symptoms/${area.value}`, areaHub.get(area.value))),
    ...posts.filter((post) => isLive(post, now)).map((post) => at(`/health/${post.slug}`, later(post.publishedAt, post.updatedAt))),
  ]
}

const esc = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export const sitemapXml = (entries: SitemapEntry[]) =>
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries
    .map((entry) => `<url><loc>${esc(entry.loc)}</loc>${entry.lastmod ? `<lastmod>${entry.lastmod}</lastmod>` : ''}</url>`)
    .join('')}</urlset>`

// One builder for /rss.xml and /feed.xml.
export function rssXml(posts: { slug: string; title: string; description: string; publishedAt: string }[], now: Date) {
  const items = posts
    .filter((post) => isLive(post, now))
    .map((post) => {
      const url = `${SITE_URL}/health/${post.slug}`
      return `<item><title>${esc(post.title)}</title><link>${url}</link><guid>${url}</guid><description>${esc(post.description)}</description><pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate></item>`
    })
    .join('')
  return `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${esc(SITE_TITLE)}</title><link>${SITE_URL}</link><description>${esc(SITE_DESCRIPTION)}</description><language>ko</language>${items}</channel></rss>`
}
