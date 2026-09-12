import { HealthPost, PostCategorySlug } from "../../types";

/* --- 글 등록부 -------------------------------------------------------
 * 새 글 추가: src/content/posts/<slug>.ts 생성 → 아래 두 줄 추가.
 * `npm run post:new -- <slug>` 를 쓰면 파일 생성과 등록이 함께 처리된다.
 * (워커에서도 import 해야 하므로 Vite 전용 import.meta.glob 은 쓰지 않는다)
 * ------------------------------------------------------------------ */
import { post as nightLegCrampsMagnesium } from "./night-leg-cramps-magnesium";
import { post as vitaminDDeficiencyKorea } from "./vitamin-d-deficiency-korea";
import { post as omega3RtgVsEeForm } from "./omega3-rtg-vs-ee-form";
import { post as alwaysTiredIronB12 } from "./always-tired-iron-b12";
import { post as vitaminB12Deficiency } from "./vitamin-b12-deficiency";
import { post as ironDeficiencyAnemiaKorea } from "./iron-deficiency-anemia-korea";
import { post as supplementLabelReading } from "./supplement-label-reading";
import { post as probioticsHowToChoose } from "./probiotics-how-to-choose";
import { post as eyeStrainScreenLutein } from "./eye-strain-screen-lutein";
import { post as mouthUlcerNutrition } from "./mouth-ulcer-nutrition";
import { post as zincIntakeGuide } from "./zinc-intake-guide";
import { post as coffeeNutrientAbsorption } from "./coffee-nutrient-absorption";
import { post as dailyProteinIntake } from "./daily-protein-intake";
import { post as shiftWorkNutrition } from "./shift-work-nutrition";
import { post as multivitaminEvidence } from "./multivitamin-evidence";

