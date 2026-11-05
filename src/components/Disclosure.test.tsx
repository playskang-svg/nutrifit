import { renderToStaticMarkup } from 'react-dom/server'
import { expect, test } from 'vitest'

import { Disclosure } from './Disclosure'

test('Disclosure prints the Coupang sentence verbatim', () => {
  expect(renderToStaticMarkup(<Disclosure />)).toContain(
    '이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.',
  )
})
