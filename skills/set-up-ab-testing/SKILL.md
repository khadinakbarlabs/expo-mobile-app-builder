---
name: "set-up-ab-testing"
description: "Set up A/B testing infrastructure for an Expo/React Native app — the single most-cited growth lever (Cal AI ran 5 real experiments/month across 46 trigger points). Use when the user says 'A/B testing', 'experiment', 'split test', 'feature flag', 'experimentation', 'test paywall variants', or 'optimize conversion'."
---

# Set up A/B testing

Experimentation velocity is the single most-cited differentiator between top-grossing subscription apps and the rest. Cal AI ran **123 experiments across 46 trigger points** (~5 real experiments/month); Nami ML reports top performers run "hundreds of experiments across all funnel pages." ([Superwall](https://superwall.com/case-studies/cal-ai), [Lindsay Giachetti on LinkedIn](https://www.linkedin.com/posts/lindsaysparkles_subscriptiongrowth-experimentation-conversionoptimization-activity-7440523737533239297-JuKN))

A team that runs dozens of experiments per month compounds small wins into outsized revenue. A team that relies on opinion and ship-and-pray does not.

## What to test (by funnel stage)

| Stage | Experiments that move the needle |
|---|---|
| **Onboarding** | Number of steps; quiz question order/wording; "building your plan" animation; personalization depth; pain-amplification copy |
| **Paywall** | Placement (onboarding_end vs feature_gate vs winback); price point; trial length (3 vs 7 vs none); anchor framing; social proof; trial timeline graphic vs text; hard vs soft vs hybrid |
| **Pricing** | Weekly vs annual default; decoy tier presence; lifetime option; regional price points |
| **Retention** | Streak mechanics; notification copy/send-time; re-engagement cadence |
| **Review** | Gate trigger; satisfaction-question copy; timing |
| **Store listing** | Icon, screenshots, short description (Google Play Store Listing Experiments; Apple Product Page Optimization) |

## The tooling (by experiment type)

| Tool | What it tests | Best for |
|---|---|---|
| **RevenueCat Experiments** | Paywall Offerings — price, trial length, product mix, paywall imagery/copy/layout | Subscription/paywall experiments. Full subscription-lifecycle attribution (not just first tap). |
| **Superwall** | Paywall presentation + triggers + audience + variants; Demand Score; Abandoned Transaction Paywalls | Event-triggered placements and fast paywall iteration. Cal AI's tool. Run on top of RevenueCat (observer mode). |
| **Adapty** | A/B/C and beyond, Bayesian ML winner prediction, predictive LTV | When you want many variants at once and ML winner prediction. |
| **PostHog Experiments** | Any UI/flow via feature flags; Bayesian significance; funnel + revenue tracking | Product/onboarding/retention experiments (non-paywall). Free up to 1M events. |
| **Statsig / GrowthBook** | Feature-flag + experiment platforms | Broader product experimentation at scale. |
| **Apple Product Page Optimization** | Store listing variants (up to 3) | ASO — icon/screenshots/title. |
| **Google Play Store Listing Experiments** | icon/short desc/long desc/feature graphic/screenshots | ASO. Free, native, 90% CI, 7–14 day duration, ~100k visitors/variant to detect 5% lift. |

The recommended indie stack: **PostHog** for product/onboarding/retention experiments + **RevenueCat Experiments** (optionally with **Superwall**) for paywall experiments. One tool can't do both well — paywall experiments need subscription-lifecycle attribution; product experiments need flexible flag-driven UI.

## How to run a good experiment (the discipline)

1. **One hypothesis, one primary metric, one guardrail.** "Adding social proof to the paywall increases trial-start (primary); guardrail: trial-to-paid must not drop." Without a pre-declared primary metric, every experiment "wins" on some sliced metric and you ship noise.
2. **Power it.** Most app experiments are radically underpowered. Rule of thumb: you need enough users per variant to detect the minimum effect you care about (often ~5–10% relative lift). For low-traffic funnels, run longer or test bigger changes.
3. **Run one experiment per surface at a time** (or use mutually exclusive experiment slugs). Overlapping experiments on the same funnel stage confound each other.
4. **Decide the decision rule in advance.** What lift/significance will ship? What will kill it? Decide before looking at results.
5. **Watch the guardrail.** A paywall change that lifts trial-start but tanks trial-to-paid is a net loss. See `instrument-growth-funnel`.
6. **Don't peek and stop early.** Bayesian/sequential tools let you, but naive early-stopping inflates false positives.

## Implementation (PostHog feature flag + experiment)

```bash
npx expo install posthog-react-native expo-application expo-device expo-localization expo-file-system
```

```tsx
import { usePostHog } from 'posthog-react-native';

function PaywallScreen() {
  const posthog = usePostHog();
  const variant = posthog.getFeatureFlag('paywall_trial_length'); // '3day' | '7day' | 'none'
  const trialDays = variant === '7day' ? 7 : variant === 'none' ? 0 : 3;

  // The experiment is wired in the PostHog dashboard: flag + experiment,
  // with trial_started as the primary metric and trial_converted as guardrail.

  return <Paywall trialDays={trialDays} />;
}
```

For paywall experiments specifically, prefer RevenueCat Experiments over PostHog flags — RC ties the variant to the Offering and attributes the full subscription lifecycle (trial start, conversion, refund, churn) to the variant, which PostHog can't do for paywall packages.

## Paywall experimentation specifics (Cal AI's playbook)

Don't rely on a single onboarding paywall. Cal AI monetized **46 trigger points**: onboarding end, feature gates (camera scan, barcode, analytics), exit-intent on abandoned transactions, win-back flows (separate for expired trials vs lapsed subs), lifecycle push/email-tied paywalls, and upsells (family plans, lifetime, add-ons). Each trigger point is its own experiment surface. ([Superwall](https://superwall.com/case-studies/cal-ai))

## What not to do

- **Don't run experiments without a pre-declared primary metric and guardrail.**
- **Don't ship on a sliced "win"** (e.g., "it won for iOS users in the US on Tuesday"). That's noise.
- **Don't run overlapping experiments on the same funnel stage** without mutually-exclusive slug allocation.
- **Don't run paywall experiments on a funnel that isn't instrumented** — you can't optimize what you can't measure end-to-end.
- **Don't test tiny changes on low traffic** — you'll never reach significance and you'll burn experiment velocity.

## Pair with

- `instrument-growth-funnel` — the metrics experiments optimize.
- `add-posthog-rn` — the SDK for product experiments.
- `integrate-revenuecat-rn` — the substrate for paywall experiments.
- `design-paywall`, `design-onboarding-funnel` — the surfaces most often tested.
- `custom-product-pages`, `play-listing-experiments` — store-listing experiments.
