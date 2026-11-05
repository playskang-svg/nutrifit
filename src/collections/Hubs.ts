import type { CollectionConfig } from 'payload'

import { anyone, signedIn } from './access'
import { faq, heroPhoto, keywords, order, primaryKeyword, sources } from './fields'

export const Hubs: CollectionConfig = {
  slug: 'hubs',
  labels: { singular: '허브', plural: '허브' },
  admin: { useAsTitle: 'name', group: '콘텐츠', defaultColumns: ['name', 'kind', 'order'] },
  access: { read: anyone, create: signedIn, update: signedIn, delete: signedIn },
  defaultSort: 'order',
  fields: [
    {
      name: 'kind',
      label: '종류',
      type: 'select',
      required: true,
      options: [
        { label: '몸 고민', value: 'body' },
        { label: '생활', value: 'life' },
        { label: '증상 부위', value: 'area' },
      ],
    },
    { name: 'name', label: '이름', type: 'text', required: true },
    { name: 'slug', label: '주소', type: 'text', required: true, index: true },
    { name: 'summary', label: '한 줄 소개', type: 'textarea', required: true },
    primaryKeyword,
    { name: 'content', label: '본문', type: 'richText' },
    { name: 'nutrients', label: '관련 영양소', type: 'relationship', relationTo: 'nutrients', hasMany: true },
    { name: 'posts', label: '관련 글', type: 'relationship', relationTo: 'posts', hasMany: true },
    { name: 'picks', label: '추천 제품', type: 'relationship', relationTo: 'picks', hasMany: true },
    faq,
    sources,
    keywords,
    heroPhoto,
    { name: 'heroVideo', label: '대표 영상 키', type: 'text' },
    order,
  ],
}
