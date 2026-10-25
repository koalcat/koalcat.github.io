#!/usr/bin/env node
'use strict';

/**
 * Generates the OTA/update feed and copies the Android APK into docs/app.
 *
 * The landing page imports src/s1/android.json at build time (download button,
 * version card) and the app itself downloads docs/app/android.json to decide
 * whether an update is available, so both files must always carry the same data.
 *
 * Everything is derived from the S1 checkout:
 *   - versionCode / versionName  -> android/app/build.gradle
 *   - size / build date          -> the release APK's own stat
 *   - url                        -> <base-url>/s1fun-<versionName>-build<code>.apk
 *
 * Usage:
 *   node scripts/gen-app-info.js [options]
 *
 *   --app <dir>       S1 checkout (default: $S1_APP or ../S1)
 *   --apk <file>      APK to publish (default: <app>/android/app/build/outputs/apk/release/app-release.apk)
 *   --base-url <url>  where the APK is served (default: $APP_BASE_URL or https://s1fun.koalcat.com/app)
 *   --notice <text>   override the changelog line (otherwise read from <app>/CHANGELOG.md)
 *   --dry-run         print the result, write nothing
 *   --no-copy         update the JSON but do not copy the APK
 *   --prune           delete older s1fun-*.apk files from docs/app
 *   --strict          exit 1 when the S1 checkout or the APK is missing
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DEFAULT_APP = process.env.S1_APP || path.join(ROOT, '..', 'S1');
const DEFAULT_BASE_URL = process.env.APP_BASE_URL || 'https://s1fun.koalcat.com/app';

const FEED_FILES = [path.join(ROOT, 'docs/app/android.json'), path.join(ROOT, 'src/s1/android.json')];
const APP_PUBLIC_DIR = path.join(ROOT, 'docs/app');

function parseArgs(argv) {
  const opts = {};
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (!arg.startsWith('--')) continue;
    const key = arg.slice(2);
    const next = argv[i + 1];
    if (next !== undefined && !next.startsWith('--')) {
      opts[key] = next;
      i += 1;
    } else {
      opts[key] = true;
    }
  }
  return opts;
}

function fail(message, strict) {
  const line = `gen-app-info: ${message}`;
  if (strict) {
    console.error(`${line}（--strict）`);
    process.exit(1);
  }
  console.warn(`${line}，跳过，保持现有 android.json 不变`);
  process.exit(0);
}

function formatSize(bytes) {
  return `${(bytes / 1000000).toFixed(2)}MB`;
}

function formatDate(date) {
  const pad = n => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (error) {
    return null;
  }
}

const opts = parseArgs(process.argv.slice(2));
const strict = Boolean(opts.strict);
const appDir = path.resolve(ROOT, opts.app || DEFAULT_APP);
const baseUrl = String(opts['base-url'] || DEFAULT_BASE_URL).replace(/\/+$/, '');

// ---- version from build.gradle ------------------------------------------------

const gradlePath = path.join(appDir, 'android/app/build.gradle');
if (!fs.existsSync(gradlePath)) {
  fail(`找不到 ${gradlePath}（用 --app 指定 S1 仓库位置）`, strict);
}

const gradle = fs
  .readFileSync(gradlePath, 'utf8')
  .split('\n')
  .filter(line => !line.trim().startsWith('//'))
  .join('\n');

const codeMatch = gradle.match(/\bversionCode\s+(\d+)/);
const nameMatch = gradle.match(/\bversionName\s+"([^"]+)"/);
if (!codeMatch || !nameMatch) {
  fail(`从 ${gradlePath} 里没解析出 versionCode / versionName`, strict);
}

const versionCode = Number(codeMatch[1]);
const versionName = nameMatch[1];

// ---- the APK itself -----------------------------------------------------------

const apkPath = path.resolve(
  ROOT,
  opts.apk ||
    path.join(appDir, 'android/app/build/outputs/apk/release/app-release.apk'),
);
if (!fs.existsSync(apkPath)) {
  fail(`找不到 APK：${apkPath}（先构建 release 包，或用 --apk 指定）`, strict);
}

const apkStat = fs.statSync(apkPath);
const apkName = `s1fun-${versionName}-build${versionCode}.apk`;
const apkUrl = `${baseUrl}/${apkName}`;
const apkDest = path.join(APP_PUBLIC_DIR, apkName);

// ---- feed ---------------------------------------------------------------------

const previous = readJson(FEED_FILES[0]) || {};
const sameVersion = String(previous.versionInt || '') === String(versionCode);

// The changelog lives next to the release it describes: S1/CHANGELOG.md, with
// one "## <version>" section per release. Looking it up by version means a new
// build never inherits the previous release's copy.
function readChangelog(dir, version) {
  const file = path.join(dir, 'CHANGELOG.md');
  const result = { file, exists: fs.existsSync(file), hasSection: false, bullets: [] };
  if (!result.exists) return result;

  const escaped = version.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const matches = new RegExp(`^(?:v|\\[)?\\s*${escaped}(?:\\])?(?:\\s|$)`);
  let inSection = false;

  fs.readFileSync(file, 'utf8')
    .split('\n')
    .forEach(raw => {
      const line = raw.trim();
      const section = line.match(/^##\s+(.+)$/);
      if (section) {
        inSection = matches.test(section[1]);
        if (inSection) result.hasSection = true;
        return;
      }
      if (!inSection) return;
      const bullet = line.match(/^[-*]\s+(.+)$/);
      if (bullet) result.bullets.push(bullet[1].trim());
    });

  return result;
}

const changelog = readChangelog(appDir, versionName);
let notice = opts.notice;
let noticeFrom = '--notice';
if (notice === undefined && changelog.bullets.length) {
  // The app renders notice line by line, so keep the changelog as a bullet list.
  notice = changelog.bullets.map(bullet => `- ${bullet}`).join('\n');
  noticeFrom = 'CHANGELOG.md';
}
if (notice === undefined) {
  // A stale changelog is worse than none: only carry it over for the same build.
  notice = sameVersion ? String(previous.notice || '').trim() : '';
  noticeFrom = '上一版 android.json';
}
notice = String(notice).trim();

if (!notice && changelog.exists && !changelog.hasSection) {
  console.warn(
    `gen-app-info: ${changelog.file} 里没有 ${versionName} 的段落，更新说明留空`,
  );
}

const info = {
  size: formatSize(apkStat.size),
  enable: previous.enable === 0 ? 0 : 1,
  versionInt: String(versionCode),
  isAutoInstall: previous.isAutoInstall === 1 ? 1 : 0,
  name: previous.name || 'S1Fun(安卓)',
  url: apkUrl,
  version: `${versionName} build(${versionCode})`,
  time: formatDate(apkStat.mtime),
  tips: previous.tips || '',
  notice,
  icon: previous.icon || 'app/icon.png',
  type: previous.type || 'appStore',
};

const previousCode = Number(previous.versionInt);
if (previous.versionInt && previousCode > versionCode) {
  console.warn(
    `gen-app-info: 注意，新版本 ${versionCode} 比现有 feed 里的 ${previousCode} 还小（降级？）`,
  );
}

// ---- write --------------------------------------------------------------------

const json = `${JSON.stringify(info, null, 2)}\n`;

console.log(`S1Fun ${info.version}`);
console.log(`  apk    ${path.relative(ROOT, apkPath)}（${info.size}，${info.time}）`);
console.log(`  url    ${info.url}`);
const noticeLines = notice.split('\n').filter(Boolean);
console.log(
  noticeLines.length
    ? `  notice ${noticeLines[0]}${noticeLines.length > 1 ? ` …（共 ${noticeLines.length} 条）` : ''}  （${noticeFrom}）`
    : '  notice （空）',
);

if (opts['dry-run']) {
  console.log('\n--- docs/app/android.json（dry run，未写入）---');
  console.log(json.trimEnd());
  process.exit(0);
}

FEED_FILES.forEach(file => {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, json);
  console.log(`  feed   ${path.relative(ROOT, file)}`);
});

if (opts['no-copy']) {
  console.log('  copy   （--no-copy，未复制 APK）');
} else {
  const upToDate =
    fs.existsSync(apkDest) && fs.statSync(apkDest).size === apkStat.size;
  if (upToDate) {
    console.log(`  copy   docs/app/${apkName}（已是最新）`);
  } else {
    fs.mkdirSync(APP_PUBLIC_DIR, { recursive: true });
    fs.copyFileSync(apkPath, apkDest);
    console.log(`  copy   docs/app/${apkName}`);
  }
}

if (opts.prune) {
  fs.readdirSync(APP_PUBLIC_DIR)
    .filter(file => /^s1fun-.*\.apk$/.test(file) && file !== apkName)
    .forEach(file => {
      fs.unlinkSync(path.join(APP_PUBLIC_DIR, file));
      console.log(`  prune  docs/app/${file}`);
    });
}
