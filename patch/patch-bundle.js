/**
 * 向 Houdoku 解包目录注入简体中文运行时，并做必要的静态文案替换。
 *
 * 用法（在 Windows 上以 Electron 的 Node 模式运行）：
 *   $env:ELECTRON_RUN_AS_NODE=1
 *   $env:HD_ROOT="C:\path\to\work\asar"
 *   Houdoku.exe patch-bundle.js
 *
 * HD_ROOT 需指向 app.asar 的解包目录（其下应有 out/renderer、out/main、package.json）。
 */
process.noAsar = true;
const fs = require('fs');
const path = require('path');
const cp = require('child_process');

const ROOT = process.env.HD_ROOT || path.resolve(__dirname, '..', 'work', 'asar');

function findRendererBundle(root) {
  const assets = path.join(root, 'out', 'renderer', 'assets');
  const name = fs.readdirSync(assets).find((n) => /^index-.*\.js$/.test(n));
  if (!name) throw new Error('未找到渲染入口 out/renderer/assets/index-*.js');
  return path.join(assets, name);
}

const bundlePath = findRendererBundle(ROOT);
const mainPath = path.join(ROOT, 'out', 'main', 'index.js');
const runtimePath = path.join(__dirname, 'zh-runtime.js');

const marker = 'var jsxRuntimeExports = jsxRuntime.exports;';
const startMarker = '/* ===== Houdoku 简体中文语言补丁 (zh-CN) ===== */';
const endMarker = '/* ===== zh-CN end ===== */';

let src = fs.readFileSync(bundlePath, 'utf8');

// 可重复执行：先移除旧版本运行时
if (src.indexOf(startMarker) !== -1) {
  const s = src.indexOf(startMarker);
  const e = src.indexOf(endMarker, s);
  if (e !== -1) {
    src = src.slice(0, s) + src.slice(e + endMarker.length).replace(/^\r?\n/, '');
    console.log('removed old runtime');
  }
}

if (src.indexOf(marker) === -1) throw new Error('未找到注入锚点 jsxRuntimeExports 定义，版本不匹配？');
src = src.replace(marker, marker + '\n' + fs.readFileSync(runtimePath, 'utf8'));
console.log('injected runtime');

// 渲染进程中的静态文案（系统对话框标题等）
const repl = [
  ['"Select backup file"', '"选择备份文件"'],
  ['"Select Downloads Directory"', '"选择下载目录"'],
  ['"Select Series Directory"', '"选择漫画目录"'],
  ['"Select Series Cover"', '"选择漫画封面"'],
  ['"Houdoku Backup"', '"Houdoku 备份"'],
  ['"Select series file"', '"选择漫画文件"'],
  ['name: "Image",', 'name: "图片",']
];
for (const [a, b] of repl) {
  const n = src.split(a).length - 1;
  if (n > 0) {
    src = src.split(a).join(b);
    console.log('replaced', a, '->', b, 'x', n);
  }
}

fs.writeFileSync(bundlePath, src);
console.log('bundle bytes', src.length);

// 主进程通知文案
let mainSrc = fs.readFileSync(mainPath, 'utf8');
const mainRepl = [
  ['"Houdoku is up-to-date!"', '"Houdoku 已是最新版本！"'],
  ['"You are using the latest version."', '"你正在使用最新版本。"'],
  ['"Downloaded update"', '"更新已下载"'],
  ['`Restart to finish installing update`', '`重启以完成更新安装`'],
  ['"Failed to update"', '"更新失败"'],
  ['"Downloading update"', '"正在下载更新"'],
  ['`Downloading update for v${result.updateInfo.version}`', '`正在下载更新 v${result.updateInfo.version}`']
];
let mainChanged = false;
for (const [a, b] of mainRepl) {
  const n = mainSrc.split(a).length - 1;
  if (n > 0) {
    mainSrc = mainSrc.split(a).join(b);
    mainChanged = true;
    console.log('main replaced', a, '->', b, 'x', n);
  }
}
if (mainChanged) fs.writeFileSync(mainPath, mainSrc);

// 语法校验（bundle 为 ESM，含 top-level await，需用 .mjs + --check）
const checkPath = path.join(__dirname, '..', 'work', 'check.mjs');
fs.writeFileSync(checkPath, src);
cp.execFileSync(process.execPath, ['--check', checkPath], { stdio: 'inherit' });
console.log('syntax OK');
