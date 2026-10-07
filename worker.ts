import {
  renderPostDocument,
  renderListDocument,
  renderPageDocument,
  renderHomeDocument,
  buildSitemap,
  buildRss,
} from "./src/lib/prerender";
import { getPostBySlug, getPostsByCategory } from "./src/content/posts";
import { getPageBySlug } from "./src/content/pages";
import { PostCategorySlug } from "./src/types";
import { postCategories } from "./src/content/postCategories";

interface Fetcher {
  fetch(input: Request | string, init?: RequestInit): Promise<Response>;
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

export interface Env {
  ASSETS: Fetcher;
  GEMINI_API_KEY?: string;
  /** 쿠팡 파트너스 API. HMAC 서명은 서버에서만 만든다 — 브라우저로 넘기지 않는다. */
  COUPANG_ACCESS_KEY?: string;
  COUPANG_SECRET_KEY?: string;
}

/** 쿠팡 파트너스 CEA 서명. signed-date는 yyMMddTHHmmssZ 형식이다. */
async function coupangAuthorization(
  method: string,
  path: string,
  query: string,
  accessKey: string,
  secretKey: string,
): Promise<string> {
  const datetime = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '').slice(2);
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secretKey),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(datetime + method + path + query));
  const hex = [...new Uint8Array(signature)].map((b) => b.toString(16).padStart(2, '0')).join('');
  return `CEA algorithm=HmacSHA256, access-key=${accessKey}, signed-date=${datetime}, signature=${hex}`;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // Standard CORS headers
    const corsHeaders: Record<string, string> = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // 1. Health check API
    if (url.pathname === '/api/health') {
      const hasGeminiKey = Boolean(env.GEMINI_API_KEY && env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY');
      return new Response(
        JSON.stringify({
          status: 'ok',
          service: 'NutriFit 100 Clinical Engine',
          hasGeminiKey,
          timestamp: new Date().toISOString(),
        }),
        {
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            ...corsHeaders,
          },
        }
      );
    }

    // 2. Nutrition Analysis API
    if (url.pathname === '/api/analyze-nutrition' && request.method === 'POST') {
      try {
        const body = (await request.json().catch(() => ({}))) as Record<string, any>;
        const {
          ageGroup = '60대 이상 (노년기)',
          gender = '여성',
          occupation = '퇴직/주부/정적인 일상',
          season = '환절기',
          weakOrgans = ['눈', '장', '관절/뼈'],
          dietHabits = '',
          symptoms = '',
        } = body;

        const apiKey = env.GEMINI_API_KEY;
        const hasValidKey = Boolean(apiKey && apiKey !== 'MY_GEMINI_API_KEY');

        if (hasValidKey) {
          const prompt = `당신은 공공 영양기준과 식약처 건강기능식품 기능성 고시를 근거로 영양 정보를 정리하는 에디터입니다. 의사가 아니며 진단·처방을 하지 않습니다.
다음 사용자 프로필에 맞춰 참고용 영양 정보 리포트를 JSON으로 작성해주세요.
[반드시 지킬 것] 질병의 진단·치료·예방·완치를 단정하지 말고 '알려져 있다/연구된다'로 표현한다. 권장 용량은 한국인 영양소 섭취기준의 상한섭취량을 넘기지 않는다. 특정 효과를 보장하지 않는다. cautionNotes 에는 '복용 전 의사·약사와 상담하세요'를 포함한다.

[사용자 프로필]
- 연령대: ${ageGroup}
- 성별: ${gender}
- 생활 패턴/직업: ${occupation}
- 계절: ${season}
- 취약/관심 장기 부위: ${Array.isArray(weakOrgans) ? weakOrgans.join(', ') : weakOrgans}
- 식습관 특이사항: ${dietHabits || '일반적인 한식 위주'}
- 주요 불편 증상: ${symptoms || '피로 및 관절/눈 피로'}

반드시 아래 JSON 구조로만 마크다운 코드블록 없이 순수 JSON만 반환하세요:
{
  "summary": "1줄 참고 요약 (진단 표현 금지. 예: 60대 여성에게 부족하기 쉬운 영양소와 식사 점검 포인트)",
  "demographicInsights": "생애주기/직업 특성에 따른 영양소 흡수 기전 및 생체이용률 관점의 상세 해설 2~3줄",
  "recommendedFoods": [
    { "food": "식품명 1", "reason": "이 식품이 추천되는 핵심 영양성분과 기전" },
    { "food": "식품명 2", "reason": "이 식품이 추천되는 핵심 영양성분과 기전" },
    { "food": "식품명 3", "reason": "이 식품이 추천되는 핵심 영양성분과 기전" }
  ],
  "foodLimitations": "자연 식품만으로는 충족하기 어려운 이유(소화효소 감소, 유효성분 함량 한계) 설명 2줄",
  "prescribedSupplements": [
    {
      "nutrientName": "영양소 및 최적 제형명 1",
      "recommendedForm": "특허 원료 또는 고흡수율 제형 (예: 비스글리시네이트, TRAACS, rTG 등)",
      "dosageTiming": "최적 섭취 타이밍 (예: 아침 식후, 취침 30분 전)",
      "whyNeeded": "이 영양소가 검토 대상인 이유 (식약처 기능성 문구 수준, 효과 단정 금지)"
    },
    {
      "nutrientName": "영양소 및 최적 제형명 2",
      "recommendedForm": "특허 원료 또는 고흡수율 제형",
      "dosageTiming": "최적 섭취 타이밍",
      "whyNeeded": "이 영양소가 필요한 임상적 근거 및 효과"
    },
    {
      "nutrientName": "영양소 및 최적 제형명 3",
      "recommendedForm": "특허 원료 또는 고흡수율 제형",
      "dosageTiming": "최적 섭취 타이밍",
      "whyNeeded": "이 영양소가 필요한 임상적 근거 및 효과"
    }
  ],
  "cautionNotes": "약물 상호작용 및 과다복용 주의사항 (예: 와파린 복용 시 비타민K 주의 등)",
  "recommendedNutrientIds": ["vit-d3", "vit-k2-mk7", "min-magnesium-glycinate"]
}`;

          const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
          const geminiRes = await fetch(geminiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: {
                responseMimeType: 'application/json',
                temperature: 0.3,
              },
            }),
          });

          if (geminiRes.ok) {
            const geminiData = (await geminiRes.json()) as any;
            const rawText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || '';
            const cleanJson = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
            const parsed = JSON.parse(cleanJson);

            return new Response(JSON.stringify(parsed), {
              headers: {
                'Content-Type': 'application/json; charset=utf-8',
                ...corsHeaders,
              },
            });
          }
        }

        // High-fidelity fallback tailored to the user profile
        const targetList = Array.isArray(weakOrgans) ? weakOrgans : ['눈', '장', '관절/뼈'];
        const isSenior = String(ageGroup).includes('60') || String(ageGroup).includes('70') || String(ageGroup).includes('노년');
        
        const dynamicResult = {
          summary: `${ageGroup} ${gender} (${targetList.join(', ')} 관심) 참고용 영양 정보입니다. 진단이 아니며, 복용 전 의사·약사와 상담하세요.`,
          demographicInsights: isSenior
            ? `노년기에는 위산 분비가 줄어 비타민 B12 등 일부 영양소의 흡수가 떨어질 수 있는 것으로 알려져 있습니다. 단백질·칼슘·비타민 D 섭취가 부족하지 않은지 식사부터 점검하고, 보충이 필요한지는 의사·약사와 상담해 정하세요.`
            : `${ageGroup}의 생활 패턴과 ${season} 계절을 고려해 식사로 먼저 챙길 영양소를 정리한 참고 정보입니다. ${targetList[0] || '관심 부위'} 관련 증상이 계속되면 진료를 먼저 받으세요.`,
          recommendedFoods: [
            { food: '자연산 연어 & 등푸른 생선', reason: 'EPA·DHA 오메가-3 지방산의 대표 급원' },
            { food: '데친 브로콜리 새싹 & 케일', reason: '루테인·지아잔틴 등 카로티노이드 급원' },
            { food: '전통 발효 된장국 & 멸치', reason: '발효식품과 칼슘 급원 (된장국은 나트륨 섭취에 유의)' },
          ],
          foodLimitations: '비타민 D처럼 식사만으로 채우기 어려운 영양소가 있습니다. 보충 여부와 용량은 한국인 영양소 섭취기준의 상한섭취량을 넘지 않도록 전문가와 상담해 정하세요.',
          prescribedSupplements: [
            {
              nutrientName: '비타민 D3 + K2 (MK-7)',
              recommendedForm: 'MCT 오일 베이스 연질캡슐 (천연 낫토 유래 MenaQ7®)',
              dosageTiming: '기름진 아침 또는 점심 식후',
              whyNeeded: '비타민 D는 칼슘과 인의 흡수·이용, 뼈의 형성과 유지에 필요합니다(식약처 기능성). 용량은 상한섭취량(성인 100μg=4,000IU) 이내로 전문가와 상의하세요.',
            },
            {
              nutrientName: '마그네슘 비스글리시네이트 킬레이트',
              recommendedForm: '킬레이트 형태 (산화마그네슘보다 위장 부담이 적은 편으로 알려짐)',
              dosageTiming: '취침 30분~1시간 전 또는 저녁 식후',
              whyNeeded: '에너지 이용과 신경·근육 기능 유지에 필요합니다(식약처 기능성). 신장 질환이 있으면 복용 전 상담이 필요합니다.',
            },
            {
              nutrientName: '루테인·지아잔틴 (5:1) + 아스타잔틴 (6mg)',
              recommendedForm: 'Lutemax 2020® + 천연 헤마토코쿠스 추출 AstaReal®',
              dosageTiming: '점심 식사 직후',
              whyNeeded: '루테인은 노화로 감소될 수 있는 황반색소밀도를 유지해 눈 건강에 도움을 줄 수 있습니다(식약처 기능성).',
            },
          ],
          cautionNotes: '본 결과는 정보 제공 목적이며 의학적 진단·치료를 대체하지 않습니다. 복용 전 전문가와 상담하세요. 항응고제(와파린 등)를 복용 중이라면 비타민 K 제품은 반드시 의사와 상의하십시오.',
          recommendedNutrientIds: ['vit-d3', 'vit-k2-mk7', 'min-magnesium-glycinate', 'phyto-lutein-zeaxanthin', 'phyto-astaxanthin'],
        };

        return new Response(JSON.stringify(dynamicResult), {
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            ...corsHeaders,
          },
        });
      } catch (err: any) {
        return new Response(
          JSON.stringify({ error: '영양 분석 실패', details: err?.message }),
          {
            status: 500,
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
              ...corsHeaders,
            },
          }
        );
      }
    }

    // 3. Column AI Digest API
    if (url.pathname === '/api/column-ai-digest' && request.method === 'POST') {
      try {
        const body = (await request.json().catch(() => ({}))) as Record<string, any>;
        const { title = '글로벌 의학 칼럼', source = 'Harvard Health', content = '' } = body;

        const apiKey = env.GEMINI_API_KEY;
        const hasValidKey = Boolean(apiKey && apiKey !== 'MY_GEMINI_API_KEY');

        if (hasValidKey) {
          const prompt = `당신은 세계적 의학 학술지 및 웰니스 리서치를 분석하는 전문 의학 에디터입니다.
다음 칼럼 내용을 바탕으로 국내 독자가 이해하기 쉬운 3줄 핵심 요약 및 임상 실천 가이드를 마크다운으로 작성해주세요.

제목: ${title}
출처: ${source}
본문: ${content}

[출력 형식]
### AI 요약 (참고용)
1. **핵심 내용**: (원문 내용 요약. 질병 치료·예방 단정 금지)
2. **생체이용률 팁**: (어떤 제형을 어떻게 먹어야 흡수율이 극대화되는지)
3. **즉시 실천 가이드**: (일상에서 바로 적용할 수 있는 구체적 행동 지침)`;

          const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
          const geminiRes = await fetch(geminiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
            }),
          });

          if (geminiRes.ok) {
            const geminiData = (await geminiRes.json()) as any;
            const digest = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || '';
            return new Response(JSON.stringify({ digest }), {
              headers: {
                'Content-Type': 'application/json; charset=utf-8',
                ...corsHeaders,
              },
            });
          }
        }

        // Fallback digest
        const digest = `### AI 요약 (참고용)
지금은 AI 요약을 만들 수 없습니다. "${title}" 원문을 직접 확인해 주세요.
본 글은 정보 제공 목적이며 의학적 진단·치료를 대체하지 않습니다. 복용 전 전문가와 상담하세요.`;

        return new Response(JSON.stringify({ digest }), {
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            ...corsHeaders,
          },
        });
      } catch (err: any) {
        return new Response(
          JSON.stringify({ error: '칼럼 분석 실패', details: err?.message }),
          {
            status: 500,
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
              ...corsHeaders,
            },
          }
        );
      }
    }

    // 4. 건강정보 사이트맵 (정적 파일 대신 글 목록에서 매번 생성)
    if (url.pathname === '/sitemap.xml') {
      return new Response(buildSitemap(), {
        headers: {
          'Content-Type': 'application/xml; charset=utf-8',
          'Cache-Control': 'public, max-age=3600',
        },
      });
    }

    // 5. RSS
    if (url.pathname === '/rss.xml' || url.pathname === '/feed.xml') {
      return new Response(buildRss(), {
        headers: {
          'Content-Type': 'application/rss+xml; charset=utf-8',
          'Cache-Control': 'public, max-age=3600',
        },
      });
    }

    // 6. 제품 대표 이미지(og:image) 수집
    //    데이터에 imageUrl이 비어 있을 때만 호출된다. 판매처가 막으면 조용히 실패하고
    //    화면은 디자인 대체 카드로 떨어진다.
    //    ※ 제휴사 이미지 사용은 각 파트너 프로그램 약관을 따른다. 공식 API/피드로
    //      받은 이미지가 있으면 그 주소를 imageUrl에 직접 넣는 편이 안전하다.
    if (url.pathname === '/api/product-og') {
      const target = url.searchParams.get('url') || '';
      const jsonHeaders = {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=86400',
        ...corsHeaders,
      };

      const ALLOWED_HOSTS = [
        'iherb.com',
        'naver.com',
        'naver.me',
        'coupang.com',
        'coupa.ng',
      ];

      let targetUrl: URL;
      try {
        targetUrl = new URL(target);
      } catch {
        return new Response(JSON.stringify({ image: null, reason: 'invalid-url' }), {
          status: 400,
          headers: jsonHeaders,
        });
      }

      const allowed =
        targetUrl.protocol === 'https:' &&
        ALLOWED_HOSTS.some(
          (host) => targetUrl.hostname === host || targetUrl.hostname.endsWith(`.${host}`)
        );

      if (!allowed) {
        return new Response(JSON.stringify({ image: null, reason: 'host-not-allowed' }), {
          status: 403,
          headers: jsonHeaders,
        });
      }

      const cache = (caches as unknown as { default: Cache }).default;
      const cacheKey = new Request(`https://og.nutrifit.kr/${encodeURIComponent(targetUrl.toString())}`);
      const cached = await cache.match(cacheKey);
      if (cached) return cached;

      let image: string | null = null;
      try {
        const page = await fetch(targetUrl.toString(), {
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; NutriFitBot/1.0; +https://nutrifit.kr)',
            Accept: 'text/html,application/xhtml+xml',
            'Accept-Language': 'ko-KR,ko;q=0.9',
          },
          signal: AbortSignal.timeout(6000),
        });

        if (page.ok) {
          const html = (await page.text()).slice(0, 200_000);
          const match =
            /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i.exec(html) ||
            /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i.exec(html) ||
            /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i.exec(html);

          if (match?.[1]) {
            const resolved = new URL(match[1], targetUrl).toString();
            if (resolved.startsWith('https://')) image = resolved;
          }
        }
      } catch {
        // 타임아웃·차단·차단페이지 모두 여기로 온다. 이미지 없이 응답한다.
      }

      const response = new Response(JSON.stringify({ image }), { headers: jsonHeaders });
      ctx.waitUntil(cache.put(cacheKey, response.clone()));
      return response;
    }

    // 7. 건강정보 페이지 — 크롤러가 JS 없이도 읽도록 index.html을 가공해 내려준다
    if (url.pathname === '/health' || url.pathname.startsWith('/health/')) {
      const shellRequest = new Request(new URL('/index.html', request.url), { method: 'GET' });
      const shell = await env.ASSETS.fetch(shellRequest);

      if (shell.ok) {
        const baseHtml = await shell.text();
        const segments = url.pathname.split('/').filter(Boolean);

        let document: string | null = null;
        let status = 200;

        if (segments.length === 1) {
          document = renderListDocument(baseHtml, 'all', getPostsByCategory('all'));
        } else if (segments[1] === 'c') {
          const category = (segments[2] ?? 'all') as PostCategorySlug;
          if (segments.length === 3 && postCategories.some((item) => item.slug === category)) {
            document = renderListDocument(baseHtml, category, getPostsByCategory(category));
          } else {
            // 없는 카테고리(/health/c/foo)가 200 빈 목록으로 나가면 소프트 404 로 잡힌다
            document = baseHtml;
            status = 404;
          }
        } else {
          const post = segments.length === 2 ? getPostBySlug(segments[1]) : undefined;
          if (post) {
            document = renderPostDocument(baseHtml, post);
          } else {
            // 없는 글은 앱 셸만 내려주고 404로 표시한다 (색인 오염 방지)
            document = baseHtml;
            status = 404;
          }
        }

        return new Response(document, {
          status,
          headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': status === 200 ? 'public, max-age=300' : 'no-store',
          },
        });
      }
    }

    // 8. 쿠팡 골드박스(오늘의 특가). 매일 바뀌므로 빌드에 굽지 않고 여기서 받아온다.
    //    할인율은 쿠팡 API가 주지 않으므로 만들어내지 않는다 — 특가 "지정 여부"만 전달한다.
    if (url.pathname === '/api/deals') {
      const accessKey = env.COUPANG_ACCESS_KEY;
      const secretKey = env.COUPANG_SECRET_KEY;
      const json = (body: unknown, status = 200) =>
        new Response(JSON.stringify(body), {
          status,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            // 특가는 하루 단위로 바뀐다. 엣지에서 30분 캐시해 API 호출 한도를 아낀다.
            'Cache-Control': 'public, max-age=600, s-maxage=1800',
            ...corsHeaders,
          },
        });

      if (!accessKey || !secretKey) {
        // 키가 없으면 화면은 특가 영역만 접고 나머지는 그대로 보여준다.
        return json({ items: [], reason: 'not-configured' });
      }

      const path = '/v2/providers/affiliate_open_api/apis/openapi/v1/products/goldbox';
      try {
        const authorization = await coupangAuthorization('GET', path, '', accessKey, secretKey);
        const res = await fetch(`https://api-gateway.coupang.com${path}`, {
          headers: { Authorization: authorization, 'Content-Type': 'application/json;charset=UTF-8' },
        });
        if (!res.ok) {
          // 401/403은 키 문제, 429는 호출 한도. 어느 쪽이든 재시도하지 않는다.
          return json({ items: [], reason: `upstream-${res.status}` });
        }
        const payload = (await res.json()) as { rCode?: string; data?: unknown[] };
        if (payload.rCode !== '0' || !Array.isArray(payload.data)) {
          return json({ items: [], reason: 'upstream-payload' });
        }
        return json({ items: payload.data, collectedAt: new Date().toISOString() });
      } catch {
        return json({ items: [], reason: 'fetch-failed' });
      }
    }

    // 9. 홈과 정책·안내 페이지 사전렌더
    //    홈이 앱 셸로만 나가면 크롤러가 보는 사이트 전체가 빈 문서가 된다.
    //    탭 화면은 별도 주소가 아니므로 홈 한 장에 요약을 실어 내려보낸다.
    if (url.pathname === '/' || url.pathname === '/index.html') {
      const shell = await env.ASSETS.fetch(new Request(new URL('/index.html', request.url), { method: 'GET' }));
      if (shell.ok) {
        return new Response(renderHomeDocument(await shell.text()), {
          headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'public, max-age=300',
          },
        });
      }
    }

    {
      const slug = url.pathname.slice(1);
      const page = slug && !slug.includes('/') ? getPageBySlug(slug) : undefined;
      if (page) {
        const shell = await env.ASSETS.fetch(new Request(new URL('/index.html', request.url), { method: 'GET' }));
        if (shell.ok) {
          return new Response(renderPageDocument(await shell.text(), page), {
            headers: {
              'Content-Type': 'text/html; charset=utf-8',
              'Cache-Control': 'public, max-age=3600',
              ...(page.noindex ? { 'X-Robots-Tag': 'noindex' } : {}),
            },
          });
        }
      }
    }

    // 10. Static assets. 여기까지 온 주소는 앱에 없는 경로다.
    //     예전에는 index.html 로 떨어뜨렸는데(→ 307 로 홈 이동) 구글이 소프트 404 로 본다.
    //     앱 셸은 그대로 주되 상태 코드를 404 로, 색인 제외로 내려보낸다.
    let response = await env.ASSETS.fetch(request);
    if (response.status === 404 && request.method === 'GET' && !url.pathname.startsWith('/api/')) {
      const shell = await env.ASSETS.fetch(new Request(new URL('/index.html', request.url), { method: 'GET' }));
      if (shell.ok) {
        return new Response(await shell.text(), {
          status: 404,
          headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'no-store',
            'X-Robots-Tag': 'noindex',
          },
        });
      }
    }

    return response;
  },
};
