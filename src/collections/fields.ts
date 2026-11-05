import type { Field } from 'payload'

// Fields shared by posts, nutrients and hubs.
export const primaryKeyword: Field = {
  name: 'primaryKeyword',
  label: '대표 키워드',
  type: 'text',
  required: true,
  admin: { description: '네이버에서 이 글이 노출되길 바라는 검색어 하나.' },
}

export const faq: Field = {
  name: 'faq',
  label: '자주 묻는 질문',
  type: 'array',
  fields: [
    { name: 'q', label: '질문', type: 'text', required: true },
    { name: 'a', label: '답', type: 'textarea', required: true },
  ],
}

export const sources: Field = {
  name: 'sources',
  label: '공식 출처',
  type: 'array',
  fields: [
    { name: 'label', label: '이름', type: 'text', required: true },
    { name: 'url', label: '주소', type: 'text', required: true },
    { name: 'publisher', label: '발행처', type: 'text' },
    { name: 'date', label: '발행일', type: 'text' },
  ],
}

export const keywords: Field = {
  name: 'keywords',
  label: '관련 키워드',
  type: 'textarea',
  admin: { description: '화면에는 나오지 않고 검색 메타에만 쓰입니다. 쉼표로 구분.' },
}

export const heroPhoto: Field = {
  name: 'heroPhoto',
  label: '대표 사진 키',
  type: 'text',
  admin: { description: 'photos.json의 키입니다.' },
}

export const order: Field = { name: 'order', label: '순서', type: 'number', defaultValue: 100 }
