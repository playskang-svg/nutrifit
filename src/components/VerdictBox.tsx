function Column({ title, lines, tone }: { title: string; lines: string[]; tone: 'who' | 'skip' }) {
  if (!lines.length) return null
  return (
    <div className={`verdict__col verdict__col--${tone}`}>
      <p className="verdict__title">{title}</p>
      <ul>
        {lines.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    </div>
  )
}

export function VerdictBox({ who, skip }: { who: string[]; skip: string[] }) {
  if (!who.length && !skip.length) return null
  return (
    <section aria-label="결론" className="verdict reveal">
      <Column lines={who} title="이런 분께" tone="who" />
      <Column lines={skip} title="피하실 분" tone="skip" />
    </section>
  )
}
