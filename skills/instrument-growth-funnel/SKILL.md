---
name: "instrument-growth-funnel"
description: "Instrument the full mobile growth funnel — install → activate → trial → convert → retain → refer — with the right events, cohort analysis, and the 2026 RevenueCat benchmarks to beat. Use when the user says 'what should I track', 'analytics events', 'growth metrics', 'funnel tracking', 'cohort analysis', 'instrumentation', 'KPI dashboard', or 'how do I measure my app'."
---

# Instrument the growth funnel

Decide *what to measure* before *how*. This skill defines the canonical mobile growth funnel, the events for each stage, the cohort discipline, and the 2026 benchmarks to beat. It pairs with `add-posthog-rn` (which installs the SDK) and the monetization skills — those tell you *what* the events mean.

## The canonical funnel

```text
install → activate → trial-start → trial-convert → retain → refer
```

Every metric you care about is a rate between two of these stages. If you instrument nothing else, instrument these conversions.

## The metrics (with 2026 RevenueCat medians to beat)

| Metric | What | 2026 median | Top decile |
|---|---|---|---|
| **Activation rate** | % of installs reaching the "aha" event | varies by app | — |
| **Trial-start rate** | downloads → trial started (D30) | 6.2% | 20.3% (p90) |
| **Trial-to-paid** | trial → converted | 25.5% (short trial) | 42.5% (long trial) |
| **Paywall conversion (hard paywall)** | paywall view → purchase | 10.7% | 38.7% |
| **Paywall conversion (freemium)** | paywall view → purchase | 2.1% | — |
| **Day-35 download→paid** | the ultimate funnel metric | hard: 12.1%, freemium: 2.2% | — |
| **D1 retention** | % back day after install | 26% avg | 30–40%+ good |
| **D7 retention** | | 13% avg | 15–20%+ |
| **D30 retention** | | 7% avg | 7–10%+ |
| **Stickiness (DAU/MAU)** | | — | >20% target |
| **12-mo RLTV** | revenue per payer | Health $35, Business $35, Gaming $11 | — |

Sources: [RevenueCat State of Subscription Apps 2025](https://www.revenuecat.com/state-of-subscription-apps-2025/), [Adapty State of In-App Subscriptions 2026](https://adapty.io/state-of-in-app-subscriptions/). **82% of trial starts happen on Day 0** — the onboarding window *is* the funnel.

## The event vocabulary (stable, low-cardinality)

Use these names verbatim. Low cardinality = don't put free-text user input in event properties; it explodes your bill and adds no analytic value.

```text
// Acquisition
install                        {source, campaign, medium}  // from MMP (Branch/AppsFlyer) where allowed
activate                       {activation_type}           // the "aha" event for THIS app

// Onboarding
onboarding_started
onboarding_step_viewed         {step_id, step_index, job}
onboarding_step_completed      {step_id, step_index}
onboarding_abandoned           {last_step_id}
permission_pre_prompt_viewed   {permission}
permission_result              {permission, result}

// Monetization
paywall_viewed                 {placement}                 // onboarding_end, feature_gate, sale, winback
paywall_dismissed              {placement}
trial_started                  {plan, trial_length}
trial_converted                {plan}
purchase_completed             {plan}
purchase_refunded              {plan}
subscription_canceled          {reason}                    // from cancel survey
subscription_expired                                       // genuine lapse

// Retention
session_start                                              // for DAU/MAU
core_action_completed          {action}                    // the habit action
streak_updated                 {count}
push_received / push_opened    {campaign}
message_sent / message_opened  {channel, campaign}

// Referral / virality
share_card_shown               {trigger}
share_card_shared              {surface}
invite_sent                    {channel}
referred_install                                           // deferred attribution

// Neutral review eligibility; feedback is independent of ratings
review_eligibility_checked     {milestone, eligible, reason}
review_prompt_requested        {platform, milestone}
feedback_opened                {surface}
// A request is not proof the native UI appeared or a rating was submitted.
```

**Never** send free-form answers, health details, or other sensitive values as analytics properties by default. Use a documented consent and data-minimization contract; hashing a sensitive value does not make it anonymous.

## Cohort analysis (mandatory, not optional)

Blended metrics lie. Always group users by:

- **Install date cohort** — track each cohort's D1/D7/D30 independently. A strong old cohort can mask a deteriorating new-cohort experience.
- **Acquisition source** — paid vs organic behave completely differently; never blend. Paid cohorts often convert faster but retain worse.
- **Onboarding variant** — if you're A/B testing onboarding (see `set-up-ab-testing`), cohorts per variant.
- **Plan / trial length** — subscription retention differs by plan.

## The stack (RN/Expo)

| Tool | Role | Notes |
|---|---|---|
| **PostHog** | Product analytics + feature flags + A/B + session replay | **Recommended default.** Open source, 1M events/mo free, privacy-friendly (no cross-app tracking → **no ATT trigger**), official RN SDK with Expo Go support. ([r/reactnative](https://www.reddit.com/r/reactnative/comments/1jp1edu/analytics_for_a_react_native_app/)) |
| **RevenueCat** | Subscription analytics (MRR, churn, trial conv, LTV by cohort) | Native to the subscription stack; free tier; "Rico" AI agent. |
| Mixpanel / Amplitude | Alternative product analytics | Cloud-only; solid but PostHog's all-in-one + privacy story wins for indie. |
| Firebase Analytics | Free, unlimited events | Heavy SDK; **including the Ads SDK triggers ATT** — a frequent RN rejection. Use PostHog unless you need the Google ecosystem. |
| AppsFlyer / Branch / Adjust | Attribution (MMP) | Install attribution, deferred deep links. iOS attribution is foggy outside Apple Ads (SKAdNetwork/AdAttributionKit). |

**The ATT trap** (research-validated, the most common RN-specific rejection): including Firebase Analytics with Google Ads/AdMob features, or any tracking SDK, triggers App Tracking Transparency. If denied, IDFA zeros out and you must gate ALL the SDK's data collection behind consent — not just the prompt. PostHog sidesteps this because it doesn't do cross-app tracking. ([r/reactnative ATT rejection](https://www.reddit.com/r/reactnative/comments/1j42fr0/apple_keeps_rejecting_app_due_to_app_tracking/))

## The dashboard (what to look at weekly)

1. **Funnel conversion** week-over-week: install → activate → trial → paid. Where is the leak?
2. **Cohort retention curves** for recent install cohorts. Is D1 dropping?
3. **Paywall conversion by placement** (onboarding_end, feature_gate, winback). See `set-up-ab-testing`.
4. **Subscription health** (RevenueCat): MRR, churn %, trial-to-paid, by plan.
5. **Message performance**: open rate, conversion, and `uninstall_after_send` per campaign (the spam canary).
6. **Acquisition mix**: paid vs organic split, and each cohort's downstream quality.

## Pair with

- `add-posthog-rn` — the SDK install this instruments through.
- `set-up-ab-testing` — experimentation on top of this instrumentation.
- `design-onboarding-funnel` / `design-onboarding-quiz` — the onboarding events.
- `integrate-revenuecat-rn` — subscription analytics.
- `build-review-routing`, `design-retention-loop`, `build-win-back-flow` — they all emit the events defined here.
