---
name: "dissect-competitor-app"
description: "Deep teardown of a competitor iOS app: install, screen-record onboarding, document every screen, identify aha moment, time-to-value, friction points, monetization pattern. Use when the user says 'analyze competitor app', 'tear down their app', 'how does their onboarding work', 'why is competitor x successful', 'install and analyze'."
---

# Dissect Competitor App

Don't just look at the App Store page. Install the app, screen-record, document every screen, and extract the playbook.

## The teardown protocol (run for each competitor)

### Phase 1: Install + first impression (10 min)
1. Search App Store, install
2. Screen record from first tap
3. Note: how long until first value? (target: <30 sec)
4. Note: what they ask for upfront (email? phone? quiz? notif permission?)

### Phase 2: Onboarding (30 min)
Document every screen:
- Screen number, title, content
- What's asked (input, choice, permission)
- Skippable? Required?
- Pattern: linear quiz / sample-data / tutorial / deferred-config

Look for the "aha moment" — the first screen where the user gets actual value, not setup.

### Phase 3: Core flow (1 hour)
Use the app for an hour as a real user. Track:
- Top 3 actions taken
- Where you got stuck
- Where it surprised you (positively / negatively)
- Empty states (what do they show before any data exists?)
- Loading states (skeleton? spinner? fake progress?)

### Phase 4: Monetization (30 min)
- When does the paywall appear? (After how many actions?)
- What's gated? (Quotas, premium-only features, ads-vs-no-ads)
- Pricing tiers, trial offers, urgency tactics
- Use `competitor-paywall-analysis` for the deep dive

### Phase 5: Engagement loops (ongoing)
- Push notifs sent in first 7 days (count, content, timing)
- In-app messages
- Email cadence
- Re-engagement after 3-day inactive

## Output format

Structured markdown doc per competitor:

```markdown
# Competitor: [Name]
- App Store URL:
- Category:
- Estimated MRR (Sensor Tower / Appfigures):
- Main hook (App Store screenshot 1):

## Onboarding teardown
| # | Screen | Required? | Pattern |
|---|--------|-----------|---------|
| 1 | Welcome | - | Hero + CTA |
| 2 | Quiz Q1: "What's your goal?" | Yes | 3-option choice |
...

## Aha moment
Screen N — when user first sees [X] without setup overhead.

## Time to value
Cold install -> first value: 47 seconds (good)

## Paywall
- Triggers after action [X]
- Plans: $4.99/mo, $39.99/yr, $99 lifetime
- Trial: 7-day, capped at 3 messages
- Urgency: "Free 70% off ends in 24h"

## What they do well (steal these)
1. ...
2. ...

## What they do badly (avoid these)
1. ...
2. ...

## Reviews mining (separate doc)
See review-mining doc for [Name].
```

## Tools to record

- iOS built-in screen record (Control Center)
- macOS QuickTime: File -> New Movie Recording -> select connected iPhone
- Loom for narrated walkthroughs
- Figma to recreate flows after recording

## When to use
- Pre-MVP: dissect 5 direct competitors before scoping
- Mid-build: dissect 1 best-in-class for the screen you're building
- Pre-launch: redo the top 3 to verify your differentiation still holds
