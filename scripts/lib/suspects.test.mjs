import { describe, expect, it } from 'vitest'

import { judgeSuspects } from './suspects.mjs'

const noul = (map) => async (_s, questions) => Object.fromEntries(Object.keys(questions).map((k) => [k, { type: 'noul', noul: map[k] ?? 0 }]))
const doc = { title: 't', body: '첫 문단\n\n둘째 문단 S1 포함' }
const issues = [
  { code: 'FORBIDDEN_CLAIM', severity: 'error', where: 'body:1', text: 'S1 — x', sentence: 'S1' },
  { code: 'OVER_UL', severity: 'warn', where: 'body:2', text: 'u', sentence: 'S2' },
  { code: 'NO_SOURCE', severity: 'error', where: '-', text: 'other' },
]

describe('judgeSuspects', () => {
  it('passes issues through untouched when there are no suspects', async () => {
    const other = [issues[2]]
    expect(await judgeSuspects(doc, other, { client: noul({}) })).toBe(other)
  })

  it('drops suspects Jev rejects', async () => {
    const out = await judgeSuspects(doc, issues, { client: noul({}) })
    expect(out.map((i) => i.code)).toEqual(['NO_SOURCE'])
  })

  it('keeps confirmed suspects as errors', async () => {
    const out = await judgeSuspects(doc, issues, { client: noul({ disease0: 0.99, ul1: 0.99 }) })
    expect(out.map((i) => [i.code, i.severity])).toEqual([['NO_SOURCE', 'error'], ['FORBIDDEN_CLAIM', 'error'], ['OVER_UL', 'error']])
  })

  it('turns a Jev failure into one JEV_FAILED error', async () => {
    const client = async () => {
      throw new Error('HTTP 500')
    }
    const out = await judgeSuspects(doc, issues, { client })
    expect(out).toEqual([issues[2], { code: 'JEV_FAILED', severity: 'error', where: '-', text: 'HTTP 500' }])
  })

  it('sends the joined nutrient body as context', async () => {
    let state = ''
    const client = async (s, q) => {
      state = s
      return noul({})(s, q)
    }
    const n = { title: '마그네슘', deficiency: '부족 문단', excess: '과다 문단 S1 포함' }
    await judgeSuspects(n, [issues[0]], { client })
    expect(state).toContain('과다 문단 S1 포함')
  })
})
