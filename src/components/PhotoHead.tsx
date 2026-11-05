import React from 'react'

import { HeroVideo, type HeroVideoProps } from '@/components/HeroVideo'
import { wide } from '@/lib/images'

// Page heading set over a full-width photo or a looping clip; the text sits on the left, clear of the subject.
export function PhotoHead({
  title,
  lede,
  photo,
  video,
  photoAlt = '',
  srcSet,
  children,
}: {
  title: string
  lede?: React.ReactNode
  photo?: string | null
  video?: HeroVideoProps
  photoAlt?: string
  srcSet?: string
  children?: React.ReactNode
}) {
  return (
    <section className="photo-head">
      {video ? (
        <HeroVideo alt={photoAlt} {...video} />
      ) : photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          alt={photoAlt}
          className="photo-head__img"
          fetchPriority="high"
          height={800}
          sizes="100vw"
          src={photo}
          srcSet={srcSet ?? wide(photo)}
          width={1200}
        />
      ) : null}
      <div className="frame photo-head__body">
        <div className="photo-head__panel">
          <h1>{title}</h1>
          {lede ? <p className="photo-head__lede">{lede}</p> : null}
          {children}
        </div>
      </div>
    </section>
  )
}
