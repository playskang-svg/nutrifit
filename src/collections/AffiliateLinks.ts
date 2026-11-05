import type { CollectionConfig } from 'payload'

import { anyone, signedIn } from './access'

export const COUPANG_PARTNER_ID = 'AF8819972'

export const validateCoupangUrl = (url: string): true | string =>
  /^https:\/\/link\.coupang\.com\/a\/[A-Za-z0-9]+$/.test(url) || '쿠팡 단축 링크(link.coupang.com/a/…)만 넣을 수 있습니다'

export const AffiliateLinks: CollectionConfig = {
  slug: 'affiliate-links',
  labels: { singular: '제휴 링크', plural: '제휴 링크' },
  admin: { useAsTitle: 'name', group: '제휴', defaultColumns: ['name', 'slug', 'url', 'issuedAt'] },
  access: { read: anyone, create: signedIn, update: signedIn, delete: signedIn },
  fields: [
    { name: 'name', label: '이름', type: 'text', required: true },
    { name: 'slug', label: '식별자', type: 'text', required: true, unique: true, index: true },
    {
      name: 'url',
      label: '쿠팡 단축 링크',
      type: 'text',
      required: true,
      validate: (value: string | null | undefined) => validateCoupangUrl(value ?? ''),
    },
    {
      name: 'target',
      label: '연결 대상',
      type: 'text',
      admin: { description: '상품 주소 또는 검색어. 링크를 발급할 때 넣은 값입니다.' },
    },
    {
      name: 'lptag',
      label: '파트너 ID',
      type: 'text',
      defaultValue: COUPANG_PARTNER_ID,
      validate: (value: string | null | undefined) =>
        !value || value === COUPANG_PARTNER_ID || `${COUPANG_PARTNER_ID} 계정으로 발급한 링크만 씁니다`,
    },
    { name: 'issuedAt', label: '발급일', type: 'date', admin: { date: { pickerAppearance: 'dayOnly' } } },
  ],
}