/* --- 2026-09-12 환절기 면역력 영양제 황금키워드 배치 (goldkey 검증 97건 → 중복 병합 후 93건) --- */
import { post as adultMultivitaminDosageGuide } from "./adult-multivitamin-dosage-guide";
import { post as allInOneMultivitaminGuide } from "./all-in-one-multivitamin-guide";
import { post as babyMultivitaminGuide } from "./baby-multivitamin-guide";
import { post as babyProbioticsGuide } from "./baby-probiotics-guide";
import { post as bodydoctorsOmega3IngredientGuide } from "./bodydoctors-omega3-ingredient-guide";
import { post as calciumVitaminDCombination } from "./calcium-vitamin-d-combination";
import { post as cellonixOmega3IngredientGuide } from "./cellonix-omega3-ingredient-guide";
import { post as childrenVitaminDRecommendation } from "./children-vitamin-d-recommendation";
import { post as collagenVitaminCSynthesis } from "./collagen-vitamin-c-synthesis";
import { post as doctorinVitaminDExplained } from "./doctorin-vitamin-d-explained";
import { post as doctorslinHypercellOmega3Guide } from "./doctorslin-hypercell-omega3-guide";
import { post as drlinProbioticsGuide } from "./drlin-probiotics-guide";
import { post as elementarySchoolKidsProbioticsGuide } from "./elementary-school-kids-probiotics-guide";
import { post as entericCoatedOmega3Guide } from "./enteric-coated-omega3-guide";
import { post as epaOmega3BenefitsGuide } from "./epa-omega3-benefits-guide";
import { post as greencrossOmega3IngredientGuide } from "./greencross-omega3-ingredient-guide";
import { post as gutMicrobiomeBasics } from "./gut-microbiome-basics";
import { post as gutProbioticsSelectionGuide } from "./gut-probiotics-selection-guide";
import { post as hanmiProbioticsGuide } from "./hanmi-probiotics-guide";
import { post as highCfuProbioticsGuide } from "./high-cfu-probiotics-guide";
import { post as highDoseMultivitaminRisk } from "./high-dose-multivitamin-risk";
import { post as highDoseOmega3Guide } from "./high-dose-omega3-guide";
import { post as highDoseOmega3WhenNeeded } from "./high-dose-omega3-when-needed";
import { post as highDoseVitaminCGuide } from "./high-dose-vitamin-c-guide";
import { post as homemadeYogurtProbioticsGuide } from "./homemade-yogurt-probiotics-guide";
import { post as howToChooseMultivitaminSupplement } from "./how-to-choose-multivitamin-supplement";
import { post as howToEvaluateProbioticsRanking } from "./how-to-evaluate-probiotics-ranking";
import { post as immuneSupplementGuide } from "./immune-supplement-guide";
import { post as infantImmuneNutritionGuide } from "./infant-immune-nutrition-guide";
import { post as infantVitaminDGuide } from "./infant-vitamin-d-guide";
import { post as kidsMultivitaminGuide } from "./kids-multivitamin-guide";
import { post as lacticAcidBacteriaProbioticsDifference } from "./lactic-acid-bacteria-probiotics-difference";
import { post as lacto500ProbioticsGuide } from "./lacto-500-probiotics-guide";
import { post as liposomalVitaminCExplained } from "./liposomal-vitamin-c-explained";
import { post as liquidVitaminDGuide } from "./liquid-vitamin-d-guide";
import { post as megadoseVitaminCTherapyDebate } from "./megadose-vitamin-c-therapy-debate";
import { post as multivitaminChooseByPurpose } from "./multivitamin-choose-by-purpose";
import { post as multivitaminFor20s } from "./multivitamin-for-20s";
import { post as multivitaminFor40s } from "./multivitamin-for-40s";
import { post as multivitaminFor60s } from "./multivitamin-for-60s";
import { post as multivitaminForMiddleSchoolStudents } from "./multivitamin-for-middle-school-students";
import { post as multivitaminIngredientStandards } from "./multivitamin-ingredient-standards";
import { post as multivitaminIngredientVerificationGuide } from "./multivitamin-ingredient-verification-guide";
import { post as multivitaminMultimineralGuide } from "./multivitamin-multimineral-guide";
import { post as multivitaminTabletCapsuleGummyGuide } from "./multivitamin-tablet-capsule-gummy-guide";
import { post as naturalplusOmega3IngredientGuide } from "./naturalplus-omega3-ingredient-guide";
import { post as nowFoodsVitaminDExplained } from "./now-foods-vitamin-d-explained";
import { post as nutricoreVitaminDIuMcgGuide } from "./nutricore-vitamin-d-iu-mcg-guide";
import { post as nutriliteProbioticsGuide } from "./nutrilite-probiotics-guide";
import { post as nutrioneOmega3IngredientGuide } from "./nutrione-omega3-ingredient-guide";
import { post as omega31000MgMeaning } from "./omega3-1000mg-meaning";
import { post as omega3CanadaSourcingQuality } from "./omega3-canada-sourcing-quality";
import { post as omega3CertificationPriceGuide } from "./omega3-certification-price-guide";
import { post as omega3MadeInCanadaLabel } from "./omega3-made-in-canada-label";
import { post as omega3Omega6RatioBalance } from "./omega3-omega6-ratio-balance";
import { post as omega3PregnancyGuide } from "./omega3-pregnancy-guide";
import { post as omega3PurityHeavyMetalTesting } from "./omega3-purity-heavy-metal-testing";
import { post as omega3RtgAbsorptionEvidence } from "./omega3-rtg-absorption-evidence";
import { post as omega3RtgFormExplained } from "./omega3-rtg-form-explained";
import { post as omega3SideEffectsInteractions } from "./omega3-side-effects-interactions";
import { post as omega3SupplementDosageGuide } from "./omega3-supplement-dosage-guide";
import { post as pharmacyMultivitaminGuide } from "./pharmacy-multivitamin-guide";
import { post as pregnancyProbioticsGuide } from "./pregnancy-probiotics-guide";
import { post as pregnantPlantBasedOmega3 } from "./pregnant-plant-based-omega3";
import { post as probioticsCapsuleFormGuide } from "./probiotics-capsule-form-guide";
import { post as probioticsPrebioticsDifference } from "./probiotics-prebiotics-difference";
import { post as probioticsSupplementBasicsGuide } from "./probiotics-supplement-basics-guide";
import { post as probioticsZincCombination } from "./probiotics-zinc-combination";
import { post as proslabProbioticsGuide } from "./proslab-probiotics-guide";
import { post as refrigeratedVsShelfStableProbiotics } from "./refrigerated-vs-shelf-stable-probiotics";
import { post as rtgOmega3PurificationExplained } from "./rtg-omega3-purification-explained";
import { post as supercriticalCo2Omega3Extraction } from "./supercritical-co2-omega3-extraction";
import { post as teenVitaminDGuide } from "./teen-vitamin-d-guide";
import { post as toddlerAge5ProbioticsGuide } from "./toddler-age5-probiotics-guide";
import { post as toddlerProbioticsGuide } from "./toddler-probiotics-guide";
import { post as vitaminBComplexSupplementGuide } from "./vitamin-b-complex-supplement-guide";
import { post as vitaminC2000mgGuide } from "./vitamin-c-2000mg-guide";
import { post as vitaminC5000mgMegadose } from "./vitamin-c-5000mg-megadose";
import { post as vitaminC500mgDailyDose } from "./vitamin-c-500mg-daily-dose";
import { post as vitaminCAndDCombination } from "./vitamin-c-and-d-combination";
import { post as vitaminCForChildren } from "./vitamin-c-for-children";
import { post as vitaminCForToddlers } from "./vitamin-c-for-toddlers";
import { post as vitaminCGummyGuide } from "./vitamin-c-gummy-guide";
import { post as vitaminCInjectionVsOral } from "./vitamin-c-injection-vs-oral";
import { post as vitaminCOtcBrandLabelGuide } from "./vitamin-c-otc-brand-label-guide";
import { post as vitaminCZincTogether } from "./vitamin-c-zinc-together";
import { post as vitaminCdTimingAbsorption } from "./vitamin-cd-timing-absorption";
import { post as vitaminD2000iuDailyDose } from "./vitamin-d-2000iu-daily-dose";
import { post as vitaminDDropsDosingGuide } from "./vitamin-d-drops-dosing-guide";
import { post as vitaminDMegadoseRisks } from "./vitamin-d-megadose-risks";
import { post as yogurtProbioticsLabelGuide } from "./yogurt-probiotics-label-guide";
import { post as yt1ProbioticsStrainGuide } from "./yt1-probiotics-strain-guide";
import { post as zincSeleniumImmuneMinerals } from "./zinc-selenium-immune-minerals";

