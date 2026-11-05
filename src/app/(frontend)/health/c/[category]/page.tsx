import { notFound } from 'next/navigation'

import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Pager, PostList } from '@/components/PostList'
import { findOne, findPublishedPosts, POSTS_PER_PAGE } from '@/lib/queries'
import { pageMeta } from '@/lib/seo'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ category: string }>; searchParams: Promise<{ page?: string }> }

const getCategory = async (slug: string) => (await findOne('categories', { slug: { equals: slug } })) ?? notFound()

export async function generateMetadata({ params }: Props) {
  const { category } = await params
  const item = await getCategory(category)
  return pageMeta({ title: item.title, description: item.lede, path: `/health/c/${item.slug}` })
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const item = await getCategory((await params).category)
  const raw = (await searchParams).page
  const page = raw ? Number(raw) : 1
  if (!Number.isInteger(page) || page < 1) notFound()
  const list = await findPublishedPosts({ where: { category: { equals: item.id } }, limit: POSTS_PER_PAGE, page })
  if (page > 1 && page > list.totalPages) notFound()
  const path = `/health/c/${item.slug}`
  return (
    <section className="section page-head">
      <div className="frame">
        <Breadcrumbs items={[{ name: '건강 정보', path: '/health' }, { name: item.title, path }]} />
        <h1>{item.title}</h1>
        <p className="lede">{item.lede}</p>
        <div className="list-gap">
          <PostList feature posts={list.docs} />
        </div>
        <Pager page={page} path={path} totalPages={list.totalPages} />
      </div>
    </section>
  )
}
