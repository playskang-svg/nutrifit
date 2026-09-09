import { NutrientItem } from "../types";
import { vitaminsList } from "./nutrientsVitamins";
import { mineralsList } from "./nutrientsMinerals";
import { aminoAcidsList } from "./nutrientsAminoAcids";
import { fattyAcidsList } from "./nutrientsFattyAcids";
import { phytonutrientsList } from "./nutrientsPhyto";
import { gutSpecialtyList } from "./nutrientsGutSpecialty";
import { remainingNutrientsList } from "./nutrientsRemaining";

// Supplementary items to complete the 100 essential nutrients catalog systematically
const supplementaryNutrients: NutrientItem[] = [
  {
    id: "supp-gaba",
    number: 71,
    name: "GABA (가바 / 뇌 신경 억제 전달물질)",
    engName: "PharmaGABA (Gamma-Aminobutyric Acid)",
    category: "아미노산 & 단백질",
    symbolOrAbbr: "GABA",
    oneLineSummary: "과열된 중추신경 흥분 진정, 뇌파 알파파 증가 및 불안/불면 완화",
    dailyRDA: "미설정",
    optimalIntake: "100~200 mg (천연 발효 PharmaGABA)",
    deficiencySymptoms: ["잠들기 전 꼬리를 무는 생각으로 인한 불면", "가슴 두근거림 및 긴장성 두통", "안절부절못함"],
    foodSources: [
      { foodName: "발아현미 (Germinated Brown Rice)", contentPer100g: "10~20 mg", portionTip: "백미의 10배" },
      { foodName: "발효 김치 국물", contentPer100g: "식물성 가바 생성", portionTip: "자연 발효" }
    ],
    foodLimitationReason: "음식 속 가바는 소화 과정에서 대부분 분해되며, 순수 임상 효과를 위해선 천연 발효 PharmaGABA 제형이 필수.",
    bestSupplementForm: {
      recommendedForm: "유산균 발효 특허 PharmaGABA® 100~200mg (경구 섭취 시 뇌 부교감신경 자극)",
      inferiorFormWarning: "합성 가바는 혈뇌장벽(BBB) 통과율이 낮음",
      absorptionTip: "취침 40분 전 L-테아닌 및 마그네슘과 함께 섭취"
    },
    targetDemographics: ["2030 청년", "4050 중년", "60대+ 노년기"],
    genders: ["공통"],
    seasons: ["사계절"],
    occupations: ["사무직/직장인", "수험생/학생", "교대근무/야간직"],
    targetOrgans: ["뇌 & 인지기능"],
    deal: {
      brand: "Thorne",
      productName: "PharmaGABA-250",
      spec: "60 캡슐 / 순수 발효 가바",
      originalPrice: 38000,
      dealPrice: 28500,
      discountPercent: 25,
      couponCode: "GABA25",
      iherbUrl: "https://www.iherb.com/search?kw=PharmaGABA+Thorne",
      certification: "PharmaGABA 특허 자연 발효",
      rating: 4.8,
      reviewCount: 5200
    }
  },
  {
    id: "supp-alpha-gpc",
    number: 72,
    name: "알파-GPC (Alpha-GPC / 아세틸콜린 전구체)",
    engName: "Alpha-GPC (L-Alpha Glycerylphosphorylcholine)",
    category: "뇌 & 인지기능",
    symbolOrAbbr: "Alpha-GPC",
    oneLineSummary: "기억과 학습의 핵심 신경전달물질 아세틸콜린 공급, 뇌 혈뇌장벽(BBB) 직접 통과",
    dailyRDA: "미설정",
    optimalIntake: "300~600 mg",
    deficiencySymptoms: ["학습 내용 기억 및 암기력 저하", "수험생 집중 몰입 유지 불가", "노인성 치매 초기 건망증"],
    foodSources: [
      { foodName: "동물 간 및 뇌", contentPer100g: "콜린 고농도", portionTip: "식품으로 매일 섭취 불가" },
      { foodName: "계란 노른자 (포스파티딜콜린)", contentPer100g: "125 mg", portionTip: "전환 과정 필요" }
    ],
    foodLimitationReason: "일반 콜린염(Choline Bitartrate)은 뇌 침투율이 낮으나 알파-GPC는 BBB를 자유롭게 통과하여 뇌 신경세포에 즉시 공급됨.",
    bestSupplementForm: {
      recommendedForm: "고순도 Alpha-GPC 300mg 베지 캡슐",
      inferiorFormWarning: "습기에 매우 취약하여 가루가 굳을 수 있으므로 캡슐 밀봉 보관 필수",
      absorptionTip: "오전 수험 공부 또는 집중 업무 30분 전 복용"
    },
    targetDemographics: ["수험생/학생", "60대+ 노년기", "2030 청년"],
    genders: ["공통"],
    seasons: ["사계절"],
    occupations: ["수험생/학생", "사무직/직장인"],
    targetOrgans: ["뇌 & 인지기능"],
    deal: {
      brand: "NOW Foods",
      productName: "Alpha GPC 300mg",
      spec: "60 베지 캡슐",
      originalPrice: 32000,
      dealPrice: 22400,
      discountPercent: 30,
      couponCode: "BRAIN30",
      iherbUrl: "https://www.iherb.com/search?kw=Alpha+GPC+Now",
      certification: "Non-GMO, 두뇌 인지 기능 인증",
      rating: 4.8,
      reviewCount: 8400
    }
  },
  {
    id: "supp-sam-e",
    number: 73,
    name: "SAM-e (S-아데노실 메티오닌 400mg)",
    engName: "SAM-e (S-Adenosyl-L-Methionine)",
    category: "뇌 & 인지기능",
    symbolOrAbbr: "SAM-e",
    oneLineSummary: "신경전달물질 메틸화 촉진, 우울감 완화 및 관절 연골 프로테오글리칸 합성",
    dailyRDA: "미설정",
    optimalIntake: "200~400 mg (장용 코팅 정제)",
    deficiencySymptoms: ["만성 기분 저하 및 계절성 우울감", "관절 뻣뻣함과 통증", "간 내 글루타치온 결핍"],
    foodSources: [
      { foodName: "체내 자체 합성 대사산물", contentPer100g: "식품에 존재하지 않음", portionTip: "메티오닌과 ATP로 합성" }
    ],
    foodLimitationReason: "식품에는 SAM-e 성분 자체가 없으며 체내 메틸화 회로가 약화된 현대인은 합성량이 급감.",
    bestSupplementForm: {
      recommendedForm: "위산 파괴를 막는 장용성 개별 호일 포장 정제 (Enteric-Coated Blister)",
      inferiorFormWarning: "공기에 노출되면 수 시간 내 산화 분해되므로 병 포장 제품 절대 금지",
      absorptionTip: "반드시 아침 기상 직후 물 한 컵과 함께 공복에 복용"
    },
    targetDemographics: ["4050 중년", "60대+ 노년기", "2030 청년"],
    genders: ["공통"],
    seasons: ["가을", "겨울", "환절기"],
    occupations: ["사무직/직장인"],
    targetOrgans: ["뇌 & 인지기능", "관절 & 뼈", "간 & 피로"],
    deal: {
      brand: "Doctor's Best",
      productName: "SAM-e 400mg (Enteric Coated)",
      spec: "60 장용정 / 이중 블리스터",
      originalPrice: 48000,
      dealPrice: 33600,
      discountPercent: 30,
      couponCode: "MOOD30",
      iherbUrl: "https://www.iherb.com/search?kw=SAM-e+Doctors+Best",
      certification: "이탈리아산 최고 등급 SAM-e 원료",
      rating: 4.8,
      reviewCount: 11400
    }
  },
  {
    id: "supp-hmb",
    number: 74,
    name: "HMB (β-하이드록시 β-메틸부티레이트 / 근단백질 분해 방지)",
    engName: "HMB (Muscle Sparing & Anti-Catabolic)",
    category: "아미노산 & 단백질",
    symbolOrAbbr: "HMB",
    oneLineSummary: "류신의 활성 대사산물, 노년기 침상 생활이나 부상 시 근육 손실(Catabolism) 90% 방어",
    dailyRDA: "미설정",
    optimalIntake: "1,500~3,000 mg",
    deficiencySymptoms: ["수술/질환 후 급격한 근육 감소", "무리한 다이어트 시 체지방 대신 근육만 소실", "근감소증"],
    foodSources: [
      { foodName: "류신 대사 산물", contentPer100g: "류신의 5%만 HMB 전환", portionTip: "HMB 3g을 얻으려면 류신 60g(소고기 2.5kg) 매일 섭취 필요" }
    ],
    foodLimitationReason: "체내 류신의 극소량(5%)만 HMB로 바뀌므로 음식으로 유효량을 채우는 것은 불가능.",
    bestSupplementForm: {
      recommendedForm: "HMB-Ca (칼슘 결합형) 또는 유리산 HMB Free Acid 1,000mg",
      inferiorFormWarning: "단순 저단백 식단과 병행하지 말고 필수 아미노산과 함께 섭취",
      absorptionTip: "운동 직전 또는 취침 전 섭취 시 야간 공복 근육 분해 억제"
    },
    targetDemographics: ["60대+ 노년기", "활동량 많은 직업/운동인"],
    genders: ["공통"],
    seasons: ["사계절"],
    occupations: ["활동량 많은 직업/운동인"],
    targetOrgans: ["관절 & 뼈", "간 & 피로"],
    deal: {
      brand: "Nutricost",
      productName: "HMB 1000mg (Calcium HMB)",
      spec: "120 캡슐",
      originalPrice: 28000,
      dealPrice: 19600,
      discountPercent: 30,
      couponCode: "MUSCLE30",
      iherbUrl: "https://www.iherb.com/search?kw=HMB+Nutricost",
      certification: "제3자 품질 검사 통과, 글루텐 프리",
      rating: 4.8,
      reviewCount: 4200
    }
  },
  {
    id: "supp-glucosamine-chondroitin",
    number: 75,
    name: "글루코사민 황산염 & 콘드로이틴 (관절 연골 기질)",
    engName: "Glucosamine Sulfate & Chondroitin Complex",
    category: "관절 & 뼈",
    symbolOrAbbr: "Glucosamine:Chondroitin",
    oneLineSummary: "관절 활액 형성, 연골 파괴 효소 억제, 퇴행성 관절염 뼈 마찰 완충",
    dailyRDA: "1,500 mg (글루코사민) + 1,200 mg (콘드로이틴)",
    optimalIntake: "1,500mg / 1,200mg (임상 표준)",
    deficiencySymptoms: ["무릎을 구부릴 때 뚝뚝 소리와 찌릿한 마찰 통증", "연골 두께 얇아짐", "관절 가동 범위 제한"],
    foodSources: [
      { foodName: "게 / 새우 껍질 키틴", contentPer100g: "추출 원천", portionTip: "사람이 소화할 수 없어 버려지는 껍질" },
      { foodName: "상어 / 소 연골", contentPer100g: "콘드로이틴 황산", portionTip: "전통 한방 우슬/연골" }
    ],
    foodLimitationReason: "게 껍질을 그대로 씹어 먹어도 위에서 분해되지 않으므로, 황산염으로 결합 정제된 제형만 흡수 가능.",
    bestSupplementForm: {
      recommendedForm: "글루코사민 황산염(Sulfate) 2KCl + 순도 90% 이상 콘드로이틴 황산 복합 정제",
      inferiorFormWarning: "염산염(HCl) 제형은 황산염보다 임상적 관절염 개선 데이터가 떨어짐",
      absorptionTip: "MSM 및 오메가3와 함께 3개월 이상 꾸준히 섭취 시 효과 누적"
    },
    targetDemographics: ["60대+ 노년기", "4050 중년"],
    genders: ["공통"],
    seasons: ["겨울", "환절기", "사계절"],
    occupations: ["활동량 많은 직업/운동인"],
    targetOrgans: ["관절 & 뼈"],
    deal: {
      brand: "Doctor's Best",
      productName: "Glucosamine Chondroitin MSM with OptiMSM",
      spec: "240 베지 캡슐 / 관절 3대 성분 복합",
      originalPrice: 42000,
      dealPrice: 29400,
      discountPercent: 30,
      couponCode: "JOINT30",
      iherbUrl: "https://www.iherb.com/search?kw=Glucosamine+Chondroitin+Doctors+Best",
      certification: "OptiMSM 포함 정품 원료",
      rating: 4.8,
      reviewCount: 21900
    }
  },
  {
    id: "supp-beta-alanine",
    number: 76,
    name: "베타알라닌 (Beta-Alanine / 근육 카르노신 합성)",
    engName: "Beta-Alanine (Carnosine Booster)",
    category: "아미노산 & 단백질",
    symbolOrAbbr: "Beta-Alanine",
    oneLineSummary: "근육 내 젖산 산성화(pH 저하) 완충, 고강도 운동 지속 시간 연장 및 피로 지연",
    dailyRDA: "미설정",
    optimalIntake: "3.2~6.4 g (분할 섭취)",
    deficiencySymptoms: ["단시간 고강도 작업 시 급격한 근육 타는 듯한 통증", "젖산 축적 피로", "지구력 저하"],
    foodSources: [
      { foodName: "닭가슴살 및 소고기", contentPer100g: "카르노신 함유", portionTip: "육류 소화 필요" }
    ],
    foodLimitationReason: "음식 속 카르노신은 혈액 내 카르노시나아제 효소에 의해 즉시 분해되므로 베타알라닌 단독 보충이 근육 저장에 가장 효과적.",
    bestSupplementForm: {
      recommendedForm: "CarnoSyn® 특허 순수 베타알라닌",
      inferiorFormWarning: "일시적으로 피부가 따끔거리는 감각 이상(Paresthesia)은 무해하나, 불편 시 1회 1.6g씩 나누어 복용",
      absorptionTip: "운동 30분 전 탄수화물/크레아틴과 함께 복용"
    },
    targetDemographics: ["활동량 많은 직업/운동인", "2030 청년"],
    genders: ["공통"],
    seasons: ["사계절"],
    occupations: ["활동량 많은 직업/운동인"],
    targetOrgans: ["관절 & 뼈", "간 & 피로"],
    deal: {
      brand: "NOW Foods",
      productName: "Beta-Alanine CarnoSyn 750mg",
      spec: "120 베지 캡슐",
      originalPrice: 24000,
      dealPrice: 16800,
      discountPercent: 30,
      couponCode: "FIT30",
      iherbUrl: "https://www.iherb.com/search?kw=CarnoSyn+Beta+Alanine",
      certification: "CarnoSyn 글로벌 스포츠 임상 인증",
      rating: 4.8,
      reviewCount: 3800
    }
  },
  {
    id: "supp-spirulina",
    number: 77,
    name: "스피루리나 (Spirulina / 피코시아닌 20% 함유 슈퍼푸드)",
    engName: "Spirulina (Phycocyanin & Chlorophyll)",
    category: "식물영양소 & 항산화제",
    symbolOrAbbr: "Spirulina",
    oneLineSummary: "단백질 65% 함유, 청록색 항산화 색소 피코시아닌, 체내 중금속 흡착 배출",
    dailyRDA: "총 엽록소 8~150 mg",
    optimalIntake: "2,000~3,000 mg",
    deficiencySymptoms: ["영양 불균형으로 인한 피부 칙칙함", "미세먼지/중금속 노출 염려", "체력 소모"],
    foodSources: [
      { foodName: "열대 고염 알칼리 호수 남조류", contentPer100g: "식물성 완전 단백질", portionTip: "우주인의 비상 식량" }
    ],
    foodLimitationReason: "일반 밥상에서 직접 채취 불가한 미세조류.",
    bestSupplementForm: {
      recommendedForm: "하와이산 오가닉 스피루리나 (Hawaiian Spirulina Pacifica®)",
      inferiorFormWarning: "중국산 저가 조류 제품은 마이크로시스틴(간 독소) 오염 위험 있으므로 청정 재배 인증 확인",
      absorptionTip: "아침 식사 전 미온수와 함께 타블렛 복용"
    },
    targetDemographics: ["2030 청년", "4050 중년", "60대+ 노년기"],
    genders: ["공통"],
    seasons: ["봄", "사계절"],
    occupations: ["사무직/직장인"],
    targetOrgans: ["면역 & 호흡기", "피부 & 모발", "간 & 피로"],
    deal: {
      brand: "Nutrex Hawaii",
      productName: "Pure Hawaiian Spirulina 1000mg",
      spec: "180 타블렛 / 무방부제",
      originalPrice: 34000,
      dealPrice: 23800,
      discountPercent: 30,
      couponCode: "GREEN30",
      iherbUrl: "https://www.iherb.com/search?kw=Hawaiian+Spirulina+Nutrex",
      certification: "하와이 심층수 재배, Non-GMO Verified",
      rating: 4.8,
      reviewCount: 15400
    }
  },
  {
    id: "supp-d-mannose",
    number: 78,
    name: "D-만노스 (D-Mannose / 요로 대장균 부착 차단)",
    engName: "D-Mannose (UTI Cleansing Pure Sugar)",
    category: "장 건강 & 특수기능성",
    symbolOrAbbr: "D-Mannose",
    oneLineSummary: "방광벽에 붙은 대장균(E.coli) 섬모를 흡착하여 소변으로 배출, 재발성 방광염 종결",
    dailyRDA: "미설정",
    optimalIntake: "1,000~2,000 mg",
    deficiencySymptoms: ["소변 볼 때 찌릿한 요도 작열감", "자주 재발하는 여성 방광염", "소변 참기 힘든 급박뇨"],
    foodSources: [
      { foodName: "크랜베리 생과", contentPer100g: "소량 함유", portionTip: "시중 주스는 설탕 덩어리" },
      { foodName: "사과 / 복숭아", contentPer100g: "미량", portionTip: "치료적 농도 불가" }
    ],
    foodLimitationReason: "당분이지만 혈당으로 대사되지 않고 신장을 거쳐 소변으로 90% 배출되는 특성으로, 순수 성분 보충이 필수.",
    bestSupplementForm: {
      recommendedForm: "천연 자작나무 추출 순수 100% D-만노스 분말 또는 500mg 캡슐",
      inferiorFormWarning: "항생제 남용은 내성균을 키우나 D-만노스는 물리적으로 균을 씻어내어 내성 없음",
      absorptionTip: "물 한 컵에 타서 마신 뒤 40분 후 다시 물 500ml를 마셔 방광을 시원하게 세척"
    },
    targetDemographics: ["2030 청년", "4050 중년", "60대+ 노년기"],
    genders: ["여성"],
    seasons: ["사계절", "여름"],
    occupations: ["사무직/직장인"],
    targetOrgans: ["장 건강", "면역 & 호흡기"],
    deal: {
      brand: "NOW Foods",
      productName: "D-Mannose 500mg",
      spec: "120 베지 캡슐",
      originalPrice: 28000,
      dealPrice: 19600,
      discountPercent: 30,
      couponCode: "UTI30",
      iherbUrl: "https://www.iherb.com/search?kw=D-Mannose+Now",
      certification: "Non-GMO, 방광 건강 기능성",
      rating: 4.9,
      reviewCount: 16800
    }
  },
  {
    id: "supp-lactoferrin",
    number: 79,
    name: "락토페린 (Lactoferrin / 초유 철분 결합 당단백질)",
    engName: "Lactoferrin (Apolactoferrin Iron Regulator)",
    category: "면역 & 호흡기",
    symbolOrAbbr: "Lactoferrin",
    oneLineSummary: "세균 증식에 필요한 철분을 가로채 항균 작용, 장 점막 항바이러스 및 내장지방 감소",
    dailyRDA: "미설정",
    optimalIntake: "250~500 mg (아포락토페린)",
    deficiencySymptoms: ["감기 및 장염 잦은 감염", "복부 내장지방 축적", "철분제 복용 시 장내 세균 번식으로 인한 변비"],
    foodSources: [
      { foodName: "소 초유 (Colostrum)", contentPer100g: "0.5~1.0 g", portionTip: "분만 후 첫 젖에 고농축" },
      { foodName: "우유", contentPer100g: "살균 시 95% 파괴", portionTip: "열에 약함" }
    ],
    foodLimitationReason: "시판 살균 우유는 초고온 열처리(130도)로 락토페린 단백질이 완전히 변성 파괴됨.",
    bestSupplementForm: {
      recommendedForm: "철분이 결합되지 않아 항균 흡착력이 가장 뛰어난 아포락토페린 (Apolactoferrin) 250mg",
      inferiorFormWarning: "장용 코팅이 되지 않으면 위산에 일부 소화될 수 있으므로 장용 캡슐 선호",
      absorptionTip: "식간 공복 또는 취침 전 복용"
    },
    targetDemographics: ["2030 청년", "4050 중년", "60대+ 노년기"],
    genders: ["공통"],
    seasons: ["환절기", "겨울", "봄"],
    occupations: ["사무직/직장인", "수험생/학생"],
    targetOrgans: ["면역 & 호흡기", "장 건강"],
    deal: {
      brand: "Jarrow Formulas",
      productName: "Lactoferrin (Freeze Dried) 250mg",
      spec: "60 캡슐 / 동결건조 아포락토페린",
      originalPrice: 46000,
      dealPrice: 32200,
      discountPercent: 30,
      couponCode: "SHIELD30",
      iherbUrl: "https://www.iherb.com/search?kw=Lactoferrin+Jarrow",
      certification: "동결건조 무변성 프랑스산 유청 락토페린",
      rating: 4.8,
      reviewCount: 9400
    }
  },
  {
    id: "supp-beta-glucan",
    number: 80,
    name: "베타글루칸 (Beta-Glucan 1,3/1,6 / 효모 유래 NK세포 활성)",
    engName: "Yeast Beta-Glucan 1,3/1,6 (Wellmune)",
    category: "면역 & 호흡기",
    symbolOrAbbr: "Beta-Glucan",
    oneLineSummary: "선천면역 대식세포 및 NK세포 수용체 결합, 호흡기 감염 기간 50% 단축",
    dailyRDA: "미설정",
    optimalIntake: "250~500 mg",
    deficiencySymptoms: ["계절 바뀔 때마다 목감기/코감기 재발", "면역 피로 및 구내염 잦은 발생", "상처 회복 더딤"],
    foodSources: [
      { foodName: "잎새버섯 / 영지버섯", contentPer100g: "1,3/1,6 결합", portionTip: "버섯 우린 물" },
      { foodName: "귀리 / 보리", contentPer100g: "1,3/1,4 결합", portionTip: "곡류 베타글루칸은 면역보다 콜레스테롤 저하용" }
    ],
    foodLimitationReason: "곡물(귀리) 속 베타글루칸(1,3/1,4)은 면역세포 자극력이 약하며, 효모나 약용 버섯의 1,3/1,6 분기 사슬만 강력한 면역 증강을 발휘.",
    bestSupplementForm: {
      recommendedForm: "빵효모 세포벽 추출 특허 원료 Wellmune® 또는 Yestimun® (순도 85% 이상)",
      inferiorFormWarning: "단순 버섯 가루는 베타글루칸 함량이 10% 미만",
      absorptionTip: "아침 기상 직후 공복에 비타민C와 함께 복용"
    },
    targetDemographics: ["60대+ 노년기", "2030 청년", "4050 중년", "청소년/학생"],
    genders: ["공통"],
    seasons: ["겨울", "환절기", "봄"],
    occupations: ["사무직/직장인", "수험생/학생"],
    targetOrgans: ["면역 & 호흡기"],
    deal: {
      brand: "California Gold Nutrition",
      productName: "Beta-Glucan 1,3/1,6 with Wellmune",
      spec: "60 베지 캡슐",
      originalPrice: 22000,
      dealPrice: 15400,
      discountPercent: 30,
      couponCode: "IMMUNE30",
      iherbUrl: "https://www.iherb.com/search?kw=Wellmune+Beta+Glucan",
      certification: "Wellmune 정품 특허 임상 인증",
      rating: 4.8,
      reviewCount: 6800
    }
  },
  {
    id: "supp-psyllium-husk",
    number: 81,
    name: "차전자피 식이섬유 (Psyllium Husk / 배변 부피 팽창)",
    engName: "Organic Psyllium Husk (Soluble Fiber)",
    category: "장 건강 & 특수기능성",
    symbolOrAbbr: "Psyllium",
    oneLineSummary: "수분을 흡수해 40배 팽창하는 수용성 식이섬유, 변비 탈출 및 콜레스테롤 흡착 배출",
    dailyRDA: "식이섬유 25~30 g",
    optimalIntake: "5~10 g (충분한 물 필수)",
    deficiencySymptoms: ["토끼똥처럼 딱딱하고 끊어지는 변비", "배변 시 항문 찢어짐 및 치질", "혈중 콜레스테롤 상승"],
    foodSources: [
      { foodName: "질경이 씨앗 껍질", contentPer100g: "식이섬유 85%", portionTip: "천연 식물성 팽창 하제" }
    ],
    foodLimitationReason: "현대 정제 탄수화물 식단으로는 하루 권장 식이섬유 30g을 채우기 어려움.",
    bestSupplementForm: {
      recommendedForm: "100% 유기농 차전자피 통 껍질(Whole Husk) 또는 미세 분말",
      inferiorFormWarning: "자극성 변비약(센나, 비사코딜)은 장 무력증을 유발하지만 차전자피는 안전한 물리적 하제",
      absorptionTip: "반드시 물 300ml 이상에 빠르게 타서 굳기 전에 즉시 마시고, 추가로 물 한 컵 더 마시기"
    },
    targetDemographics: ["60대+ 노년기", "2030 청년", "4050 중년"],
    genders: ["공통", "여성"],
    seasons: ["사계절"],
    occupations: ["사무직/직장인"],
    targetOrgans: ["장 건강", "심혈관 & 혈액순환"],
    deal: {
      brand: "NOW Foods",
      productName: "Whole Psyllium Husks 454g (유기농)",
      spec: "순수 파우더 454g",
      originalPrice: 18000,
      dealPrice: 12600,
      discountPercent: 30,
      couponCode: "FIBER30",
      iherbUrl: "https://www.iherb.com/search?kw=Whole+Psyllium+Husks+Now",
      certification: "USDA 오가닉, Non-GMO",
      rating: 4.8,
      reviewCount: 32400
    }
  },
  {
    id: "supp-artichoke",
    number: 82,
    name: "아티초크 추출물 (시나린 / 담즙 분비 & 위장관 운동)",
    engName: "Artichoke Leaf Extract (Cynarin 5%)",
    category: "장 건강 & 특수기능성",
    symbolOrAbbr: "Artichoke",
    oneLineSummary: "담즙 생성 및 분비 2배 촉진, 소장 연동운동(MMC)을 깨워 가스·복부 팽만 퇴치",
    dailyRDA: "미설정",
    optimalIntake: "300~600 mg (시나린 5% 표준화)",
    deficiencySymptoms: ["기름진 음식 섭취 시 메스꺼움과 체함", "소장 내 미생물 정체(SIBO)로 인한 아랫배 팽창", "지방변"],
    foodSources: [
      { foodName: "지중해 아티초크 꽃봉오리", contentPer100g: "잎에 시나린 집중", portionTip: "국내 밥상에서 구하기 힘든 채소" }
    ],
    foodLimitationReason: "조리용 꽃봉오리보다 쓴맛이 강한 '잎'에 유효성분이 많아 식사로 섭취 불가능.",
    bestSupplementForm: {
      recommendedForm: "아티초크 잎 추출물 (시나린 5% 표준화) + 생강 추출물(진저롤) 복합 제형",
      inferiorFormWarning: "담석으로 담관이 막힌 환자는 복용 전 의사 상담 필요",
      absorptionTip: "지방 식사 전 또는 취침 전 소장 청소기(MMC) 작동을 위해 공복 복용"
    },
    targetDemographics: ["4050 중년", "60대+ 노년기", "2030 청년"],
    genders: ["공통"],
    seasons: ["사계절"],
    occupations: ["사무직/직장인"],
    targetOrgans: ["장 건강", "간 & 피로"],
    deal: {
      brand: "Jarrow Formulas",
      productName: "Artichoke Extract 500mg",
      spec: "180 베지 캡슐 / 시나린 5% 표준화",
      originalPrice: 27000,
      dealPrice: 18900,
      discountPercent: 30,
      couponCode: "GUT30",
      iherbUrl: "https://www.iherb.com/search?kw=Artichoke+Extract+Jarrow",
      certification: "표준화 플라보노이드 보증",
      rating: 4.8,
      reviewCount: 4300
    }
  },
  {
    id: "supp-vitamin-u",
    number: 83,
    name: "비타민 U (S-메틸메티오닌 / 위 점막 궤양 수선)",
    engName: "Vitamin U (S-Methylmethionine / Cabbage Extract)",
    category: "장 건강 & 특수기능성",
    symbolOrAbbr: "Vitamin U",
    oneLineSummary: "위벽 점액 분비 촉진, 위염/위궤양 상처 아물게 하는 일본 카베진의 핵심 유효성분",
    dailyRDA: "미설정",
    optimalIntake: "100~300 mg",
    deficiencySymptoms: ["속 쓰림, 위산 역류(역류성 식도염)", "공복 시 위가 쥐어짜듯 쓰린 통증", "위 점막 미란"],
    foodSources: [
      { foodName: "신선한 생 양배추", contentPer100g: "심지 부위에 풍부", portionTip: "가열 시 비타민 U 열 파괴 주의" },
      { foodName: "케일 / 브로콜리", contentPer100g: "십자화과 채소", portionTip: "생즙으로 섭취" }
    ],
    foodLimitationReason: "양배추를 삶으면 비타민 U가 파괴되며, 매일 생 양배추 통을 씹어 먹으면 갑상선 저하 유발 가능(고이트로겐).",
    bestSupplementForm: {
      recommendedForm: "비타민 U 농축 양배추 발효 추출 분말 또는 정제",
      inferiorFormWarning: "단순 양배추 즙은 특유의 비린내와 높은 칼륨으로 장기 복용 불편",
      absorptionTip: "식전 20분 전 미온수와 복용하여 위벽을 선제적으로 코팅"
    },
    targetDemographics: ["2030 청년", "4050 중년", "60대+ 노년기"],
    genders: ["공통"],
    seasons: ["사계절", "환절기"],
    occupations: ["사무직/직장인", "교대근무/야간직"],
    targetOrgans: ["장 건강"],
    deal: {
      brand: "Kowa",
      productName: "Cabagin Kowa α 300정 (비타민U 오리지널)",
      spec: "300정 대용량",
      originalPrice: 35000,
      dealPrice: 26250,
      discountPercent: 25,
      couponCode: "STOMACH25",
      iherbUrl: "https://www.iherb.com/search?kw=Cabagin",
      certification: "일본 국민 위장약, MMSC 비타민U 함유",
      rating: 4.9,
      reviewCount: 38200
    }
  },
  {
    id: "supp-maca",
    number: 84,
    name: "마카 (유기농 젤라틴화 블랙마카 1,000mg)",
    engName: "Gelatinized Black Maca (Peruvian Ginseng)",
    category: "활력 & 스테미너",
    symbolOrAbbr: "Maca",
    oneLineSummary: "페루 안데스의 산삼, 남녀 호르몬 균형, 정자 운동성 향상 및 성적 활력 충전",
    dailyRDA: "미설정",
    optimalIntake: "1,500~3,000 mg",
    deficiencySymptoms: ["만성 무기력 및 스테미너 고갈", "남성 갱년기 성욕 감퇴", "운동 회복력 둔화"],
    foodSources: [
      { foodName: "안데스 고산지대 마카 뿌리 (블랙/레드/옐로우)", contentPer100g: "마카마이드 풍부", portionTip: "전통 보양 뿌리" }
    ],
    foodLimitationReason: "생마카는 전분질이 많아 복용 시 속이 부글거리고 소화장애가 일어남.",
    bestSupplementForm: {
      recommendedForm: "전분을 가열 제거하여 흡수율을 98%로 높인 '젤라틴화(Gelatinized) 블랙 마카'",
      inferiorFormWarning: "단순 생마카 분말은 소화불량 및 설사 유발 가능",
      absorptionTip: "아침 식후 아르기닌 및 아연과 함께 섭취 시 활력 콤보 완성"
    },
    targetDemographics: ["2030 청년", "4050 중년"],
    genders: ["남성", "공통"],
    seasons: ["여름", "겨울", "사계절"],
    occupations: ["사무직/직장인", "활동량 많은 직업/운동인"],
    targetOrgans: ["간 & 피로"],
    deal: {
      brand: "California Gold Nutrition",
      productName: "Peruvian Maca Organic Gelatinized 500mg",
      spec: "240 베지 캡슐",
      originalPrice: 26000,
      dealPrice: 18200,
      discountPercent: 30,
      couponCode: "VITAL30",
      iherbUrl: "https://www.iherb.com/search?kw=Gelatinized+Maca+CGN",
      certification: "USDA 유기농, 젤라틴화 공법",
      rating: 4.8,
      reviewCount: 12900
    }
  },
  {
    id: "supp-rhodiola",
    number: 85,
    name: "로디오라 (홍경천 추출물 / 살리드로사이드 / 스트레스 저항)",
    engName: "Rhodiola Rosea (Rosavins 3% & Salidroside 1%)",
    category: "식물영양소 & 항산화제",
    symbolOrAbbr: "Rhodiola",
    oneLineSummary: "혹독한 시베리아 생명력, 코르티솔 급증 완화, 번아웃 뇌 피로 회복 및 집중력 지속",
    dailyRDA: "로사빈 3% 기준",
    optimalIntake: "200~400 mg",
    deficiencySymptoms: ["지속적인 야근으로 인한 뇌 에너지 고갈", "만성 번아웃 및 무력감", "스트레스성 편두통"],
    foodSources: [
      { foodName: "시베리아 고산 바위틈 홍경천 뿌리", contentPer100g: "약용 식물", portionTip: "우주비행사 스트레스 완화제" }
    ],
    foodLimitationReason: "일반 식단 섭취 불가한 시베리아 허브.",
    bestSupplementForm: {
      recommendedForm: "로사빈(Rosavins) 3% + 살리드로사이드(Salidroside) 1% 황금비율 표준화 추출물",
      inferiorFormWarning: "중국산 로디오라 중 로사빈이 없는 가짜 홍경천 종 주의",
      absorptionTip: "각성 효과가 있으므로 늦은 밤을 피해 아침 공복 또는 이른 오후 섭취"
    },
    targetDemographics: ["2030 청년", "4050 중년"],
    genders: ["공통"],
    seasons: ["사계절", "환절기"],
    occupations: ["사무직/직장인", "교대근무/야간직", "수험생/학생"],
    targetOrgans: ["뇌 & 인지기능", "간 & 피로"],
    deal: {
      brand: "NOW Foods",
      productName: "Rhodiola 500mg (3% Standardized)",
      spec: "60 베지 캡슐",
      originalPrice: 22000,
      dealPrice: 15400,
      discountPercent: 30,
      couponCode: "STRESS30",
      iherbUrl: "https://www.iherb.com/search?kw=Rhodiola+500mg+Now",
      certification: "Non-GMO, 표준화 성분 보증",
      rating: 4.8,
      reviewCount: 9100
    }
  },
  {
    id: "supp-cordyceps",
    number: 86,
    name: "동충하초 추출물 (Cordyceps CS-4 / 폐포 산소 이용률)",
    engName: "Cordyceps Sinensis (CS-4 Fermented Strain)",
    category: "식물영양소 & 항산화제",
    symbolOrAbbr: "Cordyceps",
    oneLineSummary: "폐 세포 산소 섭취량(VO2 Max) 향상, 호흡기 지구력 및 신장 기능 강화",
    dailyRDA: "미설정",
    optimalIntake: "750~1,500 mg",
    deficiencySymptoms: ["계단 오를 때 쉽게 숨이 차는 증상", "기관지 허약 및 잦은 마른 기침", "운동 후 산소 부족 피로"],
    foodSources: [
      { foodName: "티베트 고원 자연산 동충하초", contentPer100g: "kg당 2,000만원 호가", portionTip: "자연산은 금보다 비쌈" }
    ],
    foodLimitationReason: "야생 박쥐나방 유충 동충하초는 가격이 극도로 비싸며 중금속 위험이 있어 과학적 발효 균주(CS-4)가 필수.",
    bestSupplementForm: {
      recommendedForm: "임상적으로 입증된 액체 발효 균사체 추출물 CS-4 (아데노신 & 코디세핀 보증)",
      inferiorFormWarning: "단순 곡물 배지 분말은 버섯 균사체 함량이 낮음",
      absorptionTip: "운동 40분 전 또는 아침 공복 복용"
    },
    targetDemographics: ["60대+ 노년기", "활동량 많은 직업/운동인"],
    genders: ["공통"],
    seasons: ["겨울", "환절기", "봄"],
    occupations: ["활동량 많은 직업/운동인", "사무직/직장인"],
    targetOrgans: ["면역 & 호흡기", "간 & 피로"],
    deal: {
      brand: "Doctor's Best",
      productName: "Ultra Cordyceps Plus 750mg",
      spec: "120 베지 캡슐 / CS-4 균주",
      originalPrice: 29000,
      dealPrice: 20300,
      discountPercent: 30,
      couponCode: "OXYGEN30",
      iherbUrl: "https://www.iherb.com/search?kw=Ultra+Cordyceps+Doctors+Best",
      certification: "순수 배양 CS-4 발효 균사체",
      rating: 4.8,
      reviewCount: 7300
    }
  },
  {
    id: "supp-berberine-phytosome",
    number: 87,
    name: "베르베린 파이토솜 (Berbevis® / 흡수율 10배 개선)",
    engName: "Berberine Phytosome (Berbevis 550mg)",
    category: "식물영양소 & 항산화제",
    symbolOrAbbr: "Berbevis",
    oneLineSummary: "일반 베르베린의 흡수 한계를 극복한 인지질 캡슐화, 식후 혈당 및 인슐린 저항성 격파",
    dailyRDA: "미설정",
    optimalIntake: "550 mg 1일 1~2회",
    deficiencySymptoms: ["복부 비만 및 혈당 스파이크", "탄수화물 식후 쏟아지는 졸음", "대사증후군 위험"],
    foodSources: [
      { foodName: "매발톱나무 추출 인지질 결합", contentPer100g: "식품에 부재", portionTip: "파이토솜 특수 제형" }
    ],
    foodLimitationReason: "일반 베르베린은 장 흡수율이 5% 미만이라 고용량 복용 시 설사를 유발하지만, 파이토솜은 적은 용량으로 10배 흡수.",
    bestSupplementForm: {
      recommendedForm: "이탈리아 Indena사 Berbevis® 특허 파이토솜 베르베린",
      inferiorFormWarning: "단순 벌크 가루는 위장 장애 확률이 높음",
      absorptionTip: "가장 탄수화물이 많은 식사(점심 또는 저녁) 직전에 복용"
    },
    targetDemographics: ["4050 중년", "60대+ 노년기", "2030 청년"],
    genders: ["공통"],
    seasons: ["사계절"],
    occupations: ["사무직/직장인"],
    targetOrgans: ["심혈관 & 혈액순환", "간 & 피로", "장 건강"],
    deal: {
      brand: "Thorne",
      productName: "Berberine-500",
      spec: "60 캡슐",
      originalPrice: 46000,
      dealPrice: 34500,
      discountPercent: 25,
      couponCode: "GLUCOSE25",
      iherbUrl: "https://www.iherb.com/search?kw=Thorne+Berberine",
      certification: "최고급 의약품 등급 제조, NSF 인증",
      rating: 4.8,
      reviewCount: 6200
    }
  },
  {
    id: "supp-d-ribose",
    number: 88,
    name: "D-리보오스 (D-Ribose 5g / 심근 & 근육 ATP 직결 당)",
    engName: "D-Ribose (Pure Bioenergy ATP Sugar)",
    category: "활력 & 스테미너",
    symbolOrAbbr: "D-Ribose",
    oneLineSummary: "ATP(생체 에너지) 분자의 기본 뼈대, 심부전 및 섬유근육통 만성 피로 환자의 기력 회복",
    dailyRDA: "미설정",
    optimalIntake: "5,000 mg (파우더 1스쿱)",
    deficiencySymptoms: ["운동 후 2~3일간 이어지는 극심한 기력 고갈", "심장 박동 피로감", "만성 피로 증후군"],
    foodSources: [
      { foodName: "육류 세포벽", contentPer100g: "소량 함유", portionTip: "인체 합성 속도가 극히 느림" }
    ],
    foodLimitationReason: "인체가 리보오스를 스스로 만드는 경로는 매우 느려, 심장이나 근육이 지쳤을 때 직접 공급하지 않으면 ATP 재충전에 며칠이 소요됨.",
    bestSupplementForm: {
      recommendedForm: "Bioenergy Ribose® 특허 100% 순수 D-리보오스 파우더 (달콤하고 설탕과 달리 인슐린을 자극하지 않음)",
      inferiorFormWarning: "저혈당 환자는 공복 섭취 시 약간의 혈당 저하가 올 수 있으므로 식사와 함께 섭취",
      absorptionTip: "운동 직후 또는 아침 물이나 주스에 타서 마시기"
    },
    targetDemographics: ["60대+ 노년기", "활동량 많은 직업/운동인"],
    genders: ["공통"],
    seasons: ["사계절"],
    occupations: ["활동량 많은 직업/운동인", "사무직/직장인"],
    targetOrgans: ["심혈관 & 혈액순환", "간 & 피로"],
    deal: {
      brand: "Doctor's Best",
      productName: "Best D-Ribose with Bioenergy Ribose 250g",
      spec: "순수 파우더 250g / 50회분",
      originalPrice: 34000,
      dealPrice: 23800,
      discountPercent: 30,
      couponCode: "ATP30",
      iherbUrl: "https://www.iherb.com/search?kw=D-Ribose+Doctors+Best",
      certification: "Bioenergy Ribose 정품 임상 특허",
      rating: 4.8,
      reviewCount: 4100
    }
  },
  {
    id: "supp-cranberry-pac",
    number: 89,
    name: "크랜베리 고농축 추출물 (PACs 36mg / 요로 점막 보호)",
    engName: "Cranberry Concentrate (Proanthocyanidins PACs 36mg)",
    category: "식물영양소 & 항산화제",
    symbolOrAbbr: "Cranberry PACs",
    oneLineSummary: "A형 프로안토시아니딘(PACs)이 요로 상피세포에 유해균이 달라붙는 것을 영구 차단",
    dailyRDA: "PACs 25~36 mg (식약처 요로 건강 기능성)",
    optimalIntake: "36 mg 이상의 활성 PACs",
    deficiencySymptoms: ["피곤할 때마다 찾아오는 찌릿한 방광 불편감", "항생제 내성으로 고생하는 여성 요로계"],
    foodSources: [
      { foodName: "북미 크랜베리 생과", contentPer100g: "강한 신맛과 떫은맛", portionTip: "생으로 먹기 불가능" }
    ],
    foodLimitationReason: "시중 크랜베리 주스는 과당과 설탕이 80% 이상이어서 오히려 방광 내 세균 증식을 유발할 수 있음.",
    bestSupplementForm: {
      recommendedForm: "Cran-Max® 전초 34:1 농축 바이오 쉴드 캡슐 (PACs 36mg 정량)",
      inferiorFormWarning: "단순 건조 분말은 유효 활성 PACs 함량이 표기되지 않음",
      absorptionTip: "D-만노스와 함께 복용 시 방광 건강의 철벽 방어선 구축"
    },
    targetDemographics: ["2030 청년", "4050 중년", "60대+ 노년기"],
    genders: ["여성"],
    seasons: ["여름", "사계절"],
    occupations: ["사무직/직장인"],
    targetOrgans: ["장 건강", "면역 & 호흡기"],
    deal: {
      brand: "Natural Factors",
      productName: "CranRich Super Strength Cranberry Concentrate 500mg",
      spec: "180 소프트젤 / 36:1 농축",
      originalPrice: 26000,
      dealPrice: 18200,
      discountPercent: 30,
      couponCode: "CRAN30",
      iherbUrl: "https://www.iherb.com/search?kw=CranRich+Natural+Factors",
      certification: "CranRich 고농축 제형, Non-GMO",
      rating: 4.8,
      reviewCount: 8200
    }
  },
  {
    id: "supp-chlorophyllin",
    number: 90,
    name: "엽록소 & 클로로필린 (Chlorophyllin / 체취 제거 & 혈액 정화)",
    engName: "Liquid Chlorophyllin (Copper Chlorophyllin)",
    category: "식물영양소 & 항산화제",
    symbolOrAbbr: "Chlorophyll",
    oneLineSummary: "헤모글로빈과 유사한 구조, 구취 및 땀 냄새 체내 소취 작용, 장내 독소 흡착",
    dailyRDA: "총 엽록소 8~150 mg",
    optimalIntake: "100 mg (액상 1스푼)",
    deficiencySymptoms: ["흡연, 음주 후 심해지는 입냄새와 몸냄새", "노인성 체취(노넨알데하이드)", "장의 부패 가스"],
    foodSources: [
      { foodName: "밀싹 (Wheatgrass)", contentPer100g: "생엽록소 70%", portionTip: "신선한 착즙 주스" },
      { foodName: "시금치 / 파슬리", contentPer100g: "짙은 녹색 채소", portionTip: "자연 녹색소" }
    ],
    foodLimitationReason: "자연 엽록소는 지용성이라 물에 잘 안 섞이나 수용성 구리 클로로필린은 몸 전체로 빠르게 흡수되어 즉각 소취.",
    bestSupplementForm: {
      recommendedForm: "알팔파 잎 추출 프리미엄 액상 나트륨-구리 클로로필린 (민트향)",
      inferiorFormWarning: "옷에 묻으면 얼룩이 질 수 있으므로 주의",
      absorptionTip: "물 한 잔에 1스푼(100mg) 타서 식후 또는 아침에 시원하게 마시기"
    },
    targetDemographics: ["4050 중년", "60대+ 노년기", "2030 청년"],
    genders: ["공통", "남성"],
    seasons: ["여름", "사계절"],
    occupations: ["사무직/직장인"],
    targetOrgans: ["장 건강", "간 & 피로"],
    deal: {
      brand: "Nature's Way",
      productName: "Chlorofresh Liquid Chlorophyll (Natural Mint 473ml)",
      spec: "액상 473ml / 32회분",
      originalPrice: 24000,
      dealPrice: 16800,
      discountPercent: 30,
      couponCode: "FRESH30",
      iherbUrl: "https://www.iherb.com/search?kw=Chlorofresh+Natures+Way",
      certification: "프리미엄 알팔파 추출 식물성 원료",
      rating: 4.8,
      reviewCount: 26400
    }
  },
  {
    id: "supp-rutin-hesperidin",
    number: 91,
    name: "루틴 & 헤스페리딘 (비타민 P / 모세혈관 탄력 강화)",
    engName: "Rutin & Citrus Bioflavonoids (Vitamin P)",
    category: "식물영양소 & 항산화제",
    symbolOrAbbr: "Vitamin P",
    oneLineSummary: "모세혈관 투과성 정상화, 멍이 잘 들거나 잇몸 피 나는 출혈성 경향 개선, 치질 완화",
    dailyRDA: "미설정",
    optimalIntake: "500 mg 복합체",
    deficiencySymptoms: ["살짝 부딪혀도 푸른 멍이 쉽게 듦", "양치 시 잇몸 출혈", "다리 실핏줄(모세혈관 확장증) 돌출"],
    foodSources: [
      { foodName: "메밀 (메밀차 / 메밀국수)", contentPer100g: "루틴의 보고", portionTip: "쓴메밀에 70배 함유" },
      { foodName: "감귤류 하얀 속껍질", contentPer100g: "헤스페리딘 집중", portionTip: "귤 깔 때 떼어내지 말고 섭취" }
    ],
    foodLimitationReason: "감귤의 흰 속껍질을 버리고 과육만 먹는 습관 때문에 비타민 P 결핍이 흔함.",
    bestSupplementForm: {
      recommendedForm: "소포라 자포니카(회화나무) 추출 루틴 500mg + 감귤 바이오플라보노이드 복합체",
      inferiorFormWarning: "비타민 C 없이 복용하면 혈관 콜라겐 강화 작용이 반감",
      absorptionTip: "비타민 C와 1:1로 함께 식후 복용"
    },
    targetDemographics: ["4050 중년", "60대+ 노년기", "2030 청년"],
    genders: ["여성", "공통"],
    seasons: ["사계절"],
    occupations: ["사무직/직장인", "활동량 많은 직업/운동인"],
    targetOrgans: ["심혈관 & 혈액순환", "피부 & 모발"],
    deal: {
      brand: "NOW Foods",
      productName: "Rutin 450mg",
      spec: "100 베지 캡슐",
      originalPrice: 19000,
      dealPrice: 13300,
      discountPercent: 30,
      couponCode: "VEIN30",
      iherbUrl: "https://www.iherb.com/search?kw=Rutin+Now+Foods",
      certification: "비감귤류 식물 유래, Non-GMO",
      rating: 4.8,
      reviewCount: 4900
    }
  },
  {
    id: "supp-carnosine",
    number: 92,
    name: "L-카르노신 (L-Carnosine 500mg / 당화 최종산물 AGEs 차단)",
    engName: "L-Carnosine (Anti-Glycation & Telomere Protector)",
    category: "아미노산 & 단백질",
    symbolOrAbbr: "Carnosine",
    oneLineSummary: "혈관 및 렌즈 단백질의 당화(갈변 현상) 억제, 백내장 예방, 세포 수명 텔로미어 단축 지연",
    dailyRDA: "미설정",
    optimalIntake: "500~1,000 mg",
    deficiencySymptoms: ["피부 당화로 인한 황색 칙칙함", "수정체 혼탁(백내장 초기)", "동맥 탄력 상실"],
    foodSources: [
      { foodName: "소고기 및 말고기 근육", contentPer100g: "육류 함유", portionTip: "채식주의자는 체내 수치 50% 이하" }
    ],
    foodLimitationReason: "음식으로 섭취 시 혈청 카르노시나아제에 의해 아미노산으로 분해되어 조직 내 축적이 어려움.",
    bestSupplementForm: {
      recommendedForm: "순수 고순도 L-카르노신 500mg (아연 카르노신 PepZin GI®와 구분하여 사용)",
      inferiorFormWarning: "위장 궤양에는 PepZin GI가 좋고, 전신 항노화에는 순수 L-카르노신이 적합",
      absorptionTip: "아침 공복 또는 탄수화물 식사 30분 전 복용"
    },
    targetDemographics: ["60대+ 노년기", "4050 중년"],
    genders: ["공통"],
    seasons: ["사계절"],
    occupations: ["사무직/직장인"],
    targetOrgans: ["눈 건강", "심혈관 & 혈액순환", "뇌 & 인지기능"],
    deal: {
      brand: "Doctor's Best",
      productName: "L-Carnosine with PepZin GI",
      spec: "90 베지 캡슐",
      originalPrice: 32000,
      dealPrice: 22400,
      discountPercent: 30,
      couponCode: "AGELOCK30",
      iherbUrl: "https://www.iherb.com/search?kw=Carnosine+Doctors+Best",
      certification: "고순도 의약품급 아미노산",
      rating: 4.8,
      reviewCount: 3600
    }
  },
  {
    id: "supp-zinc-carnosine",
    number: 93,
    name: "아연-L-카르노신 (PepZin GI® / 위 점막 밀착 치료)",
    engName: "Zinc-L-Carnosine (PepZin GI Mucosal Barrier)",
    category: "장 건강 & 특수기능성",
    symbolOrAbbr: "PepZin GI",
    oneLineSummary: "위산 속에서도 분해되지 않고 위염 궤양 부위에 직접 달라붙어 세포 증식 재생 촉진",
    dailyRDA: "아연 16mg 상당",
    optimalIntake: "75 mg (PepZin GI 표준 용량)",
    deficiencySymptoms: ["만성 위축성 위염 및 장상피화생", "헬리코박터 제균 후 위벽 손상", "소염진통제로 인한 위궤양"],
    foodSources: [
      { foodName: "일본에서 개발된 킬레이트 특허 화합물", contentPer100g: "식품 존재 안 함", portionTip: "일본에서는 전문의약품으로 승인" }
    ],
    foodLimitationReason: "일반 아연염(글루콘산 아연 등)은 위산에서 해리되어 위를 자극하고 속 쓰림을 유발하지만, PepZin GI는 위 점막에 밀착 치료 작용을 함.",
    bestSupplementForm: {
      recommendedForm: "오리지널 일본 하마리(Hamari)사 특허 PepZin GI® 75mg (Zinc 16mg + Carnosine 59mg)",
      inferiorFormWarning: "단순 아연과 카르노신을 물리적으로 섞은 복합제는 위산에 분해되므로 특허 킬레이트 결합 확인",
      absorptionTip: "아침 식전 공복 및 취침 전 미온수와 복용"
    },
    targetDemographics: ["4050 중년", "60대+ 노년기", "2030 청년"],
    genders: ["공통"],
    seasons: ["사계절"],
    occupations: ["사무직/직장인", "교대근무/야간직"],
    targetOrgans: ["장 건강"],
    deal: {
      brand: "Doctor's Best",
      productName: "PepZin GI Zinc-L-Carnosine Complex",
      spec: "120 베지 캡슐 / 일본 특허",
      originalPrice: 28000,
      dealPrice: 19600,
      discountPercent: 30,
      couponCode: "STOMACH30",
      iherbUrl: "https://www.iherb.com/search?kw=PepZin+GI+Doctors+Best",
      certification: "Hamari Chemicals 정품 특허 인증",
      rating: 4.9,
      reviewCount: 18900
    }
  },
  {
    id: "supp-apigenin",
    number: 94,
    name: "아피제닌 (Apigenin 50mg / CD38 효소 억제 & 깊은 수면)",
    engName: "Apigenin (Chamomile Extract & CD38 Inhibitor)",
    category: "식물영양소 & 항산화제",
    symbolOrAbbr: "Apigenin",
    oneLineSummary: "NAD+ 파괴 효소 CD38 억제(항노화), 뇌 GABA 수용체 자극으로 렘수면 및 서파 수면 증폭",
    dailyRDA: "미설정",
    optimalIntake: "50 mg",
    deficiencySymptoms: ["스마트폰 불빛 노출 후 뇌 각성 지속", "꿈을 많이 꾸며 자고 일어나도 개운치 않음", "노화로 인한 NAD+ 급감"],
    foodSources: [
      { foodName: "말린 파슬리", contentPer100g: "4.5 g", portionTip: "식품 중 아피제닌 함량 1위" },
      { foodName: "카모마일 차 (Chamomile Tea)", contentPer100g: "꽃잎에 농축", portionTip: "취침 전 전통 허브티" },
      { foodName: "셀러리", contentPer100g: "소량 함유", portionTip: "플라본 성분" }
    ],
    foodLimitationReason: "카모마일 차 한 잔 속 아피제닌은 2~3mg에 불과하여 수면 뇌파 및 CD38 억제 임상 용량(50mg)에 도달 불가.",
    bestSupplementForm: {
      recommendedForm: "고순도 98% 아피제닌 50mg (카모마일 유래) 캡슐",
      inferiorFormWarning: "임산부는 자궁 수축 우려가 있으므로 고용량 주의",
      absorptionTip: "취침 45분 전 마그네슘 L-트레오네이트, L-테아닌과 함께 '휴버먼(Huberman) 수면 칵테일'로 섭취"
    },
    targetDemographics: ["2030 청년", "4050 중년", "60대+ 노년기"],
    genders: ["공통"],
    seasons: ["사계절"],
    occupations: ["사무직/직장인", "교대근무/야간직"],
    targetOrgans: ["뇌 & 인지기능"],
    deal: {
      brand: "Swanson",
      productName: "Apigenin 50mg (from Chamomile)",
      spec: "90 베지 캡슐",
      originalPrice: 21000,
      dealPrice: 14700,
      discountPercent: 30,
      couponCode: "SLEEP30",
      iherbUrl: "https://www.iherb.com/search?kw=Apigenin+50mg",
      certification: "순도 98% 식물성 플라보노이드",
      rating: 4.7,
      reviewCount: 4200
    }
  },
  {
    id: "supp-fisetin",
    number: 95,
    name: "피세틴 (Fisetin 100mg / 세놀리틱 좀비세포 청소)",
    engName: "Fisetin (Novusetin / Senolytic Zombie Cell Killer)",
    category: "식물영양소 & 항산화제",
    symbolOrAbbr: "Fisetin",
    oneLineSummary: "더 이상 분열하지 않고 염증을 내뿜는 노화 세포(좀비 세포)만 골라 사멸 유도(Senolytic)",
    dailyRDA: "미설정",
    optimalIntake: "100 mg (지질 결합 제형)",
    deficiencySymptoms: ["노화에 따른 전신 만성 염증 지수(SASP) 증가", "조직 재생력 둔화", "기억력 감퇴"],
    foodSources: [
      { foodName: "신선한 딸기 (Strawberries)", contentPer100g: "16 mg", portionTip: "자연계 피세틴 1위 공급원" },
      { foodName: "사과 / 감", contentPer100g: "2~3 mg", portionTip: "소량" }
    ],
    foodLimitationReason: "세놀리틱(Senolytic) 연구에서 사용되는 피세틴 용량을 얻으려면 매일 딸기 10kg을 먹어야 하므로 당분 과다 위험.",
    bestSupplementForm: {
      recommendedForm: "옻나무 추출 Novusetin® 특허 피세틴 또는 바이오피세틴(Bio-Fisetin) 파이토솜 (생체이용률 25배)",
      inferiorFormWarning: "단순 무변형 피세틴은 소장에서 글루쿠론산화되어 생체 흡수율이 낮음",
      absorptionTip: "기름진 식사 직후 복용하거나 지방(올리브유)과 함께 섭취"
    },
    targetDemographics: ["60대+ 노년기", "4050 중년"],
    genders: ["공통"],
    seasons: ["사계절"],
    occupations: ["사무직/직장인"],
    targetOrgans: ["뇌 & 인지기능", "심혈관 & 혈액순환"],
    deal: {
      brand: "Doctor's Best",
      productName: "Fisetin with Novusetin 100mg",
      spec: "30 베지 캡슐 / 좀비세포 청소",
      originalPrice: 34000,
      dealPrice: 23800,
      discountPercent: 30,
      couponCode: "SENOLYTIC30",
      iherbUrl: "https://www.iherb.com/search?kw=Novusetin+Fisetin",
      certification: "Novusetin 일본 왁스나무 추출 특허",
      rating: 4.8,
      reviewCount: 3900
    }
  },
  {
    id: "supp-ergothioneine",
    number: 96,
    name: "에르고티오네인 (Ergothioneine / 장수 비타민 항산화)",
    engName: "L-Ergothioneine (MitoPrime / Longevity Antioxidant)",
    category: "식물영양소 & 항산화제",
    symbolOrAbbr: "Ergo",
    oneLineSummary: "인체 세포에 전용 수송체(OCTN1)가 존재하는 유일한 항산화제, 미토콘드리아 DNA 직통 보호",
    dailyRDA: "미설정 (최근 과학계 장수 비타민 지정 제안)",
    optimalIntake: "5~10 mg",
    deficiencySymptoms: ["조기 노화 및 인지 기능 저하", "심혈관 산화 손상", "신경 퇴행성 변화"],
    foodSources: [
      { foodName: "노루궁뎅이버섯 / 느타리버섯", contentPer100g: "식용 버섯류에 집중", portionTip: "열을 가해도 파괴되지 않음" },
      { foodName: "포르치니 버섯", contentPer100g: "버섯 중 최고 함량", portionTip: "이탈리아 고급 버섯" }
    ],
    foodLimitationReason: "현대 농경의 화학비료와 살균제로 인해 토양 속 균류가 줄어들며 채소 작물 속 에르고티오네인 함량이 급격히 고갈됨.",
    bestSupplementForm: {
      recommendedForm: "발효 공법 순수 L-에르고티오네인 MitoPrime® 5mg",
      inferiorFormWarning: "합성 이성질체가 섞이지 않은 100% 천연형 L-이성질체 확인",
      absorptionTip: "식사와 상관없이 하루 1회 꾸준히 복용 시 체내 모든 장기 세포에 축적"
    },
    targetDemographics: ["60대+ 노년기", "4050 중년"],
    genders: ["공통"],
    seasons: ["사계절"],
    occupations: ["사무직/직장인"],
    targetOrgans: ["뇌 & 인지기능", "심혈관 & 혈액순환", "눈 건강"],
    deal: {
      brand: "Life Extension",
      productName: "Ergothioneine 5mg (MitoPrime)",
      spec: "30 베지 캡슐 / 세포 수명 연장",
      originalPrice: 32000,
      dealPrice: 24000,
      discountPercent: 25,
      couponCode: "LONGEVITY25",
      iherbUrl: "https://www.iherb.com/search?kw=Ergothioneine",
      certification: "MitoPrime 글로벌 특허 원료",
      rating: 4.8,
      reviewCount: 2800
    }
  },
  {
    id: "supp-spermidine",
    number: 97,
    name: "스페르미딘 (Spermidine 1~5mg / 세포 자가포식 오토파지)",
    engName: "Spermidine (Wheat Germ Autophagy Trigger)",
    category: "식물영양소 & 항산화제",
    symbolOrAbbr: "Spermidine",
    oneLineSummary: "세포 내부의 찌꺼기와 손상된 미토콘드리아를 청소하는 '오토파지(Autophagy)' 직접 유도",
    dailyRDA: "미설정",
    optimalIntake: "1~6 mg",
    deficiencySymptoms: ["세포 노화 노폐물 축적", "심근 비대 및 심혈관 탄력 저하", "모낭 줄기세포 노화"],
    foodSources: [
      { foodName: "발아 밀 배아 (Wheat Germ)", contentPer100g: "24 mg", portionTip: "스페르미딘 천연 최고 원천" },
      { foodName: "낫토 (청국장)", contentPer100g: "콩 발효 시 생성", portionTip: "폴리아민 풍부" },
      { foodName: "숙성 치즈", contentPer100g: "숙성 과정 생성", portionTip: "파마산 치즈" }
    ],
    foodLimitationReason: "밀 배아 기름은 산패되기 쉽고, 낫토나 치즈를 매일 과량 섭취하기 어려운 현대 식단.",
    bestSupplementForm: {
      recommendedForm: "스페르미딘 함량이 표준화된 유기농 밀 배아 추출물 (SpermidineLIFE® 1mg)",
      inferiorFormWarning: "글루텐 불내증이나 셀리악병 환자는 글루텐 프리 검증 제형 확인",
      absorptionTip: "간헐적 단식(16시간 공복)과 병행 시 자가포식 스위치가 폭발적으로 활성화"
    },
    targetDemographics: ["60대+ 노년기", "4050 중년"],
    genders: ["공통"],
    seasons: ["사계절"],
    occupations: ["사무직/직장인"],
    targetOrgans: ["심혈관 & 혈액순환", "뇌 & 인지기능", "피부 & 모발"],
    deal: {
      brand: "Double Wood Supplements",
      productName: "Spermidine 5mg (Fermented Wheat Germ)",
      spec: "120 캡슐 / 2개월분",
      originalPrice: 48000,
      dealPrice: 36000,
      discountPercent: 25,
      couponCode: "AUTOPHAGY25",
      iherbUrl: "https://www.iherb.com/search?kw=Spermidine",
      certification: "제3자 순도 테스트 완료, 미국 제조",
      rating: 4.7,
      reviewCount: 3100
    }
  },
  {
    id: "supp-phosphatidylcholine",
    number: 98,
    name: "포스파티딜콜린 (PC / 간세포막 복원 & 담즙 배출)",
    engName: "Phosphatidylcholine (Polyenylphosphatidylcholine PPC)",
    category: "지방산 & 지질",
    symbolOrAbbr: "PC",
    oneLineSummary: "간세포막 인지질 50% 구성, 비알코올성 지방간 치유 및 혈관 내피 플라크 축적 억제",
    dailyRDA: "콜린 400~550 mg",
    optimalIntake: "1,200~2,400 mg (PPC 순도 76% 이상)",
    deficiencySymptoms: ["간 기능 저하 및 지방간 축적", "담즙 분비 저하로 인한 소화장애", "세포막 유연성 저하"],
    foodSources: [
      { foodName: "유기농 달걀 노른자", contentPer100g: "자연 최고 급원", portionTip: "매일 2개 섭취 권장" },
      { foodName: "대두 레시틴", contentPer100g: "20% PC 함유", portionTip: "고농축 필요" }
    ],
    foodLimitationReason: "콜레스테롤 우려로 달걀 노른자를 기피하는 사람들에게 결핍 발생, 고순도 PPC는 일반 레시틴의 3배 농축.",
    bestSupplementForm: {
      recommendedForm: "폴리엔포스파티딜콜린 (PPC 900mg 소프트젤)",
      inferiorFormWarning: "단순 저가 과립 레시틴은 지방산 함량이 높고 유효 PC 비율이 20%에 불과",
      absorptionTip: "식사 직후 복용 시 음식 속 지용성 비타민과 약물의 장 흡수율도 함께 증대"
    },
    targetDemographics: ["4050 중년", "60대+ 노년기", "2030 청년"],
    genders: ["공통"],
    seasons: ["사계절"],
    occupations: ["사무직/직장인"],
    targetOrgans: ["간 & 피로", "뇌 & 인지기능", "심혈관 & 혈액순환"],
    deal: {
      brand: "Life Extension",
      productName: "Phosphatidylcholine 840mg",
      spec: "60 소프트젤",
      originalPrice: 24000,
      dealPrice: 16800,
      discountPercent: 30,
      couponCode: "LIVER30",
      iherbUrl: "https://www.iherb.com/search?kw=Phosphatidylcholine+Life+Extension",
      certification: "고순도 PPC 추출 농축",
      rating: 4.8,
      reviewCount: 4800
    }
  },
  {
    id: "supp-chlorella",
    number: 99,
    name: "클로렐라 (Chlorella / CGF 세포 재생 성장인자)",
    engName: "Broken Cell Wall Chlorella (CGF Growth Factor)",
    category: "식물영양소 & 항산화제",
    symbolOrAbbr: "Chlorella",
    oneLineSummary: "세포벽 파쇄 공법, CGF(클로렐라 성장인자)로 손상된 세포 조직 빠른 재생, 다이옥신 배출",
    dailyRDA: "총 엽록소 8~150 mg",
    optimalIntake: "2,000~3,000 mg",
    deficiencySymptoms: ["환경호르몬 및 농약/중금속 체내 잔류 염려", "상처 및 피부 트러블 회복 지연", "면역력 저하"],
    foodSources: [
      { foodName: "담수 녹조류 클로렐라", contentPer100g: "엽록소 밀도 자연계 1위", portionTip: "원형 그대로는 단단한 세포벽으로 소화 불가" }
    ],
    foodLimitationReason: "클로렐라의 세포벽은 셀룰로오스로 단단히 굳어 있어, 세포벽 파쇄 기술이 없는 제품은 먹어도 80%가 그대로 변으로 나옴.",
    bestSupplementForm: {
      recommendedForm: "저온 물리적 파쇄 기술을 적용한 '세포벽 파쇄 클로렐라(Broken Cell Wall)' 타블렛",
      inferiorFormWarning: "세포벽 미파쇄 제품 피하기 (소화흡수율이 40% 이하로 급감)",
      absorptionTip: "하루 2~3회 나누어 식전 미온수와 함께 섭취"
    },
    targetDemographics: ["2030 청년", "4050 중년", "60대+ 노년기"],
    genders: ["공통"],
    seasons: ["사계절", "봄"],
    occupations: ["사무직/직장인"],
    targetOrgans: ["간 & 피로", "피부 & 모발", "면역 & 호흡기"],
    deal: {
      brand: "Sun Chlorella",
      productName: "Sun Chlorella A 200mg",
      spec: "1500 정 / 일본 오리지널 DYNO-Mill 파쇄",
      originalPrice: 62000,
      dealPrice: 46500,
      discountPercent: 25,
      couponCode: "GREEN25",
      iherbUrl: "https://www.iherb.com/search?kw=Sun+Chlorella",
      certification: "DYNO-Mill 95% 세포벽 파쇄 특허",
      rating: 4.8,
      reviewCount: 8900
    }
  },
  {
    id: "supp-whey-isolate",
    number: 100,
    name: "WPI 분리유청단백질 (Whey Protein Isolate / 유당 0%)",
    engName: "Whey Protein Isolate (WPI 90%+ Cold Processed)",
    category: "아미노산 & 단백질",
    symbolOrAbbr: "WPI",
    oneLineSummary: "유당 불내증 없이 소화되는 순도 90% 완전 단백질, 노년기 근육 감소 완벽 방어선",
    dailyRDA: "체중 1kg당 1.0~1.2g",
    optimalIntake: "1회 25~30 g (류신 3g 보장)",
    deficiencySymptoms: ["나이 들며 가늘어지는 종아리와 허벅지", "조금만 걸어도 다리가 풀리는 근감소증", "우유 마시면 뱃속 부글거림과 설사"],
    foodSources: [
      { foodName: "치즈 제조 시 분리되는 유청", contentPer100g: "단백질 생물가 104 (자연계 1위)", portionTip: "흡수 속도 최고" }
    ],
    foodLimitationReason: "일반 우유나 WPC(농축유청)는 유당(Lactose)이 포함되어 한국인의 75%가 소화하지 못하고 복통/설사를 겪음.",
    bestSupplementForm: {
      recommendedForm: "교차류 미세여과(CFM) 저온 공법 100% 분리유청단백질 (WPI - 유당 99.9% 제거, 단백질 90% 이상)",
      inferiorFormWarning: "단순 대두 단백질만 고집하면 류신과 메티오닌 함량이 낮아 노년기 근단백 동화 작용 자극이 약함",
      absorptionTip: "가벼운 산책이나 계단 오르기 운동 직후 30분 이내 물 200ml에 타서 섭취"
    },
    targetDemographics: ["60대+ 노년기", "활동량 많은 직업/운동인", "4050 중년"],
    genders: ["공통"],
    seasons: ["사계절"],
    occupations: ["활동량 많은 직업/운동인", "사무직/직장인"],
    targetOrgans: ["관절 & 뼈", "간 & 피로"],
    deal: {
      brand: "California Gold Nutrition",
      productName: "100% Whey Protein Isolate (WPI 90%) 2.27kg",
      spec: "무맛 대용량 2.27kg / 75회분 (1회 단백질 27g)",
      originalPrice: 78000,
      dealPrice: 54600,
      discountPercent: 30,
      couponCode: "PROTEIN30",
      iherbUrl: "https://www.iherb.com/search?kw=WPI+California+Gold+Nutrition",
      certification: "위스콘신 A등급 유청, 제3자 순도 검증",
      rating: 4.9,
      reviewCount: 38400
    }
  }
];

