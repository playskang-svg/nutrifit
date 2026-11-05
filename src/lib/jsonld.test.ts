import { expect, test } from 'vitest'

import { blogPosting, breadcrumb, collectionPage, faqPage, siteGraph } from './jsonld'
import { pageTitle } from './seo'

const post = {
  title: '마그네슘',
  description: '설명',
  image: '/og/m.png',
  publishedAt: '2026-11-01',
  modifiedAt: '2026-11-02T00:00:00Z',
}
const url = 'https://nutrifit.kr/health/m'

test('blogPosting is a BlogPosting by 뉴트리핏 with ISO dates', () => {
  const ld = blogPosting(post, url)
  expect(ld['@type']).toBe('BlogPosting')
  expect(ld.publisher.name).toBe('뉴트리핏')
  expect(ld.datePublished).toBe('2026-11-01T00:00:00.000Z')
  expect(ld.dateModified).toBe('2026-11-02T00:00:00.000Z')
  expect(ld.image).toBe('https://nutrifit.kr/og/m.png')
})

test('siteGraph has one WebSite with the search action and one Organization', () => {
  const nodes = siteGraph()['@graph']
  expect(nodes.filter((n) => n['@type'] === 'WebSite')).toHaveLength(1)
  expect(nodes.filter((n) => n['@type'] === 'Organization')).toHaveLength(1)
  expect(JSON.stringify(nodes)).toContain('https://nutrifit.kr/search?q={search_term_string}')
})

test('faqPage of an empty list is null', () => {
  expect(faqPage([])).toBeNull()
  expect(faqPage([{ q: '질문', a: '답' }])?.['@type']).toBe('FAQPage')
})

test('no builder emits a medical schema type', () => {
  const all = JSON.stringify([
    blogPosting(post, url),
    breadcrumb([{ name: '홈', url: '/' }]),
    collectionPage('x', url, [{ name: 'a', url: '/a' }]),
    faqPage([{ q: 'q', a: 'a' }]),
    siteGraph(),
  ])
  expect(all).not.toMatch(/Medical/)
})

test('pageTitle appends the site name', () => {
  expect(pageTitle('마그네슘')).toBe('마그네슘 | 뉴트리핏')
})
