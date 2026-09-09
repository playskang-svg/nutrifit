import { TimeSlotConfig, UserRoutineEntry } from "../types";

export const timeSlotsConfig: TimeSlotConfig[] = [
  {
    key: "wake_fasting",
    title: "기상 직후 / 공복",
    timeRange: "07:00 ~ 08:00",
    badge: "위산 분비 전 공복 흡수",
    rationale: "음식물이 들어오기 전 위의 산도가 중성에 가깝고 담즙 분비가 없는 상태로, 장까지 생존해야 하는 균주나 아미노산의 경쟁 없는 점막 흡수에 최적기입니다.",
    recommendedCategories: [
      "프로바이오틱스 유산균",
      "L-글루타민 (장 점막 복구)",
      "콜라겐 펩타이드",
      "SAM-e (S-아데노실메티오닌)",
      "철분제 (단, 위장 약할 시 식후 전환)"
    ],
    avoidCategories: [
      "고함량 비타민 C (속쓰림 유발)",
      "아연 (메스꺼움 유발)",
      "지용성 비타민 (담즙산 없어 흡수율 10% 미만으로 급락)"
    ],
    waterTip: "미온수(300~500ml)를 충분히 마셔 위산을 희석하고 장 연동 운동을 촉진하세요.",
    sampleNutrients: ["프로바이오틱스 유산균", "L-글루타민", "콜라겐 펩타이드"]
  },
  {
    key: "morning_post",
    title: "아침 식후",
    timeRange: "08:30 ~ 09:30",
    badge: "일주기 활력 & 에너지 대사",
    rationale: "신체 일주기 리듬(Circadian Rhythm)에 맞춰 아침 시간대 코르티솔 분비와 미토콘드리아 ATP 에너지 생성을 부스팅하는 대사 조효소를 공급합니다.",
    recommendedCategories: [
      "활성형 비타민 B군 복합체 (B1, B2, B6, B12)",
      "비타민 C (식후 복용으로 위산 자극 차단)",
      "코엔자임 Q10 (유비퀴놀)",
      "홍경천 / 아슈와간다 (스트레스 조절)",
      "마카 / 비오틴"
    ],
    avoidCategories: [
      "마그네슘 고용량 (졸음 유발 가능)",
      "L-테아닌 (진정 작용으로 나른해질 수 있음)"
    ],
    waterTip: "식사 직후 30분 이내에 섭취하여 소화 흡수 효소와 함께 대사되도록 합니다.",
    sampleNutrients: ["비타민 B 복합체", "비타민 C", "코엔자임 Q10 (CoQ10)"]
  },
  {
    key: "lunch_post",
    title: "점심 식후",
    timeRange: "12:30 ~ 13:30",
    badge: "담즙산 분비 & 지용성 영양소 골든타임",
    rationale: "가장 든든한 지방질 식사를 섭취하는 점심 직후에는 담즙산과 췌장 리파아제가 분비되어 지용성 비타민과 지질 영양소의 생체이용률이 최대 300~500%까지 증가합니다.",
    recommendedCategories: [
      "rTG 오메가-3 (EPA & DHA)",
      "비타민 D3 + K2 (MK-7)",
      "루테인 & 지아잔틴 (카로티노이드)",
      "천연 아스타잔틴",
      "비타민 E (혼합 토코페롤)",
      "비타민 A (베타카로틴)"
    ],
    avoidCategories: [
      "공복 복용 시 기름 성분으로 인한 트림 및 위식도 역류",
      "철분제 (점심의 칼슘 성분과 흡수 경쟁)"
    ],
    waterTip: "지용성 영양소는 기름진 식단(올리브유, 생선, 육류, 견과류)과 함께 드셔야 온전히 흡수됩니다.",
    sampleNutrients: ["rTG 오메가-3", "비타민 D3", "루테인 & 지아잔틴", "아스타잔틴"]
  },
  {
    key: "dinner_post",
    title: "저녁 식후",
    timeRange: "18:30 ~ 19:30",
    badge: "야간 세포 재생 & 간 해독",
    rationale: "취침 중 일어나는 간 글리코겐 저장, 제2상 간 해독(Glutathione 결합 반응), 항염증 세포 치유 반응을 지원하는 영양소를 투입합니다.",
    recommendedCategories: [
      "밀크씨슬 (실리마린/실리빈 파이토솜)",
      "NAC (N-아세틸시스테인)",
      "커큐민 (생강과 항염증)",
      "MSM (식이유황) & 글루코사민",
      "아연 & 셀레늄 (야간 세포 분열 및 면역)"
    ],
    avoidCategories: [
      "고용량 비타민 B12 (수면 방해 가능)",
      "카페인 함유 보충제 (녹차추출물 EGCG, 과라나)"
    ],
    waterTip: "저녁 식사 종료 후 30분 이내 복용하며, 과다한 수분 섭취는 야간뇨를 부를 수 있으니 150ml 적정량을 마십니다.",
    sampleNutrients: ["밀크씨슬 (실리마린)", "MSM (식이유황)", "아연 (Zinc)", "NAC"]
  },
  {
    key: "bedtime",
    title: "취침 30~60분 전",
    timeRange: "22:00 ~ 23:00",
    badge: "신경 안정, 이완 & 수면 질 개선",
    rationale: "부교감 신경을 활성화하고 뇌내 억제성 신경전달물질(GABA)을 유도하여 수면 대기 시간을 단축하고 야간 쥐남 및 불안을 진정시킵니다.",
    recommendedCategories: [
      "킬레이트 마그네슘 (비스글리시네이트)",
      "L-테아닌 (뇌파 알파파 유도)",
      "포스파티딜세린 (야간 코르티솔 급증 차단)",
      "칼슘 (야간 골흡수 차단 및 신경 안정)",
      "타트체리 추출물 (천연 멜라토닌 전구체)"
    ],
    avoidCategories: [
      "비타민 B군 복합체 (수면 방해 및 악몽 가능)",
      "CoQ10 (세포 에너지 촉진으로 수면 저해)"
    ],
    waterTip: "따뜻한 물 반 컵(100ml 내외)과 함께 섭취하여 수면 중 화장실 방문을 예방하세요.",
    sampleNutrients: ["마그네슘 (킬레이트)", "L-테아닌", "칼슘"]
  }
];

