import { expect, test } from 'vitest'

import { supplementOnly } from './Picks'

test.each([
  ['supplement', 0, '건강기능식품은 꼭 넣어야 해요'],
  ['supplement', null, '건강기능식품은 꼭 넣어야 해요'],
  ['supplement', 2, true],
  ['supplement', [{ name: '마그네슘' }], true],
  ['device', null, true],
  ['food', [], true],
])('supplementOnly kind=%s value=%j', (kind, value, expected) =>
  expect(supplementOnly(value, { siblingData: { kind } })).toBe(expected),
)
