---
name: "custom-store-listings"
description: "Use Play custom store listings (per-country variants) to localize positioning. Use when the user says 'custom store listing', 'per country listing play', 'localized listing play'."
---

# Custom Store Listings

Play's per-country listing variants (up to 50). Apple equivalent: CPP.

## Setup

Play Console → Store presence → Custom store listings → Create.

For each variant:
- Choose country/region (e.g., India)
- Choose keyword targeting (advanced; e.g., installs from "budget" keyword)
- Choose install state targeting (new install, returning user)
- Override: title, short desc, long desc, graphics, video

## When to use

- App localized to specific markets
- Different value props per market
- Brand variants (different name in different country)
- Promotional campaigns per region

## Example: India variant

Default (Global): "RupeeTrack - Budget App"
India variant: "RupeeTrack - UPI Budget for India"

Screenshots show:
- WhatsApp UPI integration (high signal in India)
- Local language UI
- Family expense splitting (common Indian use case)

## Common patterns

| Variant | When |
|---|---|
| Country-specific | App localized + market-specific positioning |
| Keyword-specific | Want to capture "habit tracker" search differently from "self improvement" |
| Returning-user | Different pitch for users who uninstalled (winback) |

## Limits

- 50 custom store listings max
- Each must have unique combo of (country, language, keyword, install state)
- Must be reviewed (3-7 day cycle per variant)

## Compare to Apple Custom Product Pages

| | Play CSL | Apple CPP |
|---|---|---|
| Targeting | Country/keyword/install state | Link-based |
| Per-link unique | No | Yes (each CPP has unique URL) |
| Count | 50 | 35 |
| Review time | 3-7 days | 24-48 hours |

## Pair with
- `localize-figs-j-android` for translation
- `play-listing-experiments` for variant testing
- `aso-keywords-play` for keyword targeting
