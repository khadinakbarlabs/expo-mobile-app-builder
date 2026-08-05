---
name: "aso-keywords-play"
description: "Optimize Play Store ASO using title + short description (80 chars INDEXED) + long description (4000 chars NLP-indexed). Use when the user says 'play store aso', 'android aso keywords', 'play store seo'."
---

# Play Store ASO Keywords

Play has no separate "keyword" field. Entire listing is indexed.

## Fields and their weight

| Field | Chars | Index weight |
|---|---|---|
| App name + subtitle | 30 + 30 | Highest |
| Short description | 80 | Very high (indexed for search) |
| Long description | 4000 | High (NLP-indexed for semantic) |
| App category | - | Medium |
| Developer name | - | Low |
| Screenshots | - | NOT OCR-indexed (unlike Apple) |

## Strategy

### App name + subtitle
Fit primary keyword in title. Example: "RupeeTrack - UPI Budget App"
- Primary: "rupee track"
- Secondary: "UPI budget"

### Short description (80 chars)
The MOST important field for ranking. Should contain:
- 2-3 primary keywords naturally woven
- Action verb
- Specific outcome

Example: "Auto-track every UPI payment. Budget on autopilot for Indian students."

Keywords: "track", "UPI", "payment", "budget", "Indian students"

### Long description (4000 chars)
- Repeat primary keywords 3-5 times naturally
- Include long-tail variants
- Use customer language (from `mine-play-reviews`)
- Bullet feature list
- Social proof (download count, ratings)

Structure:
1. Hook paragraph (problem framing, customer language)
2. Solution overview
3. Feature bullets (each =keyword variant)
4. Use cases (where to fit niche keywords)
5. Social proof
6. CTA + community

## Keyword research

### Free
- Google search "best [keyword] app" — see what comes up
- Play Store search → autocomplete (Google's search index)
- Reddit subreddit search

### Paid
- AppTweak Play Keywords
- Mobile Action
- Sensor Tower

### Free DIY
```bash
# Use Apify keyword scraper
# Or Apify "Play Store Search Scraper" actor
```

## Common gotchas

- Keyword stuffing → algorithmic penalty
- Generic title ("Budget App") → no brand search
- Different keywords per language (don't translate, localize)
- Forgetting to update after launch — review every 6 weeks

## Test

After 4 weeks of any change, check rankings in AppTweak. If didn't move, iterate copy.

## Pair with
- `position-pitch-android` (positioning informs keyword)
- `localize-figs-j-android` (per-locale keywords)
- `play-listing-experiments` (A/B test variants)
