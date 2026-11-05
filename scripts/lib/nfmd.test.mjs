import { expect, test } from 'vitest'

import { NfmdError, nfmdToLexical } from './nfmd.mjs'

const ctx = {
  picks: new Set(['mg-01']),
  nutrients: new Set(['magnesium']),
  photos: new Set(['mg-foods']),
  cards: new Map([
    ['/nutrients/magnesium', { title: '마그네슘', summary: '효능과 먹는 시간' }],
    ['https://sise.pinda.kr/foods/spinach', { title: '시금치 시세', summary: '오늘 가격', image: '/og/spinach.png' }],
  ]),
}
const convert = (src) => nfmdToLexical(src, ctx).root.children
const errorOf = (src) => {
  try {
    nfmdToLexical(src, ctx)
  } catch (error) {
    return error
  }
  throw new Error(`no NfmdError for ${JSON.stringify(src)}`)
}

test('nodes have the shape Payload Lexical stores', () => {
  expect(nfmdToLexical('안녕 **굵게**', ctx)).toEqual({
    root: {
      type: 'root',
      version: 1,
      direction: 'ltr',
      format: '',
      indent: 0,
      children: [
        {
          type: 'paragraph',
          version: 1,
          direction: 'ltr',
          format: '',
          indent: 0,
          textFormat: 0,
          textStyle: '',
          children: [
            { type: 'text', version: 1, text: '안녕 ', format: 0, mode: 'normal', style: '', detail: 0 },
            { type: 'text', version: 1, text: '굵게', format: 1, mode: 'normal', style: '', detail: 0 },
          ],
        },
      ],
    },
  })
})

test('headings, bold and ==highlight==', () => {
  const [h2, h3, p] = convert('## 마그네슘\n### 먹는 시간\n\n**저녁**에 ==물과 함께== 드세요')
  expect(h2).toMatchObject({ type: 'heading', tag: 'h2', children: [{ text: '마그네슘' }] })
  expect(h3).toMatchObject({ type: 'heading', tag: 'h3', children: [{ text: '먹는 시간' }] })
  expect(p.children.map((n) => [n.text, n.format])).toEqual([
    ['저녁', 1],
    ['에 ', 0],
    ['물과 함께', 128],
    [' 드세요', 0],
  ])
  expect(p.children[2].format & 128).toBe(128)
})

test('paragraph lines join, links, lists, quotes and rules', () => {
  const [p, ul, ol, quote, hr] = convert(
    [
      '[성분 사전](/nutrients)과',
      '[시세핀다](https://sise.pinda.kr) [옛 주소](https://nutrifit.kr/health/a)',
      '',
      '- 하나',
      '- **둘**',
      '',
      '3. 셋',
      '4. 넷',
      '',
      '> 인용 첫 줄',
      '> 둘째 줄',
      '',
      '---',
    ].join('\n'),
  )
  expect(p.type).toBe('paragraph')
  expect(p.children).toMatchObject([
    { type: 'link', version: 3, fields: { linkType: 'custom', url: '/nutrients', newTab: false }, children: [{ text: '성분 사전' }] },
    { type: 'text', text: '과 ' },
    { type: 'link', fields: { linkType: 'custom', url: 'https://sise.pinda.kr', newTab: true }, children: [{ text: '시세핀다' }] },
    { type: 'text', text: ' ' },
    { type: 'link', fields: { linkType: 'custom', url: 'https://nutrifit.kr/health/a', newTab: false } },
  ])
  expect(ul).toMatchObject({
    type: 'list',
    listType: 'bullet',
    tag: 'ul',
    start: 1,
    children: [
      { type: 'listitem', value: 1, children: [{ text: '하나', format: 0 }] },
      { type: 'listitem', value: 2, children: [{ text: '둘', format: 1 }] },
    ],
  })
  expect(ol).toMatchObject({ type: 'list', listType: 'number', tag: 'ol', start: 3, children: [{ value: 3 }, { value: 4 }] })
  expect(quote.type).toBe('quote')
  expect(quote.children.map((n) => n.text).join('')).toBe('인용 첫 줄 둘째 줄')
  expect(hr).toEqual({ type: 'horizontalrule', version: 1 })
})

test('a table with a 표: caption line becomes a compare block', () => {
  const [block, plain] = convert(
    [
      '표: 형태별 비교',
      '| 형태 | 흡수 | 위장 부담 |',
      '|---|:--:|---|',
      '| 산화 | 낮음 | **있음** |',
      '| 글리시네이트 | 높음 | 적음 |',
      '',
      '| 시간 | 이유 |',
      '|---|---|',
      '| 저녁 | 수면 |',
    ].join('\n'),
  )
  expect(block).toEqual({
    type: 'block',
    version: 2,
    format: '',
    fields: {
      id: 'compare-1',
      blockName: '',
      blockType: 'compare',
      caption: '형태별 비교',
      columns: [{ label: '흡수' }, { label: '위장 부담' }],
      rows: [
        { label: '산화', cells: [{ value: '낮음' }, { value: '있음' }] },
        { label: '글리시네이트', cells: [{ value: '높음' }, { value: '적음' }] },
      ],
    },
  })
  expect(plain.fields).toMatchObject({ caption: '', columns: [{ label: '이유' }], rows: [{ label: '저녁' }] })
})

test('::: warn 주의 becomes a callout with nested rich text', () => {
  const [warn, tip] = convert('::: warn 주의\n약을 먹는 중이면 먼저 상의하세요.\n\n- 항응고제\n:::\n\n::: tip\n물과 함께\n:::')
  expect(warn.fields).toMatchObject({ id: 'callout-1', blockType: 'callout', tone: 'warn', title: '주의' })
  expect(warn.fields.body.root.type).toBe('root')
  expect(warn.fields.body.root.children.map((n) => n.type)).toEqual(['paragraph', 'list'])
  expect(tip.fields).toMatchObject({ tone: 'tip', title: '' })
})

