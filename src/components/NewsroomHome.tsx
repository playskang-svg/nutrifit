import { HEALTH_TOOLS, TOOLS_HUB } from "../data/healthTools";
import React, { useMemo } from "react";
import { HealthPost, NutrientItem } from "../types";
import { postCategories, getCategory } from "../content/postCategories";
import { formatPostDate } from "../content/posts";
import { linkProps } from "../lib/router";
import { Clock, ArrowRight, Sparkles, BookOpen, Calendar, Activity, ChevronRight, ShieldCheck } from "lucide-react";

interface NewsroomHomeProps {
  posts: HealthPost[];
  allNutrients: NutrientItem[];
  onSelectTab: (tab: string) => void;
  onSelectNutrient: (nutrient: NutrientItem) => void;
  onOpenAiDiagnostic: () => void;
}

export const NewsroomHome: React.FC<NewsroomHomeProps> = ({
  posts,
  allNutrients,
  onSelectTab,
  onSelectNutrient,
  onOpenAiDiagnostic,
}) => {
  // Top featured post for the hero section
  const heroPost = posts[0];
  const topStories = useMemo(() => posts.slice(1, 5), [posts]);

  // Group posts by category (top 4 per category)
  const categoryBlocks = useMemo(() => {
    return postCategories.map((cat) => {
      const catPosts = posts.filter((p) => p.category === cat.slug).slice(0, 4);
      return {
        ...cat,
        posts: catPosts,
      };
    }).filter((cat) => cat.posts.length > 0);
  }, [posts]);

  // Top popular nutrients for sidebar quick-links
  const popularNutrients = useMemo(() => {
    const popularNames = ["비타민 C", "마그네슘", "오메가-3", "비타민 D", "아연", "유산균 (프로바이오틱스)", "루테인", "밀크씨슬"];
    return allNutrients.filter((n) =>
      popularNames.some((p) => n.name.includes(p) || p.includes(n.name))
    ).slice(0, 8);
  }, [allNutrients]);

  return (
    <div className="newsroom-layout">
      {/* Newsroom Main Stream */}
      <div className="newsroom-main">
        {/* Newsroom Hero Grid (adbles.com style) */}
        <section className="newsroom-hero" aria-labelledby="hero-heading">
          <h2 id="hero-heading" className="sr-only">주요 건강 브리핑</h2>

          {/* Left: Large Featured Hero Story */}
          <div className="newsroom-hero-main">
            {heroPost && (
              <a {...linkProps(`/health/${heroPost.slug}`)} className="hero-card">
                <div className="hero-visual-box">
                  <span className="hero-visual-badge" role="img" aria-label={heroPost.title}>
                    {heroPost.heroEmoji}
                  </span>
                </div>
                <div className="hero-card-body">
                  <div className="hero-card-meta">
                    <span className="hero-chip">
                      {getCategory(heroPost.category)?.label || "건강분석"}
                    </span>
                    <span className="hero-time flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {heroPost.readingMinutes}분 읽기
                    </span>
                    <span className="hero-time ml-auto">
                      {formatPostDate(heroPost.publishedAt)}
                    </span>
                  </div>
                  <h3 className="hero-title">{heroPost.title}</h3>
                  <p className="hero-desc">{heroPost.description}</p>
                  <div className="mt-auto pt-3 flex items-center text-xs font-bold text-[#2e6573] gap-1 group-hover:text-[#e67b32] transition-colors">
                    <span>전문 읽기</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </a>
            )}
          </div>

          {/* Right: 4 Top Side Stories */}
          <div className="newsroom-hero-side">
            <h3 className="newsroom-hero-side-title">주요 건강 브리핑</h3>
            {topStories.map((post) => (
              <a key={post.slug} {...linkProps(`/health/${post.slug}`)} className="side-story-item">
                <div className="side-story-thumb" aria-hidden="true">
                  {post.heroEmoji}
                </div>
                <div className="side-story-content">
                  <div className="side-story-meta">
                    <span>{getCategory(post.category)?.label}</span>
                    <span>·</span>
                    <span>{post.readingMinutes}분</span>
                  </div>
                  <h4 className="side-story-title">{post.title}</h4>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Situation Feature Hub Grid (adbles.com 4-Card Situation Grid) */}
        <section aria-labelledby="hub-heading">
          <h2 id="hub-heading" className="sr-only">핵심 영양 솔루션 허브</h2>
          <div className="situation-hub-grid">
            <div className="situation-hub-card" onClick={onOpenAiDiagnostic} role="button" tabIndex={0}>
              <span className="situation-tag">맞춤 분석</span>
              <h3 className="situation-title">내 몸에 꼭 필요한 영양소 진단</h3>
              <p className="situation-desc">연령·성별·생활패턴 기반 공공 영양기준 정밀 리포트</p>
              <span className="situation-action">
                AI 진단 시작 <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>

            <div className="situation-hub-card" onClick={() => onSelectTab("catalog")} role="button" tabIndex={0}>
              <span className="situation-tag">100대 영양소</span>
              <h3 className="situation-title">대한민국 100대 필수 영양소 백과</h3>
              <p className="situation-desc">100가지 영양소 권장량·결핍 신호·최적 제형 비교</p>
              <span className="situation-action">
                도감 전체보기 <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>

            <div className="situation-hub-card" onClick={() => onSelectTab("schedule")} role="button" tabIndex={0}>
              <span className="situation-tag">복용 시간표</span>
              <h3 className="situation-title">흡수율 극대화 영양제 복용 시간표</h3>
              <p className="situation-desc">식전·식후 복용 순서와 상극 충돌 방지 가이드</p>
              <span className="situation-action">
                시간표 확인 <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>

            <div className="situation-hub-card" onClick={() => onSelectTab("organs")} role="button" tabIndex={0}>
              <span className="situation-tag">장기별 가이드</span>
              <h3 className="situation-title">눈·장·혈관·관절 타겟 영양</h3>
              <p className="situation-desc">취약 부위별 기능성 성분과 임상 근거 리포트</p>
              <span className="situation-action">
                가이드 보기 <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </section>

        {/* 건강 계산기 (tools.tipspedia.kr) */}
        <section aria-labelledby="tools-heading" id="tools">
          <h2 id="tools-heading" style={{ fontSize: 18, fontWeight: 800, margin: "8px 0 12px" }}>바로 쓰는 건강 계산기</h2>
          <div className="situation-hub-grid">
            {HEALTH_TOOLS.map((tool) => (
              <a key={tool.href} className="situation-hub-card" href={tool.href}>
                <span className="situation-tag">{tool.emoji} {tool.tag}</span>
                <h3 className="situation-title">{tool.title}</h3>
                <p className="situation-desc">{tool.desc}</p>
                <span className="situation-action">계산해 보기 <ChevronRight className="w-3.5 h-3.5" /></span>
              </a>
            ))}
            <a className="situation-hub-card" href={TOOLS_HUB}>
              <span className="situation-tag">🧰 전체 도구</span>
              <h3 className="situation-title">전체 계산기 30개</h3>
              <p className="situation-desc">실업급여·부가세·환전·강아지 나이까지 분야별 도구 모음</p>
              <span className="situation-action">전체 보기 <ChevronRight className="w-3.5 h-3.5" /></span>
            </a>
          </div>
        </section>

        {/* Category Newsroom Blocks (adbles.com Category Sections) */}        {categoryBlocks.map((cat) => (
          <section key={cat.slug} className="newsroom-category-block" aria-labelledby={`cat-${cat.slug}`}>
            <div className="newsroom-category-block-header">
              <h2 id={`cat-${cat.slug}`}>{cat.label}</h2>
              <a {...linkProps(`/health/c/${cat.slug}`)}>
                {cat.label} 전체보기 ›
              </a>
            </div>
            <div className="newsroom-category-grid">
              {cat.posts.map((post) => (
                <a key={post.slug} {...linkProps(`/health/${post.slug}`)} className="editorial-post-card">
                  <div className="editorial-card-thumb" aria-hidden="true">
                    {post.heroEmoji}
                  </div>
                  <div className="editorial-card-body">
                    <div className="editorial-card-meta">
                      <span className="editorial-card-chip">{cat.label}</span>
                      <span className="editorial-card-date">{formatPostDate(post.publishedAt)}</span>
                    </div>
                    <h3 className="editorial-card-title">{post.title}</h3>
                    <p className="editorial-card-desc">{post.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Newsroom Sidebar (adbles.com Sidebar style) */}
      <aside className="newsroom-sidebar" aria-label="사이드바 메뉴 및 도구">
        <div className="newsroom-sidebar-sticky">
          {/* Situation Hub Widget */}
          <div className="sidebar-widget">
            <h3 className="sidebar-widget-title">상황별 핵심 도구</h3>
            <div className="sidebar-hub-item" onClick={onOpenAiDiagnostic} role="button" tabIndex={0}>
              <span className="sidebar-hub-tag">AI 진단</span>
              <h4 className="sidebar-hub-title">내 증상 맞춤 영양 분석기</h4>
              <p className="sidebar-hub-desc">성별·연령·불편 부위를 기반으로 부족한 영양소와 흡수 기전을 진단합니다.</p>
            </div>
            <div className="sidebar-hub-item" onClick={() => onSelectTab("schedule")} role="button" tabIndex={0}>
              <span className="sidebar-hub-tag">흡수 타이밍</span>
              <h4 className="sidebar-hub-title">영양제 복용 시간표</h4>
              <p className="sidebar-hub-desc">칼슘·철분 충돌을 피하고 지용성 비타민 흡수를 돕는 시간표입니다.</p>
            </div>
            <div className="sidebar-hub-item" onClick={() => onSelectTab("diet")} role="button" tabIndex={0}>
              <span className="sidebar-hub-tag">식단 매칭</span>
              <h4 className="sidebar-hub-title">음식 급원과 시너지 식단</h4>
              <p className="sidebar-hub-desc">자연 식품에서 섭취 가능한 한계와 보충이 필요한 성분을 비교합니다.</p>
            </div>
          </div>

          {/* Popular Nutrients Widget */}
          <div className="sidebar-widget">
            <h3 className="sidebar-widget-title">주요 영양소 바로보기</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {popularNutrients.map((n) => (
                <button
                  key={n.id}
                  onClick={() => onSelectNutrient(n)}
                  className="px-2.5 py-1.5 text-xs font-semibold bg-white border border-[#cddbd6] rounded-md hover:border-[#2e6573] hover:text-[#e67b32] transition-colors cursor-pointer text-left"
                >
                  {n.name}
                </button>
              ))}
            </div>
            <button
              onClick={() => onSelectTab("catalog")}
              className="w-full mt-4 py-2 px-3 text-xs font-bold text-center text-[#2e6573] bg-[#eaf2ee] hover:bg-[#d6e8e0] rounded-md transition-colors cursor-pointer"
            >
              100대 영양소 도감 전체보기 →
            </button>
          </div>

          {/* Editorial Trust Widget */}
          <div className="sidebar-widget">
            <h3 className="sidebar-widget-title">편집 원칙과 기준</h3>
            <p className="text-xs text-[#60747c] leading-relaxed mb-3">
              뉴트리핏은 의약품이 아닌 건강기능식품의 과학적 연구와 보건복지부 한국인 영양소 섭취기준, 식약처 기능성 고시를 근거로 정직하게 작성합니다.
            </p>
            <a
              {...linkProps("/editorial")}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#2e6573] hover:text-[#e67b32] transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>편집 원칙 전문 보기 →</span>
            </a>
          </div>
        </div>
      </aside>
    </div>
  );
};
