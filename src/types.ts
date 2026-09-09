export type NutrientCategory =
  | "비타민"
  | "미네랄"
  | "비타민 (Vitamins)"
  | "미네랄 (Minerals)"
  | "아미노산 & 단백질"
  | "지방산 & 지질"
  | "식물영양소 & 항산화제"
  | "장 건강 & 특수기능성"
  | "뇌 & 인지기능"
  | "관절 & 뼈"
  | "면역 & 호흡기"
  | "활력 & 스테미너"
  | string;

export type AgeGroup =
  | "전체"
  | "청소년/학생"
  | "2030 청년"
  | "4050 중년"
  | "60대+ 노년기"
  | "수험생/학생"
  | "활동량 많은 직업/운동인"
  | string;

export type Gender = "공통" | "남성" | "여성";

export type Season = "사계절" | "봄" | "여름" | "가을" | "겨울" | "환절기";

export type Occupation =
  | "전체"
  | "사무직/직장인"
  | "수험생/학생"
  | "활동량 많은 직업/운동인"
  | "교대근무/야간직"
  | string;

export type TargetOrgan =
  | "눈 건강"
  | "장 건강"
  | "간 & 피로"
  | "관절 & 뼈"
  | "뇌 & 인지기능"
  | "심혈관 & 혈액순환"
  | "심혈관 & 혈압"
  | "피부 & 모발"
  | "면역 & 호흡기"
  | "소화기 & 장"
  | string;

/**
 * 에디터가 고른 "이 영양소는 이런 제형으로 사라"는 기준 제품이다.
 *
 * 가격·할인율·쿠폰코드·평점은 여기 두지 않는다. 실제 판매 데이터는
 * src/data/affiliateLinks.ts 의 쿠팡 파트너스 API 스냅샷에서만 온다.
 * 쿠팡 API는 정가·할인율을 주지 않으므로 화면에서 할인율을 만들어내지 않는다.
 */
export interface ProductRecommendation {
  brand: string;
  productName: string;
  spec: string;
  certification: string; // e.g. "USP 인증", "IFOS 5-Star", "TRAACS 킬레이트"
  imageUrl?: string; // 비우면 /api/product-og 로 상품 페이지 대표 이미지를 끌어온다
}

export interface FoodSourceItem {
  foodName: string;
  contentPer100g?: string;
  contentPer1L?: string;
  portionTip: string;
}

export interface NutrientItem {
  id: string;
  number: number;
  name: string;
  engName: string;
  category: NutrientCategory;
  symbolOrAbbr?: string;
  oneLineSummary: string;
  dailyRDA: string; // 권장 섭취량
  optimalIntake: string; // 기능의학적 최적 섭취량
  deficiencySymptoms: string[]; // 결핍 시 나타나는 주요 증상
  foodSources: FoodSourceItem[];
  foodLimitationReason: string; // 왜 음식만으로는 부족한가? (식품 한계)
  bestSupplementForm: {
    recommendedForm: string; // 추천 제형 (생체이용률 우수)
    inferiorFormWarning: string; // 피해야 하거나 흡수율 낮은 형태
    absorptionTip: string; // 흡수율 극대화 섭취 팁 (식후, 공복 등)
  };
  targetDemographics: AgeGroup[];
  genders: Gender[];
  seasons: Season[];
  occupations: Occupation[];
  targetOrgans: TargetOrgan[];
  deal: ProductRecommendation;
  clinicalNote?: string;
}

export interface HealthColumn {
  id: string;
  title: string;
  source: string;
  sourceOrg: string;
  publishedDate: string;
  author: string;
  readTimeMinutes: number;
  tags: string[];
  targetDemographics: string[];
  summary: string;
  keyTakeaways: string[];
  fullContent: string;
  relatedNutrientIds: string[];
  originalUrl: string;
}

export interface UserProfileInput {
  ageGroup: string;
  gender: "남성" | "여성" | "공통";
  occupation: string;
  season: Season;
  weakOrgans: TargetOrgan[];
  dietHabits: string;
  symptoms: string;
}

export interface AnalysisResult {
  summary: string;
  demographicInsights: string;
  recommendedFoods: { food: string; reason: string }[];
  foodLimitations: string;
  prescribedSupplements: {
    nutrientName: string;
    recommendedForm: string;
    dosageTiming: string;
    whyNeeded: string;
  }[];
  cautionNotes?: string;
  recommendedNutrientIds: string[];
}

export type TimeSlotKey = 
  | "wake_fasting"     // 기상 직후 (공복)
  | "morning_post"     // 아침 식후
  | "lunch_post"       // 점심 식후
  | "dinner_post"      // 저녁 식후
  | "bedtime";         // 취침 전 (30~60분)

