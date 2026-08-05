---
name: "competitor-aso-teardown"
description: "Reverse-engineer competitor App Store listings: keywords they target, screenshot order, CPP variants, ratings strategy. Use when the user says 'competitor aso', 'analyze their app store page', 'what keywords do they rank for', 'screenshot teardown', 'aso research'."
---

# Competitor ASO Teardown

Reverse-engineer their App Store presence. Their keywords, screenshots, ratings, and CPP variants are public — extract them all.

## What to capture

### Listing basics
- App name (visible: 30 chars + subtitle 30 chars)
- Subtitle
- Promotional text (170 chars)
- Description first 250 chars (above-fold on App Store page)
- Category (primary + secondary)
- Age rating
- Languages supported
- Devices: iPhone only / iPad / Mac (Catalyst) / Vision

### Screenshots (the highest-leverage asset)
- Count (1-10 allowed)
- Order
- Style (text-overlay vs phone-only vs lifestyle)
- Hook (first screenshot copy and image)
- Localization (do they have different screenshots per region?)

### App Preview videos
- Count (0-3 allowed)
- Length
- Captions / no captions
- Hook (first 3 seconds)

### Ratings
- Total ratings count
- Average
- Recent trend (rising / falling)
- Featured reviews on listing

### What's New (release notes)
- Length
- Pattern (feature list / story / minimal)
- Frequency of updates

## Tools to use

| Tool | Free/Paid | What it gets you |
|---|---|---|
| App Store Connect (your own data) | Free | Your data only |
| AppFollow | $79/mo | Competitor keywords, ratings, reviews |
| SensorTower | $$$$ | Estimated downloads, revenue, keyword rank |
| Mobile Action | $99/mo | Cheaper SensorTower alternative |
| Manual web inspection | Free | Anything visible on apps.apple.com |

## Free method: scrape via apps.apple.com

```bash
npm install -g app-store-scraper
node -e "
const store = require('app-store-scraper');
store.app({ id: '1234567890' }).then(d => console.log(JSON.stringify(d, null, 2)));
"
```

Returns most listing fields except keywords (Apple hides those).

## Inferring their keywords

Apple's keyword field is hidden, but you can reverse-engineer:

1. Search likely keywords in App Store, see if competitor ranks #1-5
2. Read their description — keywords they use 2+ times are likely in the field
3. Check their app name + subtitle — these ARE keyword fields by Apple's algorithm
4. Check 1st-3rd screenshot text overlay — Apple indexes those

## Output template

```markdown
# ASO Teardown: [Competitor]

## Listing basics
- Name + subtitle: "MyApp - Track Your Habits Daily"
- Promotional text: "New: Streak save tokens..."
- Category: Health & Fitness > Habits
- Languages: 8 (en, es, fr, de, ja, ko, zh, pt)

## Screenshots (5 total, all phone-only with text overlay)
1. "TRACK ANY HABIT" + phone screen of dashboard
2. "BUILD STREAKS" + streak screen
3. "SHARE WITH FRIENDS" + social screen
4. "APPLE WATCH SYNC" + watch screen
5. Paywall preview

## App Preview videos: 0

## Ratings
- 47,832 ratings
- 4.6 avg, trending down from 4.8 (last 90d)
- Top featured review: "Best habit app I've used"

## Inferred keywords (high confidence)
- habit tracker
- streak
- daily habits
- routine tracker
- habit builder
- self improvement

## What's New
- Updates ~every 2 weeks
- Pattern: Bullet list of fixes + features
- Most recent: 4 lines, all bug fixes (slowing down)

## What I'd steal
- Subtitle pattern: "Track Your X Daily"
- Screenshot 1 hook style (action verb + screenshot)
- Apple Watch in screenshot 4

## What I'd avoid
- 5 screenshots is light, do 8-10
- 0 App Preview videos = leaving discovery on the table
- Promotional text doesn't sell, just announces

## My ASO plan based on this
- Use `aso-keywords` skill to bid on their keyword gaps
- Use `design-screenshots` for our 8-10 screenshots
- Use `custom-product-pages` to A/B test 3 hook variants
```

## Pair with
- `aso-keywords` to pick our keyword strategy
- `asa-to-aso` to use Apple Search Ads spend to find winning keywords
- `design-screenshots` to design our screenshots
- `custom-product-pages` for CPP variants
