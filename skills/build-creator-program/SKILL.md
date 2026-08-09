---
name: "build-creator-program"
description: "Build a creator-led TikTok/Reels/Shorts marketing program — the Cal AI acquisition model (seed organic creators, repurpose top-performing organic content as paid Spark Ads). Use when the user says 'creator marketing', 'influencer program', 'TikTok growth', 'UGC program', 'Spark Ads', 'creator deals', or wants app growth via creators."
---

# Build a creator program (the Cal AI model)

The dominant validated indie growth engine of 2024–2026. Cal AI reached ~$50M ARR and ~15M downloads using creator marketing as its primary distribution — not paid ads, not press, not ASO alone. ([CNBC](https://www.cnbc.com/2025/09/06/cal-ai-how-a-teenage-ceo-built-a-fast-growing-calorie-tracking-app.html)) This is the distinct counterpart to the commission-based affiliate program in `build-affiliate-program`: that one pays for *referrals*; this one pays for *content*.

## The core model (what made Cal AI work)

1. **Seed with organic creator content.** Cal AI worked with ~150 creators who posted regularly on TikTok/Instagram. No hard sell, no "sponsored by Cal AI" reveal — creators just showed themselves scanning food in the first 15 seconds of normal content. Viewers flooded the comments asking "what app is that?" It felt like a friend's recommendation, not an ad.
2. **Identify which creator videos go viral organically.** The data, not gut, picks winners.
3. **Repurpose those top organic videos as paid Spark Ads (TikTok) / Meta ads.** The creative that already proved itself organically becomes the paid creative. This is the key insight — *don't commission ad creative; boost what already worked.*
4. **Let the algorithm find lookalikes of converters.** Scale what works; kill what doesn't.
5. **The product must be a 3-second value prop.** "Take photo → see calories." Perfect for short-form video. If the product can't be demoed in 3 seconds, this model struggles.

Cal AI spent ~$770K/month on ads/marketing at scale, but the ~$2,000 initial creator test sparked the whole engine.

## Why this beats traditional affiliate or paid ads

- **Trust.** A creator's audience trusts them; an ad is an ad.
- **Permanent backlinks.** Videos stay up and keep generating impressions for months/years.
- **Creative as a moat.** Paid social platforms reward *creative* above targeting; creators produce creative at a rate a brand team cannot.
- **Compound.** Pieter Levels: "I got a lot of press for AI startups. Press does almost nothing. One TikTok influencer post took PhotoAI MRR from $12K to $40–50K and it stayed there." ([bootstrapped founder writeup](https://thebootstrappedfounder.com/pieter-levels-the-indie-hackers-guide-to-ai-startups/))

## Performance-based creator deals (not vanity sponsorships)

The Cal AI insight: don't buy vanity sponsorships (flat fee for a post). Do **performance-based deals** where creators earn per install, per trial, or per paying user attributed to their content. This aligns incentives and makes the program measurable.

### Deal structures

| Structure | When | How to pay |
|---|---|---|
| **CPM / flat fee per video** | Seeding phase, unproven creators | Small fixed payment to lower their risk of making content |
| **CPI (cost per install)** | Once you can attribute installs to a creator | $1–4 per install (benchmarked against your paid CPI) |
| **CPA (cost per paying user)** | Best alignment; scale phase | $10–50 per trial-converted user (benchmark vs LTV) |
| **Revenue share** | Top creators, long-term | 15–30% of first-year subscription revenue they drive |

Start with a mix of small flat fees (to seed) + CPA (to reward performance). Move top performers to revenue share.

## Attribution (the hard part)

Creator marketing attribution is lossier than paid. Options, from cheapest to most rigorous:

1. **Promo code per creator** — "USE CODE SARAH20" — tracks redemptions in RevenueCat or your backend. Simple, lossy (not every install uses the code), but directly ties revenue to a creator. Works with Apple's Custom Product Pages per creator (see `custom-product-pages`).
2. **Spark Ads / Whitelisting** — the creator grants your ad account permission to boost their post. The ad platform then attributes installs to that boosted post deterministically. This is the cleanest attribution and the Cal AI loop.
3. **Branch.io / AppsFlyer** — MMP attribution with deferred deep links carrying a creator ID. More rigorous but costs money and lives in the iOS SKAdNetwork fog on iOS non-Apple-ads channels.
4. **DIY clipboard trick** — creator's landing page writes `CREATOR:sarah` to clipboard; app reads it on first launch via `expo-clipboard`. Free, lossy, requires clipboard consent on iOS 14+. See `build-affiliate-program`.

For Spark Ads, attribution is handled by the ad platform — that's why the "boost organic winners" model is so measurable.

## How to start (the first 30 days)

1. **Find 10–20 creators** in the niche with 10K–200K followers (micro-to-mid). Smaller creators convert better per dollar and are hungrier for deals. Use TikTok Creator Marketplace, manual outreach, or a creator-sourcing tool.
2. **Send a brief, not a script.** Tell them the 3-second demo and the one benefit. Let them make it native to their voice. Scripted creator content underperforms.
3. **Offer performance deals** (small flat fee + CPA). Be explicit that you'll boost the best performers.
4. **Track which content goes viral organically.** Watch comments for "what app is that?" — that's the signal.
5. **Boost the top 2–3 organic winners as Spark Ads** with a small daily budget ($50–100/day). Let the platform find lookalikes.
6. **Scale what hits your CPA target; kill what doesn't.**

## What not to do

- **Don't commission polished ad creative from creators.** UGC-style native content outperforms brand polish on TikTok/Reels by a wide margin.
- **Don't require a "sponsored by" reveal in the first 3 seconds** unless disclosure law requires it (FTC requires disclosure; #ad is usually enough; a jarring reveal kills the organic feel). Follow FTC and local disclosure rules.
- **Don't buy vanity sponsorships** with no performance component — you'll spend money and learn nothing.
- **Don't run creator marketing before your onboarding/paywall funnel is tested.** Paid amplifies whatever it touches; a leaky funnel just bleeds faster. Cal AI's funnel (87% paywall view → 57% transaction → 63% completion) is what made the spend work. See `design-onboarding-funnel` and `pricing-strategy`.
- **Don't rely on a single creator.** Diversify; creators churn, get banned, lose relevance.

## Pair with

- `build-affiliate-program` — the commission/referral counterpart (peer give-get + commission affiliates).
- `design-shareable-result-card` — organic sharing from existing users compounds with creator content.
- `custom-product-pages` — per-creator Apple CPPs for cleaner attribution.
- `run-paid-acquisition` — Spark Ads and Meta boosting are paid channels; this skill feeds their creative.
- `design-onboarding-funnel` — the funnel the creators' traffic lands in.
