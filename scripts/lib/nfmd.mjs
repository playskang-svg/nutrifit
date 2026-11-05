// NF-markdown (the body syntax of data/*.json) -> Payload Lexical JSON; block fields match the body blocks in src/blocks.
// Errors are NfmdError with the 1-based source line, so content gates can point at the exact line.

export class NfmdError extends Error {
  constructor(message, line) {
    super(message)
    this.name = 'NfmdError'
    this.line = line
  }
}

const BOLD = 1
const HIGHLIGHT = 128 // Lexical IS_HIGHLIGHT
const TONES = ['tip', 'warn', 'check', 'note']
const LINK = /^\[([^\]]+)\]\(([^)\s]+)\)/
const SAME_SITE = /^(\/|https:\/\/nutrifit\.kr(\/|$))/

const element = (type, children, extra = {}) => ({ type, version: 1, direction: 'ltr', format: '', indent: 0, children, ...extra })
const paragraph = (children) =>
  element('paragraph', children, { textFormat: children.find((n) => n.type === 'text')?.format ?? 0, textStyle: '' })
const block = (state, blockType, fields) => ({
  type: 'block',
  version: 2,
  format: '',
  fields: { id: `${blockType}-${++state.ids}`, blockName: '', blockType, ...fields },
})

// Adjacent runs with the same format share one text node, as Lexical normalizes them.
const pushText = (nodes, text, format) => {
  const last = nodes.at(-1)
  if (last?.type === 'text' && last.format === format) last.text += text
  else nodes.push({ type: 'text', version: 1, text, format, mode: 'normal', style: '', detail: 0 })
}

function inline(src, line, base = 0, nodes = []) {
  if (/!\[[^\]]*\]\([^)]*\)/.test(src)) throw new NfmdError('이미지는 {{photo:키|캡션}}으로 쓰세요', line)
  let format = base
  let run = ''
  const flush = () => {
    if (/https?:\/\//.test(run)) throw new NfmdError('URL을 그대로 쓰지 마세요', line)
    if (run.includes('{{')) throw new NfmdError('지시어는 한 줄에 하나만 따로 쓰세요', line)
    if (run) pushText(nodes, run, format)
    run = ''
  }
  for (let i = 0; i < src.length; ) {
    const mark = src.slice(i, i + 2)
    const link = src[i] === '[' && LINK.exec(src.slice(i))
    if (mark === '**' || mark === '==') {
      flush()
      format ^= mark === '**' ? BOLD : HIGHLIGHT
      i += 2
    } else if (link) {
      flush()
      const [whole, label, url] = link
      if (!/^(https?:\/\/|\/(?!\/))/.test(url)) throw new NfmdError(`링크 주소는 https:// 또는 /로 시작해야 해요: ${url}`, line)
      // version 3 is what Payload's LinkNode exports; no id, as the editor itself writes after loading older links.
      const fields = { linkType: 'custom', url, newTab: !SAME_SITE.test(url) }
      nodes.push(element('link', inline(label, line, format), { version: 3, fields }))
      i += whole.length
    } else run += src[i++]
  }
  flush()
  if (format !== base) throw new NfmdError('**와 ==는 같은 줄 안에서 닫으세요', line)
  return nodes
}

// Table cells, captions and callout titles are plain strings in the block fields.
const plain = (src, line) => {
  const nodes = inline(src, line)
  if (nodes.some((n) => n.type === 'link')) throw new NfmdError('표 칸·캡션·상자 제목에는 링크를 넣을 수 없어요', line)
  return nodes.map((n) => n.text).join('')
}

// Lines of one paragraph or quote join with a space.
const joined = (entries) => entries.reduce((nodes, { text, line }, k) => inline(k ? ` ${text}` : text, line, 0, nodes), [])

