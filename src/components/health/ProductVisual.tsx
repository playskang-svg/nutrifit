import React, { useEffect, useState } from "react";

interface ProductVisualProps {
  imageUrl?: string;
  /** imageUrl이 없을 때 이 주소의 대표 이미지(og:image)를 워커가 끌어온다. */
  sourceUrl?: string;
  alt: string;
  emoji: string;
  brand: string;
  className?: string;
}

const FALLBACK_GRADIENTS = [
  "from-emerald-500/90 via-teal-600/90 to-emerald-800",
  "from-amber-400/90 via-orange-500/90 to-amber-700",
  "from-sky-500/90 via-indigo-500/90 to-indigo-800",
  "from-rose-400/90 via-rose-500/90 to-rose-700",
  "from-teal-400/90 via-cyan-600/90 to-teal-800",
];

function gradientFor(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) hash = (hash * 31 + seed.charCodeAt(i)) % 9973;
  return FALLBACK_GRADIENTS[hash % FALLBACK_GRADIENTS.length];
}

/**
 * 제품 이미지 3단 폴백:
 *   1) 데이터에 박아 둔 imageUrl
 *   2) /api/product-og 가 상품 페이지에서 끌어온 og:image (워커가 캐시)
 *   3) 깨진 이미지 대신 브랜드·이모지로 조립한 디자인 카드
 */
export const ProductVisual: React.FC<ProductVisualProps> = ({
  imageUrl,
  sourceUrl,
  alt,
  emoji,
  brand,
  className = "",
}) => {
  const [resolved, setResolved] = useState<string | undefined>(imageUrl);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setResolved(imageUrl);
    setFailed(false);
  }, [imageUrl]);

  useEffect(() => {
    if (imageUrl || !sourceUrl) return;
    let cancelled = false;

    fetch(`/api/product-og?url=${encodeURIComponent(sourceUrl)}`)
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { image?: string } | null) => {
        if (!cancelled && data?.image) setResolved(data.image);
      })
      .catch(() => {
        /* 이미지를 못 가져와도 카드는 그대로 서야 한다 */
      });

    return () => {
      cancelled = true;
    };
  }, [imageUrl, sourceUrl]);

  const showImage = Boolean(resolved) && !failed;

  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-slate-100 shrink-0 ${className}`}
    >
      {showImage ? (
        <img
          src={resolved}
          alt={alt}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
          className="w-full h-full object-contain bg-white p-2 transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div
          className={`w-full h-full bg-gradient-to-br ${gradientFor(brand + alt)} flex flex-col items-center justify-center text-white transition-transform duration-500 group-hover:scale-105`}
        >
          <span
            className="text-3xl sm:text-4xl drop-shadow-sm leading-none"
            aria-hidden="true"
          >
            {emoji}
          </span>
          <span className="mt-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-white/85 px-2 text-center leading-tight line-clamp-2">
            {brand}
          </span>
        </div>
      )}
    </div>
  );
};
