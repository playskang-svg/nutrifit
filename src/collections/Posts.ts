import type { Access, CollectionConfig } from 'payload'

import { publishedWhere } from '@/lib/payload'

import { signedIn } from './access'
import { faq, heroPhoto, keywords, primaryKeyword, sources } from './fields'

const publishedOnly: Access = ({ req }) => (req.user ? true : publishedWhere(new Date()))

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: '글', plural: '글' },
  admin: { useAsTitle: 'title', group: '콘텐츠', defaultColumns: ['title', 'category', 'publishedAt', '_status'] },
  // A future publish date acts as scheduling; Workers have no job runner for schedulePublish.
  versions: { drafts: true },
  access: { read: publishedOnly, create: signedIn, update: signedIn, delete: signedIn },
  defaultSort: '-publishedAt',
  fields: [
    { name: 'title', label: '제목', type: 'text', required: true },
    {
      name: 'slug',
      label: '주소',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { position: 'sidebar', description: '영문 소문자와 하이픈.' },
    },
    {
      name: 'publishedAt',
      label: '공개 시각',
      type: 'date',
      required: true,
      index: true,
      defaultValue: () => new Date().toISOString(),
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayAndTime' },
        description: '미래 시각으로 발행하면 그 시각에 공개됩니다(예약 발행).',
      },
    },
    {
      name: 'category',
      label: '카테고리',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'updatedAtDisplay',
      label: '화면에 보일 수정일',
      type: 'date',
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayOnly' } },
    },
    primaryKeyword,
    { name: 'seoTitle', label: '검색 제목', type: 'text', admin: { description: '비우면 글 제목을 씁니다.' } },
    { name: 'description', label: '검색 설명', type: 'textarea', required: true },
    {
      name: 'hubs',
      label: '속한 허브',
      type: 'array',
      fields: [
        {
          name: 'kind',
          label: '종류',
          type: 'select',
          required: true,
          options: [
            { label: '영양소', value: 'nutrient' },
            { label: '몸 고민', value: 'body' },
            { label: '생활', value: 'life' },
          ],
        },
        { name: 'slug', label: '허브 주소', type: 'text', required: true },
      ],
    },
    { name: 'keyPoints', label: '핵심 요약', type: 'text', hasMany: true },
    {
      name: 'verdict',
      label: '이런 분께',
      type: 'group',
      fields: [
        { name: 'who', label: '해당되는 분', type: 'text', hasMany: true },
        { name: 'skip', label: '건너뛰어도 되는 분', type: 'text', hasMany: true },
      ],
    },
    { name: 'content', label: '본문', type: 'richText', required: true },
    faq,
    sources,
    keywords,
    heroPhoto,
    { name: 'ogImage', label: '공유 썸네일 경로', type: 'text', admin: { description: '1200×630, 예: /og/slug.png' } },
    { name: 'relatedPosts', label: '함께 볼 글', type: 'relationship', relationTo: 'posts', hasMany: true, maxDepth: 1 },
  ],
}
