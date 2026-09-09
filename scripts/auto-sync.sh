#!/bin/bash
#
# 쿠팡 가격 주간 재수집 → 검증 → 배포. launchd가 매주 월요일 새벽에 부른다.
#
#   설치:   ~/Library/LaunchAgents/kr.nutrifit.price-sync.plist
#   로그:   ~/Library/Logs/nutrifit-price-sync.log
#   수동:   bash scripts/auto-sync.sh          (평소대로 실행)
#           bash scripts/auto-sync.sh --dry    (수집·검증까지만, 커밋·배포 없음)
#
# 가격 스냅샷을 화면에 "수집일 기준"으로 밝히고 있어서, 갱신이 멈추면
# 표시가와 실제가가 조용히 벌어진다. 사람이 기억해서 돌릴 일이 아니다.
#
# 무인 실행이라 안전장치를 앞에 둔다. 하나라도 걸리면 데이터를 되돌리고 멈춘다.
# 배포까지 갔다가 되돌리는 것보다 안 나가는 쪽이 낫다.

set -uo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT" || exit 1

DRY=0
[[ "${1:-}" == "--dry" ]] && DRY=1

DATA="src/data/affiliateLinks.ts"
BRANCH="auto/price-sync"
LOG_TAG="[$(date '+%Y-%m-%d %H:%M:%S')]"

log() { echo "$LOG_TAG $*"; }
notify() {
  # 배너만 띄운다. 창을 앞으로 끌어오지 않는다.
  osascript -e "display notification \"$1\" with title \"NutriFit 가격 동기화\"" 2>/dev/null || true
}
fail() {
  log "중단: $*"
  notify "중단 — $1"
  exit 1
}

log "===== 시작 ====="

# ---------- 사전 점검 ----------

# 남의 미커밋 작업 위에 덮어쓰지 않는다. 데이터 파일만 변경된 상태는 지난 실행의 잔여물로 보고 허용한다.
DIRTY="$(git --no-optional-locks status --porcelain | grep -v " $DATA\$" || true)"
[[ -n "$DIRTY" ]] && fail "작업 트리에 미커밋 변경이 있습니다: $(echo "$DIRTY" | head -3 | tr '\n' ' ')"

command -v node >/dev/null || fail "node를 찾을 수 없습니다"
[[ -f "$HOME/dev/A-factory/affiliate-links.json" ]] || fail "쿠팡 키 파일이 없습니다"

# ---------- 수집 전 스냅샷 ----------

before_products() { grep -c "^      productId:" "$DATA"; }
BEFORE=$(before_products)
BEFORE_IDS="$(grep "^      productId:" "$DATA" | md5)"
log "수집 전 상품 $BEFORE/100건"

cp "$DATA" "/tmp/nutrifit-affiliate-backup.ts"

# ---------- 재수집 ----------

log "쿠팡 API 재수집 (약 5분)..."
if ! node scripts/sync-affiliate.mjs >> "$HOME/Library/Logs/nutrifit-price-sync.log" 2>&1; then
  cp "/tmp/nutrifit-affiliate-backup.ts" "$DATA"
  fail "수집 스크립트가 실패했습니다"
fi

AFTER=$(before_products)
log "수집 후 상품 $AFTER/100건"

# ---------- 안전장치 ----------

restore_and_fail() {
  cp "/tmp/nutrifit-affiliate-backup.ts" "$DATA"
  fail "$1"
}

# 1) 상품이 눈에 띄게 줄면 API 응답이 이상한 것이다. 빈 카드를 라이브로 내보내지 않는다.
LOST=$(( BEFORE - AFTER ))
(( LOST > 3 )) && restore_and_fail "상품이 ${LOST}건 사라졌습니다 ($BEFORE → $AFTER)"

# 2) 아무것도 안 바뀌었으면 배포할 이유가 없다.
AFTER_IDS="$(grep "^      productId:" "$DATA" | md5)"
if [[ "$BEFORE_IDS" == "$AFTER_IDS" ]] && git --no-optional-locks diff --quiet -- "$DATA"; then
  log "변경 없음. 배포를 건너뜁니다."
  git checkout -- "$DATA" 2>/dev/null
  exit 0
fi

# 3) 상품이 통째로 갈렸으면 판정 로직이나 API 쪽에 문제가 생긴 것이다. 사람이 봐야 한다.
CHANGED=$(git --no-optional-locks diff -U0 -- "$DATA" | grep -c "^+      productId:" || true)
(( CHANGED > 70 )) && restore_and_fail "상품 ${CHANGED}/100건이 교체됐습니다. 판정 로직 확인이 필요합니다"

log "상품 ${CHANGED}건 변경"

# 4) 타입검사·빌드가 통과해야 나간다.
npm run lint  >/dev/null 2>&1 || restore_and_fail "타입검사 실패"
npm run build >/dev/null 2>&1 || restore_and_fail "빌드 실패"
log "타입검사·빌드 통과"

if (( DRY )); then
  log "--dry: 커밋·배포 없이 종료. 변경은 작업 트리에 남겨둡니다."
  exit 0
fi

# ---------- 커밋 (main 직접 푸시 금지 — 상시 브랜치 + PR) ----------

TODAY=$(date '+%Y-%m-%d')
git checkout -B "$BRANCH" >/dev/null 2>&1 || fail "브랜치 전환 실패"
git add "$DATA"
git commit -q -m "chore: 쿠팡 가격 스냅샷 갱신 ($TODAY, 상품 ${CHANGED}건 변경)

scripts/auto-sync.sh 주간 자동 실행.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>" || fail "커밋 실패"

git push -q -f -u origin "$BRANCH" 2>/dev/null || log "경고: 푸시 실패 (배포는 계속합니다)"

# 열려 있는 PR이 있으면 그대로 두고, 없을 때만 만든다. 매주 새 PR이 쌓이지 않게.
if command -v gh >/dev/null; then
  if ! gh pr view "$BRANCH" >/dev/null 2>&1; then
    gh pr create --base main --head "$BRANCH" \
      --title "chore: 쿠팡 가격 스냅샷 주간 갱신" \
      --body "\`scripts/auto-sync.sh\`가 매주 자동으로 갱신하는 브랜치입니다. 배포는 이미 나갔고, 이 PR은 main에 데이터를 반영하기 위한 것입니다.

🤖 Generated with [Claude Code](https://claude.com/claude-code)" >/dev/null 2>&1 || log "경고: PR 생성 실패"
  fi
fi

# ---------- 배포 ----------

log "Cloudflare 배포..."
if npx wrangler deploy >> "$HOME/Library/Logs/nutrifit-price-sync.log" 2>&1; then
  log "배포 완료"
else
  fail "배포 실패 — 커밋은 $BRANCH 에 남아 있습니다"
fi

# ---------- 라이브 확인 ----------

sleep 8
CODE=$(curl -s -o /dev/null -w "%{http_code}" https://nutrifit.kr/)
[[ "$CODE" == "200" ]] || fail "배포 후 nutrifit.kr 응답이 $CODE 입니다"

git checkout main >/dev/null 2>&1
log "===== 완료: 상품 ${CHANGED}건 갱신, 배포·확인 정상 ====="
notify "완료 — 상품 ${CHANGED}건 갱신 후 배포"
