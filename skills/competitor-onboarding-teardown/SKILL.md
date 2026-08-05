---
name: "competitor-onboarding-teardown"
description: "Tear down a competitor's onboarding flow: questions asked, friction points, time-to-value, aha moment timing, permission asks. Use when the user says 'analyze onboarding', 'how do they onboard', 'first run experience', 'onboarding teardown', 'cal ai style quiz'."
---

# Competitor Onboarding Teardown

Onboarding is where 60-80% of installs churn. Steal the best.

## The teardown sheet

For each competitor, document EVERY screen from cold install to first value:

| # | Screen | Type | Required | Asks for | Pattern | Notes |
|---|--------|------|----------|----------|---------|-------|
| 1 | Splash | Launch | - | - | Logo | 1 sec |
| 2 | Welcome | Hero | - | - | Big headline + CTA | "Get Started" |
| 3 | Quiz Q1: Goal | Choice | Yes | "What's your goal?" | 3-option | Sets up personalization |
| 4 | Quiz Q2: Experience | Choice | Yes | Beginner/Inter/Adv | 3-option |  |
| ... | ... | ... | ... | ... | ... | ... |
| 12 | Notif permission | System | Skippable | Push notif perm | Pre-prompt | Custom screen explaining WHY first |
| 13 | Account creation | Auth | Required | Email + pw | Apple Sign In option | Skip = no app access |
| 14 | First value screen | Output | - | - | Personalized plan | <-- AHA MOMENT |

## What to measure

- **Total screens count** (less = better, target <8 before aha)
- **Time to aha** (cold tap -> first value, target <60 sec)
- **Skippable %** (how many screens can user skip)
- **Required asks** (what's truly mandatory before value)
- **Permission ordering** (custom pre-prompt before system dialog?)
- **Auth timing** (do they delay account creation until value seen?)

## Patterns to look for

### Pattern A: The Cal AI Quiz (current best practice)
- 8-15 personalization questions
- Each Q justifies the next, builds investment
- Final screen: personalized plan + paywall
- Conversion: 8-15% from install to paid

### Pattern B: Sample Data + Defer Setup (Linear-style)
- Show app with fake data immediately
- Hide config behind a "Customize" CTA later
- Aha = "oh I see what this looks like"
- Conversion: lower paid, higher activation

### Pattern C: Single Action First (TikTok-style)
- One screen, one action ("Watch this video")
- Build habit before asking anything
- Auth deferred to point of friction
- Conversion: highest D7 retention

### Pattern D: Tutorial Coachmarks (avoid)
- Step-by-step tooltips on first launch
- Users tap-skip 80% of the time
- Modern apps don't use this anymore

## Document the personalization

If quiz-based, note:
- How many questions?
- What do they DO with the answers? (cosmetic? actually personalized? fake personalization?)
- Is the final "your plan" screen ACTUALLY different per user, or template?

## Output template

```markdown
# Onboarding: [Competitor]
- Pattern: Cal AI Quiz
- Total screens: 12
- Time to aha: 73 sec (slow)
- Required asks: email, goal selection
- Permissions: notif (with custom pre-prompt screen)

## Screen-by-screen
[full table]

## Personalization depth
Real - 7 quiz answers feed into output plan.

## What they do well
- Custom pre-prompt before notif permission (smart)
- Apple Sign In as default auth (low friction)
- Quiz progress bar (commitment device)

## What's broken
- 12 screens is too long
- Account creation BEFORE plan reveal kills 30%+ I bet
- Email is required (should be Apple Sign In only)

## What to steal for our app
- Quiz personalization model
- Custom pre-prompt for notifs

## What to do differently
- 6-8 questions max (not 12)
- Show plan BEFORE asking for account
- No email — Apple Sign In only
```

## Pair with
- `design-onboarding-quiz` to design our version
- `dissect-competitor-app` for full app teardown
- `mine-competitor-reviews` to find their onboarding complaints
