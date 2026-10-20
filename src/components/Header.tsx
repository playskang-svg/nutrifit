import React, { useEffect, useRef, useState } from "react";
import { linkProps, navigate } from "../lib/router";
import {
  HeartPulse,
  Sparkles,
  Search,
  Menu,
  X,
  ChevronRight,
  BookOpen,
  Clock,
  Activity,
  ShieldCheck,
  Utensils,
  Tag,
  Newspaper,
} from "lucide-react";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAiDiagnostic: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const NAV_ITEMS = [
  { id: "health", label: "건강정보", hint: "증상·영양소 해설 글", icon: Newspaper, href: "/health" },
  { id: "catalog", label: "100대 영양소", hint: "결핍 증상부터 제형 비교까지", icon: BookOpen },
  { id: "schedule", label: "복용 시간표", hint: "흡수 경쟁을 피하는 순서", icon: Clock },
  { id: "organs", label: "장기별 가이드", hint: "눈·장·관절·간 타겟", icon: Activity },
  { id: "demographics", label: "생애주기·직업", hint: "노년기·수험생·직장인", icon: ShieldCheck },
  { id: "diet", label: "식단 매칭", hint: "음식 급원과 상호보충", icon: Utensils },
  { id: "deals", label: "할인 혜택", hint: "쿠팡·직구가 비교", icon: Tag },
];

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenAiDiagnostic,
  searchQuery,
  setSearchQuery,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    panelRef.current?.focus();
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const go = (item: (typeof NAV_ITEMS)[number]) => {
    if (item.href) navigate(item.href);
    else setActiveTab(item.id);
    setMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#fcfdfc]/95 backdrop-blur-md border-b border-[#cddbd6]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 h-[72px] flex items-center justify-between gap-4">
          {/* Brand Mark & Copy (adbles.com Brand style) */}
          <a {...linkProps("/")} className="flex items-center gap-2.5 shrink-0 group cursor-pointer text-inherit no-underline">
            <div className="w-9 h-9 rounded-lg bg-[#102d3c] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
              <HeartPulse className="w-5 h-5 text-[#eaf2ee]" />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-1.5">
                <strong className="text-base font-black text-[#102d3c] tracking-tight">NutriFit 100</strong>
                <span className="text-[10px] font-bold bg-[#eaf2ee] text-[#2e6573] px-1.5 py-0.5 rounded">
                  뉴트리핏
                </span>
              </div>
              <small className="text-[10px] text-[#61777f] font-semibold leading-tight hidden sm:block">
                100대 영양소 &amp; 맞춤 영양제 가이드
              </small>
            </div>
          </a>

          {/* Desktop Navigation (adbles.com style) */}
          <nav className="hidden lg:flex items-center gap-6 text-[13.5px] font-bold text-[#18313c]">
            {NAV_ITEMS.map((item) => {
              const isActive = activeTab === item.id;
              const linkClasses = `transition-colors hover:text-[#e67b32] cursor-pointer whitespace-nowrap py-1 ${
                isActive ? "text-[#e67b32] font-black border-b-2 border-[#e67b32]" : ""
              }`;
              return item.href ? (
                <a key={item.id} {...linkProps(item.href)} className={linkClasses}>
                  {item.label}
                </a>
              ) : (
                <button key={item.id} onClick={() => setActiveTab(item.id)} className={linkClasses}>
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Header Right Tools (adbles.com style) */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Search Input on Desktop */}
            <div className="relative hidden md:block w-48 lg:w-56">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="영양소·증상 검색..."
                className="w-full pl-8 pr-3 py-1.5 bg-[#f6f9f7] hover:bg-white focus:bg-white text-xs text-[#18313c] placeholder-slate-400 rounded-md border border-[#cddbd6] focus:outline-none focus:border-[#2e6573] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  aria-label="검색어 지우기"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 hover:text-slate-600 bg-slate-200 rounded-full w-4 h-4 flex items-center justify-center cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            {/* AI 맞춤 분석 Action Button */}
            <button
              onClick={onOpenAiDiagnostic}
              className="flex items-center gap-1.5 px-3 py-2 bg-[#102d3c] hover:bg-[#2e6573] text-white text-xs font-bold rounded-md shadow-xs transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#e67b32]" />
              <span className="hidden sm:inline">AI 맞춤 영양 분석</span>
              <span className="sm:hidden">AI 진단</span>
            </button>

            {/* Mobile Menu Hamburger (adbles.com Mobile Menu style) */}
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="전체 메뉴 열기"
              aria-expanded={menuOpen}
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-md border border-[#cddbd6] text-[#102d3c] bg-white hover:bg-[#f6f9f7] transition-colors cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (adbles.com style) */}
      {menuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-[#071922]/58"
            onClick={() => setMenuOpen(false)}
          />

          <section
            id="mobile-nav"
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label="전체 메뉴"
            className="absolute inset-y-0 right-0 w-[min(90vw,380px)] bg-[#fcfdfc] shadow-2xl flex flex-col outline-none p-5"
          >
            <div className="flex items-center justify-between pb-4 border-b-2 border-[#102d3c] shrink-0">
              <div>
                <span className="block text-[10px] text-[#2e6573] font-bold">NutriFit 100</span>
                <strong className="text-xl font-bold font-serif text-[#102d3c]">전체 메뉴</strong>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="메뉴 닫기"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-[#cddbd6] text-[#102d3c] hover:bg-[#eaf2ee] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto overscroll-contain py-2 divide-y divide-[#cddbd6]">
              {NAV_ITEMS.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => go(item)}
                    aria-current={isActive ? "page" : undefined}
                    className="w-full flex items-center justify-between py-3.5 text-left cursor-pointer group"
                  >
                    <div>
                      <strong className={`block text-sm ${isActive ? "text-[#e67b32] font-black" : "text-[#102d3c]"}`}>
                        {item.label}
                      </strong>
                      <small className="block text-xs text-[#657980] mt-0.5">{item.hint}</small>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#e67b32] shrink-0" />
                  </button>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-[#cddbd6] shrink-0">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onOpenAiDiagnostic();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 bg-[#102d3c] hover:bg-[#2e6573] text-white text-xs font-bold rounded-md transition-colors cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#e67b32]" />
                AI 맞춤 영양 분석기 시작
              </button>
              <div className="flex justify-center gap-4 mt-4 text-[11px] font-bold text-[#5c7178]">
                <a {...linkProps("/about")} onClick={() => setMenuOpen(false)}>소개</a>
                <a {...linkProps("/editorial")} onClick={() => setMenuOpen(false)}>편집 원칙</a>
                <a {...linkProps("/privacy")} onClick={() => setMenuOpen(false)}>개인정보처리방침</a>
                <a {...linkProps("/contact")} onClick={() => setMenuOpen(false)}>문의</a>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};
