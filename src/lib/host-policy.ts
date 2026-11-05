import { isProdHost } from './host'

export function withHostPolicy(res: Response, host: string): Response {
  if (isProdHost(host)) return res
  const out = new Response(res.body, res)
  out.headers.set('x-robots-tag', 'noindex, nofollow')
  return out
}
