import type { Nutrient } from '@/payload-types'

const SEX = { M: '남', F: '여', all: '' } as const

export function IntakeBar({ nutrient }: { nutrient: Nutrient }) {
  const { edition, unit, rows, pregnancyNote } = nutrient.intake ?? {}
  if (!rows?.length) return null
  return (
    <figure className="intake-bar">
      <table>
        <caption>
          {nutrient.name} 하루 섭취 기준{unit ? `(${unit})` : ''}
          {edition ? ` · 한국인 영양소 섭취기준 ${edition}` : ''}
        </caption>
        <thead>
          <tr>
            <th scope="col">대상</th>
            <th scope="col">권장</th>
            <th scope="col">충분</th>
            <th scope="col">상한</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <th scope="row">{`${SEX[row.sex] ?? ''} ${row.age}`.trim()}</th>
              <td>{row.rni ?? '-'}</td>
              <td>{row.ai ?? '-'}</td>
              <td>{row.ul ?? '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {pregnancyNote ? <figcaption>{pregnancyNote}</figcaption> : null}
    </figure>
  )
}
