import { docBody } from './check.mjs'
import { JevError, judgeSentences } from './jev.mjs'

// Replace suspect issues by Jev's verdict: disease -> FORBIDDEN_CLAIM error, overUl -> OVER_UL error, neither -> dropped.
// A JevError turns the doc's suspects into one JEV_FAILED error (never a guessed answer).
export async function judgeSuspects(doc, issues, { client } = {}) {
  const isSuspect = (i) => i.code === 'FORBIDDEN_CLAIM' || i.code === 'OVER_UL'
  const suspects = issues.filter(isSuspect)
  if (!suspects.length) return issues
  const paragraphs = [docBody(doc), ...(doc.faq ?? []).map((f) => f.a)].flatMap((t) => String(t ?? '').split(/\n\s*\n/))
  const items = suspects.map((i) => {
    const text = i.sentence ?? i.text
    return { text, context: [doc.title ?? doc.name ?? '', paragraphs.find((p) => p.includes(text)) ?? text].join('\n') }
  })
  try {
    const verdicts = await judgeSentences(items, client && { client })
    const kept = []
    suspects.forEach((i, n) => {
      const v = verdicts[n]
      if (i.code === 'FORBIDDEN_CLAIM' && v.diseaseClaim) kept.push({ ...i, severity: 'error' })
      if (i.code === 'OVER_UL' && v.overUlAdvice) kept.push({ ...i, severity: 'error' })
    })
    return [...issues.filter((i) => !isSuspect(i)), ...kept]
  } catch (e) {
    if (!(e instanceof JevError)) throw e
    return [...issues.filter((i) => !isSuspect(i)), { code: 'JEV_FAILED', severity: 'error', where: '-', text: e.message }]
  }
}
