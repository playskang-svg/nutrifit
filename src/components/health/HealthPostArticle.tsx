import React, { useMemo } from "react";
import {
  Clock,
  CalendarDays,
  ChevronRight,
  List,
  ShieldAlert,
  Link2,
  ArrowLeft,
  BookMarked,
  Pill,
  HelpCircle,
} from "lucide-react";
import { HealthPost, NutrientItem } from "../../types";
import { renderMarkdown, extractHeadings } from "../../lib/markdown";
import { getCategory, getAccent } from "../../content/postCategories";
import { getRelatedPosts, formatPostDate } from "../../content/posts";
import { linkProps } from "../../lib/router";
import { ProductPickCard } from "./ProductPickCard";
import { COUPANG_DISCLOSURE, LINKPRICE_DISCLOSURE } from "../../data/affiliateLinks";

interface HealthPostArticleProps {
  post: HealthPost;
  allNutrients: NutrientItem[];
  onSelectNutrient: (nutrient: NutrientItem) => void;
}

export const HealthPostArticle: React.FC<HealthPostArticleProps> = ({
  post,
  allNutrients,
  onSelectNutrient,
}) => {
  const category = getCategory(post.category);
  const accent = getAccent(post.category);
  const headings = useMemo(() => extractHeadings(post.body), [post.body]);
  const html = useMemo(() => renderMarkdown(post.body), [post.body]);
  const related = useMemo(() => getRelatedPosts(post, 3), [post]);

  const nutrientById = useMemo(
    () => new Map(allNutrients.map((item) => [item.id, item])),
    [allNutrients]
  );

  const relatedNutrients = (post.relatedNutrientIds ?? [])
    .map((id) => nutrientById.get(id))
    .filter((item): item is NutrientItem => Boolean(item));

  const picks = post.productPicks ?? [];

  return (
    <div className="max-w-3xl mx-auto">
      {/* 이동 경로 */}
      <nav aria-label="이동 경로" className="flex items-center gap-1 text-xs text-slate-500 mb-4 flex-wrap">
        <a {...linkProps("/")} className="hover:text-emerald-700">홈</a>
        <ChevronRight className="w-3 h-3" />
        <a {...linkProps("/health")} className="hover:text-emerald-700">건강블로그</a>
        <ChevronRight className="w-3 h-3" />
        <a {...linkProps(`/health/c/${post.category}`)} className="hover:text-emerald-700">
          {category?.label}
        </a>
      </nav>

      <article>
        {/* 머리말 */}
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className={`inline-flex items-center gap-1 text-[11px] font-bold border px-2.5 py-1 rounded-full ${accent.chip}`}>
              <span aria-hidden="true">{category?.emoji}</span>
              {category?.label}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-500">
              <CalendarDays className="w-3.5 h-3.5" />
              {formatPostDate(post.publishedAt)}
              {post.updatedAt ? ` (${formatPostDate(post.updatedAt)} 갱신)` : ""}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-500">
              <Clock className="w-3.5 h-3.5" />
              {post.readingMinutes}분
            </span>
          </div>

          <h1 className="text-2xl sm:text-[34px] font-black text-slate-900 leading-[1.28] tracking-tight mb-4">
            {post.title}
          </h1>

          <p className="text-[15px] sm:text-base text-slate-600 leading-relaxed border-l-4 border-slate-200 pl-4">
            {post.summary}
          </p>

          <div className="flex items-center gap-2 mt-5 pt-4 border-t border-slate-100 text-xs text-slate-500">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[11px] shrink-0">
              NF
            </div>
            <div>
              <p className="font-semibold text-slate-700">{post.author.name}</p>
              <p className="text-[11px] text-slate-400">{post.author.credential}</p>
            </div>
          </div>
        </header>

        {/* 핵심 요약 */}
        {post.keyPoints.length ? (
          <section
            aria-label="핵심 요약"
            className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-5 sm:p-6 mb-8"
          >
            <h2 className="flex items-center gap-2 text-sm font-black text-emerald-900 mb-3">
              <BookMarked className="w-4 h-4" />
              3분 요약
            </h2>
            <ul className="space-y-2">
              {post.keyPoints.map((point, index) => (
                <li key={index} className="flex gap-2.5 text-[13.5px] text-slate-700 leading-relaxed">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-emerald-600 text-white text-[11px] font-bold flex items-center justify-center mt-0.5">
                    {index + 1}
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {/* 목차 */}
        {headings.length > 2 ? (
          <nav aria-label="목차" className="border border-slate-200 rounded-2xl p-5 mb-8 bg-white">
            <p className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              <List className="w-4 h-4" />
              목차
            </p>
            <ol className="space-y-1.5">
              {headings.map((heading) => (
                <li key={heading.id} className={heading.level === 3 ? "pl-4" : ""}>
                  <a
                    href={`#${heading.id}`}
                    className="text-[13.5px] text-slate-600 hover:text-emerald-700 hover:underline underline-offset-4"
                  >
                    {heading.text}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        {/* 본문 */}
        <div className="post-body" dangerouslySetInnerHTML={{ __html: html }} />

        {/* 태그 */}
        {post.tags.length ? (
          <div className="flex flex-wrap gap-1.5 mt-10">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] text-slate-500 bg-slate-100 border border-slate-200 rounded-full px-2.5 py-1"
              >
                #{tag}
              </span>
            ))}
          </div>
        ) : null}

        {/* 제품 연결 */}
        {picks.length ? (
          <section className="mt-12">
            <h2 className="flex items-center gap-2 text-lg font-black text-slate-900 mb-1.5">
              <Pill className="w-5 h-5 text-emerald-600" />이 글에서 언급한 제품
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              본문 기준에 맞춰 고른 제품입니다. 가격과 재고는 판매처에서 바뀔 수 있습니다.
            </p>
            <div className="grid grid-cols-1 gap-4">
              {picks.map((pick, index) => (
                <ProductPickCard
                  key={`${pick.nutrientId ?? pick.title ?? "pick"}-${index}`}
                  pick={pick}
                  nutrient={pick.nutrientId ? nutrientById.get(pick.nutrientId) : undefined}
                  heroEmoji={post.heroEmoji}
                  onSelectNutrient={onSelectNutrient}
                />
              ))}
            </div>
            {/* 대가성 표시는 공정위 추천·보증 심사지침 및 각 제휴사 필수 사항이다. 지우지 않는다. */}
            <p className="mt-3 text-[11px] leading-relaxed text-slate-500 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
              {COUPANG_DISCLOSURE} {LINKPRICE_DISCLOSURE} 수수료는 구매 가격에 영향을 주지 않습니다.
            </p>
          </section>
        ) : null}

        {/* 관련 영양소 */}
        {relatedNutrients.length ? (
          <section className="mt-10">
            <h2 className="text-lg font-black text-slate-900 mb-3">함께 보면 좋은 영양소</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {relatedNutrients.map((nutrient) => (
                <button
                  key={nutrient.id}
                  type="button"
                  onClick={() => onSelectNutrient(nutrient)}
                  className="text-left bg-white border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/40 rounded-xl px-4 py-3 transition-colors cursor-pointer group"
                >
                  <p className="text-sm font-bold text-slate-900 group-hover:text-emerald-800 truncate">
                    {nutrient.name}
                  </p>
                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                    {nutrient.oneLineSummary}
                  </p>
                </button>
              ))}
            </div>
          </section>
        ) : null}

        {/* FAQ */}
        {post.faq?.length ? (
          <section className="mt-12">
            <h2 className="flex items-center gap-2 text-lg font-black text-slate-900 mb-4">
              <HelpCircle className="w-5 h-5 text-emerald-600" />
              자주 묻는 질문
            </h2>
            <div className="space-y-2">
              {post.faq.map((item, index) => (
                <details
                  key={index}
                  className="group bg-white border border-slate-200 rounded-xl overflow-hidden"
                  open={index === 0}
                >
                  <summary className="cursor-pointer list-none px-4 py-3.5 text-[14px] font-bold text-slate-800 flex items-start gap-2 hover:bg-slate-50">
                    <span className="text-emerald-600 shrink-0">Q.</span>
                    <span className="flex-1">{item.question}</span>
                    <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 mt-0.5 transition-transform group-open:rotate-90" />
                  </summary>
                  <p className="px-4 pb-4 pt-3 text-[13.5px] text-slate-600 leading-relaxed border-t border-slate-100">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>
        ) : null}

        {/* 출처 */}
        {post.sources?.length ? (
          <section className="mt-12">
            <h2 className="flex items-center gap-2 text-sm font-black text-slate-700 mb-3">
              <Link2 className="w-4 h-4" />
              참고 자료
            </h2>
            <ol className="space-y-2 text-[12.5px]">
              {post.sources.map((source, index) => (
                <li key={index} className="flex gap-2 text-slate-600">
                  <span className="text-slate-400">[{index + 1}]</span>
                  <span>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener nofollow"
                      className="text-emerald-700 hover:underline underline-offset-2 font-medium"
                    >
                      {source.title}
                    </a>
                    <span className="text-slate-400">
                      {" — "}
                      {source.publisher}
                      {source.year ? ` (${source.year})` : ""}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </section>
        ) : null}

        {/* 의학적 고지 */}
        <aside className="mt-10 flex gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-[12px] text-amber-900 leading-relaxed">
            <strong className="font-bold">의학적 고지</strong> — 이 글은 일반적인 건강·영양 정보이며 의사의 진단이나
            처방을 대신하지 않습니다. 질환을 치료 중이거나 약을 복용 중인 경우, 임신·수유 중인 경우에는
            영양제 섭취 전 반드시 의료진과 상의하세요. 증상이 지속되거나 악화되면 진료를 받으시기 바랍니다.
          </p>
        </aside>
      </article>

      {/* 관련 글 */}
      {related.length ? (
        <section className="mt-14 pt-8 border-t border-slate-200">
          <h2 className="text-lg font-black text-slate-900 mb-4">이어서 읽기</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {related.map((item) => {
              const itemAccent = getAccent(item.category);
              return (
                <a
                  key={item.slug}
                  {...linkProps(`/health/${item.slug}`)}
                  className={`block bg-white border border-slate-200 rounded-xl p-4 transition-all hover:shadow-md ${itemAccent.ring}`}
                >
                  <span className="text-2xl" aria-hidden="true">{item.heroEmoji}</span>
                  <p className="mt-2 text-[13.5px] font-bold text-slate-900 leading-snug line-clamp-3">
                    {item.title}
                  </p>
                  <p className="mt-1.5 text-[11px] text-slate-400">{item.readingMinutes}분 읽기</p>
                </a>
              );
            })}
          </div>
        </section>
      ) : null}

      <div className="mt-10">
        <a
          {...linkProps("/health")}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-emerald-700"
        >
          <ArrowLeft className="w-4 h-4" />
          건강블로그 목록으로
        </a>
      </div>
    </div>
  );
};
