#!/usr/bin/env zsh
# open-dashboard.zsh
# Quick‑launch a browser tab set with all core resources for a given IFLA standard.
#
# Usage:
#   ./scripts/open-dashboard.zsh isbdm
#
# Prerequisites:
#   • macOS (uses the `open` command) – swap for `xdg-open` on Linux.
#   • jq (brew install jq) for JSON parsing.
#
# The script expects each standard to have a `.config/` directory that
# contains:
#   project.json  → { "url": "https://github.com/orgs/IFLA/projects/…" }
#   sheet.json    → { "sheetUrl": "https://docs.google.com/..." }
#
# It also falls back to sensible defaults if those files are missing.

set -euo pipefail

STD="${1:-}"
if [[ -z "$STD" ]]; then
  echo "Usage: $0 <standard-code>" >&2
  exit 1
fi

STD_PATH="standards/${STD}"
if [[ ! -d "$STD_PATH" ]]; then
  echo "Error: no such standard folder: $STD_PATH" >&2
  exit 1
fi

CONFIG_DIR="$STD_PATH/.config"

# Helper to pluck a key from JSON (returns empty string on failure)
json_value() {
  local file="$1" key="$2"
  [[ -f "$file" ]] && jq -r ".$key // \"\"" "$file"
}

PROJECT_URL=$(json_value "$CONFIG_DIR/project.json" "url")
SHEET_URL=$(json_value "$CONFIG_DIR/sheet.json" "sheetUrl")
REPO_URL="https://github.com/IFLA/ifla-standards/tree/main/$STD_PATH"
CODESPACE_URL="https://github.com/codespaces/new?repo=IFLA/ifla-standards&workspace_folder=$STD_PATH"
LOCAL_URL="http://localhost:3000"  # works once `pnpm start` is running

# macOS: 'open'; Linux: alias to 'xdg-open'
OPEN_CMD="open"
command -v "$OPEN_CMD" >/dev/null 2>&1 || {
  echo "Error: $OPEN_CMD not found. Adjust for your OS (xdg-open on Linux)." >&2
  exit 1
}

# Launch each non‑empty URL in a new browser tab
for url in "$PROJECT_URL" "$SHEET_URL" "$REPO_URL" "$CODESPACE_URL" "$LOCAL_URL"; do
  [[ -n "$url" ]] && "$OPEN_CMD" "$url" &
done

exit 0
