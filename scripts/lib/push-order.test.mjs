import fs from 'node:fs'
import path from 'node:path'

import { expect, it } from 'vitest'

import { kept, rank } from './push-order.mjs'

// Every foreign key in the migrations, as [child, parent].
const foreignKeys = () => {
  const dir = path.resolve('src/migrations')
  const pairs = []
  for (const file of fs.readdirSync(dir).filter((name) => name.endsWith('.ts') && name !== 'index.ts')) {
    const src = fs.readFileSync(path.join(dir, file), 'utf8').replaceAll('\\`', '`')
    for (const [, table, body] of src.matchAll(/CREATE TABLE `([a-z_0-9]+)`([\s\S]*?)\);/g)) {
      for (const [, parent] of body.matchAll(/REFERENCES `([a-z_0-9]+)`/g)) if (parent !== table) pairs.push([table, parent])
    }
  }
  return pairs
}

it('inserts every parent table before the tables that reference it', () => {
  const pairs = foreignKeys().filter(([child]) => kept(child))
  expect(pairs.length).toBeGreaterThan(20)
  for (const [child, parent] of pairs) {
    expect(kept(parent), `${child} references ${parent}, which is not pushed`).toBe(true)
    expect(rank(parent), `${parent} before ${child}`).toBeLessThan(rank(child))
  }
})

it('leaves accounts, sessions and migration state to the remote database', () => {
  for (const table of ['users', 'users_sessions', 'payload_migrations', 'payload_preferences_rels', 'payload_locked_documents_rels']) {
    expect(kept(table)).toBe(false)
  }
})
