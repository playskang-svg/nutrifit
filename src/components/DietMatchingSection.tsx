import React, { useState } from "react";
import { 
  Utensils, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Coffee, 
  Flame, 
  Salad, 
  Beer, 
  Clock, 
  ArrowRight,
  Info,
  ChevronRight,
  ShieldCheck,
  Zap
} from "lucide-react";
import { CoupangBuyButton } from "./BuyLinks";
import { DietMealProfile, NutrientItem } from "../types";
import { dietMealProfiles, mealSelectionOptions, MealOption } from "../data/dietMatchingData";

interface DietMatchingSectionProps {
  allNutrients: NutrientItem[];
  onSelectNutrient: (nutrient: NutrientItem) => void;
}

export const DietMatchingSection: React.FC<DietMatchingSectionProps> = ({
  allNutrients,
  onSelectNutrient,
}) => {
  const [selectedProfileId, setSelectedProfileId] = useState<string>(dietMealProfiles[0].id);

  // Today's meal builder states
  const [selectedBreakfast, setSelectedBreakfast] = useState<string>("m-1");
  const [selectedLunch, setSelectedLunch] = useState<string>("m-4");
  const [selectedDinner, setSelectedDinner] = useState<string>("m-8");
  const [selectedSnack, setSelectedSnack] = useState<string>("m-10");

  const currentProfile = dietMealProfiles.find(p => p.id === selectedProfileId) || dietMealProfiles[0];

  // Get selected meal objects
  const breakfastObj = mealSelectionOptions.find(m => m.id === selectedBreakfast);
  const lunchObj = mealSelectionOptions.find(m => m.id === selectedLunch);
  const dinnerObj = mealSelectionOptions.find(m => m.id === selectedDinner);
  const snackObj = mealSelectionOptions.find(m => m.id === selectedSnack);

  // Derived today's meal analysis
  const hasCaffeine = selectedBreakfast === "m-1" || selectedSnack === "m-10";
  const hasFattyDinner = selectedDinner === "m-7" || selectedDinner === "m-8";
  const hasAlcohol = selectedDinner === "m-7";
  const hasProcessed = selectedLunch === "m-5" || selectedDinner === "m-9" || selectedSnack === "m-12";
  const hasCleanSalad = selectedBreakfast === "m-3" || selectedSnack === "m-11";

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-amber-800/40">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold mb-3 border border-amber-500/30">
            <Utensils className="w-3.5 h-3.5" />
            <span>식단과 영양제의 약리적 상호작용(Food-Nutrient Interaction) 가이드</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2">
            식단 매칭 가이드 &amp; 흡수 시너지 분석기
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            "오늘 먹은 밥"과 "내가 먹는 영양제"는 서로 흡수를 돕기도 하고, 완전히 무효화시키기도 합니다. 
            커피로 인한 미네랄 고갈부터 삼겹살 기름의 지용성 비타민 흡수 골든타임까지, 식사별 최적 복용 시점을 확인하세요.
          </p>
        </div>

        {/* Quick Golden Tip Pill on Top Right */}
        <div className="mt-4 sm:mt-0 sm:absolute sm:right-8 sm:top-1/2 sm:-translate-y-1/2 bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/15 max-w-xs">
          <span className="text-xs font-bold text-amber-300 flex items-center gap-1 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            기억해야 할 절대 원칙
          </span>
          <p className="text-xs text-slate-200 leading-relaxed">
            지용성 영양제(D3, K2, 오메가3, 루테인)는 <strong>가장 기름진 식사 직후</strong>에, 
            미네랄(칼슘, 마그네슘, 철분)은 <strong>커피 섭취 전후 2시간</strong>을 비워두세요!
          </p>
        </div>
      </div>

      {/* TOOL 1: Today's Interactive Meal Simulator */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
          <div>
            <h2 className="font-bold text-slate-900 text-base sm:text-lg flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              <span>오늘 나의 식단 선택 &amp; 맞춤 영양제 타이밍 진단기</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              오늘 아침, 점심, 저녁, 간식 메뉴를 고르면 실시간으로 흡수 골든타임과 방해 경고를 계산해드립니다.
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-amber-50 text-amber-900 border border-amber-200 rounded-full">
            실시간 인터랙티브 시뮬레이터
          </span>
        </div>

        {/* Meal Selector Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Breakfast */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <span className="text-xs font-bold text-slate-500 block mb-1.5">🍳 아침 식사</span>
            <select
              value={selectedBreakfast}
              onChange={(e) => setSelectedBreakfast(e.target.value)}
              className="w-full px-2.5 py-2 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-amber-500/20"
            >
              {mealSelectionOptions.filter(m => m.category === "breakfast").map(m => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>
            <p className="text-[11px] text-slate-500 mt-2">
              예상: ~{breakfastObj?.caloriesApprox} kcal
            </p>
          </div>

          {/* Lunch */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <span className="text-xs font-bold text-slate-500 block mb-1.5">🍱 점심 식사</span>
            <select
              value={selectedLunch}
              onChange={(e) => setSelectedLunch(e.target.value)}
              className="w-full px-2.5 py-2 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-amber-500/20"
            >
              {mealSelectionOptions.filter(m => m.category === "lunch").map(m => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>
            <p className="text-[11px] text-slate-500 mt-2">
              예상: ~{lunchObj?.caloriesApprox} kcal
            </p>
          </div>

          {/* Dinner */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <span className="text-xs font-bold text-slate-500 block mb-1.5">🥩 저녁 식사</span>
            <select
              value={selectedDinner}
              onChange={(e) => setSelectedDinner(e.target.value)}
              className="w-full px-2.5 py-2 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-amber-500/20"
            >
              {mealSelectionOptions.filter(m => m.category === "dinner").map(m => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>
            <p className="text-[11px] text-slate-500 mt-2">
              예상: ~{dinnerObj?.caloriesApprox} kcal
            </p>
          </div>

          {/* Snack */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <span className="text-xs font-bold text-slate-500 block mb-1.5">☕ 간식 / 음료</span>
            <select
              value={selectedSnack}
              onChange={(e) => setSelectedSnack(e.target.value)}
              className="w-full px-2.5 py-2 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-amber-500/20"
            >
              {mealSelectionOptions.filter(m => m.category === "snack").map(m => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>
            <p className="text-[11px] text-slate-500 mt-2">
              예상: ~{snackObj?.caloriesApprox} kcal
            </p>
          </div>
        </div>

        {/* Dynamic Analysis Cards Output */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* 1. Golden Timing */}
          <div className="bg-emerald-50/70 rounded-xl p-4 border border-emerald-200 space-y-2">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>오늘의 골든 타이밍 복용 가이드</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              {hasFattyDinner ? (
                <>
                  오늘 저녁(<strong>{dinnerObj?.name}</strong>)에 담즙산 분비가 가장 활발합니다. 
                  <strong className="text-emerald-800"> rTG 오메가-3, 비타민 D3+K2, 루테인</strong>을 저녁 식사 직후에 몰아서 복용하세요!
                </>
              ) : (
                <>
                  점심 식사(<strong>{lunchObj?.name}</strong>) 직후 15분 이내에 지용성 비타민과 코엔자임 Q10을 섭취하는 것이 가장 흡수가 잘됩니다.
                </>
              )}
            </p>
          </div>

          {/* 2. Depletion/Interference Warning */}
          <div className="bg-rose-50/70 rounded-xl p-4 border border-rose-200 space-y-2">
            <div className="flex items-center gap-2 text-rose-900 font-bold text-sm">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>흡수 방해 &amp; 간격 분리 경고</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              {hasCaffeine ? (
                <>
                  오늘 <strong>{hasCaffeine ? "커피/카페인 음료" : ""}</strong>를 섭취하셨습니다. 
                  탄닌과 이뇨 작용으로 <strong className="text-rose-800">마그네슘, 철분, 비타민 B1</strong>이 소실되므로, 
                  커피 전후 2시간 간격을 두고 취침 전에 마그네슘을 보충하세요.
                </>
              ) : (
                <>
                  식사 중 다량의 차가운 물을 마시면 위산이 희석되어 단백질과 미네랄 흡수가 떨어집니다. 식후 30분 뒤 미온수로 영양제를 삼키세요.
                </>
              )}
            </p>
          </div>

          {/* 3. Nutrient Gap */}
          <div className="bg-amber-50/70 rounded-xl p-4 border border-amber-200 space-y-2">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
              <Zap className="w-4 h-4 text-amber-600 shrink-0" />
              <span>오늘 식단 결핍 보완 추천 (Gap)</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              {hasAlcohol ? (
                <>
                  알코올 대사로 간의 글루타치온이 급격히 고갈됩니다. 
                  <strong className="text-amber-900"> NAC 600mg, 실리마린, 비타민 B군</strong>을 취침 전 및 내일 아침 집중 섭취하세요.
                </>
              ) : hasProcessed ? (
                <>
                  인스턴트의 가공 인산염으로 칼슘 손실 위험이 있습니다. 
                  <strong className="text-amber-900"> 킬레이트 칼슘-마그네슘과 항산화제</strong> 보충을 권장합니다.
                </>
              ) : (
                <>
                  비타민 D와 활성형 B군을 보충하여 하루 대사 효율을 극대화하세요.
                </>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* TOOL 2: 6 Classic Diet Types In-Depth Encyclopedia */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <Utensils className="w-5 h-5 text-amber-700" />
            <span>6대 대표 일상 식단별 영양소 시너지 &amp; 약리 백과</span>
          </h2>
          <span className="text-xs text-slate-500">
            식단 유형을 클릭하면 상세 메커니즘을 확인하실 수 있습니다.
          </span>
        </div>

        {/* Profile Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {dietMealProfiles.map((p) => {
            const isSelected = selectedProfileId === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedProfileId(p.id)}
                className={`p-3 rounded-xl text-center border text-xs transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                  isSelected
                    ? "bg-amber-900 text-white border-amber-950 shadow-md font-bold ring-2 ring-amber-500/30"
                    : "bg-white hover:bg-amber-50/50 text-slate-800 border-slate-200 font-medium"
                }`}
              >
                <span className="text-base">
                  {p.category.includes("한식") && "🍚"}
                  {p.category.includes("육류") && "🥩"}
                  {p.category.includes("카페인") && "☕"}
                  {p.category.includes("채식") && "🥗"}
                  {p.category.includes("음주") && "🍺"}
                  {p.category.includes("패스트푸드") && "🍔"}
                </span>
                <span className="truncate w-full">{p.category}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Profile Detailed Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                  {currentProfile.category}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  {currentProfile.title}
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                대표 메뉴: <strong className="text-slate-700">{currentProfile.exampleMenu}</strong>
              </p>
            </div>

            <div className="bg-amber-50 text-amber-900 text-xs px-3 py-2 rounded-xl border border-amber-200 font-medium flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-700 shrink-0" />
              <span>{currentProfile.supplementWindowTip}</span>
            </div>
          </div>

          <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
            {currentProfile.description}
          </p>

          {/* Synergy & Inhibition Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Synergy Nutrients */}
            <div className="bg-emerald-50/50 rounded-xl p-5 border border-emerald-200 space-y-3">
              <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>이 식단과 함께 먹으면 흡수율 폭발 (시너지)</span>
              </div>

              <div className="space-y-3">
                {currentProfile.synergyNutrients.map((item, idx) => (
                  <div key={idx} className="bg-white p-3.5 rounded-lg border border-emerald-100 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-emerald-950">{item.name}</span>
                      <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        {item.timing}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.why}</p>
                    {(() => {
                      // 식단 데이터의 성분명은 자유 표기라 100대 영양소와 이름으로 맞춘다
                      const matched = allNutrients.find(
                        (n) => n.name.includes(item.name) || item.name.includes(n.name.split(" (")[0]),
                      );
                      return matched ? (
                        <div className="pt-1.5 flex items-center justify-between gap-2">
                          <button
                            type="button"
                            onClick={() => onSelectNutrient(matched)}
                            className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-900 cursor-pointer"
                          >
                            영양소 상세
                          </button>
                          <CoupangBuyButton nutrientId={matched.id} size="sm" />
                        </div>
                      ) : null;
                    })()}
                  </div>
                ))}
              </div>
            </div>

            {/* Inhibited / Depleted Nutrients */}
            <div className="bg-rose-50/50 rounded-xl p-5 border border-rose-200 space-y-3">
              <div className="flex items-center gap-2 text-rose-900 font-bold text-sm">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>이 식단으로 인해 고갈되거나 흡수 저해되는 성분</span>
              </div>

              <div className="space-y-3">
                {currentProfile.depletedOrInhibitedNutrients.map((item, idx) => (
                  <div key={idx} className="bg-white p-3.5 rounded-lg border border-rose-100 space-y-1">
                    <span className="font-bold text-sm text-rose-950 block">{item.name}</span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      <strong className="text-slate-700">원인: </strong>
                      {item.mechanism}
                    </p>
                    <p className="text-xs text-rose-800 font-medium bg-rose-50/60 p-1.5 rounded mt-1">
                      💡 해법: {item.solution}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Golden Rule Callout */}
          <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border-l-4 border-amber-600 p-4 rounded-r-xl">
            <span className="text-xs font-bold text-amber-900 block mb-0.5">
              👑 임상 영양학자의 황금 법칙 (Golden Rule):
            </span>
            <p className="text-sm font-semibold text-slate-900">
              "{currentProfile.goldenRule}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
