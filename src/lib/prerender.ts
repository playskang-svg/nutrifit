import { HealthPost, SitePage } from "../types";
import {
  SeoHead,
  SITE,
  postUrl,
  pageUrl,
  escapeXml,
  buildPostSeo,
  buildHealthListSeo,
  buildPageSeo,
} from "./seo";
import { renderMarkdown, escapeHtml } from "./markdown";
import { getCategoryLabel, postCategories } from "../content/postCategories";
import { allPosts, formatPostDate } from "../content/posts";
import { allPages, indexablePages } from "../content/pages";
import { all100Nutrients } from "../data/nutrientsAll";

/**
 * 워커가 /health/* 요청에 대해 index.html 을 가공해 내려주기 위한 도구 모음.
 * 크롤러가 자바스크립트 실행 없이도 제목·본문·구조화 데이터를 보게 하는 것이 목적이다.
 * 사용자 브라우저에서는 React 가 마운트되면서 #prerender 가 제거된다.
 */

function renderHeadTags(head: SeoHead): string {
  const jsonLd = JSON.stringify(
    { "@context": "https://schema.org", "@graph": head.jsonLd },
    null,
    0
  ).replace(/</g, "\\u003c");

  return [
    `<meta property="og:site_name" content="${escapeHtml(SITE.name)}" />`,
    `<meta property="og:locale" content="${SITE.locale}" />`,
    head.publishedTime
      ? `<meta property="article:published_time" content="${head.publishedTime}" />`
      : "",
    head.modifiedTime
      ? `<meta property="article:modified_time" content="${head.modifiedTime}" />`
      : "",
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(head.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(head.description)}" />`,
    `<script type="application/ld+json">${jsonLd}</script>`,
  ]
    .filter(Boolean)
    .join("\n    ");
}

/** 크롤러가 읽을 본문. 화면 스타일은 React 쪽이 담당하므로 구조만 정직하게 낸다. */
export function renderPostShell(post: HealthPost): string {
  const keyPoints = post.keyPoints.length
    ? `<ul>${post.keyPoints.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ul>`
    : "";

  const faq = post.faq?.length
    ? `<section><h2>자주 묻는 질문</h2>${post.faq
        .map(
          (item) =>
            `<h3>${escapeHtml(item.question)}</h3><p>${escapeHtml(item.answer)}</p>`
        )
        .join("")}</section>`
    : "";

  const sources = post.sources?.length
    ? `<section><h2>참고 자료</h2><ol>${post.sources
        .map(
          (source) =>
            `<li><a href="${escapeHtml(source.url)}" rel="nofollow noopener">${escapeHtml(
              source.title
            )}</a> — ${escapeHtml(source.publisher)}</li>`
        )
        .join("")}</ol></section>`
    : "";

  return `<div id="prerender">
  <nav><a href="/">홈</a> › <a href="/health">건강블로그</a> › <a href="/health/c/${post.category}">${escapeHtml(
    getCategoryLabel(post.category)
  )}</a></nav>
  <article>
    <h1>${escapeHtml(post.title)}</h1>
    <p>${escapeHtml(post.author.name)} · ${formatPostDate(post.publishedAt)} · ${post.readingMinutes}분</p>
    <p>${escapeHtml(post.summary)}</p>
    ${keyPoints}
    <div class="post-body">${renderMarkdown(post.body)}</div>
    ${faq}
    ${sources}
    <p>이 글은 일반적인 건강·영양 정보이며 의사의 진단이나 처방을 대신하지 않습니다.</p>
  </article>
</div>`;
}

