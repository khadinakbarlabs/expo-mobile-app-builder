---
name: "design-viral-loop"
description: "Design a viral growth loop with a measurable viral coefficient (K-factor), give-get referrals, and invite-to-unlock mechanics — the Dropbox/Wordle/Duolingo pattern. Use when the user says 'viral coefficient', 'K-factor', 'referral mechanic', 'give-get', 'invite-to-unlock', 'make my app go viral', or wants engineered word-of-mouth."
---

# Design a viral loop

Virality is engineered, not luck. A viral loop is a self-reinforcing cycle where each user brings in more users. The measurable north star is the **viral coefficient K = i × c**, where **i** = invites sent per user and **c** = conversion rate of those invites. **K > 1 = exponential growth; K = 1 = stuck; K < 1 = growth dies without paid.** ([Yotpo](https://www.yotpo.com/blog/viral-coefficient/))

Reference benchmarks: Slack peaked at K ≈ 8.5; early Facebook ≈ 7. TikTok acquired **6.4 new users for every 1 acquired via paid marketing** by watermarking shared videos and prioritizing cross-platform sharing. ([molfar.io](https://www.molfar.io/blog/viral-loops))

## The loop anatomy

```text
User gets value → prompted to invite at peak moment → invite sends a shareable artifact
→ new user sees it → lands on a low-friction onboarding → converts → repeats the cycle
```

Every stage has a lever. Raise `i` (more invites per user) or raise `c` (better conversion of invites) to push K toward and past 1.

## Levers to raise `i` (invites per user)

- **Prompt at the peak moment** — right after a win, a result, a streak, a transformation. Not on a settings page.
- **In-product sharing > personalized link > email > social > referral code.** In-product (a shareable card) converts highest because the recipient sees value, not a pitch. See `design-shareable-result-card`.
- **Give-get incentives** (below) — both sides get rewarded.
- **Frictionless mechanics** — one-tap share, pre-filled message, deep link that opens the app directly. Every extra step halves conversion.
- **Make sharing the user's self-interest**, not a favor. Duolingo streaks, Strava segments, Wordle results — the user shares to flex, the app gets distribution for free.

## Levers to raise `c` (conversion of invites)

- **Strong landing** for the referred user — the share should land somewhere that immediately demonstrates value, not a generic home page.
- **Visible referrer endorsement** — "Sarah invited you" beats an anonymous link.
- **Incentive for the new user** — a reason to install beyond the recommendation (extended trial, bonus credit).
- **Frictionless onboarding** — see `design-onboarding-funnel` or `design-onboarding-quiz`. A leaky onboarding destroys `c`.

## Give-get referral (the Dropbox model)

Both referrer and invitee get rewarded. Dropbox gave 500MB to each side and grew 100K → 4M users in 15 months; 35% of daily signups came from referrals at peak. ([molfar.io](https://www.molfar.io/blog/viral-loops))

### Design rules

- **Two-sided.** Reward only the inviter and the friend has no reason to convert; reward only the friend and the inviter has no reason to share.
- **Tie the reward to product core value.** Dropbox: storage. Cal AI-style: a free month of Pro. Generic cash feels transactional; product-native rewards feel like a gift.
- **Bake into the onboarding/result moment.** "Get 1 month free by inviting friends" on the success screen. Not buried in settings.
- **Show progress** — "3 of 5 friends invited, 2 more for your bonus."
- **Close the loop** — email/push when a friend joins, prompting the next invite.

### Fulfillment

Grant the reward via RevenueCat: extend the trial or grant the entitlement programmatically when the referred friend converts to paid (or completes a qualifying action). Track with Branch/AppsFlyer or the DIY clipboard trick (see `build-affiliate-program`).

```ts
// extend a subscription via RevenueCat when a referral converts
import Purchases from 'react-native-purchases';
await Purchases.grantPromotionalEntitlement({
  entitlementIdentifier: 'pro',
  durationTimeUnit: 'MONTH',
  durationUnits: 1,
});
```

Referred users are higher quality: **16–25% higher LTV, 18–37% lower churn, and refer others at 2–3× the rate.** The viral loop compounds on better cohorts.

## Invite-to-unlock (the Duolingo/clubhouse model)

Gate a desirable feature or content behind inviting N friends. "Invite 3 teammates to unlock Pro for 30 days." Turns referrals into a quest. Duolingo historically drew ~80% of new users from organic/word-of-mouth using streaks, XP, leaderboards, and invite-to-unlock. ([molfar.io](https://www.molfar.io/blog/viral-loops))

### Variants

- **Invite-only / waitlist** (Clubhouse) — limited invites per user; invites become precious status symbols. A waitlist with "invite friends to move up the queue" turns scarcity into virality.
- **Staged rollout** (Instagram was iOS-only for 18 months → pent-up Android demand = 1M downloads Day 1).
- **Collaborative unlock** — features that get better with friends (shared boards, group challenges).

## Gamification loops compound virality

Streaks, XP, badges, leaderboards — users share achievements organically. Design the app so that progress is visible and screenshot-worthy, then surface the share at the milestone. See `design-retention-loop` for the habit side; the shareable side is `design-shareable-result-card`.

## Measure the loop

```text
invite_prompt_shown       {trigger}
invite_sent               {channel: share_card|link|email|sms|code}
invite_landed             // incoming, attributed
referred_install          // deferred — needs Branch/AppsFlyer
referred_activate         // reached activation
referred_trial_start
referred_convert
reward_granted            {to: referrer|invitee, type}
```

Compute **K** per cohort: `(referred_installs attributed to this cohort) / (cohort size)`. Track K over time; a rising K means the loop is tightening. Also track **viral cycle time** (share → convert) — shorter cycles compound faster.

## What not to do

- **Don't force sharing.** Mandatory share-to-continue is a dark pattern and tanks ratings.
- **Don't reward only one side** of a give-get.
- **Don't use lossy attribution** for paid affiliate payouts — you'll anger partners when you can't pay them accurately. Use Branch/AppsFlyer or Spark Ads attribution for anything money touches.
- **Don't run virality before activation works.** A viral loop on an app that doesn't activate users just burns social capital — referred users bounce and never refer onward.

## Pair with

- `design-shareable-result-card` — the primary `i` lever for most apps.
- `build-affiliate-program` — commission-based referrals (the sibling mechanic).
- `build-creator-program` — paid amplification of organic virality.
- `add-deep-links` — so shared links open the app.
- `design-retention-loop` — retention and virality reinforce each other.
