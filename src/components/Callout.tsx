import type React from 'react'

export function Callout({ tone, title, children }: { tone: string; title?: string | null; children: React.ReactNode }) {
  return (
    <aside className={`callout callout--${tone}`}>
      {title ? <p className="callout__title">{title}</p> : null}
      <div className="callout__body">{children}</div>
    </aside>
  )
}
