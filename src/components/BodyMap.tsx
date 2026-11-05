import React from 'react'

import { BODY_AREAS } from '@/collections/Posts'

type Shape = React.ReactElement<React.SVGProps<SVGElement>>
type View = { id: 'front' | 'back' | 'face'; label: string; viewBox: string; areas: [string, Shape[]][] }

const AREA_LABEL = new Map(BODY_AREAS.map((area) => [area.value, area.label]))
export const areaLabel = (slug: string) => AREA_LABEL.get(slug)

// Faces only, white gaps between them (DESIGN.md "몸 지도"). Limbs and bands are at least 30 units wide,
// so at the phone size (one view at a time, 280px wide, 1.4x) each region is a 44px+ target; face parts get their own view.
const rect = (x: number, y: number, width: number, height: number, rx = 14) => (
  <rect height={height} rx={rx} width={width} x={x} y={y} />
)
const ellipse = (cx: number, cy: number, rx: number, ry: number) => <ellipse cx={cx} cy={cy} rx={rx} ry={ry} />
const limbs = (): [string, Shape[]][] => [
  ['neck-shoulder', [rect(52, 86, 96, 32, 16)]],
  ['arm-hand', [rect(14, 92, 34, 176, 17), rect(152, 92, 34, 176, 17)]],
  ['leg-foot', [rect(64, 276, 34, 140, 17), rect(102, 276, 34, 140, 17)]],
]

const VIEWS: View[] = [
  {
    id: 'front',
    label: '앞',
    viewBox: '0 0 200 420',
    areas: [
      ['head', [ellipse(100, 44, 34, 40)]],
      ...limbs(),
      ['chest', [rect(56, 120, 88, 56, 12)]],
      ['abdomen', [rect(58, 180, 84, 56, 12)]],
      ['urogenital', [rect(64, 240, 72, 32, 12)]],
    ],
  },
  {
    id: 'back',
    label: '뒤',
    viewBox: '0 0 200 420',
    areas: [['skin-hair', [ellipse(100, 44, 34, 40)]], ...limbs(), ['back', [rect(56, 120, 88, 152, 12)]]],
  },
  {
    id: 'face',
    label: '얼굴',
    viewBox: '0 0 220 240',
    areas: [
      ['head', [ellipse(110, 120, 80, 104)]],
      ['ear', [ellipse(22, 120, 20, 34), ellipse(198, 120, 20, 34)]],
      ['eye', [ellipse(76, 96, 24, 20), ellipse(144, 96, 24, 20)]],
      ['nose-throat', [ellipse(110, 140, 18, 24)]],
      ['mouth', [ellipse(110, 190, 34, 20)]],
    ],
  },
]

const viewOf = (area?: string) =>
  area && ['head', 'eye', 'ear', 'nose-throat', 'mouth'].includes(area)
    ? 'face'
    : area === 'back' || area === 'skin-hair'
      ? 'back'
      : 'front'

// Front, back and face as links to /symptoms/<area>, plus the same 14 areas as a plain list.
// Phones show one view at a time through radio buttons, so switching needs no script. 'whole' lights every region.
export function BodyMap({ active, list = true }: { active?: string; list?: boolean }) {
  const shown = viewOf(active)
  const label = active ? areaLabel(active) : undefined
  return (
    <div className="body-map">
      {VIEWS.map((view) => (
        <input
          className="sr-only body-map__switch"
          defaultChecked={view.id === shown}
          id={`body-map-${view.id}`}
          key={view.id}
          name="body-map-view"
          type="radio"
        />
      ))}
      <div className="body-map__tabs">
        {VIEWS.map((view) => (
          <label className="body-map__tab" htmlFor={`body-map-${view.id}`} key={view.id}>
            {view.label}
          </label>
        ))}
      </div>
      <div className="body-map__views">
        {VIEWS.map((view) => (
          <figure className={`body-map__view body-map__view--${view.id}`} key={view.id}>
            <svg aria-label={`몸 지도 ${view.label}`} role="group" viewBox={view.viewBox}>
              {view.areas.map(([slug, shapes]) => {
                const current = active === slug || active === 'whole'
                return (
                  <a aria-current={active === slug ? 'page' : undefined} aria-label={areaLabel(slug)} href={`/symptoms/${slug}`} key={slug}>
                    <title>{areaLabel(slug)}</title>
                    {shapes.map((shape, index) =>
                      React.cloneElement(shape, {
                        key: index,
                        className: current ? 'body-map__area is-active' : 'body-map__area',
                      }),
                    )}
                  </a>
                )
              })}
            </svg>
            <figcaption>{view.label}</figcaption>
          </figure>
        ))}
      </div>
      {label ? <p className="body-map__label">{label}</p> : null}
      {list ? (
        <ul className="body-map__list">
          {BODY_AREAS.map((area) => (
            <li key={area.value}>
              <a aria-current={active === area.value ? 'page' : undefined} href={`/symptoms/${area.value}`}>
                {area.label}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
