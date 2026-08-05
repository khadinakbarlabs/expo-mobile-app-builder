---
name: "pricing-strategy-android"
description: "Set Android subscription pricing tuned to per-country purchasing power (PPP). Use when the user says 'pricing android', 'play store pricing', 'subscription tiers android'."
---

# Pricing Strategy (Android)

Android user base = global. Per-country PPP matters more than iOS.

## Default tiers (US baseline)

| Tier | Price | Conversion |
|---|---|---|
| Weekly | $4.99 | 0.5% — psychological anchor |
| Monthly | $9.99 | 2% — most common |
| Yearly | $59.99 (save 50%) | 5% — best LTV |
| Lifetime | $99 | 1% — for committed users |

## Per-country pricing

Play supports per-country pricing as of 2025 (Pricing Templates were removed Oct 2025; per-product per-country now).

| Country | Suggested multiplier | Why |
|---|---|---|
| US | 1.0 (baseline) | High ARPU |
| India | 0.10-0.20 | Low PPP; UPI common |
| Brazil | 0.30-0.40 | Mid PPP |
| Indonesia | 0.10-0.15 | Low PPP |
| EU | 0.85-0.95 | Slightly lower than US |
| Japan | 0.95-1.05 | Similar to US |
| Russia | 0.20-0.30 | Lower PPP |

Example: US $9.99/mo → India $1.49/mo → Brazil $3.99/mo

## Free trial vs intro pricing

### Free trial 7 days
- Lower upfront commitment
- Higher install rate
- 50-60% convert after trial
- Lower LTV than paid trial

### Intro pricing ($0.99 first month)
- Filters non-payers immediately
- Higher LTV
- Lower install rate
- 70-80% retain after first month

## Recommendation per market

| Market | Best |
|---|---|
| US/EU/JP/AU | Free trial 7 days |
| India/Brazil/Indonesia | Lower base price (no trial; users hate trials in low-PPP) |
| Russia/Turkey | Free trial 7 days with low base price |

## Anchor + highlight

Always show 3 tiers with middle highlighted "BEST VALUE":
- Monthly: $9.99
- Yearly: $59.99 — "BEST VALUE - Save 50%"
- Lifetime: $99 — "One-time"

## Raising prices

- For new users: change in Play Console → effective immediately
- For existing subs: Play sends email 7 days before; users opt-in
- ~70% accept; ~30% cancel
- Math: only worth raising if >+15% effective ARPU

## Pair with
- iOS plugin's `pricing-strategy`
- `localize-figs-j-android` (price localization)
- `competitor-paywall-analysis-android` (price recon)
