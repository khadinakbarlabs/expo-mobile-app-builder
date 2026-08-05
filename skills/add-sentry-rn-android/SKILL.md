---
name: "add-sentry-rn-android"
description: "Add Sentry for crash reporting + source map upload on Android. Use when the user says 'sentry android', 'crash reports android'."
---

# Sentry (Android)

Same as iOS plugin. Android-specific notes.

## Install
```bash
npx expo install @sentry/react-native
npx @sentry/wizard@latest -i reactNative
```

## Source maps in EAS
```json
{
  "build": {
    "production": {
      "env": { "SENTRY_AUTH_TOKEN": "@sentry-auth-token" }
    }
  }
}
```

EAS auto-uploads source maps on production builds.

## Native crashes
Native Android crashes also captured. Set up symbol upload via Sentry Android SDK (auto with wizard).

## Distinguish from Firebase Crashlytics
- Sentry: better dev UX, breadcrumbs, releases. Pay $26+/mo.
- Crashlytics: free, integrated with Google. Use both — different focus.

## Common gotchas
- ProGuard mapping not uploaded → minified stacks; check EAS post-build hook
- Bundle ID mismatch → events drop silently

## Pair with
- iOS plugin's `add-sentry-rn`
- `add-firebase-crashlytics`
