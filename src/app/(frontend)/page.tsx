import Link from 'next/link'

import { CoupangBanner } from '@/components/CoupangBanner'
import { HubGrid } from '@/components/HubGrid'
import { PhotoHead } from '@/components/PhotoHead'
import { PostList } from '@/components/PostList'
import { bannerFor } from '@/lib/banners'
import { findDocs, findPublishedPosts } from '@/lib/queries'
import { pageMeta } from '@/lib/seo'
import { SITE_DESCRIPTION, SITE_TITLE } from '@/lib/payload'

export const dynamic = 'force-dynamic'

export const metadata = pageMeta({ title: SITE_TITLE, description: SITE_DESCRIPTION, path: '/', bare: true })

const CONCERNS = [
  { href: '/body/eye', name: '눈', summary: '오래 보는 화면, 건조한 눈' },
  { href: '/body/liver', name: '간', summary: '술자리 뒤, 피곤한 아침' },
  { href: '/body/gut', name: '장', summary: '더부룩함과 배변 습관' },
  { href: '/body/fatigue', name: '피로', summary: '쉬어도 남는 피곤함' },
  { href: '/body/sleep', name: '수면', summary: '잠들기 어려운 밤' },
  { href: '/body/joint', name: '관절', summary: '계단이 불편한 무릎' },
]

// The directory addresses on tools.tipspedia.kr answer 404 (2026-11-06); the index.html addresses open.
const CALCULATORS = [
  { href: 'https://tools.tipspedia.kr/health/supplement-schedule/index.html', name: '영양제 복용 시간표', summary: '같이 먹으면 안 되는 조합 확인' },
  { href: 'https://tools.tipspedia.kr/health/symptom-nutrient/index.html', name: '증상별 부족 영양소', summary: '피곤함·눈떨림·구내염 점검' },
  { href: 'https://tools.tipspedia.kr/health/caffeine-tracker/index.html', name: '카페인 계산기', summary: '오늘 마신 카페인 총량' },
  { href: 'https://tools.tipspedia.kr/health/protein-needs/index.html', name: '단백질 필요량', summary: '내 체중에 맞는 하루 양' },
  { href: 'https://tools.tipspedia.kr/health/water-intake/index.html', name: '하루 물 섭취량', summary: '체중과 활동량으로 계산' },
]

// Order: hero, concerns, popular nutrients, staple posts, life stages, one banner, calculators.
export default async function HomePage() {
  const [nutrients, life, featured] = await Promise.all([
    findDocs('nutrients', undefined, 8),
    findDocs('hubs', { kind: { equals: 'life' } }, 8),
    findPublishedPosts({ where: { featured: { equals: true } }, limit: 6 }),
  ])
  // Until editors tick 단골 글 on some posts, the latest 6 stand in under an honest heading.
  const posts = featured.docs.length ? featured : await findPublishedPosts({ limit: 6 })
  const banner = bannerFor('home')
  return (
    <>
      <PhotoHead
        lede="성분 사전과 몸 부위별 안내를 공식 자료로 정리했어요."
        title="영양제, 기준부터 확인하세요"
        video={{ src: '/video/home.mp4', srcMobile: '/video/home-m.mp4', poster: '/video/home.webp', posterMobile: '/video/home-m.webp' }}
      >
        <Link className="button" href="/nutrients">
          영양소 사전 보기
        </Link>
      </PhotoHead>

      <section className="section">
        <div className="frame">
          <h2>고민별 바로가기</h2>
          <HubGrid items={CONCERNS} />
        </div>
      </section>

      {nutrients.length ? (
        <section className="section section--top">
          <div className="frame">
            <h2>많이 찾는 성분</h2>
            <HubGrid items={nutrients.map((item) => ({ href: `/nutrients/${item.slug}`, name: item.name, summary: item.summary }))} />
            <Link className="text-link more-link" href="/nutrients">
              영양소 사전 전체 보기
            </Link>
          </div>
        </section>
      ) : null}

      {posts.docs.length ? (
        <section className="section section--top">
          <div className="frame">
            <h2>{featured.docs.length ? '단골 글' : '새로 올라온 글'}</h2>
            <PostList feature posts={posts.docs} />
            <Link className="text-link more-link" href="/health">
              건강 정보 전체 보기
            </Link>
          </div>
        </section>
      ) : null}

      {life.length ? (
        <section className="section section--top">
          <div className="frame">
            <h2>생애주기별로 보기</h2>
            <HubGrid items={life.map((hub) => ({ href: `/life/${hub.slug}`, name: hub.name, summary: hub.summary }))} />
          </div>
        </section>
      ) : null}

      {banner ? (
        <div className="frame">
          <CoupangBanner banner={banner} />
        </div>
      ) : null}

      <section className="section section--top">
        <div className="frame">
          <h2>건강 계산기</h2>
          <ul className="hub-grid">
            {CALCULATORS.map((item) => (
              <li key={item.href}>
                <a href={item.href} rel="noopener" target="_blank">
                  <strong>{item.name}</strong>
                  <span>{item.summary}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
