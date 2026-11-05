import { expect, test } from 'vitest'

import { DISCLOSURE, publishedWhere } from './payload'

test('publishedWhere hides drafts and future posts', () => {
  expect(publishedWhere(new Date('2026-11-10T00:00:00Z'))).toEqual({
    and: [{ _status: { equals: 'published' } }, { publishedAt: { less_than_equal: '2026-11-10T00:00:00.000Z' } }],
  })
})

test('DISCLOSURE is the exact Coupang sentence', () => {
  expect(DISCLOSURE).toBe('이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.')
})
