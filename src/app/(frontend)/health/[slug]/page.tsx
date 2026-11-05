import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ArticleEnd } from '@/components/ArticleEnd'
import { areaLabel, BodyMap } from '@/components/BodyMap'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { FaqList } from '@/components/FaqList'
import { JsonLd } from '@/components/JsonLd'
import { MobileToc } from '@/components/MobileToc'
import { PostList } from '@/components/PostList'
import { RichText } from '@/components/RichText'
import { SummaryBox } from '@/components/SummaryBox'
import { VerdictBox } from '@/components/VerdictBox'
import { wide } from '@/lib/images'
import { articleLd, faqLd } from '@/lib/jsonld'
import { formatDate } from '@/lib/pricing'
import { getPublishedPost, richTextContext } from '@/lib/queries'
import { DEFAULT_IMAGE, pageMeta } from '@/lib/seo'
import type { Category, Post } from '@/payload-types'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ slug: string }> }

const load = async (slug: string) => (await getPublishedPost(slug)) ?? notFound()

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await load((await params).slug)
  const category = post.category as Category
  return pageMeta({
    title: post.seoTitle || post.title,
    description: post.description,
    path: `/health/${post.slug}`,
    image: post.ogImage || DEFAULT_IMAGE,
    article: {
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAtDisplay ?? post.updatedAt,
      section: typeof category === 'object' ? category.title : undefined,
    },
  })
}

// Symptom posts sit under 증상 › <area>; the rest under 건강 정보 › <category>.
const trail = (post: Post, category: Category) =>
  category.slug === 'symptom' && post.area
    ? [
        { name: '증상', path: '/symptoms' },
        { name: areaLabel(post.area) ?? post.area, path: `/symptoms/${post.area}` },
      ]
    : [
        { name: '건강 정보', path: '/health' },
        { name: category.title, path: `/health/c/${category.slug}` },
      ]

export default async function PostPage({ params }: Props) {
  const post = await load((await params).slug)
  const category = post.category as Category
  const path = `/health/${post.slug}`
  const ctx = await richTextContext([post.content])
  const hub = post.hubs?.[0]
  const related = (post.relatedPosts ?? []).filter((item): item is Post => typeof item === 'object')
  const symptom = category.slug === 'symptom' && post.area
  const photo = post.heroPhoto ? `/photos/${post.heroPhoto}.webp` : null
  const faq = faqLd(post.faq)
  return (
    <>
      <JsonLd
        data={articleLd({
          title: post.title,
          description: post.description,
          path,
          image: post.ogImage || photo || DEFAULT_IMAGE,
          published: post.publishedAt,
          modified: post.updatedAtDisplay ?? post.updatedAt,
        })}
      />
      {faq ? <JsonLd data={faq} /> : null}
      <article className="section page-head post">
        <div className="frame frame--text">
          <Breadcrumbs items={[...trail(post, category), { name: post.title, path }]} />
          <h1>{post.title}</h1>
          <p className="post__date">
            <time dateTime={post.publishedAt}>{formatDate(post.updatedAtDisplay ?? post.publishedAt)}</time>
          </p>
          {symptom ? (
            <BodyMap active={post.area ?? undefined} list={false} />
          ) : photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img alt="" className="post__hero" fetchPriority="high" height={800} sizes="(max-width: 760px) 100vw, 720px" src={photo} srcSet={wide(photo)} width={1200} />
          ) : null}
          <SummaryBox points={post.keyPoints ?? []} />
          <MobileToc />
          <RichText bannerSlot={`post:${post.slug}`} data={post.content} hub={hub ? `${hub.kind}-${hub.slug}` : undefined} {...ctx} />
          <VerdictBox skip={post.verdict?.skip ?? []} who={post.verdict?.who ?? []} />
          {related.length ? (
            <section className="block">
              <h2>함께 보면 좋은 글</h2>
              <PostList posts={related} />
            </section>
          ) : null}
          <FaqList items={post.faq ?? []} />
          <ArticleEnd path={path} sources={post.sources} title={post.title} />
        </div>
      </article>
    </>
  )
}
