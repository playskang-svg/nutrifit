import React from "react";
import { HeartPulse, ShieldCheck, ExternalLink, BookOpen, Award } from "lucide-react";

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onOpenAiDiagnostic: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  setActiveTab,
  onOpenAiDiagnostic,
}) => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Brand & Scientific Mission */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5 text-white">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                <HeartPulse className="w-5 h-5 text-emerald-100" />
              </div>
              <span className="font-bold text-base tracking-tight">NutriFit 100 (뉴트리핏)</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              100대 필수 영양소 임상 데이터베이스. 생애주기별(노년기·성장기), 성별, 계절, 직업(직장인·수험생), 
              취약 부위(눈·장·관절·간)에 맞춘 과학적 음식과 고생체이용률 영양제 가이드.
            </p>
            <div className="flex items-center gap-2 text-[10px] text-emerald-400 font-mono">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>SEO · GEO Optimized Medical Knowledge</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-2">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">핵심 서비스</h4>
            <ul className="space-y-1.5 text-[11px]">
              <li>
                <button 
                  onClick={() => setActiveTab("catalog")} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  100대 영양소 대백과 도감
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab("schedule")} 
                  className="hover:text-white transition-colors cursor-pointer text-amber-400 font-medium"
                >
                  ⏱️ 영양제 복용 시간표 &amp; 플래너
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab("visualizer")} 
                  className="hover:text-white transition-colors cursor-pointer text-indigo-400 font-medium"
                >
                  📊 영양 상태 시각화 레이더
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab("subscription")} 
                  className="hover:text-white transition-colors cursor-pointer text-teal-400 font-medium"
                >
                  📦 영양제 구독 관리 &amp; 6병 통관
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab("diet")} 
                  className="hover:text-white transition-colors cursor-pointer text-amber-300 font-medium"
                >
                  🥗 식단 매칭 &amp; 흡수 시너지 가이드
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab("organs")} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  약한 부위별 처방 (눈·장·관절·간)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab("demographics")} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  노년기 근감소증 &amp; 직장인 피로 솔루션
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab("columns")} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  하버드·메이요클리닉·iHerb 의학 칼럼
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab("deals")} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  iHerb 공식 30% 특가 할인관
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Medical Reference Sources */}
          <div className="space-y-2">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">학술 및 의학 자문 근거</h4>
            <ul className="space-y-1.5 text-[11px] text-slate-400">
              <li>미국 국립의학도서관 (PubMed / NIH)</li>
              <li>식품의약품안전처 (MFDS) 건강기능식품 데이터</li>
              <li>유럽식품안전청 (EFSA) 기능성 원료 기준</li>
              <li>하버드 의과대학 헬스 퍼블리싱 (Harvard Health)</li>
              <li>메이요 클리닉 위장관 &amp; 대사 리포트</li>
              <li>iHerb Medical Advisory Board Clinical Reviews</li>
            </ul>
          </div>

          {/* Col 4: AI Diagnostic CTA & Notice */}
          <div className="space-y-3 bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs">
              <Award className="w-4 h-4" />
              <span>무료 AI 맞춤 영양 분석</span>
            </div>
            <p className="text-[11px] text-slate-300">
              본인의 연령, 성별, 취약 부위를 체크하고 1분 만에 의학적 영양 리포트를 받아보세요.
            </p>
            <button
              onClick={onOpenAiDiagnostic}
              className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
            >
              AI 맞춤 진단 시작하기
            </button>
          </div>
        </div>

        {/* Medical & Affiliate Disclaimer */}
        <div className="border-t border-slate-800 pt-6 space-y-2 text-[10px] text-slate-400 leading-relaxed">
          <p>
            <strong>의학적 면책 고지 (Medical Disclaimer):</strong> 본 웹사이트에서 제공하는 정보는 학술 연구 및 의학 칼럼을 바탕으로 한 일반적인 건강 및 영양 정보이며, 
            의사의 진단, 치료 또는 처방을 대신할 수 없습니다. 질환이 있거나 처방약을 복용 중인 경우 영양제 섭취 전 반드시 주치의 또는 약사와 상담하십시오.
          </p>
          <p>
            <strong>제휴 마케팅 안내:</strong> 본 사이트는 iHerb 등 해외 직구 플랫폼의 공식 제휴 프로그램에 참여하여 정품 인증 30% 할인 코드 및 링크를 제공하며, 
            구매 시 플랫폼으로부터 소정의 수수료를 지급받을 수 있으나 구매자의 결제 금액에는 일체의 추가 비용이 발생하지 않습니다.
          </p>
          <p className="pt-2 text-slate-400">
            © 2025 NutriMatrix 100. All Rights Reserved. Structured with Schema.org MedicalWebPage for Search &amp; Generative Engine Optimization.
          </p>
        </div>
      </div>
    </footer>
  );
};
