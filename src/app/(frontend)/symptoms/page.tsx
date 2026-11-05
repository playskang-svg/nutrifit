import { BODY_AREAS } from '@/collections/Posts'
import { BodyMap } from '@/components/BodyMap'
import { JsonLd } from '@/components/JsonLd'
import { collectionPage, crumbs, graph } from '@/lib/jsonld'
import { SITE_URL } from '@/lib/payload'
import { pageMeta } from '@/lib/seo'

export const dynamic = 'force-dynamic'

export const metadata = pageMeta({
  title: '증상 찾기',
  description: '몸 그림에서 불편한 곳을 누르면 그 부위에 나타나는 증상의 원인과 집에서 해볼 것, 병원에 가야 할 때를 볼 수 있어요.',
  path: '/symptoms',
})

export default function SymptomsPage() {
  return (
    <section className="section page-head">
      <div className="frame">
        <JsonLd
          data={graph(
            collectionPage('증상 찾기', `${SITE_URL}/symptoms`, BODY_AREAS.map((area) => ({ name: area.label, url: `/symptoms/${area.value}` }))),
            crumbs([{ name: '증상 찾기', path: '/symptoms' }]),
          )}
        />
        <h1>증상 찾기</h1>
        <p className="lede">불편한 곳을 누르면 그 부위의 증상 글로 이동해요.</p>
        <BodyMap />
      </div>
    </section>
  )
}
