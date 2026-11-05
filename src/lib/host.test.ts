import { expect, test } from 'vitest'

import { isProdHost } from './host'

test.each([
  ['nutrifit.kr', true],
  ['nutrifit-v2.x.workers.dev', false],
  ['localhost:3000', false],
  [null, false],
])('isProdHost(%s) is %s', (host, expected) => expect(isProdHost(host)).toBe(expected))