const kindOf = (lines, i) => {
  const text = lines[i].text
  if (!text) return 'blank'
  if (text.startsWith(':::')) return 'callout'
  if (/^\{\{[^{}]*\}\}$/.test(text)) return 'directive'
  if (/^#{1,6}\s/.test(text)) return 'heading'
  if (/^-{3,}$/.test(text)) return 'hr'
  if (text.startsWith('>')) return 'quote'
  if (/^-\s/.test(text)) return 'ul'
  if (/^\d+\.\s/.test(text)) return 'ol'
  if (text.startsWith('|') || (text.startsWith('표:') && lines[i + 1]?.text.startsWith('|'))) return 'table'
  return 'p'
}

const list = (items, tag) => {
  const start = tag === 'ol' ? parseInt(items[0].text, 10) : 1
  const children = items.map(({ text, line }, k) =>
    element('listitem', inline(text.replace(/^(-|\d+\.)\s+/, ''), line), { value: start + k }),
  )
  return element('list', children, { listType: tag === 'ul' ? 'bullet' : 'number', start, tag })
}

// The first column holds the row labels; the remaining header cells are the columns.
function compare(rows, caption, state) {
  const cells = ({ text }) => text.replace(/^\|/, '').replace(/\|$/, '').split('|').map((cell) => cell.trim())
  const [head, rule, ...body] = rows
  const labels = cells(head)
  if (!rule || !cells(rule).every((cell) => /^:?-+:?$/.test(cell))) {
    throw new NfmdError('표 둘째 줄은 |---|---| 구분선이어야 해요', (rule ?? head).line)
  }
  for (const row of [rule, ...body]) {
    if (cells(row).length !== labels.length) throw new NfmdError('표 칸 수가 머리줄과 달라요', row.line)
  }
  return block(state, 'compare', {
    caption,
    columns: labels.slice(1).map((label) => ({ label: plain(label, head.line) })),
    rows: body.map((row) => {
      const [label, ...values] = cells(row)
      return { label: plain(label, row.line), cells: values.map((value) => ({ value: plain(value, row.line) })) }
    }),
  })
}

function directive(text, line, state) {
  const { ctx } = state
  const [, name, rawArg] = /^\{\{(\w+)(?::(.*))?\}\}$/.exec(text) ?? []
  const arg = (rawArg ?? '').trim()
  if (text === '{{banner}}') {
    if (state.banners++) throw new NfmdError('banner는 한 번만', line)
    return block(state, 'banner', {})
  }
  if (name === 'pick') {
    const nutrient = /^(?:auto|search)-(.+)$/.exec(arg)?.[1]
    if (!ctx.picks.has(arg) && !(nutrient && ctx.nutrients.has(nutrient))) throw new NfmdError(`없는 상품이에요: ${arg}`, line)
    return block(state, 'pick', { pickId: arg })
  }
  if (name === 'intake' || name === 'timing') {
    if (!ctx.nutrients.has(arg)) throw new NfmdError(`없는 성분이에요: ${arg}`, line)
    return block(state, name === 'intake' ? 'intakeBar' : 'timeline', { nutrient: arg })
  }
  if (name === 'photo') {
    const [rawKey, ...rest] = arg.split('|')
    const key = rawKey.trim()
    const caption = rest.join('|').trim()
    if (!ctx.photos.has(key)) throw new NfmdError(`없는 사진이에요: ${key}`, line)
    if (!caption) throw new NfmdError('사진 캡션을 쓰세요: {{photo:키|캡션}}', line)
    return block(state, 'photo', { photo: key, caption: plain(caption, line) })
  }
  if (name === 'card') {
    const card = ctx.cards.get(arg)
    if (!card) throw new NfmdError(`없는 카드 주소예요: ${arg}`, line)
    return block(state, 'linkCard', { href: arg, title: card.title, summary: card.summary, image: card.image ?? '' })
  }
  throw new NfmdError(`모르는 지시어예요: ${text}`, line)
}

function blocks(lines, state, inCallout) {
  const out = []
  let i = 0
  const run = (kind) => {
    const start = i
    while (i < lines.length && kindOf(lines, i) === kind) i++
    return lines.slice(start, i)
  }
  while (i < lines.length) {
    const kind = kindOf(lines, i)
    const { text, line } = lines[i]
    if (kind === 'blank') {
      i++
      continue
    }
    if (inCallout && !['p', 'ul', 'ol'].includes(kind)) throw new NfmdError('상자 안에는 문단과 목록만 쓸 수 있어요', line)
    if (kind === 'p') out.push(paragraph(joined(run('p'))))
    else if (kind === 'quote') out.push(element('quote', joined(run('quote').map((l) => ({ ...l, text: l.text.slice(1).trim() })))))
    else if (kind === 'ul' || kind === 'ol') out.push(list(run(kind), kind))
    else if (kind === 'table') {
      let caption = ''
      if (!text.startsWith('|')) {
        caption = plain(text.slice(2).trim(), line)
        i++
      }
      const rows = []
      while (i < lines.length && lines[i].text.startsWith('|')) rows.push(lines[i++])
      out.push(compare(rows, caption, state))
    } else if (kind === 'callout') {
      const [, tone, title] = /^:::\s*(\S*)\s*(.*)$/.exec(text)
      if (!tone) throw new NfmdError('여는 줄 없이 :::만 있어요', line)
      if (!TONES.includes(tone)) throw new NfmdError(`상자 종류는 tip·warn·check·note 중 하나예요: ${tone}`, line)
      const end = lines.findIndex((l, k) => k > i && l.text === ':::')
      if (end < 0) throw new NfmdError('상자를 :::로 닫으세요', line)
      const inner = lines.slice(i + 1, end)
      // The title is read before the body so errors come in line order.
      out.push(block(state, 'callout', { tone, title: plain(title, line), body: { root: element('root', blocks(inner, state, true)) } }))
      i = end + 1
    } else {
      if (kind === 'heading') {
        const [, hashes, body] = /^(#+)\s+(.*)$/.exec(text)
        if (hashes.length !== 2 && hashes.length !== 3) throw new NfmdError('제목은 ## 또는 ###만 쓰세요', line)
        out.push(element('heading', inline(body, line), { tag: `h${hashes.length}` }))
      } else if (kind === 'hr') out.push({ type: 'horizontalrule', version: 1 })
      else out.push(directive(text, line, state))
      i++
    }
  }
  return out
}

export function nfmdToLexical(src, ctx) {
  const lines = src.split(/\r?\n/).map((text, i) => ({ text: text.trim(), line: i + 1 }))
  return { root: element('root', blocks(lines, { ctx, ids: 0, banners: 0 }, false)) }
}