export interface TimeSlotConfig {
  key: TimeSlotKey;
  title: string;
  timeRange: string;
  badge: string;
  rationale: string; // 생리학적 이유
  recommendedCategories: string[];
  avoidCategories: string[];
  waterTip: string;
  sampleNutrients: string[];
}

export interface UserRoutineEntry {
  id: string;
  nutrientId: string;
  nutrientName: string;
  timeSlot: TimeSlotKey;
  dosage: string;
  takenToday: boolean;
  notes?: string;
}

export interface SubscriptionItem {
  id: string;
  nutrientId: string;
  brand: string;
  productName: string;
  totalCapsules: number;
  dailyCapsules: number;
  startDate: string;
  renewalCycleDays: number; // 30, 60, 90일
  priceUsd: number;
  priceKrw: number;
  autoShipDiscount: number; // 5% or 10%
  bottleCount: number; // 병 수 (통관 6병 제한 체크)
  isActive: boolean;
}

export interface DietMealProfile {
  id: string;
  title: string;
  category: "한식/일반식" | "기름진 육류" | "카페인/음료" | "다이어트/채식" | "음주/회식" | "초가공/패스트푸드";
  exampleMenu: string;
  description: string;
  synergyNutrients: {
    name: string;
    why: string;
    timing: string;
  }[];
  depletedOrInhibitedNutrients: {
    name: string;
    mechanism: string;
    solution: string;
  }[];
  goldenRule: string;
  supplementWindowTip: string;
}

/* ------------------------------------------------------------------ *
 * 건강정보 포스팅 (/health) — 글 1편 = src/content/posts/ 파일 1개
 * ------------------------------------------------------------------ */

export type PostCategorySlug =
  | "nutrient"    // 영양소 완전정복
  | "symptom"     // 증상별 케어
  | "lifestage"   // 생애주기·직업별
  | "food"        // 음식 & 식단
  | "choose"      // 영양제 고르는 법
  | "research";   // 최신 연구 브리핑

export interface PostCategory {
  slug: PostCategorySlug;
  label: string;
  tagline: string;
  description: string;
  accent: string;      // Tailwind 색 계열 키 (emerald, amber, ...)
  emoji: string;
}

export interface PostAuthor {
  name: string;
  credential: string;
  bio?: string;
}

export interface PostFaq {
  question: string;
  answer: string;
}

/** E-E-A-T 근거 출처. 최소 1건은 넣는 것을 원칙으로 한다. */
export interface PostSource {
  title: string;
  publisher: string;
  url: string;
  year?: string;
}

/**
 * 글 본문 아래에 붙는 제품 카드.
 * imageUrl 을 비워 두면 워커가 url 의 og:image 를 끌어와 채우고,
 * 그마저 실패하면 화면에서는 디자인된 대체 카드로 떨어진다(깨진 이미지 없음).
 */
/** 제휴처. url 호스트로 자동 추론되며, 리다이렉트 링크일 때만 직접 지정한다. */
export type ProductSource = "iherb" | "naver" | "coupang" | "etc";

export interface ProductPick {
  source?: ProductSource;
  /** 채우면 100대 영양소 데이터의 deal에서 제품명·가격·쿠폰·인증을 자동으로 끌어온다. */
  nutrientId?: string;
  /** nutrientId가 없을 때만 필수. 있으면 덮어쓰기 용도. */
  title?: string;
  brand?: string;
  spec?: string;
  url?: string;
  imageUrl?: string;
  reason: string; // 이 글의 맥락에서 왜 이 제품인지 한 줄
  badge?: string; // "IFOS 5-Star", "에디터 선택" 등
}

export interface HealthPost {
  slug: string;              // URL: /health/<slug> — 영문 소문자·하이픈, 발행 후 변경 금지
  title: string;             // 화면 H1
  seoTitle?: string;         // <title>. 생략 시 title 사용 (앞 25자 안에 타깃 키워드)
  description: string;       // meta description. 80~160자
  category: PostCategorySlug;
  tags: string[];            // 화면 노출용
  keywords: string[];        // 검색·메타용 (노출 X)
  publishedAt: string;       // YYYY-MM-DD
  updatedAt?: string;
  author: PostAuthor;
  readingMinutes: number;
  heroEmoji: string;         // 이미지 없이도 카드가 서도록
  summary: string;           // 도입 요약 박스 2~3줄
  keyPoints: string[];       // 핵심 요약 3~5줄
  body: string;              // 본문 마크다운 (src/lib/markdown.ts 문법)
  faq?: PostFaq[];           // FAQPage 스키마로 자동 변환
  sources?: PostSource[];
  relatedNutrientIds?: string[];  // 100대 영양소 id → 본문 하단 카드
  productPicks?: ProductPick[];   // 이미지까지 붙는 제품 연결 카드
  relatedPostSlugs?: string[];
  featured?: boolean;
  draft?: boolean;           // true면 목록·사이트맵·RSS에서 제외
}
