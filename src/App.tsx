import React, { useState } from "react";
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
import { Footer } from "./components/Footer";
import { all100Nutrients } from "./data/nutrientsAll";
import { healthColumnsData } from "./data/healthColumnsData";
import { NutrientItem } from "./types";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("catalog");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedNutrient, setSelectedNutrient] = useState<NutrientItem | null>(null);
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-slate-100/60 flex flex-col font-sans text-slate-900 antialiased selection:bg-emerald-200 selection:text-emerald-900">
      {/* Global Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAiDiagnostic={() => setIsAiModalOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
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

