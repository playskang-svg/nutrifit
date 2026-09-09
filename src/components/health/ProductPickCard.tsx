import React from "react";
import { ExternalLink, Truck, Zap, BadgeCheck, ArrowRight } from "lucide-react";
import { NutrientItem, ProductPick, ProductSource } from "../../types";
import { getOffer, PRICE_COLLECTED_AT } from "../../data/affiliateLinks";
import { ProductVisual } from "./ProductVisual";

interface ProductPickCardProps {
  pick: ProductPick;
  nutrient?: NutrientItem;
  heroEmoji: string;
  onSelectNutrient?: (nutrient: NutrientItem) => void;
}

const won = (value: number) => value.toLocaleString("ko-KR");

/** 쇼핑커넥트·파트너스 링크는 리다이렉트 주소라 호스트만으로 못 가릴 때가 있어 source를 우선한다. */
export function resolveSource(url: string, explicit?: ProductSource): ProductSource {
  if (explicit) return explicit;
  if (/(^|\.)iherb\.com/.test(url) || /lase\.kr/.test(url)) return "iherb";
  if (/naver\.(com|me)/.test(url)) return "naver";
  if (/coupang\.(com|kr)/.test(url)) return "coupang";
  return "etc";
}

/** 대체 카드에 쓸 이모지. 글 이모지를 그대로 쓰면 제품처럼 안 보인다. */
const CATEGORY_EMOJI: [string, string][] = [
  ["비타민", "🍊"],
  ["미네랄", "⚡"],
  ["아미노산", "💪"],
  ["단백질", "💪"],
  ["지방산", "🐟"],
  ["지질", "🐟"],
  ["식물영양소", "🌿"],
  ["항산화", "🌿"],
  ["장 건강", "🦠"],
  ["특수기능성", "🧪"],
];

function productEmoji(category?: string, fallback?: string): string {
  const hit = CATEGORY_EMOJI.find(([key]) => category?.includes(key));
  return hit?.[1] ?? fallback ?? "💊";
}

const SOURCE_CHIP: Record<ProductSource, { label: string; className: string }> = {
  iherb: { label: "iHerb", className: "bg-emerald-50 text-emerald-800 border-emerald-200" },
  naver: { label: "네이버쇼핑", className: "bg-[#f0f9f0] text-[#03c75a] border-[#c9ecd6]" },
  coupang: { label: "쿠팡", className: "bg-red-50 text-red-700 border-red-200" },
  etc: { label: "제휴", className: "bg-slate-100 text-slate-600 border-slate-300" },
};

/**
 * 글 하단 제품 연결 카드.
 * 링크는 전부 src/data/affiliateLinks.ts 의 제휴 딥링크를 쓴다.
 * 영양소 데이터의 deal.iherbUrl 은 제휴 파라미터가 없는 검색 주소라 여기서 쓰지 않는다.
 */
