import Link from 'next/link'

import type { Post } from '@/payload-types'
import { formatDate } from '@/lib/pricing'

export type PostItem = Pick<Post, 'id' | 'slug' | 'title' | 'description' | 'publishedAt' | 'updatedAtDisplay'>

export function PostList({ posts, feature = false }: { posts: PostItem[]; feature?: boolean }) {
  if (posts.length === 0) return <p>아직 올라온 글이 없습니다.</p>
  return (
    <ul className={feature ? 'post-list post-list--feature' : 'post-list'}>
      {posts.map((post) => {
        return (
          <li key={post.id}>
            <Link href={`/health/${post.slug}`}>
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <small>{formatDate(post.updatedAtDisplay ?? post.publishedAt)}</small>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

// ?page= links under a list; page 1 keeps the bare address.
export function Pager({ page, totalPages, path }: { page: number; totalPages: number; path: string }) {
  if (totalPages < 2) return null
  const href = (n: number) => (n === 1 ? path : `${path}?page=${n}`)
  return (
    <nav aria-label="쪽 이동" className="pager">
      {page > 1 ? (
        <Link className="button button--quiet" href={href(page - 1)} rel="prev">
          이전
        </Link>
      ) : null}
      <span>
        {page} / {totalPages}
      </span>
      {page < totalPages ? (
        <Link className="button button--quiet" href={href(page + 1)} rel="next">
          다음
        </Link>
      ) : null}
    </nav>
  )
}
