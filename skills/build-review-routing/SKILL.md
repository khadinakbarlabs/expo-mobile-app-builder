---
name: "build-review-routing"
description: "Build a routed / smart review-collection flow: ask satisfaction in-app, route happy users to the native App Store / Google Play review prompt, route unhappy users to private feedback or support. Use when the user says 'review prompt', 'rating prompt', 'get more reviews', 'improve app rating', 'satisfaction gate', 'review routing', 'in-app review', 'rate us', or describes 'only get the good reviews'."
---

# Build routed review collection

A two-step flow that raises the public store rating by changing *who* reaches the public review surface. Happy users get the store prompt; unhappy users get a private feedback channel — so complaints that would have become 1-star reviews become support tickets you can act on and win back.

This is the technique the user describes: ask if satisfied → yes goes to App Store / Play, no goes to email/feedback. It is **not** in the rest of the plugin. This skill is it.

## The flow

```text
        ┌──────────────────────────────────────────┐
        │  STEP 1 — your satisfaction question      │
        │  (your UI, not Apple/Google's native card) │
        │  "How are you enjoying AppName?"           │
        │  [😍 Love it]  [👍 It's good]  [👎 Trouble] │
        └────────────────────┬─────────────────────┘
                             │
        ┌────────────────────┴────────────────────┐
        │                                          │
   HAPPY (top 1–2)                         UNHAPPY (bottom 1)
        │                                          │
        ▼                                          ▼
  STEP 2a — native review prompt      STEP 2b — private feedback
  StoreReview.requestReview()  OR      in-app form / mailto: /
  ReviewManager.launchReviewFlow()      Intercom / Sentry user-report
  (iOS: Apple may suppress;             (never the store — capture
   3 prompts / 365 days)                the complaint where you can act)
```

