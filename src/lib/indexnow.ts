export const INDEXNOW_KEY = 'ec0de90ecd0626943cd9064b9fbef0d9'

// Links whose pubDate falls in (now - windowHours, now]. The cron runs at 00, 04 and 11 UTC, so gaps reach 13h.
export function dueUrls(rssXml: string, now: Date, windowHours = 13): string[] {
  const from = now.getTime() - windowHours * 3_600_000
  const urls: string[] = []
  for (const [, item] of rssXml.matchAll(/<item>([\s\S]*?)<\/item>/g)) {
    const link = /<link>(.*?)<\/link>/.exec(item)?.[1]
    const at = Date.parse(/<pubDate>(.*?)<\/pubDate>/.exec(item)?.[1] ?? '')
    if (link && at >= from && at <= now.getTime()) urls.push(link)
  }
  return urls
}

export async function submitIndexNow(urlList: string[]): Promise<void> {
  if (urlList.length === 0) return
  await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      host: 'nutrifit.kr',
      key: INDEXNOW_KEY,
      keyLocation: `https://nutrifit.kr/${INDEXNOW_KEY}.txt`,
      urlList,
    }),
  })
}
