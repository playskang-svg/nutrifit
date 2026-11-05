import { MEDICAL_NOTE, SITE_URL } from '@/lib/payload'

import { ShareBar } from './ShareBar'
import { SourceList } from './SourceList'

// The close of every post, nutrient and hub page: medical note, sources, share row.
export function ArticleEnd({
  title,
  path,
  sources,
}: {
  title: string
  path: string
  sources?: { label: string; url: string; publisher?: string | null; date?: string | null }[] | null
}) {
  return (
    <footer className="article-end">
      <p className="medical-note">{MEDICAL_NOTE}</p>
      <SourceList sources={sources ?? []} />
      <ShareBar title={title} url={`${SITE_URL}${path}`} />
    </footer>
  )
}