export interface ConflictRule {
  id: string;
  nutrientA: string;
  nutrientB: string;
  severity: "high" | "medium" | "synergy";
  title: string;
  mechanism: string;
  recommendedSolution: string;
}

export const interactionRules: ConflictRule[] = [
  {
    id: "conf-1",
    nutrientA: "칼슘",
    nutrientB: "철분",
    severity: "high",
    title: "칼슘과 철분의 동시 복용 금지 (흡수 경로 경쟁)",
    mechanism: "장관의 동일한 2가 양이온 수송체(DMT1)를 공유하므로, 칼슘이 철분의 흡수를 최대 60% 이상 저해합니다.",
    recommendedSolution: "철분은 기상 직후 공복 또는 아침에 복용하고, 칼슘은 저녁 식후 또는 취침 전으로 최소 4시간 이상 분리 복용하세요."
  },
  {
    id: "conf-2",
    nutrientA: "아연",
    nutrientB: "구리",
    severity: "medium",
    title: "고함량 아연 단독 복용 시 구리 결핍 주의",
    mechanism: "장세포에서 메탈로티오네인(Metallothionein) 단백질을 유도하여 구리의 장내 흡수를 차단합니다. 40mg 이상 고용량 아연 지속 섭취 시 빈혈 및 면역 저하를 유발합니다.",
    recommendedSolution: "아연 15~30mg 복용 시 구리 1~2mg이 배합된 제제(OptiZinc 등)를 선택하거나 격일로 섭취하세요."
  },
  {
    id: "conf-3",
    nutrientA: "커피/카페인",
    nutrientB: "마그네슘 & 비타민 B1",
    severity: "high",
    title: "모닝 커피와 미네랄·B군의 흡수 저해",
    mechanism: "커피의 탄닌과 클로로겐산이 미네랄과 킬레이트 결합하여 배출시키고, 카페인의 이뇨 작용으로 수용성 B군과 마그네슘이 소변으로 조기 유실됩니다.",
    recommendedSolution: "모닝 커피를 마신 후 최소 1~2시간 후에 비타민 B군과 마그네슘을 섭취하세요."
  },
  {
    id: "syn-1",
    nutrientA: "비타민 D3",
    nutrientB: "비타민 K2 (MK-7)",
    severity: "synergy",
    title: "골밀도 & 혈관 석회화 차단의 황금 콤비 (시너지)",
    mechanism: "D3가 장에서 칼슘 흡수를 촉진하고, K2(메나퀴논-7)가 오스테오칼신과 MGP 단백질을 활성화하여 칼슘을 혈관벽이 아닌 뼈로 인도합니다.",
    recommendedSolution: "점심 식후 지방 식사와 함께 D3 2000~5000IU와 K2 100~200mcg 복합제를 동시에 섭취하세요."
  },
  {
    id: "syn-2",
    nutrientA: "철분",
    nutrientB: "비타민 C",
    severity: "synergy",
    title: "철분 흡수율 300% 극대화 시너지",
    mechanism: "비타민 C가 난흡수성 3가철(Fe3+)을 흡수율이 높은 2가철(Fe2+)로 환원시켜 장관 흡수율을 3~4배 증가시킵니다.",
    recommendedSolution: "철분제를 복용할 때 오렌지 주스나 비타민 C 500mg과 함께 공복에 섭취하세요."
  },
  {
    id: "syn-3",
    nutrientA: "마그네슘",
    nutrientB: "비타민 B6 (피리독신)",
    severity: "synergy",
    title: "세포막 투과율 및 신경 이완 시너지",
    mechanism: "비타민 B6는 마그네슘이 세포막을 통과하여 세포 내로 이동하는 것을 돕는 조효소로 작용하여 생체이용률을 극대화합니다.",
    recommendedSolution: "취침 전 킬레이트 마그네슘과 활성형 B6(P-5-P) 복합제를 함께 섭취하세요."
  }
];