The native review APIs give **no callback** telling you whether a rating was posted or what score was given. ([r/reactnative](https://www.reddit.com/r/reactnative/comments/1m3ysy6/inapp_review_posted_but_not_visible_on_play_store/)) This is *why* the satisfaction gate lives in your UI — it is the only signal you get to route on.

## The hard platform constraints (design around these)

**iOS — `SKStoreReviewController` / StoreKit 2 `requestReview`:**
- Max **3 prompts per user per 365-day period**. Apple-enforced. Calls beyond the cap are silent no-ops. ([Apple: Requesting App Store Reviews](https://developer.apple.com/documentation/storekit/requesting-app-store-reviews))
- **Apple, not you, decides whether to show.** May suppress for any reason.
- **No rating result is returned.** You cannot know if the user rated or what they picked.
- The gate matters precisely because the cap is tight: spend a system-prompt attempt only on a user your gate confirmed is happy.
- iOS 18.4+: LLM-generated review summaries appear on product pages — ratings matter even more for conversion now.

**Android — Google Play In-App Review API (`ReviewManager`):**
- **Opaque time-based quota** (~monthly, intentionally undocumented). ([Google: In-App Review](https://developer.android.com/guide/playcore/in-app-review))
- **No feedback** on whether the dialog appeared or whether the user rated.
- **Stricter preconditioning rule than iOS**: "Your app must not ask the user any questions before or during the presentation of the review card." The compliant reading: keep the satisfaction question a **standalone, separate moment** in your UI (a periodic "how are we doing" pulse), and use its *result* to decide whether to call `launchReviewFlow` later — never a literal "Do you like the app? → review card" back-to-back pipeline. On iOS the inline ask-then-route pattern is fine and standard.

## Implementation (Expo / React Native)

Pick one library:

| Library | Wraps | Use when |
|---|---|---|
| **`expo-store-review`** | iOS `SKStoreReviewController` + Android `ReviewManager` | Default for Expo/managed apps. Works in Expo Go for capability checks. |
| **`react-native-in-app-review`** | iOS + Android + Huawei | Bare RN, most popular community lib. |
| **`react-native-rate`** | native API + **store fallback** | When you want an explicit "Rate us" button that falls back to the store page if the native prompt is suppressed/quota'd. |

```bash
npx expo install expo-store-review
```

Complete routing hook (Expo/RN):

```ts
import * as StoreReview from 'expo-store-review';
import * as Linking from 'expo-linking';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const CONFIG = {
  minSessions: 3,
  minDaysSinceInstall: 7,
  cooldownDays: 90,            // don't re-ask within 90 days either path
  iosAppId: '2193813192',
  androidPackage: 'com.example.app',
  supportEmail: 'support@example.com',
};

type Rating = 'love' | 'ok' | 'bad';

// ---- gating: only ask at the right moment ----
async function shouldShowGate(): Promise<boolean> {
  const sessions = Number(await SecureStore.getItemAsync('sessions') ?? 0);
  const installDate = Number(await SecureStore.getItemAsync('installDate') ?? Date.now());
  const lastAsked  = Number(await SecureStore.getItemAsync('lastAsked')  ?? 0);
  const daysSinceInstall = (Date.now() - installDate) / 86_400_000;
  const daysSinceAsked   = (Date.now() - lastAsked)   / 86_400_000;
  return sessions >= CONFIG.minSessions
      && daysSinceInstall >= CONFIG.minDaysSinceInstall
      && daysSinceAsked >= CONFIG.cooldownDays;
}

// ---- step 1: your UI presents this; user picks one ----
async function onSatisfactionPicked(rating: Rating) {
  await SecureStore.setItemAsync('lastAsked', String(Date.now()));
  await SecureStore.setItemAsync('satisfaction', rating);
  if (rating === 'love' || rating === 'ok') await routeHappy();
  else routeUnhappy();
}

// ---- happy path: spend a system-prompt attempt ----
async function routeHappy() {
  if (!(await StoreReview.isAvailableAsync())) return openStoreWriteReview();
  try {
    await StoreReview.requestReview();
    await SecureStore.setItemAsync('promptedStoreReview', String(Date.now()));
  } catch { openStoreWriteReview(); }
}

function openStoreWriteReview() {
  const url = Platform.OS === 'ios'
    ? `itms-apps://itunes.apple.com/app/viewContentsUserReviews/id${CONFIG.iosAppId}?action=write-review`
    : `market://details?id=${CONFIG.androidPackage}&showAllReviews=true`;
  Linking.openURL(url).catch(() => {});
}

// ---- unhappy path: capture the complaint privately ----
function routeUnhappy() {
  // A: in-app feedback form  → navigation.navigate('Feedback')
  // B: support email with diagnostics prefilled
  Linking.openURL(
    `mailto:${CONFIG.supportEmail}?subject=${encodeURIComponent('App feedback')}` +
    `&body=${encodeURIComponent('Tell us what went wrong:\n\n')}`
  ).catch(() => {});
  // C: Intercom/Helpshift/Crisp messenger → Intercom.displayMessageComposer()
}
```

For an explicit **Settings → "Rate us" button**, do **not** call `requestReview()` (the cap means it'll silently fail and feel broken). Deep-link to the store write-review page instead — that is what `openStoreWriteReview()` above does.

## The unhappy path is where the value lives

A user who would have left a 1-star review instead hands you a private, actionable support ticket. Route to:

1. **In-app feedback form** — lowest friction, captures device/OS/version automatically.
2. **`mailto:`** with prefilled subject + diagnostics — zero dependencies, offline.
3. **Customer-service SDK** (Intercom, Helpshift, Crisp, Zendesk) — two-way conversation to resolve and win back.
4. **Sentry / PostHog / Bugsnag "user report"** — attaches the message to the most recent error. Ideal when the complaint is bug-adjacent.

**Close the loop** (this is what actually lifts the rating over time): triage automatically, reply fast (a human reply within 24h dramatically increases the chance the user later updates a review upward), notify the user when their reported bug ships, then **re-arm the gate** for that user after the fix + a new success moment. Their prior `satisfaction=bad` should lower priority, not permanently exclude.

## Timing — the multi-condition gate

Trigger only when **all** hold:

| Condition | Typical | Why |
|---|---|---|
| `sessions >= N` | 3–5 | Experienced core value |
| `daysSinceInstall >= D` | ≥7 | Past the uninstall-risk window |
| **Success event** just happened | after workout/level/export | Moment of peak positive emotion (Apple's own guidance) |
| `daysSinceLastAsk >= cooldown` | 90 days | Don't pester; covers OS quota refresh |
| Not on first launch / onboarding | — | Universal anti-pattern |
| **Not right after a paywall rejection** | — | User just said "no" to your business; feels like a shakedown |
| **Not after an error / failed action** | — | Self-defeating |

Cooldown rules: happy-path answered → 120 days; unhappy-path → 30–60 days (re-approachable after a fix); dismissed → 30 days; "maybe later" → 60 days.

## What NOT to do (policy + UX)

**Policy-breaking (rejection/takedown risk):**
- **Incentivizing reviews** — "Rate us for 100 coins" / "Rate to unlock" — banned by both stores, most common takedown cause here. Apple Guideline 3.1.
- **Buying or soliciting fake reviews** — banned; detectable.
- **Review gating in the policy sense** — filtering/suppressing *public* negative reviews. **This skill is compliant** because it routes to a private channel *before* any public review is initiated; it never removes or blocks a public review the user chose to write. The line: don't show the review card then intercept a negative submission.
- **Preconditioning the Android card** — "Doesn't this deserve 5 stars?" right before the card. Keep the question a standalone moment.
- **Mimicking the native review dialog** — HIG/App Review violation.
- **Programmatically dismissing/overlaying the Google card** — explicitly banned.
- **Blocking features behind a review** — hard ban both stores.

**UX anti-patterns:**
- Prompting every launch (trains users to say no, burns willingness).
- Tying the *system* `requestReview()` to a button (silent fail → broken feel).
- Showing "Thanks for rating!" — you don't actually know they rated; feels manipulative and is inaccurate.
- No unhappy path at all — defeats the purpose; you just collect 1-stars faster.

## Instrument the funnel

Neither store confirms a rating, so instrument your own (`instrument-growth-funnel`):

| Event | When |
|---|---|
| `review_gate_shown` | Step-1 modal presented (record trigger source) |
| `review_gate_answered` | `{ value: 'love'\|'ok'\|'bad' }` |
| `review_route_store_called` | You called `requestReview()` / `launchReviewFlow()` |
| `review_route_store_fallback` | Fell back to the store deep-link |
| `review_route_feedback_opened` | Opened mailto:/form/Intercom |
| `review_cooldown_skipped` | Gate suppressed by cooldown/quota |

Treat `review_route_store_called` as your conversion proxy for "happy user sent to the store."

## Why it works

It changes the **composition** of who reaches the public surface: more high-sentiment users (boosting 4–5★ volume), fewer low-sentiment users (reducing 1–2★ that would otherwise be public). Both effects push the average up. Google Play ratings are recency-weighted, so routing new happy users to review has outsized effect on the displayed number. Commonly cited outcome (directional; measure your own): apps report the public average rising from ~3.x into the 4.5+ range over a few months. The lift assumes you act on the unhappy-path feedback — a gate with ignored feedback just hides the problem.

## Pair with

- `instrument-growth-funnel` — the analytics above.
- `add-posthog-rn` — privacy-safe analytics (no ATT trigger).
- `mine-competitor-reviews` / `mine-play-reviews` — reading others' reviews (complementary).
