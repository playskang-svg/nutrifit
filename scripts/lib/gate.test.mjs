import { spawnSync } from 'node:child_process'
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

import { runGate, shapeIssues, updateManifest } from './gate.mjs'

const post = (over = {}) => ({
  slug: 'cold-hands',
  title: '수족냉증, 손발이 찬 이유',
  seoTitle: '수족냉증 원인',
  description: '수족냉증은 대부분 추위에 혈관이 좁아져 생기지만 색이 변하면 진료가 먼저예요. 흔한 원인과 집에서 해볼 것, 진료과를 정리했어요. 한쪽만 차갑거나 아프면 바로 병원에 가세요.',
  category: 'symptom',
  area: 'whole',
  primaryKeyword: '수족냉증',
  hubs: [{ kind: 'area', slug: 'whole' }],
  keyPoints: ['a'],
  body: '## 먼저 이것부터\n\n손발이 찬 사람은 많아요.',
  faq: [{ q: '왜 차요?', a: '혈관이 좁아져요.' }],
  sources: [{ label: 'x', url: 'https://health.kdca.go.kr/a' }],
  keywords: ['수족냉증'],
  publishedAt: '2026-11-06T09:00:00Z',
  ...over,
})
const env = { links: [], picks: new Set(['p-1']), nutrients: new Set(['zinc']), cards: new Set(['/health/a']) }
const gate = (final, draft = final, extra = {}) => runGate({ kind: 'post', draft, final, env, jev: false, ...extra })
const codes = (r) => r.issues.map((i) => i.code)

describe('shapeIssues', () => {
  it('accepts a complete post', () => expect(shapeIssues('post', post())).toEqual([]))
  it('flags missing fields, bad slug, bad date, symptom without area', () => {
    const out = shapeIssues('post', post({ slug: 'Bad_Slug', keywords: undefined, publishedAt: 'soon', area: undefined }))
    expect(out.map((i) => i.where).sort()).toEqual(['area', 'keywords', 'publishedAt', 'slug'])
  })
  it('requires hub kind body|life|area', () => {
    const hub = { kind: 'nutrient', slug: 'a', name: 'n', summary: 's', primaryKeyword: 'k', body: 'b', nutrients: [], posts: [], faq: [], sources: [], keywords: [] }
    expect(shapeIssues('hub', hub).map((i) => i.where)).toEqual(['kind'])
  })
})

describe('runGate', () => {
  it('stops at shape errors', async () => {
    const r = await gate(post({ title: undefined }))
    expect(r.ok).toBe(false)
    expect(codes(r)).toEqual(['SHAPE'])
  })

  it('reports FACTS_CHANGED for body and faq numbers', async () => {
    const r = await gate(post({ body: '## a\n\n하루 300mg 드세요.', faq: [{ q: 'q', a: '2번이에요.' }] }), post({ body: '## a\n\n하루 200mg 드세요.', faq: [{ q: 'q', a: '3번이에요.' }] }))
    expect(r.issues.filter((i) => i.code === 'FACTS_CHANGED').map((i) => i.where)).toEqual(['body', 'faq[0].a'])
    expect(r.ok).toBe(false)
  })

  it('reports FACTS_CHANGED when humanize drops an FAQ item', async () => {
    const d = post({ faq: [{ q: 'q', a: '3번 먹어요.' }, { q: 'q2', a: '하루 2알이에요.' }] })
    const r = await gate(post({ faq: [{ q: 'q', a: '3번 먹어요.' }] }), d)
    expect(r.issues.filter((i) => i.code === 'FACTS_CHANGED').map((i) => i.where)).toEqual(['faq[1].a'])
  })

  it('reports CONVERT with the line for an unknown directive', async () => {
    const r = await gate(post({ body: '## a\n\n문장이에요.\n\n{{pick:nope}}' }))
    expect(r.issues.find((i) => i.code === 'CONVERT')).toMatchObject({ where: 'body:5', severity: 'error' })
  })

  it('accepts convention photo keys and cards, and collects photos once', async () => {
    const body = '## a\n\n{{photo:post-cold-hands-1|손을 비비는 모습}}\n\n{{photo:post-cold-hands-1|같은 사진}}\n\n{{card:/health/a}}\n\n{{pick:search-zinc}}'
    const r = await gate(post({ body }))
    expect(codes(r)).not.toContain('CONVERT')
    expect(r.photos).toEqual([{ key: 'post-cold-hands-1', caption: '손을 비비는 모습' }])
  })

  it('rejects a photo key outside the convention', async () => {
    const r = await gate(post({ body: '## a\n\n{{photo:random|캡션}}' }))
    expect(codes(r)).toContain('CONVERT')
  })

  it('runs Jev on suspects unless skipped', async () => {
    const body = '## a\n\n이 영양제는 수족냉증을 치료해요.'
    const client = async (_s, q) => Object.fromEntries(Object.keys(q).map((k) => [k, { type: 'noul', noul: 0 }]))
    const withJev = await gate(post({ body }), post({ body }), { jev: { client } })
    expect(codes(withJev)).not.toContain('FORBIDDEN_CLAIM')
  })
})

