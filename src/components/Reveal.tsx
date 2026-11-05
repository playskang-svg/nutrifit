'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

// Turns on `.reveal` (rise in) and `mark.hl` (highlighter paints from the left) as they scroll into view.
// Content is hidden only under :root[data-reveal], which this sets, so a page without script shows everything.
export function Reveal(): null {
  const pathname = usePathname()
  useEffect(() => {
    const targets = [...document.querySelectorAll<HTMLElement>('.reveal:not(.is-in), mark.hl:not(.is-in)')]
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (still || !('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-in'))
      return
    }
    // Blocks already on screen stay put: hiding them now would flash.
    for (const el of targets) {
      if (el.matches('.reveal') && el.getBoundingClientRect().top < window.innerHeight) el.classList.add('is-in')
    }
    document.documentElement.dataset.reveal = 'on'
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-in')
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    )
    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [pathname])
  return null
}
