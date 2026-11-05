// The key points up front, so a reader who leaves after ten seconds still leaves with the answer.
export function SummaryBox({ points }: { points: string[] }) {
  if (!points.length) return null
  return (
    <aside aria-label="핵심 한 줄 요약" className="summary-box reveal">
      <p className="summary-box__title">💡 핵심 한 줄 요약</p>
      <ul>
        {points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </aside>
  )
}
