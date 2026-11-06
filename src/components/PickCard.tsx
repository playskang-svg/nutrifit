import { PICK_KINDS } from '@/collections/Picks'
import { retina } from '@/lib/images'
import type { AffiliateLink, Pick } from '@/payload-types'

import { AffiliateAnchor } from './AffiliateAnchor'

export function PickCard({ pick }: { pick: Pick }) {
  // 건강기능식품 is a label claim: only shown when the label is confirmed (R30).
  const badge =
    pick.kind === 'supplement' && pick.isHealthFunctionalFood !== true
      ? undefined
      : PICK_KINDS.find((kind) => kind.value === pick.kind)?.label
  return (
    <article className="pick-card">
      {pick.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img alt={pick.name} height={400} loading="lazy" src={pick.image} srcSet={retina(pick.image)} width={400} />
      ) : null}
      <div className="pick-card__body">
        {badge ? <span className="pick-card__badge">{badge}</span> : null}
        <strong className="pick-card__name">{pick.name}</strong>
        {pick.brand && pick.brand !== '-' ? <small className="pick-card__brand">{pick.brand}</small> : null}
        {pick.kind === 'supplement' && pick.perServing?.length ? (
          <table className="pick-card__serving">
            <caption>1회 섭취량당</caption>
            <tbody>
              {pick.perServing.map((row, index) => (
                <tr key={index}>
                  <th scope="row">{row.name}</th>
                  <td>
                    {row.amount}
                    {row.unit}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}
        {pick.reason ? <p className="pick-card__reason">{pick.reason}</p> : null}
        {pick.caution ? <p className="pick-card__caution">{pick.caution}</p> : null}
        <AffiliateAnchor className="pick-card__go" link={pick.link}>
          쿠팡에서 보기
        </AffiliateAnchor>
      </div>
    </article>
  )
}

// `{{pick:search-<nutrient>}}`: a plain button to the Coupang search link, or nothing until that link exists.
export function PickSearch({ link, name }: { link?: AffiliateLink; name: string }) {
  if (!link) return null
  return (
    <AffiliateAnchor className="pick-search" link={link}>
      쿠팡에서 {name} 보기
    </AffiliateAnchor>
  )
}
