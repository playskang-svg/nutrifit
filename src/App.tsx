import React, { useEffect, useState, Suspense, lazy } from "react";
import { Header } from "./components/Header";
import { NewsroomHome } from "./components/NewsroomHome";
import { Footer } from "./components/Footer";
import { all100Nutrients } from "./data/nutrientsAll";
import { allPosts, getPostBySlug, getPostsByCategory } from "./content/posts";
import { getPageBySlug } from "./content/pages";
import { useRoute, navigate, linkProps } from "./lib/router";
import { buildPostSeo, buildHealthListSeo, buildPageSeo, applySeoHead } from "./lib/seo";
import { NutrientItem } from "./types";
import { Search } from "lucide-react";

// Code splitting with React.lazy to reduce initial JS payload for 100/100 PageSpeed
const NutrientCatalog = lazy(() =>
  import("./components/NutrientCatalog").then((m) => ({ default: m.NutrientCatalog }))
);
const OrganHealthGuide = lazy(() =>
  import("./components/OrganHealthGuide").then((m) => ({ default: m.OrganHealthGuide }))
);
const DemographicSpecialGuide = lazy(() =>
  import("./components/DemographicSpecialGuide").then((m) => ({ default: m.DemographicSpecialGuide }))
);
const DiscountDealSection = lazy(() =>
  import("./components/DiscountDealSection").then((m) => ({ default: m.DiscountDealSection }))
);
const SupplementScheduleSection = lazy(() =>
  import("./components/SupplementScheduleSection").then((m) => ({ default: m.SupplementScheduleSection }))
);
const NutritionVisualizerSection = lazy(() =>
  import("./components/NutritionVisualizerSection").then((m) => ({ default: m.NutritionVisualizerSection }))
);
const SupplementSubscriptionSection = lazy(() =>
  import("./components/SupplementSubscriptionSection").then((m) => ({ default: m.SupplementSubscriptionSection }))
);
const DietMatchingSection = lazy(() =>
  import("./components/DietMatchingSection").then((m) => ({ default: m.DietMatchingSection }))
);
const NutrientDetailModal = lazy(() =>
  import("./components/NutrientDetailModal").then((m) => ({ default: m.NutrientDetailModal }))
);
const PersonalizedAnalyzerModal = lazy(() =>
  import("./components/PersonalizedAnalyzerModal").then((m) => ({ default: m.PersonalizedAnalyzerModal }))
);
const HealthPostList = lazy(() =>
  import("./components/health/HealthPostList").then((m) => ({ default: m.HealthPostList }))
);
const HealthPostArticle = lazy(() =>
  import("./components/health/HealthPostArticle").then((m) => ({ default: m.HealthPostArticle }))
);
const SitePageView = lazy(() =>
  import("./components/SitePageView").then((m) => ({ default: m.SitePageView }))
);

const HIDDEN_TABS = new Set(["columns"]);

const SuspenseFallback = () => (
  <div className="py-24 flex flex-col items-center justify-center min-h-[360px]" aria-busy="true">
    <div className="w-8 h-8 border-3 border-[#2e6573] border-t-transparent rounded-full animate-spin" />
    <span className="mt-3 text-xs text-[#71858c] font-medium">영양 정보를 불러오는 중입니다...</span>
  </div>
);