export const defaultUserRoutine: UserRoutineEntry[] = [
  {
    id: "r-1",
    nutrientId: "probiotics",
    nutrientName: "프로바이오틱스 300억 유산균",
    timeSlot: "wake_fasting",
    dosage: "1캡슐 (공복 미온수)",
    takenToday: false,
    notes: "기상 직후 물 400ml와 복용"
  },
  {
    id: "r-2",
    nutrientId: "vit-b-complex",
    nutrientName: "활성형 비타민 B군 복합체 100",
    timeSlot: "morning_post",
    dosage: "1정 (아침 식후)",
    takenToday: true,
    notes: "에너지 대사 부스팅, 커피 섭취 1시간 후"
  },
  {
    id: "r-3",
    nutrientId: "omega-3",
    nutrientName: "rTG 오메가-3 1200mg (EPA 800+DHA 400)",
    timeSlot: "lunch_post",
    dosage: "2소프트젤 (점심 식후)",
    takenToday: false,
    notes: "점심 지방 식사와 함께 섭취"
  },
  {
    id: "r-4",
    nutrientId: "vit-d3-k2",
    nutrientName: "비타민 D3 5000IU + K2 MK-7 100mcg",
    timeSlot: "lunch_post",
    dosage: "1방울/1정 (점심 식후)",
    takenToday: false,
    notes: "오메가-3와 함께 동시 복용 (지용성 시너지)"
  },
  {
    id: "r-5",
    nutrientId: "milk-thistle",
    nutrientName: "실리빈 파이토솜 밀크씨슬",
    timeSlot: "dinner_post",
    dosage: "1캡슐 (저녁 식후)",
    takenToday: false,
    notes: "야간 간 해독 및 세포 재생 지원"
  },
  {
    id: "r-6",
    nutrientId: "magnesium-glycinate",
    nutrientName: "킬레이트 마그네슘 (마그네슘 비스글리시네이트 300mg)",
    timeSlot: "bedtime",
    dosage: "2캡슐 (취침 40분 전)",
    takenToday: false,
    notes: "근육 이완, 숙면 유도, 미온수 반 컵"
  }
];
