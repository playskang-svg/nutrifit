'use client'

import { useEffect, useState } from 'react'

export type HeroVideoProps = { src: string; srcMobile?: string; poster: string; posterMobile?: string; alt?: string }

const NARROW = '(max-width: 759px)'

// Looping, silent clip under a page heading. The poster is a normal image, so the heading paints before any
// video loads; the clip is fetched only for people who have not asked for less motion or less data.
export function HeroVideo({ src, srcMobile, poster, posterMobile, alt = '' }: HeroVideoProps) {
  const [clip, setClip] = useState<string | null>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData
    if (still || saveData) return
    setClip(window.matchMedia(NARROW).matches && srcMobile ? srcMobile : src)
  }, [src, srcMobile])

  return (
    <>
      <picture>
        {posterMobile ? <source height={680} media={NARROW} srcSet={posterMobile} width={544} /> : null}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt={alt} className="photo-head__img" fetchPriority="high" height={720} src={poster} width={1280} />
      </picture>
      {clip ? (
        <video
          aria-hidden="true"
          autoPlay
          className={playing ? 'photo-head__video is-playing' : 'photo-head__video'}
          disablePictureInPicture
          loop
          muted
          onPlaying={() => setPlaying(true)}
          playsInline
          preload="auto"
          src={clip}
          tabIndex={-1}
        />
      ) : null}
    </>
  )
}
