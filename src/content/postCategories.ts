import { PostCategory, PostCategorySlug } from "../types";

/**
 * 건강정보 카테고리 = 사이트 메뉴 계층의 중형 키워드.
 * 카테고리를 늘리기 전에 그 주제로 글 5편 이상이 나오는지부터 확인한다.
 */
export const postCategories: PostCategory[] = [
  {
    slug: "symptom",
    label: "증상별 케어",
    tagline: "지금 불편한 곳부터",
    description:
      "쥐남·눈피로·잦은 피로처럼 실제로 겪는 증상에서 출발해, 어떤 영양소가 왜 부족한지와 무엇부터 채워야 하는지 정리합니다.",
    accent: "rose",
    emoji: "🩺",
  },
  {
    slug: "nutrient",
    label: "영양소 완전정복",
    tagline: "한 영양소를 끝까지",
    description:
      "비타민D, 마그네슘처럼 영양소 하나를 기준으로 권장량·결핍 신호·제형·상호작용까지 한 편에서 끝냅니다.",
    accent: "emerald",
    emoji: "🧬",
  },
  {
    slug: "choose",
    label: "영양제 고르는 법",
    tagline: "제형과 라벨 읽기",
    description:
      "같은 성분이라도 제형에 따라 흡수율이 갈립니다. 라벨에서 확인할 항목과 피해야 할 표기를 기준으로 비교합니다.",
    accent: "indigo",
    emoji: "🔍",
  },
  {
    slug: "food",
    label: "음식 & 식단",
    tagline: "밥상에서 먼저",
    description:
      "보충제보다 먼저 손댈 수 있는 식단 조정. 어떤 조합이 흡수를 돕고 어떤 조합이 서로를 막는지 다룹니다.",
    accent: "amber",
    emoji: "🥗",
  },
  {
    slug: "lifestage",
    label: "생애주기·직업별",
    tagline: "나이와 일과에 맞춰",
    description:
      "노년기·수험생·교대근무처럼 생활 조건이 다르면 필요한 영양소도 달라집니다. 조건별로 우선순위를 잡아 줍니다.",
    accent: "teal",
    emoji: "👥",
  },
  {
    slug: "research",
    label: "최신 연구 브리핑",
    tagline: "근거는 어디까지인가",
    description:
      "새로 나온 연구와 가이드라인을 과장 없이 요약하고, 아직 근거가 부족한 부분은 부족하다고 밝힙니다.",
    accent: "slate",
    emoji: "📑",
  },
];

const categoryMap = new Map<string, PostCategory>(
  postCategories.map((category) => [category.slug, category])
);

export function getCategory(slug: PostCategorySlug | string): PostCategory | undefined {
  return categoryMap.get(slug);
}

export function getCategoryLabel(slug: PostCategorySlug | string): string {
  return categoryMap.get(slug)?.label ?? "건강정보";
}

/** 카테고리 accent → Tailwind 클래스. 동적 클래스명은 Tailwind가 못 찾으므로 전부 나열한다. */
export const accentClasses: Record<string, { chip: string; bar: string; text: string; ring: string }> = {
  rose: {
    chip: "bg-rose-50 text-rose-800 border-rose-200",
    bar: "bg-rose-600",
    text: "text-rose-700",
    ring: "hover:border-rose-400",
  },
  emerald: {
    chip: "bg-emerald-50 text-emerald-800 border-emerald-200",
    bar: "bg-emerald-600",
    text: "text-emerald-700",
    ring: "hover:border-emerald-400",
  },
  indigo: {
    chip: "bg-indigo-50 text-indigo-800 border-indigo-200",
    bar: "bg-indigo-600",
    text: "text-indigo-700",
    ring: "hover:border-indigo-400",
  },
  amber: {
    chip: "bg-amber-50 text-amber-900 border-amber-200",
    bar: "bg-amber-500",
    text: "text-amber-700",
    ring: "hover:border-amber-400",
  },
  teal: {
    chip: "bg-teal-50 text-teal-800 border-teal-200",
    bar: "bg-teal-600",
    text: "text-teal-700",
    ring: "hover:border-teal-400",
  },
  slate: {
    chip: "bg-slate-100 text-slate-700 border-slate-300",
    bar: "bg-slate-600",
    text: "text-slate-700",
    ring: "hover:border-slate-400",
  },
};

export function getAccent(slug: PostCategorySlug | string) {
  const accent = categoryMap.get(slug)?.accent ?? "emerald";
  return accentClasses[accent] ?? accentClasses.emerald;
}
