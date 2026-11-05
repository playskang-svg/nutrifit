import { describe, expect, it } from 'vitest'

import { checkDoc, loadRules } from './check.mjs'

const rules = loadRules()
// Three endings in rotation (해요·든요·되죠), so the filler never trips SAME_ENDING_X3.
const PARA = '라벨에서 하루 함량부터 확인해요. 같은 성분이라도 제품마다 양이 다르거든요. 헷갈리면 약사와 상의하면 되죠.'
const base = (extra = {}) => ({
  kind: 'post',
  category: 'nutrient',
  title: '마그네슘 하루 권장량, 라벨에서 먼저 볼 것',
  seoTitle: '마그네슘 하루 권장량 확인법',
  description:
    '마그네슘 하루 권장량은 나이와 성별에 따라 달라요. 라벨의 하루 함량을 섭취기준과 견주는 순서와 상한을 넘기기 쉬운 경우를 고르는 기준과 함께 살펴봐요. 겹쳐 먹는 제품이 있다면 꼭 확인하세요.',
  primaryKeyword: '마그네슘 하루 권장량',
  body: `## 하루에 얼마나 필요할까\n\n${Array(50).fill(PARA).join('\n\n')}`,
  faq: [
    { q: '마그네슘은 언제 먹나요?', a: '식사 뒤에 먹는 편이 속이 편해요.' },
    { q: '다른 영양제와 같이 먹어도 되나요?', a: '라벨의 하루 함량을 합쳐 보세요.' },
    { q: '먹는 약이 있으면요?', a: '의사·약사와 상의하세요.' },
  ],
  sources: [{ label: '건강기능식품의 기준 및 규격', url: 'https://www.mfds.go.kr/brd/m_211/view.do?seq=14973' }],
  ...extra,
})
const withBody = (text, extra = {}, r = rules) => checkDoc(base({ ...extra, body: `${base().body}\n\n${text}` }), r)
const codes = (issues) => issues.map((i) => i.code)

