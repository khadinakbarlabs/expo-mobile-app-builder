---
name: "competitor-paywall-analysis"
description: "Screenshot competitor paywalls, decode their offer, pricing, copy, urgency tactics, and trial structure. Use when the user says 'analyze paywall', 'how do competitors price', 'paywall research', 'screenshot paywalls', 'pricing intel'."
---

# Competitor Paywall Analysis

Paywalls are the highest-leverage screen in the app. Steal the best, avoid the worst.

## What to capture for each competitor

### Screenshot
Get the FULL paywall screen. If it has multiple steps (e.g., trial timeline -> plans -> confirm), screenshot each.

### Document the offer

| Field | Value |
|---|---|
| Trigger | After what action does paywall appear? |
| Plans offered | Weekly/monthly/yearly/lifetime |
| Default highlighted plan | Which is pre-selected? |
| Anchor pricing | Highest price shown to make others look cheap |
| Trial length | 3/7/14 days |
| Trial structure | Free trial -> charge OR paid trial $0.99 -> $X |
| Urgency tactic | Countdown? Limited time? Discount expires? |
| Social proof | "Used by 1M+", testimonials, ratings |
| Guarantee | Money-back? Satisfaction? |

### Document the copy

- Headline (the big text at top)
- Sub-headline
- Feature bullet list (what's included)
- Trial timeline visual ("Day 1: Free... Day 7: Charged $X")
- Restore/cancel link visibility (compliance)
- CTA button copy

## Pattern library to look for

### High-converting patterns
- **Trial timeline** (Cal AI style): visual showing "today: free, day 5: reminder, day 7: charged"
- **Anchor + highlight**: weekly $9.99, yearly $59.99 (highlighted as "BEST VALUE, save 88%")
- **Social proof above fold**: "2.3M happy users", App Store rating badge
- **Specific outcome**: "Save 5kg in 30 days" beats "Get fit"

### Anti-patterns (avoid)
- No restore button visible (Apple rejects)
- Cancel hidden 6 taps deep
- Urgency timer that doesn't actually expire
- "Limited offer" that's always there
- Auto-charging trial without clear preview

## Output format

```markdown
# Paywall: [Competitor Name]
[screenshot.png]

## The offer
- Trigger: After 3rd workout logged
- Plans:
  - Weekly $9.99 (anchor)
  - Yearly $59.99 (default, "save 88%")
- Trial: 7-day free, full refund window
- Visual: Timeline (Day 1 -> Day 5 reminder -> Day 7 charge)

## Copy
- Headline: "Unlock unlimited workouts"
- Sub: "Join 2.3M users transforming their bodies"
- Bullets:
  - Unlimited custom workouts
  - AI form coach
  - Apple Watch sync
  - No ads
- CTA: "Start 7-Day Free Trial"

## Patterns they use
- [x] Anchor + highlight
- [x] Social proof
- [x] Trial timeline
- [x] Restore visible
- [x] Cancel link visible
- [x] Apple Sign In to skip account creation

## What I'd steal
- Trial timeline visual
- Specific outcome subhead

## What I'd skip
- The "save 88%" math is sketchy ($9.99/wk = $519/yr, $59.99 isn't 88% off real demand)
```

## Where to apply
- Use `design-paywall` skill to mock up your version
- Use `revenuecat-paywall-builder` to ship it via Paywalls v2
- A/B test your version against theirs via Superwall (`superwall-rn`)
