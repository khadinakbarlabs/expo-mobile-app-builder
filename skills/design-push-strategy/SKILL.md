---
name: "design-push-strategy"
description: "Design a push notification strategy that earns opt-in (permission priming, contextual ask), converts re-engagement without spamming, and respects the one-shot system prompt. Use when the user says 'push notifications', 'notification strategy', 'push opt-in', 'permission priming', 're-engagement', 'notification copy', or 'reminders'."
---

# Design a push strategy

Push is one of the strongest retention levers — apps that use it well see 3–5× higher 90-day retention. But the system prompt is **one-shot**: if denied, you can't re-trigger it without sending the user to Settings. And **up to 60% of users opt out** once it became opt-in. The strategy is almost entirely about *earning* the permission and then *not wasting* it.

## The blunt truth first

Research-validated: "Push notifications don't create retention. They reveal whether retention already exists. If users only come back because you ping them, you don't have retention." ([r/expo](https://www.reddit.com/r/expo/comments/1q6m6gr/over_90_of_app_users_churn_in_the_first_30_days/)) Build the retention loop first (`design-retention-loop`); use push as the *trigger* in that loop, not as a substitute for it.

## Earning the permission (the opt-in is the whole game)

Expected opt-in rate by strategy:

| Strategy | Opt-in rate |
|---|---|
| Immediate prompt on launch (discouraged) | ~20–30% |
| Timed/contextual prompt (no pre-prompt) | ~40–50% |
| **Pre-prompt (soft ask) + timed** | **~55–65% (gold standard)** |
| Provisional authorization (iOS) | ~100% delivery (quiet) |

([Apple: Asking permission to use notifications](https://developer.apple.com/documentation/usernotifications/asking-permission-to-use-notifications))

### The iOS playbook

1. **Pre-prompt (your custom UI)** explaining the value *before* triggering the system prompt. "Allow" → fire system prompt; "Not now" → save preference, **don't burn the system prompt**.
2. **Timing**: ask after a "moment of value" (finished setup, completed first action, earned a streak), never cold on launch.
3. **Value-first copy**: "Get instant alerts when your streak is at risk and exclusive daily challenges" beats "Can we send you notifications?"
4. **Provisional authorization** (iOS 12+, `.provisional`): sends quiet notifications to Notification Center with no prompt. Proves value; users can promote to prominent or turn off. Good for transactional/utility notifications.

**Critical rejection gotcha** (Reddit-validated): Apple rejects custom pre-permission screens whose CTA copy "encourages" the permission. Use **neutral CTAs ("Continue" / "Next")** — never "Allow", "Enable", "Turn On." ([r/iOSProgramming](https://www.reddit.com/r/iOSProgramming/comments/1t57gda/app_rejected_because_my_microphone_permission/)) This applies to notification pre-prompts too.

### Android

Android 13+ requires the runtime POST_NOTIFICATIONS permission. Same principle: prime with value, ask at the contextual moment, don't ask cold on launch. Channel-based: let users opt into the *kinds* of notifications they want (e.g., streak reminders yes, marketing no) — this materially improves opt-in and reduces mutes.

## Implementation (Expo)

```bash
npm exec --no -- expo install expo-notifications
```

Requires a **development build** (not Expo Go) for real push on SDK 54+, and `UIBackgroundModes: ["remote-notification"]` in app.json. Simulators can't fully register. See `add-expo-notifications`.

```ts
import * as Notifications from 'expo-notifications';

// 1. Prime with your custom UI first (neutral CTA), THEN:
async function requestPermission() {
  const { status: existing } = await Notifications.getPermissionsAsync();
  let finalStatus = existing;
  if (existing !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') return null; // denied — don't ask again programmatically
  const token = (await Notifications.getDevicePushTokenAsync()).data;
  return token; // send to your server / provider
}
```

## Content that re-engages (without being spam)

- **Personalized** — name + past behavior ("Sara, your Spanish lesson is ready"). Not "Reminder."
- **Lifecycle-triggered** — streak-break risk, abandoned action, daily reward, trial expiring. Not broadcast blasts.
- **Rich media** — `UNNotificationAttachment` with an image.
- **Actionable buttons** — `UNNotificationCategory` (Reply, Snooze, Claim). One-tap actions convert better than tap-to-open.
- **Deep-linked** — tapping opens the specific in-app area, not the home screen. See `add-deep-links`.
- **Time-zone aware** — a 3am push is an uninstall.

## Frequency and coordination

- **~2–3 pushes per week** for a typical consumer app, unless inherently time-sensitive.
- **Coordinate with email/in-app** — never send the same message across channels the same day. See `design-lifecycle-messaging` for the cross-channel cadence and frequency capping.
- **Segment**: send relevant pushes to relevant segments, not blanket broadcasts. Segmentation is the gap most apps never close. ([r/reactnative](https://www.reddit.com/r/reactnative/comments/prf7lc/push_notifications_user_segments/))

## The re-engagement ladder (inactive users)

```text
3 days inactive → gentle nudge (push): specific value reason
7 days inactive → direct message (push + email): incentive or content
14 days inactive → escalated offer (email): discount / unlock / "what's new"
30 days inactive → final win-back (email), then suppress
```

Suppress after sustained non-response. See `build-win-back-flow` and `design-lifecycle-messaging`.

## Measure

```text
push_permission_requested
push_permission_granted           // the opt-in rate — the #1 metric here
push_received / push_delivered    // delivery is unreliable; track both
push_opened                       {campaign}
push_converted                    {goal}
push_unsubscribed
uninstall_after_push              // the spam canary
```

`uninstall_after_push` per campaign is the early warning that a message (or cadence) is too aggressive.

## What not to do

- **Don't prompt cold on launch.** Earn it.
- **Don't use persuasive CTAs** in the pre-prompt (Apple rejection risk).
- **Don't broadcast generic "we miss you" pushes.**
- **Don't send at 3am local time.**
- **Don't re-prompt after denial** programmatically (it's a no-op on iOS; route to Settings instead via a deep link).
- **Don't fire paywall re-prompts** in re-engagement pushes to users who just rejected the paywall.
- **Don't rely on push alone** to retain — it reveals retention, it doesn't create it.

## Pair with

- `add-expo-notifications` — implementation.
- `design-retention-loop` — push is the trigger in the Hook Model.
- `design-lifecycle-messaging` — cross-channel coordination and frequency capping.
- `build-win-back-flow` — the inactive-user ladder.
- `instrument-growth-funnel` — measuring opt-in and push performance.
