---
name: "add-posthog-rn-android"
description: "Add PostHog analytics + feature flags + session replay on Android. Use when the user says 'posthog android', 'analytics android', 'feature flags android'."
---

# PostHog (Android)

Same as iOS plugin. Android-specific:

## Install
```bash
pnpm add posthog-react-native @posthog/react-native-session-replay
```

## Session Replay
Heavier on Android than iOS — disable for low-end devices:
```tsx
sessionReplayConfig: {
  maskAllTextInputs: true,
  maskAllImages: false,
  androidConfig: {
    debounceDelayMs: 1000,  // throttle on Android
  }
}
```

## Feature flags + Material You
Use PostHog flag to A/B test Material You vs custom theme:
```tsx
const useDynamicColors = posthog.isFeatureEnabled('material-you-rollout');
```

## Pair with
- iOS plugin's `add-posthog-rn`
- `add-sentry-rn-android` (crashes), PostHog (product analytics)
