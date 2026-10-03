#!/usr/bin/env node

/**
 * Validate the strict, skills-only ZIP contract used by the OpenAI Plugins
 * submission portal. This is intentionally separate from validate-release.mjs:
 * the repository also ships portable Agent Plugins, Claude, and Cursor metadata
 * that must not be placed in the OpenAI-only upload archive.
 */

import childProcess from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(scriptDirectory, "..");
const target = process.argv[2] ? path.resolve(process.argv[2]) : packageRoot;

const LIMITS = {
  archiveCompressedBytes: 100 * 1024 * 1024,
  archiveUncompressedBytes: 512 * 1024 * 1024,
  archiveEntries: 5_000,
  archiveMemberBytes: 100 * 1024 * 1024,
  archivePathSegments: 20,
  archivePathCharacters: 1_024,
  name: 64,
  version: 64,
  description: 1_024,
  displayName: 30,
  shortDescription: 30,
  longDescription: 4_000,
  developerName: 80,
  authorName: 120,
  capabilityCount: 20,
  capability: 120,
  promptCount: 3,
  prompt: 128,
  url: 1_024,
  imageMinimum: 48,
  imageMaximum: 4_096,
};

const CATEGORIES = new Set([
  "Productivity",
  "Creativity",
  "Developer Tools",
  "Business & Operations",
  "Data & Analytics",
  "Communication",
  "Education & Research",
  "Security",
  "Finance",
  "Healthcare",
  "Travel",
  "Entertainment",
  "Other",
]);

const failures = [];
const warnings = [];

function fail(message) {
  failures.push(message);
}

function warn(message) {
  warnings.push(message);
}

function displayPath(filePath, root) {
  return path.relative(root, filePath).split(path.sep).join("/") || ".";
}

function normalized(value) {
  return String(value).normalize("NFKC").trim().replace(/\s+/gu, " ");
}

function hasUnsupportedText(value, allowLineBreaks = false) {
  const pattern = allowLineBreaks
    ? /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F\u2028\u2029]/u
    : /[\u0000-\u001F\u007F\u2028\u2029]/u;
  return pattern.test(String(value));
}

function requireText(object, field, limit, options = {}) {
  const value = object?.[field];
  if (typeof value !== "string" || value.length === 0) {
    fail(`${options.path ?? field}: required non-empty string`);
    return null;
  }
  if ([...value].length > limit) fail(`${options.path ?? field}: exceeds ${limit} characters`);
  if (hasUnsupportedText(value, options.allowLineBreaks)) {
    fail(`${options.path ?? field}: contains unsupported control or separator characters`);
  }
  if (options.singleLine && normalized(value) !== value) {
    fail(`${options.path ?? field}: must be normalized single-line text`);
  }
  return value;
}

function isSemver(value) {
  return /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?(?:\+[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?$/u.test(value);
}

function validateUrl(value, field, max = LIMITS.url) {
  if (typeof value !== "string") {
    fail(`${field}: must be a string when provided`);
    return;
  }
  if ([...value].length > max) fail(`${field}: exceeds ${max} characters`);
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") fail(`${field}: must use HTTPS`);
    if (url.username || url.password) fail(`${field}: must not contain credentials`);
  } catch {
    fail(`${field}: must be a valid URL`);
  }
}

function isSafeRelativePath(value) {
  return typeof value === "string" && value.startsWith("./") &&
    !value.includes("\\") && !value.split("/").includes("..") &&
    !path.posix.isAbsolute(value);
}

function resolveDeclaredPath(root, value, field) {
  if (!isSafeRelativePath(value)) {
    fail(`${field}: must be a safe ./ relative path`);
    return null;
  }
  const resolved = path.resolve(root, value);
  if (!resolved.startsWith(`${root}${path.sep}`)) {
    fail(`${field}: resolves outside the plugin root`);
    return null;
  }
  if (!fs.existsSync(resolved)) fail(`${field}: referenced file or directory is missing (${value})`);
  return resolved;
}

function readJson(filePath, label) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    fail(`${label}: invalid JSON (${error.message})`);
    return null;
  }
}

