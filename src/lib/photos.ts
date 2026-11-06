import table from '../../data/photos.json'

export type Photos = Record<string, unknown>

// A photo exists only once its key is in data/photos.json; callers render nothing for null (R46).
export const photoUrl = (key: string | null | undefined, photos: Photos = table): string | null =>
  key && key in photos ? `/photos/${key}.webp` : null

// FNV-1a: the same slug always gets the same variant, neighbouring slugs spread.
export function pickVariant<T>(slug: string, variants: readonly T[]): T {
  let hash = 0x811c9dc5
  for (const byte of new TextEncoder().encode(slug)) hash = Math.imul(hash ^ byte, 0x01000193)
  return variants[(hash >>> 0) % variants.length]
}