const registry: HealthPost[] = [
  nightLegCrampsMagnesium,
  vitaminDDeficiencyKorea,
  omega3RtgVsEeForm,
  alwaysTiredIronB12,
  vitaminB12Deficiency,
  ironDeficiencyAnemiaKorea,
  supplementLabelReading,
  probioticsHowToChoose,
  eyeStrainScreenLutein,
  mouthUlcerNutrition,
  zincIntakeGuide,
  coffeeNutrientAbsorption,
  dailyProteinIntake,
  shiftWorkNutrition,
  multivitaminEvidence,
  adultMultivitaminDosageGuide,
  allInOneMultivitaminGuide,
  babyMultivitaminGuide,
  babyProbioticsGuide,
  bodydoctorsOmega3IngredientGuide,
  calciumVitaminDCombination,
  cellonixOmega3IngredientGuide,
  childrenVitaminDRecommendation,
  collagenVitaminCSynthesis,
  doctorinVitaminDExplained,
  doctorslinHypercellOmega3Guide,
  drlinProbioticsGuide,
  elementarySchoolKidsProbioticsGuide,
  entericCoatedOmega3Guide,
  epaOmega3BenefitsGuide,
  greencrossOmega3IngredientGuide,
  gutMicrobiomeBasics,
  gutProbioticsSelectionGuide,
  hanmiProbioticsGuide,
  highCfuProbioticsGuide,
  highDoseMultivitaminRisk,
  highDoseOmega3Guide,
  highDoseOmega3WhenNeeded,
  highDoseVitaminCGuide,
  homemadeYogurtProbioticsGuide,
  howToChooseMultivitaminSupplement,
  howToEvaluateProbioticsRanking,
  immuneSupplementGuide,
  infantImmuneNutritionGuide,
  infantVitaminDGuide,
  kidsMultivitaminGuide,
  lacticAcidBacteriaProbioticsDifference,
  lacto500ProbioticsGuide,
  liposomalVitaminCExplained,
  liquidVitaminDGuide,
  megadoseVitaminCTherapyDebate,
  multivitaminChooseByPurpose,
  multivitaminFor20s,
  multivitaminFor40s,
  multivitaminFor60s,
  multivitaminForMiddleSchoolStudents,
  multivitaminIngredientStandards,
  multivitaminIngredientVerificationGuide,
  multivitaminMultimineralGuide,
  multivitaminTabletCapsuleGummyGuide,
  naturalplusOmega3IngredientGuide,
  nowFoodsVitaminDExplained,
  nutricoreVitaminDIuMcgGuide,
  nutriliteProbioticsGuide,
  nutrioneOmega3IngredientGuide,
  omega31000MgMeaning,
  omega3CanadaSourcingQuality,
  omega3CertificationPriceGuide,
  omega3MadeInCanadaLabel,
  omega3Omega6RatioBalance,
  omega3PregnancyGuide,
  omega3PurityHeavyMetalTesting,
  omega3RtgAbsorptionEvidence,
  omega3RtgFormExplained,
  omega3SideEffectsInteractions,
  omega3SupplementDosageGuide,
  pharmacyMultivitaminGuide,
  pregnancyProbioticsGuide,
  pregnantPlantBasedOmega3,
  probioticsCapsuleFormGuide,
  probioticsPrebioticsDifference,
  probioticsSupplementBasicsGuide,
  probioticsZincCombination,
  proslabProbioticsGuide,
  refrigeratedVsShelfStableProbiotics,
  rtgOmega3PurificationExplained,
  supercriticalCo2Omega3Extraction,
  teenVitaminDGuide,
  toddlerAge5ProbioticsGuide,
  toddlerProbioticsGuide,
  vitaminBComplexSupplementGuide,
  vitaminC2000mgGuide,
  vitaminC5000mgMegadose,
  vitaminC500mgDailyDose,
  vitaminCAndDCombination,
  vitaminCForChildren,
  vitaminCForToddlers,
  vitaminCGummyGuide,
  vitaminCInjectionVsOral,
  vitaminCOtcBrandLabelGuide,
  vitaminCZincTogether,
  vitaminCdTimingAbsorption,
  vitaminD2000iuDailyDose,
  vitaminDDropsDosingGuide,
  vitaminDMegadoseRisks,
  yogurtProbioticsLabelGuide,
  yt1ProbioticsStrainGuide,
  zincSeleniumImmuneMinerals,
];
/* --- 등록부 끝 ---------------------------------------------------- */

