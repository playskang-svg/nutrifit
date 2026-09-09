import React, { useState, useMemo } from "react";
import { NutrientItem } from "../types";
import { CoupangPrice, CoupangBadges, CoupangBuyButton, IherbLink } from "./BuyLinks";
import { listCategories } from "../data/nutrientsAll";
import { 
  Sparkles, 
  Search, 
  Filter, 
  Award, 
  ExternalLink, 
  Tag, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle,
  Eye,
  Activity,
  HeartPulse,
  Brain,
  ShieldAlert
} from "lucide-react";

interface NutrientCatalogProps {
  nutrients: NutrientItem[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onSelectNutrient: (nutrient: NutrientItem) => void;
}

const PRESET_FILTERS = [
  { id: "all", label: "100대 영양소 전체", organ: "전체", demographic: "전체" },
  { id: "elderly", label: "노년기 필수 (근감소·골밀도)", organ: "전체", demographic: "60대+ 노년기" },
  { id: "eye", label: "눈 건강 (황반·모양체피로)", organ: "눈 건강", demographic: "전체" },
  { id: "gut", label: "장 건강 (새는장·유익균)", organ: "장 건강", demographic: "전체" },
  { id: "office", label: "직장인 번아웃 (간·피로)", organ: "간 & 피로", demographic: "전체" },
  { id: "brain", label: "수험생 뇌 집중력", organ: "뇌 & 인지기능", demographic: "수험생/학생" },
  { id: "joint", label: "관절 & 뼈 케어", organ: "관절 & 뼈", demographic: "전체" },
  { id: "immune", label: "환절기·겨울 면역", organ: "면역 & 호흡기", demographic: "전체" }
];

export const NutrientCatalog: React.FC<NutrientCatalogProps> = ({
  nutrients,
  searchQuery,
  setSearchQuery,
  onSelectNutrient,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [activePreset, setActivePreset] = useState("all");

  // 탭은 데이터에서 뽑는다. 하드코딩하면 라벨이 어긋나는 순간 그 탭이 조용히 0건이 된다.
  const categories = useMemo(() => ["전체", ...listCategories(nutrients)], [nutrients]);

  // 프리셋을 함께 적용한 상태의 탭별 건수. 0인 탭을 눌러 빈 화면을 보는 일이 없게 미리 보여준다.
  const categoryCounts = useMemo(() => {
    const preset = PRESET_FILTERS.find((p) => p.id === activePreset);
    const counts: Record<string, number> = {};
    for (const item of nutrients) {
      if (preset) {
        if (preset.organ !== "전체" && !item.targetOrgans.includes(preset.organ as any)) continue;
        if (preset.demographic !== "전체" && !item.targetDemographics.includes(preset.demographic as any)) continue;
      }
      counts["전체"] = (counts["전체"] ?? 0) + 1;
      counts[item.category] = (counts[item.category] ?? 0) + 1;
    }
    return counts;
  }, [nutrients, activePreset]);

  const filteredList = useMemo(() => {
    return nutrients.filter((item) => {
      // Category filter
      if (selectedCategory !== "전체" && item.category !== selectedCategory) {
        return false;
      }

      // Preset filter
      const preset = PRESET_FILTERS.find((p) => p.id === activePreset);
      if (preset) {
        if (preset.organ !== "전체" && !item.targetOrgans.includes(preset.organ as any)) {
          return false;
        }
        if (preset.demographic !== "전체" && !item.targetDemographics.includes(preset.demographic as any)) {
          return false;
        }
      }

      // Search query
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.engName.toLowerCase().includes(q) ||
        item.oneLineSummary.toLowerCase().includes(q) ||
        item.foodSources.some((f) => f.foodName.toLowerCase().includes(q)) ||
        item.deficiencySymptoms.some((s) => s.toLowerCase().includes(q)) ||
        item.bestSupplementForm.recommendedForm.toLowerCase().includes(q)
      );
    });
  }, [nutrients, selectedCategory, activePreset, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Hero Showcase Title */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 rounded-2xl p-5 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="bg-emerald-500 text-slate-950 text-xs font-black px-2.5 py-0.5 rounded tracking-wide uppercase">
              100 Essential Nutrients DB
            </span>
            <span className="bg-white/10 text-emerald-300 text-xs px-2.5 py-0.5 rounded-full font-medium">
              미국 의학자문위(MAB) 검증 데이터
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white mb-3 leading-tight">
            100대 필수 영양소 대백과 &amp; 결핍 맞춤 처방
          </h1>
          <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed line-clamp-3 sm:line-clamp-none">
            나이대별(특히 노년기), 남녀, 계절별, 직업군(직장인·수험생), 취약 부위(눈·장·관절 등)에 필요한 
            100가지 영양소의 자연 식품 급원과 한계점, 흡수율 높은 최적의 영양제 제형, 그리고 국내 최저가 구매처까지 체계적으로 제공합니다.
          </p>

          <div className="mt-6 hidden sm:flex flex-wrap items-center gap-3 text-xs text-emerald-200">
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>100종 전수 조사 완료</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>식품의 한계 vs 영양제 흡수율 과학</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>쿠팡 실시간 가격 · 해외 직구가 비교</span>
            </div>
          </div>
        </div>
      </div>

      {/* Preset Quick Filters */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5" />
            증상 및 생애주기 빠른 필터
          </span>
          <span className="text-xs text-slate-400">
            총 <strong className="text-emerald-700 font-bold">{filteredList.length}</strong>개 영양소 검색됨
          </span>
        </div>

        {/* 모바일은 가로 한 줄로 굴린다. 접히면 네 줄이 되어 콘텐츠를 화면 밖으로 밀어낸다. */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 pb-1 sm:mx-0 sm:px-0 sm:pb-0 sm:flex-wrap">
          {PRESET_FILTERS.map((p) => {
            const isActive = activePreset === p.id;
            return (
              <button
                key={p.id}
                onClick={() => {
                  setActivePreset(p.id);
                  if (p.id !== "all") setSelectedCategory("전체");
                }}
                className={`shrink-0 whitespace-nowrap text-xs px-3 py-2 rounded-lg font-medium transition-all cursor-pointer ${
                  isActive
                    ? "bg-slate-900 text-white font-bold shadow-xs"
                    : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {p.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 border-b border-slate-200 no-scrollbar">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          const count = categoryCounts[cat] ?? 0;
          return (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setActivePreset("all");
              }}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-t-lg transition-colors whitespace-nowrap cursor-pointer ${
                isSelected
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-950 hover:bg-slate-100"
              }`}
            >
              {cat}
              <span className={isSelected ? "ml-1 text-emerald-100" : "ml-1 text-slate-400"}>{count}</span>
            </button>
          );
        })}
      </div>

      {/* Active Search & Filter Indicator */}
      {(searchQuery || selectedCategory !== "전체" || activePreset !== "all") && (
        <div className="flex items-center justify-between bg-emerald-50/80 border border-emerald-200 px-4 py-2.5 rounded-xl text-xs text-emerald-950">
          <div className="flex items-center gap-2">
            <span className="font-bold">적용된 조건:</span>
            {selectedCategory !== "전체" && (
              <span className="bg-emerald-200/80 text-emerald-900 px-2 py-0.5 rounded">
                카테고리: {selectedCategory}
              </span>
            )}
            {activePreset !== "all" && (
              <span className="bg-emerald-200/80 text-emerald-900 px-2 py-0.5 rounded">
                필터: {PRESET_FILTERS.find((p) => p.id === activePreset)?.label}
              </span>
            )}
            {searchQuery && (
              <span className="bg-emerald-200/80 text-emerald-900 px-2 py-0.5 rounded">
                검색어: "{searchQuery}"
              </span>
            )}
          </div>
          <button
            onClick={() => {
              setSelectedCategory("전체");
              setActivePreset("all");
              setSearchQuery("");
            }}
            className="text-xs font-bold text-emerald-800 hover:text-emerald-950 underline cursor-pointer"
          >
            초기화
          </button>
        </div>
      )}

      {/* Grid of Nutrient Cards */}
      {filteredList.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
          <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-700">일치하는 영양소를 찾을 수 없습니다</h3>
          <p className="text-xs text-slate-400 mt-1">검색어를 변경하거나 필터를 초기화해 보세요.</p>
          <button
            onClick={() => {
              setSelectedCategory("전체");
              setActivePreset("all");
              setSearchQuery("");
            }}
            className="mt-4 px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-lg cursor-pointer"
          >
            전체 100종 보기
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredList.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectNutrient(item)}
              className="group bg-white rounded-xl border border-slate-200/90 hover:border-emerald-500 hover:shadow-md transition-all p-5 flex flex-col justify-between cursor-pointer relative"
            >
              <div>
                {/* Header row */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="bg-slate-900 text-white font-mono font-black text-[11px] px-2 py-0.5 rounded">
                      #{item.number}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                  </div>
                  {item.symbolOrAbbr && (
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                      {item.symbolOrAbbr}
                    </span>
                  )}
                </div>

                {/* Name */}
                <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
                  {item.name}
                </h3>
                <p className="text-[11px] text-slate-400 font-mono mb-2 line-clamp-1">
                  {item.engName}
                </p>

                {/* One line summary */}
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 bg-slate-50 p-2.5 rounded-lg mb-3">
                  {item.oneLineSummary}
                </p>

                {/* Food vs Supplement Key Takeaway */}
                <div className="space-y-1.5 text-[11px] mb-3">
                  <div className="flex items-start gap-1.5 text-slate-600">
                    <span className="font-semibold text-slate-700 shrink-0">대표 식품:</span>
                    <span className="line-clamp-2 sm:truncate">{item.foodSources.map(f => f.foodName).join(", ")}</span>
                  </div>

                  <div className="flex items-start gap-1.5 text-emerald-800">
                    <span className="font-semibold text-emerald-950 shrink-0">추천 제형:</span>
                    <span className="line-clamp-2 sm:truncate font-medium">{item.bestSupplementForm.recommendedForm}</span>
                  </div>
                </div>

                {/* Target Organ Badges */}
                <div className="flex flex-wrap gap-1 mb-2">
                  {item.targetOrgans.slice(0, 3).map((organ, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-200/60 px-1.5 py-0.5 rounded"
                    >
                      {organ}
                    </span>
                  ))}
                  {item.targetDemographics.includes("60대+ 노년기") && (
                    <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded">
                      노년기 필수
                    </span>
                  )}
                </div>
              </div>

              {/* Card Footer: 쿠팡 가격 + 바로구매. 카드에서 상세를 안 열어도 구매까지 간다. */}
              <div className="pt-3 border-t border-slate-100 mt-2 space-y-2">
                <div className="flex items-end justify-between gap-2">
                  <div>
                    <CoupangPrice nutrientId={item.id} size="sm" />
                    <CoupangBadges nutrientId={item.id} />
                  </div>
                  <div onClick={(e) => e.stopPropagation()}>
                    <CoupangBuyButton nutrientId={item.id} size="sm" />
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <div onClick={(e) => e.stopPropagation()}>
                    <IherbLink nutrientId={item.id} />
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-slate-500 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition-all">
                    <span>상세보기</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
