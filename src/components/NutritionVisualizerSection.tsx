import React, { useState, useMemo } from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  Cell 
} from "recharts";
import { 
  Activity, 
  ShieldAlert, 
  ShieldCheck, 
  Sparkles, 
  Sliders, 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  ArrowUpRight
} from "lucide-react";
import { NutrientItem } from "../types";

interface NutritionVisualizerSectionProps {
  allNutrients: NutrientItem[];
  onSelectNutrient: (nutrient: NutrientItem) => void;
}

// Preset profiles
interface PresetProfile {
  id: string;
  title: string;
  badge: string;
  description: string;
  defaultSelectedIds: string[];
}

const PRESETS: PresetProfile[] = [
  {
    id: "office",
    title: "직장인 만성피로 & 모니터 증후군 스택",
    badge: "2040 직장인 / 교대근무",
    description: "커피로 소모되는 마그네슘, 컴퓨터 화면으로 인한 눈 피로, 스트레스 호르몬 해독에 초점",
    defaultSelectedIds: ["vit-b-complex", "magnesium-glycinate", "omega-3", "lutein-zeaxanthin", "milk-thistle"]
  },
  {
    id: "senior",
    title: "60대+ 노년기 근감소·골밀도·혈관 안티에이징",
    badge: "시니어 / 항노화",
    description: "노화에 따른 소화흡수력 저하, 동화작용 저항성 극복을 위한 고함량 류신, D3+K2 석회화 차단",
    defaultSelectedIds: ["vit-d3-k2", "leucine-whey", "calcium-hydroxyapatite", "coq10-ubiquinol", "probiotics-senior"]
  },
  {
    id: "student",
    title: "수험생 & 고시생 두뇌 활력·알파파 집중 스택",
    badge: "청소년 / 수험생 / 고시생",
    description: "뇌 신경전달물질 합성(콜린), 뇌파 안정(테아닌), 장기간 좌식 생활에 따른 소화기 케어",
    defaultSelectedIds: ["vit-b-complex", "l-theanine", "dha-brain", "phosphatidylserine", "probiotics-30b"]
  },
  {
    id: "active",
    title: "피트니스 & 활동량 많은 액티브 스택",
    badge: "운동인 / 피트니스",
    description: "근육 합성, 산화 스트레스 중화, 관절 연골 회복 및 전해질 밸런스 유지",
    defaultSelectedIds: ["bcaa-glutamine", "msm-opti", "zinc-picolinate", "vit-c-1000", "astaxanthin-12"]
  }
];

