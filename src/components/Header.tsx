import React, { useEffect, useRef, useState } from "react";
import { linkProps, navigate } from "../lib/router";
import {
  ShieldCheck,
  Sparkles,
  BookOpen,
  Tag,
  Activity,
  Search,
  CheckCircle2,
  HeartPulse,
  Clock,
  BarChart3,
  Package,
  Utensils,
  Newspaper,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAiDiagnostic: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

/**
 * 내비게이션 항목 한 곳.
 *
 * 데스크톱 탭 줄과 모바일 드로어가 같은 배열을 읽는다. 예전에는 같은 마크업을
 * 열 번 복사해 뒀는데, 항목 하나를 고치려면 열 군데를 고쳐야 했다.
 */
const NAV_ITEMS: {
  id: string;
  label: string;
  /** 모바일 드로어에서 한 줄 더 붙는 설명. 라벨만으로는 뭘 하는 화면인지 모른다. */
  hint: string;
  icon: React.ComponentType<{ className?: string }>;
  /** 탭이 아니라 별도 경로인 항목 */
  href?: string;
}[] = [
  { id: "health", label: "건강정보", hint: "증상·영양소 해설 글", icon: Newspaper, href: "/health" },
  { id: "catalog", label: "100대 영양소 대백과", hint: "결핍 증상부터 최저가까지", icon: BookOpen },
  { id: "schedule", label: "복용 시간표", hint: "흡수 경쟁을 피하는 순서", icon: Clock },
  { id: "visualizer", label: "영양 상태 시각화", hint: "내 부족분을 그래프로", icon: BarChart3 },
  { id: "subscription", label: "영양제 구독 관리", hint: "재구매 주기와 비용", icon: Package },
  { id: "diet", label: "식단 매칭 가이드", hint: "먹은 음식에 맞춘 보충", icon: Utensils },
  { id: "organs", label: "약한 부위별 처방", hint: "눈·장·관절·간", icon: Activity },
  { id: "demographics", label: "노년기·직업별", hint: "생애주기와 직업군", icon: ShieldCheck },
  { id: "columns", label: "글로벌 칼럼", hint: "해외 연구 요약", icon: BookOpen },
  { id: "deals", label: "가격·배송 혜택", hint: "로켓배송·직구가 비교", icon: Tag },
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

  // 드로어가 열린 동안 뒤 화면이 같이 스크롤되면 닫고 나서 엉뚱한 위치에 가 있다.
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
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        {/* 고지바 — 모바일에서는 숨긴다. 같은 문구가 히어로에도 있고 스티키 높이만 먹는다. */}
        <div className="hidden sm:block bg-emerald-900 text-white text-xs py-1.5 px-4">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="bg-emerald-500 text-slate-950 font-bold px-1.5 py-0.5 rounded-sm text-[10px] tracking-wider uppercase">
                쿠팡 실시간 가격
              </span>
              <span className="text-emerald-100 font-medium">
                100대 필수 영양소 정밀 분석 &amp; 국내 최저가·해외 직구가 한 번에 비교
              </span>
            </div>
            <div className="hidden lg:flex items-center gap-3 text-[11px] text-emerald-200">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                미국 의학자문위(MAB) 검증
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                SEO/GEO 최적화 의학 데이터
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-20 gap-3">
            <a {...linkProps("/")} className="flex items-center gap-2.5 cursor-pointer group shrink-0">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
                <HeartPulse className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-200" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-lg sm:text-xl font-black tracking-tight text-slate-900">
                    NutriFit<span className="text-emerald-600"> 100</span>
                  </span>
                  <span className="hidden sm:inline text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-300 px-1.5 py-0.5 rounded">
                    뉴트리핏
                  </span>
                </div>
                <p className="text-xs text-slate-500 hidden lg:block">
                  100대 필수 영양소 · 부위별·생애주기별 맞춤 처방 &amp; 직구 가이드
                </p>
              </div>
            </a>

            {/* 데스크톱 검색 */}
            <div className="flex-1 max-w-md hidden md:block">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="영양소, 증상(눈피로, 쥐남, 근감소), 음식(연어, 마늘) 검색..."
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-sm text-slate-800 placeholder-slate-400 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    aria-label="검색어 지우기"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 bg-slate-200 hover:bg-slate-300 rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={onOpenAiDiagnostic}
                className="flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-sm font-semibold rounded-lg shadow-sm shadow-emerald-700/20 transition-all hover:shadow-md cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span className="sm:hidden">AI</span>
                <span className="hidden sm:inline">AI 맞춤 영양 분석기</span>
              </button>

              {/* 햄버거 — 10개 항목을 가로 스크롤에 묻어두면 대부분 발견되지 않는다. */}
              <button
                onClick={() => setMenuOpen(true)}
                aria-label="메뉴 열기"
                aria-expanded={menuOpen}
                aria-controls="mobile-nav"
                className="lg:hidden w-11 h-11 flex items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 active:bg-slate-200 transition-colors cursor-pointer"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* 데스크톱 탭 줄 */}
          <nav className="hidden lg:flex items-center border-t border-slate-100 overflow-x-auto no-scrollbar py-2 gap-1 text-sm font-medium">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              const cls = `flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                isActive
                  ? "bg-emerald-700 text-white font-bold shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`;
              return item.href ? (
                <a key={item.id} {...linkProps(item.href)} className={cls}>
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </a>
              ) : (
                <button key={item.id} onClick={() => setActiveTab(item.id)} className={cls}>
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* 모바일 드로어 */}
      {menuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-slate-950/50 backdrop-blur-[2px]"
            onClick={() => setMenuOpen(false)}
          />

          <div
            id="mobile-nav"
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label="메뉴"
            className="absolute inset-y-0 right-0 w-[86%] max-w-sm bg-white shadow-2xl flex flex-col outline-none"
          >
            <div className="flex items-center justify-between px-4 h-14 border-b border-slate-200 shrink-0">
              <span className="text-base font-black text-slate-900">전체 메뉴</span>
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="메뉴 닫기"
                className="w-11 h-11 -mr-2 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto overscroll-contain py-2">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => go(item)}
                    aria-current={isActive ? "page" : undefined}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors cursor-pointer ${
                      isActive ? "bg-emerald-50" : "active:bg-slate-100"
                    }`}
                  >
                    <span
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        isActive ? "bg-emerald-700 text-white" : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span
                        className={`block text-[15px] leading-snug ${
                          isActive ? "font-black text-emerald-900" : "font-bold text-slate-800"
                        }`}
                      >
                        {item.label}
                      </span>
                      <span className="block text-xs text-slate-500 leading-snug mt-0.5 truncate">
                        {item.hint}
                      </span>
                    </span>
                    <ChevronRight
                      className={`w-4 h-4 shrink-0 ${isActive ? "text-emerald-700" : "text-slate-300"}`}
                    />
                  </button>
                );
              })}
            </nav>

            <div className="border-t border-slate-200 p-4 shrink-0">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onOpenAiDiagnostic();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-emerald-600 to-teal-700 text-white text-sm font-bold rounded-xl shadow-sm cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                AI 맞춤 영양 분석기
              </button>
              <p className="text-[11px] text-slate-400 text-center mt-3 leading-relaxed">
                이 사이트는 쿠팡 파트너스·제휴 링크를 포함하며,
                <br />
                구매 시 수수료를 받을 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