export function renderListShell(category: string, posts: HealthPost[]): string {
  const label = category === "all" ? SITE.healthSectionTitle : getCategoryLabel(category);
  const categoryLinks = postCategories
    .map((item) => `<li><a href="/health/c/${item.slug}">${escapeHtml(item.label)}</a></li>`)
    .join("");

  const items = posts
    .map(
      (post) =>
        `<li><a href="/health/${post.slug}"><h2>${escapeHtml(post.title)}</h2></a><p>${escapeHtml(
          post.description
        )}</p><p>${formatPostDate(post.publishedAt)} · ${post.readingMinutes}분</p></li>`
    )
    .join("");

  return `<div id="prerender">
  <nav><a href="/">홈</a> › <a href="/health">건강블로그</a></nav>
  <h1>${escapeHtml(label)}</h1>
  <nav><ul>${categoryLinks}</ul></nav>
  <ul>${items || "<li>발행된 글이 없습니다.</li>"}</ul>
</div>`;
}

/** 정책·안내 페이지. 본문은 글과 같은 마크다운 렌더러를 쓴다. */
export function renderPageShell(page: SitePage): string {
  return `<div id="prerender">
  <nav><a href="/">홈</a> \u203a <a href="/${page.slug}">${escapeHtml(page.navLabel)}</a></nav>
  <article>
    <h1>${escapeHtml(page.title)}</h1>
    <p>최종 개정일 ${formatPostDate(page.updatedAt)}</p>
    <p>${escapeHtml(page.summary)}</p>
    <div class="post-body">${renderMarkdown(page.body)}</div>
  </article>
</div>`;
}

/**
 * 홈. 여기가 비어 있으면 크롤러가 보는 사이트 전체가 빈 셸이다.
 * 탭 화면은 별도 주소가 아니므로(?tab=), 각 탭이 무엇을 하는 곳인지와
 * 100대 영양소 목록·최신 글까지 홈 한 장에 담아 내려보낸다.
 */
export function renderHomeShell(): string {
  const posts = allPosts
    .slice(0, 12)
    .map(
      (post) =>
        `<li><a href="/health/${post.slug}"><h3>${escapeHtml(post.title)}</h3></a><p>${escapeHtml(
          post.description
        )}</p><p>${getCategoryLabel(post.category)} \u00b7 ${formatPostDate(post.publishedAt)}</p></li>`
    )
    .join("");

  const categories = postCategories
    .map(
      (category) =>
        `<li><a href="/health/c/${category.slug}"><strong>${escapeHtml(
          category.label
        )}</strong></a> \u2014 ${escapeHtml(category.description)}</li>`
    )
    .join("");

  const sections = HOME_SECTIONS.map(
    (section) => `<li><strong>${escapeHtml(section.label)}</strong> \u2014 ${escapeHtml(section.summary)}</li>`
  ).join("");

  const nutrientRows = all100Nutrients
    .map(
      (nutrient) =>
        `<tr><td>${nutrient.number}</td><td>${escapeHtml(nutrient.name)}</td><td>${escapeHtml(
          nutrient.category
        )}</td><td>${escapeHtml(nutrient.oneLineSummary)}</td><td>${escapeHtml(nutrient.dailyRDA)}</td></tr>`
    )
    .join("");

  const pageLinks = allPages
    .map((page) => `<li><a href="/${page.slug}">${escapeHtml(page.navLabel)}</a></li>`)
    .join("");

  return `<div id="prerender">
  <article>
    <h1>${escapeHtml(SITE.name)} \u2014 100대 영양소와 영양제 선택 기준</h1>
    <p>영양소별 권장섭취량과 결핍 신호, 음식 급원, 제형에 따른 흡수 차이를 공공 영양기준과 해외 보건기관 자료를 근거로 정리합니다. 건강기능식품은 의약품이 아니며, 이 사이트의 정보는 의사의 진단이나 처방을 대신하지 않습니다.</p>

    <h2>건강블로그 최신 글</h2>
    <ul>${posts || "<li>발행된 글이 없습니다.</li>"}</ul>
    <p><a href="/health">건강블로그 전체 보기</a></p>

    <h2>주제별로 찾기</h2>
    <ul>${categories}</ul>

    <h2>사이트에서 제공하는 도구</h2>
    <ul>${sections}</ul>

    <h2>100대 필수 영양소 목록</h2>
    <div class="post-table-wrap"><table class="post-table">
      <thead><tr><th>번호</th><th>영양소</th><th>분류</th><th>한 줄 요약</th><th>권장섭취량</th></tr></thead>
      <tbody>${nutrientRows}</tbody>
    </table></div>

    <h2>사이트 안내</h2>
    <ul>${pageLinks}</ul>
  </article>
</div>`;
}

