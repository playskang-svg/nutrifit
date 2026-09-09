# 건강정보 포스팅 가이드 (/health)

글 1편 = `src/content/posts/` 파일 1개. 이 문서는 글을 늘리는 사람이 볼 문서다.
사이트 전체 규칙은 `~/dev/CLAUDE.md`를 따른다.

## 1. 글 하나 추가하기

```bash
npm run post:new -- vitamin-b12-deficiency "비타민B12 부족, 위산이 줄면 흡수도 줄어든다" nutrient
```

- 파일 생성(`src/content/posts/<slug>.ts`)과 등록(`src/content/posts/index.ts`)이 함께 처리된다
- 템플릿은 `draft: true` 상태로 나온다. 목록·사이트맵·RSS에서 빠진 채로 마음껏 다듬고,
  발행할 때 그 줄을 지운다
- 카테고리: `symptom` `nutrient` `choose` `food` `lifestage` `research`
  (정의는 `src/content/postCategories.ts`)

## 2. 주소 규칙

| 경로 | 내용 |
|---|---|
| `/health` | 전체 목록 |
| `/health/c/<category>` | 카테고리 목록 |
| `/health/<slug>` | 글 |
| `/sitemap.xml` | 글 목록에서 매번 생성 |
| `/rss.xml` | 글 목록에서 매번 생성 |

`slug`는 발행 후 바꾸지 않는다. 바꾸면 색인된 주소가 죽는다.
꼭 바꿔야 하면 워커에 301 리다이렉트를 먼저 넣는다.

## 3. 본문 문법

`body`는 마크다운 서브셋이다(`src/lib/markdown.ts`). 템플릿 리터럴 안이라
**백틱(`)과 `${` 는 쓸 수 없다.**

```
## 소제목          → 목차에 자동 등록
### 작은 제목
- 목록  /  1. 번호 목록
> 인용
| 표 | 머리 |
|---|---|
**굵게**  *기울임*  ==형광==  [링크](https://...)
---                 구분선

::: tip 제목        콜아웃. tip(초록) warn(주황) check(파랑) note(회색)
내용
:::
```

## 4. 채워야 할 필드

| 필드 | 기준 |
|---|---|
| `seoTitle` | 앞 25자 안에 타깃 키워드. 비우면 `title` 사용 |
| `description` | 80~160자. 검색결과에 그대로 나온다 |
| `keywords` | 검색용. 화면에 노출되지 않는다 |
| `keyPoints` | 3~5줄. 글 맨 위 '3분 요약' 박스 |
| `faq` | 그대로 FAQPage 구조화 데이터가 된다. 실제로 검색되는 질문을 쓴다 |
| `sources` | **최소 1건.** 공공기관·학회·해외 보건기관 우선 |
| `relatedNutrientIds` | 100대 영양소 id. 틀린 id는 조용히 무시된다 |
| `productPicks` | 제품 카드 (아래) |

건강 주제는 YMYL이라 근거 없는 단정이 가장 위험하다.
효능 단정 대신 "알려져 있다 / 보고된다"로 쓰고, 감별이 필요한 증상은 진료를 먼저 안내한다.
의학적 고지는 모든 글에 자동으로 붙는다.

## 5. 제품 연결

```ts
productPicks: [
  // 100대 영양소에 있는 제품 — 가격·쿠폰·인증·평점을 데이터에서 자동으로 가져온다
  { nutrientId: "mineral-mg", reason: "이 글 기준에 맞는 이유 한 줄", badge: "에디터 선택" },

  // 외부 제품 (네이버·쿠팡·기타) — 직접 적는다
  {
    title: "제품명", brand: "브랜드",
    url: "https://smartstore.naver.com/...",
    imageUrl: "https://...jpg",   // 공식 API/피드에서 받은 이미지 주소
    reason: "왜 이 제품인지",
  },
]
```

**이미지는 3단으로 떨어진다.**
1. `imageUrl`이 있으면 그대로 쓴다 — 가장 확실하다
2. 없으면 `/api/product-og`가 판매처 페이지의 `og:image`를 끌어와 24시간 캐시한다
3. 그것도 실패하면 브랜드·이모지로 조립한 디자인 카드가 나온다 (깨진 이미지는 나오지 않는다)

2번은 **상품 상세 페이지 주소일 때만** 쓸모가 있다. 지금 100대 영양소 데이터의
`iherbUrl`은 대부분 검색 결과 주소라 대표 이미지가 없어 3번으로 떨어진다.
이미지를 제대로 붙이려면 상품 상세 주소를 쓰거나 `imageUrl`을 직접 채운다.

허용 도메인은 `worker.ts`의 `ALLOWED_HOSTS`에 있다 (iherb / naver / coupang).

### 지켜야 할 것

- **대가성 표시**는 제품 카드가 있으면 자동으로 붙는다. 지우지 않는다 (공정위 추천·보증 심사지침)
- 쿠팡 링크가 하나라도 있으면 쿠팡 파트너스 문구가 함께 붙는다
- 제휴사 **이미지 사용 규정은 프로그램마다 다르다.** 공식 API/피드로 받은 이미지를
  `imageUrl`에 넣는 방식이 가장 안전하다. og:image 수집은 보조 수단으로만 쓴다
- 링크에는 `rel="noopener nofollow sponsored"`가 자동으로 붙는다

## 6. 배포 전 확인

```bash
npm run lint
npm run build
```

배포는 `wrangler deploy`(= `npm run deploy`)로 나간다.
`public/sitemap.xml`은 **일부러 지웠다.** Cloudflare는 정적 애셋을 워커보다 먼저 응답하므로
그 파일이 있으면 워커가 만드는 사이트맵이 영영 가려진다. 다시 만들지 않는다.

배포 후 확인:

```bash
curl -s https://nutrifit.kr/sitemap.xml | grep -c "<url>"
curl -s https://nutrifit.kr/health/<slug> | grep -o "<title>.*</title>"
```

두 번째 명령의 결과에 글 제목이 나와야 한다. 사이트 기본 제목이 나오면
워커 사전렌더가 타지 않은 것이다.
