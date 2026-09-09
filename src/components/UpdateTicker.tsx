import React, { useEffect, useMemo, useState } from "react";
import { allPosts } from "../content/posts";
import { affiliateOffers, PRICE_COLLECTED_AT } from "../data/affiliateLinks";
import { all100Nutrients } from "../data/nutrientsAll";
import { linkProps } from "../lib/router";

/**
 * 상단 갱신 티커.
 *
 * 사이트가 살아 있다는 신호를 준다. 다만 신호가 진짜여야 한다 —
 * 여기 나오는 항목은 전부 실제 데이터에서 뽑는다. 지어낸 소식은 넣지 않는다.
 *
 *   최근 소식 = 발행된 글의 날짜 + 주간 자동화가 갱신하는 가격 수집일
 *   행사 정보 = 쿠팡 골드박스 실시간 응답 + 수집된 배송·단가 사실
 *
 * 움직임 자체가 "갱신 중"을 전하지만, 움직이는 링크는 누르기 어렵다.
 * 마우스를 올리거나 손가락을 대면 멈춘다. 동작 축소를 켠 사용자에게는
 * 아예 흐르지 않고 손으로 미는 가로 목록이 된다.
 */

interface GoldboxItem {
  productName: string;
  productPrice: number;
  productUrl: string;
  categoryName: string;
  isRocket: boolean;
}

/** 골드박스는 전 카테고리가 섞여 온다. 콜라·과자를 영양 사이트에 띄우지 않는다. */
const HEALTH_TERMS =
  /영양제|비타민|오메가|유산균|프로바이오|콜라겐|루테인|마그네슘|아연|홍삼|밀크씨슬|글루코사민|칼슘|철분|엽산|프로메가|단백질\s*보충|프로틴/;

const won = (v: number) => v.toLocaleString("ko-KR");

/** "3일 전"처럼 읽히게. 절대 날짜만 있으면 최신인지 한눈에 안 온다. */
function sinceLabel(dateStr: string): string {
  const then = new Date(`${dateStr}T00:00:00`);
  if (Number.isNaN(then.getTime())) return dateStr;
  const days = Math.floor((Date.now() - then.getTime()) / 86_400_000);
  if (days <= 0) return "오늘";
  if (days === 1) return "어제";
  if (days < 7) return `${days}일 전`;
  if (days < 31) return `${Math.floor(days / 7)}주 전`;
  return dateStr.replace(/^\d{2}(\d{2})-(\d{2})-(\d{2})$/, "$1.$2.$3");
}

interface TickerItem {
  key: string;
  text: string;
  /** 내부 이동 */
  to?: string;
  /** 외부 제휴 링크 */
  href?: string;
  /** 앞에 붙는 강조 라벨 */
  tag?: string;
}

