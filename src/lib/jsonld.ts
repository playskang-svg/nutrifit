import { absoluteUrl, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from './payload'
import { publisher } from './seo'

type Faq = { q: string; a: string }[] | null | undefined
type Link = { name: string; url: string }

export const faqPage = (faq: Faq) =>
  faq?.length
    ? {
        '@type': 'FAQPage',
        mainEntity: faq.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      }
    : null

export const blogPosting = (
  post: {
    title: string
    description: string
    image: string
    publishedAt: string
    modifiedAt: string
  },
  url: string,
) => ({
  '@type': 'BlogPosting',
  headline: post.title,
  description: post.description,
  mainEntityOfPage: url,
  image: absoluteUrl(post.image),
  datePublished: new Date(post.publishedAt).toISOString(),
  dateModified: new Date(post.modifiedAt).toISOString(),
  inLanguage: 'ko-KR',
  author: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
  publisher,
})

export const breadcrumb = (items: Link[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.url),
  })),
})

// Same trail the Breadcrumbs component shows: 홈 first.
export const crumbs = (items: { name: string; path: string }[]) =>
  breadcrumb([{ name: '홈', url: '/' }, ...items.map((item) => ({ name: item.name, url: item.path }))])

export const collectionPage = (name: string, url: string, items: Link[]) => ({
  '@type': 'CollectionPage',
  name,
  url,
  inLanguage: 'ko-KR',
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.url),
    })),
  },
})

export const siteGraph = () => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: 'ko-KR',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      ...publisher,
    },
  ],
})

// One script per page: the nodes that exist, in a single graph.
export const graph = (...nodes: (Record<string, unknown> | null)[]) => ({
  '@graph': nodes.filter(Boolean),
})