// Merge all 7 files into one definitive 100-nutrient array
export const all100Nutrients: NutrientItem[] = [
  ...vitaminsList,         // 18 items (#1 ~ #18)
  ...mineralsList,         // 16 items (#19 ~ #34)
  ...aminoAcidsList,       // 10 items (#35 ~ #44)
  ...fattyAcidsList,       // 6 items (#45 ~ #50)
  ...phytonutrientsList,   // 7 items (#51 ~ #57)
  ...gutSpecialtyList,     // 6 items (#58 ~ #63)
  ...remainingNutrientsList, // 7 items (#64 ~ #70)
  ...supplementaryNutrients  // 30 items (#71 ~ #100)
];

// Helper to filter by search keyword
export function filterNutrients(
  nutrients: NutrientItem[],
  query: string,
  category?: string,
  targetOrgan?: string,
  demographic?: string,
  gender?: string,
  season?: string,
  occupation?: string
): NutrientItem[] {
  return nutrients.filter((item) => {
    if (category && category !== "전체" && item.category !== category) return false;
    if (targetOrgan && targetOrgan !== "전체" && !item.targetOrgans.includes(targetOrgan as any)) return false;
    if (demographic && demographic !== "전체" && !item.targetDemographics.includes(demographic as any)) return false;
    if (gender && gender !== "전체" && !item.genders.includes(gender as any) && !item.genders.includes("공통")) return false;
    if (season && season !== "전체" && !item.seasons.includes(season as any) && !item.seasons.includes("사계절")) return false;
    if (occupation && occupation !== "전체" && !item.occupations.includes(occupation as any)) return false;

    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      item.name.toLowerCase().includes(q) ||
      item.engName.toLowerCase().includes(q) ||
      item.oneLineSummary.toLowerCase().includes(q) ||
      item.deficiencySymptoms.some((s) => s.toLowerCase().includes(q)) ||
      item.foodSources.some((f) => f.foodName.toLowerCase().includes(q)) ||
      item.bestSupplementForm.recommendedForm.toLowerCase().includes(q)
    );
  });
}
