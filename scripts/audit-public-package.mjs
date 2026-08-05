#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(process.argv[2] ?? path.join(scriptDirectory, ".."));
const ignoredDirectories = new Set([".git", "node_modules", ".expo", "dist", "coverage"]);
const credentialFilePattern = /(^|\/)(?:\.env(?:\..+)?|GoogleService-Info\.plist|google-services\.json|credentials\.json|service-account[^/]*\.json|[^/]+\.(?:p8|p12|pem|key|jks|keystore))$/i;
const textExtensions = new Set([".md", ".mjs", ".js", ".cjs", ".json", ".yaml", ".yml", ".txt", ".svg", ".toml", ".sh"]);
const contentRules = [
  ["private-key-block", /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/],
  ["openai-key", /\bsk-[A-Za-z0-9_-]{16,}\b/],
  ["aws-access-key", /\bAKIA[0-9A-Z]{16}\b/],
  ["google-api-key", /\bAIza[0-9A-Za-z_-]{20,}\b/],
  ["github-token", /\b(?:gh[pousr]_[A-Za-z0-9_]{20,}|github_pat_[A-Za-z0-9_]{20,})\b/],
  ["slack-token", /\bxox[baprs]-[A-Za-z0-9-]{10,}\b/],
  ["jwt", /\beyJ[A-Za-z0-9_-]{16,}\.[A-Za-z0-9_-]{16,}\.[A-Za-z0-9_-]{16,}\b/],
  ["private-filesystem-path", /(?:^|[\s'"`])\/(?:Users|home)\/[A-Za-z0-9_.-]+/m],
  ["private-source-marker", /\b(?:mobile-studio|ios-studio|the plugin author ventures)\b/i],
  ["network-pipe-to-shell", /\b(?:curl|wget)\b[^\r\n]*\|\s*(?:ba)?sh\b/i],
];
const assignmentPattern = /^(?:export\s+)?([A-Z][A-Z0-9_]*(?:TOKEN|SECRET|API_KEY|PRIVATE_KEY|PASSWORD|CREDENTIAL)[A-Z0-9_]*)\s*[:=]\s*["']?([^\s"']+)/gm;
const safeValuePattern = /^(?:<[^>]+>|\$\{[^}]+\}|\$[A-Z_][A-Z0-9_]*|process\.env\.|YOUR_|REPLACE_|EXAMPLE_|redacted|placeholder)/i;

function collectFiles(directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (ignoredDirectories.has(entry.name)) continue;
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...collectFiles(fullPath));
    if (entry.isFile()) files.push(fullPath);
  }
  return files;
}

function looksLikeText(filePath) {
  return textExtensions.has(path.extname(filePath).toLowerCase()) || path.basename(filePath) === "LICENSE";
}

function auditFile(filePath, findings) {
  const relativePath = path.relative(packageRoot, filePath).split(path.sep).join("/");
  if (credentialFilePattern.test(relativePath)) {
    findings.push({ path: relativePath, rule: "credential-artifact" });
    return;
  }
  if (!looksLikeText(filePath) || fs.statSync(filePath).size > 1_500_000) return;

  const content = fs.readFileSync(filePath, "utf8");
  for (const [rule, pattern] of contentRules) {
    if (rule === "private-source-marker" && relativePath === "scripts/audit-public-package.mjs") continue;
    if (pattern.test(content)) findings.push({ path: relativePath, rule });
  }

  for (const match of content.matchAll(assignmentPattern)) {
    const [, key, value] = match;
    if (!safeValuePattern.test(value)) findings.push({ path: relativePath, rule: `credential-assignment:${key}` });
  }

  for (const link of content.matchAll(/\]\((?!https?:|mailto:|#)([^)\s]+)\)/g)) {
    const reference = link[1].replace(/^<|>$/g, "");
    const target = path.resolve(path.dirname(filePath), reference.split("#", 1)[0]);
    if (!target.startsWith(packageRoot + path.sep) || !fs.existsSync(target)) {
      findings.push({ path: relativePath, rule: `missing-or-escaping-link:${reference}` });
    }
  }
}

if (!fs.existsSync(packageRoot) || !fs.statSync(packageRoot).isDirectory()) {
  console.error(`Audit target is not a directory: ${packageRoot}`);
  process.exit(2);
}

const findings = [];
const files = collectFiles(packageRoot);
for (const filePath of files) auditFile(filePath, findings);

if (findings.length > 0) {
  console.error(`FAIL public safety audit: ${findings.length} finding(s) in ${files.length} file(s).`);
  for (const finding of findings) console.error(`- ${finding.path}: ${finding.rule}`);
  process.exit(1);
}

console.log(`PASS public safety audit: ${files.length} file(s) scanned; no credential artifacts, key-shaped values, private paths, personal source markers, or broken relative links found.`);
