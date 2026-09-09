import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Health Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // API: AI 맞춤 영양 분석 & 처방전 (Nutri-Prescription)
  app.post("/api/analyze-nutrition", async (req, res) => {
    try {
      const {
        ageGroup,
        gender,
        occupation,
        season,
        targetAreas = [],
        dietaryHabits = "",
        currentSupplements = "",
      } = req.body;

      const ai = getGeminiClient();
      if (!ai) {
        return res.status(503).json({
          error: "GEMINI_API_KEY가 설정되지 않았습니다. 기본 추천 엔진으로 대체됩니다.",
        });
      }

      const prompt = `당신은 대한민국 최고 수준의 기능의학(Functional Medicine) 및 임상영양학 전문의이자 영양제 배합 전문가입니다.
다음 사용자 프로필을 바탕으로 과학적 근거에 기반한 '개인 맞춤형 100대 영양소 분석 및 식단·영양제 처방전'을 작성해주세요.

[사용자 프로필]
- 연령대: ${ageGroup || "미지정"} (노년기일 경우 소화흡수율 저하, 근감소증, 뇌인지기능, 혈관석회화 방지 특화)
- 성별: ${gender || "무관"}
- 직업/생활패턴: ${occupation || "일반"}
- 계절: ${season || "현재 계절"}
- 중점 건강 고민 부위: ${Array.isArray(targetAreas) ? targetAreas.join(", ") : targetAreas || "전반적인 활력"}
- 현재 식습관: ${dietaryHabits || "보통의 한국인 식단"}
- 현재 복용 중인 약/영양제: ${currentSupplements || "없음"}

다음 JSON 형식으로만 엄격하게 응답해주세요(마크다운 코드블록 없이 순수 JSON만 반환):
{
  "clinicalHeadline": "이 사용자에게 가장 시급한 1줄 임상 진단 소견",
  "deficiencyRiskNutrients": [
    {
      "name": "영양소명 (예: 비타민 D3 + K2-MK7)",
      "category": "비타민/미네랄/지방산 등",
      "whyAtRisk": "현재 프로필(직업, 연령, 계절)에서 왜 이 영양소가 결핍되기 쉬운지 상세 설명",
      "rdaVsOptimal": "권장량 vs 기능의학적 최적섭취량 (예: 권장 400IU vs 최적 4,000~5,000IU)"
    }
  ],
  "recommendedFoods": [
    {
      "foodName": "식품명 (예: 들기름에 구운 고등어, 브로콜리 새싹)",
      "keyNutrients": "함유된 핵심 영양성분",
      "practicalTip": "식품 조리법 및 흡수율 높이는 팁"
    }
  ],
  "supplementPrescription": [
    {
      "supplementName": "추천 영양제 성분명 (예: 마그네슘 비스글리시네이트 킬레이트)",
      "reason": "산화마그네슘 대비 설사 부작용이 없고 생체이용률이 높은 이유 및 필요성",
      "dosage": "1일 권장 복용량",
      "timing": "아침 식후 / 저녁 식후 / 취침 30분 전 등",
      "qualityStandard": "선택 시 확인해야 할 품질 인증 (예: TRAACS 특허 킬레이트, USP 인증 등)"
    }
  ],
  "synergyAndInteractions": [
    "함께 먹으면 흡수율이 극대화되는 시너지 조합 (예: 비타민C + 철분)",
    "주의해야 할 배합 금기 또는 시간차 복용 규칙 (예: 칼슘과 철분은 2시간 이상 간격 유지)"
  ],
  "lifestyleRx": "직업적 특성 및 계절에 맞춘 생활 습관 및 수분/수면 팁 2~3줄"
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.3,
        },
      });

      const text = response.text || "{}";
      const result = JSON.parse(text);
      return res.json({ success: true, data: result });
    } catch (err: any) {
      console.error("Gemini nutrition analysis error:", err);
      return res.status(500).json({
        error: "영양 분석 처리 중 오류가 발생했습니다.",
        details: err?.message || String(err),
      });
    }
  });

  // API: 글로벌 건강 칼럼 AI 요약/심층 분석 (Harvard Health / iHerb Wellness 스타일)
  app.post("/api/column-ai-digest", async (req, res) => {
    try {
      const { topic, source = "Harvard Health & iHerb Wellness" } = req.body;
      const ai = getGeminiClient();
      if (!ai) {
        return res.status(503).json({
          error: "Gemini API 키가 필요합니다.",
        });
      }

      const prompt = `당신은 세계 유수의 의학 저널(하버드 헬스 퍼블리싱, 메이요 클리닉, iHerb Research)의 최신 임상 건강 칼럼을 분석하는 의학 전문 에디터입니다.
주제: "${topic || "노년기 근감소증과 장-뇌 축(Gut-Brain Axis) 영양 관리"}"

다음 형식의 JSON으로 심층 의학 칼럼 요약본을 작성해주세요:
{
  "title": "국내 독자가 이해하기 쉬운 명확하고 매력적인 칼럼 제목",
  "source": "${source}",
  "readTime": "3분 읽기",
  "abstract": "칼럼의 핵심 연구 결론 2줄 요약",
  "keyTakeaways": [
    "핵심 논점 1 (최신 임상 데이터 인용)",
    "핵심 논점 2 (실제 영양 섭취 가이드)",
    "핵심 논점 3 (부작용 및 권장 제형)"
  ],
  "nutrientsCovered": ["언급된 주요 영양소 리스트 2~4개"],
  "clinicalAdvice": "일상에서 바로 실천할 수 있는 영양학적 실천 가이드"
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.4,
        },
      });

      const text = response.text || "{}";
      const result = JSON.parse(text);
      return res.json({ success: true, data: result });
    } catch (err: any) {
      console.error("Column AI digest error:", err);
      return res.status(500).json({
        error: "칼럼 분석 중 오류 발생",
        details: err?.message,
      });
    }
  });

  // Vite middleware in dev, Static in prod
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`NutriScience server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
