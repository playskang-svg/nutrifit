import { SITE_NAME, SITE_URL } from './payload'
import { publisher } from './seo'

export const faqLd = (faq?: { q: string; a: string }[] | null) =>
  faq?.length
    ? {
        '@type': 'FAQPage',
        mainEntity: faq.map((item) => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } })),
      }
    : null

export const articleLd = ({
  title,
  description,
  path,
  image,
  published,
  modified,
}: {
  title: string
  description: string
  path: string
  image: string
  published: string
  modified: string
}) => ({
  '@type': 'Article',
  headline: title,
  description,
  mainEntityOfPage: `${SITE_URL}${path}`,
  image: image.startsWith('http') ? image : `${SITE_URL}${image}`,
  datePublished: published,
  dateModified: modified,
  inLanguage: 'ko-KR',
  author: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
  publisher,
})
