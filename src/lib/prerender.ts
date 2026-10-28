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
  DEFAULT_OG_IMAGE,
} from "./seo";
import { renderMarkdown, escapeHtml } from "./markdown";
import { getCategoryLabel, postCategories } from "../content/postCategories";
import { allPosts, formatPostDate } from "../content/posts";
import { allPages, indexablePages } from "../content/pages";
import { all100Nutrients } from "../data/nutrientsAll";
import { HEALTH_TOOLS, TOOLS_HUB } from "../data/healthTools";
import { COUPANG_DISCLOSURE, AFFILIATE_DISCLOSURE } from "../data/affiliateLinks";

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

  const image = head.image ?? DEFAULT_OG_IMAGE;

  return [
    `<meta property="og:site_name" content="${escapeHtml(SITE.name)}" />`,
    `<meta property="og:locale" content="${SITE.locale}" />`,
    `<meta property="og:image" content="${escapeHtml(image.url)}" />`,
    `<meta property="og:image:secure_url" content="${escapeHtml(image.url)}" />`,
    image.type ? `<meta property="og:image:type" content="${image.type}" />` : "",
    image.width ? `<meta property="og:image:width" content="${image.width}" />` : "",
    image.height ? `<meta property="og:image:height" content="${image.height}" />` : "",
    `<meta property="og:image:alt" content="${escapeHtml(image.alt)}" />`,
    head.publishedTime
      ? `<meta property="article:published_time" content="${head.publishedTime}" />`
      : "",
    head.modifiedTime
      ? `<meta property="article:modified_time" content="${head.modifiedTime}" />`
      : "",
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(head.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(head.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(image.url)}" />`,
    `<meta name="twitter:image:alt" content="${escapeHtml(image.alt)}" />`,
    `<script type="application/ld+json">${jsonLd}</script>`,
  ]
    .filter(Boolean)
    .join("\n    ");
}

/** 모든 사전렌더 페이지 하단에 싣는 의학적 고지. */
export const MEDICAL_DISCLAIMER =
  "본 글은 정보 제공 목적이며 의학적 진단·치료를 대체하지 않습니다. 복용 전 전문가와 상담하세요. 건강기능식품은 질병의 예방·치료를 위한 의약품이 아닙니다.";

/**
 * 사전렌더 공통 푸터. React 가 마운트되기 전(=JS 를 실행하지 않는 크롤러)에도
 * 모든 페이지에서 소개·문의·개인정보처리방침·이용약관으로 가는 링크가 보이게 한다.
 */
