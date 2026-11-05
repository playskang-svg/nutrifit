import type { CollectionConfig } from 'payload'

import { anyone, signedIn } from './access'

export const Picks: CollectionConfig = {
  slug: 'picks',
  labels: { singular: '추천 제품', plural: '추천 제품' },
  admin: { useAsTitle: 'name', group: '제휴', defaultColumns: ['name', 'brand', 'nutrient', 'checkedAt'] },
  access: { read: anyone, create: signedIn, update: signedIn, delete: signedIn },
  fields: [
    { name: 'name', label: '제품 이름', type: 'text', required: true },
    { name: 'brand', label: '브랜드', type: 'text', required: true },
    { name: 'coupangProductId', label: '쿠팡 상품 번호', type: 'text', required: true },
    { name: 'link', label: '제휴 링크', type: 'relationship', relationTo: 'affiliate-links', required: true },
    { name: 'image', label: '사진 경로', type: 'text', admin: { description: '예: /products/상품번호.webp' } },
    { name: 'nutrient', label: '영양소', type: 'relationship', relationTo: 'nutrients' },
    { name: 'form', label: '제형', type: 'text' },
    {
      name: 'perServing',
      label: '1회 섭취량당 성분',
      type: 'array',
      fields: [
        { name: 'name', label: '성분', type: 'text', required: true },
        { name: 'amount', label: '함량', type: 'number', required: true },
        { name: 'unit', label: '단위', type: 'text', required: true },
      ],
    },
    { name: 'isHealthFunctionalFood', label: '건강기능식품', type: 'checkbox', defaultValue: false },
    { name: 'reason', label: '고른 이유', type: 'textarea' },
    { name: 'caution', label: '주의할 점', type: 'textarea' },
    {
      name: 'price',
      label: '가격',
      type: 'group',
      fields: [
        { name: 'value', label: '금액(원)', type: 'number' },
        {
          name: 'unit',
          label: '기준',
          type: 'select',
          options: [
            { label: '하루', value: 'day' },
            { label: '1통', value: 'pack' },
          ],
        },
        { name: 'collectedAt', label: '확인일', type: 'date', admin: { date: { pickerAppearance: 'dayOnly' } } },
      ],
    },
    { name: 'checkedAt', label: '정보 확인일', type: 'date', admin: { date: { pickerAppearance: 'dayOnly' } } },
  ],
}
