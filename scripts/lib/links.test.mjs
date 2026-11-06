import { afterEach, expect, test, vi } from 'vitest'

import { matchesTarget, verifyLink } from './links.mjs'

afterEach(() => vi.unstubAllGlobals())

test('product page: id and partner tag must match', () => {
  expect(matchesTarget('https://www.coupang.com/vp/products/123?lptag=AF8819972', { productId: '123' })).toBe(true)
  expect(matchesTarget('https://www.coupang.com/vp/products/123?lptag=AF8819972', { productId: '124' })).toBe(false)
  expect(matchesTarget('https://www.coupang.com/vp/products/123?lptag=AF5563346', { productId: '123' })).toBe(false)
})

test('search page: q must match', () => {
  expect(matchesTarget('https://www.coupang.com/np/search?q=마그네슘 영양제&lptag=AF8819972', { q: '마그네슘 영양제' })).toBe(true)
})

test('verifyLink makes one manual-redirect fetch and checks the location', async () => {
  const fetchMock = vi.fn(async () => new Response(null, { status: 302, headers: { location: 'https://www.coupang.com/vp/products/123?lptag=AF8819972' } }))
  vi.stubGlobal('fetch', fetchMock)
  expect(await verifyLink('https://link.coupang.com/a/x', { productId: '123' })).toEqual({
    ok: true,
    location: 'https://www.coupang.com/vp/products/123?lptag=AF8819972',
  })
  expect(await verifyLink('https://link.coupang.com/a/x', { productId: '999' })).toMatchObject({ ok: false })
  expect(fetchMock).toHaveBeenCalledTimes(2)
  expect(fetchMock.mock.calls[0][1]).toMatchObject({ redirect: 'manual' })
})
