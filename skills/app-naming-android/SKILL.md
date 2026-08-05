---
name: "app-naming-android"
description: "Pick an Android app name with trademark + package-name (irreversible!) strategy. Use when the user says 'name android app', 'package name android', 'irreversible android name'."
---

# App Naming (Android)

Two names. One is irreversible.

## Two names

1. **App name** (Play listing, 30 chars) — changeable anytime
2. **Package name** (com.yourcompany.appname) — IRREVERSIBLE

Once published with `com.foo.bar`, you cannot change it. Forever.

## Package name rules

- Reverse domain pattern (com.yourcompany.appname)
- Lowercase, no spaces
- Don't use "android", "google" (trademark)
- Don't use "test", "tmp" (the user's first habit-app got published as com.example.app — STUCK)
- Avoid generic names that competitors can clone

Good: `com.example.rupeetrack`
Bad: `com.example.budget` (generic, sets bad precedent)

## App name (changeable)

- 30 chars Play title + 30 chars subtitle
- Trademark check via USPTO TESS + WIPO Global Brand Database before committing
- Avoid Google trademarks: "Android", "Play", "Pixel", "Wear", "Google"
- Avoid Apple trademarks: "iOS", "iPhone", "iPad"

## Trademark search workflow

1. USPTO TESS (US trademark)
2. WIPO Global Brand Database
3. Domain availability (yourapp.com) — check Namecheap
4. Twitter/X handle availability
5. GitHub org name
6. Play Store search (existing app with same name)
7. App Store search (iOS conflict)

Block before committing to brand.

## Name patterns that work

- Compound: "RupeeTrack" (rupee + track)
- Made-up: "Notion", "Calm" (made-up words rank well in ASO long-term)
- Descriptive: "Budget for India" (good ASO short-term, weak brand)
- Foreign: "Habito" (memorable, distinctive)

## Avoid

- Generic words: "Budget", "Tasks", "Notes" (trademark + search both bad)
- Hyphens (worse search)
- Numbers (forgettable)
- Punctuation other than letters (some don't index)

## Pair with
- `position-pitch-android` for tagline alignment
- `aso-keywords-play` for SEO
- Trademark search BEFORE finalizing
