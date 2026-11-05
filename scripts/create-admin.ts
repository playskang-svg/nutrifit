// Creates the first admin so nobody can claim /admin/create-first-user on the public site.
// The password is random and goes only to .secrets/admin.txt (git-ignored); it is never printed.
// Run: NODE_ENV=production pnpm payload run scripts/create-admin.ts   (remote D1)
import crypto from 'node:crypto'
import fs from 'node:fs'

import { getPayload } from 'payload'
import config from '../src/payload.config'

const email = 'admin@nutrifit.kr'
const FILE = '.secrets/admin.txt'

const payload = await getPayload({ config })
const { totalDocs } = await payload.count({ collection: 'users' })
if (totalDocs > 0) {
  console.log(`users already exist (${totalDocs}); nothing created`)
} else {
  const password = crypto.randomBytes(18).toString('base64url')
  // Written first: if the create fails, the file only holds an unused password; the reverse would lose the login.
  fs.mkdirSync('.secrets', { recursive: true })
  fs.writeFileSync(FILE, `${email}\n${password}\n`, { mode: 0o600 })
  await payload.create({ collection: 'users', data: { email, password } })
  console.log(`admin ${email} created; password in ${FILE}`)
}
process.exit(0)
