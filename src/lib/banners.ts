import { COUPANG_PARTNER_ID } from '@/collections/AffiliateLinks'

import table from '../../data/banners.json'

export type BannerSize = { id: number; width: number; height: number }
export type Banner = { wide: BannerSize; narrow: BannerSize }

export const MAX_BANNERS_PER_PAGE = 1

// `hub` is the page's hub as `<kind>-<slug>`; data/banners.json is written by the banner issuing task.
export const bannerFor = (
  slot: string,
  hub?: string,
  banners: Record<string, Banner> = table as Record<string, Banner>,
): Banner | null => banners[slot] ?? (hub ? banners[`hub:${hub}`] : undefined) ?? banners.default ?? null

// Same address rule as sise.pinda.kr's BANNER_SCRIPT; subId tells this site's clicks apart.
export const bannerSrc = ({ id, width, height }: BannerSize) =>
  `https://ads-partners.coupang.com/widgets.html?id=${id}&template=carousel&trackingCode=${COUPANG_PARTNER_ID}&subId=nutrifit&width=${width}&height=${height}&tsource=`
