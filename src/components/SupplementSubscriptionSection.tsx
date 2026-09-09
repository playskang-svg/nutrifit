import React, { useState } from "react";
import { 
  Package, 
  Calendar, 
  AlertTriangle, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  ShieldAlert, 
  Sparkles, 
  ExternalLink, 
  Copy, 
  Check, 
  PauseCircle, 
  PlayCircle,
  RefreshCw,
  Clock,
  DollarSign,
  Tag
} from "lucide-react";
import { NutrientItem, SubscriptionItem } from "../types";
import { CoupangBuyButton, IherbLink } from "./BuyLinks";

interface SupplementSubscriptionSectionProps {
  allNutrients: NutrientItem[];
  onSelectNutrient: (nutrient: NutrientItem) => void;
}

const INITIAL_SUBSCRIPTIONS: SubscriptionItem[] = [
  {
    id: "sub-1",
    nutrientId: "fatty-rtg-omega3",
    brand: "Sports Research",
    productName: "트리플 스트렝스 rTG 오메가-3 1250mg",
    totalCapsules: 180,
    dailyCapsules: 2,
    startDate: "2026-08-15",
    renewalCycleDays: 90,
    priceUsd: 42.50,
    priceKrw: 58500,
    autoShipDiscount: 10,
    bottleCount: 1,
    isActive: true
  },
  {
    id: "sub-2",
    nutrientId: "vit-d3",
    brand: "Thorne Research",
    productName: "비타민 D3 5000IU + K2 MK-7 복합제",
    totalCapsules: 60,
    dailyCapsules: 1,
    startDate: "2026-08-20",
    renewalCycleDays: 60,
    priceUsd: 31.00,
    priceKrw: 42800,
    autoShipDiscount: 5,
    bottleCount: 1,
    isActive: true
  },
  {
    id: "sub-3",
    nutrientId: "mineral-mg",
    brand: "Doctor's Best",
    productName: "고흡수성 킬레이트 마그네슘 (TRAACS 100% 킬레이트)",
    totalCapsules: 240,
    dailyCapsules: 2,
    startDate: "2026-07-28",
    renewalCycleDays: 60,
    priceUsd: 22.80,
    priceKrw: 31400,
    autoShipDiscount: 10,
    bottleCount: 1,
    isActive: true
  },
  {
    id: "sub-4",
    nutrientId: "gut-probiotics-100b",
    brand: "California Gold Nutrition",
    productName: "LactoBif 300억 프로바이오틱스 유산균",
    totalCapsules: 60,
    dailyCapsules: 1,
    startDate: "2026-08-25",
    renewalCycleDays: 60,
    priceUsd: 23.90,
    priceKrw: 33000,
    autoShipDiscount: 10,
    bottleCount: 1,
    isActive: true
  }
];

