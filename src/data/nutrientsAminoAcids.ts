import { NutrientItem } from "../types";

export const aminoAcidsList: NutrientItem[] = [
  {
    id: "amino-leucine",
    number: 35,
    name: "류신 (L-Leucine / 근감소증 핵심 아미노산)",
    engName: "L-Leucine (mTOR Sarcopenia Key)",
    category: "아미노산 & 단백질",
    symbolOrAbbr: "Leucine",
    oneLineSummary: "노년기 근육 합성(mTOR) 트리거 스위치 작동, 근감소증(Sarcopenia) 예방 필수",
    dailyRDA: "체중 1kg당 40mg",
    optimalIntake: "식사당 2.5~3.0 g (노년기 근단백 합성 임계치)",
    deficiencySymptoms: ["노년기 하체 근육량 급감 및 낙상 위험", "기초대사량 저하 및 근육 무력증", "수술 및 상처 후 근육 회복 지연"],
    foodSources: [
      { foodName: "유청 단백질 (Whey)", contentPer100g: "11 g", portionTip: "자연계 식품 중 류신 밀도 압도적 1위" },
      { foodName: "닭가슴살 및 소고기", contentPer100g: "2.5 g", portionTip: "매 끼니 손바닥 크기 육류 섭취 필요" },
      { foodName: "대두 및 두부", contentPer100g: "1.8 g", portionTip: "식물성 단백질은 식물성 아미노산 한계로 류신 비율 상대적 낮음" }
    ],
    foodLimitationReason: "노인은 '동화작용 저항성(Anabolic Resistance)'이 생겨 젊은 층보다 2배 많은 류신(한 끼 최소 3g)이 한 번에 혈중에 공급되어야만 근육 합성 신호가 켜짐. 소화력이 떨어진 노인이 고기만으로 이를 채우기는 불가능.",
    bestSupplementForm: {
      recommendedForm: "발효 공법 순수 L-류신 분말 또는 류신 강화 BCAA (4:1:1 비율)",
      inferiorFormWarning: "단순 저단백 식단이나 탄수화물 위주 죽 식단은 근육 손실 가속화",
      absorptionTip: "아침 식사 직후 또는 가벼운 산책/하체 운동 직후 복용 시 근육 합성 효율 극대화"
    },
    targetDemographics: ["60대+ 노년기", "4050 중년", "활동량 많은 직업/운동인"],
    genders: ["공통"],
    seasons: ["사계절"],
    occupations: ["활동량 많은 직업/운동인", "사무직/직장인"],
    targetOrgans: ["관절 & 뼈", "간 & 피로"],
    deal: {
      brand: "Nutricost",
      productName: "L-Leucine Powder 500g (순수 류신)",
      spec: "파우더 500g / 100회분",
      certification: "GMP 제조, 발효 식물성, 제3자 검사",
    }
  },
  {
    id: "amino-glutamine",
    number: 36,
    name: "L-글루타민 (L-Glutamine / 장 점막 재생 1위)",
    engName: "L-Glutamine (Gut Mucosa Shield)",
    category: "아미노산 & 단백질",
    symbolOrAbbr: "Glutamine",
    oneLineSummary: "장 상피세포(Enterocyte)의 1차 에너지원, 새는 장 증후군(Leaky Gut) 융모 복구",
    dailyRDA: "공식 설정 없음",
    optimalIntake: "5,000~10,000 mg (공복 섭취)",
    deficiencySymptoms: ["새는 장 증후군(장 투과성 증가) 및 장누수", "원인 모를 음식 알레르기 및 만성 피부 트러블", "과민성 대장 증후군(IBS) 가스/복통", "면역력 저하"],
    foodSources: [
      { foodName: "사골 국물 (Bone Broth)", contentPer100g: "콜라겐과 풍부한 글루타민", portionTip: "천연 장 치료식" },
      { foodName: "양배추 즙", contentPer100g: "비타민U와 글루타민", portionTip: "위장 점막 동시 보호" },
      { foodName: "소고기 및 생선", contentPer100g: "단백질 결합형", portionTip: "단백질 분해 과정 필요" }
    ],
    foodLimitationReason: "스트레스, 음주, 소염진통제(NSAIDs) 복용 시 장 상피세포의 글루타민 소모량이 급증하여 음식 속 양으로는 장 점막 수선 역부족.",
    bestSupplementForm: {
      recommendedForm: "식물 발효 100% 순수 자유형(Free Form) L-글루타민 분말 (AjiPure® 원료)",
      inferiorFormWarning: "단백질 쉐이크 속 글루타민은 다른 아미노산과 흡수 경쟁을 하므로 장 치료용으로는 단독 공복 분말이 필수",
      absorptionTip: "반드시 아침 기상 직후 미온수에 타서 공복에 음용 (장벽에 직접 접촉하도록 함)"
    },
    targetDemographics: ["2030 청년", "4050 중년", "60대+ 노년기"],
    genders: ["공통"],
    seasons: ["사계절", "환절기"],
    occupations: ["사무직/직장인", "활동량 많은 직업/운동인"],
    targetOrgans: ["장 건강", "면역 & 호흡기", "간 & 피로"],
    deal: {
      brand: "California Gold Nutrition",
      productName: "L-Glutamine AjiPure 454g (발효 순수 글루타민)",
      spec: "무맛 파우더 454g / 90회분",
      certification: "AjiPure 일본 아지노모토 특허 의약품급 발효 원료",
    }
  },
  {
    id: "amino-theanine",
    number: 37,
    name: "L-테아닌 (L-Theanine / 뇌파 알파파 유도)",
    engName: "L-Theanine (Alpha Wave Relaxer)",
    category: "아미노산 & 단백질",
    symbolOrAbbr: "Theanine",
    oneLineSummary: "긴장 완화 뇌파(알파파, α-wave) 증가, 카페인 각성 부작용 상쇄, 수험생 집중력 강화",
    dailyRDA: "200 mg (식약처 기능성 인정)",
    optimalIntake: "200~400 mg",
    deficiencySymptoms: ["만성 시험 및 업무 스트레스 과열", "카페인 섭취 시 가슴 두근거림 및 손떨림", "불안으로 인한 얕은 수면", "집중력 산만"],
    foodSources: [
      { foodName: "고급 녹차 (우전/옥로차)", contentPer100g: "찻잎당 1~2%", portionTip: "테아닌의 유일한 자연 급원 식물" },
      { foodName: "말차 (Matcha)", contentPer100g: "분말 통째 섭취", portionTip: "차광 재배로 테아닌 농축" },
      { foodName: "갈색버섯류", contentPer100g: "극미량", portionTip: "자연계 극히 희귀" }
    ],
    foodLimitationReason: "녹차 1잔에는 테아닌이 겨우 20~30mg만 들어있어, 200mg을 얻으려면 녹차 8~10잔을 마셔야 하며 이 경우 카페인 과다로 불면 유발.",
    bestSupplementForm: {
      recommendedForm: "천연 발효 특허 Suntheanine® (100% 순수 L-이성질체)",
      inferiorFormWarning: "저가 합성 테아닌은 D-테아닌이 혼입되어 뇌 수용체 결합력이 크게 떨어짐",
      absorptionTip: "커피 마실 때 1:1로 함께 먹으면 카페인의 두근거림은 사라지고 순수한 집중 몰입 상태 유지"
    },
    targetDemographics: ["청소년/학생", "2030 청년", "4050 중년"],
    genders: ["공통"],
    seasons: ["사계절"],
    occupations: ["수험생/학생", "사무직/직장인"],
    targetOrgans: ["뇌 & 인지기능", "간 & 피로"],
    deal: {
      brand: "Doctor's Best",
      productName: "L-Theanine with Suntheanine 150mg",
      spec: "베지 캡슐 90정",
      certification: "Suntheanine 오리지널 일본 특허",
    }
  },
  {
    id: "amino-arginine",
    number: 38,
    name: "L-아르기닌 & L-시트룰린 복합체",
    engName: "L-Arginine & L-Citrulline Complex",
    category: "아미노산 & 단백질",
    symbolOrAbbr: "NO Booster",
    oneLineSummary: "일산화질소(NO) 합성 촉진, 혈관 확장, 남성 활력 증진 및 운동 펌핑",
    dailyRDA: "미설정",
    optimalIntake: "아르기닌 3,000mg + 시트룰린 2,000mg",
    deficiencySymptoms: ["말초 혈액순환 장애 및 손발 저림", "혈관 탄력 저하 및 혈압 상승", "남성 발기 활력 및 스테미너 감퇴", "운동 중 근육 피로 누적"],
    foodSources: [
      { foodName: "수박 껍질 (시트룰린 풍부)", contentPer100g: "흰 부분에 농축", portionTip: "천연 시트룰린의 최고 보고" },
      { foodName: "호박씨 및 장어", contentPer100g: "5.3 g", portionTip: "전통 보양 식품" },
      { foodName: "칠면조 및 닭고기", contentPer100g: "1.5 g", portionTip: "고단백 육류" }
    ],
    foodLimitationReason: "아르기닌을 단독으로 먹으면 간과 장의 '아르기나아제(Arginase)' 효소에 의해 60% 이상 분해되어 혈중 농도가 금방 떨어짐. 시트룰린과 1:1로 함께 먹어야 체내 아르기닌 농도가 지속 유지됨.",
    bestSupplementForm: {
      recommendedForm: "L-아르기닌 + L-시트룰린 1:1 복합 포뮬러",
      inferiorFormWarning: "단순 아르기닌 고용량(5g 이상) 단독 복용 시 삼투성 설사 및 헤르페스(구순포진) 재발 주의",
      absorptionTip: "아침 공복 또는 운동 30분 전 비타민C와 함께 복용"
    },
    targetDemographics: ["2030 청년", "4050 중년", "60대+ 노년기"],
    genders: ["남성", "공통"],
    seasons: ["봄", "여름", "사계절"],
    occupations: ["사무직/직장인", "활동량 많은 직업/운동인"],
    targetOrgans: ["심혈관 & 혈액순환", "간 & 피로"],
    deal: {
      brand: "NOW Foods",
      productName: "L-Arginine & L-Citrulline 500/250mg",
      spec: "120 베지 캡슐",
      certification: "GMP 품질 보증, 의약품급 아미노산",
    }
  },
  {
    id: "amino-nac",
    number: 39,
    name: "NAC (N-아세틸 시스테인 / 항산화 제왕 전구체)",
    engName: "NAC (N-Acetyl Cysteine)",
    category: "아미노산 & 단백질",
    symbolOrAbbr: "NAC",
    oneLineSummary: "체내 최강 항산화제 글루타치온 합성의 병목 원료, 기관지 점액 용해 및 간 해독",
    dailyRDA: "미설정",
    optimalIntake: "600~1,200 mg",
    deficiencySymptoms: ["간 해독 부전 및 숙취 극심", "기관지 가래 정체 및 미세먼지 호흡기 염증", "글루타치온 고갈에 따른 만성 피로", "뇌 브레인 포그"],
    foodSources: [
      { foodName: "마늘 및 양파 (알리신/시스테인)", contentPer100g: "황화합물 다량", portionTip: "한국인 밥상의 해독원" },
      { foodName: "방목 달걀 (메티오닌 풍부)", contentPer100g: "0.4 g", portionTip: "유황 아미노산" },
      { foodName: "브로콜리 새싹", contentPer100g: "설포라판 연계", portionTip: "간 해독 2단계 활성" }
    ],
    foodLimitationReason: "글루타치온은 먹어도 위장에서 아미노산으로 분해되어 버리므로, 세포 안에서 글루타치온을 만들기 위한 '시스테인(NAC)'의 직접 공급이 가장 과학적인 방법임.",
    bestSupplementForm: {
      recommendedForm: "약효 지속형 N-아세틸 L-시스테인 (NAC) 600mg",
      inferiorFormWarning: "단순 L-시스테인은 공기 중 산화가 빠르나 아세틸화된 NAC는 안정적 흡수 보장",
      absorptionTip: "비타민 C 및 셀레늄과 함께 복용 시 글루타치온 재생 회로(Redox cycle) 완성"
    },
    targetDemographics: ["2030 청년", "4050 중년", "60대+ 노년기"],
    genders: ["공통"],
    seasons: ["봄", "환절기", "겨울", "사계절"],
    occupations: ["사무직/직장인", "교대근무/야간직"],
    targetOrgans: ["간 & 피로", "면역 & 호흡기", "뇌 & 인지기능"],
    deal: {
      brand: "Life Extension",
      productName: "N-Acetyl-L-Cysteine 600mg",
      spec: "60 베지 캡슐",
      certification: "고순도 의약품급 NAC 원료",
    }
  },
  {
    id: "amino-taurine",
    number: 40,
    name: "타우린 (Taurine / 피로회복 & 심장 근육 강화)",
    engName: "Taurine (Cardiac & Mitochondrial Stamina)",
    category: "아미노산 & 단백질",
    symbolOrAbbr: "Taurine",
    oneLineSummary: "담즙산 합성(지방 소화), 심근 수축력 강화, 미토콘드리아 수명 연장 장수 아미노산",
    dailyRDA: "미설정",
    optimalIntake: "1,000~3,000 mg",
    deficiencySymptoms: ["지방 음식 섭취 시 소화불량 및 더부룩함", "운동 지구력 급감 및 심장 피로", "망막 광수용체 손상 및 시력 저하", "만성 근육 경련"],
    foodSources: [
      { foodName: "오징어 / 문어 / 낙지", contentPer100g: "800~1,000 mg", portionTip: "타우린 함량 최고 식품군 (건조 오징어 표면의 흰 가루가 타우린)" },
      { foodName: "굴 및 조개류", contentPer100g: "400 mg", portionTip: "아연과 함께 섭취" },
      { foodName: "소고기 어두운 살코기", contentPer100g: "60 mg", portionTip: "육류 함유량" }
    ],
    foodLimitationReason: "채식주의 식단에는 타우린이 제로이며, 나이가 들수록 체내 타우린 합성 능력이 최대 80%까지 격감하여 최근 네이처(Nature)지 논문에서 '노화 억제 핵심 인자'로 규명됨.",
    bestSupplementForm: {
      recommendedForm: "순수 자유형 타우린 (Free-Form Taurine Powder) 1,000mg",
      inferiorFormWarning: "시중 에너지 음료 속 타우린은 다량의 액상과당과 설탕이 범벅되어 있어 혈당 스파이크 유발",
      absorptionTip: "카페인 없는 순수 타우린 분말을 물이나 전해질 음료에 섞어 아침 및 운동 전 복용"
    },
    targetDemographics: ["60대+ 노년기", "2030 청년", "4050 중년"],
    genders: ["공통"],
    seasons: ["사계절"],
    occupations: ["사무직/직장인", "활동량 많은 직업/운동인"],
    targetOrgans: ["간 & 피로", "심혈관 & 혈액순환", "눈 건강"],
    deal: {
      brand: "NOW Foods",
      productName: "Taurine Pure Powder 227g",
      spec: "무맛 순수 파우더 227g / 227회분",
      certification: "GMP 인증, 제3자 순도 검증",
    }
  },
  {
    id: "amino-carnitine",
    number: 41,
    name: "아세틸-L-카르니틴 (ALCAR / 미토콘드리아 지방 연소)",
    engName: "Acetyl-L-Carnitine (ALCAR Brain & Fat Burner)",
    category: "아미노산 & 단백질",
    symbolOrAbbr: "ALCAR",
    oneLineSummary: "지방산을 미토콘드리아 내부로 운반해 ATP 생성, 뇌 장벽을 통과해 인지기능 개선",
    dailyRDA: "미설정",
    optimalIntake: "500~1,500 mg",
    deficiencySymptoms: ["지방 연소 효율 저하 및 내장지방 축적", "오후 뇌 피로 및 기억력 저하", "만성 피로 증후군", "노인성 신경통"],
    foodSources: [
      { foodName: "소고기 붉은 살코기", contentPer100g: "95 mg", portionTip: "어원(Carnis: 고기)답게 붉은 육류에 집중" },
      { foodName: "양고기", contentPer100g: "210 mg", portionTip: "육류 중 카르니틴 밀도 최고" },
      { foodName: "닭가슴살", contentPer100g: "3.9 mg", portionTip: "백색육에는 카르니틴이 적음" }
    ],
    foodLimitationReason: "붉은 고기 섭취를 줄이는 다이어터와 노년층은 카르니틴 결핍으로 지방이 에너지로 전환되지 못하고 체지방으로 쌓임.",
    bestSupplementForm: {
      recommendedForm: "아세틸-L-카르니틴 (ALCAR - 일반 L-카르니틴과 달리 뇌 혈관 장벽을 통과하여 뇌 신경까지 재생)",
      inferiorFormWarning: "일반 L-카르니틴 타르트레이트는 근육 운동용에 적합하나 두뇌 피로용으로는 ALCAR가 우월",
      absorptionTip: "에너지 대사를 촉진하므로 아침 식전 또는 운동 30분 전 알파리포산(ALA)과 병용 시 항산화 폭발"
    },
    targetDemographics: ["60대+ 노년기", "2030 청년", "4050 중년"],
    genders: ["공통"],
    seasons: ["사계절"],
    occupations: ["사무직/직장인", "수험생/학생"],
    targetOrgans: ["뇌 & 인지기능", "간 & 피로", "심혈관 & 혈액순환"],
    deal: {
      brand: "Doctor's Best",
      productName: "Best Acetyl-L-Carnitine 500mg with Biosint",
      spec: "120 식물성 캡슐",
      certification: "Sigma-tau 오리지널 Biosint 특허 원료",
    }
  },
  {
    id: "amino-glycine",
    number: 42,
    name: "글리신 (Glycine / 심부체온 저하 숙면 & 콜라겐 33%)",
    engName: "Glycine (Sleep & Collagen Backbone)",
    category: "아미노산 & 단백질",
    symbolOrAbbr: "Glycine",
    oneLineSummary: "취침 전 심부체온을 낮춰 서파(깊은) 수면 유도, 콜라겐 3개 아미노산 중 1개 차지",
    dailyRDA: "미설정",
    optimalIntake: "3,000 mg (수면 개선 임상 용량)",
    deficiencySymptoms: ["수면 개시 곤란 및 아침 기상 시 피로", "콜라겐 합성 저하로 인한 피부 주름 및 관절 마모", "간 해독 2단계 담즙 결합 부전"],
    foodSources: [
      { foodName: "족발 / 도가니 / 닭발", contentPer100g: "콜라겐 부위 풍부", portionTip: "천연 결합조직 식품" },
      { foodName: "생선 껍질", contentPer100g: "글리신 농축", portionTip: "마린 콜라겐 공급원" },
      { foodName: "젤라틴 파우더", contentPer100g: "순수 글리신 다량", portionTip: "수프 요리 활용" }
    ],
    foodLimitationReason: "지방과 콜레스테롤 걱정으로 껍질이나 족발을 매일 섭취할 수 없으며, 설탕 없이 순수 글리신 3g을 섭취하기 어려움.",
    bestSupplementForm: {
      recommendedForm: "순수 100% 프리미엄 의약품급 글리신 파우더 3,000mg (달콤한 맛)",
      inferiorFormWarning: "수면제와 달리 의존성과 내성이 전혀 없는 천연 신경 억제 전달물질",
      absorptionTip: "취침 30분 전 따뜻한 카모마일 티나 물에 1스쿱(3g) 타서 마시면 체온을 낮추며 자연스러운 졸음 유도"
    },
    targetDemographics: ["2030 청년", "4050 중년", "60대+ 노년기"],
    genders: ["공통"],
    seasons: ["사계절"],
    occupations: ["사무직/직장인", "교대근무/야간직"],
    targetOrgans: ["뇌 & 인지기능", "피부 & 모발", "간 & 피로"],
    deal: {
      brand: "NOW Foods",
      productName: "Glycine Pure Powder 454g",
      spec: "100% 순수 분말 454g / 150회분",
      certification: "Non-GMO, 코셔 인증, GMP 제조",
    }
  },
  {
    id: "amino-tryptophan",
    number: 43,
    name: "L-트립토판 (L-Tryptophan / 5-HTP)",
    engName: "L-Tryptophan (Serotonin & Melatonin Master)",
    category: "아미노산 & 단백질",
    symbolOrAbbr: "Tryptophan",
    oneLineSummary: "낮에는 행복 호르몬 세로토닌, 밤에는 수면 호르몬 멜라토닌으로 변환되는 필수 아미노산",
    dailyRDA: "체중 1kg당 4mg",
    optimalIntake: "500~1,000 mg",
    deficiencySymptoms: ["계절성 우울증 및 무기력감", "야간 불면증 및 새벽 잦은 깸", "탄수화물 폭식 및 단 음식 충동"],
    foodSources: [
      { foodName: "바나나", contentPer100g: "중등도", portionTip: "비타민 B6와 함께 수면 콤보" },
      { foodName: "칠면조 고기 / 닭고기", contentPer100g: "0.24 g", portionTip: "추수감사절 수면 효과로 유명" },
      { foodName: "우유 및 치즈", contentPer100g: "0.15 g", portionTip: "따뜻한 우유 한 잔" }
    ],
    foodLimitationReason: "음식 속 트립토판은 다른 대형 중성 아미노산(BCAA 등)과 혈뇌장벽(BBB) 통과 경쟁에서 밀려 뇌로 도달하는 비율이 1% 미만.",
    bestSupplementForm: {
      recommendedForm: "순수 L-트립토판 500mg (또는 단독 분말)",
      inferiorFormWarning: "항우울제(SSRI) 복용 중인 환자는 세로토닌 증후군 위험이 있으므로 주치의 상담 필수",
      absorptionTip: "소량의 탄수화물(사과 반 쪽 등)과 함께 공복 취침 전 복용 시 인슐린 작용으로 뇌 진입률 급상승"
    },
    targetDemographics: ["2030 청년", "4050 중년", "60대+ 노년기"],
    genders: ["공통"],
    seasons: ["가을", "겨울", "사계절"],
    occupations: ["사무직/직장인", "교대근무/야간직"],
    targetOrgans: ["뇌 & 인지기능"],
    deal: {
      brand: "Life Extension",
      productName: "L-Tryptophan 500mg",
      spec: "90 베지 캡슐",
      certification: "최고 순도 프리미엄 발효 원료",
    }
  },
  {
    id: "amino-creatine",
    number: 44,
    name: "크레아틴 모노하이드레이트 (Creapure® / 근력 & 뇌 인지능력)",
    engName: "Creatine Monohydrate (ATP Power & Brain)",
    category: "아미노산 & 단백질",
    symbolOrAbbr: "Creatine",
    oneLineSummary: "세포 순간 에너지 포스포크레아틴 충전, 노년기 뇌 에너지 대사 및 근력 손실 차단",
    dailyRDA: "미설정",
    optimalIntake: "3~5 g 매일 지속 섭취",
    deficiencySymptoms: ["순간적인 근파워 저하", "노년기 인지 처리 속도 둔화 및 뇌 피로", "근육 회복 지연"],
    foodSources: [
      { foodName: "소고기 붉은 살코기", contentPer100g: "450 mg", portionTip: "크레아틴 5g 충족을 위해선 소고기 1.1kg 매일 섭취 필요" },
      { foodName: "청어 및 연어", contentPer100g: "700 mg", portionTip: "생선류" }
    ],
    foodLimitationReason: "음식 조리 과정에서 가열 시 크레아티닌(대사 노폐물)으로 변성되어 음식만으로 매일 5g 포화를 유지하기 불가능.",
    bestSupplementForm: {
      recommendedForm: "독일 알츠켐(AlzChem)사 오리지널 Creapure® 크레아틴 모노하이드레이트",
      inferiorFormWarning: "크레아틴 에틸에스테르나 질산염 등 변형 제형은 모노하이드레이트보다 연구 근거 부족 및 비용 낭비",
      absorptionTip: "로딩기 없이 매일 3~5g씩 충분한 수분(물 500ml)과 함께 복용"
    },
    targetDemographics: ["활동량 많은 직업/운동인", "60대+ 노년기", "수험생/학생"],
    genders: ["공통", "남성"],
    seasons: ["사계절"],
    occupations: ["활동량 많은 직업/운동인", "수험생/학생"],
    targetOrgans: ["관절 & 뼈", "뇌 & 인지기능", "간 & 피로"],
    deal: {
      brand: "California Gold Nutrition",
      productName: "Creatine Monohydrate Creapure 454g",
      spec: "무맛 파우더 454g / 90회분",
      certification: "Creapure® 독일 정품 특허 인증 (순도 99.99%)",
    }
  }
];
