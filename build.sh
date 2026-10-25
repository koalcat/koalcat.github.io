#!/bin/bash
#
# Build the landing page into docs/ (the GitHub Pages source).
#
#   ./build.sh            refresh the app update feed, build, publish to docs/
#   ./build.sh --no-app   skip the feed refresh (no S1 checkout around)
#
# The feed step reads versionCode / versionName from the S1 checkout
# (../S1 by default, override with S1_APP=/path/to/S1), takes size and build
# date from the release APK, writes both src/s1/android.json and
# docs/app/android.json, and copies the APK to docs/app/.
#
# The one-line changelog on the page is read from the app's CHANGELOG.md
# (the section for the current version); no section means no line.

set -euo pipefail
cd "$(dirname "$0")"

SKIP_APP=0
for arg in "$@"; do
  case "$arg" in
    --no-app) SKIP_APP=1 ;;
    *) echo "未知参数：$arg" >&2; exit 2 ;;
  esac
done

# webpack 4 (react-scripts 3) needs the legacy OpenSSL provider on Node 17+.
NODE_MAJOR="$(node -p 'process.versions.node.split(".")[0]')"
if [ "$NODE_MAJOR" -ge 17 ]; then
  export NODE_OPTIONS="${NODE_OPTIONS:-} --openssl-legacy-provider"
fi

if [ "$SKIP_APP" -eq 0 ]; then
  node scripts/gen-app-info.js
else
  echo "跳过 app 信息生成（--no-app）"
fi

yarn build

# Publish: swap the whole bundle instead of piling up old hashes. docs/app
# (feed + APKs) is untouched because it does not exist in build/.
rm -rf docs/static
cp -R build/. docs/
rm -f docs/precache-manifest.*.js docs/service-worker.js

echo "docs/ 已更新"
