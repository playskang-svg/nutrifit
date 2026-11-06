// Publish schedule (Task 17 / 18b Step 4): firstBatch posts at `start`, then perDay a day at `times` (KST) from the next day.
const KST = 9 * 60 * 60 * 1000

export function scheduleDates({ start, firstBatch, perDay, times, count }) {
  const begin = new Date(start)
  if (Number.isNaN(begin.getTime())) throw new Error(`bad start: ${start}`)
  if (times.length < perDay) throw new Error('times must cover perDay')
  const out = []
  for (let i = 0; i < Math.min(firstBatch, count); i++) out.push(begin.toISOString())
  // KST calendar day of start, then day by day.
  const day0 = new Date(begin.getTime() + KST)
  let day = 1
  while (out.length < count) {
    for (const t of times.slice(0, perDay)) {
      if (out.length >= count) break
      const [hh, mm] = t.split(':').map(Number)
      out.push(new Date(Date.UTC(day0.getUTCFullYear(), day0.getUTCMonth(), day0.getUTCDate() + day, hh, mm) - KST).toISOString())
    }
    day++
  }
  return out
}
