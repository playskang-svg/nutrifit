import { describe, expect, it } from 'vitest'

import { bannedIn, linkProblem } from './verify.mjs'

const link = { slug: 'mg-01', url: 'https://link.coupang.com/a/abc123' }
const landing = 'https://www.coupang.com/vp/products/123?itemId=1&lptag=AF8819972&subid=x'

describe('linkProblem', () => {
  it('accepts a Coupang short link that lands on coupang.com with this account', () => {
    expect(linkProblem(link, landing)).toBeNull()
  })

  it('rejects other accounts, other hosts and non-short links', () => {
    expect(linkProblem(link, landing.replace('AF8819972', 'AF5563346'))).toMatch(/AF5563346/)
    expect(linkProblem(link, 'https://www.coupang.com/vp/products/123?lptag=AF1111111')).toMatch(/AF8819972/)
    expect(linkProblem(link, 'https://evil.example/?lptag=AF8819972')).toMatch(/coupang/)
    expect(linkProblem(link, '')).toMatch(/coupang/)
    expect(linkProblem({ ...link, url: 'https://www.coupang.com/np/search?q=x' }, landing)).toMatch(/단축/)
  })
})

describe('bannedIn', () => {
  it('finds the old partner id and iHerb in any case', () => {
    expect(bannedIn('{"url":"https://kr.iHerb.com/?rcode=NHQ7658"}')).toEqual(['iherb', 'NHQ7658'])
    expect(bannedIn('lptag=AF5563346')).toEqual(['AF5563346'])
    expect(bannedIn('lptag=AF8819972')).toEqual([])
  })
})
