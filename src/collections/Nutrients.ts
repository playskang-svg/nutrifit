import type { CollectionConfig } from 'payload'

import { anyone, signedIn } from './access'
import { faq, heroPhoto, keywords, order, primaryKeyword, sources } from './fields'

export const NUTRIENT_GROUPS = [
  { label: '비타민', value: 'vitamin' },
  { label: '미네랄', value: 'mineral' },
  { label: '지방산', value: 'fatty-acid' },
  { label: '장 건강', value: 'gut' },
  { label: '아미노산·단백질', value: 'amino-protein' },
  { label: '눈', value: 'eye' },
  { label: '관절·피부', value: 'joint-skin' },
  { label: '허브·식물성', value: 'herbal' },
  { label: '기타', value: 'etc' },
]

export const Nutrients: CollectionConfig = {
  slug: 'nutrients',
  labels: { singular: '영양소', plural: '영양소' },
  admin: { useAsTitle: 'name', group: '영양 데이터', defaultColumns: ['name', 'group', 'order'] },
  access: { read: anyone, create: signedIn, update: signedIn, delete: signedIn },
  defaultSort: 'order',
  fields: [
    { name: 'name', label: '이름', type: 'text', required: true },
    { name: 'slug', label: '주소', type: 'text', required: true, unique: true, index: true },
    { name: 'aliases', label: '다른 이름', type: 'text', hasMany: true },
    { name: 'group', label: '분류', type: 'select', required: true, options: NUTRIENT_GROUPS },
    { name: 'summary', label: '한 줄 소개', type: 'textarea', required: true },
    primaryKeyword,
    {
      name: 'officialClaims',
      label: '인정된 기능성',
      type: 'array',
      fields: [
        { name: 'text', label: '문구', type: 'text', required: true },
        { name: 'source', label: '출처', type: 'text', required: true },
      ],
    },
    {
      name: 'intake',
      label: '섭취 기준',
      type: 'group',
      fields: [
        {
          name: 'edition',
          label: '기준 개정판',
          type: 'select',
          options: [
            { label: '2025', value: '2025' },
            { label: '2020', value: '2020' },
          ],
        },
        { name: 'unit', label: '단위', type: 'text' },
        {
          name: 'rows',
          label: '연령별 기준',
          type: 'array',
          fields: [
            {
              name: 'sex',
              label: '성별',
              type: 'select',
              required: true,
              options: [
                { label: '남', value: 'M' },
                { label: '여', value: 'F' },
                { label: '공통', value: 'all' },
              ],
            },
            { name: 'age', label: '연령', type: 'text', required: true },
            { name: 'rni', label: '권장섭취량', type: 'number' },
            { name: 'ai', label: '충분섭취량', type: 'number' },
            { name: 'ul', label: '상한섭취량', type: 'number' },
          ],
        },
        { name: 'pregnancyNote', label: '임신·수유 안내', type: 'textarea' },
      ],
    },
    { name: 'deficiency', label: '부족하면', type: 'richText' },
    { name: 'excess', label: '넘치면', type: 'richText' },
    { name: 'timing', label: '먹는 시간', type: 'richText' },
    {
      name: 'interactions',
      label: '함께 먹을 때',
      type: 'group',
      fields: [
        { name: 'good', label: '같이 먹으면 좋은 것', type: 'text', hasMany: true },
        { name: 'caution', label: '조심할 것', type: 'text', hasMany: true },
      ],
    },
    {
      name: 'foods',
      label: '음식 속 함량',
      type: 'array',
      fields: [
        { name: 'name', label: '음식', type: 'text', required: true },
        { name: 'value', label: '함량', type: 'number' },
        { name: 'unit', label: '단위', type: 'text' },
        { name: 'url', label: '출처 주소', type: 'text', required: true },
        { name: 'source', label: '출처 이름', type: 'text', required: true },
      ],
    },
    { name: 'howToChoose', label: '고르는 법', type: 'richText' },
    faq,
    sources,
    keywords,
    heroPhoto,
    { name: 'picks', label: '추천 제품', type: 'relationship', relationTo: 'picks', hasMany: true },
    order,
  ],
}
