'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

// Collects the article's H2s after render, since RichText headings carry no ids of their own.
export function MobileToc() {
  const pathname = usePathname()
  const box = useRef<HTMLDetailsElement>(null)
  const [items, setItems] = useState<{ id: string; text: string }[]>([])
  useEffect(() => {
    const heads = [...document.querySelectorAll<HTMLHeadingElement>('.prose h2')]
    heads.forEach((head, index) => {
      if (!head.id) head.id = `section-${index + 1}`
    })
    setItems(heads.map((head) => ({ id: head.id, text: head.textContent ?? '' })))
  }, [pathname])
  if (items.length < 2) return null
  return (
    <details className="mobile-toc" ref={box}>
      <summary>이 글의 순서</summary>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`} onClick={() => box.current?.removeAttribute('open')}>
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </details>
  )
}
