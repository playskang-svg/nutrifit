import { HealthPost, PostCategorySlug } from "../../types";

/* --- 글 등록부 -------------------------------------------------------
 * 새 글 추가: src/content/posts/<slug>.ts 생성 → 아래 두 줄 추가.
 * `npm run post:new -- <slug>` 를 쓰면 파일 생성과 등록이 함께 처리된다.
 * (워커에서도 import 해야 하므로 Vite 전용 import.meta.glob 은 쓰지 않는다)
 * ------------------------------------------------------------------ */
import { post as nightLegCrampsMagnesium } from "./night-leg-cramps-magnesium";
import { post as vitaminDDeficiencyKorea } from "./vitamin-d-deficiency-korea";
import { post as omega3RtgVsEeForm } from "./omega3-rtg-vs-ee-form";

const registry: HealthPost[] = [
  nightLegCrampsMagnesium,
  vitaminDDeficiencyKorea,
  omega3RtgVsEeForm,
];
/* --- 등록부 끝 ---------------------------------------------------- */

const byNewest = (a: HealthPost, b: HealthPost) =>
  (b.updatedAt ?? b.publishedAt).localeCompare(a.updatedAt ?? a.publishedAt);

/** 발행된 글만. 목록·사이트맵·RSS는 전부 이걸 본다. */
export const allPosts: HealthPost[] = registry
  .filter((post) => !post.draft)
  .sort(byNewest);

/** 초안 포함 전체. 중복 슬러그 검사용. */
export const allPostsWithDrafts: HealthPost[] = [...registry].sort(byNewest);

const bySlug = new Map(allPosts.map((post) => [post.slug, post]));

export function getPostBySlug(slug: string): HealthPost | undefined {
  return bySlug.get(slug);
}

export function getPostsByCategory(category: PostCategorySlug | "all"): HealthPost[] {
  if (category === "all") return allPosts;
  return allPosts.filter((post) => post.category === category);
}

export function getFeaturedPosts(limit = 2): HealthPost[] {
  const featured = allPosts.filter((post) => post.featured);
  return (featured.length ? featured : allPosts).slice(0, limit);
}

/** 명시된 관련 글을 먼저 채우고, 모자라면 같은 카테고리·같은 태그 순으로 메운다. */
export function getRelatedPosts(post: HealthPost, limit = 3): HealthPost[] {
  const picked = new Map<string, HealthPost>();

  for (const slug of post.relatedPostSlugs ?? []) {
    const related = bySlug.get(slug);
    if (related && related.slug !== post.slug) picked.set(related.slug, related);
  }

  const candidates = allPosts.filter(
    (candidate) => candidate.slug !== post.slug && !picked.has(candidate.slug)
  );

  for (const candidate of candidates) {
    if (picked.size >= limit) break;
    if (candidate.category === post.category) picked.set(candidate.slug, candidate);
  }

  for (const candidate of candidates) {
    if (picked.size >= limit) break;
    if (candidate.tags.some((tag) => post.tags.includes(tag))) {
      picked.set(candidate.slug, candidate);
    }
  }

  return [...picked.values()].slice(0, limit);
}

export function searchPosts(query: string): HealthPost[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return allPosts;
  return allPosts.filter((post) =>
    [post.title, post.description, post.summary, ...post.tags, ...post.keywords]
      .join(" ")
      .toLowerCase()
      .includes(needle)
  );
}

export function getCategoryCounts(): Record<string, number> {
  return allPosts.reduce<Record<string, number>>((acc, post) => {
    acc[post.category] = (acc[post.category] ?? 0) + 1;
    return acc;
  }, {});
}

export function formatPostDate(date: string): string {
  const [year, month, day] = date.split("-");
  if (!year || !month || !day) return date;
  return `${year}. ${month}. ${day}.`;
}
