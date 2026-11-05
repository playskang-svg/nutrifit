import { JsonLd } from '@/components/JsonLd'
import { HubGrid } from '@/components/HubGrid'
import { PhotoHead } from '@/components/PhotoHead'
import { NUTRIENT_GROUPS } from '@/collections/Nutrients'
import { collectionPage, crumbs, graph } from '@/lib/jsonld'
import { SITE_URL } from '@/lib/payload'
import { findDocs } from '@/lib/queries'
import { pageMeta } from '@/lib/seo'

export const dynamic = 'force-dynamic'

export const metadata = pageMeta({
  title: '영양소 사전',
  description: '비타민, 미네랄, 오메가3, 유산균까지 성분별 하루 섭취 기준과 상한, 먹는 시간, 고르는 법을 정리했어요.',
  path: '/nutrients',
})

export default async function NutrientsPage() {
  const nutrients = await findDocs('nutrients')
  return (
    <>
      <JsonLd
        data={graph(
          collectionPage('영양소 사전', `${SITE_URL}/nutrients`, nutrients.map((item) => ({ name: item.name, url: `/nutrients/${item.slug}` }))),
          crumbs([{ name: '영양소 사전', path: '/nutrients' }]),
        )}
      />
      <PhotoHead
        lede="성분마다 하루 섭취 기준과 상한, 먹는 시간을 한 장에 모았어요."
        title="영양소 사전"
        video={{
          src: '/video/nutrients.mp4',
          srcMobile: '/video/nutrients-m.mp4',
          poster: '/video/nutrients.webp',
          posterMobile: '/video/nutrients-m.webp',
        }}
      />
      {NUTRIENT_GROUPS.map((group) => {
        const items = nutrients.filter((item) => item.group === group.value)
        if (!items.length) return null
        return (
          <section className="section section--top" key={group.value}>
            <div className="frame">
              <h2>{group.label}</h2>
              <HubGrid items={items.map((item) => ({ href: `/nutrients/${item.slug}`, name: item.name, summary: item.summary }))} />
            </div>
          </section>
        )
      })}
    </>
  )
}
