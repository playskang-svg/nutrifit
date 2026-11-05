import { Callout } from '@/components/Callout'
import { Compare } from '@/components/Compare'
import { FaqList } from '@/components/FaqList'
import { HubGrid } from '@/components/HubGrid'
import { MobileToc } from '@/components/MobileToc'
import { PhotoHead } from '@/components/PhotoHead'
import { ShareBar } from '@/components/ShareBar'
import { SourceList } from '@/components/SourceList'
import { SummaryBox } from '@/components/SummaryBox'
import { VerdictBox } from '@/components/VerdictBox'
import { SITE_URL } from '@/lib/payload'

export const dynamic = 'force-dynamic'

// Temporary home: a specimen of the shared screens (DESIGN.md) until Task 6 builds the real home.
export default function HomePage() {
  return (
    <>
      <PhotoHead
        lede="성분 사전과 몸 부위별 안내를 공식 자료로 정리했어요."
        photoAlt=""
        title="영양제, 기준부터 확인하세요"
        video={{
          src: '/video/home.mp4',
          srcMobile: '/video/home-m.mp4',
          poster: '/video/home.webp',
          posterMobile: '/video/home-m.webp',
        }}
      >
        <a className="button" href="/health">
          건강 정보 보기
        </a>
      </PhotoHead>

      <section className="section">
        <div className="frame">
          <h2>고민별 바로가기</h2>
          <HubGrid
            items={[
              { href: '/body/eye', name: '눈', summary: '오래 보는 화면, 건조한 눈' },
              { href: '/body/liver', name: '간', summary: '술자리 뒤, 피곤한 아침' },
              { href: '/body/gut', name: '장', summary: '더부룩함과 배변 습관' },
              { href: '/body/fatigue', name: '피로', summary: '쉬어도 남는 피곤함' },
              { href: '/body/sleep', name: '수면', summary: '잠들기 어려운 밤' },
              { href: '/body/joint', name: '관절', summary: '계단이 불편한 무릎' },
            ]}
          />
        </div>
      </section>

      <article className="section">
        <div className="frame frame--text">
          <h2>본문 견본</h2>
          <SummaryBox
            points={[
              '하루 섭취 기준은 한국인 영양소 섭취기준 표로 확인해요.',
              '상한 섭취량을 넘기지 않도록 제품 라벨의 1일 섭취량을 먼저 봐요.',
            ]}
          />
          <MobileToc />
          <div className="prose">
            <h2>라벨에서 먼저 볼 곳</h2>
            <p>
              제품 뒷면의 영양·기능정보 표에는 1일 섭취량과 함량이 적혀 있어요. 이 숫자를 <mark className="hl">섭취 기준표와 나란히</mark> 놓고 보면
              충분한지, 많은지 바로 보여요.
            </p>
            <p>복용 중인 약이 있다면 성분이 겹치지 않는지 약사에게 먼저 물어보세요.</p>
            <Callout title="확인하세요" tone="warn">
              <p>여러 제품을 함께 먹으면 같은 성분이 겹칠 수 있어요.</p>
            </Callout>
            <h2>형태별로 비교하기</h2>
            <Compare
              caption="제형별 비교"
              columns={[{ label: '삼키기' }, { label: '휴대' }, { label: '함량 조절' }]}
              corner="제형"
              rows={[
                { label: '정제', cells: [{ value: '보통' }, { value: '쉬움' }, { value: '어려움' }] },
                { label: '캡슐', cells: [{ value: '쉬움' }, { value: '쉬움' }, { value: '어려움' }] },
                { label: '분말', cells: [{ value: '물에 타서' }, { value: '보통' }, { value: '쉬움' }] },
              ]}
            />
            <Callout title="알아두면 좋아요" tone="tip">
              <p>같은 성분이라도 원료 형태에 따라 함량 표기가 달라요.</p>
            </Callout>
            <h2>정리</h2>
            <p>기준표와 라벨, 두 가지만 확인해도 고르는 시간이 줄어요.</p>
          </div>
          <VerdictBox
            skip={['복용 중인 약이 있는데 아직 상의하지 않은 분', '임신 중이어서 따로 기준을 확인해야 하는 분']}
            who={['라벨 숫자를 직접 비교하고 싶은 분', '섭취 기준을 공식 자료로 확인하고 싶은 분']}
          />
          <FaqList
            items={[
              { q: '섭취 기준은 어디서 확인하나요?', a: '보건복지부가 펴낸 한국인 영양소 섭취기준에서 성별·나이별 값을 볼 수 있어요.' },
              { q: '상한 섭취량은 무엇인가요?', a: '건강에 해가 나타나지 않는 최대 섭취량이에요. 여러 제품을 함께 먹을 때 특히 확인해요.' },
            ]}
          />
          <SourceList
            sources={[{ label: '한국인 영양소 섭취기준', url: 'https://www.kns.or.kr/', publisher: '한국영양학회', date: '2025' }]}
          />
          <ShareBar title="뉴트리핏" url={SITE_URL} />
        </div>
      </article>
    </>
  )
}
