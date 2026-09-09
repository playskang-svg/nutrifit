/**
 * 의존성 없는 마크다운 서브셋 렌더러.
 * 워커(서버 사전렌더)와 브라우저가 같은 결과를 내야 하므로 DOM·Node API를 쓰지 않는다.
 *
 * 지원 문법
 *   ## / ###            소제목 (목차 자동 생성, id = sec-N)
 *   - item              글머리 목록
 *   1. item             번호 목록
 *   > text              인용
 *   ::: tip 제목        콜아웃 박스 (tip | warn | check | note) ... ::: 로 닫는다
 *   | a | b |           표 (둘째 줄은 |---|---| 구분선)
 *   ---                 구분선
 *   **굵게** *기울임* `코드` ==형광== [링크](url)
 */

export interface MarkdownHeading {
  id: string;
  level: 2 | 3;
  text: string;
}

const CALLOUT_STYLES: Record<string, { cls: string; icon: string }> = {
  tip: { cls: "post-callout post-callout--tip", icon: "💡" },
  warn: { cls: "post-callout post-callout--warn", icon: "⚠️" },
  check: { cls: "post-callout post-callout--check", icon: "✅" },
  note: { cls: "post-callout post-callout--note", icon: "📌" },
};

export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** 인라인 서식. 반드시 escapeHtml 이후에 호출한다. */
function inline(raw: string): string {
  return escapeHtml(raw)
    .replace(/`([^`]+)`/g, '<code class="post-code">$1</code>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, (_all, text: string, href: string) =>
      // 사이트 안쪽 링크까지 nofollow·새 창으로 내보내면 내부 링크 신호가 죽는다.
      /^https?:\/\/(www\.)?nutrifit\.kr(\/|$)/.test(href)
        ? `<a href="${href.replace(/^https?:\/\/(www\.)?nutrifit\.kr/, "")}" class="post-link">${text}</a>`
        : `<a href="${href}" target="_blank" rel="noopener nofollow" class="post-link">${text}</a>`
    )
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[^*])\*([^*\n]+)\*/g, "$1<em>$2</em>")
    .replace(/==([^=]+)==/g, '<mark class="post-mark">$1</mark>');
}

/** 목차용 소제목 추출. renderMarkdown과 동일한 순서로 id를 매긴다. */
export function extractHeadings(markdown: string): MarkdownHeading[] {
  const headings: MarkdownHeading[] = [];
  let counter = 0;
  for (const line of markdown.split("\n")) {
    const match = /^(##|###)\s+(.*)$/.exec(line.trim());
    if (!match) continue;
    counter += 1;
    headings.push({
      id: `sec-${counter}`,
      level: match[1].length as 2 | 3,
      text: match[2].replace(/[*`=]/g, "").trim(),
    });
  }
  return headings;
}

export function renderMarkdown(markdown: string): string {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const out: string[] = [];
  let paragraph: string[] = [];
  let listBuffer: string[] = [];
  let listType: "ul" | "ol" | null = null;
  let headingCounter = 0;

  const flushParagraph = () => {
    if (!paragraph.length) return;
    out.push(`<p>${inline(paragraph.join(" "))}</p>`);
    paragraph = [];
  };

  const flushList = () => {
    if (!listType || !listBuffer.length) {
      listType = null;
      listBuffer = [];
      return;
    }
    const items = listBuffer.map((item) => `<li>${inline(item)}</li>`).join("");
    out.push(`<${listType} class="post-list">${items}</${listType}>`);
    listBuffer = [];
    listType = null;
  };

  const flushAll = () => {
    flushParagraph();
    flushList();
  };

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      flushAll();
      continue;
    }

    // 콜아웃 ::: tip 제목 ... :::
    const calloutOpen = /^:::\s*(tip|warn|check|note)\s*(.*)$/.exec(trimmed);
    if (calloutOpen) {
      flushAll();
      const kind = calloutOpen[1];
      const heading = calloutOpen[2].trim();
      const inner: string[] = [];
      i += 1;
      while (i < lines.length && lines[i].trim() !== ":::") {
        inner.push(lines[i]);
        i += 1;
      }
      const style = CALLOUT_STYLES[kind];
      const title = heading
        ? `<p class="post-callout__title"><span aria-hidden="true">${style.icon}</span>${inline(heading)}</p>`
        : "";
      out.push(
        `<aside class="${style.cls}">${title}${renderMarkdown(inner.join("\n"))}</aside>`
      );
      continue;
    }

    // 표
    if (trimmed.startsWith("|") && /^\|[\s:-]+\|/.test((lines[i + 1] || "").trim())) {
      flushAll();
      const cells = (row: string) =>
        row
          .trim()
          .replace(/^\||\|$/g, "")
          .split("|")
          .map((cell) => cell.trim());
      const head = cells(trimmed);
      i += 2;
      const bodyRows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        bodyRows.push(cells(lines[i]));
        i += 1;
      }
      i -= 1;
      const thead = `<thead><tr>${head.map((c) => `<th>${inline(c)}</th>`).join("")}</tr></thead>`;
      const tbody = `<tbody>${bodyRows
        .map((row) => `<tr>${row.map((c) => `<td>${inline(c)}</td>`).join("")}</tr>`)
        .join("")}</tbody>`;
      out.push(`<div class="post-table-wrap"><table class="post-table">${thead}${tbody}</table></div>`);
      continue;
    }

    // 소제목
    const heading = /^(##|###)\s+(.*)$/.exec(trimmed);
    if (heading) {
      flushAll();
      headingCounter += 1;
      const tag = heading[1].length === 2 ? "h2" : "h3";
      out.push(
        `<${tag} id="sec-${headingCounter}" class="post-${tag}">${inline(heading[2].trim())}</${tag}>`
      );
      continue;
    }

    if (trimmed === "---") {
      flushAll();
      out.push('<hr class="post-hr" />');
      continue;
    }

    if (trimmed.startsWith("> ")) {
      flushAll();
      out.push(`<blockquote class="post-quote">${inline(trimmed.slice(2))}</blockquote>`);
      continue;
    }

    const bullet = /^[-*]\s+(.*)$/.exec(trimmed);
    if (bullet) {
      flushParagraph();
      if (listType !== "ul") flushList();
      listType = "ul";
      listBuffer.push(bullet[1]);
      continue;
    }

    const numbered = /^\d+\.\s+(.*)$/.exec(trimmed);
    if (numbered) {
      flushParagraph();
      if (listType !== "ol") flushList();
      listType = "ol";
      listBuffer.push(numbered[1]);
      continue;
    }

    flushList();
    paragraph.push(trimmed);
  }

  flushAll();
  return out.join("\n");
}

/** 메타 설명·요약처럼 태그가 들어가면 안 되는 자리에 쓰는 평문 변환기. */
export function markdownToPlainText(markdown: string, maxLength = 160): string {
  const plain = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/^:::.*$/gm, " ")
    .replace(/^[#>\-*|]+\s*/gm, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*`=]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (plain.length <= maxLength) return plain;
  return `${plain.slice(0, maxLength - 1).trimEnd()}…`;
}
