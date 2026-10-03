---
name: "run-paid-acquisition"
description: "Run paid acquisition for a mobile app — Apple Search Ads (intent capture), TikTok Spark Ads (demand generation from creator content), and Meta Advantage+ app campaigns. Use when the user says 'Apple Search Ads', 'ASA', 'TikTok ads', 'Spark Ads', 'Meta app install ads', 'paid acquisition', 'paid CPI', 'app install campaign', or 'user acquisition'."
---

# Run paid acquisition

Paid acquisition accelerates whatever funnel it touches — a great funnel becomes cheaper per paying user, a leaky funnel just bleeds faster. Do not run paid until your onboarding/paywall funnel is tested (see `design-onboarding-funnel`, `pricing-strategy`, `instrument-growth-funnel`). Cal AI's paid spend worked because its funnel was already 87% paywall view → 57% transaction → 63% completion.

## The reframe: intent capture vs demand generation

| Channel | Role | Intent | Conversion |
|---|---|---|---|
| **Apple Search Ads** | Capture existing intent | Highest — users actively searching | ~56–66% ad-tap → download |
| **Google App campaigns** | Demand gen + Android scale | Medium | $1.50–4.50 CPI |
| **Meta (FB/IG) Advantage+** | Demand gen at scale | Lower | $2.00–5.50 CPI; Advantage+ cuts CPI 20–35% |
| **TikTok Spark Ads** | Demand gen, youngest audience | Lower | $1.75–4.00 CPI |

Apple Ads and social are **complements, not alternatives**. Apple Ads captures the ~65% of downloads that follow an App Store search; social generates new demand. ([mbadv.agency](https://www.mbadv.agency/apple-ads/apple-ads-vs-other-app-advertising-platforms))

## 2026 CPI benchmarks (vendor-attributed, directional)

| Channel | Avg CPI | Notes |
|---|---|---|
| Apple Ads (global) | ~$1.80 | Native unit is CPT (~$0.92 global / $1.91 US) |
| Google App campaigns | $1.50–4.50 | Fully automated, cross-OS |
| Meta (FB/IG) | $2.00–5.50 | Advantage+ cuts CPI 20–35% |
| TikTok | $1.75–4.00 | Youngest audience |
| iOS avg (all channels) | $2.52 | Android $1.29 |

Sources: AppTweak 2026, SplitMetrics 2025, Business of Apps.

## When paid is worth it

- You have a **tested paywall funnel** with known trial-to-paid (Cal AI's made the unit economics work).
- **Trial-to-paid > ~30%** so CAC per trial < LTV per converter.
- You can optimize for **"qualified trials"** (fires a few hours in, for users still active) rather than raw trial starts — quality > quantity. ([RevenueCat State of Subscription Apps](https://www.revenuecat.com/state-of-subscription-apps-2025/))
- You have **attribution** you trust. On iOS, only Apple Ads has deterministic attribution (AdServices API, no ATT prompt); every other channel lives in the SKAdNetwork/AdAttributionKit fog. Only **21% of iOS marketers are confident in their iOS attribution** (Kochava 2026).

**NOT worth it** if your onboarding/paywall is untested — paid just accelerates bleeding.

## Apple Search Ads

The single highest-intent channel: ~70% of App Store visitors use search; ~95% of ad-tap downloads occur within a minute; conversion at top of search is 60%+. ([mbadv.agency](https://www.mbadv.agency/apple-ads/apple-ads-vs-other-app-advertising-platforms))

- **Two tiers**: Basic (automated, CPI billing, max-CPI you set, $100 first-campaign credit) and Advanced (keyword control, CPT second-price auction, broad + exact match, Search Match automation).
- **Four placements**: Today tab, Search tab, Search results, product pages.
- **Deterministic AdServices attribution** — no ATT prompt, keyword-level data. The iOS attribution edge.
- **Custom Product Pages (CPP)** power ad variations per audience/keyword (Creative Sets retired). See `custom-product-pages`.

## TikTok Spark Ads (the Cal AI loop)

- **App Promotion** objective (automated placement/audience); interest/behavior + creative-led.
- **Spark Ads** = boost native creator posts as app-install ads. **This is the Cal AI model** — seed organic creator content, identify winners, boost them as Spark Ads. See `build-creator-program`.
- Largest under-30 audience of any ad platform.

## Meta Advantage+ app campaigns

- Broad Advantage+ targeting + custom audiences + 1–3% lookalikes off your highest-value cohorts (from RevenueCat/PostHog).
- **Vertical video, UGC-style creative** performs best (same creative principle as TikTok).
- Reported to cut CPI 20–35% vs manual.

## The paid + organic playbook (Cal AI's actual model)

1. Seed with **organic creator content** (~150 creators for Cal AI, no hard sell). See `build-creator-program`.
2. Identify which creator videos go viral organically.
3. **Repurpose those videos as paid Spark Ads / Meta ads** — the creative that proved itself organically becomes the paid creative.
4. Let the algorithm find lookalikes of converters.
5. Scale what hits your CPA target; kill what doesn't.

Sources: [CNBC Cal AI](https://www.cnbc.com/2025/09/06/cal-ai-how-a-teenage-ceo-built-a-fast-growing-calorie-tracking-app.html).

## SKAdNetwork / Privacy Sandbox (attribution reality)

**Apple SKAdNetwork (SKAN)** is the privacy-preserving paid-attribution path: cryptographic signatures verify ad-driven installs at the OS level; Apple sends a delayed, cohort-randomized postback with no device ID. SKAN 4.0: 4-digit hierarchical source IDs (up to 10,000 campaigns), 64 conversion values, 3-postback window system (0–2d install → 3–7d mid-funnel → 8–35d LTV). **Android equivalent: Privacy Sandbox / Attribution Reporting API** (the path away from GAID).

Because iOS attribution is foggy outside Apple Ads, **start paid on Apple Search Ads** (deterministic attribution) and expand to social once you have a baseline.

## Measure (CAC vs LTV)

```text
spend                  {channel, campaign}
impressions / taps / installs
trial_started_attributed   {channel}    // the unit you optimize toward
qualified_trial            // fires hours in, for users still active — quality metric
trial_converted_attributed
CAC = spend / paying_user_acquired
LTV (per cohort)                       // from RevenueCat
CAC:LTV ratio                          // target < 0.33 (payback < 1/3 of LTV) for healthy paid
```

The health metric is **CAC:LTV** — if you pay more to acquire a user than they're worth, you have a leaky bucket, not a growth engine. Track by channel and by cohort.

## What not to do

- **Don't run paid before the funnel is tested.** Paid accelerates bleeding on a leaky funnel.
- **Don't optimize for raw installs** — optimize for qualified trials or paying users.
- **Don't trust iOS attribution** on non-Apple-Ads channels without understanding SKAdNetwork's limitations.
- **Don't run cold brand creative on TikTok/Meta** — UGC-style native creative wins.
- **Don't scale a campaign past your CAC:LTV target.** Kill what doesn't hit, scale what does.
- **Don't run paid without retention data** — high-churn cohorts acquired by paid can be worth less than they cost even at a low CPI.

## Pair with

- `instrument-growth-funnel` — CAC/LTV and funnel measurement paid depends on.
- `build-creator-program` — feeds Spark Ads creative (the Cal AI loop).
- `design-onboarding-funnel`, `pricing-strategy` — the funnel paid traffic lands in.
- `custom-product-pages`, `asa-to-aso` — Apple Ads + ASO interlock.
- `integrate-revenuecat-rn` — LTV and subscription attribution.
