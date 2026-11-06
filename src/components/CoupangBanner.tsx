'use client'

import { useEffect, useRef, useState } from 'react'

import { type Banner, type BannerSize, bannerSrc } from '@/lib/banners'

// Measures its slot after mount and loads exactly one of the two sizes.
export function CoupangBanner({ banner }: { banner: Banner }) {
  const slot = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState<BannerSize | null>(null)
  useEffect(() => {
    setSize((slot.current?.offsetWidth ?? 0) >= banner.wide.width ? banner.wide : banner.narrow)
  }, [banner])
  return (
    <div className="coupang-banner" ref={slot}>
      {size ? (
        <iframe
          frameBorder="0"
          height={size.height}
          loading="lazy"
          referrerPolicy="unsafe-url"
          scrolling="no"
          src={bannerSrc(size)}
          title="쿠팡 추천 상품"
          width={size.width}
        />
      ) : null}
    </div>
  )
}
