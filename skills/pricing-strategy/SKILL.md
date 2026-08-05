---
name: "pricing-strategy"
description: "Decide subscription pricing tiers, trial length, packaging using 2026 market benchmarks (Adapty, RevenueCat). Use when the user says 'what should I charge', 'pricing strategy', 'subscription tiers', 'trial length', 'weekly vs annual'."
---

# Pricing Strategy

Pick subscription pricing that maximizes LTV without nuking conversion.

## 2026 indie sweet spots (Adapty + RevenueCat State of Subs 2026)
- **Weekly $4.99-$5.99 + 3-day trial** — current LTV champion. Highest-LTV: weekly $5.99 + 3-day trial → $49.27 LTV at 12 months.
- **Monthly $9.99-$14.99** — anchor/decoy.
- **Annual $39.99-$49.99** — primary commitment offer.
- **Lifetime $99-$199** — third option, anchors and captures power users.

Weekly plans = 55.6% of all app sub revenue in 2025 (up from 43.3% in 2023). Weekly converts 1.7x-7.4x better than annual.

## Decision tree
```
Habit-formed app (used most days)?
  YES → Weekly + Annual (no monthly). Weekly captures cash, annual captures committed users.
  NO  → Monthly + Annual. Weekly feels excessive for occasional-use apps.

AOV per user > $30?
  YES → Add Lifetime as third option.
  NO  → Skip lifetime.

Saturated category (food log, AI photo)?
  YES → Lower entry: weekly $4.99 + 3-day trial; annual at 75% off weekly equivalent.
  NO  → Standard pricing.
```

## Trial length + payment method
- **Opt-out trial (card required)**: 48-60% trial-to-paid
- **Opt-in trial (no card)**: 18-25% trial-to-paid

Card-required converts 2-3x better but suppresses trial starts. Default: **3-day trial + card required**.

## Hard vs soft paywall
- **Hard paywall**: 10.7% conversion, $3.09 RPI day 14
- **Soft / freemium**: 2.1% conversion, $0.38 RPI day 14
- **Hybrid soft → hard**: 16.5% indie conversion (best of both)

If your app delivers obvious value in <60s, hard paywall on session 2 (after free first session). If value takes longer, soft → hard hybrid.

## Apple fees in 2026
- **Small Business Program**: **15% on everything** if <$1M proceeds prior calendar year. Enroll day 1.
- **Standard tier**: 30% first 12 months / 15% from month 13 (per subscriber).
- April 2026: Apple introduced cheaper subscription tier option for testing lower price points.

## Output format
```
PRICING PLAN
├── Weekly: $4.99 with 3-day free trial (PRIMARY)
├── Annual: $39.99 (anchor, $0.77/wk equivalent)
├── Lifetime: $99 (third option)
├── Trial: card required (opt-out)
└── Paywall: HARD on session 2, post-onboarding quiz

EXPECTED METRICS
├── Trial start: 25-34%
├── Trial-to-paid: 48-60%
├── Day 14 RPI: $1.50-$3.09
├── 12-month LTV: $40-$50
```

## Reference
`references/03-monetization.md`
