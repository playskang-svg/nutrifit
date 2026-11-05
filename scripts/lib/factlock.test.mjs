import { describe, expect, it } from 'vitest'

import { factTokens, sameFacts } from './factlock.mjs'

describe('factTokens', () => {
  it('normalizes numbers with units and keeps directive lines whole', () => {
    const text = '비타민D 5,000 IU는 상한 100μg을 넘어요(2025 기준).\n\n{{pick:auto-vitamin-d}}\n\n::: warn 이럴 땐 바로 병원\n- 하루 1,000mg\n:::'
    expect(factTokens(text)).toEqual({
      numbers: ['5000IU', '100μg', '2025', '1000mg'],
      directives: ['{{pick:auto-vitamin-d}}', '::: warn 이럴 땐 바로 병원', ':::'],
    })
  })

  it('treats the micro sign and the Greek mu alike', () => {
    expect(factTokens('10µg').numbers).toEqual(['10μg'])
  })
})

describe('sameFacts', () => {
  it('ignores word order around unchanged facts', () => {
    expect(sameFacts('하루 350mg {{pick:mg-01}}', '350mg씩 하루에 {{pick:mg-01}}').ok).toBe(true)
  })

  it('reports changed numbers', () => {
    expect(sameFacts('350mg', '300mg')).toEqual({ ok: false, missing: ['350mg'], added: ['300mg'] })
  })

  it('counts repeats and directives', () => {
    expect(sameFacts('10mg와 10mg', '10mg').missing).toEqual(['10mg'])
    expect(sameFacts('{{card:/a}}\n\n{{card:/b}}', '{{card:/a}}')).toEqual({ ok: false, missing: ['{{card:/b}}'], added: [] })
  })
})
