#!/usr/bin/env node

import process from "node:process";

const args = process.argv.slice(2);
const projectName = args[0];
const asJson = args.includes("--json");

if (!projectName || !/^[a-z][a-z0-9-]{0,62}$/.test(projectName)) {
  console.error("Usage: node scripts/plan-expo-project.mjs <lowercase-project-name> [--json]");
  console.error("Use lowercase letters, digits, and single hyphens; start with a letter.");
  process.exit(2);
}

const plan = {
  projectName,
  sdkBaseline: "Expo SDK 54",
  commands: [
    `npx create-expo-app@latest ${projectName}`,
    `cd ${projectName}`,
    "npx expo install --fix",
    "npx expo doctor",
    "npx expo start",
  ],
  nextSteps: [
    "Inspect package.json and app configuration before adding dependencies.",
    "Use npx expo install for SDK-compatible Expo packages.",
    "Add AGENTS.md project guidance after confirming the stack.",
    "Run lint, type, and test checks before any prebuild or EAS work.",
  ],
  safety: [
    "This helper only prints a local plan; it does not execute commands.",
    "Do not put provider credentials, signing files, or .env values in the project.",
    "Ask for confirmation before prebuild, EAS builds, store uploads, or publication.",
  ],
};

if (asJson) {
  console.log(JSON.stringify(plan, null, 2));
} else {
  console.log(`Expo SDK 54 scaffold plan for ${projectName}`);
  console.log("\nLocal commands:");
  for (const command of plan.commands) console.log(`  ${command}`);
  console.log("\nNext steps:");
  for (const step of plan.nextSteps) console.log(`  - ${step}`);
  console.log("\nSafety boundary:");
  for (const item of plan.safety) console.log(`  - ${item}`);
}