function parseFrontmatter(content, label) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/u);
  if (!match) {
    fail(`${label}: missing closed YAML frontmatter`);
    return null;
  }
  const fields = {};
  for (const line of match[1].split(/\r?\n/u)) {
    const field = line.match(/^([A-Za-z][A-Za-z0-9_-]*):\s*(.*)$/u);
    if (!field) continue;
    let value = field[2].trim();
    if ((value.startsWith("\"") && value.endsWith("\"")) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    fields[field[1]] = value;
  }
  return fields;
}

function walkFiles(root) {
  const files = [];
  const directories = [];
  const visit = (directory) => {
    directories.push(directory);
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const filePath = path.join(directory, entry.name);
      if (entry.isSymbolicLink()) {
        fail(`${displayPath(filePath, root)}: symbolic links are not allowed`);
        continue;
      }
      if (entry.isDirectory()) visit(filePath);
      else if (entry.isFile()) files.push(filePath);
      else fail(`${displayPath(filePath, root)}: special filesystem entry is not allowed`);
    }
  };
  visit(root);
  return { files, directories };
}

function readPngDimensions(buffer) {
  if (buffer.length < 24 || buffer.subarray(0, 8).toString("hex") !== "89504e470d0a1a0a") return null;
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

function readWebpDimensions(buffer) {
  if (buffer.length < 30 || buffer.toString("ascii", 0, 4) !== "RIFF" || buffer.toString("ascii", 8, 12) !== "WEBP") return null;
  const chunk = buffer.toString("ascii", 12, 16);
  if (chunk === "VP8X") {
    return {
      width: 1 + buffer.readUIntLE(24, 3),
      height: 1 + buffer.readUIntLE(27, 3),
    };
  }
  return null;
}

function readJpegDimensions(buffer) {
  if (buffer.length < 4 || buffer[0] !== 0xff || buffer[1] !== 0xd8) return null;
  let offset = 2;
  while (offset + 9 < buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset += 1;
      continue;
    }
    const marker = buffer[offset + 1];
    offset += 2;
    if (marker === 0xd8 || marker === 0xd9) continue;
    if (offset + 2 > buffer.length) break;
    const segmentLength = buffer.readUInt16BE(offset);
    if (segmentLength < 2 || offset + segmentLength > buffer.length) break;
    const isFrame = (marker >= 0xc0 && marker <= 0xc3) ||
      (marker >= 0xc5 && marker <= 0xc7) ||
      (marker >= 0xc9 && marker <= 0xcb) ||
      (marker >= 0xcd && marker <= 0xcf);
    if (isFrame && offset + 7 <= buffer.length) {
      return { width: buffer.readUInt16BE(offset + 5), height: buffer.readUInt16BE(offset + 3) };
    }
    offset += segmentLength;
  }
  return null;
}

function validateImage(filePath, field, root) {
  const extension = path.extname(filePath).toLowerCase();
  if (!new Set([".png", ".jpg", ".jpeg", ".webp"]).has(extension)) {
    fail(`${field}: must be PNG, JPEG, or WebP`);
    return;
  }
  const buffer = fs.readFileSync(filePath);
  const dimensions = readPngDimensions(buffer) ?? readJpegDimensions(buffer) ?? readWebpDimensions(buffer);
  if (!dimensions) {
    fail(`${field}: image cannot be decoded safely`);
    return;
  }
  if (dimensions.width !== dimensions.height) fail(`${field}: image must be square (${dimensions.width}x${dimensions.height})`);
  if (dimensions.width < LIMITS.imageMinimum || dimensions.width > LIMITS.imageMaximum) {
    fail(`${field}: image dimensions must be ${LIMITS.imageMinimum}..${LIMITS.imageMaximum}px`);
  }
  if (!filePath.startsWith(`${root}${path.sep}`)) fail(`${field}: image escapes the plugin root`);
}

