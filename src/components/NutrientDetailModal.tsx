import React, { useState } from "react";
import { NutrientItem } from "../types";
import { 
  X, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Utensils, 
  Clock, 
  Tag, 
  ExternalLink, 
  Copy, 
  Check, 
  Award,
  ShieldAlert,
  HelpCircle
} from "lucide-react";

interface NutrientDetailModalProps {
  nutrient: NutrientItem | null;
  onClose: () => void;
}

export const NutrientDetailModal: React.FC<NutrientDetailModalProps> = ({
  nutrient,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!nutrient) return null;

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white p-5 sm:p-6 shrink-0 relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-slate-400 hover:text-white bg-white/10 hover:bg-white/20 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="bg-emerald-500 text-slate-950 font-black text-xs px-2 py-0.5 rounded">
              #{nutrient.number}
            </span>
            <span className="bg-white/15 text-white text-xs px-2.5 py-0.5 rounded-full font-medium">
              {nutrient.category}
            </span>
            {nutrient.symbolOrAbbr && (
              <span className="bg-emerald-900/80 border border-emerald-400/30 text-emerald-300 font-mono text-xs px-2 py-0.5 rounded">
                {nutrient.symbolOrAbbr}
              </span>
            )}
          </div>

          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-1">
            {nutrient.name}
          </h2>
          <p className="text-xs sm:text-sm text-emerald-200/90 font-mono">
            {nutrient.engName}
          </p>

          <p className="mt-3 text-sm text-slate-200 bg-white/10 border border-white/10 rounded-lg p-3 font-medium leading-relaxed">
            {nutrient.oneLineSummary}
          </p>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-sm text-slate-700">
          {/* Intake comparison block */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex items-start gap-2.5">
              <div className="p-1.5 bg-slate-200 rounded text-slate-700 mt-0.5">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-500 block uppercase">일반 1일 권장섭취량 (RDA)</span>
                <span className="text-sm font-bold text-slate-900">{nutrient.dailyRDA}</span>
                <p className="text-[11px] text-slate-500 mt-0.5">결핍 질환(괴혈병 등)만을 방지하는 최소 생존 기준치</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 border-t sm:border-t-0 sm:border-l border-slate-200 pt-3 sm:pt-0 sm:pl-3">
              <div className="p-1.5 bg-emerald-100 rounded text-emerald-700 mt-0.5">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-semibold text-emerald-700 block uppercase">최적 기능 섭취량 (Optimal Intake)</span>
                <span className="text-sm font-bold text-emerald-950">{nutrient.optimalIntake}</span>
                <p className="text-[11px] text-slate-500 mt-0.5">임상적 활력, 항노화, 피로 개선을 위한 치료적 권장치</p>
              </div>
            </div>
          </div>

          {/* Deficiency Symptoms */}
          <div>
            <h4 className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              결핍 시 나타나는 대표 증상
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {nutrient.deficiencySymptoms.map((sym, idx) => (
                <div key={idx} className="flex items-start gap-2 p-2.5 bg-amber-50/70 border border-amber-200/80 rounded-lg text-xs text-amber-950">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                  <span>{sym}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Natural Foods vs Limitation */}
          <div className="space-y-3">
            <h4 className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <Utensils className="w-4 h-4 text-emerald-600" />
              자연 식품 급원 &amp; 한계점
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {nutrient.foodSources.map((f, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="font-bold text-slate-900 text-xs block">{f.foodName}</span>
                  <span className="text-[11px] font-semibold text-emerald-700 block mt-0.5">함량: {f.contentPer100g}</span>
                  <p className="text-[11px] text-slate-500 mt-1">{f.portionTip}</p>
                </div>
              ))}
            </div>

            {/* Why food is not enough */}
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-950 leading-relaxed">
              <div className="flex items-center gap-1.5 font-bold text-rose-800 mb-1">
                <ShieldAlert className="w-4 h-4" />
                <span>왜 음식만으로는 부족하여 영양제 보충이 필요한가?</span>
              </div>
              <p className="text-slate-700">{nutrient.foodLimitationReason}</p>
            </div>
          </div>

          {/* Supplement Guide: Best Form vs Inferior */}
          <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-3">
            <h4 className="flex items-center gap-2 text-sm font-bold text-emerald-950">
              <Award className="w-4 h-4 text-emerald-700" />
              어떤 형태의 영양제를 골라야 하는가? (흡수율 가이드)
            </h4>

            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2 bg-white p-3 rounded-lg border border-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold text-emerald-950 block">추천 형태 (고생체이용률)</span>
                  <span className="text-slate-700">{nutrient.bestSupplementForm.recommendedForm}</span>
                </div>
              </div>

              <div className="flex items-start gap-2 bg-white p-3 rounded-lg border border-slate-200">
                <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold text-slate-900 block">피해야 할 저급 형태 / 주의사항</span>
                  <span className="text-slate-600">{nutrient.bestSupplementForm.inferiorFormWarning}</span>
                </div>
              </div>

              <div className="flex items-start gap-2 bg-white p-3 rounded-lg border border-teal-200">
                <Clock className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold text-teal-950 block">섭취 골든타임 &amp; 복용 팁</span>
                  <span className="text-slate-700">{nutrient.bestSupplementForm.absorptionTip}</span>
                </div>
              </div>
            </div>
          </div>

          {/* iHerb Discount Deal Card */}
          {nutrient.deal && (
            <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-300 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="bg-amber-600 text-white text-[11px] font-extrabold px-2 py-0.5 rounded">
                    iHerb 직구 {nutrient.deal.discountPercent}% 특가
                  </span>
                  <span className="text-xs font-bold text-slate-700">{nutrient.deal.brand}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-amber-700 font-semibold">
                  ★ {nutrient.deal.rating} ({nutrient.deal.reviewCount.toLocaleString()} 리뷰)
                </div>
              </div>

              <div>
                <h5 className="font-bold text-slate-900 text-sm">{nutrient.deal.productName}</h5>
                <p className="text-xs text-slate-500">{nutrient.deal.spec} · {nutrient.deal.certification}</p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-amber-200">
                <div>
                  <span className="text-xs text-slate-400 line-through mr-1.5">
                    ₩{nutrient.deal.originalPrice.toLocaleString()}
                  </span>
                  <span className="text-base font-black text-amber-700">
                    ₩{nutrient.deal.dealPrice.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyCode(nutrient.deal!.couponCode)}
                    className="flex items-center gap-1 px-2.5 py-1.5 bg-white border border-amber-300 hover:bg-amber-100 text-xs font-bold text-amber-900 rounded-md transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "복사됨!" : nutrient.deal.couponCode}</span>
                  </button>

                  <a
                    href={nutrient.deal.iherbUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-md shadow-xs transition-colors"
                  >
                    <span>할인가 구매</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Demographic & Organ match tags */}
          <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 text-[11px] font-bold">권장 분류:</span>
            {nutrient.targetDemographics.map((d, i) => (
              <span key={i} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                {d}
              </span>
            ))}
            {nutrient.targetOrgans.map((o, i) => (
              <span key={i} className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-medium">
                {o}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 flex items-center justify-between shrink-0">
          <p className="text-[11px] text-slate-500">
            * 본 정보는 미국 의학도서관(PubMed) 및 식품의약품안전처 기능성 원료 기준에 근거합니다.
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
