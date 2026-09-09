import { NutrientItem } from "../types";

export const vitaminsList: NutrientItem[] = [
  {
    id: "vit-a",
    number: 1,
    name: "비타민 A (레티놀 / 베타카로틴)",
    engName: "Vitamin A (Retinol & Beta-Carotene)",
    category: "비타민 (Vitamins)",
    symbolOrAbbr: "Vit A",
    oneLineSummary: "야간 시력 보호, 망막 로돕신 합성 및 안구 표면 점막 항상성 유지",
    dailyRDA: "700~800 μg RAE",
    optimalIntake: "1,000~1,500 μg RAE",
    deficiencySymptoms: ["야맹증 (어두운 곳 적응 장애)", "안구건조증 및 각막 연화", "피부 건조 및 모낭 각화증", "호흡기 점막 면역 저하"],
    foodSources: [
      { foodName: "소간 / 닭간", contentPer100g: "9,000 μg", portionTip: "비타민A 레티놀 함량이 매우 높아 주 1회 소량 섭취" },
      { foodName: "당근 (기름에 조리)", contentPer100g: "835 μg", portionTip: "지용성이므로 올리브유에 볶아 흡수율 5배 증가" },
      { foodName: "시금치", contentPer100g: "469 μg", portionTip: "살짝 데쳐 참기름과 버무릴 때 카로티노이드 흡수 최적화" }
    ],
    foodLimitationReason: "당근의 베타카로틴은 장내 흡수 후 비타민A로의 전환율이 개인 유전체(BCMO1 효소)에 따라 최대 50% 이상 낮을 수 있음.",
    bestSupplementForm: {
      recommendedForm: "식물성 베타카로틴 50% + 레티닐 팔미테이트 50% 복합제",
      inferiorFormWarning: "흡연자의 경우 고함량 합성 베타카로틴 단독 제제 과다 섭취 주의",
      absorptionTip: "지용성이므로 반드시 지방이 포함된 식사 직후 복용"
    },
    targetDemographics: ["60대+ 노년기", "2030 청년", "청소년/학생"],
    genders: ["공통"],
    seasons: ["가을", "겨울", "사계절"],
    occupations: ["사무직/직장인", "수험생/학생"],
    targetOrgans: ["눈 건강", "피부 & 모발", "면역 & 호흡기"],
    deal: {
      brand: "Now Foods",
      productName: "Natural Beta-Carotene 25,000 IU",
      spec: "소프트젤 180정 / 6개월분",
      certification: "GMP 품질인증, Non-GMO",
    }
  },
  {
    id: "vit-b1",
    number: 2,
    name: "비타민 B1 (티아민 / 벤포티아민)",
    engName: "Vitamin B1 (Thiamine / Benfotiamine)",
    category: "비타민 (Vitamins)",
    symbolOrAbbr: "Vit B1",
    oneLineSummary: "탄수화물 대사 핵심 조효소, 뇌 신경전달물질 생성 및 젖산 축적 억제",
    dailyRDA: "1.2 mg",
    optimalIntake: "50~100 mg (활성형)",
    deficiencySymptoms: ["만성 피로 및 무기력감", "말초신경 저림 및 다리 쥐남", "기억력 감퇴 및 뇌 피로", "식욕부진 및 소화불량"],
    foodSources: [
      { foodName: "돼지고기 안심/뒷다리", contentPer100g: "0.95 mg", portionTip: "육류 중 티아민 함량이 압도적으로 높아 주 2~3회 추천" },
      { foodName: "현미 및 배아미", contentPer100g: "0.40 mg", portionTip: "백미 도정 시 티아민의 80%가 소실되므로 잡곡밥 권장" },
      { foodName: "해바라기씨", contentPer100g: "1.48 mg", portionTip: "하루 한 줌 섭취 시 훌륭한 티아민 공급원" }
    ],
    foodLimitationReason: "열과 조리에 매우 취약하여 가열 조리 시 50% 이상 파괴되며, 알코올 섭취나 탄수화물 과다 식단 시 급속도로 고갈됨.",
    bestSupplementForm: {
      recommendedForm: "지용성 활성형 벤포티아민 (Benfotiamine) 또는 푸르설티아민",
      inferiorFormWarning: "일반 티아민염산염(수용성)은 장내 흡수율이 낮고 생체이용률 한계",
      absorptionTip: "흡수율이 뛰어난 벤포티아민은 뇌혈관장벽(BBB) 및 말초신경 도달률이 수용성 대비 최대 5배 높음"
    },
    targetDemographics: ["2030 청년", "4050 중년", "60대+ 노년기"],
    genders: ["공통", "남성"],
    seasons: ["봄", "사계절"],
    occupations: ["사무직/직장인", "활동량 많은 직업/운동인"],
    targetOrgans: ["간 & 피로", "뇌 & 인지기능"],
    deal: {
      brand: "Doctor's Best",
      productName: "Best Benfotiamine 300mg",
      spec: "식물성 캡슐 60정",
      certification: "Non-GMO, Gluten Free",
    }
  },
  {
    id: "vit-b2",
    number: 3,
    name: "비타민 B2 (리보플라빈 / FMN)",
    engName: "Vitamin B2 (Riboflavin / R-5-P)",
    category: "비타민 (Vitamins)",
    symbolOrAbbr: "Vit B2",
    oneLineSummary: "체내 세포 호흡, 구내염 예방, 항산화 글루타치온 재생 조효소",
    dailyRDA: "1.5 mg",
    optimalIntake: "25~50 mg",
    deficiencySymptoms: ["구각염 / 구내염 / 설염", "눈 충혈 및 광선 공포증", "지루성 피부염", "피로감"],
    foodSources: [
      { foodName: "소간 / 우유 / 그릭 요거트", contentPer100g: "0.35 mg", portionTip: "우유는 자외선 노출 시 B2가 파괴되므로 차광 보관 필수" },
      { foodName: "달걀", contentPer100g: "0.45 mg", portionTip: "완전 단백질과 함께 흡수 최적화" },
      { foodName: "양송이 버섯", contentPer100g: "0.40 mg", portionTip: "살짝 볶아 채식 식단에 활용" }
    ],
    foodLimitationReason: "빛(자외선)에 즉각 분해되며, 스트레스 및 음주 시 소변으로 빠른 배출 발생.",
    bestSupplementForm: {
      recommendedForm: "활성형 리보플라빈 5-인산 (Riboflavin-5-Phosphate)",
      inferiorFormWarning: "일반 리보플라빈도 흡수는 양호하나 간 기능 저하자에게 활성형이 유리",
      absorptionTip: "식사 중 또는 식후 섭취 권장. 소변이 노랗게 변하는 것은 자연스러운 배출 현상"
    },
    targetDemographics: ["청소년/학생", "2030 청년", "4050 중년"],
    genders: ["공통"],
    seasons: ["사계절"],
    occupations: ["사무직/직장인", "수험생/학생"],
    targetOrgans: ["간 & 피로", "피부 & 모발", "눈 건강"],
    deal: {
      brand: "Thorne",
      productName: "Riboflavin 5'-Phosphate",
      spec: "캡슐 60정",
      certification: "NSF Certified, 의사 처방급",
    }
  },
  {
    id: "vit-b3",
    number: 4,
    name: "비타민 B3 (나이아신 / 니코틴아미드)",
    engName: "Vitamin B3 (Niacin / Nicotinamide)",
    category: "비타민 (Vitamins)",
    symbolOrAbbr: "Vit B3",
    oneLineSummary: "NAD+ 전구체, 세포 DNA 복구, 콜레스테롤 대사 및 지질 개선",
    dailyRDA: "16 mg NE",
    optimalIntake: "50~250 mg",
    deficiencySymptoms: ["피부 거칠어짐 및 펠라그라", "소화기 점막 염증 및 설사", "우울증, 불면, 두통", "만성 권태"],
    foodSources: [
      { foodName: "닭가슴살", contentPer100g: "12 mg", portionTip: "고단백 저지방 훌륭한 나이아신 공급원" },
      { foodName: "참치 / 연어", contentPer100g: "10 mg", portionTip: "오메가3와 나이아신 동시 보충" },
      { foodName: "땅콩", contentPer100g: "14 mg", portionTip: "소량 섭취로 높은 나이아신 공급" }
    ],
    foodLimitationReason: "옥수수 위주의 탄수화물 식단 시 트립토판으로부터 나이아신 합성률이 60분의 1로 급감.",
    bestSupplementForm: {
      recommendedForm: "플러시(얼굴 홍조) 없는 나이아신아마이드(Nicotinamide) 또는 이노시톨 헥사니코티네이트",
      inferiorFormWarning: "순수 니코틴산은 복용 후 일시적 안면 홍조 및 따가움 유발 가능",
      absorptionTip: "혈관 확장이 필요한 경우 니코틴산, 데일리 피로 개선은 나이아신아마이드 선택"
    },
    targetDemographics: ["4050 중년", "60대+ 노년기"],
    genders: ["공통"],
    seasons: ["사계절"],
    occupations: ["사무직/직장인"],
    targetOrgans: ["심혈관 & 혈액순환", "간 & 피로", "뇌 & 인지기능"],
    deal: {
      brand: "Life Extension",
      productName: "No-Flush Niacin 640mg",
      spec: "캡슐 100정",
      certification: "GMP 인증, Non-GMO",
    }
  },
  {
    id: "vit-b5",
    number: 5,
    name: "비타민 B5 (판토텐산)",
    engName: "Vitamin B5 (Pantothenic Acid)",
    category: "비타민 (Vitamins)",
    symbolOrAbbr: "Vit B5",
    oneLineSummary: "코엔자임 A(CoA) 핵심 구성체, 부신 피로 회복 호르몬 합성 및 피지 조절",
    dailyRDA: "5 mg",
    optimalIntake: "100~500 mg",
    deficiencySymptoms: ["부신 피로 증후군 및 아침 기상 곤란", "피지 과다 분비 및 성인 여드름", "손발 저림 ('타는 듯한 발')", "면역 항체 생성 저하"],
    foodSources: [
      { foodName: "아보카도", contentPer100g: "1.4 mg", portionTip: "단일불포화지방과 함께 B5 흡수 촉진" },
      { foodName: "달걀 노른자", contentPer100g: "3.7 mg", portionTip: "노른자에 판토텐산 및 콜린 집중" },
      { foodName: "표고버섯", contentPer100g: "3.6 mg", portionTip: "건표고 우린 물과 함께 요리에 활용" }
    ],
    foodLimitationReason: "가공식품 섭취 시 식품 가공 및 통조림 공정에서 50~70% 파괴됨.",
    bestSupplementForm: {
      recommendedForm: "판테틴(Pantethine) - 심혈관 지질 대사에 최고 활성형 / 칼슘 D-판토테네이트",
      inferiorFormWarning: "단순 복합제 속 저함량(5mg 미만)은 피지 조절 및 부신 케어에 부족",
      absorptionTip: "스트레스가 극심한 직장인의 경우 판테틴 300mg 이상 복용 시 효과 체감"
    },
    targetDemographics: ["2030 청년", "4050 중년"],
    genders: ["공통"],
    seasons: ["사계절"],
    occupations: ["사무직/직장인", "교대근무/야간직"],
    targetOrgans: ["간 & 피로", "피부 & 모발"],
    deal: {
      brand: "Jarrow Formulas",
      productName: "Pantothenic Acid B5 500mg",
      spec: "식물성 캡슐 100정",
      certification: "Non-GMO Project Verified",
    }
  },
  {
    id: "vit-b6",
    number: 6,
    name: "비타민 B6 (피리독살-5-인산 / P-5-P)",
    engName: "Vitamin B6 (P-5-P)",
    category: "비타민 (Vitamins)",
    symbolOrAbbr: "Vit B6",
    oneLineSummary: "혈관 손상 독소 호모시스테인 제거, 세로토닌/도파민/GABA 합성 핵심",
    dailyRDA: "1.5 mg",
    optimalIntake: "25~50 mg",
    deficiencySymptoms: ["호모시스테인 상승에 따른 동맥경화 위험", "불면증 및 신경 과민, 우울감", "PMS(생리전증후군) 부종 및 기복", "말초 신경염"],
    foodSources: [
      { foodName: "바나나", contentPer100g: "0.37 mg", portionTip: "트립토판과 함께 수면 유도 간식" },
      { foodName: "연어 및 참치", contentPer100g: "0.80 mg", portionTip: "단백질 대사와 동시에 공급" },
      { foodName: "감자 (껍질째)", contentPer100g: "0.30 mg", portionTip: "껍질 근처에 B6 풍부" }
    ],
    foodLimitationReason: "고단백 다이어트 시 B6 요구량이 2배 이상 급증하며, 가열 및 냉동 보관 시 쉽게 소실됨.",
    bestSupplementForm: {
      recommendedForm: "활성형 P-5-P (Pyridoxal-5-Phosphate)",
      inferiorFormWarning: "비활성 피리독신염산염의 고용량(200mg 이상 장기복용)은 신경독성 유발 가능",
      absorptionTip: "마그네슘과 1:1로 함께 복용 시 신경 안정 및 PMS 완화 시너지 극대화"
    },
    targetDemographics: ["2030 청년", "4050 중년", "60대+ 노년기"],
    genders: ["여성", "공통"],
    seasons: ["사계절"],
    occupations: ["사무직/직장인", "수험생/학생"],
    targetOrgans: ["뇌 & 인지기능", "심혈관 & 혈액순환", "간 & 피로"],
    deal: {
      brand: "Country Life",
      productName: "P-5-P (Pyridoxal-5'-Phosphate) 50mg",
      spec: "100정",
      certification: "글루텐프리, 비건 인증",
    }
  },
  {
    id: "vit-b7",
    number: 7,
    name: "비타민 B7 (비오틴)",
    engName: "Vitamin B7 (Biotin)",
    category: "비타민 (Vitamins)",
    symbolOrAbbr: "Vit B7",
    oneLineSummary: "케라틴 단백질 합성 촉진, 모발 굵기 개선, 손발톱 깨짐 방지",
    dailyRDA: "30 μg",
    optimalIntake: "2,500~5,000 μg",
    deficiencySymptoms: ["탈모 및 모발 가늘어짐", "손발톱 부스러짐 및 갈라짐", "피부 건조 및 발진", "만성 피로"],
    foodSources: [
      { foodName: "익힌 달걀 노른자", contentPer100g: "25 μg", portionTip: "날달걀 흰자의 아비딘은 비오틴 흡수를 방해하므로 완숙 추천" },
      { foodName: "호두 및 아몬드", contentPer100g: "30 μg", portionTip: "식물성 지방과 함께 섭취" },
      { foodName: "귀리", contentPer100g: "20 μg", portionTip: "아침 오트밀 식단 활용" }
    ],
    foodLimitationReason: "장내 유익균이 일부 합성하나, 항생제 복용이나 장내 균총 불균형 시 체내 비오틴 고갈.",
    bestSupplementForm: {
      recommendedForm: "고함량 d-비오틴 5,000 mcg + 아연 + 맥주효모 복합제",
      inferiorFormWarning: "단일 10,000mcg 초고함량은 일부 피지 폭발(여드름) 유발할 수 있으므로 판토텐산과 균형 필요",
      absorptionTip: "모발 성장을 위해 판토텐산(B5)과 함께 복용할 때 상호 흡수 억제를 피하기 위해 아침/저녁 분할 권장"
    },
    targetDemographics: ["2030 청년", "4050 중년", "60대+ 노년기"],
    genders: ["공통"],
    seasons: ["가을", "겨울", "사계절"],
    occupations: ["사무직/직장인"],
    targetOrgans: ["피부 & 모발"],
    deal: {
      brand: "Natrol",
      productName: "Biotin Maximum Strength 10,000mcg",
      spec: "100정 딸기맛 패스트디졸브",
      certification: "100% 식물성, GMP 인증",
    }
  },
  {
    id: "vit-b9",
    number: 8,
    name: "비타민 B9 (활성형 엽산 / 5-MTHF)",
    engName: "Vitamin B9 (L-Methylfolate / 5-MTHF)",
    category: "비타민 (Vitamins)",
    symbolOrAbbr: "Vit B9",
    oneLineSummary: "태아 신경관 발달, 적혈구 조혈 작용, 심혈관 위험인자 호모시스테인 분해",
    dailyRDA: "400 μg DFE",
    optimalIntake: "800~1,000 μg (5-MTHF)",
    deficiencySymptoms: ["임신 초기 태아 기형 위험", "거대적아구성 빈혈 (적혈구 비정상 크기)", "호모시스테인 증가로 인한 혈전/심근경색 위험", "만성 우울 및 인지 저하"],
    foodSources: [
      { foodName: "시금치 및 케일", contentPer100g: "194 μg", portionTip: "녹색 잎채소의 대표 영양소이나 가열 시 60% 이상 파괴" },
      { foodName: "아스파라거스", contentPer100g: "149 μg", portionTip: "살짝 쪄서 올리브유와 함께" },
      { foodName: "브로콜리", contentPer100g: "108 μg", portionTip: "항산화 설포라판과 동시 섭취" }
    ],
    foodLimitationReason: "한국인의 약 60~70%가 MTHFR 유전자 변이(C677T)를 보유하여 일반 합성 엽산(Folic Acid)을 활성형으로 변환하지 못함.",
    bestSupplementForm: {
      recommendedForm: "4세대 특허 활성형 5-MTHF (Quatrefolic® 또는 Magnafolate-C®)",
      inferiorFormWarning: "합성 Folic Acid는 비변환 시 체내 미대사 엽산(UMFA)으로 축적되어 면역 세포 억제 논란",
      absorptionTip: "비타민 B12(메틸코발라민)와 반드시 짝지어 복용해야 빈혈 마스킹 및 호모시스테인 제거 완성"
    },
    targetDemographics: ["2030 청년", "4050 중년", "60대+ 노년기"],
    genders: ["여성", "공통"],
    seasons: ["사계절"],
    occupations: ["사무직/직장인"],
    targetOrgans: ["심혈관 & 혈액순환", "뇌 & 인지기능"],
    deal: {
      brand: "Doctor's Best",
      productName: "Fully Active Folate with Quatrefolic 400mcg",
      spec: "식물성 캡슐 90정",
      certification: "Quatrefolic 특허 인증, Non-GMO",
    }
  },
  {
    id: "vit-b12",
    number: 9,
    name: "비타민 B12 (메틸코발라민 / 활성형)",
    engName: "Vitamin B12 (Methylcobalamin)",
    category: "비타민 (Vitamins)",
    symbolOrAbbr: "Vit B12",
    oneLineSummary: "노년기 인지기능 보호, 신경 수초 재생, 빈혈 방지 및 뇌신경 전달 최적화",
    dailyRDA: "2.4 μg",
    optimalIntake: "1,000~2,500 μg (노년기 및 위장장애 시)",
    deficiencySymptoms: ["노년기 치매 유사 기억력 감퇴 및 브레인 포그", "손발 끝 찌릿한 말초 신경통", "악성 빈혈 및 극심한 피로", "혀의 통증 (설염)"],
    foodSources: [
      { foodName: "조개류 (바지락, 홍합)", contentPer100g: "98 μg", portionTip: "자연계 최고의 B12 공급원" },
      { foodName: "소간 / 쇠고기", contentPer100g: "60 μg", portionTip: "동물성 식품에만 존재하므로 채식주의자 결핍 1순위" },
      { foodName: "연어 / 고등어", contentPer100g: "18 μg", portionTip: "오메가3와 함께 뇌신경 보호 시너지" }
    ],
    foodLimitationReason: "위산과 위벽에서 분비되는 '내인자(Intrinsic Factor)'가 있어야 흡수되는데, 60대 이상 노년층은 위산 분비 저하로 음식 속 B12 흡수율이 90% 이상 급감함.",
    bestSupplementForm: {
      recommendedForm: "설하정(Sublingual) 형태의 활성형 메틸코발라민 (Methylcobalamin)",
      inferiorFormWarning: "시아노코발라민(합성형)은 미량의 시안화물(청산염) 분해 과정을 거치며 신장 환자 비추천",
      absorptionTip: "침으로 혀 밑에서 녹여 점막으로 바로 흡수시키는 설하정은 위산/내인자 없이 직접 혈관으로 침투하므로 노년기 필수"
    },
    targetDemographics: ["60대+ 노년기", "4050 중년"],
    genders: ["공통"],
    seasons: ["사계절"],
    occupations: ["사무직/직장인", "교대근무/야간직"],
    targetOrgans: ["뇌 & 인지기능", "간 & 피로", "심혈관 & 혈액순환"],
    deal: {
      brand: "Jarrow Formulas",
      productName: "Methyl B-12 1,000mcg (체리맛 설하정)",
      spec: "100정",
      certification: "의사 추천 1위, 설하정 흡수 특허",
    }
  },
  {
    id: "vit-c",
    number: 10,
    name: "비타민 C (아스코르브산 / 리포좀 제형)",
    engName: "Vitamin C (Ascorbic Acid / Liposomal)",
    category: "비타민 (Vitamins)",
    symbolOrAbbr: "Vit C",
    oneLineSummary: "강력한 항산화 작용, 콜라겐 합성 필수 조효소, 면역 NK세포 활성화",
    dailyRDA: "100 mg",
    optimalIntake: "1,000~3,000 mg (메가도스 6,000mg)",
    deficiencySymptoms: ["잇몸 출혈 및 쉽게 멍듦", "콜라겐 붕괴로 인한 피부 탄력 저하", "면역력 저하 및 잦은 감기", "만성 산화 스트레스 및 피로"],
    foodSources: [
      { foodName: "파프리카 (노랑/빨강)", contentPer100g: "180 mg", portionTip: "레몬의 3배 함유, 생으로 먹을 때 비타민C 보존" },
      { foodName: "키위 (골드키위)", contentPer100g: "105 mg", portionTip: "식후 디저트로 소화효소 액티니딘과 동시 섭취" },
      { foodName: "브로콜리 / 딸기", contentPer100g: "80 mg", portionTip: "열에 파괴되므로 최소한의 가열 권장" }
    ],
    foodLimitationReason: "체내 반감기가 2~3시간에 불과하여 음식으로 한 번 섭취해도 혈중 농도가 금세 바닥나며, 스트레스·흡연 시 폭발적으로 소모됨.",
    bestSupplementForm: {
      recommendedForm: "리포좀 비타민 C (Liposomal Vitamin C) 또는 에스터-C(Ester-C, 중성형)",
      inferiorFormWarning: "일반 고함량 아스코르브산은 공복 복용 시 속 쓰림 및 위장 장애 유발",
      absorptionTip: "리포좀 제형은 인지질 이중막으로 감싸 세포막 직접 투과율이 일반 비타민C의 최대 6배에 달함"
    },
    targetDemographics: ["60대+ 노년기", "2030 청년", "4050 중년", "청소년/학생"],
    genders: ["공통"],
    seasons: ["봄", "환절기", "겨울", "사계절"],
    occupations: ["사무직/직장인", "활동량 많은 직업/운동인"],
    targetOrgans: ["면역 & 호흡기", "피부 & 모발", "간 & 피로"],
    deal: {
      brand: "California Gold Nutrition",
      productName: "Gold C 1,000mg USP급 비타민C",
      spec: "베지 캡슐 240정 / 8개월분",
      certification: "USP Grade 인증, 3단계 독립 테스트",
    }
  },
  {
    id: "vit-d3",
    number: 11,
    name: "비타민 D3 (콜레칼시페롤 / 5,000 IU)",
    engName: "Vitamin D3 (Cholecalciferol)",
    category: "비타민 (Vitamins)",
    symbolOrAbbr: "Vit D3",
    oneLineSummary: "칼슘 흡수 촉진, 골다공증 및 골절 예방, 선천 면역 펩타이드(카텔리시딘) 생성",
    dailyRDA: "400~800 IU",
    optimalIntake: "2,000~5,000 IU (혈중 농도 40~60 ng/mL 목표)",
    deficiencySymptoms: ["골연화증 및 노년기 골밀도 급감", "잦은 호흡기 감염 및 면역 붕괴", "계절성 우울증 및 무기력증", "자가면역 질환 위험 증가"],
    foodSources: [
      { foodName: "자연산 연어 / 청어", contentPer100g: "600~1,000 IU", portionTip: "생선 기름에 자연 용해되어 흡수율 우수" },
      { foodName: "햇볕에 말린 표고버섯", contentPer100g: "400 IU", portionTip: "식물성 D2 형태이므로 체내 활성도는 D3보다 다소 낮음" },
      { foodName: "달걀 노른자 (방사 유정란)", contentPer100g: "80 IU", portionTip: "비타민A와 함께 지용성 영양소 공급" }
    ],
    foodLimitationReason: "음식만으로는 하루 2,000IU 이상 충족이 불가능(연어 매일 500g 섭취 필요)하며, 한국인 90% 이상이 실내 생활로 햇볕 합성 결핍.",
    bestSupplementForm: {
      recommendedForm: "올리브유/MCT오일에 용해된 액상 드롭 또는 소프트젤 비타민 D3 + K2(MK-7) 병용",
      inferiorFormWarning: "식물성 에르고칼시페롤(D2)은 체내 혈중 농도 유지력이 D3의 3분의 1 수준",
      absorptionTip: "반드시 지방이 풍부한 식사 중간이나 직후 복용 시 흡수율 50% 이상 상승"
    },
    targetDemographics: ["60대+ 노년기", "2030 청년", "4050 중년", "청소년/학생"],
    genders: ["공통", "여성"],
    seasons: ["겨울", "가을", "사계절"],
    occupations: ["사무직/직장인", "수험생/학생"],
    targetOrgans: ["관절 & 뼈", "면역 & 호흡기", "뇌 & 인지기능"],
    deal: {
      brand: "Sports Research",
      productName: "Vitamin D3 5000 IU with Coconut MCT Oil",
      spec: "360 소프트젤 / 1년분",
      certification: "Non-GMO Verified, 코코넛 오일 기유",
    }
  },
  {
    id: "vit-k2",
    number: 12,
    name: "비타민 K2 (메나퀴논-7 / MK-7)",
    engName: "Vitamin K2 (Menaquinone-7 / MK-7)",
    category: "비타민 (Vitamins)",
    symbolOrAbbr: "Vit K2-MK7",
    oneLineSummary: "칼슘을 뼈로 보내고 혈관 석회화(동맥경화)를 차단하는 뼈-혈관 신호수",
    dailyRDA: "90~120 μg",
    optimalIntake: "100~200 μg (MK-7)",
    deficiencySymptoms: ["칼슘의 역설 (뼈는 비고 혈관은 석회화됨)", "심근경색 및 뇌졸중 위험 증가", "골절 위험 및 골밀도 소실", "치아 상아질 약화"],
    foodSources: [
      { foodName: "일본 전통 낫토 (Natto)", contentPer100g: "900 μg", portionTip: "자연계 압도적 1위의 MK-7 천연 발효 공급원" },
      { foodName: "목초 사육 하드 치즈 (고다치즈)", contentPer100g: "75 μg", portionTip: "발효 과정에서 생성된 천연 K2 함유" },
      { foodName: "방목 달걀 노른자", contentPer100g: "15 μg", portionTip: "MK-4 형태 다수 함유" }
    ],
    foodLimitationReason: "한국인의 일반 식단(김치, 쌀밥, 찌개)에는 낫토나 숙성 하드 치즈가 없어 K2 결핍률이 매우 높음 (시금치의 K1은 혈액응고용이며 뼈로 잘 가지 않음).",
    bestSupplementForm: {
      recommendedForm: "천연 바실러스 나토 추출 MenaQ7® 또는 all-trans MK-7",
      inferiorFormWarning: "합성 cis-이성질체 혼합물은 체내 수용체 결합력이 크게 떨어짐",
      absorptionTip: "비타민 D3와 함께 복용 시 골형성 단백질(오스테오칼신)이 생성-활성화되는 완벽한 듀오"
    },
    targetDemographics: ["60대+ 노년기", "4050 중년"],
    genders: ["여성", "공통"],
    seasons: ["사계절"],
    occupations: ["사무직/직장인"],
    targetOrgans: ["관절 & 뼈", "심혈관 & 혈액순환"],
    deal: {
      brand: "Doctor's Best",
      productName: "Natural Vitamin K2 MK-7 with MenaQ7 100mcg",
      spec: "베지 캡슐 60정",
      certification: "MenaQ7 오리지널 특허 원료, 임상 검증",
    }
  },
  {
    id: "vit-e",
    number: 13,
    name: "비타민 E (d-알파-토코페롤 + 복합 토코트리에놀)",
    engName: "Vitamin E (Mixed Tocopherols & Tocotrienols)",
    category: "비타민 (Vitamins)",
    symbolOrAbbr: "Vit E",
    oneLineSummary: "세포막 지질 과산화 억제, 혈전 방지, 피부 노화 방어 강력 지용성 항산화제",
    dailyRDA: "12 mg α-TE (18 IU)",
    optimalIntake: "200~400 IU (혼합 토코페롤)",
    deficiencySymptoms: ["적혈구 용혈성 빈혈", "신경 반사 저하 및 보행 실조", "피부 탄력 저하 및 검버섯 증가", "혈관 내피세포 산화 손상"],
    foodSources: [
      { foodName: "해바라기씨유 / 아몬드", contentPer100g: "26 mg", portionTip: "하루 23알 아몬드로 비타민E 절반 충족" },
      { foodName: "맥아유 (Wheat Germ Oil)", contentPer100g: "150 mg", portionTip: "식물성 오일 중 가장 농축된 비타민E" },
      { foodName: "아보카도", contentPer100g: "2.1 mg", portionTip: "혈관 보호에 좋은 단일불포화지방 동반" }
    ],
    foodLimitationReason: "산패된 기름이나 튀김 섭취 시 오히려 체내 비타민E가 급속히 고갈되며, 가공 및 정제 과정에서 소실률 80%.",
    bestSupplementForm: {
      recommendedForm: "천연 d-알파 + 감마/델타 혼합 토코페롤 및 아나토 추출 토코트리에놀",
      inferiorFormWarning: "합성 dl-알파-토코페롤은 석유계 추출물로 체내 보유 시간이 천연의 절반에 불과",
      absorptionTip: "비타민 C와 함께 복용 시 산화된 비타민 E가 비타민 C에 의해 다시 환원되어 재생 사이클 형성"
    },
    targetDemographics: ["4050 중년", "60대+ 노년기"],
    genders: ["공통"],
    seasons: ["사계절"],
    occupations: ["사무직/직장인"],
    targetOrgans: ["심혈관 & 혈액순환", "피부 & 모발", "뇌 & 인지기능"],
    deal: {
      brand: "Now Foods",
      productName: "Advanced Gamma E Complex",
      spec: "소프트젤 120정",
      certification: "천연 토코페롤 전종 함유, Non-GMO",
    }
  },
  {
    id: "vit-k1",
    number: 14,
    name: "비타민 K1 (필로퀴논)",
    engName: "Vitamin K1 (Phylloquinone)",
    category: "비타민 (Vitamins)",
    symbolOrAbbr: "Vit K1",
    oneLineSummary: "간에서 혈액 응고 인자(프로트롬빈 등) 합성 필수 영양소",
    dailyRDA: "65~75 μg",
    optimalIntake: "100~150 μg",
    deficiencySymptoms: ["지혈 지연 및 피하 출혈", "비출혈(코피) 잦음", "상처 회복 속도 저하"],
    foodSources: [
      { foodName: "케일 / 시금치", contentPer100g: "800 μg", portionTip: "녹색 잎채소에 매우 풍부" },
      { foodName: "브로콜리", contentPer100g: "140 μg", portionTip: "올리브유에 조리 시 흡수율 3배" },
      { foodName: "양배추", contentPer100g: "76 μg", portionTip: "위 점막 보호와 함께 지혈 인자 공급" }
    ],
    foodLimitationReason: "식물 세포벽의 엽록체에 강하게 결합되어 있어 기름 없이 생채소로 먹으면 흡수율이 10% 미만으로 극히 저조함.",
    bestSupplementForm: {
      recommendedForm: "천연 엽록소 유래 필로퀴논 또는 종합 비타민 복합 형태",
      inferiorFormWarning: "와파린 등 항응고제 복용 환자는 복용 전 주치의와 필히 용량 조율 필요",
      absorptionTip: "녹황색 채소 샐러드에 아보카도 오일이나 들기름 드레싱을 곁들여 섭취"
    },
    targetDemographics: ["4050 중년", "60대+ 노년기"],
    genders: ["공통"],
    seasons: ["사계절"],
    occupations: ["활동량 많은 직업/운동인"],
    targetOrgans: ["간 & 피로", "심혈관 & 혈액순환"],
    deal: {
      brand: "Life Extension",
      productName: "Super K with Advanced K2 Complex",
      spec: "소프트젤 90정 (K1+K2 동시 공급)",
      certification: "GMP 인증, 종합 비타민K 골드스탠다드",
    }
  },
  {
    id: "vit-b-complex",
    number: 15,
    name: "비타민 B-컴플렉스 (활성형 복합 8종)",
    engName: "Active B-Complex (8 Essential B Vitamins)",
    category: "비타민 (Vitamins)",
    symbolOrAbbr: "B-Complex",
    oneLineSummary: "신경계 보호, 에너지 미토콘드리아 ATP 생성, 간 해독 1·2단계 동시 지원",
    dailyRDA: "각종 B군 100% 기준",
    optimalIntake: "활성형 고함량 포뮬러",
    deficiencySymptoms: ["만성 피로 및 번아웃", "신경 과민 및 수면 불안", "면역력 및 대사 저하", "구내염 다발"],
    foodSources: [
      { foodName: "맥주효모 (Brewer's Yeast)", contentPer100g: "농축 복합체", portionTip: "천연 비타민 B군 전종의 보고" },
      { foodName: "유기농 소간", contentPer100g: "고밀도 복합", portionTip: "조혈 및 에너지 생성 으뜸" },
      { foodName: "통곡물 및 콩류", contentPer100g: "균형 공급", portionTip: "가공되지 않은 곡물 섭취" }
    ],
    foodLimitationReason: "개별 B군은 상호 의존적이어서 하나만 부족해도 전체 대사 회로가 멈추며, 한국인 바쁜 직장인의 외식 위주 식단으로는 결핍 불가피.",
    bestSupplementForm: {
      recommendedForm: "벤포티아민 + P-5-P + 5-MTHF + 메틸코발라민이 결합된 '전체 활성형(Coenzymated)' 제형",
      inferiorFormWarning: "합성 저가형은 간 대사 부담이 크고 흡수율이 낮아 소변으로 대부분 손실",
      absorptionTip: "에너지 부스팅 효과가 있으므로 저녁보다는 아침 식사 직후 복용"
    },
    targetDemographics: ["2030 청년", "4050 중년", "청소년/학생", "60대+ 노년기"],
    genders: ["공통"],
    seasons: ["봄", "환절기", "사계절"],
    occupations: ["사무직/직장인", "수험생/학생", "교대근무/야간직"],
    targetOrgans: ["간 & 피로", "뇌 & 인지기능", "심혈관 & 혈액순환"],
    deal: {
      brand: "Thorne",
      productName: "Basic B Complex (최고 등급 활성형)",
      spec: "캡슐 60정",
      certification: "미국 프로 운동선수 인증 (NSF Certified for Sport)",
    }
  },
  {
    id: "inositol",
    number: 16,
    name: "이노시톨 (미오-이노시톨 / D-카이로-이노시톨)",
    engName: "Inositol (Myo-Inositol & D-Chiro-Inositol)",
    category: "비타민 (Vitamins)",
    symbolOrAbbr: "Vit B8 (구)",
    oneLineSummary: "인슐린 저항성 개선, 여성 다낭성난소증후군(PCOS) 완화, 세로토닌 수용체 민감도 조절",
    dailyRDA: "공식 설정 없음",
    optimalIntake: "2,000~4,000 mg",
    deficiencySymptoms: ["인슐린 저항성 및 복부 비만", "여성 생리 불순 및 난포 성장 저하", "공황 장애 및 불안 증세", "불면증"],
    foodSources: [
      { foodName: "멜론 및 감귤류", contentPer100g: "350 mg", portionTip: "과일 중 이노시톨 함량 우수" },
      { foodName: "귀리 / 현미", contentPer100g: "280 mg", portionTip: "곡류 외피에 집중 분포" },
      { foodName: "강낭콩 / 렌틸콩", contentPer100g: "240 mg", portionTip: "피트산염 형태로 존재" }
    ],
    foodLimitationReason: "음식 속 이노시톨은 피트산염(Phytate) 형태로 결합되어 있어 장내 흡수율이 낮고 미네랄 흡수를 방해함.",
    bestSupplementForm: {
      recommendedForm: "자유형 순수 미오-이노시톨 분말 또는 미오:D-카이로 40:1 황금비율 포뮬러",
      inferiorFormWarning: "단순 저함량 캡슐(500mg)은 PCOS 임상 용량(하루 4g) 충족에 비효율적",
      absorptionTip: "물에 잘 녹는 고운 백색 분말로 아침/저녁 공복에 물에 타서 복용"
    },
    targetDemographics: ["2030 청년", "4050 중년"],
    genders: ["여성", "공통"],
    seasons: ["사계절"],
    occupations: ["사무직/직장인"],
    targetOrgans: ["간 & 피로", "뇌 & 인지기능"],
    deal: {
      brand: "Wholesome Story",
      productName: "Myo-Inositol & D-Chiro Inositol 40:1",
      spec: "120 베지 캡슐",
      certification: "Clean Label Project 인증",
    }
  },
  {
    id: "choline",
    number: 17,
    name: "콜린 (CDP-콜린 / 알파-GPC)",
    engName: "Choline (Citicoline / Alpha-GPC)",
    category: "비타민 (Vitamins)",
    symbolOrAbbr: "Vit B4 (구)",
    oneLineSummary: "기억력 신경전달물질 아세틸콜린 합성, 지방간 방지 지질 대사",
    dailyRDA: "425~550 mg",
    optimalIntake: "500~1,000 mg",
    deficiencySymptoms: ["비알코올성 지방간 및 간 수치 상승", "기억력 감퇴 및 작업 기억 속도 저하", "근육 손상 및 피로 누적", "임신 중 태아 뇌 발달 지연"],
    foodSources: [
      { foodName: "달걀 노른자 (2개)", contentPer100g: "290 mg", portionTip: "식품 중 가장 훌륭한 레시틴-콜린 공급원" },
      { foodName: "소간", contentPer100g: "420 mg", portionTip: "간 세포 건강 지원" },
      { foodName: "대두 및 대두 레시틴", contentPer100g: "115 mg", portionTip: "식물성 콜린 공급원" }
    ],
    foodLimitationReason: "달걀 노른자를 기피하는 다이어터나 채식주의자의 경우 90% 이상이 콜린 권장량에 심각하게 미달.",
    bestSupplementForm: {
      recommendedForm: "뇌 장벽(BBB)을 통과하는 시티콜린(CDP-Choline, Cognizin®) 또는 알파-GPC",
      inferiorFormWarning: "일반 염화콜린(Choline Bitartrate)은 장내 미생물에 의해 TMAO로 전환될 위험이 상대적으로 높음",
      absorptionTip: "수험생 집중력 또는 노년기 치매 예방 목적으로 오전 식후 섭취 권장"
    },
    targetDemographics: ["청소년/학생", "60대+ 노년기", "2030 청년"],
    genders: ["공통"],
    seasons: ["사계절"],
    occupations: ["수험생/학생", "사무직/직장인"],
    targetOrgans: ["뇌 & 인지기능", "간 & 피로"],
    deal: {
      brand: "Jarrow Formulas",
      productName: "Citicoline (CDP Choline, Cognizin) 250mg",
      spec: "캡슐 120정",
      certification: "Cognizin 특허 뇌 영양 임상 인증",
    }
  },
  {
    id: "paba",
    number: 18,
    name: "PABA (파라아미노안식향산)",
    engName: "PABA (Para-Aminobenzoic Acid)",
    category: "비타민 (Vitamins)",
    symbolOrAbbr: "Vit B10 (구)",
    oneLineSummary: "엽산 합성 보조, 백모(새치) 예방 및 피부 자외선 손상 방어",
    dailyRDA: "미설정",
    optimalIntake: "100~500 mg",
    deficiencySymptoms: ["모발 조기 백발화 (새치)", "자외선 과민증 및 피부 색소 침착", "소화기 피로"],
    foodSources: [
      { foodName: "간 / 맥주효모", contentPer100g: "풍부", portionTip: "B군 복합체와 함께 존재" },
      { foodName: "통곡물 및 버섯류", contentPer100g: "중등도", portionTip: "자연 상태 곡물" },
      { foodName: "당밀 (Molasses)", contentPer100g: "미네랄 동반", portionTip: "천연 감미료 대용" }
    ],
    foodLimitationReason: "가공 식품 위주 식단에서는 거의 섭취할 수 없는 미량 비타민 유사 인자.",
    bestSupplementForm: {
      recommendedForm: "자연 추출 식물성 캡슐 PABA 500mg",
      inferiorFormWarning: "설파제 계열 항생제 복용 시 약효를 상쇄하므로 병용 금지",
      absorptionTip: "비타민 C 및 판토텐산과 함께 섭취 시 모발 멜라닌 색소 유지에 도움"
    },
    targetDemographics: ["4050 중년", "60대+ 노년기"],
    genders: ["공통"],
    seasons: ["여름", "사계절"],
    occupations: ["사무직/직장인"],
    targetOrgans: ["피부 & 모발"],
    deal: {
      brand: "Now Foods",
      productName: "PABA 500mg",
      spec: "베지 캡슐 100정",
      certification: "GMP 인증, Non-GMO",
    }
  }
];
