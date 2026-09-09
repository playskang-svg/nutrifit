import { NutrientItem } from "../types";

export const gutSpecialtyList: NutrientItem[] = [
  {
    id: "gut-probiotics-100b",
    number: 58,
    name: "복합 프로바이오틱스 (보장균수 300억~1,000억 CFU / 장용성 캡슐)",
    engName: "Multi-Strain Probiotics (30~100 Billion CFU)",
    category: "장 건강 & 특수기능성",
    symbolOrAbbr: "Probiotics",
    oneLineSummary: "장내 유익균 총 복원, 면역세포 70% 훈련, 배변 활동 원활 및 가스/더부룩함 개선",
    dailyRDA: "1억~100억 CFU (식약처 기준)",
    optimalIntake: "300억~500억 보장균수 (다양한 균주 배합)",
    deficiencySymptoms: ["만성 변비 또는 무른 변, 잦은 설사", "복부 팽만감 및 식후 가스 차는 증상", "항생제 복용 후 장내 미생물 붕괴", "피부 트러블 및 면역 저하"],
    foodSources: [
      { foodName: "그릭 요거트 / 케피어", contentPer100g: "수억 CFU 유산균", portionTip: "당분 없는 플레인 요거트 권장" },
      { foodName: "전통 김치 / 된장 발효식품", contentPer100g: "식물성 유산균 다수", portionTip: "염분 조절 필요" },
      { foodName: "사우어크라우트 (양배추 발효)", contentPer100g: "생유산균 풍부", portionTip: "유럽식 발효 양배추" }
    ],
    foodLimitationReason: "발효식품 속 유산균은 위산(pH 1.5~2.0)과 담즙산에 노출되면 90% 이상 사멸하여 대장까지 도달하지 못함.",
    bestSupplementForm: {
      recommendedForm: "위산에 녹지 않고 장에서 녹는 '위산 저항 장용성 캡슐(DRcaps®)' + 락토바실러스 람노서스 GG(LGG), 비피도박테리움 BB-12 임상 균주",
      inferiorFormWarning: "투입균수만 강조하고 유통기한 끝까지 살아있는 '보장균수(CFU)'를 보증하지 않는 제품 피하기",
      absorptionTip: "아침 기상 직후 충분한 미온수 한 컵과 함께 공복에 섭취하여 위를 빠르게 통과시키기"
    },
    targetDemographics: ["60대+ 노년기", "2030 청년", "4050 중년", "청소년/학생"],
    genders: ["공통"],
    seasons: ["사계절", "환절기"],
    occupations: ["사무직/직장인", "수험생/학생", "교대근무/야간직"],
    targetOrgans: ["장 건강", "면역 & 호흡기", "피부 & 모발"],
    deal: {
      brand: "California Gold Nutrition",
      productName: "LactoBif 30 Probiotics (보장균수 300억)",
      spec: "60 베지 캡슐 / 개별 이중 포일 블리스터",
      originalPrice: 32000,
      dealPrice: 22400,
      discountPercent: 30,
      couponCode: "LACTO30",
      iherbUrl: "https://www.iherb.com/search?kw=LactoBif+30",
      certification: "Danisco FloraFIT® 8종 임상 균주, 실온 보관 특허",
      rating: 4.8,
      reviewCount: 68400
    }
  },
  {
    id: "gut-butyrate",
    number: 59,
    name: "낙산균 & 트리부티린 (Butyrate / 포스트바이오틱스)",
    engName: "Tributyrin (CoreBiome Postbiotic Butyrate)",
    category: "장 건강 & 특수기능성",
    symbolOrAbbr: "Butyrate",
    oneLineSummary: "대장 점막 상피세포의 직접 에너지원, 장 타이트 정션(치밀결합) 밀봉 및 항염증",
    dailyRDA: "미설정",
    optimalIntake: "300~1,000 mg",
    deficiencySymptoms: ["궤양성 대장염 및 크론병 등 염증성 장질환", "장 점막 손상으로 인한 장벽 투과성 증가", "유산균을 먹어도 지속되는 설사/복통"],
    foodSources: [
      { foodName: "목초 사육 버터 (기 버터, Ghee)", contentPer100g: "3~4% 함유", portionTip: "천연 낙산(부티르산)의 유일한 유지방 공급원" },
      { foodName: "귀리 / 바나나 저항성 전분", contentPer100g: "장내 발효 전구체", portionTip: "유익균의 먹이" },
      { foodName: "식혀서 굳힌 감자/밥", contentPer100g: "저항성 전분 3배 증가", portionTip: "냉장 보관 후 섭취" }
    ],
    foodLimitationReason: "버터만으로는 대장까지 도달하는 유효 낙산 농도를 만들 수 없으며, 장내 균총이 망가진 사람은 저항성 전분을 먹어도 낙산 발효가 일어나지 않음.",
    bestSupplementForm: {
      recommendedForm: "특유의 악취를 없애고 대장까지 도달하는 서방형 트리부티린 (CoreBiome® Tributyrin 300mg)",
      inferiorFormWarning: "일반 부티르산 나트륨 분말은 위에서 역한 냄새를 유발하고 대장 도달률이 낮음",
      absorptionTip: "식사와 함께 복용 시 대장 점막 염증 억제 및 장내 pH 산성화 유지"
    },
    targetDemographics: ["4050 중년", "60대+ 노년기", "2030 청년"],
    genders: ["공통"],
    seasons: ["사계절"],
    occupations: ["사무직/직장인"],
    targetOrgans: ["장 건강", "면역 & 호흡기"],
    deal: {
      brand: "Seeking Health",
      productName: "ProBiota Bifido with Butyrate",
      spec: "60 캡슐",
      originalPrice: 38000,
      dealPrice: 28500,
      discountPercent: 25,
      couponCode: "GUTCARE25",
      iherbUrl: "https://www.iherb.com/search?kw=Butyrate",
      certification: "CoreBiome 특허 원료, 무향 장용성",
      rating: 4.8,
      reviewCount: 3200
    }
  },
  {
    id: "gut-enzymes",
    number: 60,
    name: "소화효소 복합체 (단백질·지방·탄수화물 분해 / 베타인 HCl)",
    engName: "Broad-Spectrum Digestive Enzymes & Betaine HCl",
    category: "장 건강 & 특수기능성",
    symbolOrAbbr: "Enzymes",
    oneLineSummary: "노년기 췌장/위산 분비 저하 보완, 단백질 미소화 부패 가스 차단, 더부룩함 즉각 해소",
    dailyRDA: "미설정",
    optimalIntake: "매 식사 시 1~2캡슐",
    deficiencySymptoms: ["고기나 기름진 음식 먹은 뒤 3~4시간 지속되는 더부룩함", "트림 시 신물 및 썩은 달걀 냄새 가스", "영양소 흡수 불량으로 인한 마른 체형/근감소", "식곤증"],
    foodSources: [
      { foodName: "파인애플 (브로멜라인 단백분해효소)", contentPer100g: "생과육에 풍부", portionTip: "통조림은 가열되어 효소 전멸" },
      { foodName: "파파야 (파파인 효소)", contentPer100g: "단백질 분해", portionTip: "천연 소화제" },
      { foodName: "키위 (액티니딘)", contentPer100g: "고기 연육 작용", portionTip: "식후 디저트" }
    ],
    foodLimitationReason: "나이가 들면 침, 위산, 췌장 소화효소 분비량이 20대 대비 최대 70% 감소하여, 음식으로 영양소를 아무리 챙겨 먹어도 분해-흡수가 안 됨.",
    bestSupplementForm: {
      recommendedForm: "광범위 복합 소화효소 (프로테아제, 아밀라아제, 리파아제, 락타아제) + 위산 보충용 베타인 HCl",
      inferiorFormWarning: "위궤양이나 위염이 심한 상태에서는 베타인 HCl 단독 복용 시 속 쓰림이 있을 수 있으므로 식물성 소화효소 위주 선택",
      absorptionTip: "식사 첫 숟가락을 뜰 때 또는 식사 직전에 섭취해야 음식물과 효소가 위 속에서 골고루 섞임"
    },
    targetDemographics: ["60대+ 노년기", "4050 중년", "2030 청년"],
    genders: ["공통"],
    seasons: ["사계절"],
    occupations: ["사무직/직장인", "교대근무/야간직"],
    targetOrgans: ["장 건강", "간 & 피로"],
    deal: {
      brand: "Enzymedica",
      productName: "Digest Gold (세계 판매 1위 소화효소)",
      spec: "120 캡슐 / Thera-blend 복합 활성",
      originalPrice: 48000,
      dealPrice: 33600,
      discountPercent: 30,
      couponCode: "DIGEST30",
      iherbUrl: "https://www.iherb.com/search?kw=Digest+Gold+Enzymedica",
      certification: "전미 소화효소 판매 1위, 비건 인증",
      rating: 4.9,
      reviewCount: 24200
    }
  },
  {
    id: "gut-collagen",
    number: 61,
    name: "저분자 콜라겐 펩타이드 (피쉬 콜라겐 300달톤 / 비타민C 복합)",
    engName: "Low-Molecular Collagen Peptides (300~500 Da)",
    category: "장 건강 & 특수기능성",
    symbolOrAbbr: "Collagen",
    oneLineSummary: "진피층 탄력 그물망 복원, 관절 연골 기질 보충, 장벽 콜라겐 결합조직 강화",
    dailyRDA: "1,000~3,000 mg",
    optimalIntake: "5,000~10,000 mg",
    deficiencySymptoms: ["피부 탄력 저하 및 팔자 주름 깊어짐", "관절 마찰음 및 무릎 시림", "손톱 갈라짐 및 머리카락 가늘어짐", "혈관 탄력성 저하"],
    foodSources: [
      { foodName: "돼지껍데기 / 닭발 / 족발", contentPer100g: "고분자 콜라겐 (30만 달톤)", portionTip: "분자량이 너무 커서 체내 흡수율이 2% 미만에 불과" },
      { foodName: "생선 껍질 구이", contentPer100g: "어류 콜라겐", portionTip: "돼지보다 분자량 작음" },
      { foodName: "도가니탕", contentPer100g: "사골 국물", portionTip: "젤라틴 형태" }
    ],
    foodLimitationReason: "음식 속 육류 콜라겐은 분자량이 300,000 달톤으로 거대하여 장을 통과하지 못하고 대부분 배출됨. 흡수되려면 500달톤 이하로 효소 분해된 트리펩타이드 필수.",
    bestSupplementForm: {
      recommendedForm: "300~500 달톤(Da) 이하 효소분해 저분자 피쉬 콜라겐 펩타이드 (Verisol® 또는 Naticol®) 5,000mg",
      inferiorFormWarning: "합성 착향료와 설탕/과당이 과다 함유된 젤리형 콜라겐은 오히려 피부 당화(노화) 촉진",
      absorptionTip: "콜라겐 합성 효소의 필수 부스팅 인자인 비타민 C 및 히알루론산과 함께 복용"
    },
    targetDemographics: ["4050 중년", "60대+ 노년기", "2030 청년"],
    genders: ["여성", "공통"],
    seasons: ["가을", "겨울", "사계절"],
    occupations: ["사무직/직장인"],
    targetOrgans: ["피부 & 모발", "관절 & 뼈"],
    deal: {
      brand: "California Gold Nutrition",
      productName: "Hydrolyzed Marine Collagen Peptides + Hyaluronic + Vit C",
      spec: "무맛 파우더 464g / 대용량",
      originalPrice: 42000,
      dealPrice: 29400,
      discountPercent: 30,
      couponCode: "COLLAGEN30",
      iherbUrl: "https://www.iherb.com/search?kw=Collup+CGN+Marine+Collagen",
      certification: "제3자 독립 테스트 인증, 비린내 제로",
      rating: 4.8,
      reviewCount: 41200
    }
  },
  {
    id: "gut-hyaluronic",
    number: 62,
    name: "먹는 히알루론산 (경구용 수분 저장 / 100~200mg)",
    engName: "Oral Hyaluronic Acid (Injuv 100~200mg)",
    category: "장 건강 & 특수기능성",
    symbolOrAbbr: "Hyaluronic Acid",
    oneLineSummary: "자기 무게 1,000배의 수분을 끌어당기는 천연 스펀지, 관절 활액 완충 및 안구 표면 보습",
    dailyRDA: "120~240 mg (식약처 기능성)",
    optimalIntake: "150~200 mg",
    deficiencySymptoms: ["속건조가 심한 악건성 피부", "인공눈물을 넣어도 금세 건조해지는 안구건조증", "무릎 관절 움직일 때 삐걱거림 및 뻑뻑함"],
    foodSources: [
      { foodName: "닭 벼슬 / 연골 부위", contentPer100g: "히알루론산 원천", portionTip: "전통적인 추출 원료" },
      { foodName: "사골 국물", contentPer100g: "뮤코다당단백", portionTip: "관절 보양식" }
    ],
    foodLimitationReason: "일반 식품으로는 일상 섭취가 거의 불가능한 뮤코다당 단백질 성분.",
    bestSupplementForm: {
      recommendedForm: "저분자 발효 히알루론산 (Injuv® 또는 Hyabest® 고순도 발효 제형)",
      inferiorFormWarning: "분자량이 너무 큰 미발효 히알루론산은 장점막을 통과하지 못함",
      absorptionTip: "섭취 시 반드시 물 300~500ml를 충분히 마셔주어야 히알루론산이 수분을 빨아들여 체내 보습 효과 극대화"
    },
    targetDemographics: ["2030 청년", "4050 중년", "60대+ 노년기"],
    genders: ["여성", "공통"],
    seasons: ["가을", "겨울", "환절기"],
    occupations: ["사무직/직장인"],
    targetOrgans: ["피부 & 모발", "눈 건강", "관절 & 뼈"],
    deal: {
      brand: "Doctor's Best",
      productName: "Hyaluronic Acid with Chondroitin Sulfate 100mg",
      spec: "180 베지 캡슐 / BioCell Collagen 복합",
      originalPrice: 38000,
      dealPrice: 26600,
      discountPercent: 30,
      couponCode: "AQUA30",
      iherbUrl: "https://www.iherb.com/search?kw=Hyaluronic+Acid+Doctors+Best",
      certification: "BioCell Collagen 오리지널 2형 특허",
      rating: 4.8,
      reviewCount: 9800
    }
  },
  {
    id: "gut-sawpalmetto",
    number: 63,
    name: "쏘팔메토 열매 추출물 (로르산 85%+ / 남성 전립선 케어)",
    engName: "Saw Palmetto Extract (Lauric Acid 85%)",
    category: "장 건강 & 특수기능성",
    symbolOrAbbr: "Saw Palmetto",
    oneLineSummary: "전립선 비대 유발 5-알파 환원효소 억제, 야간뇨/잔뇨감 개선, 남성형 탈모 방어",
    dailyRDA: "로르산 70~115 mg (식약처 기준)",
    optimalIntake: "초임계 추출물 320 mg (로르산 85~95%)",
    deficiencySymptoms: ["밤에 자다 깨서 소변을 보는 야간뇨 (노년 남성 70%)", "소변 줄기가 가늘어지는 세뇨 및 잔뇨감", "DHT 호르몬 증가로 인한 M자 정수리 탈모"],
    foodSources: [
      { foodName: "톱야자수 열매 (미국 플로리다 자생)", contentPer100g: "원산지 식물", portionTip: "식품으로 섭취 불가능한 생약 원료" }
    ],
    foodLimitationReason: "플로리다 늪지대 톱야자나무 열매 오일에서만 추출되므로 식단으로 보충 불가.",
    bestSupplementForm: {
      recommendedForm: "초임계 CO2 추출 공법 100% 미국산 쏘팔메토 오일 (지방산 85% 표준화) + 옥타코사놀 + 아연 복합",
      inferiorFormWarning: "중국산 저가 팜유를 섞은 가짜 로르산 제품(원산지 확인 필수)",
      absorptionTip: "저녁 식사 직후 또는 취침 전 복용 시 밤 시간대 방광 괄약근 긴장 완화"
    },
    targetDemographics: ["4050 중년", "60대+ 노년기"],
    genders: ["남성"],
    seasons: ["사계절", "겨울"],
    occupations: ["사무직/직장인"],
    targetOrgans: ["간 & 피로", "피부 & 모발"],
    deal: {
      brand: "NOW Foods",
      productName: "Saw Palmetto Extract 320mg with Zinc",
      spec: "90 식물성 소프트젤",
      originalPrice: 28000,
      dealPrice: 19600,
      discountPercent: 30,
      couponCode: "MEN30",
      iherbUrl: "https://www.iherb.com/search?kw=Saw+Palmetto+320mg+Now",
      certification: "초임계 추출 로르산 85% 보증, 미국산",
      rating: 4.8,
      reviewCount: 8900
    }
  }
];
