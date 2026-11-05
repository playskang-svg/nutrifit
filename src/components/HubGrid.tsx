import Link from 'next/link'

export type HubItem = { href: string; name: string; summary?: string | null }

export function HubGrid({ items }: { items: HubItem[] }) {
  if (!items.length) return null
  return (
    <ul className="hub-grid">
      {items.map((item) => (
        <li className="reveal" key={item.href}>
          <Link href={item.href}>
            <strong>{item.name}</strong>
            {item.summary ? <span>{item.summary}</span> : null}
          </Link>
        </li>
      ))}
    </ul>
  )
}
