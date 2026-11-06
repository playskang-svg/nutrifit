import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { cache } from 'react'

import { SITE_URL } from '@/lib/payload'
import { photoUrl } from '@/lib/photos'
import { getHub, picksById, postsForHub, richTextContext } from '@/lib/queries'
import { collectionPage, crumbs, faqPage, graph } from '@/lib/jsonld'
import { keywordTitle, pageMeta } from '@/lib/seo'
import type { Hub, Nutrient } from '@/payload-types'

import { ArticleEnd } from './ArticleEnd'
import { areaLabel, BodyMap } from './BodyMap'
import { Breadcrumbs } from './Breadcrumbs'
import { FaqList } from './FaqList'
import { HubGrid } from './HubGrid'
import { JsonLd } from './JsonLd'
import { PhotoHead } from './PhotoHead'
import { PickCard } from './PickCard'
import { PostList } from './PostList'
import { RichText } from './RichText'

const KINDS = {
  body: { base: '/body', crumb: '몸 고민', posts: 12 },
  life: { base: '/life', crumb: '생애주기', posts: 12 },
  area: { base: '/symptoms', crumb: '증상', posts: 60 },
} as const

// Area pages exist for all 14 body areas, with or without a hub document; body and life pages need one.
const load = cache(async (kind: Hub['kind'], slug: string) => {
  const hub = await getHub(kind, slug)
  const name = hub?.name ?? (kind === 'area' ? areaLabel(slug) : undefined)
  if (!name) notFound()
  return { hub, name }
})

export async function hubMetadata(kind: Hub['kind'], slug: string): Promise<Metadata> {
  const { hub, name } = await load(kind, slug)
  const title = hub ? keywordTitle(name, hub.primaryKeyword) : `${name} 증상`
  return pageMeta({
    title,
    description: hub?.summary ?? `${name}에 나타나는 증상의 흔한 원인과 집에서 해볼 것, 병원에 가야 할 때를 정리했어요.`,
    path: `${KINDS[kind].base}/${slug}`,
  })
}

export async function HubView({ kind, slug }: { kind: Hub['kind']; slug: string }) {
  const { hub, name } = await load(kind, slug)
  const { base, crumb, posts: limit } = KINDS[kind]
  const path = `${base}/${slug}`
  const [ctx, picks, posts] = await Promise.all([
    richTextContext([hub?.content]),
    picksById(hub?.picks),
    postsForHub(kind, slug, limit),
  ])
  const nutrients = (hub?.nutrients ?? []).filter((item): item is Nutrient => typeof item === 'object')
  const summary = hub?.summary ?? `${name}에 나타나는 증상을 모았어요.`
  const trail = [{ name: crumb, path: base }, { name, path }]
  const video = hub?.heroVideo
  const photo = photoUrl(hub?.heroPhoto)
  return (
    <>
      <JsonLd
        data={graph(
          collectionPage(name, `${SITE_URL}${path}`, posts.map((post) => ({ name: post.title, url: `/health/${post.slug}` }))),
          crumbs(trail),
          faqPage(hub?.faq),
        )}
      />
      <div className="frame crumbs-row">
        <Breadcrumbs items={trail} />
      </div>
      {kind !== 'area' && (video || photo) ? (
        <PhotoHead
          lede={summary}
          photo={photo ?? undefined}
          title={name}
          video={
            video
              ? {
                  src: `/video/${video}.mp4`,
                  srcMobile: `/video/${video}-m.mp4`,
                  poster: `/video/${video}.webp`,
                  posterMobile: `/video/${video}-m.webp`,
                }
              : undefined
          }
        />
      ) : (
        <header className="page-head page-head--tight">
          <div className="frame frame--text">
            <h1>{name}</h1>
            <p className="lede">{summary}</p>
          </div>
        </header>
      )}
      {kind === 'area' ? (
        <div className="frame">
          <BodyMap active={slug} list={false} />
        </div>
      ) : null}
      <article className="section section--top">
        <div className="frame frame--text">
          {hub?.content ? <RichText bannerSlot={`hub:${kind}-${slug}`} data={hub.content} hub={`${kind}-${slug}`} {...ctx} /> : null}
          {nutrients.length ? (
            <section className="block">
              <h2>관련 영양소</h2>
              <HubGrid items={nutrients.map((item) => ({ href: `/nutrients/${item.slug}`, name: item.name, summary: item.summary }))} />
            </section>
          ) : null}
          {picks.length ? (
            <section className="block">
              <h2>함께 보면 좋은 제품</h2>
              {picks.map((pick) => (
                <PickCard key={pick.id} pick={pick} />
              ))}
            </section>
          ) : null}
          <section className="block">
            <h2>{kind === 'area' ? `${name} 증상 글` : '관련 글'}</h2>
            <PostList posts={posts} />
          </section>
          <FaqList items={hub?.faq ?? []} />
          <ArticleEnd path={path} sources={hub?.sources} title={name} />
        </div>
      </article>
    </>
  )
}
