import { notFound } from 'next/navigation'

import { JsonLd } from '@/components/JsonLd'
import { HubGrid } from '@/components/HubGrid'
import { PhotoHead } from '@/components/PhotoHead'
import { Pager, PostList } from '@/components/PostList'
import { collectionPage, crumbs, graph } from '@/lib/jsonld'
import { SITE_URL } from '@/lib/payload'
import { findDocs, findPublishedPosts, POSTS_PER_PAGE } from '@/lib/queries'
import { pageMeta } from '@/lib/seo'

export const dynamic = 'force-dynamic'

type Props = { searchParams: Promise<{ page?: string }> }

export async function generateMetadata({ searchParams }: Props) {
  const page = Number((await searchParams).page)
  return pageMeta({
    title: '건강 정보',
    description: '증상, 영양 성분, 제품 고르는 법, 음식, 생애주기별 건강 정보를 공식 자료로 확인해 정리했어요.',
    path: page > 1 ? `/health?page=${page}` : '/health',
  })
}

export default async function HealthPage({ searchParams }: Props) {
  const raw = (await searchParams).page
  const page = raw ? Number(raw) : 1
  if (!Number.isInteger(page) || page < 1) notFound()
  const [categories, list] = await Promise.all([findDocs('categories'), findPublishedPosts({ limit: POSTS_PER_PAGE, page })])
  if (page > 1 && page > list.totalPages) notFound()
  return (
    <>
      <JsonLd
        data={graph(
          collectionPage('건강 정보', `${SITE_URL}/health`, list.docs.map((post) => ({ name: post.title, url: `/health/${post.slug}` }))),
          crumbs([{ name: '건강 정보', path: '/health' }]),
        )}
      />
      <PhotoHead
        lede="증상과 성분, 고르는 법을 공식 자료로 확인해 정리했어요."
        title="건강 정보"
        video={{ src: '/video/blog.mp4', srcMobile: '/video/blog-m.mp4', poster: '/video/blog.webp', posterMobile: '/video/blog-m.webp' }}
      />
      <section className="section section--top">
        <div className="frame">
          <HubGrid items={categories.map((item) => ({ href: `/health/c/${item.slug}`, name: item.title, summary: item.lede }))} />
          <h2 className="list-title">새로 올라온 글</h2>
          <PostList feature posts={list.docs} />
          <Pager page={page} path="/health" totalPages={list.totalPages} />
        </div>
      </section>
    </>
  )
}
