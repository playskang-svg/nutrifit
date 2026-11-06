// Task 26: node scripts/verify-staging.mjs https://nutrifit-v2.playskang.workers.dev
// (a) every old nutrifit.kr sitemap path answers 200 on the preview (after redirects)
// (b) every preview sitemap URL answers 200
// (c) rendered HTML has no banned partner IDs / iherb, Coupang links only from data/links.json, the disclosure, ≤ 1 banner iframe
import { readFileSync } from 'node:fs'

const base = (process.argv[2] || '').replace(/\/$/, '')
if (!base) throw new Error('usage: node scripts/verify-staging.mjs <preview origin>')
const OLD = 'https://nutrifit.kr/sitemap.xml'
const allowed = new Set(JSON.parse(readFileSync('data/links.json', 'utf8')).map((l) => l.url))

const locs = async (url) => {
  const xml = await (await fetch(url)).text()
  const out = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim())
  // sitemap index → follow children
  if (/<sitemapindex/.test(xml)) return (await Promise.all(out.map(locs))).flat()
  return out
}
const toPreview = (u) => base + new URL(u).pathname

const problems = []
const get = async (url) => {
  for (let i = 0; i < 3; i++) {
    try {
      return await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(30000) })
    } catch (e) {
      if (i === 2) return { status: `ERR ${e.message}`, text: async () => '' }
    }
  }
}

async function run(label, urls, inspect) {
  let ok = 0
  for (let i = 0; i < urls.length; i += 6) {
    await Promise.all(
      urls.slice(i, i + 6).map(async (url) => {
        const res = await get(url)
        if (res.status !== 200) return problems.push(`${label} ${res.status} ${url}`)
        ok++
        if (inspect) inspect(url, await res.text())
      }),
    )
  }
  console.log(`${label}: ${ok}/${urls.length} ok`)
}

const html = (url, page) => {
  if (/AF5563346|iherb/i.test(page)) problems.push(`banned id/iherb ${url}`)
  for (const m of page.matchAll(/https:\/\/link\.coupang\.com\/a\/[A-Za-z0-9]+/g)) if (!allowed.has(m[0])) problems.push(`unknown coupang link ${m[0]} ${url}`)
  if ((page.match(/<iframe[^>]+coupang/g) || []).length > 1) problems.push(`more than one banner ${url}`)
  if (/\/health\//.test(url) && !/쿠팡 파트너스/.test(page)) problems.push(`no disclosure ${url}`)
}

const old = [...new Set((await locs(OLD)).map(toPreview))]
await run('old sitemap', old)
const fresh = (await locs(`${base}/sitemap.xml`)).map((u) => (u.startsWith(base) ? u : toPreview(u)))
await run('preview sitemap', fresh, html)
console.log(problems.length ? problems.slice(0, 60).join('\n') : 'no problems')
console.log(`problems ${problems.length}`)
process.exit(problems.length ? 1 : 0)