describe('checkDoc', () => {
  it('passes a clean post', () => {
    expect(checkDoc(base(), rules)).toEqual([])
  })

  it('flags the brief cases', () => {
    expect(codes(withBody('마그네슘이 불면증을 치료해요.'))).toContain('FORBIDDEN_CLAIM')
    expect(codes(withBody('직접 먹어보니 좋더라고요.'))).toContain('EXPERIENCE_TONE')
    expect(codes(withBody('약사가 추천하는 루테인을 골랐어요.'))).toContain('PROFESSIONAL_ENDORSE')
    expect(codes(withBody('하나예요. 둘이죠. 셋이거든요. 넷이에요.'))).toEqual(['PARA_TOO_LONG'])
    const over = withBody('비타민D 5,000IU를 매일 드세요.')
    expect(over).toEqual([expect.objectContaining({ code: 'OVER_UL', severity: 'warn' })])
  })

  it('uses the 2025 phosphorus UL of 3,500 mg', () => {
    expect(rules.ul.items.phosphorus).toMatchObject({ ul: 3500, edition: '2025' })
    // "인" is one syllable and skipped by name matching, so test through a longer alias.
    const alias = { ...rules, ul: { ...rules.ul, items: { ...rules.ul.items, phosphorus: { ...rules.ul.items.phosphorus, names: ['인산'] } } } }
    expect(withBody('인산 3,400mg을 매일 드세요.', {}, alias)).toEqual([])
    expect(withBody('인산 3,600mg을 매일 드세요.', {}, alias)).toEqual([expect.objectContaining({ code: 'OVER_UL' })])
  })

  it('accepts notice claims quoted word for word', () => {
    expect(withBody("식약처 고시는 칼슘의 기능성을 '골다공증 발생 위험 감소에 도움을 줌'으로 정했어요.")).toEqual([])
    expect(withBody("프로바이오틱스의 인정 기능성에는 '장 건강에 도움을 줄 수 있음'이 있어요.")).toEqual([])
  })

  it('flags cure words only when a product is the subject', () => {
    for (const s of ['이 찜질기로 무릎 통증을 치료하세요.', '홍삼으로 감기를 완치할 수 있어요.', '두통에 특효인 영양제예요.']) {
      expect(codes(withBody(s)), s).toContain('FORBIDDEN_CLAIM')
    }
    expect(withBody('증상이 심하면 병원 치료가 필요할 수 있어요.')).toEqual([])
    expect(withBody('암 치료 중이라면 영양제를 먹기 전에 의사와 상의하세요.')).toEqual([])
    expect(withBody('비염에 좋은 유산균을 찾는 분이 많아요.').map((i) => i.code)).toEqual(['FORBIDDEN_CLAIM'])
  })

  it('checks Coupang short links against the links list', () => {
    expect(codes(withBody('link.coupang.com/a/zzz'))).toContain('BAD_LINK')
    const links = [{ slug: 'p-1', url: 'https://link.coupang.com/a/zzz', lptag: 'AF8819972' }]
    expect(codes(withBody('link.coupang.com/a/zzz', {}, { ...rules, links }))).not.toContain('BAD_LINK')
    const wrong = [{ ...links[0], lptag: 'AF5563346' }]
    expect(codes(withBody('link.coupang.com/a/zzz', {}, { ...rules, links: wrong }))).toContain('BAD_LINK')
  })

  it('reads endings by their last two syllables', () => {
    expect(codes(withBody('라벨을 확인해요. 함량이 필요해요. 시간이 중요해요.'))).toEqual(['SAME_ENDING_X3'])
    expect(withBody('라벨을 확인해요. 그거면 돼요. 시간도 중요해요.')).toEqual([])
    expect(codes(withBody('라벨이 있어요. 함량도 있어요. 주의 문구도 있어요.'))).toEqual(['SAME_ENDING_X3'])
  })

  it('matches the primary keyword in the first 25 characters, ignoring spaces', () => {
    expect(checkDoc(base({ title: '마그네슘하루 권장량, 라벨에서 볼 것' }), rules)).toEqual([])
    const late = checkDoc(base({ title: '라벨을 처음 보는 분이 헷갈리는 숫자, 마그네슘 하루 권장량' }), rules)
    expect(late).toEqual([expect.objectContaining({ code: 'TITLE_KEYWORD', where: 'title' })])
  })

  it('ignores food content per 100g in OVER_UL', () => {
    expect(withBody('호박씨 100g당 마그네슘은 535mg이에요.')).toEqual([])
    expect(withBody('말린 미역은 100g 기준 칼슘이 2,500mg을 넘어요.')).toEqual([])
    expect(codes(withBody('마그네슘 보충은 400~600mg이 적당해요.'))).toEqual(['OVER_UL'])
  })

  it('covers length, FAQ, source and description rules', () => {
    expect(codes(checkDoc(base({ body: '## 짧은 글\n\n짧아요.' }), rules))).toEqual(['BODY_TOO_SHORT'])
    expect(codes(checkDoc(base({ faq: base().faq.slice(0, 2) }), rules))).toEqual(['FAQ_TOO_FEW'])
    expect(codes(checkDoc(base({ sources: [] }), rules))).toEqual(['NO_SOURCE'])
    const home = checkDoc(base({ sources: [{ label: '식품안전나라', url: 'https://www.foodsafetykorea.go.kr/' }] }), rules)
    expect(home).toEqual([expect.objectContaining({ code: 'NO_SOURCE', where: 'sources[0]' })])
    expect(codes(checkDoc(base({ description: '너무 짧아요.' }), rules))).toEqual(['DESC_LENGTH'])
  })

  it('flags raw URLs, hedges, celebrities and iHerb', () => {
    expect(codes(withBody('자세한 내용은 https://example.com 에서 보세요.'))).toEqual(['RAW_URL'])
    expect(withBody('[마그네슘](/nutrients/magnesium)과 [홈](https://nutrifit.kr/)은 괜찮아요.')).toEqual([])
    const hedge = '흡수가 잘 된다고 알려져 있습니다.'
    expect(codes(withBody(`${hedge}\n\n${hedge}`))).toEqual([])
    expect(codes(withBody(`${hedge}\n\n${PARA}\n\n${hedge}\n\n${PARA}\n\n${hedge}`))).toEqual(['HEDGE_OVERUSE'])
    expect(codes(withBody('박미선 갱년기 영양제를 찾는 분이 있어요.'))).toEqual(['CELEB_NAME'])
    expect(codes(withBody('아이허브에서 사는 분도 있어요.'))).toEqual(['IHERB'])
  })

  it('keeps drug brands and purchase pushes out', () => {
    expect(codes(withBody('두통엔 타이레놀이 잘 들어요.'))).toEqual(['DRUG_MENTION'])
    expect(codes(withBody('소화가 안 되면 이 약을 사세요.'))).toEqual(['DRUG_MENTION'])
    expect(withBody('진통제가 필요하면 아세트아미노펜 계열을 약사와 상의해 고르세요.')).toEqual([])
  })

  it('finds placeholders left in title, body, FAQ and sources', () => {
    expect(codes(withBody('A는 하루 〈가격A〉원이에요.'))).toEqual(['PLACEHOLDER'])
    expect(codes(checkDoc(base({ title: '마그네슘 하루 권장량 〈연도〉 기준' }), rules))).toEqual(['PLACEHOLDER'])
    const faq = [...base().faq.slice(0, 2), { q: '먹는 약이 있으면요?', a: '〈출처〉를 보세요.' }]
    expect(codes(checkDoc(base({ faq }), rules))).toEqual(['PLACEHOLDER'])
    const sources = [{ label: '〈연구자·학술지·연도〉', url: 'https://www.mfds.go.kr/brd/m_211/view.do?seq=14973' }]
    expect(codes(checkDoc(base({ sources }), rules))).toEqual(['PLACEHOLDER'])
  })

  it('puts the hospital box before any pick in symptom posts', () => {
    const warn = '::: warn 이럴 땐 바로 병원\n- 갑자기 생긴 극심한 두통\n- 이런 신호가 있으면 119에 전화하세요.\n:::'
    const symptom = (body, extra = {}) => checkDoc(base({ category: 'symptom', body: `## 머리가 아플 때\n\n${body}\n\n${base().body}`, ...extra }), rules)
    expect(symptom(`${warn}\n\n{{pick:auto-magnesium}}`)).toEqual([])
    expect(codes(symptom(`{{pick:auto-magnesium}}\n\n${warn}`))).toEqual(['RED_FLAG_FIRST'])
    expect(codes(symptom('{{pick:auto-magnesium}}'))).toEqual(['RED_FLAG_FIRST'])
    expect(codes(symptom(`${warn}\n\n{{pick:auto-magnesium}}`, { redFlag: 'urgent' }))).toEqual(['URGENT_NO_PICK'])
    expect(symptom(warn, { redFlag: 'urgent' })).toEqual([])
  })

  it('warns about the draft-only productNeeds field', () => {
    const issues = checkDoc(base({ productNeeds: [] }), rules)
    expect(issues).toEqual([expect.objectContaining({ code: 'PRODUCT_NEEDS_IN_DATA', severity: 'warn' })])
  })

  it('treats hubs without post-only rules', () => {
    const hub = { kind: 'hub', name: '눈', primaryKeyword: '눈 영양제', body: '## 눈이 피곤할 때\n\n화면을 오래 보면 눈이 말라요.', faq: base().faq, sources: base().sources }
    expect(checkDoc(hub, rules)).toEqual([])
  })
})
