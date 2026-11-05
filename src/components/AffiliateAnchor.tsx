import React from 'react'

import type { AffiliateLink } from '@/payload-types'

// Direct to link.coupang.com: a click must still work when the Worker is over its CPU limit.
export function AffiliateAnchor({
  link,
  className,
  children,
}: {
  link: number | AffiliateLink
  className?: string
  children: React.ReactNode
}) {
  if (typeof link !== 'object') return null
  return (
    <a className={className} href={link.url} rel="sponsored nofollow noopener" target="_blank">
      {children}
    </a>
  )
}
