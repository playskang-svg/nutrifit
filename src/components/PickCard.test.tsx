import { renderToStaticMarkup } from 'react-dom/server'
import { expect, test } from 'vitest'

import type { AffiliateLink, Pick } from '@/payload-types'

import { PickCard } from './PickCard'

const link = { id: 1, name: 'x', slug: 'x', url: 'https://link.coupang.com/a/x' } as AffiliateLink
const html = (extra: Partial<Pick>) =>
  renderToStaticMarkup(<PickCard pick={{ key: 'k', kind: 'supplement', name: '제품', brand: '브랜드', link, ...extra } as Pick} />)

test('supplement badge only when isHealthFunctionalFood is true', () => {
  expect(html({ isHealthFunctionalFood: true })).toContain('건강기능식품')
  expect(html({ isHealthFunctionalFood: null })).not.toContain('pick-card__badge')
  expect(html({ isHealthFunctionalFood: false })).not.toContain('pick-card__badge')
})

test('other kinds keep their badges', () => {
  expect(html({ kind: 'quasiDrug' })).toContain('의약외품')
  expect(html({ kind: 'device' })).toContain('의료기기')
  expect(html({ kind: 'cosmetic' })).toContain('기능성화장품')
  expect(html({ kind: 'gear' })).toContain('생활용품')
  expect(html({ kind: 'food' })).toContain('>식품<')
})
