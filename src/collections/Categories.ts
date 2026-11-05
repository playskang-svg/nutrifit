import type { CollectionConfig } from 'payload'

import { anyone, signedIn } from './access'

export const CATEGORY_SLUGS = ['symptom', 'nutrient', 'choose', 'food', 'lifestage', 'research', 'gift'] as const

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: { singular: '카테고리', plural: '카테고리' },
  admin: { useAsTitle: 'title', group: '콘텐츠' },
  access: { read: anyone, create: signedIn, update: signedIn, delete: signedIn },
  defaultSort: 'order',
  fields: [
    { name: 'title', label: '이름', type: 'text', required: true },
    {
      name: 'slug',
      label: '주소',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      validate: (value: string | null | undefined) =>
        (CATEGORY_SLUGS as readonly string[]).includes(value ?? '') || `주소는 ${CATEGORY_SLUGS.join(', ')} 중 하나여야 합니다`,
    },
    { name: 'lede', label: '소개', type: 'textarea', required: true },
    { name: 'order', label: '순서', type: 'number', defaultValue: 100 },
  ],
}
