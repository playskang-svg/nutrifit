import type { Metadata } from 'next'

import { PostList } from '@/components/PostList'
import { findPublishedPosts } from '@/lib/queries'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = { title: '글 검색', robots: { index: false, follow: true } }

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const q = ((await searchParams).q ?? '').trim().slice(0, 50)
  const results = q
    ? await findPublishedPosts({ where: { or: [{ title: { contains: q } }, { description: { contains: q } }] }, limit: 30 })
    : null
  return (
    <section className="section page-head">
      <div className="frame">
        <h1>{q ? `‘${q}’ 검색 결과` : '글 검색'}</h1>
        {results ? <PostList posts={results.docs} /> : <p>찾을 영양소나 증상을 입력해 주세요.</p>}
      </div>
    </section>
  )
}