export default function App() {
  const route = useRoute();
  const [activeTab, setActiveTabState] = useState<string>(() => {
    if (route.name === "home") {
      return route.tab && !HIDDEN_TABS.has(route.tab) ? route.tab : "home";
    }
    return "home";
  });
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedNutrient, setSelectedNutrient] = useState<NutrientItem | null>(null);
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (route.name === "home") {
      setActiveTabState(route.tab && !HIDDEN_TABS.has(route.tab) ? route.tab : "home");
    }
  }, [route.name, route.name === "home" ? route.tab : null]);

  const setActiveTab = (tab: string) => {
    setActiveTabState(tab);
    navigate(tab === "home" ? "/" : `/?tab=${tab}`);
  };

  const post = route.name === "post" ? getPostBySlug(route.slug) : undefined;
  const sitePage = route.name === "page" ? getPageBySlug(route.slug) : undefined;

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
    <div className="min-h-screen bg-[#fcfdfc] flex flex-col font-sans text-[#18313c] antialiased">
      {/* Global Navigation Header (adbles.com style) */}
      <Header
        activeTab={isHealthRoute ? "health" : activeTab}
        setActiveTab={setActiveTab}
        onOpenAiDiagnostic={() => setIsAiModalOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full mx-auto">
        {/* 모바일 검색 */}
        <div className="md:hidden max-w-[1240px] px-4 pt-3 pb-1">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              inputMode="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="영양소·증상·음식 검색"
              aria-label="영양소, 증상, 음식 검색"
              className="w-full pl-9 pr-3 py-2 bg-[#f6f9f7] text-sm text-[#18313c] placeholder-slate-400 rounded-md border border-[#cddbd6] focus:outline-none focus:border-[#2e6573]"
            />
          </div>
        </div>

        {/* 건강블로그 상세 */}
        {route.name === "post" && post && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Suspense fallback={<SuspenseFallback />}>
              <HealthPostArticle
                post={post}
                allNutrients={all100Nutrients}
                onSelectNutrient={(item) => setSelectedNutrient(item)}
              />
            </Suspense>
          </div>
        )}

        {/* 없는 슬러그 */}
        {route.name === "post" && !post && (
          <div className="max-w-xl mx-auto text-center py-20 px-4">
            <p className="text-5xl mb-4">🔍</p>
            <h1 className="text-xl font-bold font-serif text-[#102d3c] mb-2">
              찾는 글이 없습니다
            </h1>
            <p className="text-sm text-[#61777f] mb-6">
              주소가 바뀌었거나 삭제된 글일 수 있습니다.
            </p>
            <a
              {...linkProps("/health")}
              className="inline-flex items-center gap-1.5 bg-[#102d3c] hover:bg-[#2e6573] text-white text-xs font-bold px-4 py-2.5 rounded-md transition-colors"
            >
              건강정보 전체 목록 보기
            </a>
          </div>
        )}

        {/* 정책·안내 페이지 */}
        {route.name === "page" && sitePage && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Suspense fallback={<SuspenseFallback />}>
              <SitePageView page={sitePage} />
            </Suspense>
          </div>
        )}

        {/* 건강블로그 목록 */}
        {route.name === "health" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Suspense fallback={<SuspenseFallback />}>
              <HealthPostList
                category={route.category}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </Suspense>
          </div>
        )}

        {/* 홈 및 탭 화면 */}
        {route.name === "home" && (
          <>
            {activeTab === "home" && (
              <NewsroomHome
                posts={allPosts}
                allNutrients={all100Nutrients}
                onSelectTab={setActiveTab}
                onSelectNutrient={(item) => setSelectedNutrient(item)}
                onOpenAiDiagnostic={() => setIsAiModalOpen(true)}
              />
            )}

            {activeTab !== "home" && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <Suspense fallback={<SuspenseFallback />}>
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

                  {activeTab === "deals" && (
                    <DiscountDealSection
                      allNutrients={all100Nutrients}
                      onSelectNutrient={(item) => setSelectedNutrient(item)}
                    />
                  )}
                </Suspense>
              </div>
            )}
          </>
        )}
      </main>

      {/* Nutrient Detail & Purchase Modal (Lazy Loaded) */}
      {selectedNutrient && (
        <Suspense fallback={null}>
          <NutrientDetailModal
            nutrient={selectedNutrient}
            onClose={() => setSelectedNutrient(null)}
          />
        </Suspense>
      )}

      {/* AI Nutrition Diagnostic Wizard Modal (Lazy Loaded) */}
      {isAiModalOpen && (
        <Suspense fallback={null}>
          <PersonalizedAnalyzerModal
            isOpen={isAiModalOpen}
            onClose={() => setIsAiModalOpen(false)}
            allNutrients={all100Nutrients}
            onSelectNutrient={(item) => setSelectedNutrient(item)}
          />
        </Suspense>
      )}

      {/* Editorial Footer (adbles.com style) */}
      <Footer
        setActiveTab={setActiveTab}
        onOpenAiDiagnostic={() => setIsAiModalOpen(true)}
      />
    </div>
  );
}
