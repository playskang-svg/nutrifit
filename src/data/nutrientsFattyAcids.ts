import { NutrientItem } from "../types";

export const fattyAcidsList: NutrientItem[] = [
  {
    id: "fatty-rtg-omega3",
    number: 45,
    name: "rTG 오메가-3 (EPA & DHA 고순도 80%+)",
    engName: "rTG Omega-3 (EPA 600mg + DHA 400mg)",
    category: "지방산 & 지질",
    symbolOrAbbr: "rTG Omega-3",
    oneLineSummary: "눈물층 기름막 보충(안구건조증 개선 1위), 혈중 중성지질 감소, 뇌신경 세포막 유동성 유지",
    dailyRDA: "EPA+DHA 500~2,000 mg",
    optimalIntake: "1,000~2,000 mg (IFOS 5스타 인증)",
    deficiencySymptoms: ["눈이 뻑뻑하고 모래가 들어간 듯한 안구건조증", "중성지방 수치 상승 및 혈관 염증", "두뇌 인지 반응 속도 저하", "관절 뻣뻣함"],
    foodSources: [
      { foodName: "고등어 / 정어리 / 삼치", contentPer100g: "1.5~2.5 g", portionTip: "등푸른 생선 주 2~3회 섭취 필수" },
      { foodName: "자연산 연어", contentPer100g: "1.8 g", portionTip: "아스타잔틴과 함께 섭취" },
      { foodName: "들기름 (ALA 식물성)", contentPer100g: "60 g", portionTip: "식물성 ALA는 체내 DHA/EPA 전환율이 5% 미만으로 극히 제한적" }
    ],
    foodLimitationReason: "대형 어종(참치 등)은 수은/미세플라스틱 축적 위험이 크며, 생선을 구울 때 고열로 인해 오메가-3의 50%가 산패됨. 현대인은 오메가6:오메가3 비율이 20:1로 심각한 만성 염증 상태.",
    bestSupplementForm: {
      recommendedForm: "남태평양 소형 어종(멸치, 정어리) 추출 초임계 rTG형 (흡수율 최고 3세대) + IFOS 5스타 산패도 인증",
      inferiorFormWarning: "1세대 TG형(순도 30% 한계)이나 2세대 EE형(에탄올 결합으로 장 흡수율 저하 및 위장장애) 피하기",
      absorptionTip: "지용성이므로 기름기가 있는 식사(점심 또는 저녁) 직후 복용해야 흡수율이 3배 이상 증가"
    },
    targetDemographics: ["60대+ 노년기", "2030 청년", "4050 중년", "청소년/학생"],
    genders: ["공통"],
    seasons: ["가을", "겨울", "봄", "사계절"],
    occupations: ["사무직/직장인", "수험생/학생"],
    targetOrgans: ["눈 건강", "심혈관 & 혈액순환", "뇌 & 인지기능", "관절 & 뼈"],
    deal: {
      brand: "Sports Research",
      productName: "Triple Strength Omega-3 Fish Oil 1250mg",
      spec: "180 소프트젤 / EPA 685mg + DHA 310mg",
      certification: "IFOS 5-Star 최고등급 인증, Wild Alaska Pollock 원료",
    }
  },
  {
    id: "fatty-dha-brain",
    number: 46,
    name: "고함량 DHA (미세조류 비건 / 뇌 & 망막 집중형)",
    engName: "High-DHA (Algal Vegan Brain & Retina)",
    category: "지방산 & 지질",
    symbolOrAbbr: "DHA Only",
    oneLineSummary: "뇌 회백질 및 안구 망막 광수용체 지방의 50% 차지, 수험생 기억력 및 노인성 황반 보호",
    dailyRDA: "DHA 단독 500mg 이상",
    optimalIntake: "600~1,000 mg",
    deficiencySymptoms: ["노년기 뇌 인지기능 저하 및 해마 위축", "망막 황반 기능 약화 및 시야 흐림", "임산부 태아 뇌 발달 저해", "산후 우울증"],
    foodSources: [
      { foodName: "해양 미세조류 (Schizochytrium)", contentPer100g: "순수 DHA 원천", portionTip: "먹이사슬 최하단으로 중금속 0%" },
      { foodName: "연어 머리 / 눈 주변육", contentPer100g: "DHA 집중", portionTip: "풍부한 DHA" },
      { foodName: "청어 알", contentPer100g: "인지질 결합형", portionTip: "생체이용률 우수" }
    ],
    foodLimitationReason: "물고기는 DHA를 자체 합성하지 못하고 미세조류를 먹어서 축적하는 것이므로, 어류 냄새에 민감하거나 수은 걱정 시 식물성 미세조류가 가장 안전.",
    bestSupplementForm: {
      recommendedForm: "100% 식물성 미세조류(Algae) 추출 비건 DHA 소프트젤 (카라기난 프리 캡슐)",
      inferiorFormWarning: "산패된 비린내가 나는 어유는 과산화지질로 작용해 세포를 손상시킴",
      absorptionTip: "루테인, 지아잔틴과 함께 복용 시 망막 황반색소 밀도 및 중심시력 보호 극대화"
    },
    targetDemographics: ["60대+ 노년기", "청소년/학생", "2030 청년"],
    genders: ["공통", "여성"],
    seasons: ["사계절"],
    occupations: ["수험생/학생", "사무직/직장인"],
    targetOrgans: ["눈 건강", "뇌 & 인지기능"],
    deal: {
      brand: "Nordic Naturals",
      productName: "Algae DHA 500mg (100% 비건)",
      spec: "60 식물성 소프트젤",
      certification: "미국임산부협회 공식 추천, 비건 인증",
    }
  },
  {
    id: "fatty-ps",
    number: 47,
    name: "포스파티딜세린 (PS / 뇌세포막 인지질 / 300mg)",
    engName: "Phosphatidylserine (PS 100~300mg)",
    category: "지방산 & 지질",
    symbolOrAbbr: "PS",
    oneLineSummary: "미국 FDA 기능성 인정, 노년기 기억력 감퇴 회복, 뇌세포간 시냅스 신호전달 촉진",
    dailyRDA: "300 mg (임상 기능성 기준)",
    optimalIntake: "300 mg 매일",
    deficiencySymptoms: ["단기 기억력 저하 (깜빡깜빡하는 건망증)", "이름이나 약속이 바로 떠오르지 않는 노화 현상", "스트레스 코르티솔 과다 분비", "주의력 결핍"],
    foodSources: [
      { foodName: "소 뇌 / 돼지 비장", contentPer100g: "다량", portionTip: "광우병 위험으로 현대에는 섭취 금기" },
      { foodName: "대두 레시틴", contentPer100g: "0.5% 미량", portionTip: "식품 속 함량이 극소량" },
      { foodName: "고등어", contentPer100g: "소량", portionTip: "오메가3와 동반" }
    ],
    foodLimitationReason: "안전하게 먹을 수 있는 식품 속 포스파티딜세린 함량은 극히 미미(1일 300mg 섭취하려면 대두 15kg 섭취 필요)하여 영양제 보충이 필수적인 대표 영양소.",
    bestSupplementForm: {
      recommendedForm: "대두 추출 Sharp-PS® 특허 순도 20~50% 표준화 포스파티딜세린 300mg",
      inferiorFormWarning: "단순 복합제 속 저함량(50mg 미만)은 식약처 인지력 개선 기능성 기준에 미달",
      absorptionTip: "아침 식사 후 오메가-3(DHA)와 함께 복용 시 뇌세포막 침투 시너지 3배 향상"
    },
    targetDemographics: ["60대+ 노년기", "4050 중년", "수험생/학생"],
    genders: ["공통"],
    seasons: ["사계절"],
    occupations: ["사무직/직장인", "수험생/학생"],
    targetOrgans: ["뇌 & 인지기능"],
    deal: {
      brand: "Doctor's Best",
      productName: "Phosphatidylserine with SerinAid 100mg",
      spec: "120 베지 캡슐 / 뇌 기능 개선 특허",
      certification: "SerinAid® 과학적 임상 특허 인지질",
    }
  },
  {
    id: "fatty-coq10",
    number: 48,
    name: "코엔자임 Q10 (유비퀴놀 / 활성형 Kaneka™)",
    engName: "Coenzyme Q10 (Ubiquinol Active Form)",
    category: "지방산 & 지질",
    symbolOrAbbr: "CoQ10",
    oneLineSummary: "심장 미토콘드리아 ATP 배터리, 혈압 조절, 고지혈증 스타틴 복용 시 고갈 방지",
    dailyRDA: "90~100 mg",
    optimalIntake: "100~200 mg (40대 이상 활성형 유비퀴놀 권장)",
    deficiencySymptoms: ["스타틴(고지혈증약) 복용 후 극심한 다리 근육통", "심근 수축력 저하 및 계단 오를 때 숨참", "만성 산화 피로", "피부 탄력 감소"],
    foodSources: [
      { foodName: "소 심장 / 돼지 간", contentPer100g: "11 mg", portionTip: "내장육에 집중 분포" },
      { foodName: "소고기 살코기", contentPer100g: "3 mg", portionTip: "가열 시 파괴" },
      { foodName: "정어리 / 고등어", contentPer100g: "6 mg", portionTip: "생선류" }
    ],
    foodLimitationReason: "체내 코큐텐 합성능은 20세에 정점을 찍고 40세 이후 급감하며, 고지혈증 치료제인 스타틴(Statin) 계열 약물은 콜레스테롤뿐 아니라 코큐텐 합성 경로까지 원천 차단함.",
    bestSupplementForm: {
      recommendedForm: "세계 1위 일본 카네카(Kaneka Ubiquinol™) 특허 환원형 활성형 유비퀴놀",
      inferiorFormWarning: "일반 산화형 유비퀴논(Ubiquinone)은 50대 이상 노년기 간에서 유비퀴놀로 환원되는 효소력이 50% 이상 저하되어 흡수율이 낮음",
      absorptionTip: "반드시 식후 오메가3 또는 식사 속 지방과 함께 복용"
    },
    targetDemographics: ["60대+ 노년기", "4050 중년"],
    genders: ["공통"],
    seasons: ["사계절"],
    occupations: ["사무직/직장인"],
    targetOrgans: ["심혈관 & 혈액순환", "간 & 피로"],
    deal: {
      brand: "Healthy Origins",
      productName: "Ubiquinol Kaneka QH 100mg",
      spec: "150 소프트젤 / 5개월분",
      certification: "Kaneka QH 오리지널 환원형 유비퀴놀 인증",
    }
  },
  {
    id: "fatty-gla",
    number: 49,
    name: "감마리놀렌산 (GLA / 보라지 오일 24%)",
    engName: "Gamma-Linolenic Acid (Borage Oil GLA)",
    category: "지방산 & 지질",
    symbolOrAbbr: "GLA",
    oneLineSummary: "항염증 프로스타글란딘(PGE1) 합성, 여성 갱년기 홍조 및 월경전 증후군(PMS) 완화",
    dailyRDA: "240~300 mg",
    optimalIntake: "240~480 mg (보라지 오일 1,000mg)",
    deficiencySymptoms: ["여성 갱년기 안면 홍조 및 식은땀", "생리 전 극심한 유방 압통 및 감정 기복", "아토피 피부염 건조 가려움증", "혈액순환 장애"],
    foodSources: [
      { foodName: "보라지 종자유 (Borage Oil)", contentPer100g: "24% 함유", portionTip: "달맞이꽃종자유(9%)의 2.5배 고농축" },
      { foodName: "달맞이꽃 종자유", contentPer100g: "9% 함유", portionTip: "전통 갱년기 오일" },
      { foodName: "블랙커런트 오일", contentPer100g: "17% 함유", portionTip: "식물성 오일" }
    ],
    foodLimitationReason: "식단 속 리놀레산이 감마리놀렌산으로 바뀌려면 'D6D 효소'가 필요한데, 노화, 스트레스, 당뇨, 알코올 섭취 시 이 효소가 완전히 마비되어 결핍 초래.",
    bestSupplementForm: {
      recommendedForm: "냉압착 비정제 엑스트라 버진 보라지 오일 (Borage Seed Oil GLA 240mg)",
      inferiorFormWarning: "달맞이꽃 종자유보다 적은 캡슐 수로 고함량 GLA를 안전하게 충족",
      absorptionTip: "점심 식후 또는 저녁 식후 복용"
    },
    targetDemographics: ["4050 중년", "60대+ 노년기", "2030 청년"],
    genders: ["여성"],
    seasons: ["사계절"],
    occupations: ["사무직/직장인"],
    targetOrgans: ["피부 & 모발", "심혈관 & 혈액순환"],
    deal: {
      brand: "NOW Foods",
      productName: "Borage Oil 1,000mg (GLA 240mg)",
      spec: "120 소프트젤",
      certification: "비정제 냉압착, 헥산 무검출",
    }
  },
  {
    id: "fatty-lecithin",
    number: 50,
    name: "해바라기 레시틴 (Sunflower Lecithin / 인지질 60%+)",
    engName: "Sunflower Lecithin (Phospholipids)",
    category: "지방산 & 지질",
    symbolOrAbbr: "Lecithin",
    oneLineSummary: "모유 수유 유선염 방지, 뇌 신경세포막 구성, 혈관 속 콜레스테롤 유화 분해",
    dailyRDA: "미설정",
    optimalIntake: "2,400~3,600 mg",
    deficiencySymptoms: ["수유기 잦은 젖몸살 및 유관 막힘", "담즙 정체 및 담석 형성 위험", "집중력 및 인지 속도 감퇴", "지방간"],
    foodSources: [
      { foodName: "해바라기씨", contentPer100g: "순수 비-GMO", portionTip: "대두 알레르기/에스트로겐 걱정 없는 원료" },
      { foodName: "달걀 노른자", contentPer100g: "천연 레시틴", portionTip: "최고의 식품 공급원" },
      { foodName: "대두 콩", contentPer100g: "대두 레시틴", portionTip: "GMO 가능성 주의" }
    ],
    foodLimitationReason: "대두 레시틴은 유전자 변형(GMO) 및 식물성 에스트로겐 이슈가 있어 안전한 섭취를 위해 해바라기 유래 레시틴을 선호하는 추세.",
    bestSupplementForm: {
      recommendedForm: "Non-GMO 냉압착 해바라기 레시틴 (액상 또는 소프트젤 1,200mg)",
      inferiorFormWarning: "용매(헥산) 추출 대두 레시틴은 화학 잔류물 위험",
      absorptionTip: "기름진 식사 직후 복용 시 지방 소화를 유화시켜 담즙 배출을 돕고 속 편안함 제공"
    },
    targetDemographics: ["2030 청년", "4050 중년", "60대+ 노년기"],
    genders: ["여성", "공통"],
    seasons: ["사계절"],
    occupations: ["사무직/직장인"],
    targetOrgans: ["간 & 피로", "뇌 & 인지기능", "심혈관 & 혈액순환"],
    deal: {
      brand: "NOW Foods",
      productName: "Sunflower Lecithin 1200mg",
      spec: "200 소프트젤 / 대두 프리",
      certification: "Non-GMO Project 검증, 콩 무첨가",
    }
  }
];
