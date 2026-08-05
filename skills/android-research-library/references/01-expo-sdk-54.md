# Expo SDK 54 baseline

Use this package's SDK 54 baseline for project work unless the repository already pins a different supported Expo version. Verify the repository's installed version before changing dependencies.

## Verified baseline

The [Expo SDK 54 reference](https://docs.expo.dev/versions/v54.0.0/) lists:

- Expo SDK 54 with React Native 0.81 and React 19.1;
- Node.js 20.19.x minimum;
- Android 7+ with compile and target SDK 36;
- iOS 15.1+ and Xcode 16.1+.

These are compatibility facts, not a promise that Apple or Google will accept every build. Check current store requirements immediately before a release.

## Project workflow

1. Create a project with the [versioned Expo guidance](https://docs.expo.dev/versions/v54.0.0/), then inspect `package.json`, `app.json` or `app.config.*`, and the lockfile.
2. Use `npx expo install <package>` for Expo SDK packages so dependency versions match the active SDK.
3. Run the project's type, lint, and tests before prebuild or a native build.
4. Treat `npx expo prebuild --clean` as potentially overwriting generated native work. Explain the impact and get the user's confirmation first.
5. Keep app identifiers, domains, permissions, and provider configuration owner-controlled. Use documented placeholder values in examples, never copied credentials or real bundle identifiers.

## Capability choice

Prefer Expo modules and JavaScript/TypeScript first. Use a config plugin or native module only when the feature cannot be delivered by the managed surface, and document its iOS and Android implications separately.

## Credential boundary

No Expo token, Apple certificate, keystore, API key, service-account file, or `.env` value belongs in source, documentation examples, screenshots, or logs. Use the app owner's secret management path and redact values before sharing diagnostics.
