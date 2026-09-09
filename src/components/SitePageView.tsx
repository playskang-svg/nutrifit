import React, { useMemo } from "react";
import { ChevronRight, CalendarDays, List } from "lucide-react";
import { SitePage } from "../types";
import { renderMarkdown, extractHeadings } from "../lib/markdown";
import { formatPostDate } from "../content/posts";
import { allPages } from "../content/pages";
import { linkProps } from "../lib/router";

interface SitePageViewProps {
  page: SitePage;
}

/**
 * 정책·안내 페이지 화면. 글(HealthPostArticle)과 본문 스타일(.post-body)은 공유하되,
 * 제품 카드·관련 글·제휴 고지처럼 판매로 이어지는 요소는 넣지 않는다.
 */
export const SitePageView: React.FC<SitePageViewProps> = ({ page }) => {
  const html = useMemo(() => renderMarkdown(page.body), [page.body]);
  const headings = useMemo(
    () => extractHeadings(page.body).filter((heading) => heading.level === 2),
    [page.body]
  );
  const others = allPages.filter((item) => item.slug !== page.slug);

  return (
    <div className="max-w-3xl mx-auto">
      <nav aria-label="이동 경로" className="flex items-center gap-1 text-xs text-slate-500 mb-4 flex-wrap">
        <a {...linkProps("/")} className="hover:text-emerald-700">홈</a>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-700">{page.navLabel}</span>
      </nav>

      <article>
        <header className="mb-8">
          <h1 className="text-2xl sm:text-[34px] font-black text-slate-900 leading-[1.28] tracking-tight mb-3">
            {page.title}
          </h1>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-4">
            <CalendarDays className="w-3.5 h-3.5" />
            최종 개정일 {formatPostDate(page.updatedAt)}
          </div>
          <p className="text-[15px] sm:text-base text-slate-600 leading-relaxed border-l-4 border-emerald-200 pl-4">
            {page.summary}
          </p>
        </header>

        {headings.length > 2 && (
          <nav
            aria-label="이 문서의 목차"
            className="mb-8 bg-slate-50 border border-slate-200 rounded-xl p-4"
          >
            <p className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-2">
              <List className="w-3.5 h-3.5" />
              이 문서의 목차
            </p>
            <ol className="grid sm:grid-cols-2 gap-x-4 gap-y-1 text-[13px] text-slate-600">
              {headings.map((heading) => (
                <li key={heading.id}>
                  <a href={`#${heading.id}`} className="hover:text-emerald-700 hover:underline">
                    {heading.text}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="post-body" dangerouslySetInnerHTML={{ __html: html }} />
      </article>

      <nav className="mt-12 pt-6 border-t border-slate-200">
        <p className="text-xs font-bold text-slate-500 mb-3">사이트 안내 문서</p>
        <ul className="flex flex-wrap gap-2">
          {others.map((item) => (
            <li key={item.slug}>
              <a
                {...linkProps(`/${item.slug}`)}
                className="inline-block text-[13px] text-slate-700 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 border border-slate-200 px-3 py-1.5 rounded-lg transition-colors"
              >
                {item.navLabel}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
