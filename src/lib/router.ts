import type { MouseEvent } from "react";
import { useEffect, useState } from "react";
import { PostCategorySlug } from "../types";

/**
 * 의존성 없는 최소 라우터.
 * 기존 탭 UI(/ + ?tab=)는 그대로 두고, 건강정보만 실제 경로를 가져간다.
 *   /                     기존 탭 홈
 *   /health               글 목록
 *   /health/c/<category>  카테고리 목록
 *   /health/<slug>        글 상세
 */
export type Route =
  | { name: "home"; tab: string }
  | { name: "health"; category: PostCategorySlug | "all" }
  | { name: "post"; slug: string };

const NAV_EVENT = "nutrifit:navigate";

export function parseRoute(pathname: string, search = ""): Route {
  const segments = pathname.split("/").filter(Boolean);

  if (segments[0] === "health") {
    if (!segments[1]) return { name: "health", category: "all" };
    if (segments[1] === "c") {
      return { name: "health", category: (segments[2] as PostCategorySlug) ?? "all" };
    }
    return { name: "post", slug: segments[1] };
  }

  const tab = new URLSearchParams(search).get("tab") ?? "catalog";
  return { name: "home", tab };
}

export function routeToPath(route: Route): string {
  switch (route.name) {
    case "post":
      return `/health/${route.slug}`;
    case "health":
      return route.category === "all" ? "/health" : `/health/c/${route.category}`;
    default:
      return route.tab === "catalog" ? "/" : `/?tab=${route.tab}`;
  }
}

export function navigate(path: string, options: { replace?: boolean } = {}): void {
  if (typeof window === "undefined") return;
  const current = `${window.location.pathname}${window.location.search}`;
  if (current !== path) {
    window.history[options.replace ? "replaceState" : "pushState"]({}, "", path);
  }
  window.dispatchEvent(new CustomEvent(NAV_EVENT));
  window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
}

function readRoute(): Route {
  if (typeof window === "undefined") return { name: "home", tab: "catalog" };
  return parseRoute(window.location.pathname, window.location.search);
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(readRoute);

  useEffect(() => {
    const sync = () => setRoute(readRoute());
    window.addEventListener("popstate", sync);
    window.addEventListener(NAV_EVENT, sync);
    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener(NAV_EVENT, sync);
    };
  }, []);

  return route;
}

/**
 * 크롤러는 실제 <a href>를 따라가야 하므로 링크는 앵커로 두고,
 * 좌클릭만 가로채 전체 새로고침을 막는다.
 */
export function linkProps(path: string) {
  return {
    href: path,
    onClick: (event: MouseEvent<HTMLAnchorElement>) => {
      if (event.defaultPrevented) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (event.button !== 0) return;
      event.preventDefault();
      navigate(path);
    },
  };
}
