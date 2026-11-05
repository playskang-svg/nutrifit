import { DISCLOSURE } from '@/lib/payload'

// Partners withhold commission from content without this notice, so every page opens with it.
export function Disclosure() {
  return (
    <p className="disclosure">
      <span className="frame">{DISCLOSURE}</span>
    </p>
  )
}
