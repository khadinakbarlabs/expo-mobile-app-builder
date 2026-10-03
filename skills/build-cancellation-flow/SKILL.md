---
name: "build-cancellation-flow"
description: "Build a cancellation / churn-interception flow with an exit survey, reason-matched save offers, and graceful exit — preserving rating and recovering 10–35% of cancellations. Use when the user says 'cancellation flow', 'cancel survey', 'save offer', 'prevent churn', 'subscription cancel', 'downgrade flow', or 'retention offer'."
---

# Build a cancellation flow

The screen a user sees when they hit "cancel subscription" is one of the highest-leverage revenue surfaces in a subscription app. A well-designed flow saves **10–35%** of cancellations (offer acceptance 15–25%, pause reactivation 60–80%); even a simple survey + one offer saves 10–15% over an instant cancel. This skill designs it.

## The canonical structure

```text
Trigger (user taps Cancel)
  → Survey (why are you leaving?)
    → Reason-matched save offer
      → Accept (saved) | Defer (pause) | Confirm cancel (graceful exit)
        → Post-cancel: win-back eligibility + email capture
```

## The exit survey

5–8 reason options + free text. Framing matters: **"Help us improve"** beats "Why are you leaving?" — it reduces defensiveness and raises completion.

Typical reasons (match these to the product):
- Too expensive
- Not using enough
- Missing a feature
- Found an alternative
- Technical issues / bugs
- Just needed it temporarily
- Hard to use
- Other (free text)

Capture the reason in your analytics (`instrument-growth-funnel`) tied to the user. The reason is also the input to the save offer and to product roadmap prioritization.

## Reason-matched save offers

Don't show every canceler the same offer. Match the offer to the reason:

| Cancel reason | Primary offer | Fallback |
|---|---|---|
| **Too expensive** | 20–30% off for 2–3 months | Downgrade to a cheaper tier |
| **Not using enough** | Pause 1–3 months (keeps access, stops billing) | Free onboarding / usage nudge |
| **Missing feature** | Roadmap + timeline for the requested feature | A workaround or alternative path |
| **Technical issues** | Escalate to support immediately; credit + priority fix | Free month while they wait |
| **Found alternative** | Differentiated value recap + offer | Graceful exit (don't badger) |
| **Temporary use** | Pause or annual at a discount for next cycle | Graceful exit |

## Discount guardrails (avoid training cancel-for-deals)

- **Sweet spot: 20–30% off for 2–3 months.** Enough to matter, short enough to not devalue.
- **Avoid routine >50% off.** Trains users to cancel expecting a deal; they'll repeat the cycle.
- **Show the dollar amount, not just the percentage.** "$4 off for 3 months" lands better than "25% off."
- **Time-limit the offer.** "Claim by [date]" — but only a real deadline, not a fake countdown (Apple rejects fake urgency).
- **One offer per cancel session.** Don't cascade discounts if they reject the first.

## Pause as an alternative to cancel

A "pause for 1–3 months" option (billing stops, access preserved or reduced) reactivates at **60–80%** vs much lower reactivation after a full cancel. Where the billing systems support it, offer pause prominently. StoreKit 2 doesn't have a native "pause," but you can implement it via a free-trial/promotional-offer bridge or by letting the subscription lapse and re-engaging. Google Play supports pausing natively in some configurations.

## Graceful exit (non-negotiable for your rating)

Keep "Continue cancelling" visible and one tap away at every step. **No dark patterns.** The FTC's Click-to-Cancel rule requires cancellation to be at least as easy as sign-up. A user who feels trapped by a cancellation flow leaves a 1-star review. See `build-review-routing` — the same unhappy-user principle applies.

After confirming cancel:
- Capture an email (if not already on file) for win-back. See `build-win-back-flow`.
- Keep premium access until the period ends (they paid for it).
- Subscribe to server notifications (`SUBSCRIPTION_CANCELED`) to distinguish cancel-but-active from genuinely lapsed.

## Implementation (RevenueCat)

RevenueCat exposes customer info and entitlement state. Build the survey + offer UI yourself; present the offer as a StoreKit promotional offer or a RevenueCat-managed discount:

```tsx
import Purchases from 'react-native-purchases';

// On cancel-reason selected, present the matched offer
async function presentSaveOffer(reason: CancelReason) {
  const offer = matchOfferToReason(reason); // your mapping
  // present the offer as a promotional offer / discounted package
  const offerings = await Purchases.getOfferings();
  const pkg = offerings.all?.[`save_${reason}`];
  // show pkg in a save-offer sheet; if accepted:
  // const { customerInfo } = await Purchases.purchasePackage(pkg);
}
```

Track the funnel: `cancel_started`, `cancel_survey_completed {reason}`, `save_offer_presented {type}`, `save_offer_accepted`, `cancel_confirmed`, `cancel_paused`.

## What not to do

- **No multi-step mazes** that make cancel hard. FTC Click-to-Cancel + App Review both penalize this.
- **No fake countdowns** on the save offer.
- **No guilt-trip copy** ("Are you sure you want to give up on your goals?"). Confirmshaming is a dark pattern and a rating killer.
- **No repeated discount escalation** if they reject the first offer.
- **No blocking the cancel** behind a support chat (chat is fine as one option, not a gate).

## Pair with

- `integrate-revenuecat-rn` — entitlement state and promotional offers.
- `app-store-server-notifications` / `app-store-server-notifications-android` — cancel vs lapsed signals.
- `build-win-back-flow` — the post-cancel recovery arm.
- `pricing-strategy` — discount guardrails.
- `instrument-growth-funnel` — measuring save rate by reason.
