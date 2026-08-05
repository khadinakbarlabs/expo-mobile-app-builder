#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(scriptDirectory, "..");
const manifestPaths = [
  ".codex-plugin/plugin.json",
  ".claude-plugin/plugin.json",
  ".claude-plugin/marketplace.json",
  ".cursor-plugin/plugin.json",
  ".agents/plugins/marketplace.json",
];
const ignoredDirectories = new Set([".git", "node_modules", ".expo", "dist", "coverage"]);
const requiredFiles = [
  ...manifestPaths,
  "README.md",
  "PRIVACY.md",
  "TERMS.md",
  "SUPPORT.md",
  "SECURITY.md",
  "LICENSE",
  "scripts/plan-expo-project.mjs",
  "skills/command-scaffold-app/scripts/plan-expo-project.mjs",
];
const failures = [];

function relative(filePath) {
  return path.relative(packageRoot, filePath).split(path.sep).join("/");
}

function walk(directory) {
  const entries = fs.readdirSync(directory, { withFileTypes: true });
  return entries.flatMap((entry) => {
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) return [];
    const filePath = path.join(directory, entry.name);
    if (entry.isSymbolicLink()) {
      failures.push(`${relative(filePath)}: symbolic links are not allowed`);
      return [];
    }
    return entry.isDirectory() ? walk(filePath) : [filePath];
  });
}

for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(packageRoot, file))) failures.push(`${file}: required file is missing`);
}

const manifests = new Map();
for (const file of manifestPaths) {
  const filePath = path.join(packageRoot, file);
  if (!fs.existsSync(filePath)) continue;
  try {
    manifests.set(file, JSON.parse(fs.readFileSync(filePath, "utf8")));
  } catch {
    failures.push(`${file}: invalid JSON`);
  }
}

for (const [file, manifest] of manifests) {
  if (manifest.name !== "expo-mobile-app-builder") failures.push(`${file}: unexpected package name`);
}

const skillRoot = path.join(packageRoot, "skills");
const skillFiles = fs.existsSync(skillRoot)
  ? walk(skillRoot).filter((file) => path.basename(file) === "SKILL.md")
  : [];

if (skillFiles.length === 0) failures.push("skills/: no SKILL.md files found");

for (const skillFile of skillFiles) {
  const skillDirectory = path.basename(path.dirname(skillFile));
  const skillDirectoryPath = path.dirname(skillFile);
  const content = fs.readFileSync(skillFile, "utf8");
  const frontmatter = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!frontmatter) {
    failures.push(`${relative(skillFile)}: missing YAML frontmatter`);
    continue;
  }

  const name = frontmatter[1].match(/^name:\s*["']?([^"'\r\n]+)["']?\s*$/m)?.[1]?.trim();
  const description = frontmatter[1].match(/^description:\s*["']?([^\r\n]+)["']?\s*$/m)?.[1]?.trim();
  if (name !== skillDirectory) failures.push(`${relative(skillFile)}: name must match directory`);
  if (!description) failures.push(`${relative(skillFile)}: description is required`);

  const openAiMetadata = path.join(path.dirname(skillFile), "agents", "openai.yaml");
  if (!fs.existsSync(openAiMetadata)) failures.push(`${relative(openAiMetadata)}: required metadata is missing`);

  if (content.includes("../../docs/")) {
    failures.push(`${relative(skillFile)}: repository-level documentation paths break standalone installs`);
  }
  for (const link of content.matchAll(/\]\((?!https?:|mailto:|#)([^)\s]+)\)/g)) {
    const reference = link[1].replace(/^<|>$/g, "").split("#", 1)[0];
    const target = path.resolve(skillDirectoryPath, reference);
    if (!target.startsWith(`${skillDirectoryPath}${path.sep}`) || !fs.existsSync(target)) {
      failures.push(`${relative(skillFile)}: standalone link is missing or escapes the skill (${reference})`);
    }
  }
}

const rootPlanner = path.join(packageRoot, "scripts", "plan-expo-project.mjs");
const skillPlanner = path.join(skillRoot, "command-scaffold-app", "scripts", "plan-expo-project.mjs");
if (
  fs.existsSync(rootPlanner) &&
  fs.existsSync(skillPlanner) &&
  fs.readFileSync(rootPlanner, "utf8") !== fs.readFileSync(skillPlanner, "utf8")
) {
  failures.push("the root and standalone scaffold planners must remain identical");
}

walk(packageRoot);

if (failures.length > 0) {
  console.error(`FAIL release validation: ${failures.length} finding(s).`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`PASS release validation: ${skillFiles.length} skills, ${manifestPaths.length} manifests, required public documents, and no symbolic links.`);
