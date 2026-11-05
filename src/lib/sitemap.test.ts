import { expect, test } from 'vitest'

import { rssXml, sitemapEntries, sitemapXml } from './sitemap'

const now = new Date('2026-11-10T00:00:00Z')
const at = '2026-11-01T00:00:00.000Z'
const posts = [
  { slug: 'magnesium-sleep', title: '마그네슘과 잠', description: '저녁에', publishedAt: at, updatedAt: at },
  { slug: 'future-post', title: '아직', description: '예약', publishedAt: '2026-11-20T00:00:00.000Z', updatedAt: at },
]
const categories = ['symptom', 'nutrient', 'choose', 'food', 'lifestage', 'research', 'gift'].map((slug) => ({ slug, updatedAt: at }))
const pages = ['about', 'editorial', 'contact', 'privacy', 'terms'].map((slug) => ({ slug, updatedAt: at }))
const entries = sitemapEntries({
  posts,
  nutrients: [{ slug: 'magnesium', updatedAt: at }],
  hubs: [
    { kind: 'body', slug: 'eye', updatedAt: at },
    { kind: 'life', slug: 'seniors', updatedAt: at },
    { kind: 'area', slug: 'eye', updatedAt: at },
  ],
  categories,
  pages,
  now,
})
const locs = entries.map((entry) => entry.loc)

test('sitemap leaves out posts scheduled after now', () => {
  expect(locs).not.toContain('https://nutrifit.kr/health/future-post')
})

test('post addresses are /health/<slug> without a trailing slash', () => {
  expect(locs).toContain('https://nutrifit.kr/health/magnesium-sleep')
  expect(locs.filter((loc) => loc !== 'https://nutrifit.kr/' && loc.endsWith('/'))).toEqual([])
})

test('sitemap lists the 7 categories, 5 guide pages, nutrients and hubs', () => {
  for (const { slug } of categories) expect(locs).toContain(`https://nutrifit.kr/health/c/${slug}`)
  for (const { slug } of pages) expect(locs).toContain(`https://nutrifit.kr/${slug}`)
  expect(locs).toContain('https://nutrifit.kr/nutrients/magnesium')
  expect(locs).toContain('https://nutrifit.kr/body/eye')
  expect(locs).toContain('https://nutrifit.kr/life/seniors')
})

test('sitemap lists /symptoms and all 14 body areas once each', () => {
  expect(locs).toContain('https://nutrifit.kr/symptoms')
  const areas = locs.filter((loc) => loc.startsWith('https://nutrifit.kr/symptoms/'))
  expect(areas).toHaveLength(14)
  expect(areas).toContain('https://nutrifit.kr/symptoms/urogenital')
  expect(new Set(locs).size).toBe(locs.length)
})

test('rss leaves out future posts and links /health/<slug>', () => {
  const xml = rssXml(posts, now)
  expect(xml).toContain('<link>https://nutrifit.kr/health/magnesium-sleep</link>')
  expect(xml).not.toContain('future-post')
})

test('sitemap escapes & in loc', () => {
  expect(sitemapXml([{ loc: 'https://nutrifit.kr/a?x=1&y=2' }])).toContain('<loc>https://nutrifit.kr/a?x=1&amp;y=2</loc>')
})
