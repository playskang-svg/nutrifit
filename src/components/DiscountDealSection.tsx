import React, { useState } from "react";
import { NutrientItem } from "../types";
import { 
  Tag, 
  ExternalLink, 
  Copy, 
  Check, 
  ShieldCheck, 
  Truck, 
  Award, 
  Star, 
  Clock, 
  Info,
  Search,
  Filter
} from "lucide-react";

interface DiscountDealSectionProps {
  allNutrients: NutrientItem[];
  onSelectNutrient: (nutrient: NutrientItem) => void;
}

export const DiscountDealSection: React.FC<DiscountDealSectionProps> = ({
  allNutrients,
  onSelectNutrient,
}) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>("전체");
  const [dealSearch, setDealSearch] = useState<string>("");

  const nutrientsWithDeals = allNutrients.filter((n) => n.deal);

  const filteredDeals = nutrientsWithDeals.filter((item) => {
    if (filterCategory !== "전체" && item.category !== filterCategory) {
      return false;
    }
    if (!dealSearch.trim()) return true;
    const q = dealSearch.toLowerCase();
    const d = item.deal!;
    return (
      item.name.toLowerCase().includes(q) ||
      d.productName.toLowerCase().includes(q) ||
      d.brand.toLowerCase().includes(q) ||
      d.couponCode.toLowerCase().includes(q)
    );
  });

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-900 via-slate-900 to-emerald-950 text-white p-6 sm:p-8 rounded-2xl shadow-xl">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Tag className="w-4 h-4" />
            <span>iHerb 공식 글로벌 제휴 · 100대 필수 영양소 특가전</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
            검증된 의학급 영양제 25~30% 단독 할인가 직구관
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            일반 마트용 저급 산화물(Oxide) 제형을 배제하고, 흡수율이 입증된 킬레이트·rTG·활성형 특허 원료만을 
            엄선하여 iHerb 전용 30% 할인 코드와 함께 최저가로 연결합니다.
          </p>
        </div>

        {/* Global Deals Perks */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="bg-white/10 p-3 rounded-xl flex items-center gap-2.5">
            <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <span className="font-bold text-white block">$40 이상 구매 시 무료 직배송</span>
              <span className="text-slate-300 text-[11px]">CJ대한통운 / 우체국 4~5일 총알 배송</span>
            </div>
          </div>

          <div className="bg-white/10 p-3 rounded-xl flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <span className="font-bold text-white block">100% 정품 인증 &amp; 신선도 보장</span>
              <span className="text-slate-300 text-[11px]">항온항습 물류센터 직출고</span>
            </div>
          </div>

          <div className="bg-white/10 p-3 rounded-xl flex items-center gap-2.5">
            <Info className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <span className="font-bold text-white block">통관 팁: 1회 최대 6병 / $150</span>
              <span className="text-slate-300 text-[11px]">자가 사용 관부가세 면제 한도 준수</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200">
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
          {["전체", "비타민", "미네랄", "아미노산 & 단백질", "지방산 & 지질", "식물영양소 & 항산화제", "장 건강 & 특수기능성"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer ${
                filterCategory === cat
                  ? "bg-slate-900 text-white font-bold"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={dealSearch}
            onChange={(e) => setDealSearch(e.target.value)}
            placeholder="상품명, 브랜드 검색..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-600"
          />
        </div>
      </div>

      {/* Deals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDeals.map((item) => {
          const d = item.deal!;
          const isCopied = copiedCode === d.couponCode;

          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 hover:border-amber-400 hover:shadow-lg transition-all p-5 flex flex-col justify-between"
            >
              <div>
                {/* Brand & Discount percent */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                    {d.brand}
                  </span>
                  <span className="bg-amber-600 text-white text-xs font-extrabold px-2 py-0.5 rounded">
                    {d.discountPercent}% OFF
                  </span>
                </div>

                {/* Product Name */}
                <h4 
                  onClick={() => onSelectNutrient(item)}
                  className="font-bold text-base text-slate-900 hover:text-emerald-700 transition-colors cursor-pointer mb-1 line-clamp-2"
                >
                  {d.productName}
                </h4>

                <p className="text-xs text-slate-500 mb-2">
                  {d.spec} · <span className="text-emerald-700 font-medium">{d.certification}</span>
                </p>

                {/* Star rating */}
                <div className="flex items-center gap-1 text-xs text-amber-600 mb-3">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-bold">{d.rating}</span>
                  <span className="text-slate-400 text-[11px]">({d.reviewCount.toLocaleString()} 리뷰)</span>
                </div>

                {/* Match to nutrient DB */}
                <div 
                  onClick={() => onSelectNutrient(item)}
                  className="p-2.5 bg-slate-50 hover:bg-emerald-50/50 rounded-xl text-xs text-slate-700 border border-slate-100 mb-3 cursor-pointer transition-colors"
                >
                  <span className="text-[10px] font-mono text-emerald-700 block">#{item.number} {item.name} 처방</span>
                  <p className="text-[11px] text-slate-600 line-clamp-1">{item.oneLineSummary}</p>
                </div>
              </div>

              {/* Bottom: Price & Purchase Links */}
              <div className="pt-3 border-t border-slate-100 space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-slate-400 line-through">
                    ₩{d.originalPrice.toLocaleString()}
                  </span>
                  <span className="text-lg font-black text-amber-700">
                    ₩{d.dealPrice.toLocaleString()}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleCopyCode(d.couponCode)}
                    className="flex items-center justify-center gap-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? "코드 복사완료!" : `코드: ${d.couponCode}`}</span>
                  </button>

                  <a
                    href={d.iherbUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg shadow-xs transition-colors"
                  >
                    <span>할인 바로가기</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
