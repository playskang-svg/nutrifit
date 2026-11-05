import { retina } from '@/lib/images'

export type LinkCardFields = { href: string; title: string; summary: string; image?: string | null }

// The address lives only in href: readers see the thumbnail, title and summary.
export function LinkCard({ href, title, summary, image }: LinkCardFields) {
  const external = href.startsWith('http')
  return (
    <a
      className="link-card link-card--center"
      href={href}
      rel={external ? 'noopener' : undefined}
      target={external ? '_blank' : undefined}
    >
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img alt="" height={315} loading="lazy" src={image} srcSet={retina(image)} width={600} />
      ) : null}
      <span className="link-card__body">
        <strong>{title}</strong>
        <span>{summary}</span>
      </span>
    </a>
  )
}
