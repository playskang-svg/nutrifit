import type { CollectionConfig } from 'payload'

import { anyone, signedIn } from './access'

// Labels double as the card badge. 일반의약품 is never a pick (약사법: no online sale).
export const PICK_KINDS = [
  { label: '건강기능식품', value: 'supplement' },
  { label: '의약외품', value: 'quasiDrug' },
  { label: '의료기기', value: 'device' },
  { label: '기능성화장품', value: 'cosmetic' },
  { label: '생활용품', value: 'gear' },
  { label: '식품', value: 'food' },
]

// Payload passes an array field's row count (or rows) and a relationship's id (or doc).
export const supplementOnly = (value: unknown, { siblingData }: { siblingData: { kind?: string } }) =>
  siblingData?.kind !== 'supplement' || (Array.isArray(value) ? value.length > 0 : Boolean(value)) || '건강기능식품은 꼭 넣어야 해요'

export const Picks: CollectionConfig = {
  slug: 'picks',
  labels: { singular: '추천 제품', plural: '추천 제품' },
  admin: { useAsTitle: 'name', group: '제휴', defaultColumns: ['name', 'kind', 'brand', 'nutrient', 'checkedAt'] },
  access: { read: anyone, create: signedIn, update: signedIn, delete: signedIn },
  fields: [
    {
      name: 'key',
      label: '키',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { description: '본문의 {{pick:키}}에 쓰는 이름. 예: mg-01' },
    },
    {
      name: 'kind',
      label: '종류',
      type: 'select',
      required: true,
      defaultValue: 'supplement',
      options: PICK_KINDS,
    },
    { name: 'name', label: '제품 이름', type: 'text', required: true },
    { name: 'brand', label: '브랜드', type: 'text', required: true },
    { name: 'coupangProductId', label: '쿠팡 상품 번호', type: 'text', required: true },
    { name: 'link', label: '제휴 링크', type: 'relationship', relationTo: 'affiliate-links', required: true },
    { name: 'image', label: '사진 경로', type: 'text', admin: { description: '예: /products/상품번호.webp' } },
    { name: 'nutrient', label: '영양소', type: 'relationship', relationTo: 'nutrients', validate: supplementOnly },
    { name: 'form', label: '제형', type: 'text' },
    {
      name: 'perServing',
      label: '1회 섭취량당 성분',
      type: 'array',
      validate: supplementOnly,
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
