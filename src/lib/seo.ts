import { HealthPost, SitePage } from "../types";
import { getCategoryLabel } from "../content/postCategories";
import { markdownToPlainText } from "./markdown";

export const SITE = {
  origin: "https://nutrifit.kr",
  name: "NutriFit (뉴트리핏)",
  publisher: "NutriFit 100 Clinical Nutrition",
  locale: "ko_KR",
  healthSectionTitle: "건강정보",
} as const;

export interface SeoHead {
  title: string;
  description: string;
  canonical: string;
  keywords?: string;
  ogType: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  jsonLd: unknown[];
}

export const postUrl = (slug: string) => `${SITE.origin}/health/${slug}`;
export const pageUrl = (slug: string) => `${SITE.origin}/${slug}`;
export const categoryUrl = (slug: string) => `${SITE.origin}/health/c/${slug}`;
export const healthListUrl = () => `${SITE.origin}/health`;

export function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function breadcrumb(items: { name: string; url: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function buildPostSeo(post: HealthPost): SeoHead {
  const url = postUrl(post.slug);
  const description = post.description || markdownToPlainText(post.summary);
  const categoryLabel = getCategoryLabel(post.category);

  const graph: unknown[] = [
    {
      "@type": "MedicalWebPage",
      "@id": `${url}#webpage`,
      url,
      name: post.seoTitle ?? post.title,
      headline: post.title,
      description,
      inLanguage: "ko-KR",
      datePublished: post.publishedAt,
      dateModified: post.updatedAt ?? post.publishedAt,
      author: { "@type": "Organization", name: post.author.name },
      publisher: { "@type": "Organization", name: SITE.publisher },
      about: post.keywords.slice(0, 6).map((keyword) => ({
        "@type": "Thing",
        name: keyword,
      })),
      keywords: post.keywords.join(", "),
      articleSection: categoryLabel,
      timeRequired: `PT${post.readingMinutes}M`,
    },
    breadcrumb([
      { name: SITE.name, url: `${SITE.origin}/` },
      { name: SITE.healthSectionTitle, url: healthListUrl() },
      { name: categoryLabel, url: categoryUrl(post.category) },
      { name: post.title, url },
    ]),
  ];

  if (post.faq?.length) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: post.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    });
  }

  return {
    title: `${post.seoTitle ?? post.title} | ${SITE.name}`,
    description,
    canonical: url,
    keywords: post.keywords.join(", "),
    ogType: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt ?? post.publishedAt,
    jsonLd: graph,
  };
}

/**
 * 정책·안내 페이지. 글이 아니므로 MedicalWebPage 가 아니라 WebPage 로 낸다.
 * 개인정보처리방침·이용약관은 검색 노출을 노리는 문서가 아니지만, 심사와 신뢰를 위해
 * 색인은 열어 둔다(noindex 를 켠 페이지만 제외).
 */
export function buildPageSeo(page: SitePage): SeoHead {
  const url = pageUrl(page.slug);

  return {
    title: `${page.seoTitle ?? page.title} | ${SITE.name}`,
    description: page.description,
    canonical: url,
    ogType: "website",
    modifiedTime: page.updatedAt,
    jsonLd: [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: page.seoTitle ?? page.title,
        headline: page.title,
        description: page.description,
        inLanguage: "ko-KR",
        dateModified: page.updatedAt,
        isPartOf: { "@id": `${SITE.origin}/#website` },
        publisher: { "@id": `${SITE.origin}/#organization` },
      },
      breadcrumb([
        { name: SITE.name, url: `${SITE.origin}/` },
        { name: page.title, url },
      ]),
    ],
  };
}

export function buildHealthListSeo(
  categorySlug: string | "all",
  posts: HealthPost[]
): SeoHead {
  const isAll = categorySlug === "all";
  const label = isAll ? SITE.healthSectionTitle : getCategoryLabel(categorySlug);
  const url = isAll ? healthListUrl() : categoryUrl(categorySlug);

  return {
    title: isAll
      ? `건강정보 — 영양소·증상·제형 가이드 | ${SITE.name}`
      : `${label} 건강정보 모음 | ${SITE.name}`,
    description: isAll
      ? "증상별 케어, 영양소 완전정복, 영양제 고르는 법까지. 공공 영양기준과 해외 보건기관 자료를 근거로 정리한 건강정보 아카이브입니다."
      : `${label} 주제로 정리한 건강정보 글 모음. 근거와 출처를 함께 밝힙니다.`,
    canonical: url,
    ogType: "website",
    jsonLd: [
      {
        "@type": "CollectionPage",
        "@id": `${url}#collection`,
        url,
        name: `${label} — ${SITE.name}`,
        inLanguage: "ko-KR",
        mainEntity: {
          "@type": "ItemList",
          itemListElement: posts.slice(0, 20).map((post, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: postUrl(post.slug),
            name: post.title,
          })),
        },
      },
      breadcrumb([
        { name: SITE.name, url: `${SITE.origin}/` },
        { name: SITE.healthSectionTitle, url: healthListUrl() },
        ...(isAll ? [] : [{ name: label, url }]),
      ]),
    ],
  };
}

/** 브라우저에서 라우트가 바뀔 때 head를 맞춰 준다(워커 사전렌더와 동일한 값). */
export function applySeoHead(head: SeoHead): void {
  if (typeof document === "undefined") return;
  document.title = head.title;

  const setMeta = (selector: string, attr: string, key: string, content: string) => {
    let element = document.head.querySelector<HTMLMetaElement>(selector);
    if (!element) {
      element = document.createElement("meta");
      element.setAttribute(attr, key);
      document.head.appendChild(element);
    }
    element.setAttribute("content", content);
  };

  setMeta('meta[name="description"]', "name", "description", head.description);
  setMeta('meta[property="og:title"]', "property", "og:title", head.title);
  setMeta('meta[property="og:description"]', "property", "og:description", head.description);
  setMeta('meta[property="og:url"]', "property", "og:url", head.canonical);
  setMeta('meta[property="og:type"]', "property", "og:type", head.ogType);
  if (head.keywords) setMeta('meta[name="keywords"]', "name", "keywords", head.keywords);

  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }
  canonical.href = head.canonical;
}
