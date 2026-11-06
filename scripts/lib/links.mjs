// Checks that a Coupang Partners short link lands on the intended page with our partner tag.
export const PARTNER = 'AF8819972'

// location: redirect target of a short link. target: { productId } for a product page, { q } for a search page.
export function matchesTarget(location, { productId, q } = {}) {
  let u
  try {
    u = new URL(location)
  } catch {
    return false
  }
  if (!/(^|\.)coupang\.com$/.test(u.hostname)) return false
  if (u.searchParams.get('lptag') !== PARTNER) return false
  if (productId != null) return u.pathname.match(/\/vp\/products\/(\d+)(\/|$)/)?.[1] === String(productId)
  if (q != null) return u.pathname.startsWith('/np/search') && u.searchParams.get('q') === q
  return false
}

// One fetch of the short link without following redirects. Returns { ok, location }.
export async function verifyLink(url, target) {
  const r = await fetch(url, { redirect: 'manual', headers: { 'user-agent': 'Mozilla/5.0' } })
  const raw = r.headers.get('location')
  const location = raw ? new URL(raw, url).href : null
  return { ok: !!location && matchesTarget(location, target), location }
}
