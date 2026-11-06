import type { Metadata } from 'next'

import { SITE_NAME, SITE_URL } from './payload'

// Until per-page share cards exist (Task 25), pages share the site card.
export const DEFAULT_IMAGE = '/og-image.jpg'

// Next replaces the parent's openGraph entirely, so every page has to restate these fields.
export const pageTitle = (primary: string) => `${primary} | ${SITE_NAME}`

// Share card for a post that has no ogImage of its own; Task 25 generates the files.
export const ogPath = (slug: string) => `/og/${slug}.jpg`

export const pageMeta = ({
  title: primary,
  description,
  path,
  image = DEFAULT_IMAGE,
  article,
  bare,
}: {
  title: string
  description: string
  path: string
  image?: string
  article?: { publishedTime: string; modifiedTime: string; section?: string }
  bare?: boolean // home keeps its own full title
}): Metadata => {
  const title = bare ? primary : pageTitle(primary)
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `${SITE_URL}${path}` },
    openGraph: {
      siteName: SITE_NAME,
      locale: 'ko_KR',
      title,
      description,
      url: `${SITE_URL}${path}`,
      images: [{ url: image, width: 1200, height: 630 }],
      ...(article ? { type: 'article', ...article } : { type: 'website' }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  }
}

export const publisher = {
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/icon-512.png`,
}

// The search title keeps the page's primary keyword even when the display name differs.
export const keywordTitle = (name: string, keyword: string) => (name.includes(keyword) ? name : `${name} · ${keyword}`)
