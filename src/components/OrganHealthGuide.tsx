import React, { useState } from "react";
import { NutrientItem } from "../types";
import { 
  Eye, 
  Activity, 
  Heart, 
  Brain, 
  ShieldCheck, 
  Bone, 
  Sparkles, 
  Utensils, 
  Pill, 
  AlertTriangle, 
  ExternalLink,
  ChevronRight,
  CheckCircle2,
  Clock
} from "lucide-react";
import { CoupangPrice, CoupangBadges, CoupangBuyButton } from "./BuyLinks";

interface OrganHealthGuideProps {
  allNutrients: NutrientItem[];
  onSelectNutrient: (nutrient: NutrientItem) => void;
}

interface OrganGuideData {
  id: string;
  name: string;
  engName: string;
  icon: any;
  accentColor: string;
  summary: string;
  majorSymptoms: string[];
  keyFoodRules: { food: string; reason: string }[];
  foodLimits: string;
  supplementSolutions: { nutrientId: string; role: string; recommendedForm: string }[];
  clinicalTip: string;
}

const ORGAN_GUIDES: OrganGuideData[] = [
  {
    id: "eye",
    name: "눈 건강 (황반변성 & 디지털 눈 피로)",
    engName: "Ocular & Retinal Health",
    icon: Eye,
    accentColor: "from-amber-600 to-yellow-600",
    summary: "스마트폰 블루라이트로 인한 망막 중심 황반 파괴와 모니터 장시간 응시로 굳어버린 모양체 근육 피로를 동시에 케어합니다.",
    majorSymptoms: [
      "스마트폰/모니터 3시간 이상 응시 후 눈 안쪽이 욱신거리고 빠질 듯한 통증",
      "초점 전환이 1~2초 지연되는 모양체 근육 경직",
      "눈에 모래가 들어간 듯 뻑뻑하고 바람 불면 눈물이 나는 안구건조증",
      "야간 운전 시 불빛 번짐 및 사물이 침침하게 흐려 보임"
    ],
    keyFoodRules: [
      { food: "메리골드 꽃차 & 케일 샐러드", reason: "루테인과 지아잔틴의 천연 공급원" },
      { food: "자연산 연어 & 고등어 구이", reason: "망막 광수용체를 구성하는 DHA와 천연 아스타잔틴" },
      { food: "당근 & 달걀 노른자", reason: "야간 시력을 지키는 베타카로틴 및 생체이용률 높은 지아잔틴" }
    ],
    foodLimits: "루테인은 황반 '주변부'만 지킬 뿐 눈의 '피로'를 풀지 못하며, 모양체 근육 피로를 푸는 천연 아스타잔틴 12mg을 얻으려면 연어를 매일 1kg 이상 먹어야 하므로 영양제 병용이 필수입니다.",
    supplementSolutions: [
      {
        nutrientId: "phyto-lutein-zeaxanthin",
        role: "황반 중심(지아잔틴)과 주변(루테인) 색소 밀도 5:1 황금비율 유지",
        recommendedForm: "Lutemax 2020® 자유형 루테인 16mg + 지아잔틴 4mg"
      },
      {
        nutrientId: "phyto-astaxanthin",
        role: "비타민C 6,000배 항산화력으로 눈 조절 근육(모양체) 피로 즉각 개선",
        recommendedForm: "AstaReal® 천연 미세조류 추출 아스타잔틴 12mg"
      },
      {
        nutrientId: "fatty-rtg-omega3",
        role: "눈물샘 마이봄샘의 염증 억제 및 눈물 기름막 형성으로 안구건조 완치",
        recommendedForm: "IFOS 5-Star 초임계 rTG 오메가-3 (EPA 685mg + DHA 310mg)"
      },
      {
        nutrientId: "special-bilberry",
        role: "안구 모세혈관 혈류를 증가시키고 야간 시각 색소 로돕신 재생 촉진",
        recommendedForm: "Mirtoselect® 표준화 안토시아닌 36% 유럽산 야생 빌베리"
      }
    ],
    clinicalTip: "루테인·지아잔틴·아스타잔틴은 모두 지용성이므로 아침 식사 직후 오메가-3와 함께 복용해야 흡수율이 3~4배 증가합니다."
  },
  {
    id: "gut",
    name: "장 건강 (새는 장 증후군 & 과민성 대장)",
    engName: "Gastrointestinal & Microbiome",
    icon: Activity,
    accentColor: "from-emerald-600 to-teal-700",
    summary: "면역세포의 70%가 집중된 장 점막 치밀결합(Tight Junction)을 복구하고, 유익균 총을 재건하여 가스, 복부 팽만, 만성 염증을 뿌리뽑습니다.",
    majorSymptoms: [
      "식사 후 30분 내로 아랫배가 빵빵해지는 복부 팽만감 및 부패 가스",
      "변비와 잦은 설사가 교대로 반복되는 과민성 대장 증후군(IBS)",
      "원인 모를 피부 트러블, 만성 브레인 포그, 만성 피로 (새는 장 의심)",
      "항생제나 소염진통제 복용 후 지속되는 소화기 장애"
    ],
    keyFoodRules: [
      { food: "사골 국물 (Bone Broth)", reason: "장벽 결합조직을 채우는 천연 글루타민과 콜라겐" },
      { food: "그릭 요거트 & 케피어", reason: "장내 젖산 환경을 산성으로 유지하는 생유산균" },
      { food: "양배추 & 브로콜리 새싹", reason: "위 점막 수선 비타민U와 간 해독 설포라판" }
    ],
    foodLimits: "발효식품 속 유산균은 강한 위산(pH 2)에 90% 이상 사멸하며, 새는 장을 봉합하는 L-글루타민 5,000mg을 음식으로 섭취하려면 고기 1.5kg을 소화시켜야 해 장에 오히려 부담을 줍니다.",
    supplementSolutions: [
      {
        nutrientId: "amino-glutamine",
        role: "장 상피세포의 1차 직통 에너지원으로 융모 상처를 초고속 수선",
        recommendedForm: "100% 식물 발효 AjiPure® 순수 L-글루타민 파우더 5,000mg"
      },
      {
        nutrientId: "gut-probiotics-100b",
        role: "위산에 녹지 않는 장용 캡슐로 대장까지 300억 CFU 생균 안전 배달",
        recommendedForm: "Danisco FloraFIT® LGG / BB-12 임상 균주 300억 보장균수"
      },
      {
        nutrientId: "supp-zinc-carnosine",
        role: "위산에 해리되지 않고 위장관 궤양 및 미란 부위에 자석처럼 밀착 치유",
        recommendedForm: "일본 하마리사 특허 PepZin GI® 75mg"
      },
      {
        nutrientId: "gut-butyrate",
        role: "대장 상피세포를 밀봉하는 포스트바이오틱스 낙산 직접 공급",
        recommendedForm: "서방형 무취 트리부티린 (CoreBiome® 300mg)"
      },
      {
        nutrientId: "gut-enzymes",
        role: "단백질·지방 미소화로 인한 장내 부패 가스를 방지하는 광범위 소화효소",
        recommendedForm: "Thera-blend 복합 효소 + 베타인 HCl (Digest Gold)"
      }
    ],
    clinicalTip: "L-글루타민은 반드시 아침 기상 직후 미온수 한 컵과 함께 '공복'에 마셔야 장벽에 직접 닿아 재생 작용을 수행합니다."
  },
  {
    id: "joint",
    name: "관절 & 뼈 (퇴행성 관절염 & 골다공증)",
    engName: "Joint Cartilage & Bone Density",
    icon: Bone,
    accentColor: "from-blue-600 to-indigo-700",
    summary: "노년기 무릎 연골 마모와 칼슘 역설(혈관 석회화)을 방지하고, 뼈 속 칼슘을 정확히 골기질로 유도하는 과학적 처방.",
    majorSymptoms: [
      "계단을 내려갈 때 무릎 안쪽이 찌릿하고 시린 통증",
      "관절을 굽힐 때 뚝뚝 소리가 나고 아침 기상 시 뻣뻣한 조조강직",
      "골밀도 T-score -2.5 이하의 골다공증/골감소증 진단",
      "무리한 운동 후 손목·발목 건초염 및 인대 염좌"
    ],
    keyFoodRules: [
      { food: "멸치 & 뱅어포 & 뼈째 먹는 생선", reason: "칼슘과 인의 천연 비율 공급" },
      { food: "낫토 (청국장)", reason: "뼈 단백질 오스테오칼신을 활성화하는 비타민 K2" },
      { food: "마늘 & 양파 & 십자화과 채소", reason: "연골 콜라겐 가교 결합을 형성하는 유기 유황" }
    ],
    foodLimits: "도가니탕이나 돼지껍데기 속 콜라겐은 30만 달톤의 거대 분자로 흡수율이 2% 미만이며, 칼슘만 먹고 비타민 D3와 K2가 없으면 뼈 대신 혈관에 쌓여 동맥경화를 부릅니다.",
    supplementSolutions: [
      {
        nutrientId: "mineral-msm",
        role: "관절 통증 억제와 연골 콜라겐 탄력 결합을 돕는 유기 유황",
        recommendedForm: "4단계 증류 순도 99.9% 미국산 OptiMSM® 1,500~3,000mg"
      },
      {
        nutrientId: "vit-d3",
        role: "장내 칼슘 흡수율을 4배 끌어올리는 뼈 면역 핵심 호르몬",
        recommendedForm: "D3 5,000IU + K2-MK7 100mcg 복합 액상/소프트젤"
      },
      {
        nutrientId: "special-boswellia",
        role: "연골 파괴 효소 5-LOX를 차단해 7일 내 보행 통증 완화",
        recommendedForm: "AKBA 20% 고농축 특허 AprèsFlex® 100mg"
      },
      {
        nutrientId: "gut-collagen",
        role: "연골 기질을 촘촘히 메우는 500달톤 이하 초저분자 피쉬 콜라겐",
        recommendedForm: "Verisol® 또는 Naticol® 저분자 콜라겐 펩타이드 5,000mg"
      }
    ],
    clinicalTip: "칼슘을 드실 때는 반드시 비타민 K2(MK-7)와 마그네슘이 함께 들어있는 '칼마디K' 공식을 선택해야 혈관 석회화를 막을 수 있습니다."
  },
  {
    id: "liver",
    name: "간 & 만성 피로 (지방간 & 숙취 해독)",
    engName: "Hepatic Detox & Mitochondrial Energy",
    icon: Heart,
    accentColor: "from-rose-600 to-amber-700",
    summary: "과로, 야근, 음주로 지친 간세포 수용체를 밀크씨슬로 보호하고, 체내 최강 항산화제 글루타치온 생성을 부스팅합니다.",
    majorSymptoms: [
      "자고 일어나도 개운치 않고 오후 3시만 되면 쏟아지는 극심한 피로",
      "건강검진 상 간수치(AST, ALT, 감마-GTP) 상승 및 경증 지방간",
      "음주 후 숙취가 다음날 오후까지 길게 지속됨",
      "오른쪽 갈비뼈 아래(우상복부) 뻐근하고 무거운 불쾌감"
    ],
    keyFoodRules: [
      { food: "부추 & 마늘 & 양파", reason: "간 해독 효소를 자극하는 알릴 화합물과 유황" },
      { food: "문어 & 오징어 숙회", reason: "간세포 재생 및 담즙 분비를 돕는 타우린 농축" },
      { food: "달걀 노른자", reason: "지방간을 분해 유화하는 포스파티딜콜린(레시틴)" }
    ],
    foodLimits: "엉겅퀴 차를 끓여 마셔도 유효 성분인 지용성 '실리마린'은 1%도 우러나오지 않으며, 글루타치온은 음식으로 섭취 시 위산에 아미노산으로 분해되어 버립니다.",
    supplementSolutions: [
      {
        nutrientId: "phyto-silymarin",
        role: "간세포막 독소 수용체 차단 및 간내 글루타치온 35% 증대",
        recommendedForm: "흡수율을 10배 높인 실리빈 파이토솜 (Siliphos® 80%)"
      },
      {
        nutrientId: "amino-nac",
        role: "글루타치온 합성의 핵심 병목 원료로 간 해독 2단계를 초고속 가동",
        recommendedForm: "의약품급 순수 N-아세틸 시스테인 (NAC) 600mg"
      },
      {
        nutrientId: "vit-b-complex",
        role: "간에서 알코올과 탄수화물을 에너지로 대사하는 필수 코엔자임",
        recommendedForm: "활성형 B-컴플렉스 50 (메틸코발라민 + P-5-P + 활성엽산)"
      },
      {
        nutrientId: "amino-taurine",
        role: "담즙산 합성을 촉진해 지방간을 녹이고 심근 및 미토콘드리아 충전",
        recommendedForm: "순수 유리형 타우린 파우더 (Free-Form Taurine 1,000mg)"
      }
    ],
    clinicalTip: "밀크씨슬과 활성형 비타민 B군을 함께 드시면 간 해독 1단계와 2단계가 톱니바퀴처럼 완벽히 맞물려 피로가 급속히 해소됩니다."
  },
  {
    id: "brain",
    name: "뇌 & 인지기능 (수험생 집중력 & 노년기 기억력)",
    engName: "Cognitive & Neuro-Protection",
    icon: Brain,
    accentColor: "from-purple-600 to-indigo-800",
    summary: "뇌세포막 인지질을 복구하여 건망증을 예방하고, 수험생의 뇌파 알파파를 증폭시켜 장시간 몰입 상태를 지원합니다.",
    majorSymptoms: [
      "방금 전 하려던 말이나 사람 이름이 즉각 떠오르지 않는 노인성 건망증",
      "시험이나 발표를 앞두고 가슴이 두근거리고 잡생각으로 집중 분산",
      "머릿속에 안개가 낀 것처럼 멍하고 둔한 '브레인 포그(Brain Fog)'",
      "밤에 뇌 각성이 꺼지지 않아 새벽 2~3시까지 뒤척이는 수면 장애"
    ],
    keyFoodRules: [
      { food: "호두 & 아마씨", reason: "뇌세포막을 구성하는 식물성 오메가-3" },
      { food: "블루베리 & 블랙베리", reason: "혈뇌장벽을 통과해 해마를 지키는 안토시아닌" },
      { food: "달걀 & 소간", reason: "기억력 신경전달물질 아세틸콜린의 재료인 콜린" }
    ],
    foodLimits: "식품 속 포스파티딜세린(PS) 함량은 0.1% 미만으로, 임상적 기억력 개선 용량(300mg)을 채우려면 매일 콩 15kg을 먹어야 하므로 보충제 섭취가 필수적입니다.",
    supplementSolutions: [
      {
        nutrientId: "fatty-ps",
        role: "미국 FDA 기능성 인정, 뇌세포막 시냅스를 복원해 깜빡거림 회복",
        recommendedForm: "SerinAid® 특허 포스파티딜세린 300mg"
      },
      {
        nutrientId: "amino-theanine",
        role: "긴장 완화 뇌파(알파파)를 유도하여 커피의 두근거림 상쇄 및 초집중",
        recommendedForm: "일본 태양화학 특허 Suntheanine® 200mg"
      },
      {
        nutrientId: "mineral-mg",
        role: "유일하게 혈뇌장벽(BBB)을 통과해 뇌 시냅스 밀도를 높이는 마그네슘",
        recommendedForm: "MIT 특허 Magtein® 마그네슘 L-트레오네이트"
      },
      {
        nutrientId: "supp-alpha-gpc",
        role: "뇌에 직접 흡수되어 학습과 기억의 핵심 신경물질 아세틸콜린 합성",
        recommendedForm: "순수 고순도 Alpha-GPC 300mg"
      }
    ],
    clinicalTip: "커피를 드실 때 L-테아닌 150mg을 함께 드시면 심장 두근거림이나 불안증 없이 순수한 '몰입(Flow) 상태'가 4시간 이상 유지됩니다."
  }
];

