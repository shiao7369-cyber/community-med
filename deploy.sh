#!/bin/bash
# ============================================
# 敏盛I社區醫學管理平台 — 部署腳本
# ============================================
# 使用方式：
#   首次部署：  ./deploy.sh setup
#   更新部署：  ./deploy.sh update
#   查看狀態：  ./deploy.sh status
#   查看 log：  ./deploy.sh logs
#   停止服務：  ./deploy.sh stop
#   重啟服務：  ./deploy.sh restart
# ============================================

set -e

APP_NAME="community-med"
APP_DIR="$(cd "$(dirname "$0")" && pwd)"

# 顏色
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

log() { echo -e "${GREEN}[部署]${NC} $1"; }
warn() { echo -e "${YELLOW}[警告]${NC} $1"; }
err() { echo -e "${RED}[錯誤]${NC} $1"; }

case "$1" in

  setup)
    log "開始首次部署..."

    # 檢查 Node.js
    if ! command -v node &> /dev/null; then
      err "請先安裝 Node.js (建議 v20+)"
      exit 1
    fi
    log "Node.js 版本: $(node -v)"

    # 檢查/安裝 PM2
    if ! command -v pm2 &> /dev/null; then
      log "安裝 PM2..."
      npm install -g pm2
    fi
    log "PM2 版本: $(pm2 -v)"

    # 安裝依賴
    log "安裝依賴..."
    cd "$APP_DIR"
    npm ci --production=false

    # 建立 logs 目錄
    mkdir -p "$APP_DIR/logs"

    # 檢查 .env.local
    if [ ! -f "$APP_DIR/.env.local" ]; then
      warn "找不到 .env.local，建立預設設定..."
      cat > "$APP_DIR/.env.local" << 'EOF'
# 認證設定（請修改為安全的帳密）
ADMIN_USERNAME=admin
ADMIN_PASSWORD=changeme
ADMIN_DISPLAY_NAME=院長

# JWT 密鑰（請更換為隨機字串）
JWT_SECRET=請更換為一個長的隨機字串
EOF
      warn "請編輯 .env.local 修改預設帳密！"
    fi

    # 建置
    log "建置 production 版本..."
    npm run build

    # 啟動
    log "啟動服務..."
    pm2 start ecosystem.config.cjs
    pm2 save

    # 設定開機自啟
    log "設定開機自動啟動..."
    pm2 startup
    echo ""
    warn "如果上面顯示需要執行 sudo 指令，請複製並執行它。"
    echo ""

    log "========================================="
    log "部署完成！"
    log "系統網址: http://$(hostname):3001"
    log "Tailscale 網址: http://$(hostname).tail*****.ts.net:3001"
    log "========================================="
    log ""
    log "常用指令："
    log "  pm2 status        — 查看狀態"
    log "  pm2 logs $APP_NAME — 查看即時 log"
    log "  pm2 restart $APP_NAME — 重啟服務"
    ;;

  update)
    log "更新部署..."
    cd "$APP_DIR"

    log "拉取最新程式碼..."
    git pull origin main 2>/dev/null || warn "非 Git 環境，跳過 git pull"

    log "安裝依賴..."
    npm ci --production=false

    log "建置..."
    npm run build

    log "重啟服務..."
    pm2 restart $APP_NAME

    log "更新完成！"
    ;;

  status)
    pm2 describe $APP_NAME
    ;;

  logs)
    pm2 logs $APP_NAME --lines 50
    ;;

  stop)
    pm2 stop $APP_NAME
    log "服務已停止"
    ;;

  restart)
    pm2 restart $APP_NAME
    log "服務已重啟"
    ;;

  *)
    echo "使用方式: $0 {setup|update|status|logs|stop|restart}"
    echo ""
    echo "  setup   — 首次部署（安裝依賴、建置、啟動）"
    echo "  update  — 更新部署（拉取程式碼、重新建置、重啟）"
    echo "  status  — 查看服務狀態"
    echo "  logs    — 查看即時 log"
    echo "  stop    — 停止服務"
    echo "  restart — 重啟服務"
    exit 1
    ;;

esac
