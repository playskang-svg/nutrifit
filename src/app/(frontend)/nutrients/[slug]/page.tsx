import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { cache } from 'react'

import { ArticleEnd } from '@/components/ArticleEnd'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { FaqList } from '@/components/FaqList'
import { IntakeBar } from '@/components/IntakeBar'
import { JsonLd } from '@/components/JsonLd'
import { MobileToc } from '@/components/MobileToc'
import { PickCard } from '@/components/PickCard'
import { PostList } from '@/components/PostList'
import { RichText } from '@/components/RichText'
import { VerdictBox } from '@/components/VerdictBox'
import { collectionPage, crumbs, faqPage, graph } from '@/lib/jsonld'
import { SITE_URL } from '@/lib/payload'
import { findOne, picksById, postsForHub, richTextContext } from '@/lib/queries'
import { keywordTitle, pageMeta } from '@/lib/seo'
import type { Nutrient } from '@/payload-types'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ slug: string }> }

const load = cache(async (slug: string) => ((await findOne('nutrients', { slug: { equals: slug } })) as Nutrient | null) ?? notFound())

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = await load((await params).slug)
  return pageMeta({ title: keywordTitle(item.name, item.primaryKeyword), description: item.summary, path: `/nutrients/${item.slug}` })
}

const hasText = (field: unknown) => Boolean((field as { root?: { children?: unknown[] } } | null)?.root?.children?.length)

// Section order is design §5: verdict, official claims, intake, signs, timing, combinations, foods, how to choose,
// products, related posts, FAQ, sources.
export default async function NutrientPage({ params }: Props) {
  const item = await load((await params).slug)
  const path = `/nutrients/${item.slug}`
  const [ctx, picks, posts] = await Promise.all([
    richTextContext([item.deficiency, item.excess, item.timing, item.howToChoose]),
    picksById(item.picks),
    postsForHub('nutrient', item.slug, 6),
  ])
  const claims = item.officialClaims ?? []
  const good = item.interactions?.good ?? []
  const caution = item.interactions?.caution ?? []
  const foods = item.foods ?? []
  const trail = [{ name: '영양소 사전', path: '/nutrients' }, { name: item.name, path }]
  return (
    <article className="section page-head">
      <JsonLd
        data={graph(
          collectionPage(item.name, `${SITE_URL}${path}`, posts.map((post) => ({ name: post.title, url: `/health/${post.slug}` }))),
          crumbs(trail),
          faqPage(item.faq),
        )}
      />
      <div className="frame frame--text">
        <Breadcrumbs items={trail} />
        <h1>{item.name}</h1>
        <p className="lede">{item.summary}</p>
        {item.aliases?.length ? (
          <p>
            <small>다른 이름: {item.aliases.join(', ')}</small>
          </p>
        ) : null}
        <VerdictBox skip={item.verdict?.skip ?? []} who={item.verdict?.who ?? []} />
        <MobileToc />
        <div className="prose">
          {claims.length ? (
            <section>
              <h2 id="claims">인정된 기능성</h2>
              <ul>
                {claims.map((claim, index) => (
                  <li key={index}>
                    {claim.text} <small>({claim.source})</small>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
          {item.intake?.rows?.length ? (
            <section>
              <h2 id="intake">하루 섭취 기준과 상한</h2>
              <IntakeBar nutrient={item} />
            </section>
          ) : null}
          {hasText(item.deficiency) || hasText(item.excess) ? (
            <section>
              <h2 id="signs">부족하거나 넘칠 때</h2>
              {hasText(item.deficiency) ? (
                <>
                  <h3>부족하면</h3>
                  <RichText data={item.deficiency} idPrefix="deficiency-" {...ctx} />
                </>
              ) : null}
              {hasText(item.excess) ? (
                <>
                  <h3>넘치면</h3>
                  <RichText data={item.excess} idPrefix="excess-" {...ctx} />
                </>
              ) : null}
            </section>
          ) : null}
          {hasText(item.timing) ? (
            <section>
              <h2 id="timing">먹는 시간</h2>
              <RichText data={item.timing} idPrefix="timing-" {...ctx} />
            </section>
          ) : null}
          {good.length || caution.length ? (
            <section>
              <h2 id="combo">함께 먹을 때</h2>
              <div className="verdict">
                {good.length ? (
                  <div className="verdict__col verdict__col--who">
                    <p className="verdict__title">같이 먹으면 좋은 것</p>
                    <ul>
                      {good.map((line, index) => (
                        <li key={index}>{line}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {caution.length ? (
                  <div className="verdict__col verdict__col--skip">
                    <p className="verdict__title">조심할 조합</p>
                    <ul>
                      {caution.map((line, index) => (
                        <li key={index}>{line}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </section>
          ) : null}
          {foods.length ? (
            <section>
              <h2 id="foods">많이 든 음식</h2>
              <div aria-label={`${item.name}이 많은 음식`} className="compare" role="region" tabIndex={0}>
                <table>
                  <thead>
                    <tr>
                      <th scope="col">음식</th>
                      <th scope="col">함량</th>
                      <th scope="col">자료</th>
                    </tr>
                  </thead>
                  <tbody>
                    {foods.map((food, index) => (
                      <tr key={index}>
                        <th scope="row">
                          <a href={food.url} rel="noopener" target="_blank">
                            {food.name}
                          </a>
                        </th>
                        <td>{food.value != null ? `${food.value}${food.unit ?? ''}` : '-'}</td>
                        <td>{food.source}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ) : null}
          {hasText(item.howToChoose) ? (
            <section>
              <h2 id="choose">고르는 법</h2>
              <RichText bannerSlot={`nutrient:${item.slug}`} data={item.howToChoose} idPrefix="choose-" {...ctx} />
            </section>
          ) : null}
          {picks.length ? (
            <section>
              <h2 id="picks">살펴볼 제품</h2>
              {picks.slice(0, 5).map((pick) => (
                <PickCard key={pick.id} pick={pick} />
              ))}
            </section>
          ) : null}
        </div>
        {posts.length ? (
          <section className="block">
            <h2>관련 글</h2>
            <PostList posts={posts} />
          </section>
        ) : null}
        <FaqList items={item.faq ?? []} />
        <ArticleEnd path={path} sources={item.sources} title={item.name} />
      </div>
    </article>
  )
}