export const NutritionVisualizerSection: React.FC<NutritionVisualizerSectionProps> = ({
  allNutrients,
  onSelectNutrient,
}) => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>("office");
  const [selectedNutrientIds, setSelectedNutrientIds] = useState<string[]>(PRESETS[0].defaultSelectedIds);
  const [searchFilter, setSearchFilter] = useState("");

  const handleSelectPreset = (preset: PresetProfile) => {
    setSelectedPresetId(preset.id);
    setSelectedNutrientIds(preset.defaultSelectedIds);
  };

  const handleToggleNutrient = (id: string) => {
    setSelectedPresetId("custom");
    if (selectedNutrientIds.includes(id)) {
      setSelectedNutrientIds(selectedNutrientIds.filter(item => item !== id));
    } else {
      setSelectedNutrientIds([...selectedNutrientIds, id]);
    }
  };

  // Selected nutrients objects
  const activeNutrients = useMemo(() => {
    return allNutrients.filter(n => selectedNutrientIds.includes(n.id));
  }, [allNutrients, selectedNutrientIds]);

  // Calculate 6-Pillar Radar Data
  const radarData = useMemo(() => {
    let vitaminScore = 20;
    let mineralScore = 20;
    let lipidScore = 15;
    let aminoScore = 15;
    let antioxidantScore = 20;
    let gutImmunityScore = 20;

    activeNutrients.forEach(n => {
      const cat = n.category;
      if (cat.includes("비타민")) vitaminScore += 25;
      else if (cat.includes("미네랄")) mineralScore += 25;
      else if (cat.includes("지방산") || cat.includes("지질")) lipidScore += 30;
      else if (cat.includes("아미노산") || cat.includes("단백질")) aminoScore += 30;
      else if (cat.includes("식물영양소") || cat.includes("항산화")) antioxidantScore += 28;
      else gutImmunityScore += 25;
    });

    return [
      { subject: "비타민군", current: Math.min(100, vitaminScore), optimal: 100, fullMark: 100 },
      { subject: "미네랄군", current: Math.min(100, mineralScore), optimal: 100, fullMark: 100 },
      { subject: "지방산·인지질", current: Math.min(100, lipidScore), optimal: 100, fullMark: 100 },
      { subject: "아미노산·단백질", current: Math.min(100, aminoScore), optimal: 100, fullMark: 100 },
      { subject: "항산화·파이토", current: Math.min(100, antioxidantScore), optimal: 100, fullMark: 100 },
      { subject: "장 & 면역 기능성", current: Math.min(100, gutImmunityScore), optimal: 100, fullMark: 100 },
    ];
  }, [activeNutrients]);

  // Calculate 5-Organ Defense Scores
  const organDefenseData = useMemo(() => {
    const scores: Record<string, number> = {
      "눈 건강": 25,
      "장 건강": 20,
      "간 & 피로": 20,
      "관절 & 뼈": 25,
      "뇌 & 인지기능": 20,
    };

    activeNutrients.forEach(n => {
      n.targetOrgans.forEach(organ => {
        if (organ.includes("눈")) scores["눈 건강"] += 28;
        if (organ.includes("장") || organ.includes("소화기")) scores["장 건강"] += 28;
        if (organ.includes("간") || organ.includes("피로") || organ.includes("활력")) scores["간 & 피로"] += 28;
        if (organ.includes("관절") || organ.includes("뼈")) scores["관절 & 뼈"] += 28;
        if (organ.includes("뇌") || organ.includes("인지기능")) scores["뇌 & 인지기능"] += 28;
      });
    });

    return Object.entries(scores).map(([name, val]) => ({
      name,
      score: Math.min(100, val),
    }));
  }, [activeNutrients]);

  // Overall Health Shield Index (Average score)
  const averageDefenseScore = useMemo(() => {
    const total = organDefenseData.reduce((acc, curr) => acc + curr.score, 0);
    return Math.round(total / organDefenseData.length);
  }, [organDefenseData]);

  // Key Essential Nutrient Safe Progress Benchmarks
  const keyNutrientMeters = useMemo(() => {
    return [
      {
        name: "비타민 D3",
        unit: "IU",
        rda: "400 ~ 800",
        optimal: "2,000 ~ 5,000",
        upperLimit: "10,000",
        active: activeNutrients.some(n => n.name.includes("비타민 D")),
        tip: "한국인 80% 이상 혈중 농도 30ng/ml 미만 결핍 상태"
      },
      {
        name: "rTG 오메가-3 (EPA+DHA)",
        unit: "mg",
        rda: "500",
        optimal: "1,000 ~ 2,000",
        upperLimit: "3,000",
        active: activeNutrients.some(n => n.name.includes("오메가")),
        tip: "세포막 유동성 유지 및 안구건조·혈행 개선 최적치"
      },
      {
        name: "마그네슘 (킬레이트)",
        unit: "mg",
        rda: "315 ~ 370",
        optimal: "300 ~ 450",
        upperLimit: "700",
        active: activeNutrients.some(n => n.name.includes("마그네슘")),
        tip: "스트레스, 카페인 섭취 시 소변으로 가장 빠르게 고갈"
      },
      {
        name: "비타민 C (아스코르브산)",
        unit: "mg",
        rda: "100",
        optimal: "1,000 ~ 2,000",
        upperLimit: "2,000",
        active: activeNutrients.some(n => n.name.includes("비타민 C")),
        tip: "단순 괴혈병 예방(100mg)을 넘어선 항산화 메가도스"
      },
      {
        name: "활성형 비타민 B 복합체",
        unit: "mg",
        rda: "1.2 ~ 1.5",
        optimal: "50 ~ 100",
        upperLimit: "안전(수용성)",
        active: activeNutrients.some(n => n.name.includes("비타민 B")),
        tip: "만성 피로 환자의 호모시스테인 억제 및 미토콘드리아 ATP 생성"
      },
      {
        name: "아연 (Zinc)",
        unit: "mg",
        rda: "8 ~ 10",
        optimal: "15 ~ 30",
        upperLimit: "40",
        active: activeNutrients.some(n => n.name.includes("아연")),
        tip: "T림프구 면역 활성화 및 DNA 복구, 상한 40mg 준수 필요"
      }
    ];
  }, [activeNutrients]);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-indigo-800/40">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold mb-3 border border-indigo-500/30">
            <Activity className="w-3.5 h-3.5" />
            <span>기능의학적 영양 균형 &amp; 방어력 대시보드</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2">
            영양 상태 시각화 &amp; 결핍·과잉 분석기
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            내가 먹고 있는 영양제가 6대 영양군과 5대 취약 장기를 얼마나 방어하고 있는지 
            실시간 레이더 및 차트로 다각도 분석합니다. 프리셋을 선택하거나 직접 영양제를 토글해 보세요.
          </p>
        </div>

        {/* Floating Comprehensive Shield Score */}
        <div className="mt-4 sm:mt-0 sm:absolute sm:right-8 sm:top-1/2 sm:-translate-y-1/2 bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/15 text-center min-w-[190px]">
          <span className="text-xs font-medium text-indigo-200 block mb-1">
            종합 신체 방어 지수
          </span>
          <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-200">
            {averageDefenseScore}
            <span className="text-lg font-bold text-indigo-200"> / 100</span>
          </div>
          <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
            {averageDefenseScore >= 75 ? "🛡️ 강력한 방어 상태" : averageDefenseScore >= 50 ? "⚠️ 보통 (일부 결핍)" : "🚨 결핍 취약 상태"}
          </div>
        </div>
      </div>

      {/* Preset Selector Chips */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-indigo-600" />
            <span>생애주기 &amp; 라이프스타일 맞춤 프리셋 불러오기</span>
          </h2>
          <span className="text-xs text-slate-500 font-medium">
            현재 선택된 영양제: <strong className="text-indigo-600">{activeNutrients.length}종</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PRESETS.map(preset => {
            const isSelected = selectedPresetId === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset)}
                className={`p-4 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "bg-indigo-900 text-white border-indigo-950 shadow-md ring-2 ring-indigo-500/30 scale-[1.01]"
                    : "bg-slate-50 hover:bg-indigo-50/50 text-slate-800 border-slate-200 hover:border-indigo-200"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isSelected ? "bg-white/20 text-indigo-200" : "bg-indigo-100 text-indigo-800"
                    }`}>
                      {preset.badge}
                    </span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-300" />}
                  </div>
                  <h3 className="font-bold text-sm leading-snug">{preset.title}</h3>
                </div>
                <p className={`text-xs mt-2 line-clamp-2 ${isSelected ? "text-indigo-200" : "text-slate-500"}`}>
                  {preset.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Charts Grid: Radar Chart + Organ Defense Bar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar Chart: 6 Nutritive Pillars */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                <span>6대 핵심 영양 축 밸런스 레이더</span>
              </h2>
              <span className="text-xs text-slate-500 font-medium">단위: 충족률(%)</span>
            </div>
            <p className="text-xs text-slate-500">
              외곽 원(100%)에 가까울수록 결핍 없는 최적 섭취 상태를 나타냅니다.
            </p>
          </div>

          <div className="w-full h-72 sm:h-80 my-2">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis 
                  dataKey="subject" 
                  tick={{ fill: "#334155", fontSize: 12, fontWeight: 600 }}
                />
                <PolarRadiusAxis 
                  angle={30} 
                  domain={[0, 100]} 
                  tick={{ fill: "#94a3b8", fontSize: 10 }}
                />
                <Radar 
                  name="권장 최적치" 
                  dataKey="optimal" 
                  stroke="#cbd5e1" 
                  fill="#f1f5f9" 
                  fillOpacity={0.3} 
                />
                <Radar 
                  name="현재 섭취 수준" 
                  dataKey="current" 
                  stroke="#4f46e5" 
                  fill="#6366f1" 
                  fillOpacity={0.45} 
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-center gap-6 text-xs text-slate-600 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-indigo-500/70" />
              <span>현재 복용 영양제 충족률</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-slate-200" />
              <span>기능의학적 최적 목표치 (100%)</span>
            </div>
          </div>
        </div>

        {/* Bar Chart: 5-Organ Defense Scores */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
                <span>5대 취약 부위별 신체 방어 점수</span>
              </h2>
              <span className="text-xs text-slate-500 font-medium">100점 만점</span>
            </div>
            <p className="text-xs text-slate-500">
              각 장기 조직의 산화 스트레스 방어, 재생 및 세포막 보호 기여도를 산출합니다.
            </p>
          </div>

          <div className="w-full h-72 sm:h-80 my-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={organDefenseData} 
                layout="vertical"
                margin={{ top: 10, right: 30, left: 30, bottom: 10 }}
              >
                <XAxis type="number" domain={[0, 100]} tick={{ fill: "#94a3b8", fontSize: 11 }} />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  tick={{ fill: "#1e293b", fontSize: 12, fontWeight: 600 }}
                  width={90}
                />
                <Tooltip 
                  formatter={(value: number | string | Array<number | string> | undefined) => [
                    `${value ?? 0}점 / 100점`,
                    "방어 지수"
                  ]}
                  contentStyle={{ backgroundColor: "#0f172a", borderRadius: "8px", color: "#fff" }}
                />
                <Bar dataKey="score" radius={[0, 8, 8, 0]} barSize={22}>
                  {organDefenseData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.score >= 80 ? "#10b981" : entry.score >= 50 ? "#6366f1" : "#f59e0b"} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-600 pt-2 border-t border-slate-100">
            <span className="flex items-center gap-1 text-emerald-700 font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> 80점+: 강력 방어
            </span>
            <span className="flex items-center gap-1 text-indigo-700 font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 inline-block" /> 50~79점: 양호
            </span>
            <span className="flex items-center gap-1 text-amber-700 font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> 50점 미만: 보강 필요
            </span>
          </div>
        </div>
      </div>

      {/* Benchmark Safety & RDA vs Optimal Meters */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
          <div>
            <h2 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-teal-600" />
              <span>주요 핵심 영양소 섭취 범위 (RDA vs 최적 섭취량 vs 상한선)</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              단순 결핍증 예방 기준(RDA)과 기능의학적 최적 섭취량(Optimal Intake), 독성 방지 상한선(UL) 비교
            </p>
          </div>
          <span className="text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full font-semibold">
            녹색 뱃지: 현재 복용 중인 영양소
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {keyNutrientMeters.map((meter, i) => (
            <div 
              key={i}
              className={`p-4 rounded-xl border transition-all ${
                meter.active 
                  ? "bg-emerald-50/40 border-emerald-300 ring-1 ring-emerald-500/20" 
                  : "bg-slate-50/80 border-slate-200"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sm text-slate-900">{meter.name}</span>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                  meter.active 
                    ? "bg-emerald-600 text-white" 
                    : "bg-slate-200 text-slate-600"
                }`}>
                  {meter.active ? "복용 중 (Active)" : "미복용"}
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600 my-3">
                <div className="flex justify-between">
                  <span className="text-slate-500">정부 일일 권장량 (RDA):</span>
                  <span className="font-mono font-semibold text-slate-800">{meter.rda} {meter.unit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-700 font-bold">기능의학 최적 권장:</span>
                  <span className="font-mono font-bold text-emerald-700">{meter.optimal} {meter.unit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-rose-600">안전 상한 섭취량 (UL):</span>
                  <span className="font-mono font-medium text-rose-700">{meter.upperLimit} {meter.unit}</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-500 border-t border-slate-200/60 pt-2">
                💡 {meter.tip}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Nutrient Toggle Shelf */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h2 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-600" />
              <span>나만의 영양제 스택 직접 구성하기 (원클릭 토글)</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              아래 100대 영양소 중 복용 중인 영양소를 켜거나 끄면 위 차트와 방어 점수가 즉시 재계산됩니다.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="영양소 검색..."
              className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs w-44 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <button
              onClick={() => setSelectedNutrientIds([])}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer"
            >
              모두 해제
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 max-h-80 overflow-y-auto pr-1">
          {allNutrients
            .filter(n => n.name.includes(searchFilter) || n.engName.toLowerCase().includes(searchFilter.toLowerCase()))
            .slice(0, 50)
            .map((nutrient) => {
              const isChecked = selectedNutrientIds.includes(nutrient.id);
              return (
                <button
                  key={nutrient.id}
                  onClick={() => handleToggleNutrient(nutrient.id)}
                  className={`p-2.5 rounded-lg text-left border text-xs transition-all cursor-pointer flex items-center justify-between gap-1.5 ${
                    isChecked
                      ? "bg-indigo-50 border-indigo-400 text-indigo-950 font-bold shadow-2xs"
                      : "bg-white hover:bg-slate-50 border-slate-200 text-slate-700"
                  }`}
                >
                  <span className="truncate">#{nutrient.number} {nutrient.name}</span>
                  {isChecked ? (
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                  ) : (
                    <span className="w-3.5 h-3.5 rounded-full border border-slate-300 shrink-0" />
                  )}
                </button>
              );
            })}
        </div>
      </div>
    </div>
  );
};
