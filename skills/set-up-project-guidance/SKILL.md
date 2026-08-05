---
name: "set-up-project-guidance"
description: "Create a concise AGENTS.md contract for an Expo SDK 54 mobile app. Use when the user wants durable project instructions covering TypeScript, iOS, Android, privacy, testing, and release confirmation boundaries."
---

# Set up project guidance

Create or update `AGENTS.md` only after inspecting the repository and confirming the team's choices. Keep it short, executable, and specific to the app.

Include:

- the Expo SDK target and the command that verifies it;
- the package manager and lint, typecheck, unit-test, and platform-smoke commands;
- native-directory and config-plugin conventions;
- iOS and Android identifier, signing, and release ownership boundaries;
- a rule never to commit or print credentials, private keys, signing artifacts, or `.env` values;
- a rule to obtain explicit confirmation before EAS builds, store uploads, submissions, publication, or paid activation.

Do not copy generic instructions over existing repository-specific guidance. Preserve stronger local security and verification requirements.
