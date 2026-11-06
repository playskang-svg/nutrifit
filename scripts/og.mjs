// Share cards (Task 25): white card, keyword hook on the left, the page's photo fading in on the right, no site name.
// node scripts/og.mjs  → public/og/<slug>.jpg for every post (matches ogPath in src/lib/seo.ts).
// Uses the snsogg skill's renderer deps (satori + resvg) and Windows Malgun Gothic.
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'

const SKILL = 'C:/Window_DEV/.claude/skills/snsogg/node_modules/'
const { ImageResponse, CustomFont } = await import(`file:///${SKILL}@cf-wasm/og/dist/node.js`)
const sharp = createRequire('C:/Window_DEV/github/nutrifit/node_modules/')('sharp')

const font = (file, weight) => new CustomFont('Malgun', new Uint8Array(readFileSync(`C:/Windows/Fonts/${file}`)).buffer, { weight })
const fonts = [font('malgun.ttf', 400), font('malgunbd.ttf', 700)]
const h = (type, style, ...children) => ({ type, props: { style: { display: 'flex', ...style }, children: children.flat().filter(Boolean) } })

const ACCENT = '#0f766e'
const cut = (s, n) => (s.length > n ? `${s.slice(0, n - 1)}…` : s)

function card({ hook, sub, photo }) {
  return h(
    'div',
    { width: 1200, height: 630, background: '#ffffff', position: 'relative', fontFamily: 'Malgun' },
    photo && { type: 'img', props: { src: photo, width: 720, height: 630, style: { position: 'absolute', right: 0, top: 0, width: 720, height: 630, objectFit: 'cover' } } },
    h('div', { position: 'absolute', left: 0, top: 0, width: 1200, height: 630, backgroundImage: 'linear-gradient(90deg, #ffffff 0%, #ffffff 42%, rgba(255,255,255,0.85) 58%, rgba(255,255,255,0) 82%)' }),
    h(
      'div',
      { position: 'absolute', left: 72, top: 0, width: 620, height: 630, flexDirection: 'column', justifyContent: 'center' },
      h('div', { width: 64, height: 8, background: ACCENT, borderRadius: 4, marginBottom: 32 }),
      h('div', { fontSize: 68, fontWeight: 700, color: '#111827', lineHeight: 1.22, letterSpacing: -1.5 }, cut(hook, 30)),
      sub && h('div', { fontSize: 32, color: '#4b5563', marginTop: 28, lineHeight: 1.4 }, cut(sub, 40)),
    ),
  )
}

const photos = JSON.parse(readFileSync('data/photos.json', 'utf8'))
const photoData = async (key) => {
  if (!key || !(key in photos)) return null
  const buf = await sharp(`public/photos/${key}.webp`).resize(720, 630, { fit: 'cover' }).jpeg({ quality: 82 }).toBuffer()
  return `data:image/jpeg;base64,${buf.toString('base64')}`
}

mkdirSync('public/og', { recursive: true })
const only = process.argv[2]
let n = 0
for (const f of readdirSync('data/posts').filter((x) => x.endsWith('.json'))) {
  const p = JSON.parse(readFileSync(`data/posts/${f}`, 'utf8'))
  if (only && p.slug !== only) continue
  const out = `public/og/${p.slug}.jpg`
  if (!only && existsSync(out)) continue
  // Hook = the title's first clause, which carries the primary keyword; the rest is the sub line.
  const [hook, ...rest] = p.title.split(/,\s*|:\s*|\s[-–]\s/)
  const res = await ImageResponse.async(card({ hook, sub: rest.join(', '), photo: await photoData(p.heroPhoto) }), { width: 1200, height: 630, fonts })
  writeFileSync(out, await sharp(Buffer.from(await res.arrayBuffer())).jpeg({ quality: 82, mozjpeg: true }).toBuffer())
  n++
}
console.log(`og cards written: ${n}`)
