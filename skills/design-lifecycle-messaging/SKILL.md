---
name: "design-lifecycle-messaging"
description: "Design the cross-channel (push + email + in-app) lifecycle messaging cadence that drives retention without spamming — frequency capping, first-72-hours, re-engagement, and win-back coordination. Use when the user says 'lifecycle messaging', 'retention emails', 'push cadence', 're-engagement', 'frequency capping', 'onboarding emails', or 'lifecycle automation'."
---

# Design lifecycle messaging

The coordinated cross-channel system that turns a one-time user into a habit. Done well it drives materially higher 90-day retention; done badly it accelerates churn and earns you 1-star reviews for "annoying notifications."

## The headline finding

Brands using cross-channel engagement (push + email + in-app + SMS) drove **55% higher 90-day retention** than single-channel. But — **frequency capping is mandatory**. Push + email + in-app in rapid succession drives churn *up*. Coordination is the whole skill. ([Braze](https://www.braze.com/resources/articles/mobile-app-retention-10-tip))

## Each channel has a distinct job

| Channel | Strength | Best for |
|---|---|---|
| **Push** | Timely, interruptive, lock-screen | Streak reminders, time-sensitive triggers, same-day re-engagement |
| **Email** | Deep, asynchronous, owned channel | Onboarding continuation, win-back, receipts, value recaps |
| **In-app / Content Cards** | Contextual, non-interruptive | Feature announcements, upsell at the right moment, tips while using |
| **SMS** | Highest open rate, most intrusive | Only with explicit consent; transactional or high-value alerts |

Don't send the same message on every channel. Don't send the same message twice across channels.

## The first-72-hours lifecycle (the make-or-break window)

The steepest drop-off happens in the first 3 days. Session frequency in this window is the strongest predictor of D30. A designed first-72-hours sequence is the highest-ROI messaging work.

```text
Hour 0  (session 1): in-app — establish the D1 reason to return (streak, next task)
Hour 24 (D1):        push — the specific reason to come back today ("Your plan is ready")
Hour 48 (D2):        email — value recap + tip; surface what they haven't discovered
Hour 72 (D3):        push or in-app — milestone / first achievement; prompt a habit
Day 7:               push or email — weekly recap, progress, social proof
```

Every message in this window must give the user a *specific* reason to return, not a generic "come back." "Your 3-day streak is at risk" beats "We miss you."

## Re-engagement cadence (lapsed free users)

```text
3 days inactive  → gentle nudge (push): specific value reason
7 days inactive  → direct message (push + email): incentive or content
14 days inactive → escalated offer (email): discount / feature unlock / "what's new"
30 days inactive → final win-back (email), then suppress
```

Suppress further messaging after repeated non-response — continuing to message a dead cohort just trains them to ignore you (and report spam).

## Frequency capping (non-negotiable)

Uncoordinated channels compound into spam. Rules:

- **Max ~2–3 push notifications per week** for a typical consumer app, unless the app is inherently time-sensitive (messaging, live events).
- **Never send push + email + in-app about the same thing on the same day.** Pick one channel per message per day.
- **Honor unsubscribes and preference centers.** Let users choose which channels they want.
- **Time-zone aware scheduling.** A 3am push is a settings change and an uninstall.
- **AI send-time optimization** (when available) sends each user's message at their individually-predicted best time rather than a fixed broadcast.

## Push specifics

Push is one of the strongest retention levers but the permission is fragile. See `design-push-strategy` for the permission strategy (pre-prompt → contextual ask → 55–65% opt-in). Content that re-engages without spamming:

- **Personalized** — name + past behavior ("Sara, your Spanish lesson is ready"). Not "Reminder."
- **Rich media** — `UNNotificationAttachment` with an image.
- **Actionable** — `UNNotificationCategory` with buttons (Reply, Snooze, Claim).
- **Lifecycle-triggered** — streak break risk, abandoned action, daily reward.
- **Deep-linked** — tapping opens the specific in-app area, not the home screen.

## Email lifecycle

You can only email users who gave you an email (typically in onboarding or account creation). If you collect email, build:

- **Onboarding continuation** — "Here's the feature you set up but haven't used."
- **Value recaps** — weekly/monthly summary of what the app did for them.
- **Win-back** — see `build-win-back-flow`. Route to web checkout where permitted to preserve margin.
- **Transactional** — receipts, payment failures (dunning), subscription changes.

Use a provider with good deliverability (Resend, Postmark, SendGrid, Customer.io, Braze). One well-written lifecycle email per week beats daily generic blasts.

## In-app messaging / content cards

Non-interruptive, shown when the user is already engaged. Use for:

- Feature discovery ("Did you know you can…").
- Upsell at the contextual moment (feature gate paywall — see `command-build-paywall`).
- Tips while the user is in a relevant screen.
- Announcement of new content/features.

Tools: Braze Content Cards, Intercom banners, or a simple in-app banner component driven by your feature flags (PostHog — see `set-up-ab-testing`).

## Measure

```text
message_sent           {channel, campaign, segment}
message_delivered      // especially important for push (delivery is unreliable)
message_opened
message_converted      {goal: d1_return|reactivation|claim|purchase}
message_unsubscribed   {channel}
uninstall_after_send   // early warning that a campaign is too aggressive
```

Watch `uninstall_after_send` per campaign — it's the canary that a message is annoying users. A campaign that lifts opens but spikes uninstalls is a net loss.

## What not to do

- **Don't send the same message across channels** the same day.
- **Don't broadcast generic "we miss you" pushes.** They get muted and reported.
- **Don't message dead cohorts forever.** Suppress after sustained non-response.
- **Don't send pushes at 3am local time.** Time-zone aware or don't send.
- **Don't use email for time-sensitive triggers** (it's async) or push for deep content (it's not).
- **Don't fire paywall re-prompts in re-engagement messages** to users who just rejected the paywall — it feels like a shakedown.

## Pair with

- `design-push-strategy` — push permission strategy and content.
- `design-retention-loop` — the Hook Model this messaging triggers.
- `build-win-back-flow` — the lapsed-user arm of this cadence.
- `build-cancellation-flow` — the active-churn interception.
- `add-expo-notifications` — push implementation.
- `instrument-growth-funnel` — measuring message performance.
