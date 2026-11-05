import Link from 'next/link'

// Visible trail; pages add the BreadcrumbList to their own graph. The last item is the current page and takes no link.
export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  const trail = [{ name: '홈', path: '/' }, ...items]
  return (
    <nav aria-label="현재 위치" className="breadcrumbs">
      <ol>
        {trail.map((item, index) => (
          <li key={item.path}>
            {index === trail.length - 1 ? <span aria-current="page">{item.name}</span> : <Link href={item.path}>{item.name}</Link>}
          </li>
        ))}
      </ol>
    </nav>
  )
}
