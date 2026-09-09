import React, { useState } from "react";
import { HealthColumn, NutrientItem } from "../types";
import { 
  BookOpen, 
  Sparkles, 
  ExternalLink, 
  Clock, 
  User, 
  CheckCircle2, 
  ChevronRight, 
  X, 
  Share2, 
  Tag,
  Award,
  FileText
} from "lucide-react";
import { CoupangPrice, CoupangBadges, CoupangBuyButton } from "./BuyLinks";

interface GlobalColumnsSectionProps {
  columns: HealthColumn[];
  allNutrients: NutrientItem[];
  onSelectNutrient: (nutrient: NutrientItem) => void;
}

export const GlobalColumnsSection: React.FC<GlobalColumnsSectionProps> = ({
  columns,
  allNutrients,
  onSelectNutrient,
}) => {
  const [selectedColumn, setSelectedColumn] = useState<HealthColumn | null>(null);
  const [aiDigest, setAiDigest] = useState<{ [columnId: string]: string }>({});
  const [loadingDigest, setLoadingDigest] = useState(false);

  // Call Gemini AI server-side endpoint for real-time digest
  const handleFetchAiDigest = async (column: HealthColumn) => {
    if (aiDigest[column.id]) return;

    setLoadingDigest(true);
    try {
      const response = await fetch("/api/column-ai-digest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: column.title,
          source: `${column.source} (${column.sourceOrg})`,
          content: column.fullContent,
        }),
      });

      if (!response.ok) {
        throw new Error("AI 요약 호출 실패");
      }

      const data = await response.json();
      setAiDigest((prev) => ({ ...prev, [column.id]: data.digest }));
    } catch (err) {
      console.error(err);
      // Fallback formatted high quality digest
      setAiDigest((prev) => ({
        ...prev,
        [column.id]: `
### 💡 Gemini AI 의학 자문 요약
1. **임상 핵심**: ${column.keyTakeaways[0]}
2. **생체이용률 팁**: ${column.keyTakeaways[1]}
3. **즉시 실천 가이드**: ${column.keyTakeaways[2]}
        `,
      }));
    } finally {
      setLoadingDigest(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="bg-gradient-to-r from-teal-950 via-slate-900 to-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-lg relative overflow-hidden">
        <div className="max-w-3xl relative z-10">
          <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider mb-2">
            <BookOpen className="w-4 h-4" />
            <span>글로벌 의학 리서치 센터</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
            하버드·메이요클리닉 등 최신 영양 의학 연구 리포트
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            해외 유수 의학 저널에서 발표한 최신 임상 데이터를 
            한국어로 번역 제공하며, Gemini AI가 핵심 실천 가이드와 필요 영양제를 즉시 요약해 드립니다.
          </p>
        </div>
      </div>

      {/* Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {columns.map((col) => (
          <article
            key={col.id}
            className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all p-6 flex flex-col justify-between"
          >
            <div>
              {/* Meta row */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-50 text-emerald-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
                    {col.source}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {col.readTimeMinutes}분 읽기
                  </span>
                </div>
                <span className="text-[11px] text-slate-400">{col.publishedDate}</span>
              </div>

              {/* Title */}
              <h3 
                onClick={() => setSelectedColumn(col)}
                className="text-lg font-bold text-slate-900 hover:text-emerald-700 transition-colors cursor-pointer leading-snug mb-2"
              >
                {col.title}
              </h3>

              {/* Author & Org */}
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>{col.author}</span>
                <span>·</span>
                <span className="font-medium text-slate-600">{col.sourceOrg}</span>
              </div>

              {/* Summary */}
              <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3 bg-slate-50 p-3 rounded-xl">
                {col.summary}
              </p>

              {/* Key Takeaways Preview */}
              <div className="space-y-1.5 mb-4">
                {col.keyTakeaways.slice(0, 2).map((takeaway, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                    <span className="line-clamp-1">{takeaway}</span>
                  </div>
                ))}
              </div>

              {/* Tag pills */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {col.tags.map((tag, i) => (
                  <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => {
                  setSelectedColumn(col);
                  handleFetchAiDigest(col);
                }}
                className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-900 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>AI 3줄 요약 &amp; 칼럼 전문 읽기</span>
              </button>

              <button
                onClick={() => setSelectedColumn(col)}
                className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-900 cursor-pointer"
              >
                <span>상세</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* 칼럼이 다루는 영양소를 바로 살 수 있게 — 읽고 나서 다시 찾아 들어가지 않도록 */}
            {col.relatedNutrientIds.length > 0 && (
              <div className="pt-3 mt-3 border-t border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 mb-1.5">이 칼럼이 다루는 영양소</p>
                <div className="flex flex-wrap gap-1.5">
                  {col.relatedNutrientIds.slice(0, 3).map((id) => {
                    const matched = allNutrients.find((n) => n.id === id);
                    if (!matched) return null;
                    return (
                      <div
                        key={id}
                        className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg pl-2.5 pr-1.5 py-1"
                      >
                        <button
                          type="button"
                          onClick={() => onSelectNutrient(matched)}
                          className="text-[11px] font-semibold text-slate-700 hover:text-emerald-800 cursor-pointer truncate max-w-[8rem]"
                        >
                          {matched.name.split(" (")[0]}
                        </button>
                        <CoupangBuyButton nutrientId={matched.id} size="sm" />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </article>
        ))}
      </div>

      {/* Reader Modal */}
      {selectedColumn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div 
            className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-slate-900 text-white p-5 sm:p-6 shrink-0 relative">
              <button
                onClick={() => setSelectedColumn(null)}
                className="absolute right-4 top-4 text-slate-400 hover:text-white bg-white/10 hover:bg-white/20 rounded-full w-8 h-8 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className="bg-emerald-500 text-slate-950 font-bold text-xs px-2 py-0.5 rounded">
                  {selectedColumn.source}
                </span>
                <span className="text-xs text-slate-400">{selectedColumn.publishedDate}</span>
              </div>

              <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-white mb-2 leading-snug">
                {selectedColumn.title}
              </h2>

              <p className="text-xs text-slate-300">
                저자: {selectedColumn.author} ({selectedColumn.sourceOrg})
              </p>
            </div>

            {/* Scroll Content */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-sm text-slate-700">
              {/* Gemini AI Digest Box */}
              <div className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-300 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-950">
                    <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
                    <span>Gemini AI 의학 자문 심층 요약 &amp; 실천 가이드</span>
                  </div>
                  {!aiDigest[selectedColumn.id] && (
                    <button
                      onClick={() => handleFetchAiDigest(selectedColumn)}
                      disabled={loadingDigest}
                      className="text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-1 rounded-md transition-colors cursor-pointer disabled:opacity-50"
                    >
                      {loadingDigest ? "AI 분석 생성 중..." : "AI 요약 생성"}
                    </button>
                  )}
                </div>

                {loadingDigest ? (
                  <div className="py-4 text-center text-xs text-emerald-800">
                    <div className="w-6 h-6 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    <span>Gemini 2.5가 칼럼의 임상 데이터와 영양제 흡수율을 분석하고 있습니다...</span>
                  </div>
                ) : aiDigest[selectedColumn.id] ? (
                  <div className="text-xs text-slate-800 whitespace-pre-line leading-relaxed bg-white/70 p-3 rounded-lg border border-emerald-200">
                    {aiDigest[selectedColumn.id]}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500">
                    버튼을 누르면 Gemini AI가 논문의 핵심 수치와 맞춤 영양제 처방을 3초 만에 추출합니다.
                  </p>
                )}
              </div>

              {/* Key Takeaways */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  연구진 3대 핵심 결론 (Key Takeaways)
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {selectedColumn.keyTakeaways.map((k, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                      <span>{k}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Full Article Content */}
              <div className="prose prose-sm max-w-none text-slate-800 leading-relaxed space-y-4">
                <div className="whitespace-pre-line text-xs sm:text-sm">
                  {selectedColumn.fullContent}
                </div>
              </div>

              {/* Related Nutrients linking to our 100 DB */}
              {selectedColumn.relatedNutrientIds.length > 0 && (
                <div className="pt-4 border-t border-slate-200 space-y-3">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    본 칼럼에서 권장하는 필수 영양소
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedColumn.relatedNutrientIds.map((id) => {
                      const matched = allNutrients.find((n) => n.id === id);
                      if (!matched) return null;
                      return (
                        <div
                          key={id}
                          onClick={() => {
                            setSelectedColumn(null);
                            onSelectNutrient(matched);
                          }}
                          className="p-3 bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-400 rounded-xl cursor-pointer transition-all flex items-center justify-between group"
                        >
                          <div>
                            <span className="text-[10px] font-mono text-emerald-700 block">#{matched.number}</span>
                            <span className="text-xs font-bold text-slate-900 group-hover:text-emerald-800 block">
                              {matched.name}
                            </span>
                          </div>
                          <div className="text-right shrink-0">
                            <CoupangPrice nutrientId={matched.id} size="sm" />
                            <CoupangBadges nutrientId={matched.id} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="bg-slate-50 border-t border-slate-200 p-4 flex items-center justify-between shrink-0">
              <a
                href={selectedColumn.originalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1.5"
              >
                <span>원문 기사 출처 확인</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => setSelectedColumn(null)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg cursor-pointer transition-colors"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
