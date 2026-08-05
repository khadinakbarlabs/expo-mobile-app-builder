---
name: "mine-competitor-reviews"
description: "Pull App Store reviews for competitor apps, categorize complaints (love/hate/bug/feature-request) and extract gold for your positioning. Use when the user says 'mine reviews', 'analyze app store reviews', 'what do users hate about competitor', 'review research', 'extract user pain'."
---

# Mine Competitor Reviews

Reviews are free user research. Pull, categorize, and extract.

## Why this matters
- 1-2 star reviews list features people will pay you to have
- 4-5 star reviews tell you what to copy
- Recent (last 90 days) reviews show what's broken NOW
- Negative reviews on big apps = your wedge

## Sources

| Source | Coverage | How to pull |
|---|---|---|
| App Store (US) | Largest market | appfollow.io, sensortower (paid); or scrape via app-store-scraper npm |
| App Store (other) | Localized pain | Same tools, set country |
| Reddit | Unfiltered honesty | reddit.com search "[app] sucks", "[app] alternative" |
| Twitter/X | Real-time complaints | x.com search "[app] broken", "[app] doesn't" |
| Trustpilot | If they have web app | trustpilot.com |
| Reddit r/[Subreddit] | Niche complaints | r/iphone, r/apps, niche-specific subs |

## The free way (no paid tools)

```bash
# Install
npm install -g app-store-scraper

# Pull reviews (Node REPL)
node -e "
const store = require('app-store-scraper');
store.reviews({
  appId: '1234567890',
  country: 'us',
  sort: store.sort.RECENT,
  page: 1
}).then(reviews => console.log(JSON.stringify(reviews, null, 2)));
"
```

Loop pages 1-10 to get ~500 recent reviews.

## Categorization framework

For each review, tag with one or more:

- **LOVE** — what they're praising (feature, vibe, savings)
- **HATE** — what they want fixed (bugs, missing features, pricing complaints)
- **BUG** — specific reproducible issues
- **FEATURE-REQUEST** — explicit asks
- **PRICING-COMPLAINT** — "too expensive", "removed free tier", "subscription trap"
- **CHURN-REASON** — "switched to X", "uninstalled because Y"

## Pattern extraction

After tagging 500 reviews, group by frequency:

```
Top 10 LOVE patterns:
1. "Works offline" - 47 mentions
2. "Clean UI" - 39 mentions
3. ...

Top 10 HATE patterns:
1. "Subscription trap, can't cancel" - 89 mentions
2. "App crashes on iOS 18" - 56 mentions
3. "Too many ads" - 41 mentions
4. ...

Top 10 FEATURE REQUESTS:
1. "Apple Watch app" - 34 mentions
2. "Family sharing" - 28 mentions
...
```

## How to use this gold

1. **HATE patterns -> your differentiation** ("X but you can cancel from inside the app")
2. **FEATURE REQUESTS -> your roadmap shortcuts** (build the top 3 missing features)
3. **PRICING COMPLAINTS -> your pricing strategy** (be cheaper / different model)
4. **CHURN REASONS -> your acquisition channel** (ad-targeting their unhappy users)

## Output template

Save as `research/competitor-reviews/[name].md`:

```markdown
# Reviews: [Competitor]
- Reviews analyzed: 500 (recent 90 days)
- Avg rating: 4.2 -> trending DOWN from 4.6 last year
- Top hate (% of negative): subscription trap (47%)

## Top 5 features users beg for
1. Apple Watch app
2. ...

## Top 5 broken things RIGHT NOW
1. Crash on iOS 18.2 (43 mentions in last 30d)
2. ...

## Quotes to use in our App Store copy
- "Finally an app that doesn't ..."
```

## Apify alternative
If the user needs scale, use the existing Apify actor for App Store reviews — saves manual scraping.
