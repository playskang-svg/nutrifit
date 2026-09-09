import React from "react";
import { ExternalLink, Star, Ticket, BadgeCheck, ArrowRight } from "lucide-react";
import { NutrientItem, ProductPick, ProductSource } from "../../types";
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
  if (/(^|\.)iherb\.com/.test(url)) return "iherb";
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

const SOURCE_LABELS: Record<ProductSource, { cta: string; chip: string; chipClass: string }> = {
  iherb: { cta: "iHerb 최저가 보기", chip: "iHerb", chipClass: "bg-emerald-50 text-emerald-800 border-emerald-200" },
  naver: { cta: "네이버 최저가 보기", chip: "네이버쇼핑", chipClass: "bg-[#f0f9f0] text-[#03c75a] border-[#c9ecd6]" },
  coupang: { cta: "쿠팡 최저가 보기", chip: "쿠팡", chipClass: "bg-red-50 text-red-700 border-red-200" },
  etc: { cta: "가격 확인하기", chip: "제휴", chipClass: "bg-slate-100 text-slate-600 border-slate-300" },
};

/** 글 하단 제품 연결 카드. 이미지·할인률·쿠폰까지 붙여 클릭까지 이어지게 만든다. */
export const ProductPickCard: React.FC<ProductPickCardProps> = ({
  pick,
  nutrient,
  heroEmoji,
  onSelectNutrient,
}) => {
  const deal = nutrient?.deal;
  const brand = pick.brand ?? deal?.brand ?? "iHerb";
  const title = pick.title ?? deal?.productName ?? nutrient?.name ?? "추천 제품";
  const spec = pick.spec ?? deal?.spec;
  const url = pick.url ?? deal?.iherbUrl ?? "https://www.iherb.com/";
  const badge = pick.badge ?? deal?.certification;
  const source = resolveSource(url, pick.source);
  const label = SOURCE_LABELS[source];

  return (
    <article className="group relative bg-white rounded-2xl border border-slate-200 hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-900/5 transition-all overflow-hidden">
      {deal?.discountPercent ? (
        <span className="absolute top-3 left-3 z-10 bg-rose-600 text-white text-[11px] font-black px-2 py-0.5 rounded-md shadow-sm">
          {deal.discountPercent}% OFF
        </span>
      ) : null}

      <div className="flex gap-4 p-4">
        <ProductVisual
          imageUrl={pick.imageUrl ?? deal?.imageUrl}
          sourceUrl={url}
          alt={`${brand} ${title}`}
          emoji={productEmoji(nutrient?.category, nutrient ? "💊" : heroEmoji)}
          brand={brand}
          className="w-24 h-24 sm:w-32 sm:h-32 border border-slate-200"
        />

        <div className="min-w-0 flex-1 flex flex-col">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-[11px] font-bold text-slate-700 tracking-wide truncate">
              {brand}
            </span>
            <span className={`shrink-0 text-[10px] font-bold border rounded px-1.5 py-0.5 ${label.chipClass}`}>
              {label.chip}
            </span>
            {badge ? (
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] text-slate-500 border border-slate-200 rounded-full px-1.5 py-0.5 truncate max-w-[55%]">
                <BadgeCheck className="w-3 h-3 text-teal-600 shrink-0" />
                <span className="truncate">{badge}</span>
              </span>
            ) : null}
          </div>

          <h4 className="text-[15px] font-bold text-slate-900 leading-snug line-clamp-2">
            {title}
          </h4>
          {spec ? (
            <p className="text-[11px] text-slate-500 mt-0.5 truncate">{spec}</p>
          ) : null}

          <p className="text-xs text-slate-600 leading-relaxed mt-2 line-clamp-2">
            {pick.reason}
          </p>

          <div className="mt-auto pt-3 flex flex-wrap items-end justify-between gap-2">
            <div>
              {deal ? (
                <div className="flex items-baseline gap-1.5">
                  <span className="text-lg font-black text-slate-900">
                    {won(deal.dealPrice)}원
                  </span>
                  <span className="text-[11px] text-slate-400 line-through">
                    {won(deal.originalPrice)}원
                  </span>
                </div>
              ) : (
                <span className="text-sm font-bold text-slate-700">가격 확인</span>
              )}
              {deal ? (
                <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-500">
                  <span className="flex items-center gap-0.5 text-amber-600 font-semibold">
                    <Star className="w-3 h-3 fill-amber-400 stroke-amber-500" />
                    {deal.rating}
                  </span>
                  <span>리뷰 {deal.reviewCount.toLocaleString("ko-KR")}</span>
                </div>
              ) : null}
            </div>

            <a
              href={url}
              target="_blank"
              rel="noopener nofollow sponsored"
              className="inline-flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-3.5 py-2 rounded-lg transition-colors shadow-sm"
            >
              {label.cta}
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 px-4 py-2 bg-slate-50 border-t border-slate-100">
        {deal?.couponCode ? (
          <span className="inline-flex items-center gap-1.5 text-[11px] text-slate-600">
            <Ticket className="w-3.5 h-3.5 text-rose-500" />
            할인코드
            <code className="font-mono font-bold text-slate-900 bg-white border border-slate-200 rounded px-1.5 py-0.5">
              {deal.couponCode}
            </code>
          </span>
        ) : (
          <span className="text-[11px] text-slate-400">제휴 링크 · 구매 시 수수료를 받을 수 있습니다</span>
        )}

        {nutrient && onSelectNutrient ? (
          <button
            type="button"
            onClick={() => onSelectNutrient(nutrient)}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 hover:text-emerald-900 cursor-pointer"
          >
            영양소 상세 보기
            <ArrowRight className="w-3 h-3" />
          </button>
        ) : null}
      </div>
    </article>
  );
};
