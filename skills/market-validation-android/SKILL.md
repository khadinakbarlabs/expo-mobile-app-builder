---
name: "market-validation-android"
description: "Validate market size and willingness to pay for an Android app idea. Use when the user says 'validate market', 'tam sam som android', 'market sizing android', 'willingness to pay android'."
---

# Market Validation (Android)

Quick-and-dirty market sizing before committing 3 months to build.

## The 30-minute estimate

### Step 1: TAM (top-down)
Play Store category install count. Example:
- "Habit Tracker" → ~50M cumulative installs across top 50 apps
- That's your TAM upper bound

### Step 2: SAM (Serviceable)
What fraction speak your supported languages + are in your target countries?
- Top 50 install spread: India 30%, US 15%, Brazil 10%, rest 45%
- If you ship en+hi+pt → SAM = 55% of TAM

### Step 3: SOM (Reachable in 12 months)
- New indie app realistic ceiling: 0.5-2% of SAM in year 1
- 50M × 55% × 1% = 275k installs (year 1, ambitious)

### Step 4: Revenue
- Conversion rate: 2-5% trial → paid (depends on category)
- ARPU: $20-80/yr depending on price point
- 275k × 3% × $40 = $330k MRR upper bound (very aggressive)

### Reality check
- Indie first-year Android apps hit $1k-30k MRR most commonly
- Top 1% indie hit $100k+ MRR
- $0/yr is most common outcome — gate this with `validate-app-idea-android`

## Willingness to pay signals

### Strong signals (proceed)
- Competitors have $5-15/mo subscription tier with reviews praising value
- Reddit users discuss "I'd pay $X for [feature]"
- B2B/prosumer use case (higher per-user revenue, less price sensitivity)
- Existing paid apps with 100k+ paying users in category

### Weak signals (caution)
- Top apps are 100% free + ad-supported
- Reviews complain about ANY subscription
- Category dominated by emerging market users with low purchasing power
- Free + freemium dominate; no paid version above $1.99 in top 50

### Pivot to ads if
- Category is ad-friendly (utility, content, casual gaming)
- Users use daily (high impression volume)
- AdMob/AdSense eCPM in your geo is >$2

## The willingness-to-pay test

Before building, run:
1. Landing page with "Get notified when launched" + price ($X/mo)
2. Drive 100 visits via Reddit / TikTok / IndieHackers
3. Conversion rate >5% → strong demand signal
4. Conversion rate <2% → weak demand, consider pivot

## Output

`research/market-validation.md`:
- TAM/SAM/SOM estimate with sources
- Top 5 paying competitors + their pricing
- Reddit/landing page signal
- Decision: GO / NO-GO / PIVOT

## Pair with
- `validate-app-idea-android` for broader go/no-go
- `pricing-strategy-android` for price decisions