export const ProductPickCard: React.FC<ProductPickCardProps> = ({
  pick,
  nutrient,
  heroEmoji,
  onSelectNutrient,
}) => {
  const offer = pick.nutrientId ? getOffer(pick.nutrientId) : undefined;
  const coupang = offer?.coupang ?? null;

  // 우선순위: 수집된 쿠팡 상품 → 쿠팡 검색 제휴링크 → 글에 직접 적은 주소
  const primaryUrl = coupang?.url ?? offer?.coupangSearchUrl ?? pick.url;
  const title = pick.title ?? coupang?.name ?? nutrient?.name ?? "추천 제품";
  const brand = pick.brand ?? nutrient?.deal.brand ?? "";
  const imageUrl = pick.imageUrl ?? coupang?.imageUrl ?? undefined;
  const badge = pick.badge ?? nutrient?.deal.certification;

  const source = primaryUrl ? resolveSource(primaryUrl, pick.source) : "etc";
  const chip = SOURCE_CHIP[source];
  const ctaLabel =
    source === "coupang"
      ? coupang
        ? "쿠팡에서 보기"
        : "쿠팡에서 검색"
      : source === "naver"
        ? "네이버 최저가 보기"
        : source === "iherb"
          ? "iHerb에서 보기"
          : "가격 확인하기";

  return (
    <article className="group relative bg-white rounded-2xl border border-slate-200 hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-900/5 transition-all overflow-hidden">
      <div className="flex gap-4 p-4">
        <ProductVisual
          imageUrl={imageUrl}
          sourceUrl={imageUrl ? undefined : primaryUrl}
          alt={title}
          emoji={productEmoji(nutrient?.category, nutrient ? "💊" : heroEmoji)}
          brand={brand || chip.label}
          className="w-24 h-24 sm:w-32 sm:h-32 border border-slate-200"
        />

        <div className="min-w-0 flex-1 flex flex-col">
          <div className="flex items-center gap-1.5 mb-1 flex-wrap">
            <span className={`shrink-0 text-[10px] font-bold border rounded px-1.5 py-0.5 ${chip.className}`}>
              {chip.label}
            </span>
            {coupang?.isRocket ? (
              <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-red-600">
                <Zap className="w-3 h-3" />
                로켓
              </span>
            ) : null}
            {coupang?.isFreeShipping ? (
              <span className="inline-flex items-center gap-0.5 text-[10px] text-slate-500">
                <Truck className="w-3 h-3" />
                무료배송
              </span>
            ) : null}
            {badge ? (
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] text-slate-500 border border-slate-200 rounded-full px-1.5 py-0.5 truncate max-w-[45%]">
                <BadgeCheck className="w-3 h-3 text-teal-600 shrink-0" />
                <span className="truncate">{badge}</span>
              </span>
            ) : null}
          </div>

          <h4 className="text-[15px] font-bold text-slate-900 leading-snug line-clamp-2">
            {title}
          </h4>

          <p className="text-xs text-slate-600 leading-relaxed mt-2 line-clamp-3 sm:line-clamp-2">
            {pick.reason}
          </p>

          <div className="mt-auto pt-3 flex flex-wrap items-end justify-between gap-2">
            <div>
              {coupang?.price ? (
                <>
                  <span className="text-lg font-black text-slate-900">
                    {won(coupang.price)}원
                  </span>
                  <p className="text-[10.5px] text-slate-400 mt-0.5">
                    {PRICE_COLLECTED_AT} 수집 기준 · 현재가는 판매처에서 확인
                  </p>
                </>
              ) : (
                <span className="text-[13px] font-semibold text-slate-500">
                  판매처에서 가격 확인
                </span>
              )}
            </div>

            {primaryUrl ? (
              <a
                href={primaryUrl}
                target="_blank"
                rel="noopener nofollow sponsored"
                className={`inline-flex items-center gap-1.5 text-white text-xs font-bold px-3.5 py-2 rounded-lg transition-colors shadow-sm ${
                  source === "coupang"
                    ? "bg-[#c73a3a] hover:bg-[#a92f2f]"
                    : "bg-emerald-700 hover:bg-emerald-800"
                }`}
              >
                {ctaLabel}
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : null}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 px-4 py-2 bg-slate-50 border-t border-slate-100">
        {offer?.iherbUrl ? (
          <a
            href={offer.iherbUrl}
            target="_blank"
            rel="noopener nofollow sponsored"
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 hover:text-emerald-900"
          >
            해외 직구가 비교 (iHerb)
            <ExternalLink className="w-3 h-3" />
          </a>
        ) : (
          <span className="text-[11px] text-slate-400">제휴 링크</span>
        )}

        {nutrient && onSelectNutrient ? (
          <button
            type="button"
            onClick={() => onSelectNutrient(nutrient)}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
          >
            영양소 상세
            <ArrowRight className="w-3 h-3" />
          </button>
        ) : null}
      </div>
    </article>
  );
};
