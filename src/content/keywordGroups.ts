import { HealthPost } from "../types";

/**
 * 건강블로그 목록 페이지, 카테고리(6개, 큰 분류) 아래에 두는 "키워드별 모아보기".
 *
 * 카테고리보다 촘촘한 주제 단위다 — "영양소" 카테고리 안에 오메가3·비타민C·비타민D·
 * 종합비타민 글이 전부 섞여 있으면 원하는 성분을 찾으려고 스크롤을 계속 해야 한다.
 *
 * `tags`는 글마다 자유 서술이라 철자가 갈린다("유산균"/"프로바이오틱스",
 * "비타민D"/"비타민D액상"). 그래서 태그 그대로 그룹을 만들지 않고, 그룹마다
 * 매칭 키워드 목록을 두고 태그·제목·keywords 전체에서 부분일치로 찾는다.
 */
export interface KeywordGroup {
  id: string;
  label: string;
  emoji: string;
  /** 이 중 하나라도 tags/title/keywords에 포함되면 그룹에 속한다 */
  match: string[];
}

export const KEYWORD_GROUPS: KeywordGroup[] = [
  { id: "omega3", label: "오메가3", emoji: "🐟", match: ["오메가3", "오메가-3", "DHA", "EPA", "알티지", "rTG"] },
  {
    id: "probiotics",
    label: "유산균·프로바이오틱스",
    emoji: "🦠",
    match: ["유산균", "프로바이오틱스", "프리바이오틱스", "신바이오틱스", "균주", "장 건강", "장내"],
  },
  { id: "vitamin-c", label: "비타민C", emoji: "🍊", match: ["비타민C", "비타민 C"] },
  { id: "vitamin-d", label: "비타민D", emoji: "☀️", match: ["비타민D", "비타민 D"] },
  { id: "multivitamin", label: "종합비타민", emoji: "💊", match: ["종합비타민", "멀티비타민"] },
  {
    id: "minerals",
    label: "아연·마그네슘·미네랄",
    emoji: "⚙️",
    match: ["아연", "마그네슘", "철분", "빈혈", "셀레늄", "미네랄"],
  },
  {
    id: "family",
    label: "임산부·영유아·어린이",
    emoji: "🍼",
    match: ["임산부", "영유아", "영유아영양", "소아", "아기", "유아", "어린이", "청소년"],
  },
  {
    id: "seasonal-immune",
    label: "환절기·계절 면역",
    emoji: "🤧",
    match: ["환절기", "면역", "감기", "비염", "알레르기", "몸살", "기관지"],
  },
  {
    id: "how-to-choose",
    label: "영양제 고르는 법",
    emoji: "🔍",
    match: ["라벨", "구매가이드", "성분표", "상한섭취량", "흡수율", "인증", "제형비교", "보장균수"],
  },
];

function haystack(post: HealthPost): string {
  return [post.title, ...post.tags, ...post.keywords].join(" ");
}

export interface KeywordGroupCount extends KeywordGroup {
  count: number;
}

/** 글이 하나도 없는 그룹은 빼고, 글이 많은 순으로 정렬해 돌려준다. */
export function getKeywordGroups(posts: HealthPost[]): KeywordGroupCount[] {
  return KEYWORD_GROUPS.map((group) => ({
    ...group,
    count: posts.filter((post) => {
      const text = haystack(post);
      return group.match.some((needle) => text.includes(needle));
    }).length,
  }))
    .filter((group) => group.count > 0)
    .sort((a, b) => b.count - a.count);
}

export function postsInGroup(posts: HealthPost[], groupId: string): HealthPost[] {
  const group = KEYWORD_GROUPS.find((g) => g.id === groupId);
  if (!group) return posts;
  return posts.filter((post) => {
    const text = haystack(post);
    return group.match.some((needle) => text.includes(needle));
  });
}
