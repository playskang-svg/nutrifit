import Link from 'next/link'

import type { Post } from '@/payload-types'
import { formatDate } from '@/lib/pricing'

export function PostList({ posts, feature = false }: { posts: Post[]; feature?: boolean }) {
  if (posts.length === 0) return <p>아직 올라온 글이 없습니다.</p>
  return (
    <ul className={feature ? 'post-list post-list--feature' : 'post-list'}>
      {posts.map((post) => {
        return (
          <li key={post.id}>
            <Link href={`/posts/${post.slug}`}>
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <small>{formatDate(post.updatedAtDisplay)} 수정</small>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
