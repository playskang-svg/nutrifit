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

export interface DiscountDeal {
  brand: string;
  productName: string;
  spec: string;
  originalPrice: number;
  dealPrice: number;
  discountPercent: number;
  couponCode: string;
  iherbUrl: string;
  certification: string; // e.g. "USP 인증", "IFOS 5-Star", "TRAACS 킬레이트"
  rating: number;
  reviewCount: number;
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
  deal: DiscountDeal;
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
  iherbUrl: string;
  couponCode: string;
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