export const OrganHealthGuide: React.FC<OrganHealthGuideProps> = ({
  allNutrients,
  onSelectNutrient,
}) => {
  const [selectedOrganId, setSelectedOrganId] = useState<string>("eye");

  const currentGuide = ORGAN_GUIDES.find((g) => g.id === selectedOrganId) || ORGAN_GUIDES[0];

  return (
    <div className="space-y-6">
      {/* Organ Health Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>약한 부위별 정밀 영양 처방</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2">
            눈·장·관절·간·뇌: 취약 부위별 음식과 최적 영양제 가이드
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            체내 흡수 장벽과 질환 메커니즘을 분석하여, 어떤 음식을 먹어야 하고 왜 음식만으로는 
            부족한지, 어떤 영양제 제형을 골라야 하는지 전문 의학 근거로 설명해 드립니다.
          </p>
        </div>

        {/* Organ Selector Pills */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-5 gap-2">
          {ORGAN_GUIDES.map((guide) => {
            const isSelected = guide.id === selectedOrganId;
            const Icon = guide.icon;
            return (
              <button
                key={guide.id}
                onClick={() => setSelectedOrganId(guide.id)}
                className={`p-3 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "bg-slate-900 text-white border-slate-900 shadow-md scale-[1.02]"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-1.5 rounded-lg ${isSelected ? "bg-white/20 text-white" : "bg-white text-slate-700 shadow-xs"}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  {isSelected && <span className="w-2 h-2 rounded-full bg-emerald-400" />}
                </div>
                <div>
                  <span className="font-bold text-xs sm:text-sm block">{guide.name.split(" ")[0]}</span>
                  <span className={`text-[10px] block truncate ${isSelected ? "text-slate-300" : "text-slate-400"}`}>
                    {guide.name.split("(")[1]?.replace(")", "") || guide.engName}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Organ Deep Dive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Clinical Breakdown & Food vs Supplement */}
        <div className="lg:col-span-2 space-y-6">
          {/* Organ Overview Box */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <currentGuide.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">{currentGuide.name}</h3>
                <p className="text-xs text-slate-400 font-mono">{currentGuide.engName}</p>
              </div>
            </div>

            <p className="text-sm text-slate-700 bg-slate-50 p-3.5 rounded-xl leading-relaxed">
              {currentGuide.summary}
            </p>

            {/* Symptoms Checklist */}
            <div>
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                자가 진단 체크리스트 (이 중 2개 이상 해당 시 필수 케어)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {currentGuide.majorSymptoms.map((symptom, idx) => (
                  <div key={idx} className="flex items-start gap-2 p-2.5 bg-amber-50/60 border border-amber-200/80 rounded-lg text-xs text-amber-950">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                    <span>{symptom}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Food Rules vs Why Food is Not Enough */}
            <div className="pt-2 border-t border-slate-100 space-y-3">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Utensils className="w-3.5 h-3.5 text-emerald-600" />
                추천 식품 식단 &amp; 자연 치유 급원
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {currentGuide.keyFoodRules.map((item, idx) => (
                  <div key={idx} className="p-3 bg-emerald-50/50 border border-emerald-200/70 rounded-xl">
                    <span className="font-bold text-xs text-emerald-950 block">{item.food}</span>
                    <p className="text-[11px] text-slate-600 mt-1">{item.reason}</p>
                  </div>
                ))}
              </div>

              {/* The Hard Limit of Food */}
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-950 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-rose-800">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>식품 섭취의 명확한 한계점 (왜 영양제가 필수적인가?)</span>
                </div>
                <p className="text-slate-700 leading-relaxed pt-1">{currentGuide.foodLimits}</p>
              </div>
            </div>

            {/* Clinical Pro Tip */}
            <div className="p-3.5 bg-teal-50 border border-teal-200 rounded-xl text-xs text-teal-950 flex items-start gap-2">
              <Clock className="w-4 h-4 text-teal-700 mt-0.5 shrink-0" />
              <div>
                <span className="font-bold text-teal-900 block">전문의 복용 골든타임 팁</span>
                <span className="text-slate-700">{currentGuide.clinicalTip}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Col: 부위별 추천 영양소 + 구매 동선 */}
        <div className="space-y-4">
          <div className="bg-slate-900 text-white p-4 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Pill className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-wider">부위별 최적 영양제 솔루션</span>
            </div>
            <span className="text-[11px] text-emerald-300 font-medium">쿠팡 최저가 연계</span>
          </div>

          <div className="space-y-3">
            {currentGuide.supplementSolutions.map((sol, idx) => {
              const matchedNutrient = allNutrients.find((n) => n.id === sol.nutrientId);
              return (
                <div
                  key={idx}
                  onClick={() => matchedNutrient && onSelectNutrient(matchedNutrient)}
                  className="bg-white rounded-xl border border-slate-200 p-4 hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      처방 #{idx + 1}
                    </span>
                    {matchedNutrient && (
                      <span className="text-[11px] font-mono text-slate-400">
                        #{matchedNutrient.number}
                      </span>
                    )}
                  </div>

                  <h5 className="font-bold text-sm text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {matchedNutrient ? matchedNutrient.name : sol.nutrientId}
                  </h5>

                  <p className="text-xs text-slate-600 mt-1 mb-2 leading-relaxed">
                    {sol.role}
                  </p>

                  <div className="p-2 bg-slate-50 rounded-lg text-[11px] text-slate-700 border border-slate-100 mb-2">
                    <span className="font-bold text-slate-900 block">권장 최고 흡수율 제형:</span>
                    <span className="text-emerald-700 font-medium">{sol.recommendedForm}</span>
                  </div>

                  {matchedNutrient && (
                    <div className="pt-2 border-t border-slate-100 space-y-2">
                      <div className="flex items-end justify-between gap-2">
                        <div>
                          <CoupangPrice nutrientId={matchedNutrient.id} size="sm" />
                          <CoupangBadges nutrientId={matchedNutrient.id} />
                        </div>
                        <div onClick={(e) => e.stopPropagation()}>
                          <CoupangBuyButton nutrientId={matchedNutrient.id} size="sm" />
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] font-bold text-slate-500 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition-all">
                        <span>처방 상세</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
