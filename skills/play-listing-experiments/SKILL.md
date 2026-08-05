---
name: "play-listing-experiments"
description: "Run Play Store native A/B listing experiments (titles, screenshots, icons, descriptions). Use when the user says 'listing experiment play', 'a/b test play listing', 'play store experiments'."
---

# Play Listing Experiments

Native A/B testing in Play Console. Better than guessing.

## What you can test

- Default graphics (icon, screenshots, video) — global
- Localized graphics — per language
- Localized text (title, short desc, long desc) — per language
- Default text — global

## Setup

Play Console → Grow → Store listing experiments → Create experiment.

1. Choose what to test (e.g., icon variant)
2. Upload 2-4 variants (A vs B vs C vs D)
3. Set traffic split (typically 25% each for 4 variants)
4. Min 7 days, recommended 14+
5. Need 90% confidence for winner declaration

## What works in Play experiments

- **Icon variants** — single biggest install lift potential
- **Screenshot order/style** — first 2 drive most installs
- **Short description variants** — keyword effects
- **Long description variants** — less impactful, longer test

## What's harder to A/B

- Title (rarely changed, branding-tied)
- Category (massive change, not A/B-able)
- Pricing (not part of listing)

## Statistical requirements

- Min 1000 installs per variant for significance
- Top apps: 7 days for clear winners
- Long-tail apps: 14-28 days

## Common variants to try

1. Icon: cartoon vs photo vs logo
2. Screenshot 1: text-overlay vs phone-only vs lifestyle
3. Screenshot 1 hook: "TRACK X" vs "SAVE Y" vs "FINALLY Z"
4. Short desc: outcome-led vs feature-led

## Multi-locale strategy

Localized experiments per country. India + Brazil might have different winners than US.

## Apply winner

When confidence >90%, click "Apply" → variant becomes new default. Then start next experiment.

## Common gotchas
- Low install volume → no significance, run longer
- Tested too many variables at once → don't know which mattered
- Promoted "winner" with marginal lift → keep iterating
- Forgot to localize → US winner ≠ India winner

## Pair with
- `design-screenshots-play` for screenshot variants
- `design-app-icon-adaptive` for icon variants
- `custom-store-listings` for per-country variants
