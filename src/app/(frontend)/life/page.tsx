import { HubGrid } from '@/components/HubGrid'
import { findDocs } from '@/lib/queries'
import { pageMeta } from '@/lib/seo'

export const dynamic = 'force-dynamic'

export const metadata = pageMeta({
  title: '생애주기별 영양 정보',
  description: '임신 준비부터 어린이, 수험생, 갱년기, 60대 이상까지 나이와 시기별로 챙길 영양소를 정리했어요.',
  path: '/life',
})

export default async function LifeIndexPage() {
  const hubs = await findDocs('hubs', { kind: { equals: 'life' } })
  return (
    <section className="section page-head">
      <div className="frame">
        <h1>생애주기별 영양 정보</h1>
        <p className="lede">지금 시기에 맞는 영양소와 섭취 기준을 골라 보세요.</p>
        <HubGrid items={hubs.map((hub) => ({ href: `/life/${hub.slug}`, name: hub.name, summary: hub.summary }))} />
      </div>
    </section>
  )
}
