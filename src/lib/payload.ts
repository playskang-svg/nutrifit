import { getPayload, type Where } from 'payload'

// Imported lazily so unit tests can load this module without booting the Cloudflare bindings.
export const getClient = async () => getPayload({ config: (await import('@payload-config')).default })

export const SITE_URL = 'https://nutrifit.kr'
// The search term this site owns on Naver, so it stays in the title of every page.
export const SITE_NAME = '뉴트리핏'
export const DISCLOSURE = '이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.'
export const MEDICAL_NOTE =
  '이 글은 일반적인 건강 정보이며 진단이나 치료를 대신하지 않습니다. 복용 중인 약이 있거나 질환이 있다면 의사·약사와 먼저 상의하세요.'

export const publishedWhere = (now: Date): Where => ({
  and: [{ _status: { equals: 'published' } }, { publishedAt: { less_than_equal: now.toISOString() } }],
})

// Media URLs already carry serverURL in production and are relative elsewhere.
export const absoluteUrl = (url: string): string => (url.startsWith('http') ? url : `${SITE_URL}${url}`)

export const SITE_TITLE = `${SITE_NAME} | 영양제·건강 정보`
export const SITE_DESCRIPTION = '영양제 성분과 섭취 기준을 공식 자료로 확인하고, 내게 맞는 제품 고르는 법을 정리하는 건강 정보 사이트입니다.'