export const SupplementSubscriptionSection: React.FC<SupplementSubscriptionSectionProps> = ({
  allNutrients,
  onSelectNutrient,
}) => {
  const [subscriptions, setSubscriptions] = useState<SubscriptionItem[]>(() => {
    const saved = localStorage.getItem("nutrimatrix_user_subscriptions");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_SUBSCRIPTIONS;
      }
    }
    return INITIAL_SUBSCRIPTIONS;
  });

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // New item form state
  const [selectedNutrientForAdd, setSelectedNutrientForAdd] = useState(allNutrients[0]?.id || "");
  const [customBrand, setCustomBrand] = useState("Now Foods");
  const [customProduct, setCustomProduct] = useState("");
  const [customCapsules, setCustomCapsules] = useState(120);
  const [customDaily, setCustomDaily] = useState(1);
  const [customCycle, setCustomCycle] = useState(60);
  const [customPriceUsd, setCustomPriceUsd] = useState(25.0);

  const saveSubscriptions = (items: SubscriptionItem[]) => {
    setSubscriptions(items);
    localStorage.setItem("nutrimatrix_user_subscriptions", JSON.stringify(items));
  };

  const handleToggleActive = (id: string) => {
    const updated = subscriptions.map(item => 
      item.id === id ? { ...item, isActive: !item.isActive } : item
    );
    saveSubscriptions(updated);
  };

  const handleDelete = (id: string) => {
    const updated = subscriptions.filter(item => item.id !== id);
    saveSubscriptions(updated);
  };

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Add subscription handler
  const handleAddSubscription = (e: React.FormEvent) => {
    e.preventDefault();
    const nutrient = allNutrients.find(n => n.id === selectedNutrientForAdd);

    const newItem: SubscriptionItem = {
      id: "sub-" + Date.now(),
      nutrientId: selectedNutrientForAdd,
      brand: customBrand,
      productName: customProduct || (nutrient ? nutrient.deal.productName : "정기배송 보충제"),
      totalCapsules: Number(customCapsules),
      dailyCapsules: Number(customDaily),
      startDate: new Date().toISOString().split("T")[0],
      renewalCycleDays: Number(customCycle),
      priceUsd: Number(customPriceUsd),
      priceKrw: Math.round(Number(customPriceUsd) * 1380),
      autoShipDiscount: 10,
      bottleCount: 1,
      isActive: true
    };

    saveSubscriptions([...subscriptions, newItem]);
    setIsAddModalOpen(false);
    setCustomProduct("");
  };

  // Load preset stacks
  const loadPresetStack = (type: "office" | "senior" | "eyes") => {
    let presetItems: SubscriptionItem[] = [];

    if (type === "office") {
      presetItems = [
        ...INITIAL_SUBSCRIPTIONS.slice(0, 3),
        {
          id: "sub-office-b",
          nutrientId: "vit-b-complex",
          brand: "Life Extension",
          productName: "바이오Active 컴플리트 B-콤플렉스",
          totalCapsules: 60,
          dailyCapsules: 1,
          startDate: new Date().toISOString().split("T")[0],
          renewalCycleDays: 60,
          priceUsd: 13.50,
          priceKrw: 18600,
          autoShipDiscount: 5,
          bottleCount: 1,
          isActive: true
        }
      ];
    } else if (type === "senior") {
      presetItems = [
        {
          id: "sub-senior-d",
          nutrientId: "vit-d3",
          brand: "Thorne",
          productName: "D3/K2 리퀴드 드롭 (비타민 D 5000IU/K2 100mcg)",
          totalCapsules: 60,
          dailyCapsules: 1,
          startDate: new Date().toISOString().split("T")[0],
          renewalCycleDays: 60,
          priceUsd: 31.00,
          priceKrw: 42800,
          autoShipDiscount: 10,
          bottleCount: 1,
          isActive: true
        },
        {
          id: "sub-senior-msm",
          nutrientId: "mineral-msm",
          brand: "Doctor's Best",
          productName: "OptiMSM 고순도 식이유황 1500mg",
          totalCapsules: 120,
          dailyCapsules: 2,
          startDate: new Date().toISOString().split("T")[0],
          renewalCycleDays: 60,
          priceUsd: 16.90,
          priceKrw: 23300,
          autoShipDiscount: 5,
          bottleCount: 1,
          isActive: true
        },
        {
          id: "sub-senior-coq10",
          nutrientId: "fatty-coq10",
          brand: "Qunol",
          productName: "메가 코큐텐 유비퀴놀 100mg (미토콘드리아 활력)",
          totalCapsules: 60,
          dailyCapsules: 1,
          startDate: new Date().toISOString().split("T")[0],
          renewalCycleDays: 60,
          priceUsd: 38.00,
          priceKrw: 52400,
          autoShipDiscount: 10,
          bottleCount: 1,
          isActive: true
        }
      ];
    } else {
      presetItems = [
        {
          id: "sub-eye-lut",
          nutrientId: "phyto-lutein-zeaxanthin",
          brand: "Doctor's Best",
          productName: "루테인 + 지아잔틴 (OptiLut 5:1 황금비율)",
          totalCapsules: 60,
          dailyCapsules: 1,
          startDate: new Date().toISOString().split("T")[0],
          renewalCycleDays: 60,
          priceUsd: 19.50,
          priceKrw: 26900,
          autoShipDiscount: 10,
          bottleCount: 1,
          isActive: true
        },
        {
          id: "sub-eye-asta",
          nutrientId: "phyto-astaxanthin",
          brand: "BioAstin",
          productName: "하와이안 천연 아스타잔틴 12mg (망막 근육 피로 완화)",
          totalCapsules: 50,
          dailyCapsules: 1,
          startDate: new Date().toISOString().split("T")[0],
          renewalCycleDays: 50,
          priceUsd: 34.00,
          priceKrw: 46900,
          autoShipDiscount: 10,
          bottleCount: 1,
          isActive: true
        }
      ];
    }

    saveSubscriptions(presetItems);
  };

  // Calculations for Clearance Safe-Guard
  const activeItems = subscriptions.filter(s => s.isActive);
  const totalBottlesPerShipment = activeItems.reduce((acc, curr) => acc + curr.bottleCount, 0);
  const totalUsdPerShipment = activeItems.reduce((acc, curr) => acc + (curr.priceUsd * (1 - curr.autoShipDiscount / 100)), 0);
  const totalKrwPerShipment = Math.round(totalUsdPerShipment * 1380);

  // Clearance Limits: 6 bottles, $150 USD
  const isBottleLimitExceeded = totalBottlesPerShipment > 6;
  const isPriceLimitExceeded = totalUsdPerShipment > 150;

  // Monthly savings approximation
  const totalMonthlyExpenseUsd = totalUsdPerShipment * (30 / 60); // approx normalized to 30 days

  // Calculate D-Day for an item
  const calculateDaysRemaining = (startDateStr: string, totalCaps: number, dailyCaps: number) => {
    const start = new Date(startDateStr);
    const now = new Date();
    const daysElapsed = Math.max(0, Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
    const totalDaysAvailable = Math.floor(totalCaps / (dailyCaps || 1));
    const remainingDays = totalDaysAvailable - daysElapsed;
    return remainingDays;
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-teal-800/40">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold mb-3 border border-teal-500/30">
            <Package className="w-3.5 h-3.5" />
            <span>iHerb 정기배송(Auto-Ship) &amp; 해외직구 스마트 매니저</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2">
            영양제 정기구독 &amp; 통관 안심 가계부
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            영양제 소진 전 D-Day 재주문 알림, iHerb 5~10% 추가 구독 할인, 그리고 
            <strong> 관세청 1회 최대 6병 / $150 면세 한도</strong>를 자동으로 계산해 폐기 수수료 위험을 완벽히 방지합니다.
          </p>
        </div>

        {/* Quick Summary Pill on Top Right */}
        <div className="mt-4 sm:mt-0 sm:absolute sm:right-8 sm:top-1/2 sm:-translate-y-1/2 bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/15 min-w-[210px]">
          <span className="text-xs text-teal-200 block mb-1">한 회차 총 결제액 (구독할인가)</span>
          <div className="text-2xl sm:text-3xl font-black text-white">
            ${totalUsdPerShipment.toFixed(2)}
            <span className="text-xs font-normal text-slate-300 ml-1">
              (약 {totalKrwPerShipment.toLocaleString()}원)
            </span>
          </div>
          <div className="mt-2 text-xs text-emerald-300 flex items-center gap-1 font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* Clearance Safe-Guard Alert & Metric Box */}
      <div className={`rounded-2xl p-6 border transition-all ${
        isBottleLimitExceeded || isPriceLimitExceeded
          ? "bg-rose-50/90 border-rose-300 shadow-md"
          : "bg-emerald-50/60 border-emerald-200 shadow-xs"
      }`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-200/70">
          <div className="flex items-start gap-3">
            {isBottleLimitExceeded || isPriceLimitExceeded ? (
              <ShieldAlert className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
            )}
            <div>
              <h2 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <span>관세청 건강기능식품 해외직구 통관 세이프가드</span>
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                  isBottleLimitExceeded || isPriceLimitExceeded
                    ? "bg-rose-600 text-white"
                    : "bg-emerald-600 text-white"
                }`}>
                  {isBottleLimitExceeded || isPriceLimitExceeded ? "⚠️ 통관 한도 초과 위험!" : "✅ 1회 통관 규정 안전"}
                </span>
              </h2>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                대한민국 관세법상 건강기능식품은 <strong>1회 주문당 최대 6병(용기) 이하</strong>, 
                <strong> 물품가액 $150 이하</strong>여야만 무관세 목록통관이 가능합니다. 초과 시 의사 진단서가 없으면 초과분이 폐기됩니다.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            {/* Bottle Count Gauge */}
            <div className="bg-white px-4 py-2.5 rounded-xl border border-slate-200 text-center min-w-[120px]">
              <span className="text-[11px] font-bold text-slate-500 block">배송당 병 수</span>
              <span className={`text-lg font-black ${
                isBottleLimitExceeded ? "text-rose-600" : "text-slate-900"
              }`}>
                {totalBottlesPerShipment} <span className="text-xs font-normal text-slate-500">/ 6병</span>
              </span>
            </div>

            {/* Total USD Gauge */}
            <div className="bg-white px-4 py-2.5 rounded-xl border border-slate-200 text-center min-w-[120px]">
              <span className="text-[11px] font-bold text-slate-500 block">총 결제 금액</span>
              <span className={`text-lg font-black ${
                isPriceLimitExceeded ? "text-rose-600" : "text-slate-900"
              }`}>
                ${totalUsdPerShipment.toFixed(1)} <span className="text-xs font-normal text-slate-500">/ $150</span>
              </span>
            </div>
          </div>
        </div>

        {/* Warning Details if exceeded */}
        {(isBottleLimitExceeded || isPriceLimitExceeded) && (
          <div className="mt-3 text-xs text-rose-800 flex items-center gap-2 bg-white/80 p-3 rounded-lg border border-rose-200">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>
              {isBottleLimitExceeded && `현재 ${totalBottlesPerShipment}병으로 6병 제한을 초과했습니다. 일부 품목을 다음 주기로 나누거나 일시정지하세요.`}
              {isPriceLimitExceeded && ` 현재 결제액($${totalUsdPerShipment.toFixed(2)})이 $150 면세 기준을 초과하여 관부가세(약 20%)가 부과될 수 있습니다.`}
            </span>
          </div>
        )}
      </div>

      {/* Preset Stack Quick Load & Action Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-slate-700">추천 정기구독 팩:</span>
          <button
            onClick={() => loadPresetStack("office")}
            className="text-xs font-semibold px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            직장인 피로회복 4종
          </button>
          <button
            onClick={() => loadPresetStack("senior")}
            className="text-xs font-semibold px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            노년기 관절·활력 3종
          </button>
          <button
            onClick={() => loadPresetStack("eyes")}
            className="text-xs font-semibold px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            눈 건강 집중 2종
          </button>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>구독 품목 직접 추가</span>
        </button>
      </div>

      {/* Subscriptions List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Package className="w-5 h-5 text-teal-700" />
            <span>나의 정기구독 영양제 목록 ({subscriptions.length}개)</span>
          </h2>
          <span className="text-xs text-slate-500">
            활성 구독: <strong className="text-teal-700">{activeItems.length}개</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {subscriptions.map((item) => {
            const daysRemaining = calculateDaysRemaining(item.startDate, item.totalCapsules, item.dailyCapsules);
            const isUrgent = daysRemaining <= 7;
            const isModerate = daysRemaining > 7 && daysRemaining <= 15;
            const matchedNutrient = allNutrients.find(n => n.id === item.nutrientId);

            return (
              <div 
                key={item.id}
                className={`bg-white rounded-2xl p-5 border transition-all flex flex-col justify-between ${
                  !item.isActive 
                    ? "opacity-60 bg-slate-50/70 border-slate-200" 
                    : isUrgent 
                    ? "border-amber-300 shadow-sm ring-1 ring-amber-400/30" 
                    : "border-slate-200 shadow-xs hover:border-teal-200"
                }`}
              >
                <div>
                  {/* Top Brand & Status Badges */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-teal-50 text-teal-800 border border-teal-200">
                      {item.brand}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {item.isActive ? (
                        <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                          isUrgent
                            ? "bg-rose-100 text-rose-800"
                            : isModerate
                            ? "bg-amber-100 text-amber-800"
                            : "bg-emerald-100 text-emerald-800"
                        }`}>
                          <Clock className="w-3 h-3" />
                          <span>D-{Math.max(0, daysRemaining)}일 남음</span>
                        </span>
                      ) : (
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-200 text-slate-600">
                          구독 일시정지됨
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Product Title */}
                  <h3 className="font-bold text-slate-900 text-base leading-snug mb-2">
                    {item.productName}
                  </h3>

                  {/* Dosage & Cycle Info */}
                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl mb-3">
                    <div>
                      <span className="text-slate-400 block text-[10px]">용량 및 일일 복용:</span>
                      <span className="font-semibold text-slate-800">
                        총 {item.totalCapsules}알 (하루 {item.dailyCapsules}알)
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">정기배송 주기:</span>
                      <span className="font-semibold text-slate-800">
                        {item.renewalCycleDays}일 마다 자동 배송
                      </span>
                    </div>
                  </div>

                  {/* Price & Coupon code */}
                  <div className="flex items-center justify-between text-xs py-1 border-b border-slate-100 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-slate-900 text-base">
                        ${(item.priceUsd * (1 - item.autoShipDiscount / 100)).toFixed(2)}
                      </span>
                      <span className="line-through text-slate-400">
                        ${item.priceUsd.toFixed(2)}
                      </span>
                      <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded">
                        구독 -{item.autoShipDiscount}%
                      </span>
                    </div>

                    {item.nutrientId && <CoupangBuyButton nutrientId={item.nutrientId} size="sm" />}
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleActive(item.id)}
                      className={`text-xs px-2.5 py-1.5 rounded-lg font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                        item.isActive
                          ? "text-slate-600 hover:bg-slate-100"
                          : "text-emerald-700 bg-emerald-50 hover:bg-emerald-100"
                      }`}
                    >
                      {item.isActive ? (
                        <>
                          <PauseCircle className="w-3.5 h-3.5" />
                          <span>일시정지</span>
                        </>
                      ) : (
                        <>
                          <PlayCircle className="w-3.5 h-3.5" />
                          <span>구독 재개</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                      title="구독 삭제"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    {matchedNutrient && (
                      <button
                        onClick={() => onSelectNutrient(matchedNutrient)}
                        className="text-xs font-semibold text-slate-700 hover:text-teal-700 px-2 py-1 cursor-pointer"
                      >
                        임상 가이드
                      </button>
                    )}
                    {item.nutrientId && <IherbLink nutrientId={item.nutrientId} />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Subscription Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-scaleUp">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Plus className="w-5 h-5 text-teal-600" />
                새 정기구독 영양제 등록
              </h3>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddSubscription} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  100대 영양소 성분 연동
                </label>
                <select
                  value={selectedNutrientForAdd}
                  onChange={(e) => setSelectedNutrientForAdd(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500/30"
                >
                  {allNutrients.slice(0, 50).map(n => (
                    <option key={n.id} value={n.id}>
                      #{n.number} {n.name} ({n.engName})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    브랜드명
                  </label>
                  <input
                    type="text"
                    value={customBrand}
                    onChange={(e) => setCustomBrand(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    정가 (USD $)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={customPriceUsd}
                    onChange={(e) => setCustomPriceUsd(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  제품명
                </label>
                <input
                  type="text"
                  value={customProduct}
                  onChange={(e) => setCustomProduct(e.target.value)}
                  placeholder="예: 울트라 오메가-3 500 EPA / 250 DHA"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    총 캡슐(알) 수
                  </label>
                  <input
                    type="number"
                    value={customCapsules}
                    onChange={(e) => setCustomCapsules(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    하루 복용량(알)
                  </label>
                  <input
                    type="number"
                    value={customDaily}
                    onChange={(e) => setCustomDaily(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    배송 주기(일)
                  </label>
                  <select
                    value={customCycle}
                    onChange={(e) => setCustomCycle(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                  >
                    <option value={30}>30일 (1개월)</option>
                    <option value={60}>60일 (2개월)</option>
                    <option value={90}>90일 (3개월)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-lg cursor-pointer shadow-xs"
                >
                  구독 목록에 등록
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
