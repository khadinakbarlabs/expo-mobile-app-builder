---
name: "add-onesignal-push"
description: "Add advanced push notifications via OneSignal in RN + Expo with segmentation, A/B testing, and re-engagement campaigns. Use when the user says 'add onesignal', 'better push notifications', 'push segmentation', 'push a/b test', 'reengagement push'."
---

# Add OneSignal Push (advanced beyond expo-notifications)

`expo-notifications` is fine for basic push. OneSignal adds: segmentation, A/B test, scheduled campaigns, automation triggers.

## When to use which

| Need | Tool |
|---|---|
| Send push to a single user from your backend | expo-notifications + Expo Push API |
| Send to all users / a segment | OneSignal |
| Triggered campaigns (e.g., "didn't open in 3 days") | OneSignal |
| A/B test push copy | OneSignal |
| In-app messages (overlays, not just push) | OneSignal |

## Install

```bash
pnpm add onesignal-expo-plugin react-native-onesignal
```

In `app.json`:
```json
{
  "expo": {
    "plugins": [
      [
        "onesignal-expo-plugin",
        {
          "mode": "production",
          "iosNSEFilePath": "./assets/onesignal/NotificationServiceExtension.m"
        }
      ]
    ]
  }
}
```

## Init (App.tsx)

```tsx
import { OneSignal } from 'react-native-onesignal';

OneSignal.initialize('YOUR_ONESIGNAL_APP_ID');

// Request permission (use after onboarding, not at app start)
OneSignal.Notifications.requestPermission(true);

// Tag user properties for segmentation
OneSignal.User.addTags({
  plan: 'pro',
  signup_date: '2026-01-15',
  language: 'en',
});

// Set external ID (your backend user ID)
OneSignal.login(user.id);
```

## Segmentation

In OneSignal dashboard, create segments:
- "Trial users (first 7 days)"
- "Paying users"
- "Churned users (no open in 14d)"
- "iOS users on iOS 18+"
- "EN users"

Then send campaigns to specific segments.

## Triggered campaigns (the killer feature)

Examples:
- "User completed onboarding but didn't return in 24h" → "Don't forget to log your first meal!"
- "Trial ends in 24h and user hasn't subscribed" → "Last chance — your trial ends tomorrow"
- "User opened app 3+ times this week" → "You're on fire! Try this advanced feature."
- "User hasn't opened in 14 days" → "We miss you. Here's what's new."

Configure in OneSignal -> Messages -> Automation.

## A/B testing copy

```
Variant A: "Your streak is at 7 days. Keep it going!"
Variant B: "🔥 7-day streak! Tap to extend."

OneSignal sends each to 50%, picks winner after 24h based on open rate.
```

## In-app messages (not push)

For users who are IN the app: overlays, banners, modals.

Use case: announce a new feature when user opens the home screen for the 5th time.

## Privacy

- Add OneSignal to your Privacy Manifest (`privacy-manifest-rn`)
- Mention OneSignal in Privacy Policy
- OneSignal is GDPR-compliant, has DPA in dashboard
- Don't tag PII (no email, phone) — use external ID only

## Cost

- Free tier: 10k subscribers, unlimited push
- Pro: $9/mo + usage above thresholds
- Indie apps usually stay free until 10k installs

## Common gotchas

- Forgetting NSE (Notification Service Extension) for rich push (images, action buttons)
- Asking for push permission too early = denied 80%+
- Push permission denied = can't ask again unless user goes to Settings
- Best practice: use custom pre-prompt screen explaining VALUE before showing system dialog

## Pair with
- `add-expo-notifications` for basic push (combine: use expo for transactional, OneSignal for marketing)
- `add-deep-links` so push opens specific screen
- `add-posthog-rn` to measure push → engagement → conversion
