import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`posts\` ADD \`area\` text;`)
  await db.run(sql`ALTER TABLE \`_posts_v\` ADD \`version_area\` text;`)
  await db.run(sql`ALTER TABLE \`picks\` ADD \`key\` text NOT NULL;`)
  await db.run(sql`ALTER TABLE \`picks\` ADD \`kind\` text DEFAULT 'supplement' NOT NULL;`)
  await db.run(sql`CREATE UNIQUE INDEX \`picks_key_idx\` ON \`picks\` (\`key\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP INDEX \`picks_key_idx\`;`)
  await db.run(sql`ALTER TABLE \`picks\` DROP COLUMN \`key\`;`)
  await db.run(sql`ALTER TABLE \`picks\` DROP COLUMN \`kind\`;`)
  await db.run(sql`ALTER TABLE \`posts\` DROP COLUMN \`area\`;`)
  await db.run(sql`ALTER TABLE \`_posts_v\` DROP COLUMN \`version_area\`;`)
}
