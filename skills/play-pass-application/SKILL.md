---
name: "play-pass-application"
description: "Apply to Google Play Pass (Google's app subscription bundle). Use when the user says 'play pass android', 'google play pass', 'apply to play pass'."
---

# Play Pass Application

Google's subscription bundle ($5/mo for users → access to bundled apps + games). Approved devs share revenue pool.

## Eligibility (rough)
- Premium app or subscription IAP
- High quality (Vitals + ratings)
- Established user base
- Multiple platforms preferred

Most indie apps don't qualify in year 1. Apply once you have:
- 100k+ installs
- 4.3+ rating
- Active development (regular updates)

## Apply
playpassapply.google.com → form → review (4-6 weeks).

## Revenue model
- Users pay Google $4.99/mo (US)
- Pool divided among Play Pass apps based on time spent in your app
- Typically $0.01-0.05 per active user per day
- Less than direct subscription but higher reach

## Trade-offs

| Pro | Con |
|---|---|
| Free for end users → lower friction install | Lower per-user revenue |
| Bundled with games + apps | Less control over pricing |
| Less marketing burden | Algorithm-driven payouts |
| Higher install velocity | Multi-app users dilute payout |

## When to apply
- Year 2+ of app
- After hitting 100k installs
- After app is feature-stable (avoid breaking changes that hurt Pass users)

## When not to
- New app (under 12 months)
- High-margin subscription where direct pricing >> Pass payout
- B2B/enterprise app

## Pair with
- `pricing-strategy-android`
- `plan-launch-android` (Pass is post-launch growth)
