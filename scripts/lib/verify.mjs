// Checks for Coupang links. Plain node runs these, so the rules mirror src/collections/AffiliateLinks.ts.
export const AID = 'AF8819972'
const SHORT_LINK = /^https:\/\/link\.coupang\.com\/a\/[A-Za-z0-9]+$/
// The old site's other Coupang account and its retired referral program; neither may come back.
const BANNED = [/iherb/i, /AF5563346/, /NHQ7658/]

export const bannedIn = (text) => BANNED.map((re) => re.exec(text)?.[0]).filter(Boolean).map((hit) => (/iherb/i.test(hit) ? 'iherb' : hit))

// `location` is where the short link redirects on its first hop.
export function linkProblem(link, location) {
  if (!SHORT_LINK.test(link.url)) return `쿠팡 단축 링크가 아니에요: ${link.url}`
  const banned = bannedIn(location)
  if (banned.length) return `금지된 값: ${banned.join(', ')}`
  let host = ''
  try {
    host = new URL(location).hostname
  } catch {}
  if (host !== 'coupang.com' && !host.endsWith('.coupang.com')) return `coupang.com으로 가지 않아요: ${location || '(이동 없음)'}`
  if (!location.includes(AID)) return `${AID} 계정이 아니에요`
  return null
}
