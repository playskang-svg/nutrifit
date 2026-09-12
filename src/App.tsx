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
import { getPageBySlug } from "./content/pages";
import { SitePageView } from "./components/SitePageView";
import { useRoute, navigate, linkProps } from "./lib/router";
import { buildPostSeo, buildHealthListSeo, buildPageSeo, applySeoHead } from "./lib/seo";
import { NutrientItem } from "./types";
import { Search } from "lucide-react";

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
  const sitePage = route.name === "page" ? getPageBySlug(route.slug) : undefined;

  // 워커가 내려준 사전렌더 메타를 클라이언트 라우팅에서도 같은 값으로 유지한다.
  useEffect(() => {
    if (route.name === "post" && post) {
      applySeoHead(buildPostSeo(post));
    } else if (route.name === "health") {
      applySeoHead(buildHealthListSeo(route.category, getPostsByCategory(route.category)));
    } else if (route.name === "page" && sitePage) {
      applySeoHead(buildPageSeo(sitePage));
    }
  }, [route, post, sitePage]);

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
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* 모바일 검색. 헤더의 검색바가 md 미만에서 숨겨져 진입점이 없었다.
            헤더 안에 두면 스티키 높이를 계속 차지해서 본문 맨 위로 뺐다. */}
        <div className="md:hidden mb-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              inputMode="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="영양소·증상·음식 검색"
              aria-label="영양소, 증상, 음식 검색"
              className="w-full pl-9 pr-3 py-2.5 bg-white text-base text-slate-800 placeholder-slate-400 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
            />
          </div>
        </div>

        {/* 건강블로그 상세 */}
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
              건강블로그 목록 보기
            </a>
          </div>
        )}

        {/* 정책·안내 페이지 */}
        {route.name === "page" && sitePage && <SitePageView page={sitePage} />}

        {/* 건강블로그 목록 */}
        {route.name === "health" && (
          <HealthPostList
            category={route.category}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
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
