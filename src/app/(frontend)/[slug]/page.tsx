import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { RichText } from '@/components/RichText'
import { findOne, richTextContext } from '@/lib/queries'
import { pageMeta } from '@/lib/seo'
import type { Page } from '@/payload-types'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ slug: string }> }

// about, editorial, contact, privacy, terms: whatever the pages collection holds.
const load = async (slug: string) => ((await findOne('pages', { slug: { equals: slug } })) as Page | null) ?? notFound()

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await load((await params).slug)
  return pageMeta({ title: page.title, description: page.description ?? page.title, path: `/${page.slug}` })
}

export default async function GuidePage({ params }: Props) {
  const page = await load((await params).slug)
  const ctx = await richTextContext([page.content])
  return (
    <article className="section page-head">
      <div className="frame frame--text">
        <h1>{page.title}</h1>
        <div className="list-gap">
          <RichText data={page.content} {...ctx} />
        </div>
      </div>
    </article>
  )
}