const byNewest = (a: HealthPost, b: HealthPost) =>
  (b.updatedAt ?? b.publishedAt).localeCompare(a.updatedAt ?? a.publishedAt);

/** 발행된 글만. 목록·사이트맵·RSS는 전부 이걸 본다. */
export const allPosts: HealthPost[] = registry
  .filter((post) => !post.draft)
  .sort(byNewest);

/** 초안 포함 전체. 중복 슬러그 검사용. */
export const allPostsWithDrafts: HealthPost[] = [...registry].sort(byNewest);

const bySlug = new Map(allPosts.map((post) => [post.slug, post]));

export function getPostBySlug(slug: string): HealthPost | undefined {
  return bySlug.get(slug);
}

export function getPostsByCategory(category: PostCategorySlug | "all"): HealthPost[] {
  if (category === "all") return allPosts;
  return allPosts.filter((post) => post.category === category);
}

export function getFeaturedPosts(limit = 2): HealthPost[] {
  const featured = allPosts.filter((post) => post.featured);
  return (featured.length ? featured : allPosts).slice(0, limit);
}

/** 명시된 관련 글을 먼저 채우고, 모자라면 같은 카테고리·같은 태그 순으로 메운다. */
export function getRelatedPosts(post: HealthPost, limit = 3): HealthPost[] {
  const picked = new Map<string, HealthPost>();

  for (const slug of post.relatedPostSlugs ?? []) {
    const related = bySlug.get(slug);
    if (related && related.slug !== post.slug) picked.set(related.slug, related);
  }

  const candidates = allPosts.filter(
    (candidate) => candidate.slug !== post.slug && !picked.has(candidate.slug)
  );

  for (const candidate of candidates) {
    if (picked.size >= limit) break;
    if (candidate.category === post.category) picked.set(candidate.slug, candidate);
  }

  for (const candidate of candidates) {
    if (picked.size >= limit) break;
    if (candidate.tags.some((tag) => post.tags.includes(tag))) {
      picked.set(candidate.slug, candidate);
    }
  }

  return [...picked.values()].slice(0, limit);
}

export function searchPosts(query: string): HealthPost[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return allPosts;
  return allPosts.filter((post) =>
    [post.title, post.description, post.summary, ...post.tags, ...post.keywords]
      .join(" ")
      .toLowerCase()
      .includes(needle)
  );
}

export function getCategoryCounts(): Record<string, number> {
  return allPosts.reduce<Record<string, number>>((acc, post) => {
    acc[post.category] = (acc[post.category] ?? 0) + 1;
    return acc;
  }, {});
}

export function formatPostDate(date: string): string {
  const [year, month, day] = date.split("-");
  if (!year || !month || !day) return date;
  return `${year}. ${month}. ${day}.`;
}
