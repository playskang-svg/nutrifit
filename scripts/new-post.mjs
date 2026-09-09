#!/usr/bin/env node
/**
 * 건강정보 글 뼈대 생성기.
 *   npm run post:new -- <slug> "제목" [카테고리]
 * 파일 생성과 src/content/posts/index.ts 등록까지 함께 처리한다.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const postsDir = resolve(root, "src/content/posts");
const indexPath = resolve(postsDir, "index.ts");

const CATEGORIES = ["symptom", "nutrient", "choose", "food", "lifestage", "research"];

const [slug, title, category = "nutrient"] = process.argv.slice(2);

if (!slug || !title) {
  console.error(`사용법: npm run post:new -- <slug> "제목" [${CATEGORIES.join("|")}]`);
  process.exit(1);
}

if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
  console.error(`slug 형식 오류: 영문 소문자·숫자·하이픈만 사용하세요. 받은 값: ${slug}`);
  process.exit(1);
}

if (!CATEGORIES.includes(category)) {
  console.error(`카테고리 오류: ${CATEGORIES.join(" | ")} 중 하나여야 합니다.`);
  process.exit(1);
}

const filePath = resolve(postsDir, `${slug}.ts`);
if (existsSync(filePath)) {
  console.error(`이미 있는 글입니다: ${filePath}`);
  process.exit(1);
}

const today = new Date().toLocaleDateString("sv-SE", { timeZone: "Asia/Seoul" });
const varName = slug.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());

const template = `import { HealthPost } from "../../types";

export const post: HealthPost = {
  slug: "${slug}",
  title: "${title}",
  seoTitle: "", // 비우면 title 사용. 앞 25자 안에 타깃 키워드를 넣는다
  description: "", // 80~160자. 검색결과에 그대로 노출된다
  category: "${category}",
  tags: [],
  keywords: [],
  publishedAt: "${today}",
  author: {
    name: "NutriFit 영양정보팀",
    credential: "공공 영양기준·해외 보건기관 자료 기반 편집",
  },
  readingMinutes: 6,
  heroEmoji: "🧪",
  summary: "", // 도입 요약 2~3줄
  keyPoints: [
    "",
  ],
  body: \`
## 첫 소제목

본문. **굵게**, ==형광==, [링크](https://example.com) 를 쓸 수 있다.

::: tip 알아 두면 좋은 것
콜아웃 박스. tip / warn / check / note 네 가지.
:::

| 구분 | 값 |
|---|---|
| 예시 | 표도 된다 |

## 두 번째 소제목

- 목록
- 목록

::: note 이 글의 한계
일반적인 영양 정보이며 진단·처방을 대신하지 않습니다.
:::
\`,
  faq: [
    { question: "", answer: "" },
  ],
  sources: [
    { title: "", publisher: "", url: "" },
  ],
  relatedNutrientIds: [],
  productPicks: [
    // { nutrientId: "mineral-mg", reason: "이 글 기준에 맞는 이유 한 줄" },
    // { title: "제품명", brand: "브랜드", url: "https://...", imageUrl: "https://...", reason: "..." },
  ],
  draft: true, // 발행 준비가 끝나면 이 줄을 지운다
};
`;

writeFileSync(filePath, template, "utf8");

let index = readFileSync(indexPath, "utf8");
index = index.replace(
  /(const registry: HealthPost\[\] = \[)/,
  `import { post as ${varName} } from "./${slug}";\n\n$1`
);
index = index.replace(/(const registry: HealthPost\[\] = \[\n)/, `$1  ${varName},\n`);
writeFileSync(indexPath, index, "utf8");

console.log(`생성: src/content/posts/${slug}.ts`);
console.log(`등록: src/content/posts/index.ts`);
console.log(`주소: https://nutrifit.kr/health/${slug}  (draft: true 인 동안은 목록·사이트맵에서 빠짐)`);
