import { expect, test } from 'vitest'

import { withHostPolicy } from './host-policy'

test('non-production hosts get noindex', () => {
  const res = withHostPolicy(new Response('x'), 'nutrifit-v2.x.workers.dev')
  expect(res.headers.get('x-robots-tag')).toBe('noindex, nofollow')
})
test('production host is untouched', () => {
  const res = withHostPolicy(new Response('x'), 'nutrifit.kr')
  expect(res.headers.get('x-robots-tag')).toBeNull()
})
