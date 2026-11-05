import { expect, test } from 'vitest'

import { dueUrls } from './indexnow'

const item = (slug: string, date: string) =>
  `<item><title>t</title><link>https://nutrifit.kr/health/${slug}</link><pubDate>${new Date(date).toUTCString()}</pubDate></item>`
const rss = `<rss><channel>${item('new', '2026-11-06T10:00:00Z')}${item('old', '2026-11-05T00:00:00Z')}${item('future', '2026-11-06T13:00:00Z')}</channel></rss>`
const now = new Date('2026-11-06T11:00:00Z')

test('dueUrls keeps links published inside the window', () => {
  expect(dueUrls(rss, now)).toEqual(['https://nutrifit.kr/health/new'])
  expect(dueUrls(rss, now, 1)).toEqual(['https://nutrifit.kr/health/new'])
  expect(dueUrls(rss, now, 0.5)).toEqual([])
  expect(dueUrls(rss, now, 40)).toEqual(['https://nutrifit.kr/health/new', 'https://nutrifit.kr/health/old'])
})
test('dueUrls on empty feed', () => expect(dueUrls('<rss></rss>', now)).toEqual([]))
