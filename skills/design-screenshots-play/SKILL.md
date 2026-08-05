---
name: "design-screenshots-play"
description: "Design Play Store screenshots that convert: hook + benefit, text overlay, 8 screenshots, multi-device sizes. Use when the user says 'play store screenshots', 'design android screenshots', 'screenshot hook android'."
---

# Design Play Store Screenshots

Play Store shows 8 screenshots above the fold. First 2 drive 70% of installs.

## Required sizes

- Phone: 1080×1920 (portrait) or 1920×1080 (landscape) — JPEG/PNG, 24-bit, no alpha
- 7" tablet: 1200×1920
- 10" tablet: 1600×2560

You can submit just phone size; Play auto-fits. But tablet-specific screenshots boost tablet installs.

## What works in 2026

### Hook-first (first screenshot)
- Big bold text overlay
- "TRACK ANY HABIT" or "BUDGET ON AUTOPILOT"
- Phone framed centered, screen showing dashboard
- Background = brand color OR lifestyle context

### 8-screenshot narrative arc

1. **Hook** — "What this does" + main screen
2. **Problem-solution** — "Stop doing X" + before/after
3. **Feature 1** — most-used feature
4. **Feature 2** — second feature
5. **Social proof** — "Used by 1M+" or review quote
6. **Feature 3** — third feature
7. **Multi-device** — Watch / tablet shot
8. **CTA** — "Get started" with paywall preview

## Patterns that work (Android-specific)

### Phone-only with text overlay (most common)
- Phone in the center, your screen on it
- Bold text top or bottom
- Brand color background

### Lifestyle / context
- Phone in hands, in real-world use
- Higher production cost, harder to iterate
- Works for lifestyle apps (fitness, social, food)

### Multi-language overlays
Render same screenshots per language. Critical for India/Brazil/Indonesia.

## Tools

- **Figma + Phone mockup templates** — fastest iteration
- **Screenshot.rocks** — fast browser tool
- **AppMockUp** — free, web-based
- **Previewed** — paid, premium templates
- **Hotpot AI** — AI-generated

## Conversion-optimized framework

1. Look at top 5 competitors' screenshots
2. Note their hook style
3. Test 3 variants of your hook via Listing Experiments (`play-listing-experiments`)
4. Update top performer to all locales

## Common rejections

- Screenshots with App Store UI (Apple icons visible on Play submission)
- Misleading screenshots (showing features that don't exist)
- Quality (low-res, pixelated)
- Wrong aspect ratio
- Promotional text in screenshots that violates Play policy ("BEST APP EVER" type)

## Pair with
- `play-listing-experiments` for A/B testing
- `localize-figs-j-android` for per-locale screenshots
- `custom-store-listings` for per-country variants
