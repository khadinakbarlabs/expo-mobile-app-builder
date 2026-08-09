---
name: "design-retention-loop"
description: "Design the habit-forming retention loop that moves D1/D7/D30 retention — the Hook Model, streaks, investments, daily-use triggers. Use when the user says 'retention', 'D1 retention', 'habit-forming', 'streaks', 'stickiness', 'keep users coming back', 'DAU/MAU', or wants to stop the >90%-churn-by-day-30 problem."
---

# Design a retention loop

Retention is the substrate every other growth tactic depends on. You cannot buy, share, or onboarding-funnel your way around a product that loses >90% of users in 30 days. Most apps do. This skill designs the loop that keeps users coming back.

## The brutal benchmarks (know where you stand)

| Day | Good | Average | Poor |
|---|---|---|---|
| **D1** | 30–40%+ | 20–28% | <15% |
| **D7** | 15–20%+ | 10–14% | <7% |
| **D30** | 7–10%+ | 4–6% | <3% |

iOS retention > Android across categories. **Organic users retain 2–3× better than paid installs.** ([AppsFlyer](https://www.appsflyer.com/blog/mobile-marketing/app-onboarding), [Business of Apps](https://www.businessofapps.com/data/app-retention-rates/))

Subscription-specific churn (RevenueCat 2025): **~30% of annual subscriptions cancel in the first month.** Low-priced annual plans retain 36% after a year; high-priced monthly plans retain only 6.7%. RevenueCat's CEO: "Retention starts on day one."

**The shape**: steep early drop-off (most loss in first few days) → flattens after the first week → users past D7 are far more likely to be active at D30. The first 72 hours are the whole game.

## The Hook Model (the four-phase loop)

Nir Eyal's framework — the mechanism behind Duolingo, Instagram, TikTok, Cal AI:

1. **Trigger** — external (push, email, in-app nudge) or internal (emotion, routine, time of day) cue to act. Design both.
2. **Action** — the simplest behavior in anticipation of reward (open the app, tap). Make it as low-friction as possible.
3. **Variable Reward** — the reward must be **unpredictable**. Three types: *tribe* (social validation), *hunt* (search/discovery), *self* (achievement/mastery). Predictable rewards don't form habits; variable ones do.
4. **Investment** — the user stores value (streaks, data, content, followers, history) that loads the next trigger and raises switching cost. This is the retention moat.

The loop tightens with each cycle: investments → stronger internal triggers → more actions → more rewards → more investments.

## Implementation patterns

### Streaks (the strongest single retention lever)

Duolingo's streak is the canonical example. Requirements:
- A clear, daily, binary "did you do the core action?" definition.
- Visible streak counter with loss aversion ("Don't lose your 47-day streak!").
- A "streak freeze" / grace mechanism so one missed day doesn't kill weeks of progress (otherwise users rage-quit permanently after breaking a long streak).
- A re-engagement push the morning the streak is at risk.

```tsx
// minimal streak state
type Streak = { count: number; lastActiveDate: string; freezesAvailable: number };
// on core action completion:
// if (today - lastActiveDate === 1 day) count++
// if (today - lastActiveDate === 0) {} // already counted today
// if (today - lastActiveDate > 1 day) use a freeze or reset to 0
```

### Investments (raise switching cost)

Things the user builds over time that they'd lose by leaving: progress history, saved plans, personalized data, followers, achievements, a library. Every session should leave the user with slightly more stored value than they came in with. AI apps can make the *plan itself* the investment — a personalized plan generated in onboarding that improves with use.

### Variable rewards

- *Tribe*: leaderboards, social feed, shared challenges, comments.
- *Hunt*: discovery feeds, randomized daily content, "surprise" unlocks.
- *Self*: XP, levels, badges, milestones, personal records.

Don't make every reward predictable. A daily "reward of the day" that varies keeps the loop tight.

### The D1 hook

D1 is set almost entirely by onboarding. If the user doesn't have a reason to come back tomorrow before they close the app today, they won't. Build the D1 trigger *into* the first session: schedule the first notification, establish the streak, set up tomorrow's task. See `design-onboarding-funnel` / `design-onboarding-quiz` and `design-push-strategy`.

## Critical windows and interventions

- **First session** → sets D1. The single highest-impact retention investment is a first session that ends with a clear reason to return.
- **First 72 hours** → steepest drop-off. Session frequency here is the strongest predictor of D30. New-user lifecycle messaging (see `design-lifecycle-messaging`) targets this window.
- **D7** → the curve flattens. Users past D7 are the core.
- **At-risk signal**: a daily user goes silent for 10 days. Fire a win-back (see `build-win-back-flow`).

## The retention that push *reveals*, not creates

A blunt truth surfaced in research: "Push notifications don't create retention. They reveal whether retention already exists. If users only come back because you ping them, you don't have retention." ([r/expo](https://www.reddit.com/r/expo/comments/1q6m6gr/over_90_of_app_users_churn_in_the_first_30_days/)) Push is a trigger in the Hook Model; it cannot substitute for variable rewards and investments. Build the loop first, then use push to fire it. See `design-push-strategy`.

## Measure retention correctly

**Cohort-based, never blended.** Group users by install date (and by acquisition source — paid vs organic behave differently; never blend). Track each cohort's D1/D7/D30 independently. A strong cohort 6 months ago can mask a deteriorating new-cohort experience if you only look at blended DAU.

```text
// per cohort:
install_date
d1_active   d7_active   d30_active   d90_active
trial_started   trial_converted   // subscription retention separately
stickiness = DAU/MAU   // target >20% for habit apps
```

RevenueCat provides subscription retention curves by cohort out of the box. PostHog (see `add-posthog-rn`) handles event-based retention for free users.

## Pair with

- `design-push-strategy` — the trigger channel.
- `design-lifecycle-messaging` — cross-channel first-72-hours and win-back cadence.
- `build-win-back-flow` — the lapsed-user recovery mechanic.
- `build-cancellation-flow` — the active-churn interception.
- `instrument-growth-funnel` — cohort retention measurement.
- `design-onboarding-funnel` / `design-onboarding-quiz` — D1 starts here.
