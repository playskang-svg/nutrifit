import { allPublishedPosts, findDocs } from '@/lib/queries'
import { sitemapEntries, sitemapXml } from '@/lib/sitemap'

export const dynamic = 'force-dynamic'

export async function GET() {
  const [posts, nutrients, hubs, categories, pages] = await Promise.all([
    allPublishedPosts(),
    findDocs('nutrients'),
    findDocs('hubs'),
    findDocs('categories'),
    findDocs('pages'),
  ])
  const xml = sitemapXml(sitemapEntries({ posts, nutrients, hubs, categories, pages, now: new Date() }))
  return new Response(xml, { headers: { 'content-type': 'application/xml; charset=utf-8' } })
}
