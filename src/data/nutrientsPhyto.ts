import { NutrientItem } from "../types";

export const phytonutrientsList: NutrientItem[] = [
  {
    id: "phyto-lutein-zeaxanthin",
    number: 51,
    name: "루테인 & 지아잔틴 (5:1 황금비율 / 안구 황반색소)",
    engName: "Lutein & Zeaxanthin (Lutemax 2020 5:1)",
    category: "식물영양소 & 항산화제",
    symbolOrAbbr: "Lutein:Zea",
    oneLineSummary: "스마트폰 블루라이트 흡수 차단, 황반 중심부(지아잔틴) 및 주변부(루테인) 색소 밀도 유지",
    dailyRDA: "루테인+지아잔틴 10~20 mg",
    optimalIntake: "20 mg (루테인 16mg + 지아잔틴 4mg 황금비율)",
    deficiencySymptoms: ["황반변성(AMD) 위험 증가", "시야 중심부가 침침하고 왜곡되어 보임", "눈부심 및 야간 운전 빛 번짐 심화", "눈의 만성 산화 피로"],
    foodSources: [
      { foodName: "메리골드 꽃 (마리골드)", contentPer100g: "루테인 농축 원천", portionTip: "전 세계 루테인 영양제의 99%가 메리골드 꽃에서 추출" },
      { foodName: "케일 / 시금치", contentPer100g: "22 mg", portionTip: "녹황색 채소 중 최고" },
      { foodName: "달걀 노른자", contentPer100g: "지아잔틴 우수", portionTip: "생체이용률이 채소보다 높음" }
    ],
    foodLimitationReason: "황반색소는 25세를 정점으로 지속 감소하며 체내에서 스스로 합성되지 않음. 매일 케일 3접시를 먹지 않는 이상 20mg을 채우기 어려움.",
    bestSupplementForm: {
      recommendedForm: "천연 메리골드 추출 미국 특허 원료 Lutemax 2020® 또는 FloraGLO® (자유형 Free Lutein)",
      inferiorFormWarning: "단순 루테인 단독 제제는 황반 중심부(지아잔틴) 보호가 결여되므로 반드시 지아잔틴 5:1 비율 확인",
      absorptionTip: "지용성이므로 오메가3(DHA)나 식사 직후 지방과 함께 복용 시 망막 흡수율 4배 증가"
    },
    targetDemographics: ["60대+ 노년기", "2030 청년", "4050 중년", "청소년/학생"],
    genders: ["공통"],
    seasons: ["사계절"],
    occupations: ["사무직/직장인", "수험생/학생"],
    targetOrgans: ["눈 건강"],
    deal: {
      brand: "Doctor's Best",
      productName: "Lutein with Lutemax 2020 20mg",
      spec: "180 소프트젤 / 6개월분",
      certification: "Lutemax 2020® 임상 특허, Non-GMO",
    }
  },
  {
    id: "phyto-astaxanthin",
    number: 52,
    name: "아스타잔틴 (Astaxanthin 12mg / 눈 모양체 피로 개선)",
    engName: "Astaxanthin (AstaReal 4~12mg)",
    category: "식물영양소 & 항산화제",
    symbolOrAbbr: "Astaxanthin",
    oneLineSummary: "비타민C의 6,000배 항산화력, 눈 조절 근육(모양체) 긴장 완화 및 초점 조절력 개선",
    dailyRDA: "4~12 mg (식약처 눈 피로 개선 기능성)",
    optimalIntake: "8~12 mg",
    deficiencySymptoms: ["모니터/스마트폰 작업 후 눈알이 빠질 듯한 안구 통증", "가까운 곳과 먼 곳을 볼 때 초점 전환 딜레이", "뇌혈관 장벽 손상", "피부 광노화"],
    foodSources: [
      { foodName: "헤마토코쿠스 미세조류", contentPer100g: "자연계 유일 최고 원천", portionTip: "붉은 다이아몬드로 불리는 원료" },
      { foodName: "자연산 붉은 연어 (Sockeye)", contentPer100g: "4 mg", portionTip: "연어가 물살을 거슬러 오르는 에너지원" },
      { foodName: "크릴 및 바닷가재 껍질", contentPer100g: "1.5 mg", portionTip: "붉은색 카로티노이드" }
    ],
    foodLimitationReason: "연어 1kg을 먹어야 아스타잔틴 겨우 4~5mg을 얻을 수 있으므로 음식으로는 임상적 눈 피로 개선 용량(12mg) 섭취 불가능.",
    bestSupplementForm: {
      recommendedForm: "세계 최고 임상 데이터를 보유한 오리지널 AstaReal® 또는 BioAstin® 하와이산 천연 추출물 12mg",
      inferiorFormWarning: "석유계 합성 아스타잔틴은 분자 구조가 달라 항산화력이 천연의 20분의 1 수준",
      absorptionTip: "루테인지아잔틴 및 오메가3와 함께 복용하는 것이 전 세계 안과의사들이 추천하는 '눈 영양 3대 트리오'"
    },
    targetDemographics: ["2030 청년", "4050 중년", "60대+ 노년기", "청소년/학생"],
    genders: ["공통"],
    seasons: ["사계절"],
    occupations: ["사무직/직장인", "수험생/학생"],
    targetOrgans: ["눈 건강", "피부 & 모발", "뇌 & 인지기능"],
    deal: {
      brand: "Sports Research",
      productName: "Astaxanthin 12mg with Organic Coconut MCT",
      spec: "120 식물성 소프트젤",
      certification: "AstaReal 원료, Non-GMO Verified, 글루텐 프리",
    }
  },
  {
    id: "phyto-silymarin",
    number: 53,
    name: "밀크씨슬 (실리마린 80% 표준화 / 간세포막 보호)",
    engName: "Milk Thistle (Silymarin 80% Phytosome)",
    category: "식물영양소 & 항산화제",
    symbolOrAbbr: "Silymarin",
    oneLineSummary: "간세포 외부 수용체 보호, 간내 글루타치온 수치 35% 상승, 알코올 독소 분해 가속",
    dailyRDA: "실리마린 130 mg (식약처 기준)",
    optimalIntake: "250~500 mg (파이토솜 제형)",
    deficiencySymptoms: ["만성 음주 및 과로 후 뻐근한 우상복부 불쾌감", "간 수치(AST/ALT/r-GTP) 상승", "자고 일어나도 풀리지 않는 극심한 피로감"],
    foodSources: [
      { foodName: "흰무늬엉겅퀴 (밀크씨슬 씨앗)", contentPer100g: "약용 식물", portionTip: "식품 형태로 섭취 불가, 추출물로만 이용" },
      { foodName: "아티초크 (Artichoke)", contentPer100g: "시나린 함유", portionTip: "담즙 분비 촉진 채소" },
      { foodName: "민들레 뿌리", contentPer100g: "타락사신", portionTip: "전통 간 보호 허브" }
    ],
    foodLimitationReason: "밀크씨슬은 씨앗 껍질에 단단히 결합되어 있어 차로 끓여 마시면 유효성분 실리마린이 거의 우러나오지 않음 (지용성 추출 공정 필수).",
    bestSupplementForm: {
      recommendedForm: "흡수율을 10배 높인 실리빈 파이토솜 (Siliphos®) 또는 실리마린 80% 표준화 추출물",
      inferiorFormWarning: "단순 원물 분말은 장 흡수율이 2% 미만으로 생체이용률 극히 저조",
      absorptionTip: "비타민 B군과 함께 식후 복용 시 간 해독 효소계 1, 2단계 완벽 연계"
    },
    targetDemographics: ["2030 청년", "4050 중년", "60대+ 노년기"],
    genders: ["남성", "공통"],
    seasons: ["사계절", "봄"],
    occupations: ["사무직/직장인", "교대근무/야간직"],
    targetOrgans: ["간 & 피로", "소화기 & 장"],
    deal: {
      brand: "California Gold Nutrition",
      productName: "Silymarin Complex (밀크씨슬 + 아티초크 + 민들레)",
      spec: "120 베지 캡슐",
      certification: "EuroMed 80% 표준화 오리지널 스페인 원료",
    }
  },
  {
    id: "phyto-curcumin",
    number: 54,
    name: "커큐민 (Curcumin C3 / BCM-95 / 파이토솜)",
    engName: "Curcumin (95% Curcuminoids with BioPerine)",
    category: "식물영양소 & 항산화제",
    symbolOrAbbr: "Curcumin",
    oneLineSummary: "염증 유발 인자 NF-κB 차단, 관절염 소염 진통, 뇌 아밀로이드 플라크 축적 억제",
    dailyRDA: "미설정",
    optimalIntake: "500~1,000 mg (고흡수 제형)",
    deficiencySymptoms: ["만성 관절염 욱신거림 및 부종", "체내 만성 저강도 염증(hs-CRP 상승)", "뇌 신경염증 및 인지 저하", "소화불량"],
    foodSources: [
      { foodName: "강황 가루 (카레)", contentPer100g: "커큐민 2~4% 함유", portionTip: "식품 속 강황 가루는 커큐민 함량이 낮고 장 흡수율이 1% 미만" },
      { foodName: "울금", contentPer100g: "뿌리줄기", portionTip: "한국산 울금" },
      { foodName: "생강", contentPer100g: "진저롤 동반", portionTip: "항염 시너지" }
    ],
    foodLimitationReason: "일반 카레 가루의 커큐민은 입자가 크고 지용성이어서 먹어도 대부분 대변으로 배설됨 (임상 효과를 보려면 매일 카레 30그릇 섭취 필요).",
    bestSupplementForm: {
      recommendedForm: "피페린 결합 Curcumin C3 Complex® + BioPerine® (흡수율 2,000% 증가) 또는 메리바(Meriva® 파이토솜)",
      inferiorFormWarning: "흡수 증진제가 없는 단순 강황 분말은 생체이용률이 극히 낮음",
      absorptionTip: "소염진통제 대신 관절염 통증 완화를 위해 식사 직후 복용"
    },
    targetDemographics: ["60대+ 노년기", "4050 중년", "2030 청년"],
    genders: ["공통"],
    seasons: ["겨울", "환절기", "사계절"],
    occupations: ["활동량 많은 직업/운동인", "사무직/직장인"],
    targetOrgans: ["관절 & 뼈", "뇌 & 인지기능", "장 건강"],
    deal: {
      brand: "Doctor's Best",
      productName: "High Absorption Curcumin with BioPerine 1000mg",
      spec: "120 타블렛 / Curcumin C3 특허",
      certification: "Curcumin C3 Complex 오리지널 특허",
    }
  },
  {
    id: "phyto-berberine",
    number: 55,
    name: "베르베린 (Berberine HCl 500mg / AMPK 활성화)",
    engName: "Berberine (Metabolic & Gut AMPK)",
    category: "식물영양소 & 항산화제",
    symbolOrAbbr: "Berberine",
    oneLineSummary: "천연 메트포르민으로 불리는 AMPK 대사 스위치 가동, 혈당 강하 및 장내 유해균 살균",
    dailyRDA: "미설정",
    optimalIntake: "500 mg 1일 2~3회 (식전)",
    deficiencySymptoms: ["공복 혈당 및 당화혈색소(HbA1c) 상승", "소장 내 세균 과증식(SIBO)으로 인한 복부 팽만", "내장지방 및 지방간"],
    foodSources: [
      { foodName: "황벽나무 / 매발톱나무 뿌리", contentPer100g: "생약 약재", portionTip: "전통 한방의 대표적인 쓴맛 항균 약재" },
      { foodName: "골든씰 (Goldenseal)", contentPer100g: "베르베린 함유", portionTip: "북미 원주민 허브" }
    ],
    foodLimitationReason: "일반 밥상 식품에는 전혀 존재하지 않는 약용 알칼로이드 성분.",
    bestSupplementForm: {
      recommendedForm: "고순도 염산베르베린 (Berberine Hydrochloride 500mg)",
      inferiorFormWarning: "임산부나 수유부는 복용 금기이며, 혈당 강하제와 병용 시 저혈당 주의",
      absorptionTip: "탄수화물 식사 15~20분 전 복용 시 식후 혈당 급상승을 막고 지방 합성 억제"
    },
    targetDemographics: ["4050 중년", "60대+ 노년기", "2030 청년"],
    genders: ["공통"],
    seasons: ["사계절"],
    occupations: ["사무직/직장인"],
    targetOrgans: ["심혈관 & 혈액순환", "장 건강", "간 & 피로"],
    deal: {
      brand: "Thorne",
      productName: "Berberine 500mg (최고 순도)",
      spec: "60 캡슐",
      certification: "NSF GMP, 고순도 표준화 추출",
    }
  },
  {
    id: "phyto-quercetin",
    number: 56,
    name: "케르세틴 (Quercetin / 아연 이온수송체 & 비염 완화)",
    engName: "Quercetin (Zinc Ionophore & Allergy Shield)",
    category: "식물영양소 & 항산화제",
    symbolOrAbbr: "Quercetin",
    oneLineSummary: "비만세포 히스타민 분비 차단(환절기 비염 개선), 아연을 세포막 안으로 운반하는 이오노포어",
    dailyRDA: "미설정",
    optimalIntake: "500~1,000 mg (파이토솜 또는 브로멜라인 복합)",
    deficiencySymptoms: ["환절기 재채기/콧물/가려움 비염 증세", "아토피 및 두드러기 등 알레르기 과민 반응", "바이러스 복제 억제력 저하"],
    foodSources: [
      { foodName: "적양파 (껍질 부위)", contentPer100g: "30 mg", portionTip: "양파의 가장 바깥 껍질에 케르세틴의 90% 집중" },
      { foodName: "사과 (껍질째)", contentPer100g: "4.5 mg", portionTip: "플라보노이드 섭취" },
      { foodName: "케이퍼 (Capers)", contentPer100g: "180 mg", portionTip: "식품 중 가장 높은 케르세틴 밀도" }
    ],
    foodLimitationReason: "양파 알맹이에는 케르세틴이 적고 껍질은 질겨서 버려지므로, 양파 껍질 차나 보충제 없이는 충분한 항알레르기 용량 섭취가 불가능.",
    bestSupplementForm: {
      recommendedForm: "단백분해효소 브로멜라인(Bromelain) 결합형 케르세틴 또는 파이토솜 제형",
      inferiorFormWarning: "단순 무수물 케르세틴은 물에 녹지 않아 장 흡수율이 2% 미만",
      absorptionTip: "비타민 C 및 아연과 함께 복용 시 호흡기 바이러스 방어선 구축"
    },
    targetDemographics: ["2030 청년", "청소년/학생", "4050 중년", "60대+ 노년기"],
    genders: ["공통"],
    seasons: ["봄", "환절기", "가을"],
    occupations: ["사무직/직장인", "수험생/학생"],
    targetOrgans: ["면역 & 호흡기", "피부 & 모발"],
    deal: {
      brand: "NOW Foods",
      productName: "Quercetin with Bromelain (환절기 비염 추천)",
      spec: "120 베지 캡슐",
      certification: "Non-GMO, GMP 품질 보증",
    }
  },
  {
    id: "phyto-resveratrol",
    number: 57,
    name: "트랜스-레스베라트롤 (Trans-Resveratrol 500mg / 시르투인 장수 유전자)",
    engName: "Trans-Resveratrol (Sirtuin Longevity)",
    category: "식물영양소 & 항산화제",
    symbolOrAbbr: "Resveratrol",
    oneLineSummary: "장수 유전자 시르투인(SIRT1) 활성화, 혈관 내피 보호, 항노화 오토파지 유도",
    dailyRDA: "미설정",
    optimalIntake: "250~500 mg (트랜스 활성형)",
    deficiencySymptoms: ["혈관 탄력성 저하 및 노화 가속", "세포 DNA 손상 축적", "만성 염증"],
    foodSources: [
      { foodName: "적포도주 (레드와인)", contentPer1L: "1~5 mg", portionTip: "레스베라트롤 250mg 섭취를 위해선 와인 100병을 마셔야 하므로 알코올 간 손상 유발" },
      { foodName: "호장근 (Japanese Knotweed)", contentPer100g: "트랜스-레스베라트롤 원천", portionTip: "보충제 표준화 원료" },
      { foodName: "블루베리", contentPer100g: "소량 함유", portionTip: "항산화 베리" }
    ],
    foodLimitationReason: "와인이나 포도 껍질의 레스베라트롤은 미량에 불과하며, 빛과 열에 의해 쉽게 비활성 시스(cis) 형태로 전환됨.",
    bestSupplementForm: {
      recommendedForm: "미분화(Micronized) 99% 순수 트랜스-레스베라트롤 500mg",
      inferiorFormWarning: "cis-레스베라트롤은 SIRT1 장수 유전자 활성 능력이 없음",
      absorptionTip: "NMN 또는 NAD+ 전구체, 올리브유와 함께 아침 식후 복용 시 세포 항노화 시너지"
    },
    targetDemographics: ["60대+ 노년기", "4050 중년"],
    genders: ["공통"],
    seasons: ["사계절"],
    occupations: ["사무직/직장인"],
    targetOrgans: ["심혈관 & 혈액순환", "뇌 & 인지기능"],
    deal: {
      brand: "ProHealth Longevity",
      productName: "Micronized Trans-Resveratrol 500mg",
      spec: "60 캡슐 / 미분화 고흡수",
      certification: "제3자 순도 99% 검증, 미국 제조",
    }
  }
];
