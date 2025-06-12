#!/bin/bash

# Exit on error
set -e

SCRIPT_DIR=$(dirname "$0")
PROJECT_ROOT=$(cd "$SCRIPT_DIR/.." && pwd)
PORTAL_CHECKER_SCRIPT="$PROJECT_ROOT/scripts/check-portal-homepage-links.mjs"
HTTP_SERVER_PORT=3000 # Using a common port, ensure it's free

# Check for dev dependencies
check_dependency() {
  local dep_name=$1
  echo "Checking for $dep_name..."
  # Refined grep pattern to find the dep_name as a JSON key
  if ! pnpm list "$dep_name" -w --depth=0 --json | grep -q "\"$dep_name\"[[:space:]]*:"; then
    echo "$dep_name not found. Please install it: pnpm add -D -w $dep_name"
    exit 1
  fi
}

check_dependency "puppeteer"
check_dependency "tsx"
check_dependency "http-server"

ENVIRONMENTS=("localhost" "preview" "production")
OVERALL_SUCCESS=true
SERVER_PID=""

cleanup() {
  echo "Cleaning up server..."
  if [ ! -z "$SERVER_PID" ]; then
    # Check if process exists before trying to kill
    if ps -p $SERVER_PID > /dev/null; then
       kill "$SERVER_PID" &>/dev/null || true
       wait "$SERVER_PID" &>/dev/null || true
    fi
    SERVER_PID=""
  fi
}
trap cleanup EXIT SIGINT SIGTERM

for ENV_NAME in "${ENVIRONMENTS[@]}"; do
  echo ""
  echo "----------------------------------------------------"
  echo "Testing Portal for DOCS_ENV=$ENV_NAME"
  echo "----------------------------------------------------"

  echo "Building portal (DOCS_ENV=$ENV_NAME)..."
  (cd "$PROJECT_ROOT" && DOCS_ENV=$ENV_NAME pnpm run build portal)
  if [ $? -ne 0 ]; then
    echo "❌ Build failed for DOCS_ENV=$ENV_NAME"
    OVERALL_SUCCESS=false
    continue
  fi

  echo "Serving portal build from $PROJECT_ROOT/portal/build on port $HTTP_SERVER_PORT..."
  (cd "$PROJECT_ROOT/portal/build" && npx http-server -p $HTTP_SERVER_PORT --silent &)
  SERVER_PID=$!
  # Allow server to start
  echo "Waiting for server (PID: $SERVER_PID) to start..."
  sleep 5 # Adjust if needed

  echo "Running link checks for DOCS_ENV=$ENV_NAME..."
  (cd "$PROJECT_ROOT" && npx tsx "$PORTAL_CHECKER_SCRIPT" "http://localhost:$HTTP_SERVER_PORT" "$ENV_NAME")
  if [ $? -ne 0 ]; then
    echo "❌ Link checks failed for DOCS_ENV=$ENV_NAME"
    OVERALL_SUCCESS=false
  else
    echo "✅ Link checks passed for DOCS_ENV=$ENV_NAME"
  fi

  echo "Stopping server (PID: $SERVER_PID)..."
  kill "$SERVER_PID"
  wait "$SERVER_PID" 2>/dev/null
  SERVER_PID=""
  echo "Server stopped."

done

echo ""
echo "----------------------------------------------------"
if $OVERALL_SUCCESS; then
  echo "✅ All portal build and link tests passed!"
  exit 0
else
  echo "❌ Some portal build or link tests failed."
  exit 1
fi
