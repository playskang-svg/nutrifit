// Which local D1 tables push-local-data copies, and in what order. D1 applies the file in batches,
// so deferred foreign keys do not help: parents have to come first (push-order.test.mjs checks the migrations).
const REMOTE_ONLY = /^(payload_migrations|payload_preferences|payload_preferences_rels|payload_kv|payload_locked_documents|payload_locked_documents_rels|users|users_sessions)$/

export const kept = (table) => !REMOTE_ONLY.test(table)

// nutrients_rels is named on its own: it points at picks, which point at nutrients.
const ORDER = ['categories', 'media', 'affiliate_links', 'nutrients', 'picks', 'nutrients_rels', 'posts', '_posts_v', 'hubs', 'pages', 'navigation']

export function rank(table) {
  const index = ORDER.indexOf(table)
  if (index >= 0) return index * 2
  // Child tables such as posts_hubs or picks_per_serving follow their parent.
  const parent = ORDER.findIndex((name) => table.startsWith(`${name}_`))
  return parent >= 0 ? parent * 2 + 1 : ORDER.length * 2
}

export const tableOf = (line) => line.match(/^INSERT INTO "?([a-z_0-9]+)"?[ (]/)?.[1] ?? ''
