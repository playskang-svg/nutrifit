import { lexicalEditor } from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'

// Field names follow the NF-markdown converter (scripts/lib/nfmd.mjs); fields the converter may leave '' are not required.

export const CalloutBlock: Block = {
  slug: 'callout',
  labels: { singular: '안내 상자', plural: '안내 상자' },
  fields: [
    {
      name: 'tone',
      label: '종류',
      type: 'select',
      required: true,
      options: [
        { label: '팁', value: 'tip' },
        { label: '주의', value: 'warn' },
        { label: '확인', value: 'check' },
        { label: '참고', value: 'note' },
      ],
    },
    { name: 'title', label: '제목', type: 'text' },
    // Own editor without blocks, so the box cannot nest itself.
    { name: 'body', label: '내용', type: 'richText', required: true, editor: lexicalEditor() },
  ],
}

export const CompareBlock: Block = {
  slug: 'compare',
  labels: { singular: '비교표', plural: '비교표' },
  fields: [
    { name: 'caption', label: '표 제목', type: 'text' },
    { name: 'corner', label: '왼쪽 위 칸', type: 'text' },
    {
      name: 'columns',
      label: '비교 대상',
      type: 'array',
      fields: [{ name: 'label', label: '이름', type: 'text', required: true }],
    },
    {
      name: 'rows',
      label: '항목',
      type: 'array',
      fields: [
        { name: 'label', label: '항목 이름', type: 'text', required: true },
        { name: 'cells', label: '값', type: 'array', fields: [{ name: 'value', label: '값', type: 'text' }] },
      ],
    },
  ],
}

export const PickBlock: Block = {
  slug: 'pick',
  labels: { singular: '추천 제품', plural: '추천 제품' },
  fields: [
    {
      name: 'pickId',
      label: '제품 키',
      type: 'text',
      required: true,
      admin: { description: '추천 제품의 키, 또는 search-<영양소 주소>(쿠팡 검색 버튼).' },
    },
  ],
}

export const PhotoBlock: Block = {
  slug: 'photo',
  labels: { singular: '사진', plural: '사진' },
  fields: [
    { name: 'photo', label: '사진 키', type: 'text', required: true, admin: { description: 'photos.json의 키입니다.' } },
    { name: 'caption', label: '캡션', type: 'text', required: true },
  ],
}

export const LinkCardBlock: Block = {
  slug: 'linkCard',
  labels: { singular: '연관 글 카드', plural: '연관 글 카드' },
  fields: [
    { name: 'href', label: '주소', type: 'text', required: true },
    { name: 'title', label: '제목', type: 'text', required: true },
    { name: 'summary', label: '요약', type: 'text', required: true },
    { name: 'image', label: '썸네일 경로', type: 'text' },
  ],
}

export const IntakeBarBlock: Block = {
  slug: 'intakeBar',
  labels: { singular: '섭취 기준', plural: '섭취 기준' },
  fields: [{ name: 'nutrient', label: '영양소 주소', type: 'text', required: true }],
}

export const TimelineBlock: Block = {
  slug: 'timeline',
  labels: { singular: '먹는 시간', plural: '먹는 시간' },
  fields: [{ name: 'nutrient', label: '영양소 주소', type: 'text', required: true }],
}

export const BannerBlock: Block = {
  slug: 'banner',
  labels: { singular: '쿠팡 배너', plural: '쿠팡 배너' },
  fields: [],
}

export const BODY_BLOCKS = [
  CalloutBlock,
  CompareBlock,
  PickBlock,
  PhotoBlock,
  LinkCardBlock,
  IntakeBarBlock,
  TimelineBlock,
  BannerBlock,
]
