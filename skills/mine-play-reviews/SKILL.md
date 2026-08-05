---
name: "mine-play-reviews"
description: "Pull Play Store reviews for competitor apps, categorize complaints (love/hate/bug/feature-request) and extract positioning gold. Use when the user says 'mine play reviews', 'analyze play store reviews', 'what do users hate about play app', 'review research android'."
---

# Mine Play Store Reviews

Same methodology as iOS `mine-competitor-reviews`, with Play-specific tools.

## Why Play Store reviews differ from App Store
- Longer reviews on average (Play allows 500 chars, App Store 1500 but used shorter)
- More technical complaints (device-specific, Android-version-specific)
- More negative skew in emerging markets (lower expectations? lower English?)
- Developer can REPLY to reviews — public conversation
- Ratings can be updated by user → trend over time per user

## Tools to pull reviews

### Free
```bash
# google-play-scraper (Node)
npm install -g google-play-scraper

node -e "
const gplay = require('google-play-scraper');
gplay.reviews({
  appId: 'com.example.app',
  country: 'us',
  sort: gplay.sort.NEWEST,
  num: 500
}).then(r => console.log(JSON.stringify(r, null, 2)));
"
```

### Paid (faster, more countries)
- AppFollow ($79/mo) — reviews + automated categorization
- AppTweak — reviews + sentiment analysis
- Apify "Google Play Reviews Scraper" actor — pay per review pulled

## Categorize each review

Same buckets as iOS:
- **LOVE** — what they praise
- **HATE** — what they want fixed
- **BUG** — specific issues + device/Android version
- **FEATURE-REQUEST** — explicit asks
- **PRICING-COMPLAINT** — billing pain
- **CHURN-REASON** — why they're switching
- **DEVICE-SPECIFIC** — works on Pixel but not Samsung

## Android-specific patterns to look for

- "Stops working on [Android version]" — your minSdk + targetSdk decisions
- "Drains battery" — background work issues
- "Crashes on [device model]" — manufacturer quirk
- "Permission too aggressive" — over-asking
- "Ads too aggressive" — common complaint, lower bar to win
- "[Manufacturer] notifications don't work" — Xiaomi/Oppo battery optimization kills

## Output

`research/competitor-reviews/[competitor].md`:
- Reviews analyzed (count + date range)
- Avg rating + trend
- Top 10 LOVE patterns
- Top 10 HATE patterns
- Top 10 FEATURE REQUESTS
- Top 10 BUG patterns with device specificity
- Top 5 churn-reasons
- Quotes for App Store copy

## What to do with the gold

1. **HATE patterns → your wedge** (be the app that doesn't do X)
2. **FEATURE REQUESTS → your roadmap shortcuts** (build the top 3)
3. **BUG patterns → your QA matrix** (test on the listed devices)
4. **CHURN REASONS → your acquisition channel** (target unhappy users via ads)

## Pair with
- `mine-reddit-android-pain-points` for off-Play complaints
- `dissect-competitor-android-app` for full teardown
- `respond-to-reviews-play` to see how leaders engage
