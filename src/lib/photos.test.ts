import { expect, test } from 'vitest'

import { photoUrl, pickVariant } from './photos'

const variants = ['a', 'b', 'c', 'd']

test('pickVariant is stable per slug', () => {
  expect(pickVariant('sleep-1', variants)).toBe(pickVariant('sleep-1', variants))
})

test('pickVariant spreads neighbouring slugs', () => {
  const used = new Set(Array.from({ length: 20 }, (_, i) => pickVariant(`post-${i}`, variants)))
  expect(used.size).toBeGreaterThanOrEqual(3)
})

test('photoUrl needs the key in photos', () => {
  expect(photoUrl('mg', { mg: {} })).toBe('/photos/mg.webp')
  expect(photoUrl('nope', { mg: {} })).toBeNull()
  expect(photoUrl(null, { mg: {} })).toBeNull()
  expect(photoUrl('x', {})).toBeNull()
})
