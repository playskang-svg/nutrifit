import { describe, expect, it } from 'vitest'

import { JevError, classifyHubs, judgeSentences } from './jev.mjs'

// Mock client: answers[name] = { noul } per question name; records every call.
const mock = (fn) => {
  const calls = []
  const client = async (state, questions) => {
    calls.push({ state, questions })
    return fn(state, questions)
  }
  return { client, calls }
}
const noul = (map) => (_s, questions) => Object.fromEntries(Object.keys(questions).map((k) => [k, { type: 'noul', noul: map[k] ?? 0 }]))

describe('judgeSentences', () => {
  it('maps noul answers to booleans per sentence', async () => {
    const { client } = mock(noul({ disease0: 0.97, ul0: 0.1, disease1: 0.02, ul1: 0.91 }))
    const out = await judgeSentences(
      [
        { text: 'A 문장', context: 'ctx a' },
        { text: 'B 문장', context: 'ctx b' },
      ],
      { client },
    )
    expect(out.map(({ text, diseaseClaim, overUlAdvice }) => ({ text, diseaseClaim, overUlAdvice }))).toEqual([
      { text: 'A 문장', diseaseClaim: true, overUlAdvice: false },
      { text: 'B 문장', diseaseClaim: false, overUlAdvice: true },
    ])
    expect(typeof out[0].reason).toBe('string')
  })

  it('batches 20 sentences per call', async () => {
    const { client, calls } = mock(noul({}))
    const items = Array.from({ length: 45 }, (_, i) => ({ text: `s${i}`, context: 'c' }))
    const out = await judgeSentences(items, { client })
    expect(out).toHaveLength(45)
    expect(calls.map((c) => Object.keys(c.questions).length)).toEqual([40, 40, 10])
  })

  it('returns [] without calling for no items', async () => {
    const { client, calls } = mock(noul({}))
    expect(await judgeSentences([], { client })).toEqual([])
    expect(calls).toHaveLength(0)
  })

  it('wraps client failure in JevError with the original message', async () => {
    const { client } = mock(() => {
      throw new Error('HTTP 429: quota')
    })
    const err = await judgeSentences([{ text: 'x', context: 'y' }], { client }).catch((e) => e)
    expect(err).toBeInstanceOf(JevError)
    expect(err.message).toBe('HTTP 429: quota')
  })

  it('throws JevError when an answer is missing', async () => {
    const { client } = mock(() => ({}))
    await expect(judgeSentences([{ text: 'x', context: 'y' }], { client })).rejects.toBeInstanceOf(JevError)
  })
})

describe('classifyHubs', () => {
  const hubs = [
    { kind: 'body', slug: 'bone', name: '뼈' },
    { kind: 'life', slug: 'sleep', name: '수면' },
  ]
  it('returns the hubs judged true', async () => {
    const { client } = mock(noul({ hub0: 0.2, hub1: 0.88 }))
    expect(await classifyHubs({ title: 't', keywords: ['k'], body: 'b' }, hubs, { client })).toEqual([{ kind: 'life', slug: 'sleep' }])
  })
  it('wraps failure in JevError', async () => {
    const { client } = mock(() => {
      throw new Error('boom')
    })
    await expect(classifyHubs({ title: 't', keywords: [], body: 'b' }, hubs, { client })).rejects.toThrow('boom')
  })
})
