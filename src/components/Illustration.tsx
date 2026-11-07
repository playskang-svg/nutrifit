import { retina } from '@/lib/images'
import { photoUrl } from '@/lib/photos'

// A figure for a fixed page slot (e.g. nutrient-<slug>-foods); renders nothing until the image exists in data/photos.json.
export function Illustration({ photo, caption }: { photo: string; caption: string }) {
  const src = photoUrl(photo)
  if (!src) return null
  return (
    <figure className="post-photo">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt={caption} height={800} loading="lazy" src={src} srcSet={retina(src)} width={1200} />
      <figcaption>▲ {caption}</figcaption>
    </figure>
  )
}

// 이/가 by the last syllable's final consonant (non-Hangul endings like "B12" get 가).
export const subject = (word: string) => {
  const code = word.charCodeAt(word.length - 1) - 0xac00
  return word + (code >= 0 && code < 11172 && code % 28 !== 0 ? '이' : '가')
}
