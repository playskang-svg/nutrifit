import React from "react";
import { HeartPulse } from "lucide-react";
import { linkProps } from "../lib/router";

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onOpenAiDiagnostic: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  setActiveTab,
  onOpenAiDiagnostic,
}) => {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <section className="footer-intro" aria-labelledby="footer-site-name">
          <a {...linkProps("/")} className="inline-flex items-center gap-2 mb-3 cursor-pointer group">
            <div className="w-8 h-8 rounded-lg bg-[#102d3c] flex items-center justify-center text-white">
              <HeartPulse className="w-4 h-4 text-[#eaf2ee]" />
            </div>
            <div className="flex flex-col">
              <strong className="text-sm font-black text-[#102d3c] tracking-tight">NutriFit 100</strong>
              <small className="text-[10px] text-[#61777f] font-bold">100대 영양소 &amp; 맞춤 영양제 가이드</small>
            </div>
          </a>
          <h2 id="footer-site-name">
            의학적 근거와 공공 영양기준으로<br />
            올바른 섭취 기준을 확인합니다
          </h2>
          <p>
            100대 필수 영양소의 권장섭취량과 흡수 기전, 식약처 기능성 고시를 검증 가능한 근거 자료와 함께 제공합니다.
            질병의 진단·치료는 전문 의료진과 상담하세요.
          </p>
          <div className="footer-contact" aria-label="사이트 운영 및 문의 정보">
            <p>
              <span>운영팀</span>
              <strong>NutriFit 영양정보팀</strong>
            </p>
            <p>
              <span>이메일 문의</span>
              <a href="mailto:contact@nutrifit.kr">contact@nutrifit.kr</a>
            </p>
            <p>
              <span>운영사</span>
              <strong>애드블스</strong>
              <a href="https://adbles.com" target="_blank" rel="noreferrer">
                Adbles.com <span aria-hidden="true">↗</span>
              </a>
            </p>
          </div>
        </section>

        <div className="footer-links">
          <nav aria-label="주요 콘텐츠">
            <strong>살펴보기</strong>
            <a {...linkProps("/health")}>최신 건강정보</a>
            <button onClick={() => setActiveTab("catalog")}>100대 영양소 도감</button>
            <button onClick={() => setActiveTab("schedule")}>영양제 복용 시간표</button>
            <button onClick={() => setActiveTab("organs")}>장기별 맞춤 가이드</button>
            <button onClick={() => setActiveTab("demographics")}>생애주기·노년기 영양</button>
            <button onClick={() => setActiveTab("diet")}>식단 매칭 가이드</button>
            <button onClick={() => setActiveTab("deals")}>가격·배송 혜택</button>
          </nav>
          <nav aria-label="사이트 신뢰 정보">
            <strong>사이트 정보</strong>
            <a {...linkProps("/about")}>사이트 소개</a>
            <a {...linkProps("/editorial")}>편집 원칙</a>
            <a {...linkProps("/privacy")}>개인정보처리방침</a>
            <a {...linkProps("/terms")}>이용약관</a>
            <a {...linkProps("/contact")}>문의하기</a>
          </nav>
        </div>
      </div>

      <div className="footer-bottom">
        <small>© 2026 NutriFit (뉴트리핏). All rights reserved. ‘뉴트리핏’은 애드블스가 운영합니다.</small>
        <p>
          본 사이트의 모든 콘텐츠는 일반적인 영양·건강 정보 제공을 목적으로 하며, 전문 의사의 진단·처방이나 의료 행위를 대신하지 않습니다.
          건강기능식품은 질병의 예방 및 치료를 위한 의약품이 아닙니다.
          쿠팡 파트너스 활동의 일환으로 일정액의 수수료를 제공받을 수 있습니다.
        </p>
      </div>
    </footer>
  );
};
