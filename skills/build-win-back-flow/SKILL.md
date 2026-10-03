---
name: "build-win-back-flow"
description: "Build a win-back flow for lapsed and churning subscribers using Apple StoreKit 2 win-back offers, RevenueCat campaigns, and segmented messaging. Use when the user says 'win-back', 'lapsed users', 'churn recovery', 'bring users back', 'expired trial', 'canceled subscription', 'reactivation', or 'promotional offer'."
---

# Build a win-back flow

Win-back is recovering users who have lapsed — expired trials, canceled subscriptions, or gone inactive. It is one of the highest-ROI growth motions because reactivating a known user is far cheaper than acquiring a new one, and the data shows most churn is recoverable if you act on it.

## Segment first — different lapsed states need different offers

Never treat all churn the same. The message and offer must match the segment:

| Segment | Definition | Best offer |
|---|---|---|
| **Expired trial** | Started a trial, never converted | Discounted first period; surface the value they didn't see; remove friction |
| **Lapsed subscriber** | Paid, then canceled or let it expire | Win-back offer (StoreKit 2); "we miss you" + what's new since they left |
| **Inactive free user** | Was active, hasn't opened in 10+ days | Re-engagement push/email with a specific reason to return; no paywall |
| **Involuntary churn** | Payment failed | Dunning/retry — see below; this is the most recoverable of all |

## The Apple/Google win-back primitives

### Apple StoreKit 2 win-back offers (iOS 18+)

Configured in App Store Connect, target subscribers whose subscription has **expired** (lapsed, not active). RevenueCat and Superwall both expose them. The user sees the offer on the App Store product page, in App Store emails, and you can present it in-app.

- Up to a limited number of win-back offers per subscription group.
- Discounted price for a set duration (e.g., 50% off for 3 months).
- Presented via StoreKit; RevenueCat surfaces them in the offerings/entitlements API.

```tsx
// RevenueCat: detect eligibility and present a win-back offering
import Purchases from 'react-native-purchases';
const offerings = await Purchases.getOfferings();
const winback = offerings.all['winback_expired']; // offering configured for lapsed segment
```

### Apple promotional offers

Target **existing or previous** subscribers with a discounted price for a set duration. More flexible than win-back offers (you control eligibility in your backend) and can target currently-active subscribers too.

### Google Play

No equivalent first-class "win-back offer" primitive, but you can use promo codes and in-app messaging to the same effect. Subscribe to Real-Time Developer Notifications (RTDN) for `SUBSCRIPTION_CANCELED`, `SUBSCRIPTION_EXPIRED`, and `SUBSCRIPTION_ON_HOLD` to trigger flows. See `app-store-server-notifications-android`.

## Involuntary churn is the easy win

**30–50% of total churn is involuntary** (failed payments), and it's the most recoverable. On Google Play, nearly a third of cancellations are involuntary billing failures vs just 14% on Apple. ([RevenueCat State of Subscription Apps](https://www.revenuecat.com/state-of-subscription-apps))

- **Dunning emails** ("your payment failed — update your card") + **smart retries** recover an estimated **50–60%** of failed payments.
- Apple/Google handle billing retries on their side, but surface grace-period and account-on-hold states to the user in-app with a clear "update payment method" CTA.
- Subscribe to server notifications (`app-store-server-notifications`, `app-store-server-notifications-android`) to react to `BILLING_RETRY`, `GRACE_PERIOD`, `ACCOUNT_HOLD`.

## The win-back campaign structure (RevenueCat web checkout)

RevenueCat supports routing win-back offers through a **web checkout** to bypass the 15–30% store commission — present the lapsed user with a "Claim your offer" button (push, email, or in-app banner), route to a Stripe-hosted web checkout, then restore access in-app immediately on success. This works in regions/states where alternative billing is permitted; respect current Apple/Google policy and regional law before relying on it.

### Timing

- **Expired trial**: wait 1–3 days, then a single "we saved your progress" + discounted offer. Don't spam.
- **Lapsed subscriber**: at genuine expiry (when premium access actually ends, not when they hit cancel), then again at 7/30/60 days with escalating personalization.
- **Inactive free user**: 3 days silent → gentle nudge; 7 days → direct message + incentive; 14 days → escalated offer. (See `design-lifecycle-messaging`.)

## The cancel-vs-expire distinction (important)

A user who *cancels* (turns off renewal) but is still in their paid period is **not yet lapsed** — don't fire a win-back. Wait until premium access actually expires. Firing win-back at cancel-time cannibalizes the subscription they're still paying for. Use server notifications to distinguish `SUBSCRIPTION_CANCELED` (still active until period end) from `SUBSCRIPTION_EXPIRED` (lapsed).

## Messaging that converts

- **Name the specific value they're missing.** "Your 47-day streak is frozen. Come back before you lose it." Not "We miss you!"
- **Surface what's new since they left.** Features, content, improvements. Give them a reason beyond the discount.
- **Make the offer time-limited and specific.** "50% off your next 3 months — claim by Friday." Not "a discount."
- **One clear CTA.** Claim offer / update payment / come back. No menus.

## Measure

```text
winback_segment_assigned   {segment: expired_trial|lapsed|inactive|involuntary}
winback_message_sent       {channel: push|email|in_app|web}
winback_offer_presented
winback_offer_claimed
winback_reactivated        // returned to active subscription or active use
winback_revenue            // attributed revenue from the campaign
```

Track reactivation rate and attributed revenue per segment. Win-back ROI is typically far higher than new-user acquisition ROI.

## What not to do

- **Don't fire win-back at cancel-time.** Wait for genuine expiry.
- **Don't spam.** One well-timed, personalized message beats five generic ones.
- **Don't offer >50% off routinely** — trains users to cancel-for-deals. Cap routine win-back at 20–30% for 2–3 months. See `build-cancellation-flow`.
- **Don't ignore involuntary churn** — it's the biggest, cheapest recovery pool and the most neglected.

## Pair with

- `integrate-revenuecat-rn` — win-back offerings, web checkout, server notifications.
- `app-store-server-notifications` / `app-store-server-notifications-android` — the lifecycle signals that trigger win-back.
- `build-cancellation-flow` — intercept active churn *before* it becomes win-back territory.
- `design-lifecycle-messaging` — the cross-channel cadence this lives in.
- `pricing-strategy` — discount guardrails.
