import type { Metadata } from 'next'
import { headers } from 'next/headers'
import Script from 'next/script'
import React from 'react'

import { JsonLd } from '@/components/JsonLd'
import { Disclosure } from '@/components/Disclosure'
import { ReadingProgress } from '@/components/ReadingProgress'
import { Reveal } from '@/components/Reveal'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { FOOTER_LINKS, HEADER_LINKS } from '@/globals/Navigation'
import { isProdHost } from '@/lib/host'
import { siteGraph } from '@/lib/jsonld'
import { getClient, SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from '@/lib/payload'

import './styles.css'

const ADSENSE_CLIENT = 'ca-pub-4030620718116834'
const GA_ID = 'G-NMFBKTV6LS'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  robots: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  // Doses must not turn into phone links on mobile browsers.
  formatDetection: { telephone: false },
  icons: { icon: '/favicon.ico', apple: '/apple-touch-icon.png' },
  openGraph: {
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    type: 'website',
    locale: 'ko_KR',
    url: '/',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', images: ['/og-image.jpg'] },
  alternates: {
    types: { 'application/rss+xml': '/rss.xml' },
  },
  verification: {
    google: 'k1EU9il6_J9s5IyAHKu9TlDjnq2mS_oE7qRzq6JF0lg',
    other: {
      'naver-site-verification': '4b6bda0e467e985791bf5f9dcfaf4382153065b4',
      'google-adsense-account': ADSENSE_CLIENT,
    },
  },
}

// Menus live in D1, which is empty during the build.
export const dynamic = 'force-dynamic'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const payload = await getClient()
  const nav = await payload.findGlobal({ slug: 'navigation' })
  // workers.dev previews and localhost must not serve ads or count visits.
  const live = isProdHost((await headers()).get('host'))

  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        <JsonLd data={siteGraph()} />
        {live ? (
          <script
            async
            crossOrigin="anonymous"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          />
        ) : null}
      </head>
      <body>
        <a className="skip" href="#main">
          본문 바로가기
        </a>
        <Disclosure />
        <ReadingProgress />
        <SiteHeader items={nav.header?.length ? nav.header : HEADER_LINKS} siteName={SITE_NAME} />
        <main id="main">{children}</main>
        <SiteFooter items={nav.footer?.length ? nav.footer : FOOTER_LINKS} />
        <Reveal />
        {live ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  )
}