function hexLuminance(value) {
  const channels = value.slice(1).match(/../gu).map((channel) => Number.parseInt(channel, 16) / 255);
  const linear = channels.map((channel) => channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4);
  return (0.2126 * linear[0]) + (0.7152 * linear[1]) + (0.0722 * linear[2]);
}

function contrastRatio(first, second) {
  const firstLuminance = hexLuminance(first);
  const secondLuminance = hexLuminance(second);
  return (Math.max(firstLuminance, secondLuminance) + 0.05) / (Math.min(firstLuminance, secondLuminance) + 0.05);
}

function validateManifest(root) {
  const codexPath = path.join(root, ".codex-plugin", "plugin.json");
  const agentPath = path.join(root, ".agent-plugin", "plugin.json");
  const claudePath = path.join(root, ".claude-plugin", "plugin.json");
  const supported = [codexPath, agentPath, claudePath].filter((filePath) => fs.existsSync(filePath));
  if (supported.length !== 1) {
    fail(`plugin manifest: expected exactly one supported OpenAI upload manifest, found ${supported.length}`);
  }
  if (!fs.existsSync(codexPath)) fail("plugin manifest: .codex-plugin/plugin.json is required for a direct OpenAI upload");
  if (fs.existsSync(path.join(root, "plugin.json"))) {
    fail("plugin root: root plugin.json creates Agent Plugins conversion ambiguity; use an OpenAI-only bundle");
  }
  const manifest = readJson(codexPath, ".codex-plugin/plugin.json");
  if (!manifest || typeof manifest !== "object" || Array.isArray(manifest)) return null;

  const knownTopLevel = new Set([
    "name", "version", "description", "author", "homepage", "repository", "license", "keywords",
    "skills", "mcpServers", "apps", "hooks", "interface",
  ]);
  for (const key of Object.keys(manifest)) if (!knownTopLevel.has(key)) warn(`.codex-plugin/plugin.json: unknown top-level field ${key}`);

  const name = requireText(manifest, "name", LIMITS.name, { path: ".codex-plugin/plugin.json:name", singleLine: true });
  const validName = typeof name === "string" && (/^[A-Za-z0-9]$/u.test(name) || /^[A-Za-z0-9][A-Za-z0-9_-]{0,62}[A-Za-z0-9]$/u.test(name));
  if (name && !validName) {
    fail(".codex-plugin/plugin.json:name: must use only ASCII letters, digits, _ or - and be <=64 characters");
  }
  const version = requireText(manifest, "version", LIMITS.version, { path: ".codex-plugin/plugin.json:version", singleLine: true });
  if (version && !isSemver(version)) fail(".codex-plugin/plugin.json:version: must be semantic versioning");
  requireText(manifest, "description", LIMITS.description, { path: ".codex-plugin/plugin.json:description", allowLineBreaks: true });

  if (!manifest.author || typeof manifest.author !== "object" || Array.isArray(manifest.author)) {
    fail(".codex-plugin/plugin.json:author: required object");
  } else {
    requireText(manifest.author, "name", LIMITS.authorName, { path: ".codex-plugin/plugin.json:author.name", singleLine: true });
    if (manifest.author.url !== undefined) validateUrl(manifest.author.url, ".codex-plugin/plugin.json:author.url", 2_048);
    if (manifest.author.email !== undefined && typeof manifest.author.email !== "string") fail(".codex-plugin/plugin.json:author.email: must be a string");
  }

  for (const field of ["homepage", "repository"]) {
    if (manifest[field] !== undefined) validateUrl(manifest[field], `.codex-plugin/plugin.json:${field}`, 2_048);
  }
  if (manifest.license !== undefined && (typeof manifest.license !== "string" || !normalized(manifest.license))) fail(".codex-plugin/plugin.json:license: must be non-empty text when provided");
  if (manifest.keywords !== undefined && (!Array.isArray(manifest.keywords) || manifest.keywords.some((keyword) => typeof keyword !== "string" || !normalized(keyword)))) fail(".codex-plugin/plugin.json:keywords: must be an array of non-empty strings");

  if (manifest.mcpServers !== undefined || fs.existsSync(path.join(root, ".mcp.json"))) fail("skills-only plugin: MCP configuration is not allowed; use the With MCP submission path");
  if (manifest.apps !== undefined || fs.existsSync(path.join(root, ".app.json"))) fail("skills-only plugin: app configuration is not allowed; use the With MCP submission path");
  if (manifest.interface?.screenshots !== undefined) fail("skills-only plugin: interface.screenshots is not allowed");

  const interfaceData = manifest.interface;
  if (!interfaceData || typeof interfaceData !== "object" || Array.isArray(interfaceData)) {
    fail(".codex-plugin/plugin.json:interface: required object");
    return manifest;
  }
  const displayName = requireText(interfaceData, "displayName", LIMITS.displayName, { path: ".codex-plugin/plugin.json:interface.displayName", singleLine: true });
  requireText(interfaceData, "shortDescription", LIMITS.shortDescription, { path: ".codex-plugin/plugin.json:interface.shortDescription", singleLine: true });
  requireText(interfaceData, "longDescription", LIMITS.longDescription, { path: ".codex-plugin/plugin.json:interface.longDescription", allowLineBreaks: true });
  const developerName = requireText(interfaceData, "developerName", LIMITS.developerName, { path: ".codex-plugin/plugin.json:interface.developerName", singleLine: true });
  if (manifest.author?.name && developerName && normalized(manifest.author.name) !== normalized(developerName)) warn("author.name and interface.developerName differ; the verified identity may replace both");
  if (typeof interfaceData.category !== "string" || !CATEGORIES.has(interfaceData.category) || normalized(interfaceData.category) !== interfaceData.category) fail(".codex-plugin/plugin.json:interface.category: required supported category");
  if (interfaceData.capabilities !== undefined) {
    if (!Array.isArray(interfaceData.capabilities)) fail(".codex-plugin/plugin.json:interface.capabilities: must be an array");
    else {
      if (interfaceData.capabilities.length > LIMITS.capabilityCount) fail(".codex-plugin/plugin.json:interface.capabilities: exceeds 20 entries");
      interfaceData.capabilities.forEach((capability, index) => requireText(interfaceData.capabilities, index, LIMITS.capability, { path: `.codex-plugin/plugin.json:interface.capabilities[${index}]`, singleLine: true }));
    }
  }
  const prompts = interfaceData.defaultPrompt === undefined ? [] : (Array.isArray(interfaceData.defaultPrompt) ? interfaceData.defaultPrompt : [interfaceData.defaultPrompt]);
  if (interfaceData.defaultPrompt !== undefined && !Array.isArray(interfaceData.defaultPrompt) && typeof interfaceData.defaultPrompt !== "string") fail(".codex-plugin/plugin.json:interface.defaultPrompt: must be a string or list of strings");
  if (prompts.length > LIMITS.promptCount) fail(".codex-plugin/plugin.json:interface.defaultPrompt: exceeds three prompts");
  const promptKeys = new Set();
  prompts.forEach((prompt, index) => {
    requireText(prompts, index, LIMITS.prompt, { path: `.codex-plugin/plugin.json:interface.defaultPrompt[${index}]`, singleLine: true });
    const key = normalized(prompt);
    if (promptKeys.has(key)) fail(`.codex-plugin/plugin.json:interface.defaultPrompt[${index}]: duplicate after normalization`);
    promptKeys.add(key);
    if (/(^|\s)@[A-Za-z0-9_-]+/u.test(prompt)) fail(`.codex-plugin/plugin.json:interface.defaultPrompt[${index}]: app @mentions are not allowed`);
  });
  for (const field of ["websiteURL", "supportURL", "privacyPolicyURL", "termsOfServiceURL"]) {
    if (interfaceData[field] !== undefined) validateUrl(interfaceData[field], `.codex-plugin/plugin.json:interface.${field}`);
  }
  for (const field of ["brandColor", "brandColorDark"]) {
    if (interfaceData[field] !== undefined && !/^#[0-9A-Fa-f]{6}$/u.test(interfaceData[field])) fail(`.codex-plugin/plugin.json:interface.${field}: must be a six-digit hex color`);
  }
  if (typeof interfaceData.brandColor === "string" && /^#[0-9A-Fa-f]{6}$/u.test(interfaceData.brandColor) && contrastRatio(interfaceData.brandColor, "#FFFFFF") < 2) {
    fail(".codex-plugin/plugin.json:interface.brandColor: must have at least 2:1 contrast against white");
  }
  if (typeof interfaceData.brandColorDark === "string" && /^#[0-9A-Fa-f]{6}$/u.test(interfaceData.brandColorDark) && contrastRatio(interfaceData.brandColorDark, "#212121") < 2) {
    fail(".codex-plugin/plugin.json:interface.brandColorDark: must have at least 2:1 contrast against #212121");
  }
  for (const field of ["composerIcon", "logo"]) {
    if (interfaceData[field] !== undefined) {
      const asset = resolveDeclaredPath(root, interfaceData[field], `.codex-plugin/plugin.json:interface.${field}`);
      if (asset && fs.statSync(asset).isFile()) validateImage(asset, `.codex-plugin/plugin.json:interface.${field}`, root);
    }
  }
  if (manifest.skills !== "./skills/" && manifest.skills !== "./skills") fail(".codex-plugin/plugin.json:skills: must resolve to the root ./skills directory");
  if (!fs.existsSync(path.join(root, "skills")) || !fs.statSync(path.join(root, "skills")).isDirectory()) fail("skills/: required root directory is missing");
  return manifest;
}

function validateSkillMetadata(root) {
  const skillRoot = path.join(root, "skills");
  if (!fs.existsSync(skillRoot)) return 0;
  const entries = fs.readdirSync(skillRoot, { withFileTypes: true });
  let count = 0;
  for (const entry of entries) {
    const skillDirectory = path.join(skillRoot, entry.name);
    if (!entry.isDirectory() || entry.isSymbolicLink() || entry.name.startsWith(".")) {
      fail(`skills/${entry.name}: every immediate child must be a visible directory`);
      continue;
    }
    const skillFile = path.join(skillDirectory, "SKILL.md");
    if (!fs.existsSync(skillFile) || !fs.statSync(skillFile).isFile()) {
      fail(`skills/${entry.name}: SKILL.md is required`);
      continue;
    }
    count += 1;
    const fields = parseFrontmatter(fs.readFileSync(skillFile, "utf8"), `skills/${entry.name}/SKILL.md`);
    if (!fields) continue;
    const name = requireText(fields, "name", LIMITS.name, { path: `skills/${entry.name}/SKILL.md:name`, singleLine: true });
    const description = requireText(fields, "description", LIMITS.description, { path: `skills/${entry.name}/SKILL.md:description`, singleLine: true });
    if (name !== entry.name) fail(`skills/${entry.name}/SKILL.md:name: must match its directory`);
    if (description && normalized(description) !== description) fail(`skills/${entry.name}/SKILL.md:description: must be normalized text`);
    if (!fs.existsSync(path.join(skillDirectory, "agents", "openai.yaml"))) fail(`skills/${entry.name}/agents/openai.yaml: required metadata is missing`);
    else validateOpenAiSkillYaml(root, skillDirectory, entry.name);
    for (const link of fs.readFileSync(skillFile, "utf8").matchAll(/\]\((?!https?:|mailto:|#)([^)\s]+)\)/gu)) {
      const reference = link[1].replace(/^<|>$/gu, "").split("#", 1)[0];
      const resolved = path.resolve(skillDirectory, reference);
      if (!resolved.startsWith(`${skillDirectory}${path.sep}`) || !fs.existsSync(resolved)) fail(`skills/${entry.name}/SKILL.md: link is missing or escapes skill (${reference})`);
    }
  }
  if (count === 0) fail("skills/: no valid skills found");
  return count;
}

function validateOpenAiSkillYaml(root, skillDirectory, skillName) {
  const filePath = path.join(skillDirectory, "agents", "openai.yaml");
  const content = fs.readFileSync(filePath, "utf8");
  if (hasUnsupportedText(content, true)) fail(`skills/${skillName}/agents/openai.yaml: contains unsupported control characters`);
  if (!/^interface:\s*$/mu.test(content)) fail(`skills/${skillName}/agents/openai.yaml: interface mapping is required`);
  for (const field of ["display_name", "short_description"]) {
    const match = content.match(new RegExp(`^\\s{2}${field}:\\s*["']?([^"'\\r\\n]+)["']?\\s*$`, "mu"));
    if (!match || !normalized(match[1])) fail(`skills/${skillName}/agents/openai.yaml: interface.${field} is required`);
    else if (normalized(match[1]) !== match[1].trim()) fail(`skills/${skillName}/agents/openai.yaml: interface.${field} must be normalized text`);
  }
  const iconMatches = content.matchAll(/^\s{2}(icon_small|icon_large):\s*["']?([^"'\r\n]+)["']?\s*$/gmu);
  for (const match of iconMatches) {
    const rawPath = match[2].trim();
    const asset = path.resolve(skillDirectory, rawPath);
    if (rawPath.startsWith("/") || rawPath.includes("\\") || rawPath.split("/").includes("..") || !asset.startsWith(`${skillDirectory}${path.sep}`)) {
      fail(`skills/${skillName}/agents/openai.yaml:${match[1]}: must be a safe skill-relative path`);
      continue;
    }
    if (!fs.existsSync(asset)) fail(`skills/${skillName}/agents/openai.yaml:${match[1]}: referenced asset is missing (${rawPath})`);
    if (fs.existsSync(asset) && fs.statSync(asset).isFile()) validateImage(asset, `skills/${skillName}/agents/openai.yaml:${match[1]}`, root);
  }
}

function commandOutput(command, args) {
  try {
    return childProcess.execFileSync(command, args, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
  } catch (error) {
    fail(`${command}: ${error.stderr?.toString().trim() || error.message}`);
    return "";
  }
}

function validateArchive(archivePath) {
  if (!archivePath.toLowerCase().endsWith(".zip")) {
    fail("archive: expected a .zip file");
    return null;
  }
  const archiveStat = fs.statSync(archivePath);
  if (archiveStat.size > LIMITS.archiveCompressedBytes) fail(`archive: compressed size exceeds ${LIMITS.archiveCompressedBytes} bytes`);
  const entries = commandOutput("unzip", ["-Z1", archivePath]).split(/\r?\n/u).filter(Boolean);
  if (entries.length > LIMITS.archiveEntries) fail(`archive: contains ${entries.length} entries; maximum is ${LIMITS.archiveEntries}`);
  const normalizedEntries = new Map();
  const fileEntries = new Set();
  for (const raw of entries) {
    if (raw.length > LIMITS.archivePathCharacters) fail(`archive: path exceeds ${LIMITS.archivePathCharacters} characters (${raw})`);
    if (raw.includes("\\") || raw.startsWith("/") || /^[A-Za-z]:/u.test(raw)) fail(`archive: unsafe path (${raw})`);
    const trimmed = raw.endsWith("/") ? raw.slice(0, -1) : raw;
    const segments = trimmed.split("/");
    if (segments.some((segment) => !segment || segment === "." || segment === "..")) fail(`archive: unsafe path segments (${raw})`);
    if (segments.length > LIMITS.archivePathSegments) fail(`archive: path exceeds ${LIMITS.archivePathSegments} segments (${raw})`);
    const key = trimmed.normalize("NFKC").toLocaleLowerCase("en-US");
    if (normalizedEntries.has(key)) fail(`archive: duplicate or normalization/case collision (${raw})`);
    normalizedEntries.set(key, raw);
    if (!raw.endsWith("/")) fileEntries.add(key);
  }
  for (const key of fileEntries) {
    const parts = key.split("/");
    for (let index = 1; index < parts.length; index += 1) {
      if (fileEntries.has(parts.slice(0, index).join("/"))) fail(`archive: file/directory path conflict (${key})`);
    }
  }
  const details = commandOutput("zipinfo", ["-l", archivePath]);
  const memberDetails = [];
  for (const line of details.split(/\r?\n/u)) {
    const match = line.match(/^\s*(\S+)\s+\S+\s+\S+\s+(\d+)\s+\S+\s+(\d+)\s+\S+\s+\S+\s+\S+\s+(.+)$/u);
    if (match) memberDetails.push({ mode: match[1], uncompressed: Number(match[2]), compressed: Number(match[3]), path: match[4] });
  }
  if (memberDetails.length !== entries.length) fail(`archive: could not parse all member sizes (${memberDetails.length}/${entries.length})`);
  let totalUncompressed = 0;
  for (const member of memberDetails) {
    totalUncompressed += member.uncompressed;
    if (member.uncompressed > LIMITS.archiveMemberBytes) fail(`archive: member exceeds ${LIMITS.archiveMemberBytes} bytes (${member.path})`);
    if (member.mode.startsWith("l") || member.mode.startsWith("s")) fail(`archive: symbolic link member is not allowed (${member.path})`);
  }
  if (totalUncompressed > LIMITS.archiveUncompressedBytes) fail(`archive: uncompressed size exceeds ${LIMITS.archiveUncompressedBytes} bytes`);
  if (commandOutput("unzip", ["-t", archivePath]) === "") return null;

  const temporaryRoot = fs.mkdtempSync(path.join(os.tmpdir(), "openai-plugin-upload-"));
  try {
    childProcess.execFileSync("unzip", ["-q", archivePath, "-d", temporaryRoot], { stdio: "ignore" });
  } catch (error) {
    fail(`archive: extraction failed (${error.message})`);
    fs.rmSync(temporaryRoot, { recursive: true, force: true });
    return null;
  }
  const topSegments = new Set(entries.map((entry) => entry.split("/")[0]).filter(Boolean));
  const hasRootManifest = entries.some((entry) => entry === ".codex-plugin/plugin.json");
  const candidateRoot = hasRootManifest ? temporaryRoot : (topSegments.size === 1 ? path.join(temporaryRoot, [...topSegments][0]) : null);
  const root = candidateRoot && [".codex-plugin", ".agent-plugin", ".claude-plugin"].some((directory) => fs.existsSync(path.join(candidateRoot, directory, "plugin.json")))
    ? candidateRoot
    : null;
  if (!root) {
    fail(topSegments.size === 1 ? "archive: plugin manifest is missing from the only top-level directory" : "archive: plugin root is ambiguous or missing");
    fs.rmSync(temporaryRoot, { recursive: true, force: true });
  }
  return { root, temporaryRoot };
}

function main() {
  if (!fs.existsSync(target)) {
    fail(`target does not exist: ${target}`);
  } else if (fs.statSync(target).isFile()) {
    const extracted = validateArchive(target);
    if (extracted?.root) {
      const files = walkFiles(extracted.root);
      validateManifest(extracted.root);
      const count = validateSkillMetadata(extracted.root);
      if (count > 0) console.log(`checked ${count} skills from archive`);
      fs.rmSync(extracted.temporaryRoot, { recursive: true, force: true });
    }
  } else if (fs.statSync(target).isDirectory()) {
    const files = walkFiles(target);
    validateManifest(target);
    const count = validateSkillMetadata(target);
    if (count > 0) console.log(`checked ${count} skills from directory`);
    void files;
  } else {
    fail(`target must be a ZIP file or directory: ${target}`);
  }

  if (warnings.length > 0) {
    for (const warning of warnings) console.warn(`WARN ${warning}`);
  }
  if (failures.length > 0) {
    console.error(`FAIL OpenAI skills-only validation: ${failures.length} finding(s).`);
    for (const failure of failures) console.error(`- ${failure}`);
    process.exit(1);
  }
  console.log(`PASS OpenAI skills-only validation: ${target}`);
}

main();
