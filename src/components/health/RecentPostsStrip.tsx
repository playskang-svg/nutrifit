import React, { useState } from "react";
import { ArrowRight, ChevronRight } from "lucide-react";
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
 * 가로로 길고 세로로 얇은 줄 세 개. 첫 화면에서 세 편을 다 보여주되
 * 아래 콘텐츠를 밀어내지 않는 형태다. 자세한 내용은 눌러서 본다.
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

const Row: React.FC<{ post: HealthPost }> = ({ post }) => {
  const src = thumbnailFor(post);
  const [failed, setFailed] = useState(false);
  const showImage = src && !failed;

  return (
    <a
      {...linkProps(`/health/${post.slug}`)}
      className="group flex items-stretch gap-3 p-2 bg-white rounded-2xl shadow-sm hover:shadow-md ring-1 ring-slate-200/70 hover:ring-emerald-300 transition-all"
    >
      {/* 썸네일은 4:3으로 그렸다. 줄 높이에 맞춰 늘리면 세로로 길어져
          좌우가 잘리고 구성 요소가 프레임 밖으로 나간다. 비율을 고정한다. */}
      <div className="w-[104px] sm:w-[136px] aspect-[4/3] shrink-0 self-center rounded-xl overflow-hidden bg-white">
        {showImage ? (
          <img
            src={src}
            alt=""
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
            className={`w-full h-full group-hover:scale-[1.04] transition-transform duration-300 ${
              // 글 주제로 그린 썸네일은 프레임을 꽉 채운다. 제품 사진으로
              // 떨어졌을 때만 여백을 둬서 병이 잘리지 않게 한다.
              post.thumbnail ? "object-cover" : "object-contain p-1.5"
            }`}
          />
        ) : (
          <div
            className={`w-full h-full bg-gradient-to-br ${tintFor(post.slug)} flex items-center justify-center`}
          >
            <span className="text-2xl" aria-hidden="true">
              {post.heroEmoji}
            </span>
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1 flex flex-col justify-center">
        <h3 className="text-[13.5px] sm:text-sm font-bold text-slate-900 leading-snug line-clamp-2 group-hover:text-emerald-800 transition-colors">
          {post.title}
        </h3>
        <p className="text-[12px] text-slate-500 leading-snug line-clamp-1 sm:line-clamp-2 mt-0.5">
          {post.summary}
        </p>
        <p className="text-[11px] text-slate-400 mt-1">{shortDate(post)}</p>
      </div>

      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 self-center shrink-0 transition-colors" />
    </a>
  );
};

export const RecentPostsStrip: React.FC<{ limit?: number }> = ({ limit = 3 }) => {
  const posts = allPosts.slice(0, limit);
  if (!posts.length) return null;

  return (
    <section className="mb-6">
      <div className="flex items-baseline justify-between mb-2.5">
        <h2 className="text-sm font-bold text-slate-700">새로 올라온 글</h2>
        <a
          {...linkProps("/health")}
          className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-emerald-700 transition-colors"
        >
          전체보기
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>

      <div className="space-y-2">
        {posts.map((post) => (
          <Row key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
};
