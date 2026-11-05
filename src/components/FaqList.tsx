export function FaqList({ items, title = '자주 묻는 질문' }: { items: { q: string; a: string }[]; title?: string }) {
  if (!items.length) return null
  return (
    <section aria-labelledby="faq" className="faq">
      <h2 id="faq">{title}</h2>
      {items.map((item, index) => (
        <details key={`${index}-${item.q}`}>
          <summary>{item.q}</summary>
          <p>{item.a}</p>
        </details>
      ))}
    </section>
  )
}
