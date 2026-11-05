import { expect, test } from 'vitest'

import { legacyRedirect } from './legacy'

const to = (path: string) => ({ status: 301, location: `https://nutrifit.kr${path}` })

test.each([
  ['https://nutrifit.kr/health/foo/', to('/health/foo')],
  ['https://nutrifit.kr/health/', to('/health')],
  ['https://nutrifit.kr/?tab=catalog', to('/nutrients')],
  ['https://nutrifit.kr/?tab=visualizer', to('/nutrients')],
  ['https://nutrifit.kr/?tab=schedule', to('/health/supplement-timing-chart')],
  ['https://nutrifit.kr/?tab=organs', to('/body')],
  ['https://nutrifit.kr/?tab=demographics', to('/life')],
  ['https://nutrifit.kr/?tab=diet', to('/health/c/food')],
  ['https://nutrifit.kr/?tab=deals', to('/health/c/choose')],
  ['https://nutrifit.kr/?tab=subscription', to('/health')],
  ['https://nutrifit.kr/?tab=columns', to('/health')],
  ['https://nutrifit.kr/?tab=zzz', to('/')],
  ['https://nutrifit.kr/api/health', { status: 410 }],
  ['https://nutrifit.kr/api/analyze-nutrition', { status: 410 }],
  ['https://nutrifit.kr/api/column-ai-digest', { status: 410 }],
  ['https://nutrifit.kr/api/product-og?url=x', { status: 410 }],
  ['https://nutrifit.kr/api/deals', { status: 410 }],
  ['https://nutrifit.kr/api/media/file/a.webp', null],
  ['https://nutrifit.kr/health/foo?utm_source=x', null],
  ['https://nutrifit.kr/?utm_source=x', null],
  ['https://staging.workers.dev/?tab=organs', { status: 301, location: 'https://staging.workers.dev/body' }],
])('legacyRedirect(%s)', (u, want) => expect(legacyRedirect(new URL(u))).toEqual(want))
