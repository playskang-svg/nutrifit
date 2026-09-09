import { SitePage } from "../../types";

/* --- 정책·안내 페이지 등록부 -----------------------------------------
 * 새 페이지 추가: src/content/pages/<slug>.ts 생성 → 아래 두 줄 추가.
 * 워커에서도 import 하므로 Vite 전용 import.meta.glob 은 쓰지 않는다.
 * 배열 순서가 푸터 링크 순서다.
 * ------------------------------------------------------------------ */
import { page as about } from "./about";
import { page as editorial } from "./editorial";
import { page as contact } from "./contact";
import { page as privacy } from "./privacy";
import { page as terms } from "./terms";

export const allPages: SitePage[] = [about, editorial, contact, privacy, terms];
/* --- 등록부 끝 ---------------------------------------------------- */

const bySlug = new Map(allPages.map((page) => [page.slug, page]));

export function getPageBySlug(slug: string): SitePage | undefined {
  return bySlug.get(slug);
}

/** 워커 라우팅이 이 목록으로 /about 같은 최상위 경로를 가로챈다. */
export const pageSlugs: string[] = allPages.map((page) => page.slug);

/** 사이트맵에 넣을 페이지. noindex 는 뺀다. */
export const indexablePages: SitePage[] = allPages.filter((page) => !page.noindex);
