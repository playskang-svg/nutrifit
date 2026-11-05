import { HubGrid } from '@/components/HubGrid'
import { findDocs } from '@/lib/queries'
import { pageMeta } from '@/lib/seo'

export const dynamic = 'force-dynamic'

export const metadata = pageMeta({
  title: '몸 고민별 영양 정보',
  description: '눈, 간, 장, 관절, 수면, 피로처럼 몸의 고민별로 살펴볼 영양소와 생활 습관을 정리했어요.',
  path: '/body',
})

export default async function BodyIndexPage() {
  const hubs = await findDocs('hubs', { kind: { equals: 'body' } })
  return (
    <section className="section page-head">
      <div className="frame">
        <h1>몸 고민별 영양 정보</h1>
        <p className="lede">고민이 있는 곳을 고르면 관련 영양소와 글을 모아 보여 드려요.</p>
        <HubGrid items={hubs.map((hub) => ({ href: `/body/${hub.slug}`, name: hub.name, summary: hub.summary }))} />
      </div>
    </section>
  )
}
