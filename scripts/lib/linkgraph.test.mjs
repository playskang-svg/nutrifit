import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { expect, it } from 'vitest'

import { buildGraph } from './linkgraph.mjs'

const put = (dir, sub, doc) => {
  mkdirSync(join(dir, sub), { recursive: true })
  writeFileSync(join(dir, sub, `${doc.slug}.json`), JSON.stringify(doc))
}

it('finds orphans, broken targets and thin posts', () => {
  const dir = mkdtempSync(join(tmpdir(), 'lg-'))
  put(dir, 'hubs', { slug: 'eye', kind: 'body', body: '' })
  put(dir, 'posts', { slug: 'a', hubs: [{ kind: 'body', slug: 'eye' }], body: '{{card:/health/b}}\n{{card:/body/eye}}' })
  put(dir, 'posts', { slug: 'b', hubs: [], body: '{{card:/health/zzz}}' })
  put(dir, 'posts', { slug: 'c', hubs: [], body: '{{card:/health/a}}\n{{card:https://sise.pinda.kr/x}}' })
  const g = buildGraph(dir)
  expect(g.orphans).toEqual(['c'])
  expect(g.broken).toEqual([{ from: '/health/b', to: '/health/zzz' }])
  expect(g.thin).toEqual([{ slug: 'b', cards: 1 }])
})
