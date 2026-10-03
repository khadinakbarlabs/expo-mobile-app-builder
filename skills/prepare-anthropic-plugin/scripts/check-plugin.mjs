#!/usr/bin/env node
// Local structural preflight. No network requests, execution, writes or portal claims.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const exactPackage = /^(?:@[a-z0-9._-]+\/)?[a-z0-9._-]+(?:@\d+\.\d+\.\d+(?:-[\w.-]+)?|==\d+\.\d+\.\d+(?:[\w.-]+)?)$/i;
export function caseCollisions(paths) {
  const seen = new Set();
  return paths.filter(file => {
    const folded = file.toLowerCase();
    const duplicate = seen.has(folded);
    seen.add(folded);
    return duplicate;
  }).map(file => `${file}: case collision`);
}
export function unpinnedLaunchers(content) {
  const findings = [];
  for (const line of content.split('\n')) {
    for (const match of line.matchAll(/\b(npx|bunx|pnpm\s+dlx|yarn\s+dlx|uvx|pipx\s+run|uv\s+run)\s+/g)) {
      const launcher = match[1].replace(/\s+/g, ' ');
      const tail = line.slice(match.index + match[0].length).split(/[;&|`]/, 1)[0];
      const args = (tail.match(/[^\s"']+(?:"[^"']*"|'[^']*')?|"[^"]*"|'[^']*'/g) ?? []).map(arg => arg.replace(/["']/g, ''));
      if (launcher === 'uv run') {
        if (!args.includes('--locked') && !args.includes('--frozen')) findings.push(`${launcher} needs --locked or --frozen`);
        continue;
      }
      const packages = [];
      let explicitPackages = false;
      for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        if (arg.startsWith('--package=')) { explicitPackages = true; packages.push(arg.slice('--package='.length)); }
        else if (arg === '--package' || arg === '-p') { explicitPackages = true; packages.push(args[++i] ?? ''); }
        else if (['--yes', '-y', '--no', '-n', '--no-install', '--quiet', '-q', '--'].includes(arg)) continue;
        else if (arg.startsWith('-')) { findings.push(`${launcher}: unsupported launcher option requires manual review`); break; }
        else { if (!explicitPackages) packages.push(arg); break; }
      }
      if (!packages.length || packages.some(item => !exactPackage.test(item))) findings.push(`${launcher} package needs an exact version`);
    }
  }
  return findings;
}

function containedFile(root, reference) {
  if (typeof reference !== 'string' || !reference.startsWith('./') || reference.includes('\\')) return null;
  const file = path.resolve(root, reference);
  if (!file.startsWith(root + path.sep)) return null;
  let cursor = root;
  for (const part of path.relative(root, file).split(path.sep)) {
    cursor = path.join(cursor, part);
    if (!fs.existsSync(cursor) || fs.lstatSync(cursor).isSymbolicLink()) return null;
  }
  return fs.statSync(file).isFile() ? file : null;
}

function imageInfo(bytes, extension) {
  if (extension === '.png' && bytes.length >= 45 && bytes.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10])) && bytes.toString('ascii', 12, 16) === 'IHDR' && bytes.toString('ascii', bytes.length - 8, bytes.length - 4) === 'IEND') {
    return {width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20)};
  }
  if (['.jpg', '.jpeg'].includes(extension) && bytes[0] === 255 && bytes[1] === 216 && bytes.at(-2) === 255 && bytes.at(-1) === 217) return {};
  if (extension === '.gif' && /^GIF8[79]a/.test(bytes.toString('ascii', 0, 6)) && bytes.at(-1) === 59) return {};
  if (extension === '.webp' && bytes.toString('ascii', 0, 4) === 'RIFF' && bytes.toString('ascii', 8, 12) === 'WEBP' && bytes.readUInt32LE(4) + 8 === bytes.length) return {};
  return null;
}

export function inspectPlugin(inputRoot) {
  const root = path.resolve(inputRoot);
  const errors = [];
  const notes = ['Local structural checks do not replace strict Claude validation, portal validation, security review, or host behavior tests.'];
  const files = [];
  const blockedFiles = new Set();
  if (!fs.existsSync(root) || !fs.lstatSync(root).isDirectory() || fs.lstatSync(root).isSymbolicLink()) throw new Error('Plugin root must be a regular directory');
  const names = new Set();
  const systemFiles = new Set(['.ds_store', 'thumbs.db', 'desktop.ini', '__macosx']);
  function walk(directory) {
    for (const entry of fs.readdirSync(directory, {withFileTypes: true})) {
      if (entry.name === '.git') continue;
      const file = path.join(directory, entry.name);
      const relative = path.relative(root, file).split(path.sep).join('/');
      const folded = relative.toLowerCase();
      if (names.has(folded)) errors.push(`${relative}: case collision`);
      names.add(folded);
      if (systemFiles.has(entry.name.toLowerCase())) errors.push(`${relative}: forbidden system file`);
      if (/[<>:"|?*\\\x00-\x1f]/.test(entry.name) || /[. ]$/.test(entry.name) || /^(?:con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)/i.test(entry.name)) errors.push(`${relative}: invalid Windows filename`);
      if (entry.isSymbolicLink()) { errors.push(`${relative}: Symbolic link`); continue; }
      if (entry.name.startsWith('.env') || entry.name.startsWith('.dev.vars') || /\.(?:p8|p12|pem|key|jks|keystore)$/i.test(entry.name) || /^(?:credentials|service-account.*|google-services)\.json$/i.test(entry.name) || entry.name === 'GoogleService-Info.plist') {
        errors.push(`${relative}: credential-shaped artifact`);
        blockedFiles.add(file);
        if (entry.isDirectory()) continue;
      }
      if (entry.isDirectory()) walk(file);
      else if (entry.isFile()) files.push(file);
      else errors.push(`${relative}: unsupported filesystem entry`);
    }
  }
  walk(root);
  if (files.length > 512) errors.push(`Plugin has ${files.length} files; directory preflight limit is 512`);
  let totalBytes = 0;
  for (const file of files) {
    const relative = path.relative(root, file);
    const size = fs.statSync(file).size;
    totalBytes += size;
    if (blockedFiles.has(file)) continue;
    if (size >= 5 * 1024 * 1024) { errors.push(`${relative}: file must be below 5 MiB`); continue; }
    const bytes = fs.readFileSync(file);
    const extension = path.extname(file).toLowerCase();
    if (['.png', '.jpg', '.jpeg', '.gif', '.webp'].includes(extension)) {
      if (!imageInfo(bytes, extension)) errors.push(`${relative}: invalid or incomplete image header/trailer`);
      continue;
    }
    // This conservative builder doesn't ship fonts; other binary formats need review.
    let text;
    try { text = new TextDecoder('utf-8', {fatal: true}).decode(bytes); }
    catch { errors.push(`${relative}: Unsupported binary`); continue; }
    if (text.includes('\0')) errors.push(`${relative}: Unsupported binary`);
    if (size >= 256 * 1024) errors.push(`${relative}: text must be below 256 KiB`);
    if (text.startsWith('version https://git-lfs.github.com/spec/')) errors.push(`${relative}: LFS pointer`);
    if (path.basename(file) === '.gitattributes' && /\b(?:export-ignore|export-subst|filter)\b/.test(text)) errors.push(`${relative}: archive-rewriting Git attribute`);
    // Only instructions and executable helpers are launcher-bearing. JSON fields are checked by the native validator.
    if (['.md', '.sh', '.mjs', '.js', '.py'].includes(extension)) for (const finding of unpinnedLaunchers(text)) errors.push(`${relative}: ${finding}`);
  }
  if (totalBytes >= 256 * 1024 * 1024 || names.size >= 10000) errors.push('Repository archive size/count needs reduction');
  let manifest = {};
  const manifestFile = containedFile(root, './.claude-plugin/plugin.json');
  try {
    if (!manifestFile || fs.statSync(manifestFile).size >= 256 * 1024) throw new Error('missing, unsafe or oversized manifest');
    manifest = JSON.parse(fs.readFileSync(manifestFile, 'utf8'));
    if (!manifest || typeof manifest !== 'object' || Array.isArray(manifest)) { manifest = {}; throw new Error('manifest must be an object'); }
  } catch { errors.push('Missing or invalid .claude-plugin/plugin.json'); }
  if (!/^[a-z0-9](?:[a-z0-9-]{0,62}[a-z0-9])?$/.test(manifest.name ?? '')) errors.push('Invalid plugin name');
  if (!/^\d+\.\d+\.\d+(?:-[\w.-]+)?$/.test(manifest.version ?? '')) errors.push('Explicit semantic version required');
  for (const field of ['displayName', 'description', 'license']) if (typeof manifest[field] !== 'string' || !manifest[field].trim()) errors.push(`${field}: listing value missing`);
  if (typeof manifest.author?.name !== 'string' || !manifest.author.name.trim()) errors.push('author.name: publisher missing');
  for (const field of ['documentationUrl', 'supportUrl', 'privacyPolicyUrl', 'termsOfServiceUrl']) {
    try {
      const url = new URL(manifest[field]);
      if (url.protocol !== 'https:' || url.username || url.password || !url.hostname) throw new Error();
    } catch { errors.push(`${field}: absolute credential-free HTTPS URL required`); }
  }
  const icon = containedFile(root, manifest.icon);
  if (!icon) errors.push('icon: contained regular image file required');
  else if (fs.statSync(icon).size >= 5 * 1024 * 1024) errors.push('icon: file must be below 5 MiB');
  else {
    const info = imageInfo(fs.readFileSync(icon), path.extname(icon).toLowerCase());
    if (!info) errors.push('icon: image header/trailer invalid');
    else if (info.width && (info.width !== info.height || info.width < 256)) errors.push('icon: use a square PNG at least 256 pixels for this brand workflow');
  }
  const agents = typeof manifest.agents === 'string' ? [manifest.agents] : manifest.agents ?? [];
  if (!Array.isArray(agents)) errors.push('agents: expected a file path or array');
  else for (const reference of agents) if (!containedFile(root, reference)) errors.push('agents: missing or escaping file route');
  const readme = containedFile(root, './README.md');
  const words = readme && fs.statSync(readme).size < 256 * 1024 ? fs.readFileSync(readme, 'utf8').replace(/```[\s\S]*?```/g, '').trim().split(/\s+/).length : 0;
  if (words < 40) errors.push('README needs at least 40 words outside code blocks');
  if (!containedFile(root, './LICENSE')) errors.push('LICENSE missing');
  if (manifest.mcpServers || fs.existsSync(path.join(root, '.mcp.json')) || manifest.hooks || fs.existsSync(path.join(root, 'hooks'))) notes.push('Runtime components present: review credential transport, pinned dependencies, permissions and every outbound destination separately.');
  return {status: errors.length ? 'needs-fixes' : 'local-checks-passed', name: manifest.name, version: manifest.version, fileCount: files.length, unpackedBytes: totalBytes, errors, notes, portalValidated: false, securityScanPassed: false, userVerified: false, externalActionPerformed: false};
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const report = inspectPlugin(process.argv[2] ?? '.');
    console.log(JSON.stringify(report, null, 2));
    if (report.errors.length) process.exitCode = 1;
  } catch (error) { console.error(`Preflight failed: ${error.message}`); process.exitCode = 1; }
}