test('one-line directives become blocks', () => {
  const blocks = convert(
    [
      '{{pick:mg-01}}',
      '{{pick:auto-magnesium}}',
      '{{pick:search-magnesium}}',
      '{{intake:magnesium}}',
      '{{timing:magnesium}}',
      '{{photo:mg-foods|마그네슘이 많은 음식}}',
      '{{card:/nutrients/magnesium}}',
      '{{card:https://sise.pinda.kr/foods/spinach}}',
      '{{banner}}',
    ].join('\n'),
  )
  expect(blocks.every((b) => b.type === 'block' && b.version === 2 && b.format === '')).toBe(true)
  expect(blocks.map((b) => b.fields)).toEqual([
    { id: 'pick-1', blockName: '', blockType: 'pick', pickId: 'mg-01' },
    { id: 'pick-2', blockName: '', blockType: 'pick', pickId: 'auto-magnesium' },
    { id: 'pick-3', blockName: '', blockType: 'pick', pickId: 'search-magnesium' },
    { id: 'intakeBar-4', blockName: '', blockType: 'intakeBar', nutrient: 'magnesium' },
    { id: 'timeline-5', blockName: '', blockType: 'timeline', nutrient: 'magnesium' },
    { id: 'photo-6', blockName: '', blockType: 'photo', photo: 'mg-foods', caption: '마그네슘이 많은 음식' },
    { id: 'linkCard-7', blockName: '', blockType: 'linkCard', href: '/nutrients/magnesium', title: '마그네슘', summary: '효능과 먹는 시간', image: '' },
    {
      id: 'linkCard-8',
      blockName: '',
      blockType: 'linkCard',
      href: 'https://sise.pinda.kr/foods/spinach',
      title: '시금치 시세',
      summary: '오늘 가격',
      image: '/og/spinach.png',
    },
    { id: 'banner-9', blockName: '', blockType: 'banner' },
  ])
})

test.each([
  ['unknown pick', '문단\n\n{{pick:mg-99}}', '없는 상품이에요: mg-99', 3],
  ['auto pick of an unknown nutrient', '{{pick:auto-zinc}}', '없는 상품이에요: auto-zinc', 1],
  ['unknown nutrient', '{{timing:zinc}}', '없는 성분이에요: zinc', 1],
  ['unknown photo', '{{photo:nope|캡션}}', '없는 사진이에요: nope', 1],
  ['photo without caption', '{{photo:mg-foods}}', '사진 캡션을 쓰세요: {{photo:키|캡션}}', 1],
  ['unknown card', '{{card:/health/nope}}', '없는 카드 주소예요: /health/nope', 1],
  ['unknown directive', '{{foo:x}}', '모르는 지시어예요: {{foo:x}}', 1],
  ['directive inside a sentence', '여기 {{pick:mg-01}} 보세요', '지시어는 한 줄에 하나만 따로 쓰세요', 1],
  ['second banner', '{{banner}}\n\n{{banner}}', 'banner는 한 번만', 3],
  ['bare URL', '자세한 내용은 https://example.com 에서', 'URL을 그대로 쓰지 마세요', 1],
  ['bare URL on a paragraph second line', '첫 줄\n둘째 줄 http://example.com', 'URL을 그대로 쓰지 마세요', 2],
  ['bare URL inside a callout', '::: tip 팁\n\n출처 https://example.com\n:::', 'URL을 그대로 쓰지 마세요', 3],
  ['URL as link text', '[https://example.com](https://example.com)', 'URL을 그대로 쓰지 마세요', 1],
  ['markdown image', '![그래프](/post-images/a.svg)', '이미지는 {{photo:키|캡션}}으로 쓰세요', 1],
  ['unclosed bold', '**굵게 시작만', '**와 ==는 같은 줄 안에서 닫으세요', 1],
  ['link without https:// or /', '[링크](www.example.com)', '링크 주소는 https:// 또는 /로 시작해야 해요: www.example.com', 1],
  ['link in a table cell', '| 항목 | 값 |\n|---|---|\n| [글](/health/a) | 1 |', '표 칸·캡션·상자 제목에는 링크를 넣을 수 없어요', 3],
  ['table without a rule row', '| a | b |\n| 1 | 2 |', '표 둘째 줄은 |---|---| 구분선이어야 해요', 2],
  ['table row with an extra cell', '| a | b |\n|---|---|\n| 1 | 2 | 3 |', '표 칸 수가 머리줄과 달라요', 3],
  ['h1 heading', '# 큰 제목', '제목은 ## 또는 ###만 쓰세요', 1],
  ['unknown callout tone', '::: danger 위험\n내용\n:::', '상자 종류는 tip·warn·check·note 중 하나예요: danger', 1],
  ['unclosed callout', '::: tip 팁\n내용', '상자를 :::로 닫으세요', 1],
  ['stray callout close', '문단\n:::', '여는 줄 없이 :::만 있어요', 2],
  ['table inside a callout', '::: note 참고\n| a | b |\n|---|---|\n:::', '상자 안에는 문단과 목록만 쓸 수 있어요', 2],
  ['directive inside a callout', '::: note 참고\n{{banner}}\n:::', '상자 안에는 문단과 목록만 쓸 수 있어요', 2],
  ['link in a callout title, before a body error', '::: tip [글](/a)\n{{banner}}\n:::', '표 칸·캡션·상자 제목에는 링크를 넣을 수 없어요', 1],
])('%s -> NfmdError', (_, src, message, line) => {
  const error = errorOf(src)
  expect(error).toBeInstanceOf(NfmdError)
  expect([error.message, error.line]).toEqual([message, line])
})
