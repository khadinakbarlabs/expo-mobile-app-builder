---
name: "design-paywall-android"
description: "Design an Android paywall that's Play-compliant and converts: trial timeline, plan comparison, restore button, cancel link visibility. Use when the user says 'design paywall android', 'play compliant paywall', 'paywall ui android'."
---

# Design Paywall (Android)

Play Store has paywall rules — bake compliance in from design phase.

## Play compliance requirements

1. **Free trial terms clear** — show what's free, when billing starts, exact amount
2. **Restore purchases button visible** (not hidden, not in submenu)
3. **Cancel link or instructions** — direct to Play Store subscription management
4. **No dark patterns** — fake urgency, hidden auto-renewal
5. **No external payment links** (except in EEA/UK/US if enrolled in External Payments)
6. **No misleading "FREE" if free trial converts to paid**

## High-converting structure (2026)

### Above the fold
- Headline: outcome-specific ("Save 5kg in 30 days")
- Sub-headline: how ("AI workout coach personalized to you")
- Trial timeline visual (Cal AI style)
  - Day 1: Free access
  - Day 5: Reminder before charge
  - Day 7: Charged $X
  - "Cancel anytime"

### Plans
- Anchor + highlight pattern:
  - Monthly $14.99 (anchor, not highlighted)
  - Yearly $59.99 — "BEST VALUE • Save 67%" (highlighted, default-selected)
  - Lifetime $99 (one-time, optional)
- Toggle between billing periods
- Per-week math: "$1.15/week" for psychological pricing

### Below
- Features list (5-7 bullets)
- Social proof: "2.3M users transforming..." OR review quote
- Restore button — visible, labeled "Restore Purchases"
- Cancel info: "Cancel anytime in Play Store"
- Privacy + Terms links
- Footer fine print

## Material 3 layout

- Use `Card` with elevation for plans
- Use `Chip` filter for billing period toggle
- Use `Button` with `mode="contained"` for primary CTA
- FAB pattern doesn't apply here

## Android-specific gotchas

- Bottom safe area: leave padding for gesture bar
- Edge-to-edge: content extends under status bar — pad header
- Predictive back: dismiss should respect Android back behavior
- Google Play sheet: appears on top after CTA — design assuming sheet shows YOUR product preview

## Test paywall on real device + sandbox tester

Use `test-paywall-play-billing` skill to wire up.

## Avoid (Play rejection risks)

- Hiding free trial terms
- Pre-checking "auto-renew" without clear disclosure
- Fake countdown timer that always shows same time
- "Limited offer" that's always there
- Restore button below 2 scroll heights

## Pair with
- `revenuecat-paywall-builder-android` to build via RC Paywalls v2
- `superwall-android` for A/B testing
- `paywall-compliance-play` for full compliance checklist
- `restore-purchases-android` for restore UX
