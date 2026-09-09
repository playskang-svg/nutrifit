import React from "react";
import { linkProps } from "../lib/router";
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
  Newspaper
} from "lucide-react";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAiDiagnostic: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenAiDiagnostic,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top emergency benefit notice bar */}
      <div className="bg-emerald-900 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-500 text-slate-950 font-bold px-1.5 py-0.5 rounded-sm text-[10px] tracking-wider uppercase">
              iHerb 공식 연계
            </span>
            <span className="text-emerald-100 font-medium">
              100대 필수 영양소 정밀 분석 &amp; iHerb 단독 전품목 25~30% 할인 프로모션 코드 적용 중
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-[11px] text-emerald-200">
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

      {/* Main navigation container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo */}
          <a
            {...linkProps("/")}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
              <HeartPulse className="w-6 h-6 text-emerald-200" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-slate-900">
                  NutriFit<span className="text-emerald-600"> 100</span>
                </span>
                <span className="text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-300 px-1.5 py-0.5 rounded">
                  뉴트리핏
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                100대 필수 영양소 · 부위별·생애주기별 맞춤 처방 &amp; 직구 가이드
              </p>
            </div>
          </a>

          {/* Global live search bar */}
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
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 bg-slate-200 hover:bg-slate-300 rounded-full w-4 h-4 flex items-center justify-center"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Action buttons & AI trigger */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={onOpenAiDiagnostic}
              className="flex items-center gap-2 px-3.5 sm:px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-sm font-semibold rounded-lg shadow-sm shadow-emerald-700/20 transition-all hover:shadow-md cursor-pointer group"
            >
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
              <span className="sm:hidden">AI 분석</span>
              <span className="hidden sm:inline">AI 맞춤 영양 분석기</span>
              <span className="hidden lg:inline-block text-[11px] bg-white/20 text-white font-medium px-1.5 py-0.5 rounded">
                노년기·직업별
              </span>
            </button>
          </div>
        </div>

        {/* Category & Section Navigation Tabs */}
        <div className="flex items-center border-t border-slate-100 overflow-x-auto no-scrollbar py-2 gap-1 text-sm font-medium">
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            <a
              {...linkProps("/health")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                activeTab === "health"
                  ? "bg-emerald-700 text-white font-bold shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Newspaper className="w-4 h-4" />
              <span>건강정보</span>
            </a>

            <button
              onClick={() => setActiveTab("catalog")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                activeTab === "catalog"
                  ? "bg-emerald-50 text-emerald-800 font-bold border border-emerald-200"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>100대 영양소 대백과</span>
            </button>

            <button
              onClick={() => setActiveTab("schedule")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                activeTab === "schedule"
                  ? "bg-emerald-800 text-white font-bold shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Clock className="w-4 h-4 text-amber-400" />
              <span>복용 시간표</span>
            </button>

            <button
              onClick={() => setActiveTab("visualizer")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                activeTab === "visualizer"
                  ? "bg-indigo-900 text-white font-bold shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <BarChart3 className="w-4 h-4 text-indigo-400" />
              <span>영양 상태 시각화</span>
            </button>

            <button
              onClick={() => setActiveTab("subscription")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                activeTab === "subscription"
                  ? "bg-teal-800 text-white font-bold shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Package className="w-4 h-4 text-teal-300" />
              <span>영양제 구독 관리</span>
            </button>

            <button
              onClick={() => setActiveTab("diet")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                activeTab === "diet"
                  ? "bg-amber-900 text-white font-bold shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Utensils className="w-4 h-4 text-amber-300" />
              <span>식단 매칭 가이드</span>
            </button>

            <button
              onClick={() => setActiveTab("organs")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                activeTab === "organs"
                  ? "bg-emerald-50 text-emerald-800 font-bold border border-emerald-200"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>약한 부위별 처방</span>
            </button>

            <button
              onClick={() => setActiveTab("demographics")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                activeTab === "demographics"
                  ? "bg-emerald-50 text-emerald-800 font-bold border border-emerald-200"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>노년기·직업별</span>
            </button>

            <button
              onClick={() => setActiveTab("columns")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                activeTab === "columns"
                  ? "bg-emerald-50 text-emerald-800 font-bold border border-emerald-200"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <BookOpen className="w-4 h-4 text-teal-600" />
              <span>글로벌 칼럼</span>
            </button>

            <button
              onClick={() => setActiveTab("deals")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                activeTab === "deals"
                  ? "bg-emerald-50 text-emerald-800 font-bold border border-emerald-200"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Tag className="w-4 h-4 text-amber-600" />
              <span>iHerb 30% 특가관</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

