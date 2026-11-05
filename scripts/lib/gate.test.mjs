import { describe, expect, it } from 'vitest'

import { runGate, shapeIssues } from './gate.mjs'

const post = (over = {}) => ({
  slug: 'cold-hands',
  title: '수족냉증, 손발이 찬 이유',
  seoTitle: '수족냉증 원인',
  description: '수족냉증은 대부분 추위에 혈관이 좁아져 생기지만 색이 변하면 진료가 먼저예요. 흔한 원인과 집에서 해볼 것, 진료과를 정리했어요. 한쪽만 차갑거나 아프면 바로 병원에 가세요.',
  category: 'symptom',
  area: 'whole',
  primaryKeyword: '수족냉증',
  hubs: [{ kind: 'area', slug: 'whole' }],
  keyPoints: ['a'],
  body: '## 먼저 이것부터\n\n손발이 찬 사람은 많아요.',
  faq: [{ q: '왜 차요?', a: '혈관이 좁아져요.' }],
  sources: [{ label: 'x', url: 'https://health.kdca.go.kr/a' }],
  keywords: ['수족냉증'],
  publishedAt: '2026-11-06T09:00:00Z',
  ...over,
})
const env = { links: [], picks: new Set(['p-1']), nutrients: new Set(['zinc']), cards: new Set(['/health/a']) }
const gate = (final, draft = final, extra = {}) => runGate({ kind: 'post', draft, final, env, jev: false, ...extra })
const codes = (r) => r.issues.map((i) => i.code)

describe('shapeIssues', () => {
  it('accepts a complete post', () => expect(shapeIssues('post', post())).toEqual([]))
  it('flags missing fields, bad slug, bad date, symptom without area', () => {
    const out = shapeIssues('post', post({ slug: 'Bad_Slug', keywords: undefined, publishedAt: 'soon', area: undefined }))
    expect(out.map((i) => i.where).sort()).toEqual(['area', 'keywords', 'publishedAt', 'slug'])
  })
  it('requires hub kind body|life|area', () => {
    const hub = { kind: 'nutrient', slug: 'a', name: 'n', summary: 's', primaryKeyword: 'k', body: 'b', nutrients: [], posts: [], faq: [], sources: [], keywords: [] }
    expect(shapeIssues('hub', hub).map((i) => i.where)).toEqual(['kind'])
  })
})

describe('runGate', () => {
  it('stops at shape errors', async () => {
    const r = await gate(post({ title: undefined }))
    expect(r.ok).toBe(false)
    expect(codes(r)).toEqual(['SHAPE'])
  })

  it('reports FACTS_CHANGED for body and faq numbers', async () => {
    const r = await gate(post({ body: '## a\n\n하루 300mg 드세요.', faq: [{ q: 'q', a: '2번이에요.' }] }), post({ body: '## a\n\n하루 200mg 드세요.', faq: [{ q: 'q', a: '3번이에요.' }] }))
    expect(r.issues.filter((i) => i.code === 'FACTS_CHANGED').map((i) => i.where)).toEqual(['body', 'faq[0].a'])
    expect(r.ok).toBe(false)
  })

  it('reports CONVERT with the line for an unknown directive', async () => {
    const r = await gate(post({ body: '## a\n\n문장이에요.\n\n{{pick:nope}}' }))
    expect(r.issues.find((i) => i.code === 'CONVERT')).toMatchObject({ where: 'body:5', severity: 'error' })
  })

  it('accepts convention photo keys and cards, and collects photos once', async () => {
    const body = '## a\n\n{{photo:post-cold-hands-1|손을 비비는 모습}}\n\n{{photo:post-cold-hands-1|같은 사진}}\n\n{{card:/health/a}}\n\n{{pick:search-zinc}}'
    const r = await gate(post({ body }))
    expect(codes(r)).not.toContain('CONVERT')
    expect(r.photos).toEqual([{ key: 'post-cold-hands-1', caption: '손을 비비는 모습' }])
  })

  it('rejects a photo key outside the convention', async () => {
    const r = await gate(post({ body: '## a\n\n{{photo:random|캡션}}' }))
    expect(codes(r)).toContain('CONVERT')
  })

  it('runs Jev on suspects unless skipped', async () => {
    const body = '## a\n\n이 영양제는 수족냉증을 치료해요.'
    const client = async (_s, q) => Object.fromEntries(Object.keys(q).map((k) => [k, { type: 'noul', noul: 0 }]))
    const withJev = await gate(post({ body }), post({ body }), { jev: { client } })
    expect(codes(withJev)).not.toContain('FORBIDDEN_CLAIM')
  })
})
