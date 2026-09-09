import React, { useState } from "react";
import { NutrientItem } from "../types";
import { 
  Users, 
  Briefcase, 
  GraduationCap, 
  Sun, 
  CloudSnow, 
  Wind, 
  ShieldAlert, 
  CheckCircle2, 
  ChevronRight,
  Sparkles,
  Flame,
  Award
} from "lucide-react";
import { CoupangBuyButton } from "./BuyLinks";

interface DemographicSpecialGuideProps {
  allNutrients: NutrientItem[];
  onSelectNutrient: (nutrient: NutrientItem) => void;
}

export const DemographicSpecialGuide: React.FC<DemographicSpecialGuideProps> = ({
  allNutrients,
  onSelectNutrient,
}) => {
  const [activeSegment, setActiveSegment] = useState<"elderly" | "office" | "student" | "seasonal">("elderly");

  return (
    <div className="space-y-6">
      {/* Segment switcher */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="max-w-3xl mb-6">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
            생애주기 &amp; 직업군 정밀 영양학
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            노년기 집중 케어 · 직장인 번아웃 · 수험생 두뇌 · 계절별 면역
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            연령과 직업에 따라 체내 영양소 대사율과 소모량이 완전히 달라집니다. 
            각 라이프스테이지에 최적화된 필수 영양소 조합과 복용 전략을 확인하세요.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <button
            onClick={() => setActiveSegment("elderly")}
            className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
              activeSegment === "elderly"
                ? "bg-slate-900 text-white border-slate-900 shadow-md"
                : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <Users className="w-5 h-5 text-amber-400" />
              {activeSegment === "elderly" && <span className="text-[10px] bg-amber-500 text-slate-950 font-bold px-1.5 py-0.2 rounded">중점 케어</span>}
            </div>
            <div>
              <span className="font-black text-sm block">60대+ 노년기</span>
              <span className={`text-[11px] block ${activeSegment === "elderly" ? "text-slate-300" : "text-slate-500"}`}>
                근감소증 · 골밀도 · 기억력
              </span>
            </div>
          </button>

          <button
            onClick={() => setActiveSegment("office")}
            className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
              activeSegment === "office"
                ? "bg-slate-900 text-white border-slate-900 shadow-md"
                : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <Briefcase className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <span className="font-black text-sm block">직장인 &amp; 교대근무</span>
              <span className={`text-[11px] block ${activeSegment === "office" ? "text-slate-300" : "text-slate-500"}`}>
                만성피로 · 간해독 · 마그네슘
              </span>
            </div>
          </button>

          <button
            onClick={() => setActiveSegment("student")}
            className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
              activeSegment === "student"
                ? "bg-slate-900 text-white border-slate-900 shadow-md"
                : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <GraduationCap className="w-5 h-5 text-teal-400" />
            </div>
            <div>
              <span className="font-black text-sm block">수험생 &amp; 청소년</span>
              <span className={`text-[11px] block ${activeSegment === "student" ? "text-slate-300" : "text-slate-500"}`}>
                뇌 집중력 · 눈피로 · 면역
              </span>
            </div>
          </button>

          <button
            onClick={() => setActiveSegment("seasonal")}
            className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
              activeSegment === "seasonal"
                ? "bg-slate-900 text-white border-slate-900 shadow-md"
                : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <Wind className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <span className="font-black text-sm block">계절별 면역</span>
              <span className={`text-[11px] block ${activeSegment === "seasonal" ? "text-slate-300" : "text-slate-500"}`}>
                환절기 비염 · 겨울 D3 결핍
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Segment Content Section */}
      {activeSegment === "elderly" && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-amber-900 via-slate-900 to-slate-900 text-white p-6 rounded-2xl border border-amber-800/40">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Flame className="w-4 h-4" />
              <span>노년기 최대의 침묵의 살인마: 근감소증(Sarcopenia)과 동화작용 저항성</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3">
              "어르신들이 고기를 드셔도 다리 근육이 빠지는 의학적 이유"
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed max-w-4xl">
              젊은 시절에는 단백질 15g만 섭취해도 근육 합성 신호(mTOR)가 켜지지만, 60세 이상은 <strong>'동화작용 저항성(Anabolic Resistance)'</strong>이 발생하여 
              한 끼에 필수 아미노산 <strong>L-류신(Leucine)이 최소 3.0g 이상</strong> 한꺼번에 혈중에 유입되어야만 근육이 유지됩니다. 
              그러나 소화력이 약해진 노인이 고기 300g을 매끼 소화시키는 것은 위장장애를 부릅니다. 
              따라서 유당이 0%인 <strong>WPI 분리유청단백질</strong>과 <strong>발효 순수 류신</strong>, 그리고 혈관 석회화를 막는 <strong>비타민 D3+K2</strong>의 보충이 필수적입니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded">필수 1위</span>
                <span className="text-xs text-slate-400 font-mono">#35</span>
              </div>
              <h4 className="font-bold text-base text-slate-900">L-류신 &amp; WPI 분리유청단백질</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                노년기 mTOR 근단백 합성 스위치를 강제로 켜는 핵심 아미노산. 유당불내증 없는 순도 90% WPI와 함께 식후 또는 산책 직후 복용.
              </p>
              <button
                onClick={() => {
                  const n = allNutrients.find(x => x.id === "amino-leucine");
                  if (n) onSelectNutrient(n);
                }}
                className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
              >
                처방 상세 &amp; 최저가 보기
              </button>
              <CoupangBuyButton nutrientId="amino-leucine" size="sm" className="w-full" />
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-900 bg-blue-100 px-2 py-0.5 rounded">필수 2위</span>
                <span className="text-xs text-slate-400 font-mono">#3 &amp; #4</span>
              </div>
              <h4 className="font-bold text-base text-slate-900">비타민 D3 5000IU + K2-MK7</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                칼슘이 혈관 벽에 쌓여 동맥경화를 일으키는 '칼슘 역설'을 막고, 혈중 칼슘을 뼈 속 오스테오칼신으로 강제 수송해 골밀도 극대화.
              </p>
              <button
                onClick={() => {
                  const n = allNutrients.find(x => x.id === "vit-d3");
                  if (n) onSelectNutrient(n);
                }}
                className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
              >
                처방 상세 &amp; 최저가 보기
              </button>
              <CoupangBuyButton nutrientId="vit-d3" size="sm" className="w-full" />
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-purple-900 bg-purple-100 px-2 py-0.5 rounded">필수 3위</span>
                <span className="text-xs text-slate-400 font-mono">#47</span>
              </div>
              <h4 className="font-bold text-base text-slate-900">포스파티딜세린 (PS 300mg)</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                미국 FDA가 노년기 인지력 개선 기능성을 공식 인정한 뇌세포막 인지질. 깜빡거리는 건망증과 시냅스 신호 전달 복원.
              </p>
              <button
                onClick={() => {
                  const n = allNutrients.find(x => x.id === "fatty-ps");
                  if (n) onSelectNutrient(n);
                }}
                className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
              >
                처방 상세 &amp; 최저가 보기
              </button>
              <CoupangBuyButton nutrientId="fatty-ps" size="sm" className="w-full" />
            </div>
          </div>
        </div>
      )}

      {activeSegment === "office" && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-teal-950 via-slate-900 to-slate-900 text-white p-6 rounded-2xl border border-teal-800/40">
            <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Briefcase className="w-4 h-4" />
              <span>커피와 야근으로 고갈되는 직장인의 미네랄 &amp; 부신 방어선</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3">
              "카페인으로 버틸수록 마그네슘과 활성 비타민 B군이 소변으로 쏟아집니다"
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed max-w-4xl">
              하루 2~3잔의 커피는 신장 아데노신 수용체를 차단하여 체내 마그네슘, 아연, 비타민 B군을 강제로 소변 배출시킵니다. 
              오후만 되면 눈꺼풀이 떨리고 어깨가 뭉치며, 자도 자도 피로가 풀리지 않는 이유는 세포의 실제 ATP 배터리가 방전되었기 때문입니다. 
              위장장애 없는 <strong>글리시네이트 킬레이트 마그네슘</strong>과 간 해독을 돕는 <strong>밀크씨슬 실리마린</strong>, 활성형 B군이 직장인의 생존 처방입니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">직장인 1위</span>
              <h4 className="font-bold text-base text-slate-900">비스글리시네이트 킬레이트 마그네슘</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                설사 부작용이 없고 근육 뭉침과 눈떨림, 야간 불면을 즉각 이완시키는 최고 흡수율 유기산 마그네슘 300mg.
              </p>
              <button
                onClick={() => {
                  const n = allNutrients.find(x => x.id === "mineral-mg");
                  if (n) onSelectNutrient(n);
                }}
                className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
              >
                처방 상세 보기
              </button>
              <CoupangBuyButton nutrientId="mineral-mg" size="sm" className="w-full" />
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">직장인 2위</span>
              <h4 className="font-bold text-base text-slate-900">활성형 비타민 B-컴플렉스 50</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                간 대사 과정 없이 뇌세포로 즉각 유입되는 메틸코발라민 B12와 P-5-P B6 복합체. 출근 직후 복용 시 하루 종일 맑은 정신 유지.
              </p>
              <button
                onClick={() => {
                  const n = allNutrients.find(x => x.id === "vit-b-complex");
                  if (n) onSelectNutrient(n);
                }}
                className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
              >
                처방 상세 보기
              </button>
              <CoupangBuyButton nutrientId="vit-b-complex" size="sm" className="w-full" />
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">직장인 3위</span>
              <h4 className="font-bold text-base text-slate-900">밀크씨슬 실리마린 + 아티초크</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                잦은 회식과 과식 후 더부룩함을 없애고, 간세포막을 보호해 알코올 독소 분해 속도를 2배 단축.
              </p>
              <button
                onClick={() => {
                  const n = allNutrients.find(x => x.id === "phyto-silymarin");
                  if (n) onSelectNutrient(n);
                }}
                className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
              >
                처방 상세 보기
              </button>
              <CoupangBuyButton nutrientId="phyto-silymarin" size="sm" className="w-full" />
            </div>
          </div>
        </div>
      )}

      {activeSegment === "student" && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-900 text-white p-6 rounded-2xl border border-indigo-800/40">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
              <GraduationCap className="w-4 h-4" />
              <span>수험생 초집중 몰입(Flow)과 긴장 완화 뇌파 알파파 공식</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3">
              "불안감으로 인한 가슴 두근거림은 낮추고, 뇌 시냅스 기억 전달률은 3배 상승"
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed max-w-4xl">
              시험을 앞둔 학생이나 장시간 자리에 앉아 공부하는 수험생은 뇌 혈류와 신경전달물질 아세틸콜린의 소모가 극심합니다. 
              각성 음료의 과도한 당분과 카페인은 1시간 뒤 급격한 혈당 쇼크(Sugar Crash)와 집중력 산만을 부릅니다. 
              카페인의 두근거림을 상쇄하는 <strong>L-테아닌</strong>과 뇌세포막 인지질 <strong>Alpha-GPC</strong>, 그리고 수험생 눈 피로를 푸는 <strong>아스타잔틴</strong>이 최적의 조합입니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <span className="text-xs font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded">수험생 1위</span>
              <h4 className="font-bold text-base text-slate-900">L-테아닌 (Suntheanine® 200mg)</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                뇌파 알파파를 자극하여 잡생각을 지우고 차분한 고도의 집중 상태 유지. 시험 전 긴장 완화 필수.
              </p>
              <button
                onClick={() => {
                  const n = allNutrients.find(x => x.id === "amino-theanine");
                  if (n) onSelectNutrient(n);
                }}
                className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
              >
                처방 상세 보기
              </button>
              <CoupangBuyButton nutrientId="amino-theanine" size="sm" className="w-full" />
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <span className="text-xs font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded">수험생 2위</span>
              <h4 className="font-bold text-base text-slate-900">알파-GPC &amp; 미세조류 DHA</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                혈뇌장벽을 직접 통과해 암기력과 학습 기억을 담당하는 신경전달물질 아세틸콜린과 망막 신경을 동시 충전.
              </p>
              <button
                onClick={() => {
                  const n = allNutrients.find(x => x.id === "fatty-dha-brain");
                  if (n) onSelectNutrient(n);
                }}
                className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
              >
                처방 상세 보기
              </button>
              <CoupangBuyButton nutrientId="fatty-dha-brain" size="sm" className="w-full" />
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <span className="text-xs font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded">수험생 3위</span>
              <h4 className="font-bold text-base text-slate-900">킬레이트 아연 30mg + 케르세틴</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                환절기 시험 기간 콧물, 재채기 비염과 감기 바이러스 침투를 사전에 완벽 차단하는 천연 항히스타민 콤보.
              </p>
              <button
                onClick={() => {
                  const n = allNutrients.find(x => x.id === "mineral-zn");
                  if (n) onSelectNutrient(n);
                }}
                className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
              >
                처방 상세 보기
              </button>
              <CoupangBuyButton nutrientId="mineral-zn" size="sm" className="w-full" />
            </div>
          </div>
        </div>
      )}

      {activeSegment === "seasonal" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-blue-200 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-blue-700 text-xs font-bold">
                <CloudSnow className="w-4 h-4" />
                <span>겨울철 집중 처방 (11월 ~ 3월)</span>
              </div>
              <h4 className="font-bold text-lg text-slate-900">비타민 D3 5,000IU + 효모 베타글루칸</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                한국의 겨울철 자외선 B(UVB)는 0%에 수렴하여 체내 자연 비타민 D 합성이 전면 중단됩니다. 
                혈중 농도를 50ng/mL로 유지해야 기도 점막의 카텔리시딘 항균 펩타이드가 가동되어 호흡기 감염률을 42% 낮춥니다.
              </p>
              <div className="pt-2">
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-1 rounded">
                  추천: D3 5000IU + K2-MK7 + 1,3/1,6 베타글루칸
                </span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-amber-200 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-amber-700 text-xs font-bold">
                <Wind className="w-4 h-4" />
                <span>봄·가을 환절기 처방 (미세먼지 &amp; 알레르기 비염)</span>
              </div>
              <h4 className="font-bold text-lg text-slate-900">케르세틴 파이토솜 + NAC (N-아세틸 시스테인)</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                비만세포의 히스타민 분비를 차단해 환절기 콧물과 눈 가려움증을 완화하고, 
                기관지 점액을 용해하는 NAC가 미세먼지로 인한 폐 염증을 해독하고 글루타치온을 재생합니다.
              </p>
              <div className="pt-2">
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-1 rounded">
                  추천: Quercetin with Bromelain + NAC 600mg
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
