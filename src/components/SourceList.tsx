type Source = { label: string; url: string; publisher?: string | null; date?: string | null }

export function SourceList({ sources }: { sources: Source[] }) {
  if (!sources.length) return null
  return (
    <section aria-labelledby="sources" className="sources">
      <h2 id="sources">참고 자료</h2>
      <ul>
        {sources.map((source) => (
          <li key={source.url}>
            <a href={source.url} rel="noopener" target="_blank">
              {source.label}
            </a>
            {source.publisher || source.date ? (
              <span> · {[source.publisher, source.date].filter(Boolean).join(', ')}</span>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  )
}
