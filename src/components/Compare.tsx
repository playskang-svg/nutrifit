export type CompareFields = {
  caption?: string | null
  corner?: string | null
  columns?: { label: string }[]
  rows?: { label: string; cells?: { value?: string | null }[] }[]
}

export function Compare({ caption, corner, columns, rows }: CompareFields) {
  return (
    // Scrolls sideways inside its own box on narrow phones instead of widening the page.
    <div aria-label={caption || '비교표'} className="compare" role="region" tabIndex={0}>
      <table>
        {caption ? <caption>{caption}</caption> : null}
        <thead>
          <tr>
            <th scope="col">{corner}</th>
            {columns?.map((column, index) => (
              <th key={index} scope="col">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows?.map((row, index) => (
            <tr key={index}>
              <th scope="row">{row.label}</th>
              {row.cells?.map((cell, k) => (
                <td key={k}>{cell.value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
