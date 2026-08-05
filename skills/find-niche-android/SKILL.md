---
name: "find-niche-android"
description: "Find a profitable, underserved Play Store niche. Identify gaps using install vs rating analysis, category density, and demand-supply mismatches. Use when the user says 'find android niche', 'play store opportunity', 'gap analysis android', 'underserved category', 'what app to build'."
---

# Find Niche on Play Store

Play Store niche-finding playbook tuned to Android economics.

## The triple-axis filter

A profitable niche has:
1. **Demand:** keyword search volume + install velocity in top 10 apps
2. **Weakness:** top apps have <4.3 stars OR top app is >3 years stale
3. **Buildability:** RN+Expo can build the core in <30 days

## Where to look

### Inside Play Store
- Top Charts → Categories → look for stale leaders (last update >6 months = opportunity)
- Search Play Store with long-tail keywords → see if results are weak
- "Editor's Choice" sections — niches with no editor pick = opportunity for editorial submission

### Outside Play Store
- AppTweak Top Charts (free tier) — see install spikes
- Mobile Action Market Intelligence
- AppFollow (free tier) — review volume + rating trends
- Reddit subreddit lists (r/AndroidApps weekly threads)
- Producthunt monthly Android section

## The "install vs rating mismatch" technique

Find apps with:
- 1M+ installs (proven demand)
- <4.0 stars (proven weakness)
- Reviews mentioning specific feature requests or breakage

Each = a wedge for a new entrant.

```
Example: Top "Habit Tracker" app
- Installs: 5M+
- Rating: 3.9 (was 4.6 last year)
- Top complaints: "subscription auto-renews after uninstall", "no Apple Watch... wait, Android"
- Recent reviews: "switched to X"
- Opportunity: build same category, fix specific complaints, differentiate
```

## Android-specific niches that work

- **Productivity for India/SEA** — UPI integration, Hindi support, low-data mode
- **Side-hustle tools** — receipt scanners, invoice gen for gig workers (Brazil, India)
- **Local-language education** — Hindi/Urdu/Bengali learning + utility tools
- **WhatsApp companion tools** — anything that complements WhatsApp (status savers, schedulers)
- **Privacy-first** — Android users more privacy-aware than iOS in some markets
- **Old-Android compat** — apps that work on Android 8+, target ~3B users who can't run latest

## Scoring matrix

| Factor | Weight |
|---|---|
| Search volume in top kw | 25% |
| Top app rating <4.3 | 20% |
| Buildability (Expo possible?) | 20% |
| Personal fit (you understand user) | 15% |
| Monetization fit (subs work in market) | 10% |
| Distribution channel exists | 10% |

Score each candidate niche 1-5. Pursue only if total >18/30.

## Output
`research/niche-candidates.md` — 3-5 ranked niche candidates with scoring and 1-line wedge for each.

## Pair with
- `research-competitors-play` to validate competitor density
- `mine-play-reviews` for pain mining
- `validate-app-idea-android` for go/no-go after niche pick
