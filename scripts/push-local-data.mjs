// Copies the seeded local D1 data and media to production. The remote proxy fails on long seeds, a single SQL file does not.
// Run after `pnpm payload run scripts/seed.ts`: node scripts/push-local-data.mjs
import { execSync } from 'node:child_process'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'

import { kept, rank, tableOf } from './lib/push-order.mjs'

const sh = (cmd) => execSync(cmd, { stdio: 'pipe', encoding: 'utf8' })
const wrangler = 'pnpm exec wrangler'
const DB = 'nutrifit'
const BUCKET = 'nutrifit-media'
const dump = '.wrangler/data.sql'

sh(`${wrangler} d1 export ${DB} --local --no-schema --output ${dump}`)
const lines = readFileSync(dump, 'utf8').split('\n')
const tables = new Set()
const inserts = lines
  .filter((line) => {
    const table = tableOf(line)
    if (!table || !kept(table)) return false
    tables.add(table)
    return true
  })
  .sort((a, b) => rank(tableOf(a)) - rank(tableOf(b)))
const body = [
  'PRAGMA defer_foreign_keys=TRUE;',
  ...[...tables].sort((a, b) => rank(b) - rank(a)).map((table) => `DELETE FROM "${table}";`),
  ...inserts,
].join('\n')
writeFileSync(dump, body)
console.log(sh(`${wrangler} d1 execute ${DB} --remote --yes --file ${dump}`).split('\n').slice(-6).join('\n'))

const rows = JSON.parse(sh(`${wrangler} d1 execute ${DB} --local --json --command "select filename from media"`))[0].results
for (const { filename } of rows) {
  const source = [`public/photos/${filename}`, `public/products/${filename}`, `og/${filename}`].find(existsSync)
  if (!source) throw new Error(`no source file for ${filename}`)
  const type = filename.endsWith('.png') ? 'image/png' : 'image/webp'
  sh(`${wrangler} r2 object put ${BUCKET}/${filename} --file ${source} --content-type ${type} --remote`)
  console.log('r2', filename)
}
