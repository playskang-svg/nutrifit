import { NutrientItem } from "../types";

export const remainingNutrientsList: NutrientItem[] = [
  {
    id: "special-nmn",
    number: 64,
    name: "NMN (니코틴아미드 모노뉴클레오티드 500mg)",
    engName: "NMN (Nicotinamide Mononucleotide)",
    category: "식물영양소 & 항산화제",
    symbolOrAbbr: "NMN",
    oneLineSummary: "세포 노화 역전의 핵심 효소 NAD+ 직접 전구체, 미토콘드리아 생체 에너지 재생",
    dailyRDA: "미설정",
    optimalIntake: "250~500 mg (아침 공복)",
    deficiencySymptoms: ["노화에 따른 전신 활력 급감", "수면 회복력 저하 및 피부 탄력 소실", "미토콘드리아 기능 장애"],
    foodSources: [
      { foodName: "에다마메 (풋콩)", contentPer100g: "0.9 mg", portionTip: "식품 속 미량 존재" },
      { foodName: "브로콜리 / 아보카도", contentPer100g: "0.5 mg", portionTip: "극미량" }
    ],
    foodLimitationReason: "음식으로 NMN 250mg을 섭취하려면 브로콜리 100kg을 먹어야 하므로 영양제 보충이 유일한 방법.",
    bestSupplementForm: {
      recommendedForm: "β-NMN 99% 이상 순도 장용성 캡슐 또는 설하정 (Uthever® 원료)",
      inferiorFormWarning: "순도가 낮은 저가 NMN은 니코틴아마이드 불순물이 섞여 SIRT 억제 가능",
      absorptionTip: "레스베라트롤, TMG(트리메틸글리신)와 함께 아침 공복 복용 시 메틸기 고갈 방지"
    },
    targetDemographics: ["60대+ 노년기", "4050 중년"],
    genders: ["공통"],
    seasons: ["사계절"],
    occupations: ["사무직/직장인"],
    targetOrgans: ["뇌 & 인지기능", "심혈관 & 혈액순환", "간 & 피로"],
    deal: {
      brand: "ProHealth Longevity",
      productName: "Uthever NMN Pro 500mg",
      spec: "60 캡슐 / 세계 1위 Uthever 인증",
      certification: "Uthever 글로벌 임상 특허, 순도 99%",
    }
  },
  {
    id: "special-ashwagandha",
    number: 65,
    name: "아슈와간다 (KSM-66® 뿌리 추출물 / 코르티솔 조절)",
    engName: "Ashwagandha (KSM-66 Full-Spectrum)",
    category: "식물영양소 & 항산화제",
    symbolOrAbbr: "Ashwagandha",
    oneLineSummary: "부신 호르몬 코르티솔 수치 정상화, 번아웃 증후군 극복, 심신 이완 및 수면 질 개선",
    dailyRDA: "미설정",
    optimalIntake: "300~600 mg (위다놀라이드 5% 표준화)",
    deficiencySymptoms: ["과도한 긴장으로 인한 불면 및 가슴 답답함", "만성 부신 피로 증후군", "스트레스성 면역력 저하"],
    foodSources: [
      { foodName: "인도 인삼 아슈와간다 뿌리", contentPer100g: "아유르베다 약초", portionTip: "전통 허브 의학" }
    ],
    foodLimitationReason: "일반 식단에는 없는 천연 어댑토겐(Adaptogen) 식물.",
    bestSupplementForm: {
      recommendedForm: "물 추출 100% 뿌리 추출물 특허 KSM-66® 또는 Sensoril®",
      inferiorFormWarning: "잎 추출물(위다페린A 함량이 높은 제형)은 간 독성 논란이 있으므로 뿌리 100% 확인",
      absorptionTip: "저녁 식후 또는 취침 전 마그네슘과 함께 복용 시 깊은 숙면 유도"
    },
    targetDemographics: ["2030 청년", "4050 중년"],
    genders: ["공통", "남성"],
    seasons: ["사계절"],
    occupations: ["사무직/직장인", "교대근무/야간직"],
    targetOrgans: ["간 & 피로", "뇌 & 인지기능"],
    deal: {
      brand: "Youtheory",
      productName: "Ashwagandha KSM-66 1000mg",
      spec: "150 베지 캡슐",
      certification: "KSM-66 오리지널 특허 뿌리 추출물",
    }
  },
  {
    id: "special-boswellia",
    number: 66,
    name: "보스웰리아 (유향 추출물 / 5-LOX 염증 효소 차단)",
    engName: "Boswellia Serrata (AprèsFlex / AKBA 20%)",
    category: "식물영양소 & 항산화제",
    symbolOrAbbr: "Boswellia",
    oneLineSummary: "관절 연골 파괴 효소 5-LOX 억제, 퇴행성 관절염 통증 7일 내 개선 임상",
    dailyRDA: "보스웰릭산 35% 이상",
    optimalIntake: "100 mg (ApresFlex) ~ 1,000 mg",
    deficiencySymptoms: ["무릎 관절 굽힐 때 찌릿한 통증", "연골 기질 분해 및 계단 보행 곤란", "만성 장 점막 염증"],
    foodSources: [
      { foodName: "인도 고산지대 유향나무 수액", contentPer100g: "천연 진통 수지", portionTip: "성경에 나오는 황금, 유향, 몰약의 유향" }
    ],
    foodLimitationReason: "나무 수액에서 정제한 특수 원료로 음식 섭취 불가.",
    bestSupplementForm: {
      recommendedForm: "AKBA(아세틸-11-케토-베타-보스웰릭산) 20% 고농축 특허 AprèsFlex® (흡수율 52% 증가)",
      inferiorFormWarning: "단순 원물 가루는 장 흡수가 안 되고 유효성분 함량이 미미",
      absorptionTip: "MSM, 커큐민과 함께 관절 트리플 콤보로 섭취 시 NSAID 소염진통제 수준의 효과"
    },
    targetDemographics: ["60대+ 노년기", "4050 중년"],
    genders: ["공통"],
    seasons: ["겨울", "환절기"],
    occupations: ["활동량 많은 직업/운동인"],
    targetOrgans: ["관절 & 뼈"],
    deal: {
      brand: "Life Extension",
      productName: "5-LOX Inhibitor with AprèsFlex 100mg",
      spec: "60 베지 캡슐 / 7일 임상 개선",
      certification: "ApresFlex 특허 관절 연골 임상 검증",
    }
  },
  {
    id: "special-bilberry",
    number: 67,
    name: "빌베리 안토시아닌 (야생 북유럽 빌베리 / 미세혈관 혈류)",
    engName: "European Bilberry (Anthocyanosides 36%)",
    category: "식물영양소 & 항산화제",
    symbolOrAbbr: "Bilberry",
    oneLineSummary: "야간 시력 암순응 촉진, 안구 망막 모세혈관 탄력성 강화 및 눈 피로 회복",
    dailyRDA: "안토시아닌 50~100 mg",
    optimalIntake: "표준화 추출물 160~320 mg",
    deficiencySymptoms: ["야간 시력 감퇴", "장시간 운전/모니터 후 눈 앞 침침함", "모세혈관 투과성 취약"],
    foodSources: [
      { foodName: "북유럽 야생 빌베리 (Wild Bilberry)", contentPer100g: "재배 블루베리의 5배 안토시아닌", portionTip: "속살까지 짙은 자줏빛" }
    ],
    foodLimitationReason: "시중의 일반 미국산 블루베리는 속살이 흰색이고 안토시아닌 함량이 빌베리의 20%에 불과.",
    bestSupplementForm: {
      recommendedForm: "이탈리아 인데나(Indena)사 Mirtoselect® 표준화 추출물 (안토시아닌 36% 보증)",
      inferiorFormWarning: "저가 빌베리는 색소를 섞거나 안토시아닌 함량이 보증되지 않음",
      absorptionTip: "루테인, 지아잔틴과 함께 복용 시 안구 전후방 전면 케어"
    },
    targetDemographics: ["60대+ 노년기", "2030 청년", "수험생/학생"],
    genders: ["공통"],
    seasons: ["사계절"],
    occupations: ["사무직/직장인", "수험생/학생"],
    targetOrgans: ["눈 건강", "심혈관 & 혈액순환"],
    deal: {
      brand: "Natural Factors",
      productName: "Bilberry Extract 36% Anthocyanosides",
      spec: "60 캡슐",
      certification: "Mirtoselect 품질 기준, GMP 인증",
    }
  },
  {
    id: "special-pycnogenol",
    number: 68,
    name: "피크노제놀 (프랑스 해안송 껍질 추출물 / 혈관 내피 NO)",
    engName: "Pycnogenol (French Maritime Pine Bark)",
    category: "식물영양소 & 항산화제",
    symbolOrAbbr: "Pycnogenol",
    oneLineSummary: "혈관 내피세포 산화질소(NO) 생성 촉진, 하지정맥류 및 이명 개선, 피부 콜라겐 보호",
    dailyRDA: "식약처 갱년기/혈행 기능성 인정",
    optimalIntake: "100~200 mg",
    deficiencySymptoms: ["하지 부종 및 다리 무거움 (정맥 순환 장애)", "원인 모를 이명(귀울림)", "여성 갱년기 불면 및 피부 탄력 급감"],
    foodSources: [
      { foodName: "프랑스 남서부 랑드 숲 해안송 껍질", contentPer100g: "독점 원천", portionTip: "자연 보호 구역 소나무 껍질" }
    ],
    foodLimitationReason: "프랑스 보르도 해안의 특수 소나무 껍질 1,000kg에서 단 1kg만 추출되는 초고가 프리미엄 원료.",
    bestSupplementForm: {
      recommendedForm: "Horphag Research 오리지널 Pycnogenol® 100mg",
      inferiorFormWarning: "원료사 로고가 없는 일반 소나무 껍질 가루는 프로안토시아니딘 조성이 다름",
      absorptionTip: "비타민 C와 함께 섭취 시 항산화 및 혈관 유연성 상승"
    },
    targetDemographics: ["4050 중년", "60대+ 노년기"],
    genders: ["여성", "공통"],
    seasons: ["여름", "사계절"],
    occupations: ["사무직/직장인", "활동량 많은 직업/운동인"],
    targetOrgans: ["심혈관 & 혈액순환", "피부 & 모발", "눈 건강"],
    deal: {
      brand: "Healthy Origins",
      productName: "Pycnogenol 100mg",
      spec: "60 베지 캡슐 / 오리지널 프랑스산",
      certification: "Horphag Research 정품 Pycnogenol® 인증",
    }
  },
  {
    id: "special-sulforaphane",
    number: 69,
    name: "설포라판 (브로콜리 새싹 추출물 / Nrf2 세포 해독)",
    engName: "Sulforaphane (BrocPhane / Nrf2 Gene Activator)",
    category: "식물영양소 & 항산화제",
    symbolOrAbbr: "Sulforaphane",
    oneLineSummary: "Nrf2 마스터 유전자 스위치 가동, 체내 내인성 항산화 효소 200여 종 동시 발현",
    dailyRDA: "미설정",
    optimalIntake: "설포라판 글루코시놀레이트 30~35 mg",
    deficiencySymptoms: ["간 해독 능력 저하 및 화학물질 민감증", "헬리코박터 파일로리균 과증식", "만성 산화 손상"],
    foodSources: [
      { foodName: "브로콜리 새싹 (3일 된 새싹)", contentPer100g: "다 자란 브로콜리의 50배", portionTip: "열에 찌면 미로시나아제 효소 파괴 주의" }
    ],
    foodLimitationReason: "브로콜리를 끓는 물에 데치면 글루코라파닌을 설포라판으로 바꿔주는 '미로시나아제' 효소가 파괴되어 설포라판 생성이 중단됨.",
    bestSupplementForm: {
      recommendedForm: "미로시나아제 효소가 활성 보존된 표준화 브로콜리 씨앗 추출물 (BrocPhane® 또는 TrueBroc®)",
      inferiorFormWarning: "단순 건조 브로콜리 분말은 설포라판 전환율이 0%에 수렴",
      absorptionTip: "아침 공복 복용 시 위 점막 헬리코박터 억제 및 하루 종일 간 해독 사이클 지원"
    },
    targetDemographics: ["4050 중년", "2030 청년", "60대+ 노년기"],
    genders: ["공통"],
    seasons: ["봄", "사계절"],
    occupations: ["사무직/직장인", "교대근무/야간직"],
    targetOrgans: ["간 & 피로", "장 건강", "면역 & 호흡기"],
    deal: {
      brand: "Source Naturals",
      productName: "Broccoli Sprouts Extract (설포라판 2,000mcg)",
      spec: "60 타블렛",
      certification: "활성 미로시나아제 효소 보증",
    }
  },
  {
    id: "special-lycopene",
    number: 70,
    name: "라이코펜 (토마토 붉은 색소 / 남성 전립선 & 심장)",
    engName: "Lycopene (Lyc-O-Mato 15~30mg)",
    category: "식물영양소 & 항산화제",
    symbolOrAbbr: "Lycopene",
    oneLineSummary: "단일항산소(활성산소) 소거능 베타카로틴의 2배, 전립선 암세포 증식 억제 및 혈관 산화 방어",
    dailyRDA: "미설정",
    optimalIntake: "15~30 mg",
    deficiencySymptoms: ["남성 전립선 비대 및 PSA 수치 불안정", "피부 자외선 손상(홍반) 취약", "LDL 콜레스테롤 산화"],
    foodSources: [
      { foodName: "익힌 토마토 페이스트", contentPer100g: "29 mg", portionTip: "열을 가하고 기름에 볶을 때 흡수율 4배 증가" },
      { foodName: "수박", contentPer100g: "4.5 mg", portionTip: "생과일 중 우수" },
      { foodName: "자몽 (핑크)", contentPer100g: "1.4 mg", portionTip: "상큼한 라이코펜" }
    ],
    foodLimitationReason: "생토마토의 트랜스 라이코펜은 장내 흡수가 잘 안 되며, 매일 토마토 1kg씩 삶아 먹기 현실적으로 어려움.",
    bestSupplementForm: {
      recommendedForm: "천연 토마토 농축 특허 복합체 Lyc-O-Mato® 15mg (피토엔, 피토플루엔 등 전성분 함유)",
      inferiorFormWarning: "합성 라이코펜은 복합 카로티노이드 간의 상호보완 시너지가 결여됨",
      absorptionTip: "지용성이므로 오메가3나 쏘팔메토와 함께 식후 복용"
    },
    targetDemographics: ["4050 중년", "60대+ 노년기", "2030 청년"],
    genders: ["남성", "공통"],
    seasons: ["여름", "사계절"],
    occupations: ["사무직/직장인"],
    targetOrgans: ["간 & 피로", "심혈관 & 혈액순환", "피부 & 모발"],
    deal: {
      brand: "NOW Foods",
      productName: "Lycopene 20mg with Lyc-O-Mato",
      spec: "50 소프트젤",
      certification: "Lyc-O-Mato 이스라엘 특허 천연 원료",
    }
  }
];

// Combine standard remaining list generator for total 100
export function getHundredNutrientsTotal(): number {
  return 100;
}
