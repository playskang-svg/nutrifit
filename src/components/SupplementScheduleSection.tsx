import React, { useState } from "react";
import { 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Plus, 
  Trash2, 
  Droplets, 
  Sun, 
  Moon, 
  Sunrise, 
  Sunset, 
  Coffee,
  Info,
  ArrowRight,
  Copy,
  ShieldCheck,
  Check
} from "lucide-react";
import { NutrientItem, TimeSlotKey, UserRoutineEntry } from "../types";
import { timeSlotsConfig, interactionRules, defaultUserRoutine } from "../data/scheduleData";

interface SupplementScheduleSectionProps {
  allNutrients: NutrientItem[];
  onSelectNutrient: (nutrient: NutrientItem) => void;
}

export const SupplementScheduleSection: React.FC<SupplementScheduleSectionProps> = ({
  allNutrients,
  onSelectNutrient,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<"timeline" | "myTracker" | "conflicts">("timeline");
  const [selectedSlotKey, setSelectedSlotKey] = useState<TimeSlotKey>("wake_fasting");
  const [userRoutines, setUserRoutines] = useState<UserRoutineEntry[]>(() => {
    const saved = localStorage.getItem("nutrimatrix_user_routines");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return defaultUserRoutine;
      }
    }
    return defaultUserRoutine;
  });

  // New routine modal/form states
  const [isAddingRoutine, setIsAddingRoutine] = useState(false);
  const [newNutrientName, setNewNutrientName] = useState("");
  const [newSlot, setNewSlot] = useState<TimeSlotKey>("morning_post");
  const [newDosage, setNewDosage] = useState("1캡슐 (식후)");
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Save routines to localStorage
  const saveRoutines = (updated: UserRoutineEntry[]) => {
    setUserRoutines(updated);
    localStorage.setItem("nutrimatrix_user_routines", JSON.stringify(updated));
  };

  const handleToggleTaken = (id: string) => {
    const updated = userRoutines.map((r) => 
      r.id === id ? { ...r, takenToday: !r.takenToday } : r
    );
    saveRoutines(updated);
  };

  const handleDeleteRoutine = (id: string) => {
    const updated = userRoutines.filter((r) => r.id !== id);
    saveRoutines(updated);
  };

  const handleAddRoutine = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNutrientName.trim()) return;

    const matched = allNutrients.find(n => 
      n.name.toLowerCase().includes(newNutrientName.trim().toLowerCase()) ||
      n.engName.toLowerCase().includes(newNutrientName.trim().toLowerCase())
    );

    const newEntry: UserRoutineEntry = {
      id: "routine-" + Date.now(),
      nutrientId: matched ? matched.id : "custom-" + Date.now(),
      nutrientName: matched ? matched.name : newNutrientName.trim(),
      timeSlot: newSlot,
      dosage: newDosage,
      takenToday: false,
      notes: matched ? matched.bestSupplementForm.absorptionTip : "적정량 미온수와 함께 섭취"
    };

    saveRoutines([...userRoutines, newEntry]);
    setNewNutrientName("");
    setIsAddingRoutine(false);
  };

  const handleResetDaily = () => {
    const updated = userRoutines.map(r => ({ ...r, takenToday: false }));
    saveRoutines(updated);
  };

  const handleCopySchedule = () => {
    const slotNames: Record<TimeSlotKey, string> = {
      wake_fasting: "1. [기상 직후 공복]",
      morning_post: "2. [아침 식후]",
      lunch_post: "3. [점심 식후]",
      dinner_post: "4. [저녁 식후]",
      bedtime: "5. [취침 전 30분]"
    };

    let text = "📋 [NutriMatrix 100] 나의 맞춤 영양제 복용 시간표\n\n";
    (Object.keys(slotNames) as TimeSlotKey[]).forEach(slotKey => {
      const items = userRoutines.filter(r => r.timeSlot === slotKey);
      text += `${slotNames[slotKey]}\n`;
      if (items.length === 0) {
        text += "  - 복용 항목 없음\n";
      } else {
        items.forEach(item => {
          text += `  • ${item.nutrientName} (${item.dosage})${item.notes ? ` - ${item.notes}` : ""}\n`;
        });
      }
      text += "\n";
    });
    text += "출처: NutriMatrix 100 기능의학 영양 임상 가이드";

    navigator.clipboard.writeText(text);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  const totalCount = userRoutines.length;
  const takenCount = userRoutines.filter(r => r.takenToday).length;
  const progressPercent = totalCount > 0 ? Math.round((takenCount / totalCount) * 100) : 0;

  const getSlotIcon = (key: TimeSlotKey) => {
    switch (key) {
      case "wake_fasting":
        return <Sunrise className="w-5 h-5 text-amber-500" />;
      case "morning_post":
        return <Sun className="w-5 h-5 text-yellow-500" />;
      case "lunch_post":
        return <Sun className="w-5 h-5 text-orange-500" />;
      case "dinner_post":
        return <Sunset className="w-5 h-5 text-indigo-400" />;
      case "bedtime":
        return <Moon className="w-5 h-5 text-purple-400" />;
    }
  };

  const currentSlotConfig = timeSlotsConfig.find(s => s.key === selectedSlotKey) || timeSlotsConfig[0];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Section Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-teal-800/40">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-3 border border-emerald-500/30">
            <Clock className="w-3.5 h-3.5" />
            <span>일주기 리듬(Circadian Rhythm) 최적 섭취 가이드</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2">
            영양제 복용 시간표 &amp; 충돌 방지 플래너
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            영양제는 <strong>"언제, 무엇과 함께 먹느냐"</strong>에 따라 흡수율이 최대 5배 차이 납니다. 
            위산 상태(공복 vs 식후), 지용성 미셀화, 상호 경쟁(칼슘 vs 철분)을 완벽히 계산한 시간대별 황금 루틴을 확인하세요.
          </p>
        </div>

        {/* Floating progress quick stat on top right */}
        <div className="mt-4 sm:mt-0 sm:absolute sm:right-8 sm:top-1/2 sm:-translate-y-1/2 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/15 min-w-[200px]">
          <div className="flex items-center justify-between text-xs text-slate-200 mb-1.5">
            <span className="font-medium">오늘의 복용 완수율</span>
            <span className="font-bold text-emerald-300">{takenCount}/{totalCount}개 ({progressPercent}%)</span>
          </div>
          <div className="w-full bg-black/40 h-2.5 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-emerald-400 to-teal-300 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-300 mt-2 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            시간대별 흡수 경쟁 방지 모드 적용
          </p>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveSubTab("timeline")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              activeSubTab === "timeline"
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>5단계 시간대별 가이드</span>
          </button>

          <button
            onClick={() => setActiveSubTab("myTracker")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              activeSubTab === "myTracker"
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>나의 일일 복용 체크리스트</span>
            <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-0.5 rounded-full font-bold">
              {totalCount}
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab("conflicts")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              activeSubTab === "conflicts"
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <span>상호작용 충돌 &amp; 시너지 분석기</span>
          </button>
        </div>

        {activeSubTab === "myTracker" && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopySchedule}
              className="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copiedNotification ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">복사 완료!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>시간표 텍스트 복사</span>
                </>
              )}
            </button>
            <button
              onClick={handleResetDaily}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
            >
              오늘 체크 초기화
            </button>
            <button
              onClick={() => setIsAddingRoutine(true)}
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 shadow-sm transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>영양제 추가</span>
            </button>
          </div>
        )}
      </div>

      {/* SUB-TAB 1: 5-Stage Timeline Guide */}
      {activeSubTab === "timeline" && (
        <div className="space-y-6">
          {/* Time Slot Horizontal Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {timeSlotsConfig.map((slot) => {
              const isSelected = selectedSlotKey === slot.key;
              return (
                <button
                  key={slot.key}
                  onClick={() => setSelectedSlotKey(slot.key)}
                  className={`p-4 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? "bg-emerald-800 text-white border-emerald-900 shadow-md ring-2 ring-emerald-600/30 scale-[1.02]"
                      : "bg-white text-slate-800 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/40"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`p-1.5 rounded-lg ${isSelected ? "bg-white/20" : "bg-slate-100"}`}>
                      {getSlotIcon(slot.key)}
                    </span>
                    <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full ${
                      isSelected ? "bg-white/20 text-emerald-100" : "bg-slate-100 text-slate-600"
                    }`}>
                      {slot.timeRange}
                    </span>
                  </div>
                  <div>
                    <h2 className="font-bold text-sm sm:text-base leading-snug">{slot.title}</h2>
                    <p className={`text-xs mt-1 line-clamp-1 ${isSelected ? "text-emerald-100" : "text-slate-500"}`}>
                      {slot.badge}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Slot Deep Dive Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-emerald-100 rounded-xl">
                  {getSlotIcon(currentSlotConfig.key)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-slate-900">{currentSlotConfig.title}</h2>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                      권장 시간: {currentSlotConfig.timeRange}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 font-medium">
                    {currentSlotConfig.badge}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <Droplets className="w-4 h-4 text-sky-500 shrink-0" />
                <span>{currentSlotConfig.waterTip}</span>
              </div>
            </div>

            {/* Scientific Rationale */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-slate-600" />
                생리학적 흡수 메커니즘
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                {currentSlotConfig.rationale}
              </p>
            </div>

            {/* Recommended vs Avoid Two Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Recommended */}
              <div className="bg-emerald-50/50 rounded-xl p-5 border border-emerald-200/70 space-y-3">
                <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>이 시간대 꼭 복용해야 할 영양소</span>
                </div>
                <ul className="space-y-2">
                  {currentSlotConfig.recommendedCategories.map((item, idx) => (
                    <li key={idx} className="text-xs sm:text-sm text-slate-800 flex items-start gap-2 bg-white/80 p-2.5 rounded-lg border border-emerald-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Avoid */}
              <div className="bg-rose-50/50 rounded-xl p-5 border border-rose-200/70 space-y-3">
                <div className="flex items-center gap-2 text-rose-900 font-bold text-sm">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>이 시간대 피해야 할 영양소 &amp; 이유</span>
                </div>
                <ul className="space-y-2">
                  {currentSlotConfig.avoidCategories.map((item, idx) => (
                    <li key={idx} className="text-xs sm:text-sm text-slate-800 flex items-start gap-2 bg-white/80 p-2.5 rounded-lg border border-rose-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Quick action: Browse related 100 nutrients */}
            <div className="pt-2">
              <h3 className="text-xs font-bold text-slate-500 mb-2">
                100대 영양소 중 이 시간대 추천 성분 상세 보기:
              </h3>
              <div className="flex flex-wrap gap-2">
                {currentSlotConfig.sampleNutrients.map((name, i) => {
                  const matched = allNutrients.find(n => n.name.includes(name) || name.includes(n.name));
                  return (
                    <button
                      key={i}
                      onClick={() => matched && onSelectNutrient(matched)}
                      className={`text-xs px-3 py-1.5 rounded-lg font-medium border transition-colors flex items-center gap-1.5 ${
                        matched
                          ? "bg-slate-100 hover:bg-emerald-100 text-slate-800 hover:text-emerald-900 border-slate-200 cursor-pointer"
                          : "bg-slate-50 text-slate-500 border-slate-200 cursor-default"
                      }`}
                    >
                      <span>{name}</span>
                      {matched && <ArrowRight className="w-3 h-3 text-slate-400" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: My Daily Tracker */}
      {activeSubTab === "myTracker" && (
        <div className="space-y-6">
          {/* Progress Card */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="relative w-16 h-16 flex items-center justify-center bg-emerald-50 rounded-full border-4 border-emerald-500 shrink-0">
                <span className="text-base font-black text-emerald-900">{progressPercent}%</span>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">오늘의 복용 체크 상태</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  총 {totalCount}개 중 <span className="font-bold text-emerald-700">{takenCount}개 복용 완료</span>. 매일 일정한 시간에 섭취하는 것이 일관된 혈중 농도를 유지합니다.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                onClick={() => setIsAddingRoutine(true)}
                className="w-full sm:w-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>영양제 추가하기</span>
              </button>
            </div>
          </div>

          {/* Grouped by Time Slots */}
          <div className="space-y-4">
            {timeSlotsConfig.map((slot) => {
              const slotEntries = userRoutines.filter(r => r.timeSlot === slot.key);
              return (
                <div key={slot.key} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
                  {/* Slot Header Bar */}
                  <div className="bg-slate-50/80 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="p-1 bg-white rounded-md border border-slate-200 shadow-xs">
                        {getSlotIcon(slot.key)}
                      </span>
                      <div>
                        <span className="font-bold text-sm text-slate-900">{slot.title}</span>
                        <span className="ml-2 text-xs text-slate-500 font-mono">({slot.timeRange})</span>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-slate-500">
                      {slotEntries.filter(e => e.takenToday).length} / {slotEntries.length} 완료
                    </span>
                  </div>

                  {/* Slot Items */}
                  <div className="divide-y divide-slate-100">
                    {slotEntries.length === 0 ? (
                      <div className="p-4 text-center text-xs text-slate-400">
                        이 시간대에 설정된 복용 항목이 없습니다.
                      </div>
                    ) : (
                      slotEntries.map((entry) => {
                        const matchedNutrient = allNutrients.find(n => n.id === entry.nutrientId);
                        return (
                          <div 
                            key={entry.id}
                            className={`p-4 flex items-center justify-between gap-3 transition-colors ${
                              entry.takenToday ? "bg-emerald-50/40" : "hover:bg-slate-50/80"
                            }`}
                          >
                            <div className="flex items-center gap-3.5 flex-1 min-w-0">
                              <button
                                onClick={() => handleToggleTaken(entry.id)}
                                className={`w-6 h-6 rounded-md flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                                  entry.takenToday
                                    ? "bg-emerald-600 text-white shadow-xs"
                                    : "border-2 border-slate-300 hover:border-emerald-500 bg-white"
                                }`}
                              >
                                {entry.takenToday && <Check className="w-4 h-4 stroke-[3]" />}
                              </button>

                              <div className="min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className={`font-bold text-sm ${
                                    entry.takenToday ? "text-slate-500 line-through" : "text-slate-900"
                                  }`}>
                                    {entry.nutrientName}
                                  </span>
                                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                                    {entry.dosage}
                                  </span>
                                  {matchedNutrient && (
                                    <button
                                      onClick={() => onSelectNutrient(matchedNutrient)}
                                      className="text-[11px] text-teal-700 hover:underline flex items-center gap-0.5 font-medium cursor-pointer"
                                    >
                                      상세정보 <ArrowRight className="w-3 h-3" />
                                    </button>
                                  )}
                                </div>
                                {entry.notes && (
                                  <p className="text-xs text-slate-500 mt-0.5 truncate">
                                    💡 {entry.notes}
                                  </p>
                                )}
                              </div>
                            </div>

                            <button
                              onClick={() => handleDeleteRoutine(entry.id)}
                              className="text-slate-300 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer shrink-0"
                              title="삭제"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: Interaction & Conflict Analyzer */}
      {activeSubTab === "conflicts" && (
        <div className="space-y-6">
          <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-amber-900">
              <strong className="font-bold">기능의학 임상 상호작용 검사기</strong>: 영양제 성분 간에는 흡수 경로를 독점하거나 침전을 일으키는 
              <strong> 상충(충돌)</strong> 관계와, 서로의 생체이용률을 수배로 높여주는 <strong>황금 시너지</strong> 관계가 있습니다. 
              충돌 항목은 최소 2~4시간 간격을 두고 섭취해야 배출 낭비를 막을 수 있습니다.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {interactionRules.map((rule) => {
              const isConflict = rule.severity === "high" || rule.severity === "medium";
              return (
                <div 
                  key={rule.id}
                  className={`rounded-2xl p-5 border shadow-xs flex flex-col justify-between ${
                    isConflict
                      ? "bg-white border-rose-200"
                      : "bg-white border-emerald-200"
                  }`}
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-800">
                          {rule.nutrientA}
                        </span>
                        <span className="text-xs text-slate-400">vs</span>
                        <span className="font-bold text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-800">
                          {rule.nutrientB}
                        </span>
                      </div>

                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                        rule.severity === "high"
                          ? "bg-rose-100 text-rose-800 border border-rose-200"
                          : rule.severity === "medium"
                          ? "bg-amber-100 text-amber-800 border border-amber-200"
                          : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                      }`}>
                        {rule.severity === "high" ? "🚨 고위험 충돌" : rule.severity === "medium" ? "⚠️ 주의 필요" : "✨ 시너지 조합"}
                      </span>
                    </div>

                    <h2 className="font-bold text-slate-900 text-sm sm:text-base mt-2 mb-1.5">
                      {rule.title}
                    </h2>

                    <p className="text-xs text-slate-600 leading-relaxed mb-3">
                      <strong className="text-slate-700">작용 원리: </strong>
                      {rule.mechanism}
                    </p>
                  </div>

                  {/* Solution */}
                  <div className={`p-3 rounded-xl text-xs font-medium ${
                    isConflict
                      ? "bg-rose-50/80 text-rose-950 border border-rose-200/60"
                      : "bg-emerald-50/80 text-emerald-950 border border-emerald-200/60"
                  }`}>
                    <strong className="block font-bold mb-0.5">
                      {isConflict ? "💡 권장 복용 해법 (간격 분리):" : "💡 극대화 복용 팁:"}
                    </strong>
                    {rule.recommendedSolution}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Routine Add Modal */}
      {isAddingRoutine && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-scaleUp">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Plus className="w-5 h-5 text-emerald-600" />
                복용 영양제 추가하기
              </h3>
              <button 
                onClick={() => setIsAddingRoutine(false)}
                className="text-slate-400 hover:text-slate-600 text-sm p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddRoutine} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  영양제 이름 또는 성분명
                </label>
                <input
                  type="text"
                  value={newNutrientName}
                  onChange={(e) => setNewNutrientName(e.target.value)}
                  placeholder="예: 마그네슘, 오메가3, 비타민D, 코큐텐..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  복용 시간대 선택
                </label>
                <select
                  value={newSlot}
                  onChange={(e) => setNewSlot(e.target.value as TimeSlotKey)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600"
                >
                  {timeSlotsConfig.map(s => (
                    <option key={s.key} value={s.key}>
                      {s.title} ({s.timeRange}) - {s.badge}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  섭취 용량 / 형태
                </label>
                <input
                  type="text"
                  value={newDosage}
                  onChange={(e) => setNewDosage(e.target.value)}
                  placeholder="예: 1캡슐 (식후 30분), 2정, 1포..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddingRoutine(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors shadow-xs cursor-pointer"
                >
                  루틴에 등록
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
