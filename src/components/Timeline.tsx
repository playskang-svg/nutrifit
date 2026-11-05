import type React from 'react'

export function Timeline({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <section aria-label={`${name} 먹는 시간`} className="timeline">
      {children}
    </section>
  )
}
