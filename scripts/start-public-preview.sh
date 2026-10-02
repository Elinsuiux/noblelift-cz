#!/usr/bin/env bash
# Serve the VZV.cz static dump and publish a public Cloudflare quick tunnel.
# Anyone with the printed HTTPS URL can open the site while this session runs.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PORT="${VZV_PREVIEW_PORT:-8090}"
URL_FILE="${VZV_PREVIEW_URL_FILE:-/tmp/vzv-public-preview.url}"
LOG_FILE="${VZV_PREVIEW_LOG:-/tmp/vzv-public-preview.log}"
HTTP_PY="${TMPDIR:-/tmp}/vzv-preview-http.py"
CLOUDFLARED_BIN="${CLOUDFLARED_BIN:-/tmp/cloudflared}"
HTTP_SESSION="preview-http-${PORT}"
TUNNEL_SESSION="preview-tunnel"
HOMEPAGE_PATH="/pages/vzv.cz/cz/index/index.html"
TMUX_CONF="/exec-daemon/tmux.portal.conf"

tmux_cmd() {
  if [[ -f "$TMUX_CONF" ]]; then
    tmux -f "$TMUX_CONF" "$@"
  else
    tmux "$@"
  fi
}

ensure_session() {
  local name="$1"
  tmux_cmd has-session -t "=$name" 2>/dev/null || \
    tmux_cmd new-session -d -s "$name" -c "$ROOT" -- "${SHELL:-bash}" -l
}

port_open() {
  python3 - "$PORT" <<'PY'
import socket, sys
port = int(sys.argv[1])
s = socket.socket()
s.settimeout(1)
try:
    s.connect(("127.0.0.1", port))
except OSError:
    raise SystemExit(1)
PY
}

write_http_server() {
  cat > "$HTTP_PY" <<PY
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
import os
os.chdir(${ROOT@Q})
class H(SimpleHTTPRequestHandler):
    extensions_map = {
        **SimpleHTTPRequestHandler.extensions_map,
        ".html": "text/html; charset=utf-8",
        ".css": "text/css; charset=utf-8",
        ".js": "text/javascript; charset=utf-8",
        ".json": "application/json; charset=utf-8",
        ".svg": "image/svg+xml",
    }
ThreadingHTTPServer(("0.0.0.0", ${PORT}), H).serve_forever()
PY
}

ensure_http() {
  if port_open; then
    return 0
  fi
  write_http_server
  ensure_session "$HTTP_SESSION"
  tmux_cmd send-keys -t "$HTTP_SESSION:0.0" "python3 ${HTTP_PY@Q}" C-m
  for _ in 1 2 3 4 5 6 7 8 9 10; do
    if port_open; then
      return 0
    fi
    sleep 0.4
  done
  echo "preview HTTP server did not start on port ${PORT}" >&2
  return 1
}

ensure_cloudflared() {
  if [[ -x "$CLOUDFLARED_BIN" ]]; then
    return 0
  fi
  curl -fsSL -o "$CLOUDFLARED_BIN" \
    https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64
  chmod +x "$CLOUDFLARED_BIN"
}

extract_url() {
  local src="$1"
  grep -Eo 'https://[a-z0-9-]+\.trycloudflare\.com' "$src" 2>/dev/null | tail -1 || true
}

tunnel_running() {
  pgrep -x cloudflared >/dev/null 2>&1
}

existing_tunnel_url() {
  local url=""
  if [[ -f "$URL_FILE" ]]; then
    url="$(tr -d '[:space:]' < "$URL_FILE" || true)"
  fi
  if [[ -z "$url" && -f "$LOG_FILE" ]]; then
    url="$(extract_url "$LOG_FILE")"
  fi
  if [[ -z "$url" ]]; then
    url="$(tmux_cmd capture-pane -t "$TUNNEL_SESSION:0.0" -p -S -120 2>/dev/null | extract_url /dev/stdin || true)"
  fi
  printf '%s' "$url"
}

ensure_tunnel() {
  local existing=""
  existing="$(existing_tunnel_url)"
  if [[ -n "$existing" ]] && tunnel_running; then
    printf '%s\n' "$existing" > "$URL_FILE"
    return 0
  fi
  ensure_cloudflared
  : > "$LOG_FILE"
  ensure_session "$TUNNEL_SESSION"
  tmux_cmd send-keys -t "$TUNNEL_SESSION:0.0" \
    "${CLOUDFLARED_BIN@Q} tunnel --url http://127.0.0.1:${PORT} --no-autoupdate 2>&1 | tee ${LOG_FILE@Q}" C-m
  local url=""
  for _ in $(seq 1 40); do
    url="$(extract_url "$LOG_FILE")"
    if [[ -n "$url" ]]; then
      printf '%s\n' "$url" > "$URL_FILE"
      return 0
    fi
    sleep 0.5
  done
  echo "cloudflared tunnel did not print a trycloudflare.com URL" >&2
  return 1
}

ensure_http
ensure_tunnel

BASE="$(tr -d '[:space:]' < "$URL_FILE")"
HOMEPAGE="${BASE}${HOMEPAGE_PATH}"
cat <<EOF
Public preview (anyone with this URL can open it while this agent session is running):
${HOMEPAGE}

Base: ${BASE}
URL file: ${URL_FILE}
EOF