export function renderSiteFooter(): string {
  const links = allPages
    .map((page) => `<li><a href="/${page.slug}">${escapeHtml(page.navLabel)}</a></li>`)
    .join("");
  return `<footer>
    <nav aria-label="사이트 안내"><ul>${links}</ul></nav>
    <p>${escapeHtml(COUPANG_DISCLOSURE)}</p>
    <p>\u00a9 ${escapeHtml(SITE.name)} \u00b7 문의 <a href="/contact">문의하기</a></p>
  </footer>`;
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
    <p>${escapeHtml(COUPANG_DISCLOSURE)} ${escapeHtml(AFFILIATE_DISCLOSURE)}</p>
    <p>${escapeHtml(post.summary)}</p>
    ${keyPoints}
    <div class="post-body">${renderMarkdown(post.body)}</div>
    ${faq}
    ${sources}
    <p>${MEDICAL_DISCLAIMER}</p>
  </article>
  ${renderSiteFooter()}
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
  <p>${escapeHtml(COUPANG_DISCLOSURE)} ${escapeHtml(AFFILIATE_DISCLOSURE)}</p>
  <nav><ul>${categoryLinks}</ul></nav>
  <ul>${items || "<li>발행된 글이 없습니다.</li>"}</ul>
  ${renderSiteFooter()}
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
  ${renderSiteFooter()}
</div>`;
}

/**
 * 홈. 여기가 비어 있으면 크롤러가 보는 사이트 전체가 빈 셸이다.
 * 탭 화면은 별도 주소가 아니므로(?tab=), 각 탭이 무엇을 하는 곳인지와
 * 100대 영양소 목록·최신 글까지 홈 한 장에 담아 내려보낸다.
 */
function renderHomeShellBase(): string {
  const hero = allPosts[0];
  const sidePosts = allPosts.slice(1, 5);

  const heroHtml = hero
    ? `<div class="newsroom-hero-main">
        <a href="/health/${hero.slug}" class="hero-card">
          <div class="hero-visual-box"><span class="hero-visual-badge">${hero.heroEmoji}</span></div>
          <div class="hero-card-body">
            <div class="hero-card-meta">
              <span class="hero-chip">${escapeHtml(getCategoryLabel(hero.category))}</span>
              <span class="hero-time">${hero.readingMinutes}분 읽기</span>
              <span class="hero-time" style="margin-left:auto">${formatPostDate(hero.publishedAt)}</span>
            </div>
            <h2 class="hero-title">${escapeHtml(hero.title)}</h2>
            <p class="hero-desc">${escapeHtml(hero.description)}</p>
          </div>
        </a>
      </div>`
    : "";

  const sideHtml = sidePosts
    .map(
      (post) => `<a href="/health/${post.slug}" class="side-story-item">
        <div class="side-story-thumb">${post.heroEmoji}</div>
        <div class="side-story-content">
          <div class="side-story-meta"><span>${escapeHtml(getCategoryLabel(post.category))}</span> · <span>${post.readingMinutes}분</span></div>
          <h3 class="side-story-title">${escapeHtml(post.title)}</h3>
        </div>
      </a>`
    )
    .join("");

  const categoriesHtml = postCategories
    .map((cat) => {
      const catPosts = allPosts.filter((p) => p.category === cat.slug).slice(0, 4);
      if (!catPosts.length) return "";
      const cards = catPosts
        .map(
          (p) => `<a href="/health/${p.slug}" class="editorial-post-card">
            <div class="editorial-card-thumb">${p.heroEmoji}</div>
            <div class="editorial-card-body">
              <div class="editorial-card-meta">
                <span class="editorial-card-chip">${escapeHtml(cat.label)}</span>
                <span class="editorial-card-date">${formatPostDate(p.publishedAt)}</span>
              </div>
              <h3 class="editorial-card-title">${escapeHtml(p.title)}</h3>
              <p class="editorial-card-desc">${escapeHtml(p.description)}</p>
            </div>
          </a>`
        )
        .join("");

      return `<section class="newsroom-category-block">
        <div class="newsroom-category-block-header">
          <h2>${escapeHtml(cat.label)}</h2>
          <a href="/health/c/${cat.slug}">${escapeHtml(cat.label)} 전체보기 ›</a>
        </div>
        <div class="newsroom-category-grid">${cards}</div>
      </section>`;
    })
    .join("");

  return `<div id="prerender">
    <div class="newsroom-layout">
      <div class="newsroom-main">
        <section class="newsroom-hero">
          ${heroHtml}
          <div class="newsroom-hero-side">
            <h3 class="newsroom-hero-side-title">주요 건강 브리핑</h3>
            ${sideHtml}
          </div>
        </section>

        <section class="situation-hub-grid">
          <a href="/?tab=catalog" class="situation-hub-card">
            <span class="situation-tag">100대 영양소</span>
            <h3 class="situation-title">대한민국 100대 필수 영양소 백과</h3>
            <p class="situation-desc">100가지 영양소 권장량·결핍 신호·최적 제형 비교</p>
          </a>
          <a href="/?tab=schedule" class="situation-hub-card">
            <span class="situation-tag">복용 시간표</span>
            <h3 class="situation-title">흡수율 극대화 영양제 복용 시간표</h3>
            <p class="situation-desc">식전·식후 복용 순서와 상극 충돌 방지 가이드</p>
          </a>
          <a href="/?tab=organs" class="situation-hub-card">
            <span class="situation-tag">장기별 가이드</span>
            <h3 class="situation-title">눈·장·혈관·관절 타겟 영양</h3>
            <p class="situation-desc">취약 부위별 기능성 성분과 임상 근거 리포트</p>
          </a>
          <a href="/?tab=diet" class="situation-hub-card">
            <span class="situation-tag">식단 매칭</span>
            <h3 class="situation-title">음식 급원과 시너지 식단</h3>
            <p class="situation-desc">식품 섭취 한계와 보충 필요 성분 비교</p>
          </a>
        </section>

        ${categoriesHtml}
      </div>

      <aside class="newsroom-sidebar">
        <div class="newsroom-sidebar-sticky">
          <div class="sidebar-widget">
            <h3 class="sidebar-widget-title">상황별 핵심 도구</h3>
            <a href="/?tab=schedule" class="sidebar-hub-item">
              <span class="sidebar-hub-tag">복용 순서</span>
              <h4 class="sidebar-hub-title">영양제 복용 시간표</h4>
              <p class="sidebar-hub-desc">흡수 경쟁을 피하고 시너지를 극대화하는 시간표</p>
            </a>
            <a href="/?tab=catalog" class="sidebar-hub-item">
              <span class="sidebar-hub-tag">영양소 백과</span>
              <h4 class="sidebar-hub-title">100대 필수 영양소 도감</h4>
              <p class="sidebar-hub-desc">성분별 권장량과 최적 제형 완벽 정리</p>
            </a>
          </div>
          <div class="sidebar-widget">
            <h3 class="sidebar-widget-title">편집 원칙과 기준</h3>
            <p style="font-size:12px;color:#60747c;line-height:1.65;margin:0 0 12px">
              뉴트리핏은 의약품이 아닌 건강기능식품의 과학적 연구와 보건복지부 한국인 영양소 섭취기준, 식약처 기능성 고시를 근거로 정직하게 작성합니다.
            </p>
            <a href="/editorial" style="font-size:12px;font-weight:700;color:var(--teal)">편집 원칙 전문 보기 →</a>
          </div>
        </div>
      </aside>
    </div>
  </div>`;
}

export function renderHomeShell(): string {
  const tools = HEALTH_TOOLS.map((t) => `<a href="${t.href}" class="situation-hub-card"><span class="situation-tag">${t.emoji} ${escapeHtml(t.tag)}</span><h3 class="situation-title">${escapeHtml(t.title)}</h3><p class="situation-desc">${escapeHtml(t.desc)}</p></a>`).join("");
  return renderHomeShellBase() + `\n<section id="tools" aria-label="바로 쓰는 건강 계산기"><h2>바로 쓰는 건강 계산기</h2><div class="situation-hub-grid">${tools}<a href="${TOOLS_HUB}" class="situation-hub-card"><h3 class="situation-title">전체 계산기 30개</h3></a></div></section>`;
}

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

  // index.html 의 홈 기본 미리보기 이미지 태그를 걷어내고, 이 페이지 값(renderHeadTags)으로 다시 넣는다.
  output = output.replace(
    /\s*<meta\s+(?:property|name)="(?:og:image(?::[a-z_]+)?|twitter:image(?::alt)?)"\s+content="[\s\S]*?"\s*\/?>/gi,
    ""
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
