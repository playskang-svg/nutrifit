import Link from 'next/link'

import { SITE_NAME } from '@/lib/payload'

type Item = { id?: string | null; label: string; url: string }

export function SiteFooter({ items }: { items: Item[] }) {
  return (
    <footer className="site-footer">
      <div className="frame">
        <p className="site-footer__name">{SITE_NAME}</p>
        <p className="site-footer__note">
          영양 성분과 건강 정보를 공식 자료로 정리하는 개인 운영 사이트입니다. 이 사이트의 글은 진단이나 치료를
          대신하지 않습니다. 제품 가격과 구성은 판매 화면에서 다시 확인해 주세요.
        </p>
        {items.length ? (
          <nav aria-label="하단 메뉴" className="site-footer__nav">
            {items.map((item) => (
              <Link href={item.url} key={item.id ?? item.url}>
                {item.label}
              </Link>
            ))}
          </nav>
        ) : null}
        <small>© {new Date().getFullYear()} nutrifit.kr</small>
      </div>
    </footer>
  )
}
