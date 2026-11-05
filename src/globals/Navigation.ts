import type { Field, GlobalConfig } from 'payload'

const links = (name: string, label: string): Field => ({
  name,
  label,
  type: 'array',
  fields: [
    { name: 'label', label: '이름', type: 'text', required: true },
    { name: 'url', label: '주소', type: 'text', required: true },
  ],
})

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: '메뉴',
  admin: { group: '설정' },
  access: { read: () => true },
  fields: [links('header', '상단 메뉴'), links('footer', '하단 메뉴')],
}

// Menus used until the navigation global is filled (the seed writes the same lists).
export const HEADER_LINKS = [
  { label: '영양소', url: '/nutrients' },
  { label: '몸 고민', url: '/body' },
  { label: '증상', url: '/symptoms' },
  { label: '생애주기', url: '/life' },
  { label: '건강 정보', url: '/health' },
]

export const FOOTER_LINKS = [
  { label: '사이트 소개', url: '/about' },
  { label: '편집 기준', url: '/editorial' },
  { label: '문의', url: '/contact' },
  { label: '개인정보처리방침', url: '/privacy' },
  { label: '이용약관', url: '/terms' },
]