const Row: React.FC<{
  label: string;
  /** 앞에 서는 이모지. 살아 움직여서 "지금도 갱신 중"을 전한다. */
  emoji: string;
  tone: "news" | "deal";
  items: TickerItem[];
}> = ({ label, emoji, tone, items }) => {
  if (!items.length) return null;

  const chip =
    tone === "news"
      ? "bg-emerald-600 text-white"
      : "bg-amber-400 text-amber-950";
  const tagTone = tone === "news" ? "text-emerald-300" : "text-amber-300";

  // 끊김 없이 이어지려면 같은 목록이 두 벌 있어야 한다.
  const track = [...items, ...items];

  return (
    <div className="flex items-center gap-2 min-w-0 h-6">
      <span
        className={`shrink-0 inline-flex items-center gap-1 h-5 px-1.5 rounded text-[10px] font-black tracking-tight ${chip}`}
      >
        <span className="ticker__pulse text-[11px] leading-none" aria-hidden="true">
          {emoji}
        </span>
        {label}
      </span>

      <div className="ticker relative flex-1 min-w-0 overflow-hidden">
        <div className="ticker__track flex items-center gap-6 whitespace-nowrap will-change-transform">
          {track.map((item, i) => {
            const body = (
              <>
                {item.tag ? (
                  <span className={`font-bold mr-1.5 ${tagTone}`}>{item.tag}</span>
                ) : null}
                {item.text}
              </>
            );
            const cls =
              "text-[11px] text-slate-200 hover:text-white transition-colors";
            return item.href ? (
              <a
                key={`${item.key}-${i}`}
                href={item.href}
                target="_blank"
                rel="noopener nofollow sponsored"
                className={cls}
              >
                {body}
              </a>
            ) : item.to ? (
              <a key={`${item.key}-${i}`} {...linkProps(item.to)} className={cls}>
                {body}
              </a>
            ) : (
              <span key={`${item.key}-${i}`} className="text-[11px] text-slate-300">
                {body}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const UpdateTicker: React.FC = () => {
  const [goldbox, setGoldbox] = useState<GoldboxItem[]>([]);

  useEffect(() => {
    let alive = true;
    fetch("/api/deals")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d: { items?: GoldboxItem[] }) => alive && setGoldbox(d.items ?? []))
      .catch(() => {
        /* 티커는 부가 정보다. 실패하면 정적 항목만 흐른다. */
      });
    return () => {
      alive = false;
    };
  }, []);

  const news = useMemo<TickerItem[]>(() => {
    const items: TickerItem[] = allPosts.slice(0, 4).map((post) => ({
      key: post.slug,
      tag: post.updatedAt ? "업데이트" : "새 글",
      text: `${post.title} · ${sinceLabel(post.updatedAt ?? post.publishedAt)}`,
      to: `/health/${post.slug}`,
    }));

    items.push({
      key: "price-sync",
      tag: "가격 갱신",
      text: `쿠팡 ${Object.keys(affiliateOffers).length}종 최저가 재수집 · ${sinceLabel(PRICE_COLLECTED_AT)}`,
      to: "/?tab=deals",
    });

    items.push({
      key: "db",
      tag: "DB",
      text: `100대 필수 영양소 ${all100Nutrients.length}종 · 결핍 증상과 추천 제형 수록`,
      to: "/",
    });

    return items;
  }, []);

  const deals = useMemo<TickerItem[]>(() => {
    const items: TickerItem[] = [];

    for (const g of goldbox.filter(
      (x) => /헬스|건강식품/.test(x.categoryName) || HEALTH_TERMS.test(x.productName),
    ).slice(0, 5)) {
      items.push({
        key: `gb-${g.productName}`,
        tag: g.isRocket ? "골드박스·로켓" : "골드박스",
        text: `${g.productName} ${won(g.productPrice)}원`,
        href: g.productUrl,
      });
    }

    // 골드박스에 건강 카테고리가 없는 날이 많다. 그럴 때도 줄이 비지 않도록
    // 수집된 스냅샷에서 사실만 뽑아 채운다.
    const offers = Object.values(affiliateOffers);
    const rocket = offers.filter((o) => o.coupang?.isRocket).length;
    if (rocket) {
      items.push({
        key: "rocket",
        tag: "로켓배송",
        text: `${rocket}종 내일 도착 가능`,
        to: "/?tab=deals",
      });
    }

    const cheapest = offers
      .filter((o) => o.coupang?.unitPrice)
      .sort((a, b) => a.coupang!.unitPrice!.perUnit - b.coupang!.unitPrice!.perUnit)[0];
    if (cheapest?.coupang) {
      const u = cheapest.coupang.unitPrice!;
      items.push({
        key: "cheapest",
        tag: "최저 단가",
        text: `${cheapest.coupangKeyword} 1${u.unit}당 ${won(u.perUnit)}원`,
        href: cheapest.coupang.url,
      });
    }

    const free = offers.filter((o) => o.coupang?.isFreeShipping).length;
    if (free) {
      items.push({
        key: "free",
        tag: "무료배송",
        text: `${free}종`,
        to: "/?tab=deals",
      });
    }

    items.push({
      key: "iherb",
      tag: "해외 직구",
      text: "아이허브 가격 비교 · 국내가와 나란히",
      to: "/?tab=deals",
    });

    return items;
  }, [goldbox]);

  return (
    <div className="bg-slate-900 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 space-y-0.5">
        <Row label="최근 소식" emoji="🔄" tone="news" items={news} />
        <Row label="행사 정보" emoji="🎁" tone="deal" items={deals} />
      </div>
    </div>
  );
};
