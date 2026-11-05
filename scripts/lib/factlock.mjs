// Fact lock: the humanize pass may reword sentences but must keep every number and directive.
// Numbers are compared as a multiset in one spelling (5,000 IU -> 5000IU); Korean counters after a number are ignored.

const DIRECTIVE = /\{\{[^}]*\}\}/g
const NUMBER = /\d[\d,]*(?:\.\d+)?(?:\s?(?:[A-Za-zμµ㎎㎍%]+))?/g

export function factTokens(text) {
  const directives = []
  const numbers = []
  for (const raw of text.split('\n')) {
    const line = raw.trim()
    if (line.startsWith(':::')) {
      directives.push(line)
      continue
    }
    directives.push(...(line.match(DIRECTIVE) ?? []))
    for (const n of line.replace(DIRECTIVE, ' ').match(NUMBER) ?? []) {
      numbers.push(n.replace(/[,\s]/g, '').replace(/µ/g, 'μ'))
    }
  }
  return { numbers, directives }
}

// Multiset difference: what `a` has more of than `b`.
const minus = (a, b) => {
  const left = [...b]
  return a.filter((x) => {
    const i = left.indexOf(x)
    if (i < 0) return true
    left.splice(i, 1)
    return false
  })
}

export function sameFacts(before, after) {
  const b = factTokens(before)
  const a = factTokens(after)
  const missing = [...minus(b.numbers, a.numbers), ...minus(b.directives, a.directives)]
  const added = [...minus(a.numbers, b.numbers), ...minus(a.directives, b.directives)]
  return { ok: missing.length === 0 && added.length === 0, missing, added }
}
