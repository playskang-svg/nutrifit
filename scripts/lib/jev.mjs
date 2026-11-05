// Jev (TypeSafe System One) as the binding true/false judge. typesafe-sdk is Python-only, so this mirrors its wire contract:
// POST /v1/systemone (typesafe_sdk/_core/constants.py SYSTEM_ONE_PATH), base https://api.typesafe.ai, model jev-latest
// (typesafe_sdk/constants.py DEFAULT_BASE_URL / DEFAULT_MODEL, env TYPESAFE_BASE_URL / TYPESAFE_DEFAULT_MODEL). Any failure becomes a JevError; callers record it, never guess an answer.
import { existsSync, readFileSync } from 'node:fs'

const DEFAULT_ENV_FILE = 'C:/Window_DEV/github/jev-systemone/.env'
const BATCH = 20 // sentences per call = 40 noul questions
const THRESHOLD = 0.5

export class JevError extends Error {
  constructor(message) {
    super(message)
    this.name = 'JevError'
  }
}

// process.env first, else the .env file (JEV_ENV_FILE overrides the path). The key is never logged.
const setting = (name) => {
  if (process.env[name]) return process.env[name]
  const file = process.env.JEV_ENV_FILE ?? DEFAULT_ENV_FILE
  if (!existsSync(file)) return ''
  for (const line of readFileSync(file, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.*?)\s*$/)
    if (m && m[1] === name) return m[2].replace(/^["']|["']$/g, '')
  }
  return ''
}

// client(state, questions) -> { [name]: { type, noul } }. Tests pass a mock.
const restClient = async (state, questions) => {
  const key = setting('TYPESAFE_API_KEY')
  if (!key) throw new JevError('TYPESAFE_API_KEY is empty (env or .env)')
  const base = (setting('TYPESAFE_BASE_URL') || 'https://api.typesafe.ai').replace(/\/$/, '')
  const res = await fetch(`${base}/v1/systemone`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ state, model: setting('TYPESAFE_DEFAULT_MODEL') || 'jev-latest', questions }),
  })
  const text = await res.text()
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${text.slice(0, 200)}`)
  return JSON.parse(text).answers
}

const ask = async (client, state, questions) => {
  let answers
  try {
    answers = await client(state, questions)
  } catch (e) {
    throw e instanceof JevError ? e : new JevError(e?.message ?? String(e))
  }
  for (const name of Object.keys(questions)) {
    if (typeof answers?.[name]?.noul !== 'number') throw new JevError(`Jev answer missing for ${name}`)
  }
  return answers
}

const DISEASE = '대상 문장이 영양제·성분이 질병을 예방·치료·완화한다고 말하거나 의약품 효능을 암시하는 표현인가. 식약처 고시 기능성 문구를 그대로 옮긴 것은 아니다.'
const OVER_UL = '대상 문장이 상한섭취량(UL)을 넘는 용량을 권하거나 그렇게 먹어도 된다고 말하는가. 상한을 넘으면 주의하라는 안내는 아니다.'

export async function judgeSentences(items, { client = restClient } = {}) {
  const out = []
  for (let i = 0; i < items.length; i += BATCH) {
    const chunk = items.slice(i, i + BATCH)
    const questions = {}
    chunk.forEach((_, j) => {
      questions[`disease${j}`] = { type: 'noul', instructions: `${DISEASE} 번호 ${j}번 문장만 본다.` }
      questions[`ul${j}`] = { type: 'noul', instructions: `${OVER_UL} 번호 ${j}번 문장만 본다.` }
    })
    const state = chunk.map((it, j) => `[${j}] 문장: ${it.text}\n문맥: ${it.context}`).join('\n\n')
    const answers = await ask(client, state, questions)
    chunk.forEach((it, j) => {
      const d = answers[`disease${j}`].noul
      const u = answers[`ul${j}`].noul
      out.push({ text: it.text, diseaseClaim: d >= THRESHOLD, overUlAdvice: u >= THRESHOLD, reason: `jev disease=${d.toFixed(2)} overUl=${u.toFixed(2)}` })
    })
  }
  return out
}

export async function classifyHubs(post, hubs, { client = restClient } = {}) {
  if (!hubs.length) return []
  const questions = Object.fromEntries(
    hubs.map((h, i) => [`hub${i}`, { type: 'noul', instructions: `글의 중심 주제가 허브 "${h.name}"(${h.kind})에 속하는가.` }]),
  )
  const state = `제목: ${post.title}\n키워드: ${(post.keywords ?? []).join(', ')}\n본문: ${post.body}`
  const answers = await ask(client, state, questions)
  return hubs.filter((_, i) => answers[`hub${i}`].noul >= THRESHOLD).map(({ kind, slug }) => ({ kind, slug }))
}
