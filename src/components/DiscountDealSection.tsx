import React, { useState, useMemo, useEffect } from "react";
import { NutrientItem } from "../types";
import {
  Tag,
  Zap,
  Truck,
  Search,
  Info,
  Calculator,
  Flame,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { affiliateOffers, getOffer, PRICE_COLLECTED_AT } from "../data/affiliateLinks";
import { CoupangBuyButton, IherbLink } from "./BuyLinks";

interface DiscountDealSectionProps {
  allNutrients: NutrientItem[];
  onSelectNutrient: (nutrient: NutrientItem) => void;
}

/** 워커 /api/deals 가 내려주는 쿠팡 골드박스 항목 */
interface GoldboxItem {
  productId: number;
  productName: string;
  productPrice: number;
  productImage: string;
  productUrl: string;
  categoryName: string;
  isRocket: boolean;
  isFreeShipping: boolean;
}

const won = (v: number) => v.toLocaleString("ko-KR");

type SortKey = "unit" | "price" | "rocket";

const SORTS: { key: SortKey; label: string; hint: string }[] = [
  { key: "unit", label: "정당 단가 낮은 순", hint: "총 수량으로 나눈 1정당 가격" },
  { key: "price", label: "판매가 낮은 순", hint: "상품 1건 결제 금액" },
  { key: "rocket", label: "로켓배송 먼저", hint: "내일 도착 가능한 상품" },
];

export const DiscountDealSection: React.FC<DiscountDealSectionProps> = ({
  allNutrients,
  onSelectNutrient,
}) => {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("unit");
  const [goldbox, setGoldbox] = useState<GoldboxItem[] | null>(null);
  const [goldboxError, setGoldboxError] = useState(false);

  // 골드박스는 매일 바뀌므로 빌드에 굽지 않고 워커에서 그때그때 받아온다.
  useEffect(() => {
    let alive = true;
    fetch("/api/deals")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d: { items?: GoldboxItem[] }) => alive && setGoldbox(d.items ?? []))
      .catch(() => alive && setGoldboxError(true));
    return () => {
      alive = false;
    };
  }, []);

  const rows = useMemo(() => {
    const list = allNutrients
      .map((n) => ({ nutrient: n, offer: getOffer(n.id) }))
      .filter((r): r is { nutrient: NutrientItem; offer: NonNullable<ReturnType<typeof getOffer>> } =>
        Boolean(r.offer?.coupang),
      );

    const q = query.trim().toLowerCase();
    const filtered = q
      ? list.filter(
          (r) =>
            r.nutrient.name.toLowerCase().includes(q) ||
            r.nutrient.engName.toLowerCase().includes(q) ||
            (r.offer.coupang?.name ?? "").toLowerCase().includes(q),
        )
      : list;

    const sorted = [...filtered];
    if (sort === "unit") {
      // 단가를 못 구한 상품은 비교 근거가 없으니 뒤로 보낸다
      sorted.sort((a, b) => {
        const av = a.offer.coupang?.unitPrice?.perUnit ?? Number.MAX_SAFE_INTEGER;
        const bv = b.offer.coupang?.unitPrice?.perUnit ?? Number.MAX_SAFE_INTEGER;
        return av - bv;
      });
    } else if (sort === "price") {
      sorted.sort((a, b) => (a.offer.coupang?.price ?? 1e12) - (b.offer.coupang?.price ?? 1e12));
    } else {
      sorted.sort(
        (a, b) =>
          Number(b.offer.coupang?.isRocket) - Number(a.offer.coupang?.isRocket) ||
          (a.offer.coupang?.price ?? 1e12) - (b.offer.coupang?.price ?? 1e12),
      );
    }
    return sorted;
  }, [allNutrients, query, sort]);

  const rocketCount = Object.values(affiliateOffers).filter((o) => o.coupang?.isRocket).length;
  const unitCount = Object.values(affiliateOffers).filter((o) => o.coupang?.unitPrice).length;

  // 골드박스는 전 카테고리가 섞여 온다. "식품" 카테고리만 봐도 콜라·과자가 들어오므로
  // 헬스/건강식품 카테고리이거나, 상품명이 영양성분을 직접 가리킬 때만 남긴다.
  const HEALTH_TERMS =
    /영양제|비타민|오메가|유산균|프로바이오|콜라겐|루테인|마그네슘|아연|홍삼|밀크씨슬|글루코사민|칼슘|철분|엽산|프로메가|단백질\s*보충|프로틴/;
  const healthGoldbox = (goldbox ?? []).filter(
    (g) => /헬스|건강식품/.test(g.categoryName) || HEALTH_TERMS.test(g.productName),
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#7a1f1f] via-slate-900 to-emerald-950 text-white p-6 sm:p-8 rounded-2xl shadow-xl">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Tag className="w-4 h-4" />
            <span>가격 · 배송 혜택 모아보기</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight mb-3 leading-tight">
            100대 영양소, 어디서 사는 게 실제로 이득인가
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            쿠팡 실판매가를 기준으로 <strong className="text-white">1정당 단가</strong>를 계산해 줄 세웠습니다.
            용량이 큰 제품이 총액은 비싸도 단가는 싼 경우가 많아, 총액만 보면 손해를 봅니다.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg">
              <Zap className="w-4 h-4 text-red-300" />
              로켓배송 {rocketCount}종
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg">
              <Calculator className="w-4 h-4 text-emerald-300" />
              단가 계산 {unitCount}종
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg">
              <Info className="w-4 h-4 text-slate-300" />
              가격 수집 {PRICE_COLLECTED_AT}
            </span>
          </div>
        </div>
      </div>

      {/* 쿠팡 골드박스 — 쿠팡이 직접 지정한 오늘의 특가. 우리가 할인율을 만들지 않는다. */}
      <section className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-3.5 border-b border-slate-100 bg-gradient-to-r from-red-50 to-white">
          <Flame className="w-4 h-4 text-[#c73a3a]" />
          <h2 className="text-sm font-black text-slate-900">오늘의 쿠팡 골드박스 · 건강식품</h2>
          <span className="text-[11px] text-slate-400 ml-auto">쿠팡 지정 특가 · 매일 갱신</span>
        </div>

        {goldboxError ? (
          <p className="px-5 py-6 text-xs text-slate-400">
            지금은 쿠팡 특가 목록을 불러오지 못했습니다. 아래 100대 영양소 가격표는 정상입니다.
          </p>
        ) : goldbox === null ? (
          <p className="px-5 py-6 text-xs text-slate-400">쿠팡 특가를 불러오는 중…</p>
        ) : healthGoldbox.length === 0 ? (
          <p className="px-5 py-6 text-xs text-slate-500">
            오늘 골드박스에는 건강식품 특가가 올라오지 않았습니다. 특가는 매일 바뀌니 내일 다시 확인해 보세요.
          </p>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 p-4">
            {healthGoldbox.map((g) => (
              <a
                key={g.productId}
                href={g.productUrl}
                target="_blank"
                rel="noopener nofollow sponsored"
                className="group border border-slate-200 rounded-xl p-3 hover:border-[#c73a3a] hover:shadow-md transition-all"
              >
                <div className="aspect-square bg-slate-50 rounded-lg overflow-hidden mb-2">
                  <img
                    src={g.productImage}
                    alt={g.productName}
                    loading="lazy"
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-[11px] text-slate-700 leading-snug line-clamp-2 min-h-[2.2em]">
                  {g.productName}
                </p>
                <div className="mt-1.5 flex items-center justify-between gap-1">
                  <span className="text-sm font-black text-slate-900">{won(g.productPrice)}원</span>
                  {g.isRocket && <Zap className="w-3.5 h-3.5 text-[#c73a3a]" />}
                </div>
              </a>
            ))}
          </div>
        )}
      </section>

      {/* 검색 + 정렬 */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="영양소·제품명 검색 (예: 마그네슘, 오메가3)"
            className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <div className="flex gap-1.5 overflow-x-auto">
          {SORTS.map((s) => (
            <button
              key={s.key}
              type="button"
              onClick={() => setSort(s.key)}
              title={s.hint}
              className={`shrink-0 px-3 py-2 text-xs font-bold rounded-lg border transition-colors cursor-pointer ${
                sort === s.key
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-white text-slate-600 border-slate-300 hover:border-slate-400"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <p className="text-[11px] text-slate-500 flex items-start gap-1.5">
        <Info className="w-3.5 h-3.5 shrink-0 mt-px" />
        <span>
          정당 단가는 상품명에 적힌 총 수량(예: “180정, 4개” → 720정)으로 판매가를 나눈 값입니다. 함량·원료
          등급이 다르면 단가만으로 우열을 가릴 수 없으니, 제형 설명을 함께 보세요. 가격은{" "}
          {PRICE_COLLECTED_AT} 수집 기준이라 현재가와 다를 수 있습니다.
        </span>
      </p>

      {/* 가격표 */}
      <div className="space-y-2">
        {rows.map(({ nutrient, offer }, idx) => {
          const c = offer.coupang!;
          const cheapest = sort === "unit" && idx < 3 && c.unitPrice;
          return (
            <div
              key={nutrient.id}
              className="bg-white border border-slate-200 rounded-xl p-3 sm:p-4 hover:border-emerald-300 transition-colors"
            >
              <div className="flex gap-3 sm:gap-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 bg-slate-50 rounded-lg overflow-hidden border border-slate-100">
                  {c.imageUrl ? (
                    <img
                      src={c.imageUrl}
                      alt={c.name}
                      loading="lazy"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="w-full h-full grid place-items-center text-2xl">💊</div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 flex-wrap mb-1">
                    <span className="text-[10px] font-bold text-slate-400">
                      No.{nutrient.number}
                    </span>
                    <button
                      type="button"
                      onClick={() => onSelectNutrient(nutrient)}
                      className="text-xs font-black text-emerald-800 hover:text-emerald-950 cursor-pointer inline-flex items-center gap-0.5"
                    >
                      {nutrient.name}
                      <ChevronRight className="w-3 h-3" />
                    </button>
                    {cheapest && (
                      <span className="text-[10px] font-extrabold bg-emerald-600 text-white px-1.5 py-0.5 rounded">
                        단가 최저 TOP{idx + 1}
                      </span>
                    )}
                    {c.isRocket && (
                      <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-[#c73a3a]">
                        <Zap className="w-3 h-3" />
                        로켓
                      </span>
                    )}
                    {c.isFreeShipping && (
                      <span className="inline-flex items-center gap-0.5 text-[10px] text-slate-500">
                        <Truck className="w-3 h-3" />
                        무료배송
                      </span>
                    )}
                  </div>

                  <p className="text-[13px] text-slate-800 leading-snug line-clamp-2">{c.name}</p>

                  <div className="mt-2 flex flex-wrap items-end justify-between gap-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-base sm:text-lg font-black text-slate-900">
                        {c.price ? `${won(c.price)}원` : "가격 확인"}
                      </span>
                      {c.unitPrice && (
                        <span className="text-[11px] font-bold text-emerald-700">
                          {won(c.unitPrice.perUnit)}원/{c.unitPrice.unit}
                          <span className="font-normal text-slate-400">
                            {" "}
                            · 총 {won(c.unitPrice.totalUnits)}
                            {c.unitPrice.unit}
                          </span>
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <IherbLink nutrientId={nutrient.id} />
                      <CoupangBuyButton nutrientId={nutrient.id} size="sm" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {rows.length === 0 && (
          <p className="text-center text-sm text-slate-400 py-10">
            “{query}”에 해당하는 영양소가 없습니다.
          </p>
        )}
      </div>

      <p className="text-[10px] text-slate-400 flex items-center gap-1 justify-center pt-2">
        <ExternalLink className="w-3 h-3" />
        상품 링크는 제휴 링크이며, 구매 시 수수료를 받을 수 있습니다. 구매자 결제 금액은 늘지 않습니다.
      </p>
    </div>
  );
};
