import { renderToStaticMarkup } from 'react-dom/server'
import { afterEach, expect, test, vi } from 'vitest'

import type { AffiliateLink, Nutrient, Pick } from '@/payload-types'

import { nfmdToLexical } from '../../scripts/lib/nfmd.mjs'
import { RichText } from './RichText'

vi.mock('@/lib/banners', async (original) => ({
  ...(await original<typeof import('@/lib/banners')>()),
  bannerFor: () => ({ wide: { id: 1, width: 680, height: 140 }, narrow: { id: 2, width: 320, height: 250 } }),
}))

const ctx = {
  picks: new Set(['mg-01', 'tb-01']),
  nutrients: new Set(['magnesium']),
  photos: new Set(['mg-foods']),
  cards: new Map([
    ['/nutrients/magnesium', { title: '마그네슘', summary: '효능과 먹는 시간', image: '/og/mg.png' }],
    ['https://sise.pinda.kr/foods/spinach', { title: '시금치 시세', summary: '오늘 가격' }],
  ]),
}
const link = (slug: string) => ({ id: 1, name: slug, slug, url: `https://link.coupang.com/a/${slug.replace(/-/g, '')}` }) as AffiliateLink
const picks = new Map<string, Pick>([
  [
    'mg-01',
    {
      key: 'mg-01',
      kind: 'supplement',
      name: '마그네슘 365',
      brand: '뉴트리',
      link: link('mg-01'),
      image: '/products/1.webp',
      perServing: [{ name: '마그네슘', amount: 300, unit: 'mg' }],
    } as Pick,
  ],
  ['tb-01', { key: 'tb-01', kind: 'gear', name: '칫솔', brand: '오랄', link: link('tb-01'), perServing: [] } as Pick],
])
const nutrients = new Map<string, Nutrient>([
  [
    'magnesium',
    {
      slug: 'magnesium',
      name: '마그네슘',
      intake: { edition: '2025', unit: 'mg', rows: [{ sex: 'M', age: '19-29', rni: 360, ul: 350 }] },
      timing: nfmdToLexical('저녁 식후에 드세요.', ctx),
    } as Nutrient,
  ],
])
const links = new Map([['search-magnesium', link('search-magnesium')]])

const render = (src: string, extra = {}) =>
  renderToStaticMarkup(
    <RichText bannerSlot="post:x" data={nfmdToLexical(src, ctx)} links={links} nutrients={nutrients} picks={picks} {...extra} />,
  )
const text = (html: string) => html.replace(/<[^>]+>/g, '')

afterEach(() => vi.restoreAllMocks())

test('==highlight== renders as mark.hl', () => {
  expect(render('먹기 전 ==꼭 확인==하세요')).toContain('<mark class="hl">꼭 확인</mark>')
})

test('Coupang links are sponsored, other links are not', () => {
  const html = render('[쿠팡](https://link.coupang.com/a/abc123) [시세](https://sise.pinda.kr/foods/spinach)')
  expect(html).toContain('<a href="https://link.coupang.com/a/abc123" rel="sponsored nofollow noopener" target="_blank">쿠팡</a>')
  expect(html).toMatch(/<a href="https:\/\/sise\.pinda\.kr\/foods\/spinach"[^>]*>시세<\/a>/)
  expect(html).not.toMatch(/<a href="https:\/\/sise[^>]*rel=/)
})

test('callout warn renders aside.callout.callout--warn with its body', () => {
  const html = render('::: warn 주의\n약을 먹는 중이면 먼저 상의하세요.\n:::')
  expect(html).toContain('<aside class="callout callout--warn">')
  expect(html).toContain('주의')
  expect(html).toContain('<p>약을 먹는 중이면 먼저 상의하세요.</p>')
})

test('linkCard is a centered a.link-card that never prints its href', () => {
  const html = render('{{card:/nutrients/magnesium}}\n{{card:https://sise.pinda.kr/foods/spinach}}')
  expect(html.match(/<a class="link-card link-card--center"/g)).toHaveLength(2)
  expect(html).toContain('href="/nutrients/magnesium"')
  expect(text(html)).not.toContain('/nutrients/magnesium')
  expect(text(html)).not.toContain('sise.pinda.kr')
  expect(text(html)).toContain('시금치 시세')
})

test('compare renders a table in .compare with the corner cell first', () => {
  const html = render('표: 형태별 비교\n| 형태 | 흡수 |\n|---|---|\n| 산화 | 낮음 |')
  expect(html).toMatch(/<div[^>]*class="compare"[^>]*><table><caption>형태별 비교<\/caption><thead><tr><th scope="col">형태<\/th><th scope="col">흡수<\/th>/)
  expect(render('| | 흡수 |\n|---|---|\n| 산화 | 낮음 |')).toContain('<tr><th scope="col"></th><th scope="col">흡수</th>')
})

test('only the first of two banner blocks renders', () => {
  const data = nfmdToLexical('{{banner}}', ctx)
  data.root.children.push(data.root.children[0])
  const html = renderToStaticMarkup(<RichText bannerSlot="post:x" data={data} nutrients={nutrients} picks={picks} />)
  expect(html.match(/class="coupang-banner"/g)).toHaveLength(1)
})

test('unknown blocks render nothing and log nothing', () => {
  const error = vi.spyOn(console, 'error')
  const data = nfmdToLexical('{{banner}}', ctx)
  data.root.children[0].fields.blockType = 'mystery'
  expect(renderToStaticMarkup(<RichText bannerSlot="post:x" data={data} nutrients={nutrients} picks={picks} />)).toBe(
    '<div class="prose"></div>',
  )
  expect(error).not.toHaveBeenCalled()
})

test('pick cards: kind badge, per-serving table only for supplements, affiliate button', () => {
  const html = render('{{pick:mg-01}}\n{{pick:tb-01}}')
  const [mg, tb] = html.split('</article>')
  expect(mg).toContain('건강기능식품')
  expect(mg).toContain('<table class="pick-card__serving">')
  expect(mg).toContain('href="https://link.coupang.com/a/mg01" rel="sponsored nofollow noopener" target="_blank"')
  expect(tb).toContain('생활용품')
  expect(tb).not.toContain('<table')
})

test('auto-* picks render nothing; search-* is a plain search button, nothing without a link', () => {
  expect(render('{{pick:auto-magnesium}}')).toBe('<div class="prose"></div>')
  const html = render('{{pick:search-magnesium}}')
  expect(html).toContain('class="pick-search"')
  expect(html).toContain('href="https://link.coupang.com/a/searchmagnesium" rel="sponsored nofollow noopener" target="_blank"')
  expect(text(html)).toContain('쿠팡에서 마그네슘 보기')
  expect(renderToStaticMarkup(<RichText bannerSlot="" data={nfmdToLexical('{{pick:search-magnesium}}', ctx)} nutrients={nutrients} picks={picks} />)).toBe(
    '<div class="prose"></div>',
  )
})

test('intakeBar and timeline read the nutrients map; unknown nutrients render nothing', () => {
  const html = render('{{intake:magnesium}}\n{{timing:magnesium}}')
  expect(html).toContain('class="intake-bar"')
  expect(html).toContain('360')
  expect(html).toContain('class="timeline"')
  expect(html).toContain('저녁 식후에 드세요.')
  expect(
    renderToStaticMarkup(
      <RichText bannerSlot="" data={nfmdToLexical('{{intake:magnesium}}\n{{timing:magnesium}}', ctx)} nutrients={new Map()} picks={picks} />,
    ),
  ).toBe('<div class="prose"></div>')
})
