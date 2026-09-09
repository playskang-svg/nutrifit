import { DietMealProfile } from "../types";

export const dietMealProfiles: DietMealProfile[] = [
  {
    id: "diet-korean-stew",
    title: "한식 백반 & 찌개류 (김치찌개, 된장찌개, 불고기)",
    category: "한식/일반식",
    exampleMenu: "현미밥, 된장찌개/김치찌개, 제육볶음/생선구이, 멸치볶음, 나물무침",
    description: "발효식품과 미네랄이 풍부하나 나트륨 함량이 높고 채소 조리 시 수용성 비타민이 일부 유실될 수 있는 전형적인 한국인 균형 식단입니다.",
    synergyNutrients: [
      {
        name: "지용성 영양소 (오메가-3, 비타민 D3, 루테인)",
        why: "고기나 생선구이의 지방질 및 참기름·들기름에 의해 담즙산이 풍부하게 분비되어 흡수율이 대폭 증가합니다.",
        timing: "식사 직후 15분 이내 복용"
      },
      {
        name: "코엔자임 Q10 & 비타민 E",
        why: "육류 단백질 식사 후 지질 산화 방지 및 미토콘드리아 ATP 생성 시너지.",
        timing: "식사 직후 복용"
      }
    ],
    depletedOrInhibitedNutrients: [
      {
        name: "칼륨 (Potassium) & 칼슘",
        mechanism: "찌개류의 높은 나트륨(Na) 섭취는 신장에서 나트륨 배출 시 칼슘과 칼륨의 동반 손실을 촉진합니다.",
        solution: "식사 시 쌈채소(칼륨)를 곁들이고, 저녁 식후 흡수율 높은 구연산칼륨 또는 칼슘-마그네슘 보충을 권장합니다."
      }
    ],
    goldenRule: "기름진 반찬이 포함된 든든한 점심 식사 직후가 지용성 비타민(D, K, 오메가3, 루테인)의 흡수 골든타임입니다.",
    supplementWindowTip: "찌개 섭취 직후 수분 섭취를 적당히 조절하고 비타민 C나 종합비타민은 식후 30분 내로 섭취하세요."
  },
  {
    id: "diet-fatty-meat",
    title: "기름진 고기 & 바비큐 (삼겹살, 한우, 곱창, 족발)",
    category: "기름진 육류",
    exampleMenu: "삼겹살 구이, 한우 등심, 삼계탕, 양꼬치, 삼겹살 쌈밥",
    description: "고지방·고단백 식단으로 포화지방과 철분은 풍부하지만 활성산소와 지질 과산화물이 생성되기 쉽고 장내 유해균 증식 위험이 있습니다.",
    synergyNutrients: [
      {
        name: "비타민 D3 + K2 (MK-7)",
        why: "지방 섭취로 췌장 리파아제와 담즙 분비가 극대화되어 지용성 비타민의 미셀(micelle) 형성이 최적화됩니다.",
        timing: "식사 도중 또는 식사 직후"
      },
      {
        name: "루테인 & 아스타잔틴",
        why: "카로티노이드 색소계열은 오일 베이스 환경에서 흡수율이 300% 이상 증대됩니다.",
        timing: "식사 직후"
      }
    ],
    depletedOrInhibitedNutrients: [
      {
        name: "항산화제 (글루타치온, NAC, 비타민 C)",
        mechanism: "고온 조리된 육류의 지질 과산화물 및 최종당화산물(AGEs)이 체내 활성산소를 증가시켜 내인성 항산화 효소를 고갈시킵니다.",
        solution: "저녁 고기 식사 후 NAC 600mg 또는 밀크씨슬+비타민C를 섭취해 간 해독과 과산화 지질 중화를 돕습니다."
      },
      {
        name: "장내 프로바이오틱스 유산균",
        mechanism: "다량의 동물성 포화지방과 담즙산의 과다 분비는 일부 장내 유익균 세포벽을 손상시킬 수 있습니다.",
        solution: "기름진 식사 직후 유산균 복용을 피하고, 다음날 아침 공복에 충분한 물과 함께 유산균을 섭취하세요."
      }
    ],
    goldenRule: "고기 식사 직후 오메가-3와 비타민D를 복용하되, 유산균은 다음 날 아침 공복으로 미루세요.",
    supplementWindowTip: "고기 식사 1시간 후 소화효소(베타인 HCl, 프로테아제)를 섭취하면 단백질 소화와 가스 팽만을 개선합니다."
  },
  {
    id: "diet-caffeine-dessert",
    title: "카페인 음료 & 달콤한 디저트 (아메리카노, 라떼, 케이크)",
    category: "카페인/음료",
    exampleMenu: "아이스 아메리카노 2잔, 카페라떼, 베이글, 마카롱, 달콤한 빵",
    description: "직장인과 수험생의 단골 식단. 카페인의 강력한 이뇨 작용과 정제당의 급격한 혈당 스파이크로 체내 주요 미네랄과 비타민 B군이 급격히 소모됩니다.",
    synergyNutrients: [
      {
        name: "L-테아닌 (L-Theanine)",
        why: "카페인과 L-테아닌의 1:2 조합은 카페인의 가슴 두근거림과 혈압 상승 부작용을 상쇄하면서 뇌 집중력과 알파파를 극대화합니다.",
        timing: "커피와 함께 동시 복용 (스마트 스택)"
      }
    ],
    depletedOrInhibitedNutrients: [
      {
        name: "마그네슘 (Magnesium) & 비타민 B1 (티아민)",
        mechanism: "커피 속 카페인은 신장의 세뇨관에서 마그네슘 재흡수를 억제하여 소변 배출을 늘리고, 정제당 대사 과정에서 비타민 B1이 대량 소모됩니다.",
        solution: "커피 섭취 전후 2시간 간격을 두고 킬레이트 마그네슘 200~300mg과 활성형 B군을 섭취하세요."
      },
      {
        name: "철분 (Iron)",
        mechanism: "커피와 홍차의 탄닌(Tannin)과 폴리페놀이 철분과 결합하여 불용성 침전물을 형성해 철분 흡수를 최대 80% 차단합니다.",
        solution: "철분제는 커피를 마시기 최소 2시간 전 공복 또는 커피 후 3시간 뒤에 섭취하세요."
      }
    ],
    goldenRule: "커피를 마신 직후 최소 1~2시간 동안은 비타민B, 마그네슘, 철분 복용을 엄격히 금지합니다.",
    supplementWindowTip: "오후 4시 이후 커피는 삼가고, 저녁에는 커피로 빠져나간 마그네슘을 보충하여 신경을 이완시키세요."
  },
  {
    id: "diet-diet-vegan",
    title: "클린 샐러드 & 비건 다이어트 (생채소, 두부, 고구마, 닭가슴살)",
    category: "다이어트/채식",
    exampleMenu: "그린 샐러드, 닭가슴살 100g, 찐 고구마, 아몬드 한 줌, 두유",
    description: "식이섬유와 파이토케미컬이 풍부하고 저칼로리이지만, 유지방 부족으로 지용성 비타민 흡수가 떨어지고 피트산·옥살산의 미네랄 흡수 방해가 발생할 수 있습니다.",
    synergyNutrients: [
      {
        name: "식물성 효소 & 비타민 C",
        why: "채소의 철분(비헴철) 흡수를 촉진하기 위해 드레싱에 레몬즙을 넣거나 비타민 C를 병용하면 생체이용률이 3배 높아집니다.",
        timing: "샐러드 식사 도중 또는 직후"
      }
    ],
    depletedOrInhibitedNutrients: [
      {
        name: "비타민 B12 (코발라민) & 아연",
        mechanism: "식물성 식단에는 활성형 비타민 B12가 거의 존재하지 않으며, 곡류·채소의 피트산(Phytic acid)이 아연 흡수를 저해합니다.",
        solution: "메틸코발라민(활성 B12) 1,000mcg 및 흡수율 높은 글리시네이트 아연을 필수로 추가 보충해야 합니다."
      },
      {
        name: "지용성 영양소 흡수 결핍",
        mechanism: "지방이 없는 '노오일(No-oil)' 드레싱 샐러드만 먹으면 루테인, 비타민 D, 비타민 K가 거의 흡수되지 않고 배출됩니다.",
        solution: "올리브유나 아보카도 오일을 1스푼 뿌려 먹거나 오메가-3 캡슐과 함께 섭취하세요."
      }
    ],
    goldenRule: "샐러드만 먹을 땐 지용성 영양제 흡수를 위해 올리브유 1스푼이나 오메가-3 캡슐을 꼭 곁들이세요.",
    supplementWindowTip: "시금치 등 옥살산이 많은 채소는 데쳐 먹어야 칼슘 결석 위험을 줄이고 미네랄 흡수를 보존합니다."
  },
  {
    id: "diet-alcohol-night",
    title: "회식 & 술자리 (소주, 맥주, 삼겹살, 치킨, 안주류)",
    category: "음주/회식",
    exampleMenu: "소주 1병, 생맥주, 치킨, 골뱅이무침, 해물탕, 라면 안주",
    description: "에탄올 대사로 인한 아세트알데히드 축적, 간 세포 글루타치온 급격 고갈, 탈수 및 장 점막 투과성 증가(새는 장)가 유발되는 고위험 상태입니다.",
    synergyNutrients: [
      {
        name: "NAC (N-아세틸시스테인) & 비타민 C",
        why: "간세포의 글루타치온 합성을 직접 지원하여 독성 아세트알데히드 분해를 획기적으로 촉진합니다.",
        timing: "음주 30분 전 섭취 (※주의: 음주 직후 과용 금지, 음주 전 섭취가 가장 안전)"
      },
      {
        name: "비타민 B1, B2, B6 (활성형 B군)",
        why: "간의 알코올 탈수소효소(ADH)와 ALDH 대사에 필수 조효소로 소모되어 숙취 두통과 피로를 방지합니다.",
        timing: "음주 전 또는 다음날 아침 식후"
      }
    ],
    depletedOrInhibitedNutrients: [
      {
        name: "글루타치온 & 실리마린",
        mechanism: "알코올 해독 과정에서 활성산소가 폭발적으로 발생해 간의 항산화 저장고가 고갈됩니다.",
        solution: "다음날 아침 실리빈 파이토솜 밀크씨슬과 항산화 복합제를 집중 투약하세요."
      },
      {
        name: "수분 & 전해질 (마그네슘, 나트륨, 칼륨)",
        mechanism: "알코올의 항이뇨호르몬(ADH) 억제로 극심한 탈수와 전해질 소변 유실 발생.",
        solution: "물 1리터와 함께 전해질(구연산마그네슘, 칼륨)을 충분히 공급하세요."
      }
    ],
    goldenRule: "음주 전 NAC와 비타민B를 섭취해 간을 방어하고, 다음날 아침에는 밀크씨슬과 전해질을 보충하세요.",
    supplementWindowTip: "술 마시는 도중에는 어떤 알약 영양제도 삼키지 마세요. 간과 위에 이중 부담을 줍니다."
  },
  {
    id: "diet-processed-fastfood",
    title: "초가공식품 & 인스턴트 (라면, 패스트푸드, 떡볶이, 피자)",
    category: "초가공/패스트푸드",
    exampleMenu: "신라면 + 밥 말아먹기, 햄버거 세트 + 감자튀김, 배달 떡볶이 + 튀김",
    description: "트랜스지방, 정제 나트륨, 액상과당, 인공 인산염이 과다하여 체내 미세 만성 염증을 유발하고 뼈의 칼슘 용출을 가속합니다.",
    synergyNutrients: [
      {
        name: "오메가-3 & 커큐민",
        why: "초가공식품 속 오메가-6와 트랜스지방으로 인한 혈관 내벽 염증 반응을 강력히 억제합니다.",
        timing: "식사 30분 후 섭취"
      }
    ],
    depletedOrInhibitedNutrients: [
      {
        name: "칼슘 & 마그네슘",
        mechanism: "가공식품에 팽창제·보존제로 첨가된 무기 인산염(Inorganic phosphate)이 칼슘·마그네슘과 불용성 결합하여 배출시킵니다.",
        solution: "식사와 2시간 간격을 두고 킬레이트 칼슘-마그네슘을 보충하세요."
      },
      {
        name: "크롬 (Chromium) & 알파리포산",
        mechanism: "급격한 혈당 스파이크로 인슐린 감수성이 급락하고 인슐린 조절 미네랄인 크롬이 소모됩니다.",
        solution: "정제 탄수화물 식사 전후 크롬 피콜리네이트 200mcg 및 바나바잎 추출물을 활용하세요."
      }
    ],
    goldenRule: "인스턴트의 가공 인산염은 뼈의 칼슘을 뺏어갑니다. 흡수율 높은 킬레이트 미네랄로 균형을 맞추세요.",
    supplementWindowTip: "라면 국물은 절반만 마시고, 식사 후 신선한 사과나 토마토(칼륨)를 섭취해 나트륨을 배출시키세요."
  }
];

