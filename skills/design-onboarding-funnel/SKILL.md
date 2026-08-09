---
name: "design-onboarding-funnel"
description: "Design onboarding as a conversion sales funnel (the Cal AI / Jake Castillo pattern) — the deliberate alternative to activation-first onboarding. Use when the user says 'high-converting onboarding', 'sales funnel onboarding', 'quiz onboarding', 'personalization onboarding', 'Cal AI style onboarding', or wants to maximize trial-start and trial-to-paid conversion."
---

# Design onboarding as a sales funnel

This is the **conversion-maximizing** onboarding archetype. It is the deliberate counterpart to `design-onboarding-quiz` (the activation-first, shortest-path, honest-default skill). Read both, then choose the posture that fits the product. Do not assume one is universally correct.

## The core insight that separates the two archetypes

The activation-first default (the sibling skill) treats onboarding as **friction to remove** — get the user to a meaningful result as fast as possible. This skill treats onboarding as a **sales funnel to build** — walk the user through the problem, make them feel it, prove the app fixes it, and only then ask for money. The conversion data is unambiguous about which wins for paid, single-purpose consumer apps:

> "A longer onboarding gives you room to actually walk someone through the problem your app solves. You get to name the pain, make them sit in it, and show them exactly how the app fixes it. By the time they reach the paywall, they're not being asked to take a chance on you — they already believe they need it. Yes, the longer flow meant fewer people actually reached that paywall, but a much higher percentage of them converted. And that outweighed everyone who dropped off getting there."
> — Jake Castillo (ran Cal AI growth), [LinkedIn](https://www.linkedin.com/posts/jake-castillo_everyone-building-an-app-is-told-to-keep-activity-7482932355305721856-WPQy), [X playbook](https://x.com/jakecastilloooo/article/2080670471394091502)

Cal AI's result: **$50M ARR in ~2 years**, 123 paywall experiments, 61 on them on the onboarding paywall alone, +31% trial-to-paid over 12 months. ([Superwall case study](https://superwall.com/case-studies/cal-ai))

**82% of trial starts happen on Day 0** — the onboarding window *is* the entire monetization funnel for most users. ([RevenueCat State of Subscription Apps 2025](https://www.revenuecat.com/state-of-subscription-apps-2025/))

## Choose the posture deliberately

| Signal | Activation-first (`design-onboarding-quiz`) | Sales funnel (this skill) |
|---|---|---|
| Business model | Free, freemium, or organic-growth app | Paid / subscription / hard-paywall consumer app |
| Time-to-value | Value in <60s | Value compounds with use (habit, behavior change) |
| Acquisition | Organic, word-of-mouth | Paid acquisition, creator marketing |
| Risk tolerance | Reputation-sensitive, wants no dark-pattern accusations | Accepts psychological levers in exchange for conversion |
| User expectation | Utility, tool | Personalized outcome (health, fitness, finance, learning) |

Both are legitimate. The mistake is shipping the activation-first default into a paid consumer app and wondering why trial-start sits at 2%.

## The six-job screen architecture

Every screen in a high-converting funnel does exactly one of six jobs. Most top-grossing consumer apps use 8–15 screens covering these in sequence:

1. **Brand / value proposition** — one-line promise + visual demo of the outcome. "Understand your food in a snap." Not a feature list.
2. **Segmentation** — "What's your goal?" / "What brings you here?" Personalizes the rest and starts effort investment.
3. **Trust / credibility** — social proof, ratings, testimonials, press logos, "as seen in." Reduces risk perception before the ask.
4. **Pain amplification** — name the problem, make the user feel it. "How often do you give up tracking after 3 days?" This is the step the activation-first skill avoids; it is the core of the sales-funnel archetype.
5. **Activation / personalization** — a real or simulated first result. The "Building your plan…" animation. Gets the user to the aha moment, or a convincing preview of it.
6. **Monetization / retention setup** — the paywall, plus notification opt-in and streak/habit framing that sets up D1 retention.

## The psychological levers (use truthfully)

These are the conversion drivers the activation-first default explicitly avoids. In the sales-funnel archetype they are tools, not tricks. The line between the two is **truthfulness** — every lever must describe real value the app actually delivers.

- **Effort investment / IKEA effect.** Each question the user answers raises their sunk cost. Cal AI added "Why do you want to lose weight?" and "How will your life improve?" — the answers changed nothing in the product, but users who answered them converted better because they had invested. ([Fiorillo analysis](https://www.linkedin.com/posts/fiorillo_a-19-year-old-built-a-calorie-tracking-app-activity-7436430436131778560-2TxN)) This is ethically defensible only if the questions also genuinely improve personalization; collecting answers that change nothing and then using them only for sunk-cost is the line into manipulation.
- **Personalization-as-mirror.** Reflect the user's answers back to them on later screens. "Your goal: build muscle in 12 weeks." Converts better than generic copy and is truthful because the answers shaped the plan.
- **Progress momentum.** A progress bar that fills, a "Building your plan…" animation, a loading state with rotating benefits. Creates anticipation and a sense of inevitability before the paywall.
- **Anchor before ask.** Show the annual price as "just $0.77/week" beside the monthly $9.99. The annual looks like the obvious choice. See `pricing-strategy`.
- **Social proof at the paywall.** "47,000 meals logged this week." "Join 2M people." Use only real numbers. Fabricated social proof is a rejection trigger and a lie.
- **The post-close discount.** When the user dismisses the paywall, show a 24-hour discounted annual offer banner. Recovers an estimated 10–20% of bouncers. ([mobile-studio:design-onboarding-quiz](https://github.com/khadinakbarlabs/expo-mobile-app-builder))

## The quiz pattern

A personalization quiz is the workhorse of this archetype. Typical structure (8–15 steps):

```text
1.  Goal selection        "What's your main goal?"        (segmentation)
2.  Current state         "How often do you [core action]?" (segmentation + pain)
3.  Pain point            "What's stopped you before?"    (pain amplification)
4.  Aspiration            "How would success feel?"       (effort investment)
5.  Specifics             2–4 product-shaping questions   (real personalization)
6.  Trust                 ratings / testimonials          (credibility)
7.  Building…             animation + rotating benefits   (progress momentum)
8.  Personalized result   the plan / preview              (activation)
9.  Paywall               anchored pricing + social proof (monetization)
10. Notification opt-in   "Remind you to stay on track?"  (retention setup)
```

Questions 5 must genuinely shape the product. Questions 1–4 and the aspiration questions are the "investment" layer — keep them, but be honest with yourself about which answers change the experience and which exist only for conversion psychology. A truthful funnel uses investment questions that *also* personalize.

## Anti-rejection rules (non-negotiable)

The sales-funnel archetype uses more psychological pressure, which raises App Review risk. These are hard rules, not preferences:

- **No fabricated social proof.** "Join 2M users" requires 2M users. Use real counts or omit.
- **No fake countdown timers** ("Offer expires in 14:59!") unless the offer genuinely expires. Apple rejects artificial urgency.
- **No confirmshaming.** "No thanks, I don't want to reach my goals" is a dark pattern. The dismiss button says "No thanks" or "Maybe later."
- **No toggle paywalls.** Apple rejects "free trial toggle" patterns as confusing/misleading (enforced since the April 2026 Cal AI crackdown). Use the visual trial timeline. See `paywall-compliance` and `design-paywall`.
- **Paywall compliance is separate and mandatory.** Run `paywall-compliance` after this skill. The funnel gets the user *to* the paywall; the paywall must still show exact price, billing frequency, trial length, auto-renewal disclosure, restore, and Terms/Privacy.
- **Permission timing still matters.** Reddit-validated: Apple rejects custom pre-permission screens whose CTA copy "encourages" the permission ("Allow", "Enable"). Use neutral CTAs ("Continue"). Ask for permissions contextually at the feature that needs them, not bundled in onboarding. ([r/iOSProgramming](https://www.reddit.com/r/iOSProgramming/comments/1t57gda/app_rejected_because_my_microphone_permission/))

## Differentiation warning (existential for generated apps)

Apple's 2025 Guideline 4.3 (spam) and 4.2.6 (commercialized templates) crackdown specifically targets AI-generated and templated apps. A sales-funnel onboarding built on a generic template is **more** likely to be flagged as spam, not less. Differentiate the product genuinely — unique branding, a real proprietary outcome, and onboarding content that reflects actual product value. A polished funnel on a cookie-cutter app is a 4.3 rejection waiting to happen. See `pre-submission-audit`.

## Measure the funnel (not just completion)

Onboarding-completion rate is the wrong north star for this archetype. A longer funnel will have *lower* completion but *higher* conversion. Measure the full path:

```text
onboarding_started
onboarding_step_viewed      {step_id, step_index, job: brand|segmentation|trust|pain|activation|monetization}
onboarding_step_completed   {step_id, step_index}
onboarding_abandoned        {last_step_id, last_job}
paywall_viewed              {placement}
trial_started               {plan, trial_length}
trial_converted             {plan}
d1_return                   (the retention-setup job exists to move this)
```

The success metric is **trial_started rate and trial_converted rate**, not completion. A change that drops completion from 60% to 40% but lifts trial-start from 8% to 18% is a win. Cal AI's data: 87% of new users reach a paywall; 57% start a transaction; 63% complete. ([Superwall](https://superwall.com/case-studies/cal-ai))

RevenueCat 2025 medians to beat: trial-start **6.2% median / 20.3% p90**; hard-paywall download-to-paid **12.11% median**.

## Produce these artifacts

1. The posture decision (why sales-funnel fits this product, or a documented hybrid).
2. The six-job screen map with each screen's job, copy hook, and psychological lever.
3. The question-utility ledger — which answers genuinely personalize vs which are investment-only (be honest).
4. The truthful-copy spec — real numbers, real outcomes, no fabricated urgency or social proof.
5. The paywall handoff — where monetization lands, with `design-paywall` and `paywall-compliance` as follow-on.
6. The retention-setup step — notification priming and streak framing that sets up D1.
7. The analytics plan above and a falsifiable experiment with a guardrail (watch D1 retention — if it collapses, the funnel is over-pressuring).

## Pair with

- `design-onboarding-quiz` — the activation-first alternative; read both before choosing.
- `pricing-strategy`, `design-paywall`, `paywall-compliance` — the monetization handoff.
- `instrument-growth-funnel` — measuring the funnel.
- `set-up-ab-testing` — Cal AI ran 5 real experiments/month; this archetype assumes ongoing testing.
