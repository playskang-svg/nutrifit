// Reads data/ and turns each JSON record into the Payload document the seed writes. Pure apart from readData,
// so tests can check every mapping without a database.
import fs from 'node:fs'
import path from 'node:path'

import { NfmdError, nfmdToLexical } from './nfmd.mjs'

const HUB_PATH = { body: '/body', life: '/life', area: '/symptoms' }
const SISE_SUMMARY = '시세핀다에서 오늘 시세와 영양 정보를 확인하세요.'

// Content arrives over later tasks, so a missing file or folder is an empty list.
export function readData(dir) {
  const json = (file, fallback) => (fs.existsSync(path.join(dir, file)) ? JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8')) : fallback)
  const folder = (name) => {
    const full = path.join(dir, name)
    if (!fs.existsSync(full)) return []
    return fs
      .readdirSync(full)
      .filter((file) => file.endsWith('.json'))
      .sort()
      .map((file) => json(path.join(name, file)))
  }
  return {
    categories: json('categories.json', []),
    pages: folder('pages'),
    posts: folder('posts'),
    nutrients: folder('nutrients'),
    hubs: folder('hubs'),
    picks: json('picks.json', []),
    links: json('links.json', []),
    photos: json('photos.json', {}),
    siseFoods: json('sise-foods.json', {}),
  }
}

// What NF-markdown directives may point at: real picks, nutrients, photos and the pages a {{card:}} can show.
export function buildCtx(data) {
  const photoSrc = (key) => (key && data.photos[key]?.src) || ''
  const cards = new Map()
  for (const post of data.posts) {
    cards.set(`/health/${post.slug}`, { title: post.title, summary: post.description, image: photoSrc(post.heroPhoto) })
  }
  for (const item of data.nutrients) {
    cards.set(`/nutrients/${item.slug}`, { title: item.name, summary: item.summary, image: photoSrc(item.heroPhoto) })
  }
  for (const hub of data.hubs) {
    cards.set(`${HUB_PATH[hub.kind]}/${hub.slug}`, { title: hub.name, summary: hub.summary, image: photoSrc(hub.heroPhoto) })
  }
  for (const food of Object.values(data.siseFoods).flat()) {
    if (food.url?.startsWith('https://sise.pinda.kr/')) cards.set(food.url, { title: food.name, summary: SISE_SUMMARY, image: '' })
  }
  return {
    picks: new Set(data.picks.map((pick) => pick.id)),
    nutrients: new Set(data.nutrients.map((item) => item.slug)),
    photos: new Set(Object.keys(data.photos)),
    cards,
  }
}

// One prefix per rich-text field keeps block ids unique inside a document.
export function rich(src, ctx, field, where) {
  try {
    return nfmdToLexical(src ?? '', { ...ctx, idPrefix: `${field}-` })
  } catch (error) {
    if (error instanceof NfmdError) throw new Error(`${where} ${field} ${error.line}행: ${error.message}`)
    throw error
  }
}

const need = (ids, key, what, where) => {
  const id = ids.get(key)
  if (id === undefined) throw new Error(`${where}: 없는 ${what} ${key}`)
  return id
}
const many = (ids, keys, what, where) => (keys ?? []).map((key) => need(ids, key, what, where))
const words = (list) => (list ?? []).join(', ')

export const categoryDoc = ({ slug, title, lede, order }) => ({ slug, title, lede, order })

export const pageDoc = (page, ctx) => ({
  slug: page.slug,
  title: page.title,
  description: page.description,
  content: rich(page.body, ctx, 'body', `pages/${page.slug}`),
})

export const linkDoc = (link) => ({
  name: link.target ?? link.slug,
  slug: link.slug,
  url: link.url,
  target: link.target,
  lptag: link.lptag,
  issuedAt: link.issuedAt,
})

// ids.links and ids.nutrients map slugs to Payload ids.
export function pickDoc(pick, ids) {
  const where = `picks ${pick.id}`
  return {
    key: pick.id,
    kind: pick.kind,
    name: pick.name,
    brand: pick.brand,
    coupangProductId: pick.coupangProductId,
    link: need(ids.links, pick.link, '링크', where),
    image: pick.image,
    nutrient: pick.nutrient ? need(ids.nutrients, pick.nutrient, '성분', where) : undefined,
    form: pick.form,
    perServing: pick.perServing ?? [],
    isHealthFunctionalFood: pick.isHealthFunctionalFood ?? false,
    reason: pick.reason,
    caution: pick.caution,
    price: pick.price,
    checkedAt: pick.checkedAt,
  }
}

// picks are set in a second pass: they point back at nutrients.
export function nutrientDoc(item, ctx) {
  const where = `nutrients/${item.slug}`
  return {
    name: item.name,
    slug: item.slug,
    aliases: item.aliases,
    group: item.group,
    summary: item.summary,
    primaryKeyword: item.primaryKeyword,
    verdict: item.verdict,
    officialClaims: item.officialClaims,
    intake: item.intake,
    deficiency: rich(item.deficiency, ctx, 'deficiency', where),
    excess: rich(item.excess, ctx, 'excess', where),
    timing: rich(item.timing, ctx, 'timing', where),
    interactions: item.interactions,
    foods: item.foods,
    howToChoose: rich(item.howToChoose, ctx, 'howToChoose', where),
    faq: item.faq,
    sources: item.sources,
    keywords: words(item.keywords),
    heroPhoto: item.heroPhoto,
    order: item.order,
  }
}

// relatedPosts are set in a second pass: they point at other posts.
export function postDoc(post, ctx, ids) {
  const where = `posts/${post.slug}`
  return {
    title: post.title,
    slug: post.slug,
    seoTitle: post.seoTitle,
    description: post.description,
    category: need(ids.categories, post.category, '카테고리', where),
    area: post.area,
    featured: post.featured ?? false,
    primaryKeyword: post.primaryKeyword,
    hubs: post.hubs,
    keyPoints: post.keyPoints,
    verdict: post.verdict,
    content: rich(post.body, ctx, 'body', where),
    faq: post.faq,
    sources: post.sources,
    keywords: words(post.keywords),
    heroPhoto: post.heroPhoto,
    ogImage: post.ogImage,
    // A future date is the schedule: published rows stay hidden until then.
    publishedAt: post.publishedAt,
    updatedAtDisplay: post.updatedAtDisplay,
    _status: 'published',
  }
}

export function hubDoc(hub, ctx, ids) {
  const where = `hubs/${hub.kind}-${hub.slug}`
  return {
    kind: hub.kind,
    name: hub.name,
    slug: hub.slug,
    summary: hub.summary,
    primaryKeyword: hub.primaryKeyword,
    content: rich(hub.body, ctx, 'body', where),
    nutrients: many(ids.nutrients, hub.nutrients, '성분', where),
    posts: many(ids.posts, hub.posts, '글', where),
    picks: many(ids.picks, hub.picks, '상품', where),
    faq: hub.faq,
    sources: hub.sources,
    keywords: words(hub.keywords),
    heroPhoto: hub.heroPhoto,
    heroVideo: hub.heroVideo,
    order: hub.order,
  }
}

export const relatedIds = (post, ids) => many(ids.posts, post.relatedPosts, '글', `posts/${post.slug}`)
export const nutrientPickIds = (item, ids) => many(ids.picks, item.picks, '상품', `nutrients/${item.slug}`)
