---
name: "add-posthog-rn"
description: "Add PostHog analytics, feature flags, and session recordings to React Native + Expo. Use when the user says 'add analytics', 'add posthog', 'product analytics', 'feature flags rn', 'session replay rn'."
---

# Add PostHog to RN + Expo

Product analytics + feature flags + session replay + A/B tests in one tool. PostHog Cloud has a generous free tier.

## Why PostHog over alternatives

| | PostHog | Mixpanel | Amplitude | Firebase |
|---|---|---|---|---|
| Free tier | 1M events/mo | 100k MTUs | 10M events/mo | Unlimited |
| Self-host option | ✅ | ❌ | ❌ | ❌ |
| Feature flags | ✅ included | $$$ separate | $$$ separate | ✅ Remote Config |
| Session replay | ✅ included | $$$ | $$$ | ❌ |
| RN SDK quality | Solid | Solid | Solid | Solid (heavy) |
| Privacy | Self-host = full control | Cloud only | Cloud only | Google ecosystem |

PostHog wins for indie apps that want one tool for everything.

## Install

```bash
pnpm add posthog-react-native posthog-react-native-session-replay
npx expo install expo-application expo-device expo-localization expo-file-system
```

For session replay specifically:
```bash
pnpm add @posthog/react-native-session-replay
```

## Init (app/_layout.tsx)

```tsx
import { PostHogProvider } from 'posthog-react-native';

export default function RootLayout() {
  return (
    <PostHogProvider
      apiKey="phc_YOUR_KEY"
      options={{
        host: 'https://us.i.posthog.com',
        captureNativeAppLifecycleEvents: true,
        enableSessionReplay: true,
        sessionReplayConfig: {
          maskAllTextInputs: true,
          maskAllImages: false,
          maskAllSandboxedViews: true,
        },
      }}
      autocapture={true}  // tracks navigation, touches automatically
    >
      <Slot />
    </PostHogProvider>
  );
}
```

## Track events

```tsx
import { usePostHog } from 'posthog-react-native';

function MyComponent() {
  const posthog = usePostHog();

  const onPurchase = () => {
    posthog.capture('subscription_purchased', {
      plan: 'yearly',
      price: 59.99,
      trial: true,
    });
  };
}
```

## Identify users

```tsx
// On login
posthog.identify(user.id, {
  email: user.email,
  plan: user.plan,
  signupDate: user.createdAt,
});

// On logout
posthog.reset();
```

## Feature flags

```tsx
const showNewPaywall = posthog.isFeatureEnabled('new-paywall-v2');
const variant = posthog.getFeatureFlag('paywall-headline-test'); // returns variant string

if (showNewPaywall) {
  return <NewPaywall />;
}
```

Set up flags in PostHog dashboard -> Feature Flags. Roll out by:
- % of users
- User properties (e.g., country = US)
- Cohorts (e.g., users who completed onboarding)

## A/B tests

PostHog feature flags can be Multivariate:
- Control: 33%
- Variant A: 33%
- Variant B: 33%

Track conversion against the flag value. PostHog computes statistical significance automatically.

## Session replay

Enabled in init. Watch real user sessions. Critical settings:
- `maskAllTextInputs: true` (always — privacy)
- `maskAllSandboxedViews: true` (system screens, e.g. payment sheets)
- Specific elements: wrap in `<PHMaskView>`

## Privacy / disclosure

- Add PostHog to Privacy Manifest
- "We use PostHog for product analytics" in privacy policy
- PostHog is GDPR-compliant
- For EU users, use EU instance: `https://eu.i.posthog.com`

## Common gotchas

- Autocapture creates a LOT of events (touches, screens) — enable thoughtfully
- Session replay is heavy on bandwidth; disable for users on cellular if metered
- Feature flags load async on first launch — cache last-known flag state for cold start
- `posthog.reset()` on logout clears the user identity but keeps anonymous events

## Pair with
- `add-sentry-rn` for crashes (different concern)
- `privacy-manifest-rn` to disclose PostHog
- `design-paywall` for using flags to A/B test paywall variants
