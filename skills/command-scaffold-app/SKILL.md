---
name: "command-scaffold-app"
description: "Plan and scaffold a new Expo SDK 54 mobile app for both iOS and Android. Use when the user asks to create, bootstrap, or start an Expo or React Native app with TypeScript, navigation, local state, testing, and a safe release foundation."
---

# Scaffold an Expo app

Create the smallest cross-platform foundation that meets the stated product goal. Treat all account setup, signing, builds, uploads, and publishing as separate user-authorized steps.

## Workflow

1. Confirm the app name, target users, core outcome, supported platforms, offline/backend needs, and whether the user wants a local scaffold now.
2. Scope a small first release before generating code. Draft or delegate screen flows only when the host supports it.
3. Use the SDK 54 baseline in [the Expo reference](references/01-expo-sdk-54.md): TypeScript, Expo Router where file-based navigation fits, and `npx expo install` for Expo-compatible dependencies.
4. Use `scripts/plan-expo-project.mjs` when a deterministic scaffold checklist is useful. It validates a project name and prints the local commands; it never logs in, creates provider accounts, or handles credentials.
5. Add only the capabilities the app needs. Typical local choices are state management, secure local storage, image handling, haptics, and a test runner. Do not add RevenueCat, analytics, push, a backend, or native modules unless the product requires them.
6. Add an `AGENTS.md` stack contract with `set-up-project-guidance` after the user confirms the project structure.
7. Run local lint, type, and platform smoke checks before proposing EAS configuration. Do not start an EAS build, create signing credentials, upload a binary, or submit to a store without a named target and a fresh confirmation.

## Output

Return the directory shape, local commands, dependency rationale, validation plan, and clearly separated future account/release steps. Never include credential values in generated files or chat output.
