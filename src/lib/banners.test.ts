import { expect, test } from 'vitest'

import { type Banner, bannerFor, bannerSrc, MAX_BANNERS_PER_PAGE } from './banners'

const size = (id: number) => ({
  wide: { id, width: 680, height: 140 },
  narrow: { id: id + 1, width: 320, height: 250 },
}) as Banner
const table = { default: size(10), 'post:sleep': size(20), 'hub:body-sleep': size(30) }

test('bannerFor looks up slot, then hub:<kind>-<slug>, then default', () => {
  expect(bannerFor('post:sleep', 'body-sleep', table)).toEqual(size(20))
  expect(bannerFor('post:other', 'body-sleep', table)).toEqual(size(30))
  expect(bannerFor('nope', undefined, table)).toEqual(size(10))
  expect(bannerFor('nope', 'life-x', {})).toBeNull()
})

test('bannerSrc follows the Coupang widget address rule', () => {
  expect(bannerSrc({ id: 123, width: 680, height: 140 })).toBe(
    'https://ads-partners.coupang.com/widgets.html?id=123&template=carousel&trackingCode=AF8819972&subId=nutrifit&width=680&height=140&tsource=',
  )
})

test('one banner per page', () => expect(MAX_BANNERS_PER_PAGE).toBe(1))
