// hires.cjs renders an @2x twin for every webp in /photos, so the 2x candidate always exists there.
// /products has no twins (Coupang source images are 400px): listing one makes retina screens 404.
const TWINNED = /^\/photos\/[^?#@]+\.webp$/

export const twin = (src: string) => src.replace(/\.webp$/, '@2x.webp')

// srcSet for card-sized images: high-density screens take the twin.
export const retina = (src?: string | null): string | undefined =>
  src && TWINNED.test(src) ? `${src} 1x, ${twin(src)} 2x` : undefined

// srcSet for full-width photos, whose base files are 1200px wide and twins 2400px.
export const wide = (src?: string | null): string | undefined =>
  src && TWINNED.test(src) ? `${src} 1200w, ${twin(src)} 2400w` : undefined
