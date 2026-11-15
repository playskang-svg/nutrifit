// 2026-11-07: put product cards into the symptom posts whose "도움이 되는 제품" section had prose but no card.
// Idempotent: a pick already in the body is skipped. Run: node scripts/add-symptom-picks.mjs
// after: node scripts/check-content.mjs data/posts --no-jev
import { readFileSync, writeFileSync } from 'node:fs'

const picks = new Set(JSON.parse(readFileSync('data/picks.json', 'utf8')).map((p) => p.id))
const post = (slug) => `data/posts/${slug}.json`

// after: text inside the paragraph the cards follow; add: pick keys in order; fix: [from, to] sentence swaps.
const EDITS = {
  'adenomyosis-signs': {
    fix: [['그래서 이 글에서는 상품을 따로 고르지 않았어요.', '아래는 생활에서 쓰는 도구예요.']],
    add: [['집에서 쓰는 찜질 도구는', ['heat-pad-1', 'belly-heat-belt-3']], ['생리 양이 많은 날 쓰는 생리대는', ['sanitary-pad-1']]],
  },
  'rheumatoid-arthritis-signs': {
    fix: [['그래서 이 글에서는 상품을 따로 고르지 않았어요.', '아래는 생활에서 쓰는 도구예요.']],
    add: [['찜질팩, 손잡이가 굵은', ['cold-pack-1']]],
  },
  'gout-signs': {
    fix: [['그래서 이 글에서는 상품을 따로 고르지 않았어요.', '아래는 생활에서 쓰는 도구예요.']],
    add: [['생활 속 도구라면', ['cold-pack-3']]],
  },
  'herpes-signs': { add: [['자외선 차단제는 햇빛을 쬔', ['sunscreen-1', 'sunscreen-2']]] },
  'cholinergic-urticaria': { add: [['새 보습제는 팔 안쪽', ['moisturizing-lotion-2', 'portable-fan-1', 'portable-fan-2']]] },
  'cold-urticaria': { add: [['새 보습제는 팔 안쪽', ['winter-gloves-1', 'winter-gloves-2', 'neck-warmer-1', 'neck-mask-3', 'moisturizing-lotion-2']]] },
  'sleep-apnea-signs': { add: [['MSD 매뉴얼은 머리 쪽을 높이려면', ['wedge-pillow-2']]] },
  'ankylosing-spondylitis-signs': { add: [['매트는 미끄럼 방지가 되는지', ['exercise-mat-1', 'exercise-mat-2']]] },
  'otolith-vertigo': { add: [['매트는 뒷면이 바닥에 잘 붙는지', ['nonslip-mat-1', 'nonslip-mat-2', 'sensor-light-1', 'bath-handrail-1']]] },
  'shingles-signs': { add: [['거즈를 붙일 때는', ['sterile-gauze-1', 'medical-tape-1', 'medical-tape-2']]] },
  'pcos-signs': {
    fix: [['그래서 이 글에서는 따로 상품을 고르지 않았어요.', '아래는 생활에서 쓰는 도구예요.']],
    add: [['생활 관리를 돕는 도구 정도는', ['body-scale-1', 'body-scale-2']]],
  },
  'irregular-bleeding': {
    fix: [['그래서 이 글에서는 따로 상품을 고르지 않았어요.', '아래는 생활에서 쓰는 도구예요.']],
    add: [['생리대는 의약외품이에요.', ['sanitary-pad-1']]],
  },
  'epigastric-pain': { add: [['누우면 쓰린 분이라면', ['wedge-pillow-2']]] },
}

