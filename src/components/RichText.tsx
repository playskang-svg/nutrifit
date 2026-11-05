import type { SerializedEditorState, SerializedLexicalNode } from '@payloadcms/richtext-lexical/lexical'
import {
  type JSXConverter,
  type JSXConvertersFunction,
  RichText as PayloadRichText,
} from '@payloadcms/richtext-lexical/react'
import type React from 'react'

import { bannerFor, MAX_BANNERS_PER_PAGE } from '@/lib/banners'
import { retina } from '@/lib/images'
import type { AffiliateLink, Nutrient, Pick } from '@/payload-types'

import { Callout } from './Callout'
import { Compare, type CompareFields } from './Compare'
import { CoupangBanner } from './CoupangBanner'
import { IntakeBar } from './IntakeBar'
import { LinkCard, type LinkCardFields } from './LinkCard'
import { PickCard, PickSearch } from './PickCard'
import { Timeline } from './Timeline'

type Fields<T> = { node: { fields: T }; nodesToJSX: (args: { nodes: SerializedLexicalNode[] }) => React.ReactNode[] }
type NestedRoot = { root?: { children?: SerializedLexicalNode[] } } | null | undefined

const HIGHLIGHT = 128 // Lexical IS_HIGHLIGHT
const SPONSORED = /^https:\/\/link\.coupang\.com\//

const startsWithCaptionMark = (node: { children?: unknown[] }): boolean => {
  const first = node.children?.[0] as { text?: string } | undefined
  return Boolean(first?.text?.startsWith('▲'))
}

// `midway` is rendered once, right before the third H2, so the hook lands after the reader has the facts.
const MIDWAY_HEADING = 3

export function RichText({
  data,
  picks,
  nutrients,
  links,
  bannerSlot,
  hub,
  midway,
  idPrefix = 'section-',
}: {
  data: unknown
  picks: Map<string, Pick>
  nutrients: Map<string, Nutrient>
  // Affiliate links by slug, for `search-<nutrient>` picks.
  links?: Map<string, AffiliateLink>
  // Only one RichText per page gets a slot; without one, banner blocks render nothing.
  bannerSlot?: string
  // The page's hub as `<kind>-<slug>`, the banner fallback before `default`.
  hub?: string
  midway?: React.ReactNode
  // H2 ids for the table of contents; pages with several RichText fields give each its own prefix.
  idPrefix?: string
}) {
  let headings = 0
  let banners = 0
  let inTimeline = false
  const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
    ...defaultConverters,
    // Blocks this renderer does not know (or nodes from a newer editor) render nothing.
    unknown: () => null,
    text: (args) => {
      const text = (defaultConverters.text as Exclude<JSXConverter, React.ReactNode>)(args)
      return args.node.format & HIGHLIGHT ? <mark className="hl">{text}</mark> : text
    },
    blocks: {
      callout: ({ node, nodesToJSX }: Fields<{ tone: string; title?: string | null; body?: NestedRoot }>) => (
        <Callout title={node.fields.title} tone={node.fields.tone}>
          {nodesToJSX({ nodes: node.fields.body?.root?.children ?? [] })}
        </Callout>
      ),
      compare: ({ node }: Fields<CompareFields>) => <Compare {...node.fields} />,
      pick: ({ node }: Fields<{ pickId: string }>) => {
        const { pickId } = node.fields
        if (pickId.startsWith('auto-')) return null // placeholder until real picks are chosen
        const search = /^search-(.+)$/.exec(pickId)?.[1]
        if (search) return <PickSearch link={links?.get(pickId)} name={nutrients.get(search)?.name ?? search} />
        const pick = picks.get(pickId)
        return pick ? <PickCard pick={pick} /> : null
      },
      photo: ({ node }: Fields<{ photo: string; caption: string }>) => {
        const src = `/photos/${node.fields.photo}.webp`
        return (
          <figure className="post-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt={node.fields.caption} height={800} loading="lazy" src={src} srcSet={retina(src)} width={1200} />
            <figcaption>▲ {node.fields.caption}</figcaption>
          </figure>
        )
      },
      linkCard: ({ node }: Fields<LinkCardFields>) => <LinkCard {...node.fields} />,
      intakeBar: ({ node }: Fields<{ nutrient: string }>) => {
        const nutrient = nutrients.get(node.fields.nutrient)
        return nutrient ? <IntakeBar nutrient={nutrient} /> : null
      },
      timeline: ({ node, nodesToJSX }: Fields<{ nutrient: string }>) => {
        const nutrient = nutrients.get(node.fields.nutrient)
        const timing = (nutrient?.timing as NestedRoot)?.root?.children
        // A timing text that names itself would otherwise recurse forever.
        if (!timing?.length || inTimeline) return null
        inTimeline = true
        try {
          return <Timeline name={nutrient.name}>{nodesToJSX({ nodes: timing })}</Timeline>
        } finally {
          inTimeline = false
        }
      },
      banner: () => {
        if (bannerSlot === undefined) return null
        const banner = bannerFor(bannerSlot, hub)
        if (!banner || banners >= MAX_BANNERS_PER_PAGE) return null
        banners += 1
        return <CoupangBanner banner={banner} />
      },
    },
    paragraph: ({ node, nodesToJSX }) => {
      const children = nodesToJSX({ nodes: node.children })
      if (startsWithCaptionMark(node)) return <p className="caption">{children}</p>
      return <p>{children}</p>
    },
    link: ({ node, nodesToJSX }) => {
      const { url, newTab } = node.fields as { url?: string; newTab?: boolean }
      const href = url ?? ''
      const sponsored = SPONSORED.test(href)
      const external = /^https?:\/\//.test(href)
      return (
        <a
          href={href}
          rel={sponsored ? 'sponsored nofollow noopener' : external || newTab ? 'noopener' : undefined}
          target={sponsored || newTab ? '_blank' : undefined}
        >
          {nodesToJSX({ nodes: node.children })}
        </a>
      )
    },
    heading: ({ node, nodesToJSX }) => {
      const Tag = node.tag as 'h2' | 'h3'
      const children = nodesToJSX({ nodes: node.children })
      if (Tag === 'h2') headings += 1
      return (
        <>
          {midway && Tag === 'h2' && headings === MIDWAY_HEADING ? midway : null}
          <Tag id={Tag === 'h2' ? `${idPrefix}${headings}` : undefined}>{children}</Tag>
        </>
      )
    },
  })
  return (
    <div className="prose">
      <PayloadRichText
        converters={converters}
        data={data as SerializedEditorState}
        disableContainer
      />
    </div>
  )
}
