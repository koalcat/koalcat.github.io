# S1Fun 落地页

S1Fun 的静态落地页（Create React App 3.4 + TypeScript + Less）。发布在
`s1fun.koalcat.com`（Cloudflare Pages）和 `koalcat.github.io`（GitHub Pages，源是 `docs/`）。

## 开发

```bash
yarn start     # http://localhost:3000，改完自动刷新
yarn build     # 产物在 build/
```

## 构建与发布

```bash
./build.sh            # 生成 app 元信息 → 构建 → 同步到 docs/
./build.sh --no-app   # 只构建，跳过元信息生成
```

`build.sh` 会调用 `scripts/gen-app-info.js`，把「手动改 android.json」这件事自动化：

- 从 S1 仓库（默认 `../S1`，可用 `S1_APP=/path/to/S1` 覆盖）的
  `android/app/build.gradle` 读 `versionCode` / `versionName`；
- 从 release APK 取大小和构建日期，拼出下载地址
  `<base>/s1fun-<versionName>-build<versionCode>.apk`
  （base 默认 `https://s1fun.koalcat.com/app`，可用 `--base-url` / `APP_BASE_URL` 改）；
- 同时写两份数据：`src/s1/android.json`（页面读取）和
  `docs/app/android.json`（App 检查更新读取），两者必须一致；
- 把 APK 复制到 `docs/app/`。

可选：

```bash
node scripts/gen-app-info.js --dry-run     # 只打印，不写文件
node scripts/gen-app-info.js --prune       # 顺手删掉 docs/app 里的旧 APK
node scripts/gen-app-info.js --app ../S1 --apk path/to/app-release.apk
```

页面上那行「更新说明」从 S1 仓库的 `CHANGELOG.md` 按版本号取，找 `## 2.0.0` 这样的段落，
把它下面的列表转成 `- xxx` 的多行文本（App 按行渲染）：

```md
## 2.0.0 (71)

- 全新的图片加速，可自选代理
- 修复图片加载失败
```

找不到对应段落就留空（页面自动隐藏这一行），同一版本重跑会沿用已有文案。
临时改一两句可以用 `--notice "..."` 覆盖，不会写进 CHANGELOG。
落地页的规格卡会把这份列表逐条列出来。

发布：`docs/` 是 GitHub Pages 的源，push 即生效；`s1fun.koalcat.com` 背后是
Cloudflare Pages，如果项目是 Direct Upload，需要单独把 `docs/` 传上去。