export interface MealOption {
  id: string;
  name: string;
  category: "breakfast" | "lunch" | "dinner" | "snack";
  caloriesApprox: number;
  profileId: string;
}

export const mealSelectionOptions: MealOption[] = [
  { id: "m-1", name: "아메리카노 & 베이글/샌드위치", category: "breakfast", caloriesApprox: 380, profileId: "diet-caffeine-dessert" },
  { id: "m-2", name: "한식 백반 & 된장찌개/생선구이", category: "breakfast", caloriesApprox: 450, profileId: "diet-korean-stew" },
  { id: "m-3", name: "닭가슴살 샐러드 & 고구마", category: "breakfast", caloriesApprox: 320, profileId: "diet-diet-vegan" },
  { id: "m-4", name: "제육볶음 & 김치찌개 정식", category: "lunch", caloriesApprox: 720, profileId: "diet-korean-stew" },
  { id: "m-5", name: "햄버거 & 감자튀김 세트", category: "lunch", caloriesApprox: 850, profileId: "diet-processed-fastfood" },
  { id: "m-6", name: "초밥 & 우동 정식", category: "lunch", caloriesApprox: 600, profileId: "diet-korean-stew" },
  { id: "m-7", name: "삼겹살 구이 & 소주 회식", category: "dinner", caloriesApprox: 1100, profileId: "diet-alcohol-night" },
  { id: "m-8", name: "한우 소고기 구이 & 쌈채소", category: "dinner", caloriesApprox: 850, profileId: "diet-fatty-meat" },
  { id: "m-9", name: "배달 떡볶이 & 순대·튀김", category: "dinner", caloriesApprox: 920, profileId: "diet-processed-fastfood" },
  { id: "m-10", name: "카페 라떼 & 달콤한 조각케이크", category: "snack", caloriesApprox: 450, profileId: "diet-caffeine-dessert" },
  { id: "m-11", name: "견과류 한 줌 & 그릭 요거트", category: "snack", caloriesApprox: 220, profileId: "diet-diet-vegan" },
  { id: "m-12", name: "야식 컵라면 & 삼각김밥", category: "snack", caloriesApprox: 580, profileId: "diet-processed-fastfood" }
];
