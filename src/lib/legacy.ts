// The old single-page site used /?tab=… views and /api/* endpoints; send visitors to the new routes.
const TABS: Record<string, string> = {
  catalog: '/nutrients',
  visualizer: '/nutrients',
  schedule: '/health/supplement-timing-chart',
  organs: '/body',
  demographics: '/life',
  diet: '/health/c/food',
  deals: '/health/c/choose',
  subscription: '/health',
  columns: '/health',
}
const GONE = new Set(['/api/health', '/api/analyze-nutrition', '/api/column-ai-digest', '/api/product-og', '/api/deals'])

export type LegacyResult = { status: 301; location: string } | { status: 410 } | null

export function legacyRedirect(url: URL): LegacyResult {
  const { pathname, origin } = url
  if (GONE.has(pathname)) return { status: 410 }
  if (pathname === '/') {
    const tab = url.searchParams.get('tab')
    if (tab === null) return null
    return { status: 301, location: origin + (TABS[tab] ?? '/') }
  }
  if (pathname.endsWith('/')) return { status: 301, location: origin + pathname.slice(0, -1) + url.search }
  return null
}
