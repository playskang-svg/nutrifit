import { HealthPost } from "../types";
import { SeoHead, SITE, postUrl, escapeXml, buildPostSeo, buildHealthListSeo } from "./seo";
import { renderMarkdown, escapeHtml } from "./markdown";
import { getCategoryLabel, postCategories } from "../content/postCategories";
import { allPosts, formatPostDate } from "../content/posts";

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
  <nav><a href="/">홈</a> › <a href="/health">건강정보</a> › <a href="/health/c/${post.category}">${escapeHtml(
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
  <nav><a href="/">홈</a> › <a href="/health">건강정보</a></nav>
  <h1>${escapeHtml(label)}</h1>
  <nav><ul>${categoryLinks}</ul></nav>
  <ul>${items || "<li>발행된 글이 없습니다.</li>"}</ul>
</div>`;
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

const STATIC_TABS = [
  "catalog",
  "schedule",
  "visualizer",
  "subscription",
  "diet",
  "organs",
  "demographics",
  "columns",
  "deals",
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
    ...STATIC_TABS.map(
      (tab) =>
        `<url><loc>${SITE.origin}/?tab=${tab}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.6</priority></url>`
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
    <title>${escapeXml(SITE.name)} 건강정보</title>
    <link>${SITE.origin}/health</link>
    <atom:link href="${SITE.origin}/rss.xml" rel="self" type="application/rss+xml" />
    <description>증상·영양소·제형 기준으로 정리한 건강정보</description>
    <language>ko</language>
    <lastBuildDate>${toRfc822(allPosts[0]?.publishedAt ?? new Date().toISOString().slice(0, 10))}</lastBuildDate>
${items}
  </channel>
</rss>`;
}
