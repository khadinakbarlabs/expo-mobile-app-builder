---
name: "competitor-paywall-analysis-android"
description: "Screenshot competitor Android paywalls, decode their offer, pricing structure, base plans + offers, urgency tactics, and trial structure. Use when the user says 'analyze android paywall', 'how do android competitors price', 'play billing paywall research'."
---

# Competitor Paywall Analysis (Android)

Same approach as iOS `competitor-paywall-analysis`, with Play Billing specifics.

## Capture each paywall

### Visual
- Full screenshot of paywall screen
- If multi-step (e.g., trial timeline → plans → confirm), screenshot each
- Screenshot the Play Billing native sheet that appears after CTA

### Offer structure (Play-specific)

| Field | Where to find |
|---|---|
| Base plans | Listed in their offer modal |
| Intro offers | Trial / discounted first period |
| Renewal offers | Promo for cancelled users |
| Multi-currency | Switch country in VPN to check |
| Free trial length | 3/7/14 day options |
| Paid trial | $0.99 trial → full price (less common Android) |

### Copy
- Headline
- Sub-headline
- Feature bullets
- Trial timeline visual
- Restore / cancel link visibility
- CTA copy
- Footer fine print

## Android-specific patterns to look for

### Base plans + offers structure
Google Play Billing supports multi-step offers. Look for:
- "Free 7 days, then $X/mo" (trial → recurring)
- "$0.99 first month, then $X/mo" (paid trial → recurring)
- "Save 30% first 3 months" (intro discount)
- "Pay annually, save 50%" (alternate billing period)

### Currency localization
Switch VPN country and re-check. Most Play apps use Google's auto-localized pricing.

### External payments (rare but spreading)
Some apps now offer external checkout via web (allowed in EEA, UK, India for select apps). Look for "Pay via web" or external link.

## Anti-patterns (avoid)

- Hiding restore button (Play rejection risk)
- No clear cancel link (Play policy violation)
- Auto-renew trial without preview (regulator scrutiny)
- Fake urgency timers
- "Limited offer" always present

## Output

`research/paywalls/[competitor]-android.md`:
- Screenshots (paywall + Play Billing sheet)
- Plan structure (base plans + offer tokens)
- Pricing across 3 currencies (US/IN/BR)
- Trial structure
- Copy hierarchy
- Conversion-impacting patterns to steal
- Compliance issues to avoid

## Apply

- `revenuecat-paywall-builder-android` to design your version
- `pricing-strategy-android` to set your prices
- `base-plans-and-offers` to wire up Play Billing equivalent

## Pair with
- `competitor-feature-matrix` to compare paywalls across competitors
- `superwall-android` for A/B testing your version
