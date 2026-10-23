/**
 * 全量校验重新打包后的 asar：逐条按 dataStart + offset 读取并与解包目录做 SHA256 比较。
 *
 * 用法：
 *   $env:ELECTRON_RUN_AS_NODE=1
 *   $env:HD_ASAR_NEW="C:\path\to\work\app.asar.new"
 *   $env:HD_ROOT="C:\path\to\work\asar"
 *   Houdoku.exe verify.js
 */
process.noAsar = true;
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const WORK = path.resolve(__dirname, '..', 'work');
const asarPath = process.env.HD_ASAR_NEW || path.join(WORK, 'app.asar.new');
const root = process.env.HD_ROOT || path.join(WORK, 'asar');

const fd = fs.openSync(asarPath, 'r');
const sizeBuf = Buffer.alloc(8);
fs.readSync(fd, sizeBuf, 0, 8, 0);
const headerSize = sizeBuf.readUInt32LE(4);
const hb = Buffer.alloc(headerSize);
fs.readSync(fd, hb, 0, headerSize, 8);
const jsonLen = hb.readUInt32LE(4);
const json = JSON.parse(hb.toString('utf8', 8, 8 + jsonLen));
const dataStart = 8 + headerSize;

function walk(node, rel, onFile) {
  for (const [name, entry] of Object.entries(node.files || {})) {
    const p = rel ? rel + '/' + name : name;
    if (entry.files) walk(entry, p, onFile);
    else onFile(p, entry);
  }
}

const sha = (b) => crypto.createHash('sha256').update(b).digest('hex');
let checked = 0;
let bad = 0;
let unpacked = 0;

walk(json, '', (p, entry) => {
  if (entry.unpacked) { unpacked++; return; }
  if (entry.size === 0) { checked++; return; }
  if (parseInt(entry.offset, 10) === 0) {
    console.log('skip broken-offset entry', p);
    checked++;
    return;
  }
  const local = path.join(root, p);
  if (!fs.existsSync(local)) { console.log('MISSING local', p); bad++; return; }
  const localBuf = fs.readFileSync(local);
  const off = dataStart + parseInt(entry.offset, 10);
  const buf = Buffer.alloc(entry.size);
  fs.readSync(fd, buf, 0, entry.size, off);
  if (buf.length !== localBuf.length) {
    console.log('SIZE MISMATCH', p, buf.length, localBuf.length);
    bad++;
    return;
  }
  if (sha(buf) !== sha(localBuf)) { console.log('HASH MISMATCH', p); bad++; return; }
  checked++;
});

fs.closeSync(fd);
console.log('checked', checked, 'bad', bad, 'unpacked', unpacked);
if (bad > 0) process.exitCode = 1;
