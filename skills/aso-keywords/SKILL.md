---
name: "aso-keywords"
description: "Research and place keywords across App Store Name + Subtitle + Keywords field for max search ranking. Use when the user says 'ASO keywords', 'keyword research', 'App Store SEO', 'title and keywords'."
---

# ASO Keywords

Your entire search surface lives in **160 indexed characters per locale**: 30 (Name) + 30 (Subtitle) + 100 (Keywords field).

## Indexing rules
- **Don't repeat words** between Name/Subtitle/Keyword field — Apple deduplicates
- **Comma-separated, no spaces** in Keywords (`fitness,workout,health` not `fitness, workout, health`) — every space wasted
- **No hashtags, no plurals if singular present** — Apple stems both
- **Promotional Text** not indexed but editable any time (use for launches, sales)
- **Description** not indexed since 2017 (but converts; first 3 lines do 80%)
- **Screenshot caption text** indexed since mid-2025 (use real keywords)

## Free keyword research stack
- **Apple Search Ads keyword recommendations** — actual search volume from ASA dashboard (most underused free tool)
- **App Store autocomplete** — type seed word into App Store search, harvest dropdown. KeywordTool.io and AppTweak free suggester automate
- **RapidNative** — free, no signup, AI-suggested low-competition keywords
- **Reddit** — `site:reddit.com [your category]` reveals user language
- **X/Twitter search** — competitor complaints in user's exact phrases

## Paid tiers
| Tool | Entry price | Best for |
|---|---|---|
| AppFigures | $9.99/mo | Cheapest serious tool, real-time tracking |
| MobileAction Lite | $15/mo | Strong ASA insights |
| AppTweak | $69/mo | Best keyword volume accuracy + Atlas AI |
| Sensor Tower | Sales-only | Enterprise — skip for indies |

For solo founders: **AppFigures + free stack covers 90%**.

## Distribution example
Bad (repetition wastes slots):
```
Name: FitTrack: Fitness Workout Logger
Subtitle: Workout Tracker for Fitness Goals
Keywords: fitness,workout,tracker,gym
```
17 distinct terms? Actually 6 (heavy repetition).

Good:
```
Name: FitTrack: Workout Logger
Subtitle: Gym Plans & Meal Tracker
Keywords: fitness,nutrition,calorie,routine,strength,cardio,health,exercise
```
~13 distinct terms across 90 chars used.

## Reference
`../../docs/references/04-discovery-listing.md`
