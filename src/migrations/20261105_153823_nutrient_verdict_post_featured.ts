import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`posts\` ADD \`featured\` integer DEFAULT false;`)
  await db.run(sql`CREATE INDEX \`posts_featured_idx\` ON \`posts\` (\`featured\`);`)
  await db.run(sql`ALTER TABLE \`_posts_v\` ADD \`version_featured\` integer DEFAULT false;`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_featured_idx\` ON \`_posts_v\` (\`version_featured\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP INDEX \`posts_featured_idx\`;`)
  await db.run(sql`ALTER TABLE \`posts\` DROP COLUMN \`featured\`;`)
  await db.run(sql`DROP INDEX \`_posts_v_version_version_featured_idx\`;`)
  await db.run(sql`ALTER TABLE \`_posts_v\` DROP COLUMN \`version_featured\`;`)
}
