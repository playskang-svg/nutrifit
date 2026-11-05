import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import { describe, expect, it } from 'vitest'

import { buildCtx, hubDoc, nutrientDoc, pageDoc, pickDoc, postDoc, readData, relatedIds } from './seed-data.mjs'

const data = {
  categories: [],
  pages: [],
  posts: [{ slug: 'leg-cramp', title: '다리 쥐', description: '밤에 쥐가 날 때', heroPhoto: 'legs' }],
  nutrients: [{ slug: 'magnesium', name: '마그네슘', summary: '근육과 신경' }],
  hubs: [
    { kind: 'area', slug: 'leg-foot', name: '다리·발', summary: '다리 증상' },
    { kind: 'body', slug: 'sleep', name: '수면', summary: '잠' },
  ],
  picks: [{ id: 'mg-01' }],
  links: [],
  photos: { legs: { src: '/photos/legs.webp', alt: '다리' } },
  siseFoods: { magnesium: [{ name: '시금치', url: 'https://sise.pinda.kr/food/spinach', source: '시세핀다' }] },
}
const ctx = buildCtx(data)
const ids = (entries) => new Map(Object.entries(entries))

describe('buildCtx', () => {
  it('collects picks, nutrients, photos and card targets', () => {
    expect([...ctx.picks]).toEqual(['mg-01'])
    expect([...ctx.nutrients]).toEqual(['magnesium'])
    expect([...ctx.photos]).toEqual(['legs'])
    expect(ctx.cards.get('/health/leg-cramp')).toEqual({ title: '다리 쥐', summary: '밤에 쥐가 날 때', image: '/photos/legs.webp' })
    expect(ctx.cards.get('/nutrients/magnesium')).toMatchObject({ title: '마그네슘', image: '' })
    expect(ctx.cards.get('/symptoms/leg-foot')).toMatchObject({ title: '다리·발' })
    expect(ctx.cards.get('/body/sleep')).toMatchObject({ title: '수면' })
    expect(ctx.cards.get('https://sise.pinda.kr/food/spinach')).toMatchObject({ title: '시금치' })
  })
})

describe('readData', () => {
  it('treats missing files as empty and reads folders in name order', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'seed-'))
    fs.mkdirSync(path.join(dir, 'pages'))
    fs.writeFileSync(path.join(dir, 'pages', 'b.json'), '{"slug":"b"}')
    fs.writeFileSync(path.join(dir, 'pages', 'a.json'), '{"slug":"a"}')
    const read = readData(dir)
    expect(read.pages.map((page) => page.slug)).toEqual(['a', 'b'])
    expect(read.posts).toEqual([])
    expect(read.photos).toEqual({})
    fs.rmSync(dir, { recursive: true })
  })
})

describe('data/', () => {
  const real = readData('data')
  it('holds the 7 categories and 5 policy pages, all valid NF-markdown', () => {
    expect(real.categories.map((item) => item.slug)).toEqual(['symptom', 'nutrient', 'choose', 'food', 'lifestage', 'research', 'gift'])
    expect(real.pages.map((page) => page.slug).sort()).toEqual(['about', 'contact', 'editorial', 'privacy', 'terms'])
    const realCtx = buildCtx(real)
    for (const page of real.pages) expect(pageDoc(page, realCtx).content.root.children.length).toBeGreaterThan(3)
  })

  it('keeps the contact address and the AI photo note, and drops iHerb and the AI analyzer', () => {
    const text = JSON.stringify(real.pages)
    expect(text).not.toMatch(/iherb|AI 맞춤|AI 분석/i)
    expect(real.pages.find((page) => page.slug === 'contact').body).toContain('contact@nutrifit.kr')
    expect(real.pages.find((page) => page.slug === 'editorial').body).toContain('사진은 AI로 만든 연출 이미지입니다.')
  })
})

describe('document mappings', () => {
  it('gives each rich-text field of a nutrient its own block id prefix', () => {
    const doc = nutrientDoc(
      { slug: 'magnesium', name: '마그네슘', deficiency: '{{intake:magnesium}}', timing: '{{timing:magnesium}}', keywords: ['a', 'b'] },
      ctx,
    )
    expect(doc.deficiency.root.children[0].fields.id).toBe('deficiency-intakeBar-1')
    expect(doc.timing.root.children[0].fields.id).toBe('timing-timeline-1')
    expect(doc.excess.root.children).toEqual([])
    expect(doc.keywords).toBe('a, b')
  })

  it('publishes posts at their own date, future dates included', () => {
    const doc = postDoc(
      { slug: 'x', category: 'symptom', body: '본문', publishedAt: '2030-01-01T01:40:00.000Z', area: 'leg-foot', featured: true },
      ctx,
      { categories: ids({ symptom: 3 }) },
    )
    expect(doc).toMatchObject({ category: 3, _status: 'published', publishedAt: '2030-01-01T01:40:00.000Z', area: 'leg-foot', featured: true })
  })

  it('names the document and line when NF-markdown is invalid', () => {
    expect(() => pageDoc({ slug: 'about', body: '문단\n{{pick:nope}}' }, ctx)).toThrow('pages/about body 2행: 없는 상품이에요: nope')
  })

  it('stores the pick id in key and resolves its link and nutrient', () => {
    const doc = pickDoc({ id: 'mg-01', kind: 'supplement', link: 'mg-01', nutrient: 'magnesium' }, { links: ids({ 'mg-01': 7 }), nutrients: ids({ magnesium: 2 }) })
    expect(doc).toMatchObject({ key: 'mg-01', link: 7, nutrient: 2, perServing: [] })
  })

  it('fails on a relation that does not exist', () => {
    expect(() => pickDoc({ id: 'mg-02', link: 'missing' }, { links: ids({}), nutrients: ids({}) })).toThrow('picks mg-02: 없는 링크 missing')
    expect(() => relatedIds({ slug: 'x', relatedPosts: ['y'] }, { posts: ids({}) })).toThrow('posts/x: 없는 글 y')
    expect(() => hubDoc({ kind: 'body', slug: 'sleep', nutrients: ['zinc'] }, ctx, { nutrients: ids({}), posts: ids({}), picks: ids({}) })).toThrow(
      'hubs/body-sleep: 없는 성분 zinc',
    )
  })
})
