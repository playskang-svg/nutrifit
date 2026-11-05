import { expect, test } from 'vitest'

import { validateCoupangUrl } from './AffiliateLinks'

test.each([
  ['https://link.coupang.com/a/dAbC12', true],
  ['https://link.coupang.com/re/AFFSDP?lptag=AF5563346', '쿠팡 단축 링크(link.coupang.com/a/…)만 넣을 수 있습니다'],
  ['https://www.iherb.com/x?rcode=NHQ7658', '쿠팡 단축 링크(link.coupang.com/a/…)만 넣을 수 있습니다'],
])('validateCoupangUrl(%s)', (url, expected) => expect(validateCoupangUrl(url)).toBe(expected))
