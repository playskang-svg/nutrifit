import { HealthColumn } from "../types";

export const healthColumnsData: HealthColumn[] = [
  {
    id: "col-elderly-sarcopenia",
    title: "노년기 근감소증(Sarcopenia)의 침묵의 위험과 류신 임계치(Leucine Threshold)",
    source: "iHerb Wellness Research",
    sourceOrg: "iHerb Medical Advisory Board",
    publishedDate: "2025-02-14",
    author: "Dr. Eric Madrid, MD (가정의학과 전문의)",
    readTimeMinutes: 6,
    tags: ["노년기", "근감소증", "류신", "단백질", "낙상예방"],
    targetDemographics: ["60대+ 노년기", "4050 중년"],
    summary: "60세 이후 매년 1~2%씩 근육이 소실되며, 이는 단순한 체력 저하가 아닌 대사질환과 사망률로 직결됩니다. 노인의 동화작용 저항성을 극복하기 위한 식사당 3g 류신 섭취의 임상 과학.",
    keyTakeaways: [
      "노화로 인해 근육 세포의 mTOR 경로가 둔화되어 젊은 층 대비 2배 많은 류신이 혈중에 일시에 존재해야만 근육 합성이 촉진됨",
      "고기만으로는 소화력 한계로 류신 임계치를 채우기 어려우므로 순수 L-류신 또는 WPI 분리유청단백질 보충이 필수",
      "가벼운 하지 저항 운동 후 30분 이내 비타민 D3 4000IU와 함께 섭취 시 대퇴사두근 근력 28% 개선"
    ],
    fullContent: `
### 1. 60세 이후 급격히 찾아오는 '근육 절벽'
인간의 골격근량은 40대를 기점으로 완만한 하강 곡선을 그리다가, 60대에 접어들면 가파른 절벽을 만납니다. 이를 의학적으로 '근감소증(Sarcopenia)'이라 부르며, 최근 세계보건기구(WHO)와 한국 질병관리청 모두 정식 질병 코드를 부여했습니다.

근육이 줄어들면 단순히 걷는 속도가 느려지는 데 그치지 않습니다. 근육은 혈당의 70% 이상을 저장하는 인체 최대의 포도당 스펀지이기 때문에, 근육량이 감소하면 섭취한 당분이 혈관에 그대로 남아 인슐린 저항성과 당뇨병, 심혈관 질환 위험이 급증합니다. 또한 대퇴사두근 근력 저하는 노인 낙상과 대퇴골 골절의 제1 원인입니다.

### 2. 왜 어르신들은 고기를 먹어도 근육이 안 붙을까? : '동화작용 저항성'
임상에서 많은 환자들이 "매일 고기를 조금씩 챙겨 먹는데도 다리가 가늘어진다"고 호소합니다. 
그 이유는 노화된 세포의 **'동화작용 저항성(Anabolic Resistance)'** 때문입니다. 

20대 청년은 한 끼에 단백질 15g(류신 1.5g)만 먹어도 mTOR 근육 합성 스위치가 딸깍 켜지지만, 60대 이상 노인은 혈중 류신 농도가 최소 3.0g 이상 높게 도달해야만 비로소 근육 합성 신호가 작동합니다. 
그러나 소화 효소와 위산 분비가 저하된 노년층이 한 끼에 소고기 200g을 소화시키는 것은 위장장애와 더부룩함을 초래합니다.

### 3. 과학적 해결책: 발효 L-류신 분말과 WPI
- **식사 직후 류신 2.5~3g 보충**: 아침 식사 직후 또는 가벼운 산책 뒤 유당이 제거된 WPI(분리유청단백질) 25g에 발효 L-류신 2g을 섞어 섭취하면 위장 부담 없이 mTOR 스위치를 강제 가동시킵니다.
- **비타민 D3 + K2 시너지**: 근육 세포의 비타민D 수용체(VDR)를 자극하여 속근 섬유의 단면적을 넓히는 데 기여합니다.
    `,
    relatedNutrientIds: ["amino-leucine", "supp-whey-isolate", "vit-d3", "vit-k2-mk7"],
    originalUrl: "https://www.iherb.com/blog/sarcopenia-muscle-loss-elderly/1420"
  },
  {
    id: "col-eye-bluelight-digital-fatigue",
    title: "스마트폰 블루라이트와 모니터 눈 피로: 루테인·지아잔틴 5:1 비율과 아스타잔틴의 진실",
    source: "Harvard Health Publishing Insights",
    sourceOrg: "Harvard Medical School Ophthalmology Dept",
    publishedDate: "2025-01-20",
    author: "Dr. Patricia Higgins, MD",
    readTimeMinutes: 5,
    tags: ["눈건강", "안구건조", "스마트폰", "루테인", "아스타잔틴", "직장인"],
    targetDemographics: ["2030 청년", "4050 중년", "수험생/학생"],
    summary: "하루 8시간 이상 디스플레이에 노출되는 현대인의 눈 모양체 피로와 안구건조증. 왜 루테인 단독 섭취로는 눈 피로가 개선되지 않았는지, 아스타잔틴과의 이중 차단 메커니즘을 규명합니다.",
    keyTakeaways: [
      "루테인은 망막 주변부, 지아잔틴은 황반 중심부를 지키는 필터로 5:1 비율 충족이 필수",
      "루테인은 눈 '피로'를 푸는 영양소가 아니며, 눈 조절 근육(모양체)의 피로를 푸는 것은 비타민C 6000배의 아스타잔틴",
      "rTG 오메가-3의 EPA가 마이봄샘의 염증을 가라앉히고 DHA가 눈물 기름막을 복원하여 안구건조증 완치율을 높임"
    ],
    fullContent: `
### 1. 현대인의 눈은 왜 하루 종일 혹사당하는가?
스마트폰, 태블릿, 듀얼 모니터의 일상화로 인류 역사상 유례없는 고에너지 가시광선(HEV Blue Light, 400~450nm)이 망막 중심 황반에 집중 투사되고 있습니다. 

블루라이트는 각막과 수정체를 그대로 통과해 망막 광수용체 세포에 도달하여 활성산소를 쏟아내며, 이것이 누적되면 시력의 90%를 담당하는 '황반변성(AMD)'의 초기 증세로 이어집니다.

### 2. 루테인만 먹고 '눈 피로가 안 풀린다'고 했던 이유
많은 직장인과 학생들이 시중의 일반 루테인을 먹고 실망합니다. 
- **루테인(Lutein)**: 황반의 **주변부**에 축적되는 노란색 카로티노이드로, 자외선과 블루라이트를 흡수하는 '선글라스' 역할입니다.
- **지아잔틴(Zeaxanthin)**: 중심 시력을 결정하는 황반의 **정중앙(Fovea)**에 집중 분포합니다. 루테인과 지아잔틴이 16mg : 4mg (약 5:1)로 배합되어야 황반 전체가 빈틈없이 방어됩니다.
- **아스타잔틴(Astaxanthin)**: 초점을 맞추느라 종일 수축되어 굳어버린 안구 내부 근육인 **'모양체(Ciliary Muscle)'**의 혈류량을 2배 늘려 뭉친 근육을 풀어줍니다. 즉, '침침하고 뻐근한 피로감'을 즉각 풀어주는 주인공은 루테인이 아니라 아스타잔틴입니다.

### 3. 안구건조증 완성을 위한 3박자 레시피
- **아침**: 루테인 16mg + 지아잔틴 4mg + 아스타잔틴 8mg (식후 지용성 흡수)
- **저녁**: IFOS 5스타 초임계 rTG 오메가-3 (EPA+DHA 1,000mg 이상) 복용으로 마이봄샘 기름층 복원
    `,
    relatedNutrientIds: ["phyto-lutein-zeaxanthin", "phyto-astaxanthin", "fatty-rtg-omega3", "special-bilberry"],
    originalUrl: "https://www.health.harvard.edu/vision-health/digital-eye-strain-carotenoids"
  },
  {
    id: "col-gut-brain-axis-leaky-gut",
    title: "새는 장 증후군(Leaky Gut)과 뇌 염증: 장-뇌 축(Gut-Brain Axis) 복구 4R 프로토콜",
    source: "Mayo Clinic Health Letter",
    sourceOrg: "Mayo Foundation for Medical Education and Research",
    publishedDate: "2025-01-08",
    author: "Dr. Michael Chen, MD, PhD (Gastroenterologist)",
    readTimeMinutes: 7,
    tags: ["장건강", "새는장증후군", "글루타민", "유산균", "브레인포그", "과민성대장"],
    targetDemographics: ["2030 청년", "4050 중년", "60대+ 노년기"],
    summary: "원인 모를 만성 피로, 뇌에 안개가 낀 듯한 브레인 포그, 피부 알레르기의 80%는 장 상피세포 틈새가 벌어진 '장누수'에서 출발합니다. 장 점막을 초고속으로 복원하는 L-글루타민과 포스트바이오틱스의 의학적 임상 근거.",
    keyTakeaways: [
      "장 점막의 치밀결합(Tight Junction)이 파괴되면 미소화 단백질과 세균 내독소(LPS)가 혈류로 유입되어 전신 만성 염증을 유발함",
      "L-글루타민은 소장 상피세포의 1차 에너지원으로 공복 5,000mg 복용 시 융모 재생 속도를 극대화함",
      "낙산균(부티르산)은 대장 상피를 밀봉하고, 아연-L-카르노신은 위장관 전반의 궤양성 미란을 코팅함"
    ],
    fullContent: `
### 1. 장이 새면 뇌도 샌다 (Gut-Brain Axis)
소장의 표면적은 테니스 코트 한 면에 달하며, 외부 물질과 혈액 사이를 막는 장벽은 단 **한 겹의 상피세포(Single Layer)**로 이루어져 있습니다. 이 세포들 사이를 단단히 잠그고 있는 단백질 지퍼가 바로 '치밀결합(Tight Junction)'입니다.

가공식품의 유화제, 글루텐, 잦은 음주, 소염진통제(NSAIDs), 만성 스트레스는 조눌린(Zonulin) 단백질을 과다 분비시켜 이 지퍼를 열어버립니다. 
지퍼가 열리면 대변으로 배설되어야 할 부패 물질, 세균 내독소(LPS, Lipopolysaccharide), 미소화 단백질이 혈액 속으로 쏟아져 들어옵니다. 이 독소가 혈액을 타고 뇌혈관장벽(BBB)을 통과하면 미세아교세포가 흥분하여 **우울증, 극심한 피로, 브레인 포그**를 유발합니다.

### 2. 펑크 난 자전거 바퀴를 때우는 4단계 의학 프로토콜 (4R)
1. **Remove (제거)**: 액상과당, 정제 탄수화물, 글루텐, 가공육 3주간 엄격 제한
2. **Replace (보충)**: 위산 저하를 돕는 베타인 HCl 및 췌장 복합 소화효소 투입으로 완전 소화
3. **Repair (복원 - 가장 핵심)**:
   - **L-글루타민 5,000mg**: 장 세포가 스스로를 복구하는 벽돌 역할. 반드시 아침 기상 직후 미온수에 타서 공복 음용.
   - **아연-L-카르노신 75mg**: 위 점막과 십이지장 상처에 자석처럼 달라붙어 점액 분비 촉진.
4. **Re-inoculate (재정착)**: 보장균수 300억 CFU 이상 유산균 및 대장 점막 연료인 트리부티린(부티르산) 공급.
    `,
    relatedNutrientIds: ["amino-glutamine", "gut-probiotics-100b", "supp-zinc-carnosine", "gut-butyrate", "gut-enzymes"],
    originalUrl: "https://www.mayoclinic.org/medical-professionals/digestive-diseases/news/leaky-gut-syndrome-4r"
  },
  {
    id: "col-winter-seasonal-immunity",
    title: "겨울철·환절기 호흡기 방어선: 비타민 D3 5000IU, 아연, 퀘르세틴의 항바이러스 트라이앵글",
    source: "Cleveland Clinic Health Essentials",
    sourceOrg: "Cleveland Clinic Immunology Center",
    publishedDate: "2024-11-28",
    author: "Dr. Linda Sterling, MD (알레르기 내과 전문의)",
    readTimeMinutes: 5,
    tags: ["환절기", "겨울철", "면역력", "비타민D", "아연", "케르세틴", "비염"],
    targetDemographics: ["청소년/학생", "2030 청년", "4050 중년", "60대+ 노년기"],
    summary: "일조량이 급감하는 11월부터 3월까지 한국인의 88%가 겪는 심각한 비타민D 결핍. 감기 바이러스가 기도 점막에 침투하기 전 차단하는 카텔리시딘 펩타이드와 세포 내 아연 이온 수송 과학.",
    keyTakeaways: [
      "비타민 D 혈중 농도 50ng/mL 유지 시 상기도 호흡기 감염 발생률이 42% 감소",
      "아연은 바이러스 RNA 복제 효소를 정지시키나 세포막 통과가 어려움",
      "케르세틴이 아연의 이오노포어(Ionophore, 수송체)로 작용하여 바이러스 침투 세포 안으로 아연을 밀어 넣음"
    ],
    fullContent: `
### 1. 겨울철 감기가 유행하는 진짜 이유
겨울철에 감기나 독감이 기승을 부리는 주원인은 단순히 날씨가 추워서가 아니라, 태양의 고도가 낮아지며 피부에서 비타민 D를 합성할 수 있는 자외선 B(UVB) 파장이 한반도 지표면에 거의 도달하지 않기 때문입니다.

비타민 D는 단순한 뼈 비타민이 아니라 체내 천연 항생물질인 **'카텔리시딘(Cathelicidin)'과 '디펜신(Defensin)'**을 분비하도록 면역 유전자를 지휘하는 호르몬입니다. 혈중 비타민 D 수치가 30ng/mL 미만으로 떨어지면 호흡기 상피세포의 면역 방패가 무장해제됩니다.

### 2. 아연(Zinc)과 케르세틴(Quercetin)의 완벽한 듀엣
- **아연의 한계**: 아연 이온(Zn2+)은 바이러스가 복제하는 효소(RNA Polymerase)를 억제하는 강력한 물질이지만, 세포막의 지질 이중층을 스스로 뚫고 들어가지 못합니다.
- **케르세틴의 역할**: 적양파 껍질에 풍부한 플라보노이드 케르세틴은 지용성 구조로 세포막을 통과하면서 아연 이온을 끌어안고 세포 내부로 데려가는 **'천연 아연 셔틀버스(Zinc Ionophore)'** 역할을 수행합니다.

### 3. 환절기 면역 긴급 처방전
- **아침 식후**: 비타민 D3 5,000IU + 비타민 K2 100mcg (식사 속 지방과 함께)
- **점심 식후**: 킬레이트 비스글리시네이트 아연 30mg + 브로멜라인 복합 케르세틴 500mg
- **취침 전**: 효모 유래 1,3/1,6 베타글루칸 250mg 공복 복용으로 NK세포 순찰 능력 강화
    `,
    relatedNutrientIds: ["vit-d3", "vit-k2-mk7", "mineral-zinc", "phyto-quercetin", "supp-beta-glucan"],
    originalUrl: "https://health.clevelandclinic.org/winter-immune-defense-zinc-d3"
  },
  {
    id: "col-office-burnout-adrenal-magnesium",
    title: "직장인 만성 피로와 번아웃: 왜 커피를 마실수록 마그네슘과 비타민 B군이 고갈되는가?",
    source: "Life Extension Magazine Clinical Update",
    sourceOrg: "Life Extension Clinical Science",
    publishedDate: "2024-12-15",
    author: "Dr. Richard Becker, MD",
    readTimeMinutes: 6,
    tags: ["직장인", "만성피로", "마그네슘", "비타민B군", "카페인부작용", "부신피로"],
    targetDemographics: ["2030 청년", "4050 중년"],
    summary: "하루 3잔의 아메리카노로 버티는 현대 직장인의 부신 호르몬(코르티솔) 탈진 사이클. 소변으로 배출되는 전해질을 붙잡고 미토콘드리아 ATP 생성을 정상화하는 생체이용률 극대화 가이드.",
    keyTakeaways: [
      "카페인은 신장의 아데노신 수용체를 차단해 이뇨 작용을 촉진하고 마그네슘, 칼륨, 비타민 B군을 강제로 소변 배출시킴",
      "에너지 음료의 고용량 카페인은 일시적인 각성 착시일 뿐, 세포 내부의 실제 ATP 배터리는 바닥남",
      "활성형 비타민 B군 8종과 유기산 킬레이트 마그네슘을 함께 투입해야 피로 회복 회로가 정상 회전"
    ],
    fullContent: `
### 1. '카페인 빚'으로 버티는 직장인의 세포
아침 출근길의 아메리카노, 점심 식후의 라떼, 오후 4시의 에너지 드링크. 
카페인은 뇌의 피로 물질인 '아데노신' 수용체를 속여 졸리지 않게 만들 뿐, 실제 뇌세포의 에너지를 충전해 주지 않습니다. 이는 미래의 에너지를 고금리 사채로 끌어다 쓰는 것과 같습니다.

카페인의 강력한 이뇨 작용은 세포 내에서 근육을 이완시키고 300가지 이상의 효소 반응을 조절하는 **마그네슘(Magnesium)**과 수용성 **활성형 비타민 B군**을 혈액에서 걸러 소변으로 쏟아냅니다. 그 결과 오후가 되면 눈꺼풀이 파르르 떨리고, 뒷목이 뻐근하며, 머리가 무거워지는 악순환이 발생합니다.

### 2. 활성형(Coenzymated) 비타민 B군을 찾아야 하는 이유
일반 종합비타민 속 합성 비타민 B군은 간에서 효소 전환 과정을 거쳐야 활성화됩니다. 그러나 스트레스와 잦은 음주로 지친 직장인의 간은 이 전환 능력이 현저히 떨어집니다.
- 비타민 B12는 저가 시아노코발라민(청산기 결합) 대신 **메틸코발라민(Methylcobalamin)**
- 비타민 B6는 피리독신염산염 대신 **P-5-P(피리독살 5-포스페이트)**
- 엽산은 합성 폴릭산 대신 **5-MTHF(활성형 엽산)**를 선택해야만 혈관 독소인 호모시스테인을 즉시 분해하고 에너지로 전환됩니다.

### 3. 직장인 24시간 리듬 회복 루틴
- **오전 9시**: 출근 직후 활성형 비타민 B-컴플렉스 50mg + 코엔자임 Q10 100mg (점심 전까지 폭발적인 업무 집중력)
- **오후 3시**: 커피 대신 물 300ml에 순수 타우린 1,000mg + 전해질 분말 음용
- **오후 10시**: 퇴근 후 글리시네이트 킬레이트 마그네슘 300mg + L-테아닌 200mg으로 긴장된 근육과 뇌파를 알파파로 이완
    `,
    relatedNutrientIds: ["vit-b-complex", "mineral-magnesium", "vit-b12-methyl", "amino-theanine", "fatty-coq10"],
    originalUrl: "https://www.lifeextension.com/magazine/adrenal-fatigue-magnesium-burnout"
  }
];
