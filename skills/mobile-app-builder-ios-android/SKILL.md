---
name: "mobile-app-builder-ios-android"
description: "Plan, build, test, and prepare production-ready mobile apps for iOS and Android with Expo SDK 54 and React Native. Use when the user asks to create a mobile app, turn an app idea into an implementation plan, build cross-platform screens and features, audit release readiness, or coordinate App Store and Google Play preparation without exposing credentials."
---

# Build a mobile app for iOS and Android

Guide a mobile product from idea to a tested Expo and React Native implementation. Preserve iOS and Android parity unless a capability is intentionally platform-specific, and keep builds, uploads, submissions, publication, and spend behind fresh user confirmation.

## Workflow

1. Clarify the target users, core outcome, smallest useful release, required screens, offline or backend needs, monetization, and platform-specific features.
2. Inspect the existing repository before proposing changes. Before writing Expo code, read the exact [Expo SDK 54 documentation](https://docs.expo.dev/versions/v54.0.0/) relevant to the requested capability.
3. Produce a compact product and architecture plan covering navigation, state, data, accessibility, security, testing, and an explicit iOS/Android parity matrix.
4. Use TypeScript and Expo Router when they fit the app. Add dependencies with `npx expo install` when Expo compatibility matters, and introduce native code only when the product requirement justifies it.
5. Implement the smallest complete vertical slice first. Include loading, empty, error, offline, accessibility, and platform behavior instead of treating them as later polish.
6. Validate with linting, type checks, focused tests, and both iOS and Android smoke tests. Distinguish source validation from evidence observed in simulators, emulators, devices, or provider dashboards.
7. Keep Expo, Apple, Google, Firebase, RevenueCat, Supabase, and other credentials out of source, prompts, logs, screenshots, fixtures, and generated examples. Use provider-approved secret management.
8. Prepare EAS, App Store, and Google Play configuration only after local quality gates pass. Ask again before starting builds, uploading binaries, submitting listings, publishing releases, or spending money.

## Output

Return the product scope, architecture, screen and data flow, implementation changes, platform parity notes, validation evidence, and clearly separated release steps that still require user authorization.