describe('Jev verdicts', () => {
  const body = '## a\n\n이 영양제는 수족냉증을 치료해요.'
  it('keeps FORBIDDEN_CLAIM as an error on a positive verdict', async () => {
    const client = async (_s, q) => Object.fromEntries(Object.keys(q).map((k) => [k, { type: 'noul', noul: 0.99 }]))
    const r = await gate(post({ body }), post({ body }), { jev: { client } })
    expect(r.issues.find((i) => i.code === 'FORBIDDEN_CLAIM')).toMatchObject({ severity: 'error' })
    expect(r.ok).toBe(false)
  })
  it('reports JEV_FAILED when the client throws', async () => {
    const client = async () => {
      throw new Error('HTTP 500')
    }
    const r = await gate(post({ body }), post({ body }), { jev: { client } })
    expect(codes(r)).toContain('JEV_FAILED')
    expect(codes(r)).not.toContain('FORBIDDEN_CLAIM')
    expect(r.ok).toBe(false)
  })
})

describe('updateManifest', () => {
  const tmp = () => path.join(mkdtempSync(path.join(tmpdir(), 'gate-')), 'drafts/_photos.jsonl')
  const lines = (f) => readFileSync(f, 'utf8').split('\n').filter(Boolean)
  it('replaces one slug and keeps the others', () => {
    const f = tmp()
    updateManifest(f, 'a', [{ key: 'post-a-1', caption: 'x' }, { key: 'post-a-2', caption: 'y' }])
    updateManifest(f, 'b', [{ key: 'post-b-1', caption: 'z' }])
    updateManifest(f, 'a', [{ key: 'post-a-1', caption: 'new' }])
    expect(lines(f).map((l) => JSON.parse(l))).toEqual([
      { slug: 'b', key: 'post-b-1', caption: 'z' },
      { slug: 'a', key: 'post-a-1', caption: 'new' },
    ])
  })
  it('skips a corrupt line with a warn issue', () => {
    const f = tmp()
    updateManifest(f, 'a', [{ key: 'post-a-1', caption: 'x' }])
    writeFileSync(f, readFileSync(f, 'utf8') + '{broken\n')
    const warns = updateManifest(f, 'b', [{ key: 'post-b-1', caption: 'z' }])
    expect(warns).toEqual([expect.objectContaining({ code: 'MANIFEST', severity: 'warn' })])
    expect(lines(f)).toHaveLength(3)
  })
})

describe('gate CLI', () => {
  const cli = (args) => spawnSync(process.execPath, ['scripts/gate.mjs', ...args], { encoding: 'utf8' })
  it('reports one INPUT error naming missing --work inputs', () => {
    const dir = mkdtempSync(path.join(tmpdir(), 'gate-cli-'))
    const f = path.join(dir, 'd.json')
    writeFileSync(f, JSON.stringify(post()))
    const r = cli(['--kind', 'post', '--draft', f, '--final', f, '--no-jev', '--work', path.join(dir, 'nope')])
    const out = JSON.parse(r.stdout)
    expect(r.status).toBe(1)
    expect(out.issues).toHaveLength(1)
    expect(out.issues[0]).toMatchObject({ code: 'INPUT', severity: 'error' })
    for (const n of ['briefs/hub-list.json', 'briefs/link-targets.json', 'coupang/picks.json']) expect(out.issues[0].text).toContain(n)
  })
})
