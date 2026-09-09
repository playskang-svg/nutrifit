import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { HealthPost } from "../../types";
import { allPosts } from "../../content/posts";
import { getOffer } from "../../data/affiliateLinks";
import { linkProps } from "../../lib/router";

/**
 * 상단 최신 글 목록.
 *
 * 새 글이 올라오면 첫 화면에 바로 보인다 — 글이 안쪽 경로에만 있으면
 * 방문자는 사이트가 관리되고 있는지 알 수 없다.
 *
 * 장식은 최소로 둔다. 둥근 모서리와 옅은 그림자, 사진 한 장, 제목 두 줄.
 * 카드 자체가 눈에 띄려고 하면 정작 글 제목이 안 읽힌다.
 */

const FALLBACK_TINTS = [
  "from-emerald-100 to-teal-200",
  "from-amber-100 to-orange-200",
  "from-sky-100 to-indigo-200",
  "from-rose-100 to-rose-200",
];

function tintFor(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) hash = (hash * 31 + seed.charCodeAt(i)) % 9973;
  return FALLBACK_TINTS[hash % FALLBACK_TINTS.length];
}

/** 글에 지정한 썸네일 → 첫 추천 제품의 사진 → 없음(이모지 카드로 떨어짐) */
function thumbnailFor(post: HealthPost): string | undefined {
  if (post.thumbnail) return post.thumbnail;
  for (const pick of post.productPicks ?? []) {
    if (pick.imageUrl) return pick.imageUrl;
    const coupang = pick.nutrientId ? getOffer(pick.nutrientId)?.coupang : undefined;
    if (coupang?.imageUrl) return coupang.imageUrl;
  }
  return undefined;
}

function shortDate(post: HealthPost): string {
  const raw = post.updatedAt ?? post.publishedAt;
  const then = new Date(`${raw}T00:00:00`);
  if (Number.isNaN(then.getTime())) return raw;
  const days = Math.floor((Date.now() - then.getTime()) / 86_400_000);
  if (days <= 0) return "오늘";
  if (days === 1) return "어제";
  if (days < 7) return `${days}일 전`;
  if (days < 31) return `${Math.floor(days / 7)}주 전`;
  return raw.slice(2).replace(/-/g, ".");
}

const Card: React.FC<{ post: HealthPost }> = ({ post }) => {
  const src = thumbnailFor(post);
  const [failed, setFailed] = useState(false);
  const showImage = src && !failed;

  return (
    <a
      {...linkProps(`/health/${post.slug}`)}
      className="group block bg-white rounded-2xl shadow-sm hover:shadow-md ring-1 ring-slate-200/70 hover:ring-emerald-300 overflow-hidden transition-all"
    >
      {/* 제품 사진은 흰 배경에 물건 하나가 놓인 형태다. cover 로 채우면 병이
          잘려 무슨 제품인지 안 보인다. contain 으로 전체를 담는다. */}
      <div className="aspect-[4/3] bg-white overflow-hidden">
        {showImage ? (
          <img
            src={src}
            alt=""
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
            className="w-full h-full object-contain p-2 group-hover:scale-[1.04] transition-transform duration-300"
          />
        ) : (
          <div
            className={`w-full h-full bg-gradient-to-br ${tintFor(post.slug)} flex items-center justify-center`}
          >
            <span className="text-4xl" aria-hidden="true">
              {post.heroEmoji}
            </span>
          </div>
        )}
      </div>

      <div className="p-3">
        <h3 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2 group-hover:text-emerald-800 transition-colors">
          {post.title}
        </h3>
        <p className="text-[11px] text-slate-400 mt-1.5">{shortDate(post)}</p>
      </div>
    </a>
  );
};

export const RecentPostsStrip: React.FC<{ limit?: number }> = ({ limit = 4 }) => {
  const posts = allPosts.slice(0, limit);
  if (!posts.length) return null;

  return (
    <section className="mb-6">
      <div className="flex items-baseline justify-between mb-3">
        <h2 className="text-sm font-bold text-slate-700">새로 올라온 글</h2>
        <a
          {...linkProps("/health")}
          className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-emerald-700 transition-colors"
        >
          전체보기
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* 모바일은 두 칸. 세 칸부터는 제목이 잘려 카드만 보고는 무슨 글인지 모른다. */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {posts.map((post) => (
          <Card key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
};
