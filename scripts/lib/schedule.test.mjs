import { expect, it } from 'vitest'

import { scheduleDates } from './schedule.mjs'

it('first batch at start, then perDay a day from the next KST day', () => {
  const d = scheduleDates({ start: '2026-11-10T08:40:00+09:00', firstBatch: 20, perDay: 3, times: ['08:40', '12:40', '19:40'], count: 150 })
  expect(d).toHaveLength(150)
  expect(new Set(d.slice(0, 20))).toEqual(new Set(['2026-11-09T23:40:00.000Z']))
  expect(d[20]).toBe('2026-11-10T23:40:00.000Z') // 11-11 08:40 KST
  expect(d[22]).toBe('2026-11-11T10:40:00.000Z') // 11-11 19:40 KST
  expect(d[23]).toBe('2026-11-11T23:40:00.000Z') // 11-12 08:40 KST
})

it('symptom schedule: 2 a day', () => {
  const d = scheduleDates({ start: '2026-11-10T10:40:00+09:00', firstBatch: 2, perDay: 2, times: ['10:40', '16:40'], count: 5 })
  expect(d).toEqual([
    '2026-11-10T01:40:00.000Z',
    '2026-11-10T01:40:00.000Z',
    '2026-11-11T01:40:00.000Z',
    '2026-11-11T07:40:00.000Z',
    '2026-11-12T01:40:00.000Z',
  ])
})
