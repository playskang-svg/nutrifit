/**
 * 병합·삭제한 글의 옛 주소 → 새 주소(301).
 * 색인된 주소를 죽이지 않기 위해, 글을 합치거나 지울 때마다 여기에 한 줄을 더한다. 줄을 지우지 않는다.
 * 키는 /health/ 뒤의 slug, 값은 사이트 안 경로다.
 */
const GIFT_HUB = "/health/parents-supplement-gift-guide";

export const postRedirects: Record<string, string> = {
  // 2026-10-12 영양제 선물 9편 → 부모님 영양제 선물 가이드 하나로 병합 (애드센스 재심사 정비안)
  "parents-60s-supplement-gift-guide": GIFT_HUB,
  "parents-70s-supplement-gift-guide": GIFT_HUB,
  "grandparents-supplement-gift-guide": GIFT_HUB,
  "in-laws-supplement-gift-guide": GIFT_HUB,
  "milestone-birthday-supplement-gift-guide": GIFT_HUB,
  "chuseok-supplement-gift-set-guide": GIFT_HUB,
  "parents-day-supplement-gift-guide": GIFT_HUB,
  "partner-supplement-gift-guide": GIFT_HUB,
  "pregnant-friend-supplement-gift-guide": GIFT_HUB,
};

/** 카테고리 주소가 없어진 경우(선물 카테고리는 글 1편이라 없앴다). */
export const categoryRedirects: Record<string, string> = {
  gift: GIFT_HUB,
};

/** 요청 경로가 옛 주소면 새 경로를, 아니면 null 을 돌려준다. */
export function resolveRedirect(pathname: string): string | null {
  const segments = pathname.split("/").filter(Boolean);
  if (segments[0] !== "health") return null;
  if (segments.length === 2) return postRedirects[segments[1]] ?? null;
  if (segments.length === 3 && segments[1] === "c") return categoryRedirects[segments[2]] ?? null;
  return null;
}
