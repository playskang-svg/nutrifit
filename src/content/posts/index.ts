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

/* --- 2026-09-13 환절기 증상·연령대·성별·성분 골든키워드 배치 (93건) --- */
import { post as aliveMultivitaminLabelReading } from "./alive-multivitamin-label-reading";
import { post as allInOneMultivitaminForMen } from "./all-in-one-multivitamin-for-men";
import { post as alopeciaAreataNutritionGuide } from "./alopecia-areata-nutrition-guide";
import { post as arginineWorkoutTimingGuide } from "./arginine-workout-timing-guide";
import { post as atomyLuteinLabelGuide } from "./atomy-lutein-label-guide";
import { post as babyMouthUlcerSprayGuide } from "./baby-mouth-ulcer-spray-guide";
import { post as biotinHairLossSupplementGuide } from "./biotin-hair-loss-supplement-guide";
import { post as bronchitisNutritionGuide } from "./bronchitis-nutrition-guide";
import { post as calciumSupplementFormAbsorptionGuide } from "./calcium-supplement-form-absorption-guide";
import { post as celebrityMenopauseSupplementCheck } from "./celebrity-menopause-supplement-check";
import { post as chocolateProteinFlavorGuide } from "./chocolate-protein-flavor-guide";
import { post as collagen30sUvPreventionGuide } from "./collagen-30s-uv-prevention-guide";
import { post as collagen50sElasticityGuide } from "./collagen-50s-elasticity-guide";
import { post as collagenOriginLabelChecklist } from "./collagen-origin-label-checklist";
import { post as collagenVitaminCComboLabelGuide } from "./collagen-vitamin-c-combo-label-guide";
import { post as coq10UbiquinolVsUbiquinone } from "./coq10-ubiquinol-vs-ubiquinone";
import { post as doctorinLuteinZeaxanthinRatioGuide } from "./doctorin-lutein-zeaxanthin-ratio-guide";
import { post as doctorsbestMsmLabelGuide } from "./doctorsbest-msm-label-guide";
import { post as dryEyeSupplementGuide } from "./dry-eye-supplement-guide";
import { post as drySkinNutrientCauses } from "./dry-skin-nutrient-causes";
import { post as earlyPregnancyNutritionGuide } from "./early-pregnancy-nutrition-guide";
import { post as elenaProbioticsStrainCfuCheck } from "./elena-probiotics-strain-cfu-check";
import { post as essentialNutrients50s } from "./essential-nutrients-50s";
import { post as eyelidTwitchingMagnesiumLink } from "./eyelid-twitching-magnesium-link";
import { post as folicAcidPregnancyTimingDosage } from "./folic-acid-pregnancy-timing-dosage";
import { post as glucosamineMsmCombinationGuide } from "./glucosamine-msm-combination-guide";
import { post as glutathioneBenefitsAndLimits } from "./glutathione-benefits-and-limits";
import { post as gncMilkThistleLabelGuide } from "./gnc-milk-thistle-label-guide";
import { post as gutHealthSupplementBuyingGuide } from "./gut-health-supplement-buying-guide";
import { post as highContentVitaminCLabelGuide } from "./high-content-vitamin-c-label-guide";
import { post as highSchoolMultivitaminGuide } from "./high-school-multivitamin-guide";
import { post as infantIronDeficiencyGuide } from "./infant-iron-deficiency-guide";
import { post as infantMagnesiumSafetyGuide } from "./infant-magnesium-safety-guide";
import { post as jointCollagenTypeGuide } from "./joint-collagen-type-guide";
import { post as kidsIronPickyEaterGuide } from "./kids-iron-picky-eater-guide";
import { post as kidsRhinitisProbioticsGuide } from "./kids-rhinitis-probiotics-guide";
import { post as lactoseFreeProteinPowderGuide } from "./lactose-free-protein-powder-guide";
import { post as liposomalGlutathioneAbsorption } from "./liposomal-glutathione-absorption";
import { post as liquidMagnesiumAbsorptionGuide } from "./liquid-magnesium-absorption-guide";
import { post as magnesiumPricePerDayGuide } from "./magnesium-price-per-day-guide";
import { post as maleMenopauseAndropauseNutrients } from "./male-menopause-andropause-nutrients";
import { post as menopauseCollagenEstrogenGuide } from "./menopause-collagen-estrogen-guide";
import { post as menopauseHormoneSupportNutrients } from "./menopause-hormone-support-nutrients";
import { post as menopauseProbioticsGuide } from "./menopause-probiotics-guide";
import { post as menopauseWomenNutrientsGuide } from "./menopause-women-nutrients-guide";
import { post as milkThistleSilymarinBuyingGuide } from "./milk-thistle-silymarin-buying-guide";
import { post as multivitaminAllInOne40s } from "./multivitamin-all-in-one-40s";
import { post as multivitaminFor30s } from "./multivitamin-for-30s";
import { post as multivitaminMen30s } from "./multivitamin-men-30s";
import { post as multivitaminMen40s } from "./multivitamin-men-40s";
import { post as multivitaminMen50s } from "./multivitamin-men-50s";
import { post as multivitaminWomen30s } from "./multivitamin-women-30s";
import { post as multivitaminWomen40s } from "./multivitamin-women-40s";
import { post as multivitaminWomen50s } from "./multivitamin-women-50s";
import { post as nitricOxideSupplementIngredients } from "./nitric-oxide-supplement-ingredients";
import { post as nkCellImmuneNutrients } from "./nk-cell-immune-nutrients";
import { post as nonHemeIronAbsorptionGuide } from "./non-heme-iron-absorption-guide";
import { post as nowVitaminDIuMcgLabelGuide } from "./now-vitamin-d-iu-mcg-label-guide";
import { post as nutricoreGlutathioneLabelGuide } from "./nutricore-glutathione-label-guide";
import { post as nutricostProteinLabelGuide } from "./nutricost-protein-label-guide";
import { post as omega3For50sVascularCognitive } from "./omega3-for-50s-vascular-cognitive";
import { post as omega3ForMenIn30s } from "./omega3-for-men-in-30s";
import { post as optimsmPatentedIngredientGuide } from "./optimsm-patented-ingredient-guide";
import { post as oralHairLossNutrientsGuide } from "./oral-hair-loss-nutrients-guide";
import { post as pharmacistRecommendedMagnesiumLabelCheck } from "./pharmacist-recommended-magnesium-label-check";
import { post as plantBasedProteinPowderGuide } from "./plant-based-protein-powder-guide";
import { post as pntMagnesiumIngredientGuide } from "./pnt-magnesium-ingredient-guide";
import { post as probioticsFor30sStressGut } from "./probiotics-for-30s-stress-gut";
import { post as proteinFor50sMuscleLossPrevention } from "./protein-for-50s-muscle-loss-prevention";
import { post as proteinPowderContainerSizeStorageGuide } from "./protein-powder-container-size-storage-guide";
import { post as proteinPowderSupplementBasics } from "./protein-powder-supplement-basics";
import { post as proteinPowderTextureMixabilityGuide } from "./protein-powder-texture-mixability-guide";
import { post as rhinitisProbioticsGutImmune } from "./rhinitis-probiotics-gut-immune";
import { post as runnyNoseNutrition } from "./runny-nose-nutrition";
import { post as scalpHairLossNutrientsGuide } from "./scalp-hair-loss-nutrients-guide";
import { post as seasonalAtopicDermatitisFlare } from "./seasonal-atopic-dermatitis-flare";
import { post as seasonalBodyAchesNutrition } from "./seasonal-body-aches-nutrition";
import { post as seasonalDrySkinNutrition } from "./seasonal-dry-skin-nutrition";
import { post as seasonalHerbalTeaGuide } from "./seasonal-herbal-tea-guide";
import { post as seasonalHivesNutrition } from "./seasonal-hives-nutrition";
import { post as seasonalNutritionGuide } from "./seasonal-nutrition-guide";
import { post as seasonalOtitisMediaChildren } from "./seasonal-otitis-media-children";
import { post as seasonalPhlegmCoughNutrition } from "./seasonal-phlegm-cough-nutrition";
import { post as seasonalSoreThroatNutrition } from "./seasonal-sore-throat-nutrition";
import { post as seasonalTonsillitisNutrition } from "./seasonal-tonsillitis-nutrition";
import { post as taurineEnergyDrinkContent } from "./taurine-energy-drink-content";
import { post as toddlerRhinitisNutritionGuide } from "./toddler-rhinitis-nutrition-guide";
import { post as trueenOmega3RtgEpaDhaCheck } from "./trueen-omega3-rtg-epa-dha-check";
import { post as ultraLowMolecularCollagenDaltonGuide } from "./ultra-low-molecular-collagen-dalton-guide";
import { post as wheyProteinHydrolysateAbsorptionGuide } from "./whey-protein-hydrolysate-absorption-guide";
import { post as wheyProteinIsolateWpcWphComparison } from "./whey-protein-isolate-wpc-wph-comparison";
import { post as womensReproductiveHealthNutrients } from "./womens-reproductive-health-nutrients";
import { post as yeongnongMagnesiumIngredientGuide } from "./yeongnong-magnesium-ingredient-guide";

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
  aliveMultivitaminLabelReading,
  allInOneMultivitaminForMen,
  alopeciaAreataNutritionGuide,
  arginineWorkoutTimingGuide,
  atomyLuteinLabelGuide,
  babyMouthUlcerSprayGuide,
  biotinHairLossSupplementGuide,
  bronchitisNutritionGuide,
  calciumSupplementFormAbsorptionGuide,
  celebrityMenopauseSupplementCheck,
  chocolateProteinFlavorGuide,
  collagen30sUvPreventionGuide,
  collagen50sElasticityGuide,
  collagenOriginLabelChecklist,
  collagenVitaminCComboLabelGuide,
  coq10UbiquinolVsUbiquinone,
  doctorinLuteinZeaxanthinRatioGuide,
  doctorsbestMsmLabelGuide,
  dryEyeSupplementGuide,
  drySkinNutrientCauses,
  earlyPregnancyNutritionGuide,
  elenaProbioticsStrainCfuCheck,
  essentialNutrients50s,
  eyelidTwitchingMagnesiumLink,
  folicAcidPregnancyTimingDosage,
  glucosamineMsmCombinationGuide,
  glutathioneBenefitsAndLimits,
  gncMilkThistleLabelGuide,
  gutHealthSupplementBuyingGuide,
  highContentVitaminCLabelGuide,
  highSchoolMultivitaminGuide,
  infantIronDeficiencyGuide,
  infantMagnesiumSafetyGuide,
  jointCollagenTypeGuide,
  kidsIronPickyEaterGuide,
  kidsRhinitisProbioticsGuide,
  lactoseFreeProteinPowderGuide,
  liposomalGlutathioneAbsorption,
  liquidMagnesiumAbsorptionGuide,
  magnesiumPricePerDayGuide,
  maleMenopauseAndropauseNutrients,
  menopauseCollagenEstrogenGuide,
  menopauseHormoneSupportNutrients,
  menopauseProbioticsGuide,
  menopauseWomenNutrientsGuide,
  milkThistleSilymarinBuyingGuide,
  multivitaminAllInOne40s,
  multivitaminFor30s,
  multivitaminMen30s,
  multivitaminMen40s,
  multivitaminMen50s,
  multivitaminWomen30s,
  multivitaminWomen40s,
  multivitaminWomen50s,
  nitricOxideSupplementIngredients,
  nkCellImmuneNutrients,
  nonHemeIronAbsorptionGuide,
  nowVitaminDIuMcgLabelGuide,
  nutricoreGlutathioneLabelGuide,
  nutricostProteinLabelGuide,
  omega3For50sVascularCognitive,
  omega3ForMenIn30s,
  optimsmPatentedIngredientGuide,
  oralHairLossNutrientsGuide,
  pharmacistRecommendedMagnesiumLabelCheck,
  plantBasedProteinPowderGuide,
  pntMagnesiumIngredientGuide,
  probioticsFor30sStressGut,
  proteinFor50sMuscleLossPrevention,
  proteinPowderContainerSizeStorageGuide,
  proteinPowderSupplementBasics,
  proteinPowderTextureMixabilityGuide,
  rhinitisProbioticsGutImmune,
  runnyNoseNutrition,
  scalpHairLossNutrientsGuide,
  seasonalAtopicDermatitisFlare,
  seasonalBodyAchesNutrition,
  seasonalDrySkinNutrition,
  seasonalHerbalTeaGuide,
  seasonalHivesNutrition,
  seasonalNutritionGuide,
  seasonalOtitisMediaChildren,
  seasonalPhlegmCoughNutrition,
  seasonalSoreThroatNutrition,
  seasonalTonsillitisNutrition,
  taurineEnergyDrinkContent,
  toddlerRhinitisNutritionGuide,
  trueenOmega3RtgEpaDhaCheck,
  ultraLowMolecularCollagenDaltonGuide,
  wheyProteinHydrolysateAbsorptionGuide,
  wheyProteinIsolateWpcWphComparison,
  womensReproductiveHealthNutrients,
  yeongnongMagnesiumIngredientGuide,
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
