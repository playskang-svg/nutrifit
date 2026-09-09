import { NutrientItem } from "../types";

export const mineralsList: NutrientItem[] = [
  {
    id: "mineral-mg",
    number: 19,
    name: "마그네슘 (글리시네이트 / 트레오네이트)",
    engName: "Magnesium (Bisglycinate / L-Threonate)",
    category: "미네랄",
    symbolOrAbbr: "Mg",
    oneLineSummary: "300가지 효소 반응 조절, 신경 안정 GABA 활성, 근육 경련/눈떨림 완화",
    dailyRDA: "350~400 mg",
    optimalIntake: "400~600 mg (킬레이트 제형)",
    deficiencySymptoms: ["눈 밑 떨림 및 종아리 쥐남", "불면증 및 깊은 수면(서파 수면) 장애", "편두통 및 만성 신경 과민", "심장 두근거림 및 부정맥 위험"],
    foodSources: [
      { foodName: "호박씨 / 아몬드", contentPer100g: "535 mg", portionTip: "하루 한 줌으로 마그네슘 절반 공급" },
      { foodName: "시금치", contentPer100g: "79 mg", portionTip: "엽록소 중심에 마그네슘 분자 위치" },
      { foodName: "다크 초콜릿 (카카오 85%+)", contentPer100g: "228 mg", portionTip: "항산화 폴리페놀과 함께 섭취" }
    ],
    foodLimitationReason: "현대 농경지의 토양 고갈로 50년 전 대비 채소 속 마그네슘 함량이 최대 40% 감소했으며, 커피/가공식품의 인산염이 배출을 가속화함.",
    bestSupplementForm: {
      recommendedForm: "위장장애 없는 TRAACS® 아미노산 킬레이트(Bisglycinate) 또는 뇌 장벽 투과 마그네슘 L-트레오네이트(Magtein®)",
      inferiorFormWarning: "산화마그네슘(Oxide)은 장 흡수율이 4% 미만이며 삼투성 설사를 유발하므로 신경/수면용으로 부적합",
      absorptionTip: "신경 이완 및 숙면을 위해 취침 30분~1시간 전 따뜻한 물과 함께 복용"
    },
    targetDemographics: ["60대+ 노년기", "2030 청년", "4050 중년", "청소년/학생"],
    genders: ["공통"],
    seasons: ["사계절"],
    occupations: ["사무직/직장인", "수험생/학생", "활동량 많은 직업/운동인"],
    targetOrgans: ["눈 건강", "뇌 & 인지기능", "관절 & 뼈", "심혈관 & 혈액순환"],
    deal: {
      brand: "Doctor's Best",
      productName: "High Absorption Magnesium Glycinate 100mg",
      spec: "240정 / TRAACS 킬레이트 특허",
      certification: "TRAACS 오리지널 킬레이트, Non-GMO",
    }
  },
  {
    id: "mineral-ca",
    number: 20,
    name: "칼슘 (구연산칼슘 / 비소성 해조칼슘)",
    engName: "Calcium (Citrate / Aquamin Marine Algae)",
    category: "미네랄",
    symbolOrAbbr: "Ca",
    oneLineSummary: "뼈와 치아 구조 형성, 근육 수축 및 신경 신호 전달, 골밀도 유지",
    dailyRDA: "700~800 mg",
    optimalIntake: "600~800 mg (반드시 D3+K2+마그네슘과 배합)",
    deficiencySymptoms: ["노년기 골다공증 및 골절 위험", "치아 흔들림 및 상아질 소실", "근육 경련 및 손발 저림", "골연화증"],
    foodSources: [
      { foodName: "뱅어포 / 멸치", contentPer100g: "980 mg", portionTip: "뼈째 먹는 생선은 최고의 칼슘원" },
      { foodName: "파마산 치즈 / 유제품", contentPer100g: "1,180 mg", portionTip: "유당과 함께 흡수 촉진" },
      { foodName: "케일 / 청경채", contentPer100g: "150 mg", portionTip: "시금치보다 옥살산이 적어 칼슘 흡수 우수" }
    ],
    foodLimitationReason: "탄산음료 속 인산, 짠 음식(나트륨), 노년기 위산 저하로 인해 음식 속 칼슘 흡수율은 20~30%에 불과함.",
    bestSupplementForm: {
      recommendedForm: "위산 없이도 흡수되는 구연산칼슘(Citrate) 또는 미네랄 72종이 동반된 아이슬란드 해조칼슘(Aquamin®)",
      inferiorFormWarning: "탄산칼슘(Carbonate)은 위산이 부족한 노년층에게 속 쓰림, 가스, 변비를 유발하며 혈관 석회화 위험 증가",
      absorptionTip: "칼슘 단독 섭취는 심혈관 결석 위험이 있으므로 반드시 마그네슘(2:1 비율) 및 비타민 K2(MK-7)와 함께 복용"
    },
    targetDemographics: ["60대+ 노년기", "4050 중년"],
    genders: ["여성", "공통"],
    seasons: ["겨울", "사계절"],
    occupations: ["사무직/직장인"],
    targetOrgans: ["관절 & 뼈", "심혈관 & 혈액순환"],
    deal: {
      brand: "Solaray",
      productName: "Calcium Citrate with Vitamin D3",
      spec: "캡슐 240정",
      certification: "위장 흡수 최적화 Citrate, Lab Verified",
    }
  },
  {
    id: "mineral-zn",
    number: 21,
    name: "아연 (피콜리네이트 / 비스글리시네이트)",
    engName: "Zinc (Picolinate / Bisglycinate)",
    category: "미네랄",
    symbolOrAbbr: "Zn",
    oneLineSummary: "T세포 면역 활성화, 남성 테스토스테론 및 전립선 보호, 미각 유지 및 상처 재생",
    dailyRDA: "8~11 mg",
    optimalIntake: "25~30 mg",
    deficiencySymptoms: ["감기 등 바이러스 감염 빈발", "미각/후각 둔화 및 식욕 감퇴", "남성 성기능 및 정자 운동성 저하", "여드름 및 상처 치유 지연"],
    foodSources: [
      { foodName: "자연산 굴 (Oyster)", contentPer100g: "16 mg", portionTip: "자연계 압도적 1위의 아연 보고" },
      { foodName: "쇠고기 사태 / 우둔살", contentPer100g: "7.2 mg", portionTip: "동물성 단백질과 함께 흡수" },
      { foodName: "호박씨", contentPer100g: "7.8 mg", portionTip: "남성 전립선 보호 간식" }
    ],
    foodLimitationReason: "곡류 위주의 한식 식단에 많은 '피트산(Phytic acid)'이 아연과 불용성 복합체를 형성해 흡수를 원천 차단함.",
    bestSupplementForm: {
      recommendedForm: "아연 피콜리네이트 (Zinc Picolinate) 또는 옵티징크(OptiZinc®, 메티오닌 결합형)",
      inferiorFormWarning: "황산아연(Sulfate)은 심한 메스꺼움과 위통을 유발하므로 피해야 함",
      absorptionTip: "고용량 아연(40mg 이상) 장기 복용 시 구리 결핍이 오므로 아연:구리(15:1) 밸런스 제품 선택 권장"
    },
    targetDemographics: ["4050 중년", "2030 청년", "60대+ 노년기", "청소년/학생"],
    genders: ["남성", "공통"],
    seasons: ["가을", "겨울", "봄", "사계절"],
    occupations: ["사무직/직장인", "활동량 많은 직업/운동인"],
    targetOrgans: ["면역 & 호흡기", "피부 & 모발", "간 & 피로"],
    deal: {
      brand: "Thorne",
      productName: "Zinc Picolinate 30mg",
      spec: "캡슐 60정",
      certification: "최고 생체이용률 Picolinate, NSF 인증",
    }
  },
  {
    id: "mineral-se",
    number: 22,
    name: "셀레늄 (셀레노메티오닌 / 효모 셀레늄)",
    engName: "Selenium (L-Selenomethionine)",
    category: "미네랄",
    symbolOrAbbr: "Se",
    oneLineSummary: "갑상선 호르몬(T4→T3) 전환 활성화, 글루타치온 과산화효소 핵심 보조인자",
    dailyRDA: "55 μg",
    optimalIntake: "100~200 μg",
    deficiencySymptoms: ["갑상선 기능 저하 및 신진대사 둔화", "항산화 방어선 붕괴 및 조기 노화", "남성 난임 및 정자 산화 손상", "심근증 (케샨병)"],
    foodSources: [
      { foodName: "브라질너트 (1~2알)", contentPer100g: "1,917 μg", portionTip: "단 2알로 하루 권장량 300% 충족 (과다섭취 주의)" },
      { foodName: "참치 및 대구", contentPer100g: "68 μg", portionTip: "수은 해독 시너지" },
      { foodName: "달걀", contentPer100g: "31 μg", portionTip: "노른자에 균일 함유" }
    ],
    foodLimitationReason: "브라질너트는 원산지 토양에 따라 함량 편차가 10배 이상 나며, 과다 복용 시 셀레늄 중독증(탈모, 손톱 손상) 위험 존재.",
    bestSupplementForm: {
      recommendedForm: "정밀 용량 제어가 가능한 유기태 L-셀레노메티오닌 (L-Selenomethionine) 200mcg",
      inferiorFormWarning: "무기태 아셀렌산나트륨(Sodium Selenite)은 체내 흡수 보유율이 유기태보다 현저히 떨어짐",
      absorptionTip: "비타민 E와 함께 섭취 시 지질 항산화 시너지 극대화"
    },
    targetDemographics: ["4050 중년", "60대+ 노년기", "2030 청년"],
    genders: ["공통", "남성"],
    seasons: ["사계절"],
    occupations: ["사무직/직장인"],
    targetOrgans: ["간 & 피로", "면역 & 호흡기", "피부 & 모발"],
    deal: {
      brand: "Life Extension",
      productName: "Super Selenium Complex 200mcg with Vit E",
      spec: "베지 캡슐 100정",
      certification: "Se-메틸 L-셀레노시스테인 포함 3종 복합",
    }
  },
  {
    id: "mineral-fe",
    number: 23,
    name: "철분 (비스글리시네이트 킬레이트)",
    engName: "Iron (Ferrochel Iron Bisglycinate)",
    category: "미네랄",
    symbolOrAbbr: "Fe",
    oneLineSummary: "헤모글로빈 산소 운반, 전신 조직 저산소증 예방, 어지럼증 및 만성 무기력 해소",
    dailyRDA: "10~14 mg (가임기 여성 14~18mg)",
    optimalIntake: "25~36 mg (빈혈 수치 저하 시)",
    deficiencySymptoms: ["기립성 어지럼증 및 창백한 안색", "만성 산소 부족 피로 및 숨참", "얼음 등을 씹고 싶은 이식증", "스푼형 손톱 및 탈모"],
    foodSources: [
      { foodName: "소고기 붉은 살코기", contentPer100g: "2.8 mg", portionTip: "흡수율 높은 헴철(Heme iron) 20~30% 흡수" },
      { foodName: "선지 / 조개류", contentPer100g: "12 mg", portionTip: "철분 밀도 최고" },
      { foodName: "시금치 및 콩류", contentPer100g: "3.5 mg", portionTip: "비헴철은 흡수율이 3~5%로 극히 낮음" }
    ],
    foodLimitationReason: "채소 속 비헴철은 흡수율이 낮고, 커피·녹차의 탄닌과 유제품의 칼슘이 철분 흡수를 최대 80% 방해함.",
    bestSupplementForm: {
      recommendedForm: "특허받은 알비온(Albion) 페로첼 비스글리시네이트 킬레이트 철분",
      inferiorFormWarning: "일반 황산제일철(Ferrous Sulfate)은 심한 변비, 위경련, 검은 변 및 장내 유해균 증식 유발",
      absorptionTip: "비타민 C 500mg과 함께 공복에 오렌지 주스나 물과 복용 시 흡수율 3배 증가 (칼슘/커피와 2시간 띄우기)"
    },
    targetDemographics: ["2030 청년", "4050 중년", "청소년/학생"],
    genders: ["여성"],
    seasons: ["사계절"],
    occupations: ["사무직/직장인", "수험생/학생"],
    targetOrgans: ["간 & 피로", "뇌 & 인지기능", "심혈관 & 혈액순환"],
    deal: {
      brand: "Solgar",
      productName: "Gentle Iron (부드러운 철분) 25mg",
      spec: "식물성 캡슐 180정 / 위장장애·변비 없음",
      certification: "Kosher Parve, 글루텐 프리, 비건",
    }
  },
  {
    id: "mineral-k",
    number: 24,
    name: "칼륨 (구연산칼륨 / 포타슘)",
    engName: "Potassium (Citrate / Gluconate)",
    category: "미네랄",
    symbolOrAbbr: "K",
    oneLineSummary: "체내 나트륨 배출, 혈압 강하, 세포 내 수분 평형 및 근육 펌핑 작용",
    dailyRDA: "3,500 mg",
    optimalIntake: "식단 중심 충족 + 보충제 99mg",
    deficiencySymptoms: ["얼굴 및 다리 부종 (나트륨 정체)", "고혈압 위험 및 혈관 수축", "근육 무력감 및 부정맥", "신장 결석 위험"],
    foodSources: [
      { foodName: "바나나 / 감자", contentPer100g: "400 mg", portionTip: "칼륨의 대명사 식품" },
      { foodName: "아보카도", contentPer100g: "485 mg", portionTip: "바나나보다 칼륨 함량이 높음" },
      { foodName: "토마토 및 시금치", contentPer100g: "300 mg", portionTip: "나트륨 배출 촉진" }
    ],
    foodLimitationReason: "라면, 찌개, 배달 음식 등 한국인의 초과잉 나트륨 식단(1일 4,000mg 이상)에 비해 칼륨 섭취량은 턱없이 부족.",
    bestSupplementForm: {
      recommendedForm: "구연산칼륨 (Potassium Citrate - 요산 및 신장 결석 완화에 우수)",
      inferiorFormWarning: "신장 질환자(투석 환자)는 고칼륨혈증 위험이 있으므로 절대 임의 복용 금지",
      absorptionTip: "물 2L 섭취와 함께 마그네슘과 밸런스를 맞추어 복용"
    },
    targetDemographics: ["2030 청년", "4050 중년", "60대+ 노년기"],
    genders: ["공통"],
    seasons: ["여름", "사계절"],
    occupations: ["사무직/직장인", "활동량 많은 직업/운동인"],
    targetOrgans: ["심혈관 & 혈액순환", "간 & 피로"],
    deal: {
      brand: "NOW Foods",
      productName: "Potassium Citrate 99mg",
      spec: "180 베지 캡슐",
      certification: "GMP 품질 보증, Non-GMO",
    }
  },
  {
    id: "mineral-i",
    number: 25,
    name: "요오드 (켈프 해조 요오드 / 칼륨 요오드)",
    engName: "Iodine (Kelp / Potassium Iodide)",
    category: "미네랄",
    symbolOrAbbr: "I",
    oneLineSummary: "갑상선 호르몬(티록신) 합성 필수 원료, 기초 대사율 및 체온 유지",
    dailyRDA: "150 μg",
    optimalIntake: "150~300 μg (한국인은 과다 섭취 주의)",
    deficiencySymptoms: ["갑상선종 및 갑상선 기능 저하", "체중 증가 및 오한", "극심한 무기력증", "피부 건조"],
    foodSources: [
      { foodName: "다시마 / 미역", contentPer100g: "수천 μg", portionTip: "한국인은 미역국 섭취로 자연 충족 용이" },
      { foodName: "김 (Gim)", contentPer100g: "적정량", portionTip: "도시락 김으로 가벼운 요오드 섭취" },
      { foodName: "대구 및 흰살생선", contentPer100g: "110 μg", portionTip: "서구식 식단 시 필수 공급원" }
    ],
    foodLimitationReason: "해조류를 전혀 먹지 않는 서구식 식단자나 엄격한 채식인은 결핍 위험, 반면 한국인은 과다 위험 공존.",
    bestSupplementForm: {
      recommendedForm: "천연 유기농 켈프(Kelp) 유래 요오드 표준화 제제 (150mcg 정확한 함량)",
      inferiorFormWarning: "갑상선 항진증이나 하시모토 갑상선염 환자는 고용량 요오드 복용 금기",
      absorptionTip: "셀레늄 및 아연과 함께 섭취 시 갑상선 호르몬 활성화 밸런스 유지"
    },
    targetDemographics: ["2030 청년", "4050 중년"],
    genders: ["여성", "공통"],
    seasons: ["겨울", "사계절"],
    occupations: ["사무직/직장인"],
    targetOrgans: ["간 & 피로", "피부 & 모발"],
    deal: {
      brand: "Life Extension",
      productName: "Sea-Iodine 1,000mcg",
      spec: "베지 캡슐 60정",
      certification: "유기농 해조 추출 복합체",
    }
  },
  {
    id: "mineral-cr",
    number: 26,
    name: "크롬 (피콜린산 크롬 / 크로뮴)",
    engName: "Chromium (Picolinate / Chromax)",
    category: "미네랄",
    symbolOrAbbr: "Cr",
    oneLineSummary: "혈당 조절 인자(GTF) 구성, 인슐린 감수성 증가, 탄수화물 폭식 욕구 억제",
    dailyRDA: "25~35 μg",
    optimalIntake: "200~500 μg",
    deficiencySymptoms: ["인슐린 저항성 및 식후 급격한 혈당 스파이크", "탄수화물 및 단 음식 갈망", "혈중 중성지방 상승", "식곤증"],
    foodSources: [
      { foodName: "브로콜리", contentPer100g: "11 μg", portionTip: "채소 중 가장 농축된 크롬원" },
      { foodName: "보리 및 통곡물", contentPer100g: "9 μg", portionTip: "식이섬유와 함께 혈당 조절" },
      { foodName: "맥주효모", contentPer100g: "풍부", portionTip: "천연 크롬 공급원" }
    ],
    foodLimitationReason: "정제 백미, 설탕, 가공식품을 섭취할 때 소변으로 크롬이 대량 배출되어 현대인의 90%가 크롬 부족 상태.",
    bestSupplementForm: {
      recommendedForm: "Chromax® 특허 피콜린산 크롬 (Chromium Picolinate)",
      inferiorFormWarning: "염화크롬(Inorganic)은 생체이용률이 1% 미만으로 거의 효과 없음",
      absorptionTip: "탄수화물이 포함된 점심 또는 저녁 식사 15분 전 복용 시 식후 혈당 스파이크 차단"
    },
    targetDemographics: ["4050 중년", "60대+ 노년기", "2030 청년"],
    genders: ["공통"],
    seasons: ["사계절"],
    occupations: ["사무직/직장인"],
    targetOrgans: ["간 & 피로", "심혈관 & 혈액순환"],
    deal: {
      brand: "NOW Foods",
      productName: "Chromium Picolinate 200mcg",
      spec: "250 베지 캡슐 / 8개월분",
      certification: "Non-GMO, GMP Certified",
    }
  },
  {
    id: "mineral-mn",
    number: 27,
    name: "망간 (글리시네이트 킬레이트)",
    engName: "Manganese (Bisglycinate Chelate)",
    category: "미네랄",
    symbolOrAbbr: "Mn",
    oneLineSummary: "연골 결합조직 합성 및 미토콘드리아 항산화 효소(Mn-SOD) 핵심 성분",
    dailyRDA: "3.5~4.0 mg",
    optimalIntake: "5~10 mg",
    deficiencySymptoms: ["관절 연골 퇴행 및 관절통", "골다공증 및 뼈 성장 둔화", "포도당 불내성", "항산화 방어력 저하"],
    foodSources: [
      { foodName: "홍차 및 녹차", contentPer100g: "다량", portionTip: "차 한 잔으로 망간 공급" },
      { foodName: "파인애플", contentPer100g: "0.9 mg", portionTip: "브로멜라인 효소와 함께 섭취" },
      { foodName: "헤이즐넛 / 피칸", contentPer100g: "5.6 mg", portionTip: "견과류 중 망간 밀도 최고" }
    ],
    foodLimitationReason: "칼슘 및 철분 영양제를 고함량으로 복용할 경우 장내에서 망간 흡수를 경쟁적으로 방해함.",
    bestSupplementForm: {
      recommendedForm: "TRAACS® 망간 비스글리시네이트 킬레이트",
      inferiorFormWarning: "황산망간 등 무기염은 흡수율이 낮고 장 자극 유발",
      absorptionTip: "글루코사민, MSM과 함께 섭취 시 관절 활액 및 연골 기질 합성 시너지"
    },
    targetDemographics: ["60대+ 노년기", "4050 중년"],
    genders: ["공통"],
    seasons: ["사계절"],
    occupations: ["활동량 많은 직업/운동인"],
    targetOrgans: ["관절 & 뼈", "간 & 피로"],
    deal: {
      brand: "Source Naturals",
      productName: "Manganese Chelate 10mg",
      spec: "250정",
      certification: "아미노산 킬레이트 결합형",
    }
  },
  {
    id: "mineral-cu",
    number: 28,
    name: "구리 (글리시네이트 / 세룰로플라스민)",
    engName: "Copper (Bisglycinate Chelate)",
    category: "미네랄",
    symbolOrAbbr: "Cu",
    oneLineSummary: "철분 대사 및 적혈구 형성 보조, 엘라스틴/콜라겐 가교 결합, 신경 수초 유지",
    dailyRDA: "800 μg",
    optimalIntake: "1~2 mg (아연 고함량 복용 시 필수 병용)",
    deficiencySymptoms: ["철분 보충에도 낫지 않는 빈혈", "조기 백발 및 모발 색소 탈색", "골다공증 및 결합조직 약화", "피로 및 저체온"],
    foodSources: [
      { foodName: "소간 / 굴", contentPer100g: "4.5 mg", portionTip: "천연 미네랄 균형의 보고" },
      { foodName: "다크 초콜릿", contentPer100g: "1.8 mg", portionTip: "구리와 마그네슘 동시 섭취" },
      { foodName: "캐슈넛", contentPer100g: "2.2 mg", portionTip: "오후 간식 활용" }
    ],
    foodLimitationReason: "아연 보충제(30mg 이상)를 단독으로 장기 복용하면 장에서 구리 흡수 억제 단백질(메탈로티오네인)이 증가해 구리 결핍 빈혈 초래.",
    bestSupplementForm: {
      recommendedForm: "비스글리시네이트 구리 킬레이트 2mg (아연:구리 15:1 비율 준수)",
      inferiorFormWarning: "윌슨병 환자나 간질환자는 구리 배출 장애가 있으므로 단독 섭취 금지",
      absorptionTip: "아연과 시차(최소 2시간)를 두고 복용하거나 밸런스 복합제 선택"
    },
    targetDemographics: ["4050 중년", "60대+ 노년기"],
    genders: ["공통"],
    seasons: ["사계절"],
    occupations: ["사무직/직장인"],
    targetOrgans: ["피부 & 모발", "심혈관 & 혈액순환", "간 & 피로"],
    deal: {
      brand: "Thorne",
      productName: "Copper Bisglycinate 2mg",
      spec: "60 캡슐",
      certification: "TRAACS 킬레이트 특허, NSF 인증",
    }
  },
  {
    id: "mineral-mo",
    number: 29,
    name: "몰리브덴 (아미노산 킬레이트)",
    engName: "Molybdenum (Glycinate Chelate)",
    category: "미네랄",
    symbolOrAbbr: "Mo",
    oneLineSummary: "아황산염(음식 방부제/와인 아황산염) 분해 효소 및 요산 대사 효소 보조인자",
    dailyRDA: "45 μg",
    optimalIntake: "150~500 μg",
    deficiencySymptoms: ["와인/건과일 섭취 후 두통 및 심장 두근거림 (아황산염 과민증)", "간 해독 2단계 황산화 부전", "피로 및 뇌 브레인 포그"],
    foodSources: [
      { foodName: "검은콩 / 강낭콩", contentPer100g: "180 μg", portionTip: "콩류가 가장 우수한 몰리브덴 급원" },
      { foodName: "귀리", contentPer100g: "35 μg", portionTip: "오트밀 식단" },
      { foodName: "토마토", contentPer100g: "9 μg", portionTip: "신선한 채소" }
    ],
    foodLimitationReason: "토양의 몰리브덴 결핍으로 인해 가공식품과 현대 농산물에서 섭취량이 급감함.",
    bestSupplementForm: {
      recommendedForm: "몰리브덴 글리시네이트 킬레이트 500mcg",
      inferiorFormWarning: "통풍 환자의 경우 과다 복용 시 요산 수치를 미세하게 올릴 수 있으므로 주의",
      absorptionTip: "글루타치온, NAC 복용 시 황화물 대사 병목을 뚫어주는 파트너로 함께 복용"
    },
    targetDemographics: ["2030 청년", "4050 중년"],
    genders: ["공통"],
    seasons: ["사계절"],
    occupations: ["사무직/직장인", "교대근무/야간직"],
    targetOrgans: ["간 & 피로", "뇌 & 인지기능"],
    deal: {
      brand: "Country Life",
      productName: "Chelated Molybdenum 150mcg",
      spec: "100 타블렛",
      certification: "글루텐 프리, 비건 인증",
    }
  },
  {
    id: "mineral-b",
    number: 30,
    name: "붕소 (보론 / 프루토보레이트 칼슘)",
    engName: "Boron (Calcium Fructoborate)",
    category: "미네랄",
    symbolOrAbbr: "B",
    oneLineSummary: "칼슘/마그네슘 뼈 소실 방지, 관절염 염증성 사이토카인(TNF-α) 억제, 성호르몬 밸런스",
    dailyRDA: "미설정",
    optimalIntake: "3~6 mg",
    deficiencySymptoms: ["소변을 통한 칼슘/마그네슘 급속 유출", "골관절염 통증 악화", "폐경 여성 및 남성 호르몬 저하", "기억력 저하"],
    foodSources: [
      { foodName: "건자두 (프룬)", contentPer100g: "2.7 mg", portionTip: "뼈 건강과 장운동에 탁월한 보론 공급원" },
      { foodName: "아보카도", contentPer100g: "1.4 mg", portionTip: "양질의 불포화지방 동반" },
      { foodName: "사과 (껍질째)", contentPer100g: "0.5 mg", portionTip: "펙틴과 함께 섭취" }
    ],
    foodLimitationReason: "신선한 과일과 견과류를 매일 대량 섭취하지 않는 이상 3mg 이상의 임상적 유효량 달성이 어려움.",
    bestSupplementForm: {
      recommendedForm: "식물성 복합체 프루토보레이트 칼슘 (FruiteX-B®) 또는 보론 글리시네이트",
      inferiorFormWarning: "단순 붕산염 분말은 장 자극 가능",
      absorptionTip: "골다공증 및 관절염 환자의 경우 비타민 D3, 칼슘, 마그네슘과 4각 편대로 섭취"
    },
    targetDemographics: ["60대+ 노년기", "4050 중년"],
    genders: ["여성", "남성", "공통"],
    seasons: ["사계절"],
    occupations: ["사무직/직장인", "활동량 많은 직업/운동인"],
    targetOrgans: ["관절 & 뼈", "뇌 & 인지기능"],
    deal: {
      brand: "Life Extension",
      productName: "Boron 3mg with Advanced Calcium Complex",
      spec: "100 베지 캡슐",
      certification: "GMP 품질인증, Non-GMO",
    }
  },
  {
    id: "mineral-si",
    number: 31,
    name: "실리카 (규소 / 쇠뜨기 추출물 / 모노메틸실란트리올)",
    engName: "Silica (Silicon / Horsetail Extract)",
    category: "미네랄",
    symbolOrAbbr: "Si",
    oneLineSummary: "콜라겐과 엘라스틴 합성 가속, 모발 굵기 개선, 혈관 유연성 및 동맥경화 예방",
    dailyRDA: "미설정",
    optimalIntake: "25~50 mg",
    deficiencySymptoms: ["가늘어지고 끊어지는 모발", "잘 깨지고 세로줄 생기는 손톱", "피부 잔주름 증가", "혈관 탄력성 저하"],
    foodSources: [
      { foodName: "귀리 및 맥아", contentPer100g: "600 mg", portionTip: "곡류 껍질에 실리카 다량 함유" },
      { foodName: "천연 광천수 (피지워터 등)", contentPer1L: "90 mg", portionTip: "이온화된 오르토규산 형태로 흡수율 최상" },
      { foodName: "오이 (껍질째)", contentPer100g: "5 mg", portionTip: "수분 보충과 동시 섭취" }
    ],
    foodLimitationReason: "나이가 들수록 대동맥과 피부 속 실리카 함량이 급격히 감소하며, 정제 곡물 섭취로 자연 섭취량 급감.",
    bestSupplementForm: {
      recommendedForm: "안정화된 오르토규산 (ch-OSA, Biosil®) 또는 식물성 쇠뜨기(Horsetail) 표준화 추출물",
      inferiorFormWarning: "단순 이산화규소(식품 첨가물용)는 체내 흡수율이 제로에 가까움",
      absorptionTip: "비오틴 및 콜라겐 펩타이드와 병용 시 손발톱·모발 굵기 변화 3개월 내 체감"
    },
    targetDemographics: ["4050 중년", "60대+ 노년기", "2030 청년"],
    genders: ["여성", "공통"],
    seasons: ["사계절"],
    occupations: ["사무직/직장인"],
    targetOrgans: ["피부 & 모발", "관절 & 뼈", "심혈관 & 혈액순환"],
    deal: {
      brand: "BioSil",
      productName: "ch-OSA Advanced Collagen Generator (규소 특허)",
      spec: "60 베지 캡슐",
      certification: "콜라겐 생성 촉진 미국 특허 ch-OSA",
    }
  },
  {
    id: "mineral-msm",
    number: 32,
    name: "식이유황 (MSM / 옵티MSM)",
    engName: "MSM (Methylsulfonylmethane / OptiMSM)",
    category: "미네랄",
    symbolOrAbbr: "Organic Sulfur",
    oneLineSummary: "관절 연골 쿠션 보호, 통증 신호 차단, 글루타치온 합성 유황 공여체",
    dailyRDA: "1,500~2,000 mg",
    optimalIntake: "2,000~4,000 mg (임상 관절염 용량)",
    deficiencySymptoms: ["무릎 퇴행성 관절염 통증 및 뻣뻣함", "만성 근육통 및 운동 후 회복 지연", "만성 염증 수치(hs-CRP) 상승", "피부 탄력 붕괴"],
    foodSources: [
      { foodName: "마늘 / 양파 / 부추", contentPer100g: "풍부한 유황 화합물", portionTip: "한국인 식단의 대표 유황 채소" },
      { foodName: "브로콜리 / 양배추", contentPer100g: "설포라판 동반", portionTip: "십자화과 채소" },
      { foodName: "자연 방목 달걀", contentPer100g: "메티오닌/시스테인", portionTip: "유황 아미노산 함유" }
    ],
    foodLimitationReason: "MSM은 휘발성이 매우 강해 조리 가열 및 보관 과정에서 80% 이상 증발하므로 관절염 치료 용량을 식품으로 채우기 불가능.",
    bestSupplementForm: {
      recommendedForm: "4단계 증류 정제 공정을 거친 99.9% 순도 OptiMSM® 파우더 또는 캡슐",
      inferiorFormWarning: "중국산 저가 결정화 MSM은 중금속 잔류 및 불순물 위험",
      absorptionTip: "비타민 C와 1:1로 함께 섭취할 때 콜라겐 결합조직 합성과 통증 완화 효과가 2배 이상 증폭"
    },
    targetDemographics: ["60대+ 노년기", "4050 중년", "2030 청년"],
    genders: ["공통"],
    seasons: ["겨울", "환절기", "사계절"],
    occupations: ["활동량 많은 직업/운동인", "사무직/직장인"],
    targetOrgans: ["관절 & 뼈", "간 & 피로", "피부 & 모발"],
    deal: {
      brand: "Doctor's Best",
      productName: "Pure MSM Powder with OptiMSM 250g",
      spec: "순수 분말 250g / OptiMSM 정품",
      certification: "OptiMSM 4단계 증류 특허, 미국산",
    }
  },
  {
    id: "mineral-li",
    number: 33,
    name: "리튬 (오로트산 리튬 / 저용량 5mg)",
    engName: "Lithium (Orotate Low-Dose 5mg)",
    category: "미네랄",
    symbolOrAbbr: "Li",
    oneLineSummary: "뇌 신경세포 보호(BDNF 촉진), 뇌 노화 지연, 기분 조절 및 불안 완화",
    dailyRDA: "미설정",
    optimalIntake: "1~5 mg (영양학적 미량 원소 수준)",
    deficiencySymptoms: ["기분 기복 및 충동성, 불안감", "뇌 신경세포 조기 사멸 및 뇌 위축 위험", "인지기능 저하"],
    foodSources: [
      { foodName: "천연 암반 지하수", contentPer1L: "미량", portionTip: "리튬 농도가 높은 지역 주민의 장수 및 낮은 우울증 상관관계 규명" },
      { foodName: "통곡물 및 콩류", contentPer100g: "토양 의존", portionTip: "토양 미네랄 섭취" }
    ],
    foodLimitationReason: "정제수와 상수도 정수 시스템으로 현대인의 식수 속 미량 원소 리튬이 완전히 제거됨.",
    bestSupplementForm: {
      recommendedForm: "저용량 리튬 오로테이트 (Lithium Orotate 5mg)",
      inferiorFormWarning: "정신의학과 처방용 고용량 탄산리튬(300~600mg)과는 전혀 다른 안전한 식품용 미량 원소 수준",
      absorptionTip: "오로트산 결합형은 세포막 및 혈뇌장벽 투과율이 높아 극소량으로도 신경 보호 효과 발휘"
    },
    targetDemographics: ["60대+ 노년기", "4050 중년", "2030 청년"],
    genders: ["공통"],
    seasons: ["사계절"],
    occupations: ["사무직/직장인", "수험생/학생"],
    targetOrgans: ["뇌 & 인지기능"],
    deal: {
      brand: "Weyland",
      productName: "Lithium Orotate 5mg",
      spec: "100 베지 캡슐",
      certification: "GMP 인증, 제3자 기관 순도 검사",
    }
  },
  {
    id: "mineral-v",
    number: 34,
    name: "바나듐 (바나딜 설페이트)",
    engName: "Vanadium (Vanadyl Sulfate)",
    category: "미네랄",
    symbolOrAbbr: "V",
    oneLineSummary: "인슐린 유사 작용, 골격근 글리코겐 저장 유도 및 혈당 안정",
    dailyRDA: "미설정",
    optimalIntake: "10~25 mg (단기 사용)",
    deficiencySymptoms: ["인슐린 저항성 증가", "운동 후 근육 글리코겐 재합성 지연", "체지방 축적"],
    foodSources: [
      { foodName: "후추 및 파슬리", contentPer100g: "향신료 미량", portionTip: "요리 풍미와 함께 섭취" },
      { foodName: "버섯류", contentPer100g: "미량", portionTip: "식물성 미네랄 공급" },
      { foodName: "조개류", contentPer100g: "해양 원소", portionTip: "바다 미네랄" }
    ],
    foodLimitationReason: "식품 속 함량이 극히 미미하여 혈당 관리나 헬스 글리코겐 펌핑 목적으로는 보충제 필요.",
    bestSupplementForm: {
      recommendedForm: "바나딜 설페이트 (Vanadyl Sulfate 10mg) + 크롬 복합",
      inferiorFormWarning: "고용량 장기 복용은 간·신장 부담이 있으므로 8~12주 섭취 후 휴지기 권장",
      absorptionTip: "고탄수화물 식사 직전 또는 고강도 웨이트 트레이닝 직후 탄수화물과 함께 복용"
    },
    targetDemographics: ["2030 청년", "4050 중년"],
    genders: ["남성", "공통"],
    seasons: ["사계절"],
    occupations: ["활동량 많은 직업/운동인"],
    targetOrgans: ["간 & 피로", "심혈관 & 혈액순환"],
    deal: {
      brand: "Source Naturals",
      productName: "Vanadyl Sulfate with Taurine",
      spec: "100 타블렛",
      certification: "스포츠 뉴트리션 인증",
    }
  }
];
