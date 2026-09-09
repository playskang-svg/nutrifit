import React, { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { NutrientCatalog } from "./components/NutrientCatalog";
import { OrganHealthGuide } from "./components/OrganHealthGuide";
import { DemographicSpecialGuide } from "./components/DemographicSpecialGuide";
import { GlobalColumnsSection } from "./components/GlobalColumnsSection";
import { DiscountDealSection } from "./components/DiscountDealSection";
import { SupplementScheduleSection } from "./components/SupplementScheduleSection";
import { NutritionVisualizerSection } from "./components/NutritionVisualizerSection";
import { SupplementSubscriptionSection } from "./components/SupplementSubscriptionSection";
import { DietMatchingSection } from "./components/DietMatchingSection";
import { NutrientDetailModal } from "./components/NutrientDetailModal";
import { PersonalizedAnalyzerModal } from "./components/PersonalizedAnalyzerModal";
import { HealthPostList } from "./components/health/HealthPostList";
import { HealthPostArticle } from "./components/health/HealthPostArticle";
import { Footer } from "./components/Footer";
import { all100Nutrients } from "./data/nutrientsAll";
import { healthColumnsData } from "./data/healthColumnsData";
import { getPostBySlug, getPostsByCategory } from "./content/posts";
import { useRoute, navigate, linkProps } from "./lib/router";
import { buildPostSeo, buildHealthListSeo, applySeoHead } from "./lib/seo";
import { NutrientItem } from "./types";

export default function App() {
  const route = useRoute();
  const [activeTab, setActiveTabState] = useState<string>(
    route.name === "home" ? route.tab : "catalog"
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedNutrient, setSelectedNutrient] = useState<NutrientItem | null>(null);
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);

  const setActiveTab = (tab: string) => {
    setActiveTabState(tab);
    navigate(tab === "catalog" ? "/" : `/?tab=${tab}`);
  };

  const post = route.name === "post" ? getPostBySlug(route.slug) : undefined;

  // 워커가 내려준 사전렌더 메타를 클라이언트 라우팅에서도 같은 값으로 유지한다.
  useEffect(() => {
    if (route.name === "post" && post) {
      applySeoHead(buildPostSeo(post));
    } else if (route.name === "health") {
      applySeoHead(buildHealthListSeo(route.category, getPostsByCategory(route.category)));
    }
  }, [route, post]);

  const isHealthRoute = route.name === "health" || route.name === "post";

  return (
    <div className="min-h-screen bg-slate-100/60 flex flex-col font-sans text-slate-900 antialiased selection:bg-emerald-200 selection:text-emerald-900">
      {/* Global Navigation Header */}
      <Header
        activeTab={isHealthRoute ? "health" : activeTab}
        setActiveTab={setActiveTab}
        onOpenAiDiagnostic={() => setIsAiModalOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* 건강정보 상세 */}
        {route.name === "post" && post && (
          <HealthPostArticle
            post={post}
            allNutrients={all100Nutrients}
            onSelectNutrient={(item) => setSelectedNutrient(item)}
          />
        )}

        {/* 없는 슬러그 */}
        {route.name === "post" && !post && (
          <div className="max-w-xl mx-auto text-center py-20">
            <p className="text-5xl mb-4">🔍</p>
            <h1 className="text-xl font-black text-slate-900 mb-2">
              찾는 글이 없습니다
            </h1>
            <p className="text-sm text-slate-500 mb-6">
              주소가 바뀌었거나 삭제된 글일 수 있습니다.
            </p>
            <a
              {...linkProps("/health")}
              className="inline-flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-bold px-4 py-2.5 rounded-lg transition-colors"
            >
              건강정보 목록 보기
            </a>
          </div>
        )}

        {/* 건강정보 목록 */}
        {route.name === "health" && (
          <HealthPostList category={route.category} searchQuery={searchQuery} />
        )}

        {route.name === "home" && (
          <>
            {activeTab === "catalog" && (
              <NutrientCatalog
                nutrients={all100Nutrients}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onSelectNutrient={(item) => setSelectedNutrient(item)}
              />
            )}

            {activeTab === "schedule" && (
              <SupplementScheduleSection
                allNutrients={all100Nutrients}
                onSelectNutrient={(item) => setSelectedNutrient(item)}
              />
            )}

            {activeTab === "visualizer" && (
              <NutritionVisualizerSection
                allNutrients={all100Nutrients}
                onSelectNutrient={(item) => setSelectedNutrient(item)}
              />
            )}

            {activeTab === "subscription" && (
              <SupplementSubscriptionSection
                allNutrients={all100Nutrients}
                onSelectNutrient={(item) => setSelectedNutrient(item)}
              />
            )}

            {activeTab === "diet" && (
              <DietMatchingSection
                allNutrients={all100Nutrients}
                onSelectNutrient={(item) => setSelectedNutrient(item)}
              />
            )}

            {activeTab === "organs" && (
              <OrganHealthGuide
                allNutrients={all100Nutrients}
                onSelectNutrient={(item) => setSelectedNutrient(item)}
              />
            )}

            {activeTab === "demographics" && (
              <DemographicSpecialGuide
                allNutrients={all100Nutrients}
                onSelectNutrient={(item) => setSelectedNutrient(item)}
              />
            )}

            {activeTab === "columns" && (
              <GlobalColumnsSection
                columns={healthColumnsData}
                allNutrients={all100Nutrients}
                onSelectNutrient={(item) => setSelectedNutrient(item)}
              />
            )}

            {activeTab === "deals" && (
              <DiscountDealSection
                allNutrients={all100Nutrients}
                onSelectNutrient={(item) => setSelectedNutrient(item)}
              />
            )}
          </>
        )}
      </main>

      {/* Nutrient Detail & Purchase Modal */}
      <NutrientDetailModal
        nutrient={selectedNutrient}
        onClose={() => setSelectedNutrient(null)}
      />

      {/* AI Nutrition Diagnostic Wizard Modal */}
      <PersonalizedAnalyzerModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        allNutrients={all100Nutrients}
        onSelectNutrient={(item) => setSelectedNutrient(item)}
      />

      {/* Medical & Affiliate Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onOpenAiDiagnostic={() => setIsAiModalOpen(true)}
      />
    </div>
  );
}
