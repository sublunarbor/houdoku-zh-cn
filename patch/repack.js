/**
 * 以官方原始 app.asar 为基准，把解包目录中修改过的文件重新打包成新 asar。
 *
 * 用法：
 *   $env:ELECTRON_RUN_AS_NODE=1
 *   $env:HD_ASAR_ORIGINAL="C:\path\to\original\app.asar"
 *   $env:HD_ROOT="C:\path\to\work\asar"
 *   $env:HD_OUT="C:\path\to\work\app.asar.new"
 *   Houdoku.exe repack.js
 *
 * 规则（详见 docs/汉化原理.md）：
 *   - asar 中 offset 是相对数据区的偏移，header 变化不影响旧条目
 *   - 被替换文件删除 integrity，并在数据区末尾追加
 */
process.noAsar = true;
const fs = require('fs');
const path = require('path');

const WORK = path.resolve(__dirname, '..', 'work');
const asarPath = process.env.HD_ASAR_ORIGINAL || path.join(WORK, 'app.asar.orig');
const root = process.env.HD_ROOT || path.join(WORK, 'asar');
const outPath = process.env.HD_OUT || path.join(WORK, 'app.asar.new');

function readHeader(file) {
  const fd = fs.openSync(file, 'r');
  const sizeBuf = Buffer.alloc(8);
  fs.readSync(fd, sizeBuf, 0, 8, 0);
  const headerSize = sizeBuf.readUInt32LE(4);
  const headerBuf = Buffer.alloc(headerSize);
  fs.readSync(fd, headerBuf, 0, headerSize, 8);
  const jsonLen = headerBuf.readUInt32LE(4);
  const json = JSON.parse(headerBuf.toString('utf8', 8, 8 + jsonLen));
  return { fd, headerSize, json };
}

function walk(node, rel, onFile) {
  for (const [name, entry] of Object.entries(node.files || {})) {
    const p = rel ? rel + '/' + name : name;
    if (entry.files) walk(entry, p, onFile);
    else onFile(p, entry);
  }
}

function findEntry(rootNode, key) {
  let found = null;
  walk(rootNode, '', (p, entry) => { if (p === key) found = entry; });
  return found;
}

function findRendererKey(rootNode) {
  let key = null;
  walk(rootNode, '', (p) => {
    if (/^out\/renderer\/assets\/index-.*\.js$/.test(p)) key = p;
  });
  return key;
}

const { fd, headerSize: oldHeaderSize, json } = readHeader(asarPath);
const fileSize = fs.statSync(asarPath).size;
const oldDataStart = 8 + oldHeaderSize;
const oldDataSize = fileSize - oldDataStart;

const rendererKey = findRendererKey(json);
if (!rendererKey) throw new Error('未找到 out/renderer/assets/index-*.js');
const mainKey = 'out/main/index.js';

const changed = new Map();
for (const key of [rendererKey, mainKey]) {
  const local = path.join(root, key);
  if (!fs.existsSync(local)) throw new Error('解包目录缺少文件: ' + key);
  changed.set(key, fs.readFileSync(local));
}

for (const key of changed.keys()) {
  const entry = findEntry(json, key);
  if (!entry) throw new Error('asar 中缺少条目: ' + key);
  entry.size = changed.get(key).length;
  delete entry.integrity;
}

console.log('replacing:', [...changed.keys()].join(', '));
console.log('archive size:', fileSize);

let delta = 0;
let jsonStr = '';
let headerSize = 0;
for (let iter = 0; iter < 20; iter++) {
  let appendOffset = oldDataSize;
  for (const [key, buf] of changed) {
    findEntry(json, key).offset = String(appendOffset);
    appendOffset += buf.length;
  }
  jsonStr = JSON.stringify(json);
  const jsonLen = Buffer.byteLength(jsonStr);
  const paddedJson = (jsonLen + 3) & ~3;
  headerSize = 8 + paddedJson;
  const newDelta = headerSize - oldHeaderSize;
  if (newDelta === delta) break;
  delta = newDelta;
}

const totalHeader = 8 + headerSize;
const jsonLen = Buffer.byteLength(jsonStr);
const paddedJson = headerSize - 8;

const out = fs.openSync(outPath, 'w');
const header = Buffer.alloc(totalHeader);
header.writeUInt32LE(4, 0);
header.writeUInt32LE(headerSize, 4);
header.writeUInt32LE(4 + paddedJson, 8);
header.writeUInt32LE(jsonLen, 12);
header.write(jsonStr, 16, 'utf8');
fs.writeSync(out, header, 0, header.length, 0);

// 原数据区整体平移（offset 不变）
const CHUNK = 4 * 1024 * 1024;
let copied = 0;
while (copied < oldDataSize) {
  const len = Math.min(CHUNK, oldDataSize - copied);
  const buf = Buffer.alloc(len);
  fs.readSync(fd, buf, 0, len, oldDataStart + copied);
  fs.writeSync(out, buf, 0, len, 8 + headerSize + copied);
  copied += len;
}

// 追加修改后的文件
let pos = 8 + headerSize + oldDataSize;
for (const [, buf] of changed) {
  fs.writeSync(out, buf, 0, buf.length, pos);
  pos += buf.length;
}
fs.closeSync(out);
fs.closeSync(fd);

console.log('written', outPath, 'size', fs.statSync(outPath).size, 'expected', pos);
