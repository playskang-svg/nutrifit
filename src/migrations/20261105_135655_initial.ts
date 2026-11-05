import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`posts_hubs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`kind\` text,
  	\`slug\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_hubs_order_idx\` ON \`posts_hubs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_hubs_parent_id_idx\` ON \`posts_hubs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`q\` text,
  	\`a\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_faq_order_idx\` ON \`posts_faq\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_faq_parent_id_idx\` ON \`posts_faq\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_sources\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`url\` text,
  	\`publisher\` text,
  	\`date\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_sources_order_idx\` ON \`posts_sources\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_sources_parent_id_idx\` ON \`posts_sources\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`slug\` text,
  	\`published_at\` text,
  	\`category_id\` integer,
  	\`updated_at_display\` text,
  	\`primary_keyword\` text,
  	\`seo_title\` text,
  	\`description\` text,
  	\`content\` text,
  	\`keywords\` text,
  	\`hero_photo\` text,
  	\`og_image\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_slug_idx\` ON \`posts\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`posts_published_at_idx\` ON \`posts\` (\`published_at\`);`)
  await db.run(sql`CREATE INDEX \`posts_category_idx\` ON \`posts\` (\`category_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_updated_at_idx\` ON \`posts\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`posts_created_at_idx\` ON \`posts\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`posts__status_idx\` ON \`posts\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`posts_texts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_texts_order_parent\` ON \`posts_texts\` (\`order\`,\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`posts_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_rels_order_idx\` ON \`posts_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`posts_rels_parent_idx\` ON \`posts_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_rels_path_idx\` ON \`posts_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`posts_rels_posts_id_idx\` ON \`posts_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_version_hubs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`kind\` text,
  	\`slug\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_version_hubs_order_idx\` ON \`_posts_v_version_hubs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_hubs_parent_id_idx\` ON \`_posts_v_version_hubs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_version_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`q\` text,
  	\`a\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_version_faq_order_idx\` ON \`_posts_v_version_faq\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_faq_parent_id_idx\` ON \`_posts_v_version_faq\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_version_sources\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`url\` text,
  	\`publisher\` text,
  	\`date\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_version_sources_order_idx\` ON \`_posts_v_version_sources\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_sources_parent_id_idx\` ON \`_posts_v_version_sources\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text,
  	\`version_slug\` text,
  	\`version_published_at\` text,
  	\`version_category_id\` integer,
  	\`version_updated_at_display\` text,
  	\`version_primary_keyword\` text,
  	\`version_seo_title\` text,
  	\`version_description\` text,
  	\`version_content\` text,
  	\`version_keywords\` text,
  	\`version_hero_photo\` text,
  	\`version_og_image\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_category_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_parent_idx\` ON \`_posts_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_slug_idx\` ON \`_posts_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_published_at_idx\` ON \`_posts_v\` (\`version_published_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_category_idx\` ON \`_posts_v\` (\`version_category_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_updated_at_idx\` ON \`_posts_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_created_at_idx\` ON \`_posts_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version__status_idx\` ON \`_posts_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_created_at_idx\` ON \`_posts_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_updated_at_idx\` ON \`_posts_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_latest_idx\` ON \`_posts_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_texts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_texts_order_parent\` ON \`_posts_v_texts\` (\`order\`,\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`posts_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_rels_order_idx\` ON \`_posts_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_rels_parent_idx\` ON \`_posts_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_rels_path_idx\` ON \`_posts_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_rels_posts_id_idx\` ON \`_posts_v_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE TABLE \`pages\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`description\` text,
  	\`content\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_slug_idx\` ON \`pages\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`pages_updated_at_idx\` ON \`pages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`pages_created_at_idx\` ON \`pages\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`categories\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`lede\` text NOT NULL,
  	\`order\` numeric DEFAULT 100,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`categories_slug_idx\` ON \`categories\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`categories_updated_at_idx\` ON \`categories\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`categories_created_at_idx\` ON \`categories\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`nutrients_official_claims\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	\`source\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`nutrients\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`nutrients_official_claims_order_idx\` ON \`nutrients_official_claims\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`nutrients_official_claims_parent_id_idx\` ON \`nutrients_official_claims\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`nutrients_intake_rows\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`sex\` text NOT NULL,
  	\`age\` text NOT NULL,
  	\`rni\` numeric,
  	\`ai\` numeric,
  	\`ul\` numeric,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`nutrients\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`nutrients_intake_rows_order_idx\` ON \`nutrients_intake_rows\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`nutrients_intake_rows_parent_id_idx\` ON \`nutrients_intake_rows\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`nutrients_foods\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`value\` numeric,
  	\`unit\` text,
  	\`url\` text NOT NULL,
  	\`source\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`nutrients\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`nutrients_foods_order_idx\` ON \`nutrients_foods\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`nutrients_foods_parent_id_idx\` ON \`nutrients_foods\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`nutrients_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`q\` text NOT NULL,
  	\`a\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`nutrients\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`nutrients_faq_order_idx\` ON \`nutrients_faq\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`nutrients_faq_parent_id_idx\` ON \`nutrients_faq\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`nutrients_sources\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`url\` text NOT NULL,
  	\`publisher\` text,
  	\`date\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`nutrients\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`nutrients_sources_order_idx\` ON \`nutrients_sources\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`nutrients_sources_parent_id_idx\` ON \`nutrients_sources\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`nutrients\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`group\` text NOT NULL,
  	\`summary\` text NOT NULL,
  	\`primary_keyword\` text NOT NULL,
  	\`intake_edition\` text,
  	\`intake_unit\` text,
  	\`intake_pregnancy_note\` text,
  	\`deficiency\` text,
  	\`excess\` text,
  	\`timing\` text,
  	\`how_to_choose\` text,
  	\`keywords\` text,
  	\`hero_photo\` text,
  	\`order\` numeric DEFAULT 100,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`nutrients_slug_idx\` ON \`nutrients\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`nutrients_updated_at_idx\` ON \`nutrients\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`nutrients_created_at_idx\` ON \`nutrients\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`nutrients_texts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`nutrients\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`nutrients_texts_order_parent\` ON \`nutrients_texts\` (\`order\`,\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`nutrients_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`picks_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`nutrients\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`picks_id\`) REFERENCES \`picks\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`nutrients_rels_order_idx\` ON \`nutrients_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`nutrients_rels_parent_idx\` ON \`nutrients_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`nutrients_rels_path_idx\` ON \`nutrients_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`nutrients_rels_picks_id_idx\` ON \`nutrients_rels\` (\`picks_id\`);`)
  await db.run(sql`CREATE TABLE \`hubs_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`q\` text NOT NULL,
  	\`a\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`hubs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`hubs_faq_order_idx\` ON \`hubs_faq\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`hubs_faq_parent_id_idx\` ON \`hubs_faq\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`hubs_sources\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`url\` text NOT NULL,
  	\`publisher\` text,
  	\`date\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`hubs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`hubs_sources_order_idx\` ON \`hubs_sources\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`hubs_sources_parent_id_idx\` ON \`hubs_sources\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`hubs\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`kind\` text NOT NULL,
  	\`name\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`summary\` text NOT NULL,
  	\`primary_keyword\` text NOT NULL,
  	\`content\` text,
  	\`keywords\` text,
  	\`hero_photo\` text,
  	\`hero_video\` text,
  	\`order\` numeric DEFAULT 100,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`hubs_slug_idx\` ON \`hubs\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`hubs_updated_at_idx\` ON \`hubs\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`hubs_created_at_idx\` ON \`hubs\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`hubs_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`nutrients_id\` integer,
  	\`posts_id\` integer,
  	\`picks_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`hubs\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`nutrients_id\`) REFERENCES \`nutrients\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`picks_id\`) REFERENCES \`picks\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`hubs_rels_order_idx\` ON \`hubs_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`hubs_rels_parent_idx\` ON \`hubs_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`hubs_rels_path_idx\` ON \`hubs_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`hubs_rels_nutrients_id_idx\` ON \`hubs_rels\` (\`nutrients_id\`);`)
  await db.run(sql`CREATE INDEX \`hubs_rels_posts_id_idx\` ON \`hubs_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`hubs_rels_picks_id_idx\` ON \`hubs_rels\` (\`picks_id\`);`)
  await db.run(sql`CREATE TABLE \`picks_per_serving\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`amount\` numeric NOT NULL,
  	\`unit\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`picks\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`picks_per_serving_order_idx\` ON \`picks_per_serving\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`picks_per_serving_parent_id_idx\` ON \`picks_per_serving\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`picks\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`brand\` text NOT NULL,
  	\`coupang_product_id\` text NOT NULL,
  	\`link_id\` integer NOT NULL,
  	\`image\` text,
  	\`nutrient_id\` integer,
  	\`form\` text,
  	\`is_health_functional_food\` integer DEFAULT false,
  	\`reason\` text,
  	\`caution\` text,
  	\`price_value\` numeric,
  	\`price_unit\` text,
  	\`price_collected_at\` text,
  	\`checked_at\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`link_id\`) REFERENCES \`affiliate_links\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`nutrient_id\`) REFERENCES \`nutrients\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`picks_link_idx\` ON \`picks\` (\`link_id\`);`)
  await db.run(sql`CREATE INDEX \`picks_nutrient_idx\` ON \`picks\` (\`nutrient_id\`);`)
  await db.run(sql`CREATE INDEX \`picks_updated_at_idx\` ON \`picks\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`picks_created_at_idx\` ON \`picks\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`affiliate_links\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`url\` text NOT NULL,
  	\`target\` text,
  	\`lptag\` text DEFAULT 'AF8819972',
  	\`issued_at\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`affiliate_links_slug_idx\` ON \`affiliate_links\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`affiliate_links_updated_at_idx\` ON \`affiliate_links\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`affiliate_links_created_at_idx\` ON \`affiliate_links\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`media\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`alt\` text NOT NULL,
  	\`_objectkey\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric
  );
  `)
  await db.run(sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
  await db.run(sql`CREATE TABLE \`users_sessions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`created_at\` text,
  	\`expires_at\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_sessions_order_idx\` ON \`users_sessions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`users_sessions_parent_id_idx\` ON \`users_sessions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`users\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`reset_password_requested_at\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`)
  await db.run(sql`CREATE TABLE \`payload_kv\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`posts_id\` integer,
  	\`pages_id\` integer,
  	\`categories_id\` integer,
  	\`nutrients_id\` integer,
  	\`hubs_id\` integer,
  	\`picks_id\` integer,
  	\`affiliate_links_id\` integer,
  	\`media_id\` integer,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`nutrients_id\`) REFERENCES \`nutrients\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`hubs_id\`) REFERENCES \`hubs\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`picks_id\`) REFERENCES \`picks\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`affiliate_links_id\`) REFERENCES \`affiliate_links\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_posts_id_idx\` ON \`payload_locked_documents_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_pages_id_idx\` ON \`payload_locked_documents_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_categories_id_idx\` ON \`payload_locked_documents_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_nutrients_id_idx\` ON \`payload_locked_documents_rels\` (\`nutrients_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_hubs_id_idx\` ON \`payload_locked_documents_rels\` (\`hubs_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_picks_id_idx\` ON \`payload_locked_documents_rels\` (\`picks_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_affiliate_links_id_idx\` ON \`payload_locked_documents_rels\` (\`affiliate_links_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_migrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`navigation_header\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`url\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`navigation\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`navigation_header_order_idx\` ON \`navigation_header\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`navigation_header_parent_id_idx\` ON \`navigation_header\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`navigation_footer\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`url\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`navigation\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`navigation_footer_order_idx\` ON \`navigation_footer\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`navigation_footer_parent_id_idx\` ON \`navigation_footer\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`navigation\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`posts_hubs\`;`)
  await db.run(sql`DROP TABLE \`posts_faq\`;`)
  await db.run(sql`DROP TABLE \`posts_sources\`;`)
  await db.run(sql`DROP TABLE \`posts\`;`)
  await db.run(sql`DROP TABLE \`posts_texts\`;`)
  await db.run(sql`DROP TABLE \`posts_rels\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_version_hubs\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_version_faq\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_version_sources\`;`)
  await db.run(sql`DROP TABLE \`_posts_v\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_texts\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_rels\`;`)
  await db.run(sql`DROP TABLE \`pages\`;`)
  await db.run(sql`DROP TABLE \`categories\`;`)
  await db.run(sql`DROP TABLE \`nutrients_official_claims\`;`)
  await db.run(sql`DROP TABLE \`nutrients_intake_rows\`;`)
  await db.run(sql`DROP TABLE \`nutrients_foods\`;`)
  await db.run(sql`DROP TABLE \`nutrients_faq\`;`)
  await db.run(sql`DROP TABLE \`nutrients_sources\`;`)
  await db.run(sql`DROP TABLE \`nutrients\`;`)
  await db.run(sql`DROP TABLE \`nutrients_texts\`;`)
  await db.run(sql`DROP TABLE \`nutrients_rels\`;`)
  await db.run(sql`DROP TABLE \`hubs_faq\`;`)
  await db.run(sql`DROP TABLE \`hubs_sources\`;`)
  await db.run(sql`DROP TABLE \`hubs\`;`)
  await db.run(sql`DROP TABLE \`hubs_rels\`;`)
  await db.run(sql`DROP TABLE \`picks_per_serving\`;`)
  await db.run(sql`DROP TABLE \`picks\`;`)
  await db.run(sql`DROP TABLE \`affiliate_links\`;`)
  await db.run(sql`DROP TABLE \`media\`;`)
  await db.run(sql`DROP TABLE \`users_sessions\`;`)
  await db.run(sql`DROP TABLE \`users\`;`)
  await db.run(sql`DROP TABLE \`payload_kv\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_migrations\`;`)
  await db.run(sql`DROP TABLE \`navigation_header\`;`)
  await db.run(sql`DROP TABLE \`navigation_footer\`;`)
  await db.run(sql`DROP TABLE \`navigation\`;`)
}
