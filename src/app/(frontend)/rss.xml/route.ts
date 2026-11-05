import { findPublishedPosts } from '@/lib/queries'
import { rssXml } from '@/lib/sitemap'

export const dynamic = 'force-dynamic'

export async function GET() {
  const { docs } = await findPublishedPosts({ limit: 50 })
  return new Response(rssXml(docs, new Date()), { headers: { 'content-type': 'application/rss+xml; charset=utf-8' } })
}
