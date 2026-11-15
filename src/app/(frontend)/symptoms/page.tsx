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
        <div className="frame--text">
          <h2>증상 찾기, 이렇게 활용하세요</h2>
          <p>몸 그림에서 불편한 부위를 누르면 그 부위에서 자주 나타나는 증상별 글로 이동합니다. 앞모습과 뒷모습을 바꿔 가며 찾을 수 있고, 전신 증상은 별도 묶음에 모아 두었습니다. 글마다 흔한 원인, 집에서 해볼 수 있는 생활 관리, 영양소와의 관계, 병원에 가야 하는 신호를 순서대로 적었습니다.</p>
          <h3>병원에 가야 하는 신호가 먼저입니다</h3>
          <p>갑작스럽게 심해지는 통증, 숨쉬기 힘듦, 의식이 흐려짐, 한쪽 팔다리 힘 빠짐, 열이 오래 내리지 않는 경우처럼 위험 신호가 있다면 글을 읽기보다 가까운 응급실이나 병원에 먼저 가야 합니다. 이 사이트의 글은 진단이나 치료를 대신하지 않습니다.</p>
          <h3>글은 어떤 자료로 쓰나요</h3>
          <p>보건복지부·한국영양학회 섭취기준, 식품의약품안전처 자료, 서울아산병원 질환백과, MSD 매뉴얼처럼 공개된 공식·의료기관 자료를 근거로 정리하고, 글마다 참고 자료를 밝힙니다. 편집 기준은 편집 기준 페이지에서 볼 수 있습니다.</p>
          <h3>찾는 증상이 없을 때는</h3>
          <p>상단의 글 검색에서 증상 이름이나 성분 이름으로 글을 찾을 수 있습니다. 아직 다루지 않은 증상은 문의 페이지로 알려 주시면 다음 글 주제로 검토합니다.</p>
        </div>
      </div>
    </section>
  )
}
