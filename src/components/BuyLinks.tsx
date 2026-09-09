import React from "react";
import { ExternalLink, Zap, Truck, ShoppingCart } from "lucide-react";
import { getOffer, PRICE_COLLECTED_AT } from "../data/affiliateLinks";

/**
 * 구매 동선 공용 부품.
 *
 * 사이트 어디서든 같은 모양으로 쿠팡을 1차 CTA, 아이허브를 2차로 붙인다.
 * 링크는 전부 src/data/affiliateLinks.ts 한 곳에서만 오고,
 * 여기 말고 다른 데서 제휴 URL을 만들지 않는다.
 */

const won = (v: number) => v.toLocaleString("ko-KR");

/** 쿠팡 상품가. 수집 시점을 함께 밝혀 "지금 가격"으로 오해되지 않게 한다. */
export const CoupangPrice: React.FC<{ nutrientId: string; size?: "sm" | "md" }> = ({
  nutrientId,
  size = "md",
}) => {
  const price = getOffer(nutrientId)?.coupang?.price;
  if (!price) return null;
  return (
    <div className="leading-tight">
      <span className={size === "sm" ? "text-sm font-black text-slate-900" : "text-lg font-black text-slate-900"}>
        {won(price)}원
      </span>
      <p className="text-[10px] text-slate-400 mt-0.5">{PRICE_COLLECTED_AT} 기준</p>
    </div>
  );
};

/** 로켓배송·무료배송 뱃지. 구매 결정에 실제로 영향을 주는 정보만 노출한다. */
export const CoupangBadges: React.FC<{ nutrientId: string }> = ({ nutrientId }) => {
  const c = getOffer(nutrientId)?.coupang;
  if (!c) return null;
  return (
    <span className="inline-flex items-center gap-1.5">
      {c.isRocket && (
        <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-red-600">
          <Zap className="w-3 h-3" />
          로켓배송
        </span>
      )}
      {c.isFreeShipping && (
        <span className="inline-flex items-center gap-0.5 text-[10px] text-slate-500">
          <Truck className="w-3 h-3" />
          무료배송
        </span>
      )}
    </span>
  );
};

interface BuyButtonProps {
  nutrientId: string;
  /** 카드 안에서는 sm, 상세/특가 화면에서는 md */
  size?: "sm" | "md";
  className?: string;
}

/**
 * 1차 CTA. 수집된 상품이 있으면 상품 페이지로, 없으면 쿠팡 검색 결과로 보낸다.
 * 어느 쪽이든 제휴 파라미터가 붙은 주소라 눌리면 실적이 잡힌다.
 */
export const CoupangBuyButton: React.FC<BuyButtonProps> = ({ nutrientId, size = "md", className = "" }) => {
  const offer = getOffer(nutrientId);
  if (!offer) return null;
  const hasProduct = Boolean(offer.coupang);
  const href = offer.coupang?.url ?? offer.coupangSearchUrl;
  const pad = size === "sm" ? "px-3 py-1.5 text-[11px]" : "px-4 py-2.5 text-sm";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener nofollow sponsored"
      className={`inline-flex items-center justify-center gap-1.5 font-bold text-white bg-[#c73a3a] hover:bg-[#a92f2f] rounded-lg shadow-sm transition-colors ${pad} ${className}`}
    >
      <ShoppingCart className={size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4"} />
      <span>{hasProduct ? "쿠팡에서 바로구매" : "쿠팡에서 검색"}</span>
    </a>
  );
};

/** 2차 CTA. 해외 직구가 비교용이라 링크 톤을 낮게 둔다. */
export const IherbLink: React.FC<{ nutrientId: string; className?: string }> = ({
  nutrientId,
  className = "",
}) => {
  const offer = getOffer(nutrientId);
  if (!offer) return null;
  return (
    <a
      href={offer.iherbUrl}
      target="_blank"
      rel="noopener nofollow sponsored"
      className={`inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 hover:text-emerald-900 ${className}`}
    >
      해외 직구가 비교 (iHerb)
      <ExternalLink className="w-3 h-3" />
    </a>
  );
};

/** 상세·모달용 구매 패널. 상품명·가격·배송뱃지·양쪽 CTA를 한 덩어리로 묶는다. */
export const BuyPanel: React.FC<{ nutrientId: string }> = ({ nutrientId }) => {
  const offer = getOffer(nutrientId);
  if (!offer) return null;
  const c = offer.coupang;

  return (
    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#c73a3a]">
          <ShoppingCart className="w-3.5 h-3.5" />
          쿠팡 최저가로 바로 구매
        </span>
        <CoupangBadges nutrientId={nutrientId} />
      </div>

      {c ? (
        <p className="text-[13px] font-semibold text-slate-800 leading-snug line-clamp-2">{c.name}</p>
      ) : (
        <p className="text-[13px] text-slate-500 leading-snug">
          국내 단독 판매 상품이 없어 쿠팡 검색 결과로 연결됩니다.
        </p>
      )}

      <div className="flex items-end justify-between gap-3 pt-1">
        <CoupangPrice nutrientId={nutrientId} />
        <CoupangBuyButton nutrientId={nutrientId} />
      </div>

      <div className="pt-2 border-t border-slate-200 flex items-center justify-between gap-2">
        <IherbLink nutrientId={nutrientId} />
        <span className="text-[10px] text-slate-400">제휴 링크</span>
      </div>
    </div>
  );
};
