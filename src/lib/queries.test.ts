import { readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'

import { expect, test } from 'vitest'

import { nfmdToLexical } from '../../scripts/lib/nfmd.mjs'
import { blockRefs } from './queries'

const SRC = path.resolve(__dirname, '..')
const files = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? files(path.join(dir, entry.name)) : /\.tsx?$/.test(entry.name) ? [path.join(dir, entry.name)] : [],
  )

// Every posts read goes through queries.ts, which adds the published-and-not-future filter.
test('posts are read only through src/lib/queries.ts', () => {
  const offenders = files(SRC)
    .filter((file) => path.relative(SRC, file) !== path.join('lib', 'queries.ts'))
    .filter((file) => /collection:\s*['"]posts['"]/.test(readFileSync(file, 'utf8')))
    .map((file) => path.relative(SRC, file))
  expect(offenders).toEqual([])
})

test('blockRefs finds picks, search links and nutrients, and skips auto picks', () => {
  const ctx = { picks: new Set(['mg-01']), nutrients: new Set(['magnesium', 'zinc']), photos: new Set(), cards: new Map() }
  const a = nfmdToLexical('{{pick:mg-01}}\n\n{{intake:magnesium}}', ctx)
  const b = nfmdToLexical('{{pick:search-zinc}}\n\n{{timing:zinc}}\n\n{{pick:auto-zinc}}', ctx)
  const refs = blockRefs([a, b, null])
  expect([...refs.picks]).toEqual(['mg-01'])
  expect([...refs.links]).toEqual(['search-zinc'])
  expect([...refs.nutrients].sort()).toEqual(['magnesium', 'zinc'])
})
