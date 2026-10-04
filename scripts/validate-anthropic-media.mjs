#!/usr/bin/env node
// Source-only release gate. Never included in an installed plugin bundle.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const imageExtensions = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp']);
function imageInfo(bytes, extension) {
  if (extension === '.png' && bytes.length >= 45 && bytes.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10])) && bytes.toString('ascii', 12, 16) === 'IHDR' && bytes.toString('ascii', bytes.length - 8, bytes.length - 4) === 'IEND') {
    return {width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20)};
  }
  if (['.jpg', '.jpeg'].includes(extension) && bytes[0] === 255 && bytes[1] === 216 && bytes.at(-2) === 255 && bytes.at(-1) === 217) return {};
  if (extension === '.gif' && /^GIF8[79]a/.test(bytes.toString('ascii', 0, 6)) && bytes.at(-1) === 59) return {};
  if (extension === '.webp' && bytes.toString('ascii', 0, 4) === 'RIFF' && bytes.toString('ascii', 8, 12) === 'WEBP' && bytes.readUInt32LE(4) + 8 === bytes.length) return {};
  return null;
}

export function inspectMedia(inputRoot) {
  const root = path.resolve(inputRoot);
  const errors = [];
  const manifest = JSON.parse(fs.readFileSync(path.join(root, '.claude-plugin/plugin.json'), 'utf8'));
  const icon = typeof manifest.icon === 'string' ? path.resolve(root, manifest.icon) : null;
  function walk(directory) {
    for (const entry of fs.readdirSync(directory, {withFileTypes: true})) {
      if (entry.name === '.git') continue;
      const file = path.join(directory, entry.name);
      if (entry.isSymbolicLink()) { errors.push(`${path.relative(root, file)}: symbolic link`); continue; }
      if (entry.isDirectory()) { walk(file); continue; }
      const extension = path.extname(file).toLowerCase();
      if (!entry.isFile() || !imageExtensions.has(extension)) continue;
      if (fs.statSync(file).size >= 5 * 1024 * 1024) { errors.push(`${path.relative(root, file)}: image must be below 5 MiB`); continue; }
      const info = imageInfo(fs.readFileSync(file), extension);
      if (!info) errors.push(`${path.relative(root, file)}: invalid or incomplete image header/trailer`);
      else if (file === icon && info.width && (info.width !== info.height || info.width < 256)) errors.push('icon: use a square PNG at least 256 pixels');
    }
  }
  walk(root);
  return errors;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const errors = inspectMedia(process.argv[2] ?? '.');
    if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
    else console.log('PASS source-only media header/trailer checks.');
  } catch (error) { console.error(`Media validation failed: ${error.message}`); process.exitCode = 1; }
}
