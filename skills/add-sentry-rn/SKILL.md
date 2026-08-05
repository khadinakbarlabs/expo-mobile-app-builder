---
name: "add-sentry-rn"
description: "Add Sentry crash reporting and error monitoring to a React Native + Expo app, including source map upload and release tracking. Use when the user says 'add sentry', 'crash reporting', 'error monitoring', 'sentry expo', 'rn crash tracking'."
---

# Add Sentry to React Native + Expo

Crash reporting + error tracking + performance monitoring. Evaluate it against the app's privacy, cost, and observability needs.

## Privacy, credential, and external action gate

Creating a Sentry project, running its wizard, uploading source maps, or storing an auth token changes external services and may expose app metadata. Obtain owner approval for the Sentry organization/project and data-retention settings first. Never put a DSN, auth token, or source-map credential in this plugin, a public repository, a prompt, or logs.

## Why Sentry over alternatives
- Best RN integration (official SDK, source map upload built in)
- Free tier: 5k errors/mo, generous for indie
- Source maps for readable stack traces (vs minified gibberish)
- Replay (see exact UI state at crash)
- Performance traces

## Install (Expo)

```bash
npx expo install @sentry/react-native
npx @sentry/wizard@latest -i reactNative
# Wizard prompts for Sentry org + project, configures everything
```

This adds:
- `@sentry/react-native` to deps
- `metro.config.js` source map config
- iOS native config to `ios/Podfile`
- Sentry init code to `App.tsx` or `_layout.tsx`

## Basic init (app/_layout.tsx for Expo Router)

```ts
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://your-dsn@sentry.io/project',

  // Send errors only in production by default
  enabled: !__DEV__,

  // Performance: 10% sampling for prod
  tracesSampleRate: __DEV__ ? 1.0 : 0.1,

  // Replay: 100% of sessions with errors, 10% otherwise
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,

  // Track release for source map matching
  release: `com.yourapp@${Constants.expoConfig?.version}`,
  dist: Constants.expoConfig?.ios?.buildNumber,

  integrations: [
    Sentry.mobileReplayIntegration(),
  ],
});

export default Sentry.wrap(RootLayout);
```

## EAS Build integration

Add to `eas.json`:

```json
{
  "build": {
    "production": {
      "env": {
        "SENTRY_AUTH_TOKEN": "@sentry-auth-token"
      }
    }
  }
}
```

After the owner has approved the target project, configure `SENTRY_AUTH_TOKEN` through an owner-managed EAS or CI secret store. This makes EAS upload source maps on each approved production build; do not store the token in `eas.json`.

## Manual error capture

```ts
try {
  await riskyOperation();
} catch (e) {
  Sentry.captureException(e, {
    tags: { feature: 'paywall' },
    extra: { userId: user.id, action: 'subscribe' },
  });
}
```

## User context (privacy-aware)

```ts
// On login
Sentry.setUser({
  id: user.id, // hashed/anonymized
  // Don't send email or PII unless you have privacy disclosure
});

// On logout
Sentry.setUser(null);
```

## Performance traces (key flows)

```ts
const transaction = Sentry.startTransaction({ name: 'paywall_purchase_flow' });

// ... do work ...

transaction.finish();
```

Sentry shows P50/P95 timing, breakdowns by step.

## Replay (record session leading to error)

Auto-enabled with `replaysOnErrorSampleRate`. Privacy: by default Sentry masks all text/inputs. To unmask non-sensitive UI:

```tsx
<View dataSet={{ sentryUnmask: true }}>
  <Text>This is OK to record</Text>
</View>
```

## Privacy / disclosure

- Add Sentry to your Privacy Manifest (`privacy-manifest-rn`)
- Mention "we use Sentry for crash reporting" in privacy policy
- Sentry is GDPR-compliant; sign their DPA via dashboard

## Common gotchas

- Source maps not uploading? Check `SENTRY_AUTH_TOKEN` is set in EAS env
- Errors show as "minified.js:1" in production = source map upload failed
- Sentry kills cold start by 50-100ms; use `enableTracing: false` if perf-critical
- Init MUST be the first thing in your entry file or you'll miss early errors

## Pair with
- `add-posthog-rn` for product analytics (different concern, complementary)
- `privacy-manifest-rn` to disclose Sentry properly
- `versioning-fingerprint` so source maps match release versions