// Posts that had no product section at all get a new one before `before`.
const SECTIONS = {
  'seasonal-phlegm-cough-nutrition': {
    before: '## 약국에서 상의할 약',
    text: `## 도움이 되는 제품

아래는 집 안 공기와 목을 챙길 때 쓰는 생활용품과 식품이에요. 가래에 듣는 제품은 아니니 쓰임새에 맞게 고르세요.

초음파 가습기는 물을 작은 입자로 뿜어 방 안 습도를 올리는 가전이에요. 물통을 분리해 통째로 씻을 수 있는지, 매일 물을 갈기 쉬운지를 보세요. 물때가 끼면 위생이 나빠질 수 있어요.

{{pick:humidifier-1}}

도라지배즙은 도라지와 배를 달여 담은 식품이에요. 따뜻하게 마시는 분이 많고, 당이 든 제품도 있으니 포장 뒤의 영양 성분표를 확인하세요.

{{pick:doraji-pear-juice-2}}

보건용 마스크는 찬 공기와 먼지가 목에 바로 닿는 것을 줄이려고 쓰는 의약외품이에요. KF 표시와 얼굴에 들뜨지 않는 크기를 먼저 보세요.

{{pick:face-mask-2}}

`,
  },
  'eyelid-twitching-magnesium-link': {
    before: '## 어느 진료과로 가면 될까',
    text: `## 도움이 되는 제품

눈 떨림에 듣는 물건은 아니에요. 아래는 눈을 쉬게 하고 눈가를 깨끗이 할 때 쓰는 생활용품입니다.

온열 안대는 눈 위를 따뜻하게 덮는 제품이에요. 온도 조절 단계가 있는지, 일정 시간 뒤 저절로 꺼지는지를 확인하세요. 눈이 아프거나 붉으면 쓰지 말고 안과에 가세요.

{{pick:heated-eye-mask-1}}

암막 수면안대는 빛을 막아 잠자리를 어둡게 해 주는 제품이에요. 눈을 누르지 않는 입체형인지, 끈이 머리를 조이지 않는지 보세요.

{{pick:sleep-mask-1}}

눈꺼풀 세정제는 눈가를 닦는 제품이고, 눈 속에 넣는 안약이 아니에요. 눈 주변용으로 만든 제품인지 표시를 확인하세요.

{{pick:eyelid-cleanser-2}}

`,
  },
  'night-leg-cramps-magnesium': {
    before: '## 마그네슘과의 관계, 확인된 것까지만',
    text: `## 도움이 되는 제품

다리 쥐용으로 나온 제품은 아니에요. 아래는 자기 전에 다리를 풀고 편하게 누울 때 쓰는 생활용품이에요.

종아리 마사지기는 공기압이나 진동으로 종아리를 감싸 주무르는 기기예요. 세기 단계가 있는지 보고, 쥐가 막 난 근육에는 설명서대로 쓰세요.

{{pick:leg-massager-1}}

저항 밴드는 스트레칭할 때 발끝을 당기는 데 쓰는 고무 밴드예요. 세기가 여러 단계인 세트가 나눠 쓰기 편하고, 라텍스가 맞지 않는 분은 소재를 확인하세요.

{{pick:stretching-band-1}}

바디필로우는 옆으로 누울 때 다리 사이나 아래에 끼워 자세를 받치는 베개예요. 높이와 길이가 몸에 맞는지, 커버를 빨 수 있는지 보세요.

{{pick:leg-pillow-1}}

`,
  },
  'scalp-hair-loss-nutrients-guide': {
    before: '## 아연·쏘팔메토, 고시 문구까지만',
    text: `## 도움이 되는 제품

아래는 두피를 씻을 때 쓰는 화장품과 생활용품이에요. 머리카락을 나게 하는 제품은 아니고, 진료를 대신하지도 못해요.

탈모용 샴푸 중에는 기능성화장품으로 심사받은 제품이 있어요. 제품 표시에 기능성화장품 문구가 있는지 보고, 두피가 따가운 분은 향이나 자극이 될 만한 성분이 없는지 확인하세요.

{{pick:hair-loss-shampoo-1}}

두피 스케일러는 각질과 피지를 씻어 내는 두피 전용 세정 제품이에요. 두피에 상처나 염증이 있을 때는 쓰지 마세요. 세게 문지르지 말고 부드럽게 마사지하듯 쓰세요.

{{pick:scalp-scaler-1}}

`,
  },
  'biotin-hair-loss-supplement-guide': {
    before: '## 함께 보면 좋은 글',
    text: `## 도움이 되는 제품

비오틴 말고 두피를 씻는 용품도 함께 보는 분이 많아요. 아래는 머리카락을 나게 하는 제품이 아니라 두피를 깨끗이 하는 제품이에요.

두피 스케일러는 각질과 피지를 씻어 내는 두피 전용 세정 제품이에요. 두피에 상처나 염증이 있을 때는 쓰지 말고, 설명서에 적힌 사용 횟수를 지키세요.

{{pick:scalp-scaler-3}}

탈모용 샴푸 중에는 기능성화장품으로 심사받은 제품이 있어요. 표시를 확인하고, 두피가 따가우면 쓰기를 멈추세요.

{{pick:hair-loss-shampoo-1}}

`,
  },
}

let changed = 0
const bad = []
const apply = (slug, fn) => {
  const file = post(slug)
  const p = JSON.parse(readFileSync(file, 'utf8'))
  const before = p.body
  p.body = fn(p.body)
  if (p.body !== before) {
    writeFileSync(file, JSON.stringify(p, null, 2) + '\n')
    changed++
  }
}

for (const [slug, { fix = [], add = [] }] of Object.entries(EDITS)) {
  apply(slug, (body) => {
    for (const [from, to] of fix) body = body.includes(from) ? body.replace(from, to) : body
    for (const [after, keys] of add) {
      const todo = keys.filter((k) => !body.includes(`{{pick:${k}}}`))
      for (const k of todo) if (!picks.has(k)) bad.push(`${slug}: no pick ${k}`)
      if (!todo.length) continue
      const at = body.indexOf(after)
      if (at < 0) { bad.push(`${slug}: anchor "${after}" not found`); continue }
      const end = body.indexOf('\n\n', at)
      const cut = end < 0 ? body.length : end
      body = body.slice(0, cut) + todo.map((k) => `\n\n{{pick:${k}}}`).join('') + body.slice(cut)
    }
    return body
  })
}

for (const [slug, { before, text }] of Object.entries(SECTIONS)) {
  apply(slug, (body) => {
    if (body.includes('## 도움이 되는 제품')) return body
    for (const k of text.match(/(?<=\{\{pick:)[^}]+/g)) if (!picks.has(k)) bad.push(`${slug}: no pick ${k}`)
    const at = body.indexOf(before)
    if (at < 0) { bad.push(`${slug}: anchor "${before}" not found`); return body }
    return body.slice(0, at) + text + body.slice(at)
  })
}

console.log({ changed, bad })
if (bad.length) process.exitCode = 1