/** 홈 셸만 심는다. head 는 index.html 에 이미 홈 기준으로 들어 있다. */
export function renderHomeDocument(html: string): string {
  return html.replace('<div id="root"></div>', `${renderHomeShell()}\n    <div id="root"></div>`);
}

export function renderPageDocument(html: string, page: SitePage): string {
  return injectDocument(html, buildPageSeo(page), renderPageShell(page));
}

/** index.html 의 head 를 이 페이지 값으로 갈아끼우고 본문 셸을 심는다. */
export function injectDocument(html: string, head: SeoHead, shell: string): string {
  let output = html;

  output = output.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(head.title)}</title>`);

  output = output.replace(
    /<meta\s+name="description"\s+content="[\s\S]*?"\s*\/?>/i,
    `<meta name="description" content="${escapeHtml(head.description)}" />`
  );

  if (head.keywords) {
    output = output.replace(
      /<meta\s+name="keywords"\s+content="[\s\S]*?"\s*\/?>/i,
      `<meta name="keywords" content="${escapeHtml(head.keywords)}" />`
    );
  }

  output = output.replace(
    /<link\s+rel="canonical"\s+href="[\s\S]*?"\s*\/?>/i,
    `<link rel="canonical" href="${head.canonical}" />`
  );

  output = output
    .replace(
      /<meta\s+property="og:title"\s+content="[\s\S]*?"\s*\/?>/i,
      `<meta property="og:title" content="${escapeHtml(head.title)}" />`
    )
    .replace(
      /<meta\s+property="og:description"\s+content="[\s\S]*?"\s*\/?>/i,
      `<meta property="og:description" content="${escapeHtml(head.description)}" />`
    )
    .replace(
      /<meta\s+property="og:url"\s+content="[\s\S]*?"\s*\/?>/i,
      `<meta property="og:url" content="${head.canonical}" />`
    )
    .replace(
      /<meta\s+property="og:type"\s+content="[\s\S]*?"\s*\/?>/i,
      `<meta property="og:type" content="${head.ogType}" />`
    );

  // 홈용 구조화 데이터가 글 페이지에 남으면 잘못된 신호가 된다. 걷어내고 이 페이지 것을 넣는다.
  output = output.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/gi, "");
  output = output.replace("</head>", `  ${renderHeadTags(head)}\n  </head>`);

  output = output.replace('<div id="root"></div>', `${shell}\n    <div id="root"></div>`);

  return output;
}

export function renderPostDocument(html: string, post: HealthPost): string {
  return injectDocument(html, buildPostSeo(post), renderPostShell(post));
}

export function renderListDocument(
  html: string,
  category: string,
  posts: HealthPost[]
): string {
  return injectDocument(html, buildHealthListSeo(category, posts), renderListShell(category, posts));
}

/* ---------------------------- 사이트맵 / RSS ---------------------------- */

/**
 * 홈의 탭 화면들. 별도 주소가 아니라 홈의 일부(?tab=)라서 사이트맵에 넣지 않는다.
 * 예전에는 ?tab= 주소를 전부 사이트맵에 올렸는데, canonical 은 모두 "/" 를 가리켜
 * 서로 어긋나는 신호를 보냈다. 대신 여기 요약을 홈 사전렌더에 실어 크롤러가 읽게 한다.
 */
const HOME_SECTIONS: { label: string; summary: string }[] = [
  {
    label: "100대 영양소 대백과",
    summary:
      "영양소마다 권장섭취량, 결핍 신호, 음식 급원, 흡수율이 높은 제형과 피해야 할 제형을 한자리에 정리한 데이터베이스",
  },
  {
    label: "영양제 복용 시간표",
    summary:
      "공복·식후·취침 전 어느 시간대에 무엇을 먹어야 하는지, 서로 흡수를 방해하는 조합은 어떻게 나누는지 정리한 시간표",
  },
  {
    label: "영양 상태 시각화",
    summary: "생활 조건을 입력하면 부족하기 쉬운 영양소를 그래프로 보여 주는 화면",
  },
  {
    label: "영양제 구독 관리",
    summary: "남은 알 수와 재구매 시점을 계산하고, 해외 직구 시 통관 한도를 함께 확인하는 도구",
  },
  {
    label: "식단 매칭 가이드",
    summary:
      "오늘 먹은 식사 유형에 따라 무엇이 소모되고 무엇을 함께 먹어야 흡수가 되는지 짝지어 주는 가이드",
  },
  {
    label: "약한 부위별 정리",
    summary: "눈·장·관절·간처럼 신경 쓰이는 부위를 기준으로 관련 영양소를 모아 본 화면",
  },
  {
    label: "생애주기·직업별 정리",
    summary: "노년기, 수험생, 교대근무처럼 생활 조건이 다른 경우의 우선순위 정리",
  },
  {
    label: "해외 연구·칼럼 요약",
    summary: "해외 보건기관과 대형 의료기관이 낸 자료를 과장 없이 요약하고 원문을 함께 밝힌 코너",
  },
  {
    label: "가격·배송 정보",
    summary: "국내 판매가와 해외 직구가를 수집 시점 기준으로 비교해 둔 표. 실시간 가격이 아님을 함께 표시",
  },
];

export function buildSitemap(): string {
  const today = new Date().toISOString().slice(0, 10);
  const latest = allPosts[0]?.updatedAt ?? allPosts[0]?.publishedAt ?? today;

  const urls: string[] = [
    `<url><loc>${SITE.origin}/</loc><lastmod>${today}</lastmod><changefreq>daily</changefreq><priority>1.0</priority></url>`,
    `<url><loc>${SITE.origin}/health</loc><lastmod>${latest}</lastmod><changefreq>daily</changefreq><priority>0.9</priority></url>`,
    ...postCategories.map(
      (category) =>
        `<url><loc>${SITE.origin}/health/c/${category.slug}</loc><lastmod>${latest}</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>`
    ),
    ...allPosts.map(
      (post) =>
        `<url><loc>${postUrl(post.slug)}</loc><lastmod>${
          post.updatedAt ?? post.publishedAt
        }</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`
    ),
    ...indexablePages.map(
      (page) =>
        `<url><loc>${pageUrl(page.slug)}</loc><lastmod>${page.updatedAt}</lastmod><changefreq>yearly</changefreq><priority>0.4</priority></url>`
    ),
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;
}

function toRfc822(date: string): string {
  return new Date(`${date}T09:00:00+09:00`).toUTCString();
}

export function buildRss(): string {
  const items = allPosts
    .map(
      (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${postUrl(post.slug)}</link>
      <guid isPermaLink="true">${postUrl(post.slug)}</guid>
      <description>${escapeXml(post.description)}</description>
      <category>${escapeXml(getCategoryLabel(post.category))}</category>
      <pubDate>${toRfc822(post.publishedAt)}</pubDate>
    </item>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE.name)} 건강블로그</title>
    <link>${SITE.origin}/health</link>
    <atom:link href="${SITE.origin}/rss.xml" rel="self" type="application/rss+xml" />
    <description>증상·영양소·제형 기준으로 정리한 건강블로그</description>
    <language>ko</language>
    <lastBuildDate>${toRfc822(allPosts[0]?.publishedAt ?? new Date().toISOString().slice(0, 10))}</lastBuildDate>
${items}
  </channel>
</rss>`;
}
