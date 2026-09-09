import React, { useMemo } from "react";
import { Clock, Newspaper, Search, ArrowRight } from "lucide-react";
import { HealthPost, PostCategorySlug } from "../../types";
import { postCategories, getCategory, getAccent } from "../../content/postCategories";
import {
  allPosts,
  getPostsByCategory,
  getCategoryCounts,
  searchPosts,
  formatPostDate,
} from "../../content/posts";
import { linkProps } from "../../lib/router";

interface HealthPostListProps {
  category: PostCategorySlug | "all";
  searchQuery: string;
}

const PostCard: React.FC<{ post: HealthPost; featured?: boolean }> = ({ post, featured }) => {
  const category = getCategory(post.category);
  const accent = getAccent(post.category);

  return (
    <a
      {...linkProps(`/health/${post.slug}`)}
      className={`group flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all hover:shadow-lg hover:shadow-slate-900/5 ${accent.ring} ${
        featured ? "sm:flex-row" : ""
      }`}
    >
      <div
        className={`relative flex items-center justify-center bg-slate-50 border-b border-slate-100 ${
          featured
            ? "sm:w-64 sm:shrink-0 sm:border-b-0 sm:border-r h-36 sm:h-auto"
            : "h-28"
        }`}
      >
        <span
          className="text-5xl transition-transform duration-500 group-hover:scale-110"
          aria-hidden="true"
        >
          {post.heroEmoji}
        </span>
        <span className={`absolute top-0 left-0 h-1 w-full ${accent.bar}`} />
      </div>

      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-[10.5px] font-bold border px-2 py-0.5 rounded-full ${accent.chip}`}>
            {category?.label}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-slate-400">
            <Clock className="w-3 h-3" />
            {post.readingMinutes}분
          </span>
        </div>

        <h3
          className={`font-bold text-slate-900 leading-snug group-hover:text-emerald-800 transition-colors ${
            featured ? "text-lg sm:text-xl line-clamp-3" : "text-[15px] line-clamp-2"
          }`}
        >
          {post.title}
        </h3>

        <p
          className={`mt-2 text-slate-500 leading-relaxed ${
            featured ? "text-[13px] line-clamp-3" : "text-xs line-clamp-2"
          }`}
        >
          {post.description}
        </p>

        <div className="mt-auto pt-4 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">{formatPostDate(post.publishedAt)}</span>
          <span className="inline-flex items-center gap-1 text-[11.5px] font-bold text-emerald-700 group-hover:gap-2 transition-all">
            읽기
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </a>
  );
};

export const HealthPostList: React.FC<HealthPostListProps> = ({ category, searchQuery }) => {
  const counts = useMemo(() => getCategoryCounts(), []);
  const activeCategory = getCategory(category);

  const posts = useMemo(() => {
    const scoped = getPostsByCategory(category);
    if (!searchQuery.trim()) return scoped;
    const matched = new Set(searchPosts(searchQuery).map((post) => post.slug));
    return scoped.filter((post) => matched.has(post.slug));
  }, [category, searchQuery]);

  const [lead, ...rest] = posts;

  return (
    <div className="space-y-6">
      {/* 섹션 머리말 */}
      <div className="bg-gradient-to-br from-emerald-950 via-teal-900 to-slate-900 text-white p-6 sm:p-9 rounded-2xl shadow-lg">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Newspaper className="w-4 h-4" />
            <span>NutriFit 건강정보</span>
          </div>
          <h1 className="text-2xl sm:text-[32px] font-black tracking-tight leading-tight mb-3">
            {activeCategory
              ? `${activeCategory.label} — ${activeCategory.tagline}`
              : "증상에서 출발해 영양소로 끝내는 건강정보"}
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            {activeCategory?.description ??
              "무엇이 부족한지, 왜 부족한지, 무엇부터 채워야 하는지. 공공 영양기준과 해외 보건기관 자료를 근거로 정리하고 출처를 함께 밝힙니다."}
          </p>
        </div>
      </div>

      {/* 카테고리 필터 */}
      <nav aria-label="카테고리" className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        <a
          {...linkProps("/health")}
          className={`shrink-0 px-3.5 py-2 rounded-lg text-[13px] font-semibold border transition-colors ${
            category === "all"
              ? "bg-slate-900 text-white border-slate-900"
              : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
          }`}
        >
          전체 {allPosts.length}
        </a>
        {postCategories.map((item) => {
          const isActive = category === item.slug;
          const accent = getAccent(item.slug);
          return (
            <a
              key={item.slug}
              {...linkProps(`/health/c/${item.slug}`)}
              className={`shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[13px] font-semibold border transition-colors ${
                isActive
                  ? `${accent.chip} font-bold`
                  : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
              }`}
            >
              <span aria-hidden="true">{item.emoji}</span>
              {item.label}
              <span className="text-[11px] text-slate-400">{counts[item.slug] ?? 0}</span>
            </a>
          );
        })}
      </nav>

      {/* 목록 */}
      {posts.length === 0 ? (
        <div className="bg-white border border-dashed border-slate-300 rounded-2xl py-16 text-center">
          <Search className="w-8 h-8 text-slate-300 mx-auto mb-3" />
          <p className="text-sm text-slate-500">
            {searchQuery
              ? `'${searchQuery}'와 맞는 글이 아직 없습니다.`
              : "이 카테고리에는 아직 발행된 글이 없습니다."}
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {lead ? <PostCard post={lead} featured /> : null}
          {rest.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {rest.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};
