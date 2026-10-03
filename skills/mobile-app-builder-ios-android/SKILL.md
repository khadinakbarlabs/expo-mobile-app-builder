---
name: "mobile-app-builder-ios-android"
description: "Research, plan, design, build, test, monetize, grow, and prepare production-ready mobile apps for iOS and Android with Expo SDK 54 and React Native. Use for end-to-end professional app development, cross-platform features, release readiness, ASO, retention, growth analytics, and paid acquisition planning without exposing credentials or spending money."
---

# Build a mobile app for iOS and Android

Guide a mobile product from idea to a tested Expo and React Native implementation. Preserve iOS and Android parity unless a capability is intentionally platform-specific. Keep external actions within the user's explicit authorization; authorization already given for the same action persists through the session.

## Start from your current situation

Users can describe their goal in ordinary language without naming agents or skills. Select the smallest useful path and state the next concrete action.

- **New idea or research-first request:** inspect any existing evidence, then research the audience, problem, market/locale and competitors. Return an opportunity brief and uncertainties before choosing features or scaffolding. Move into positioning, design and one working slice only when that direction is usable.
- **Already-built app:** inspect repository guidance, actual stack/version, current changes and the affected flow. Preserve product direction and working features. Start with the requested fix, design improvement, feature, audit, launch or growth task; do not scaffold a replacement or automatically repeat full discovery. Apply Expo guidance only to a compatible Expo app and name tooling gaps for other frameworks.
- **Focused result:** use a single relevant workflow for research, UI/UX, development, QA, store assets, influencer/ad intelligence or website SEO. A full agency cycle is optional.

Read available context before asking for it again. Ask only the critical short question that affects the next step and continue independent preparation. Keep the first deliverable and progress messages in plain language, with technical detail only where useful. Preserve the user's cost/account/publication authorization across stages.

## Agency routing and engineering ownership

For a coordinated product request, use `mobile-app-agency` when installed. It supplies eight departments, sixteen specialist roles, stage gates, a task ownership protocol and structured handoffs. Use `apify-mobile-research` for Actor-backed research, `mobile-design-references` for principles and inspiration, and `mobile-store-asset-production` for real screenshot capture and metadata production. If a specialist skill is unavailable, complete that stage sequentially with a compact evidence-based handoff instead of claiming an agent or tool ran.

Before changes to an existing app, use `engineering-workflow-guard` when installed. Inspect existing work, respect the user's branch policy, assign one writer per file and record verification separately from remote integration or installed-binary proof. Delegate only when the user asks or applicable host instructions permit it.

For growth intelligence, use optional installed `mobile-store-intelligence` (Apple/Play), `mobile-influencer-intelligence` (TikTok/Instagram/YouTube), `mobile-ad-intelligence` (TikTok/Meta/Google), and `mobile-seo-intelligence` (app website search). Each supplies its own collection and evidence procedure; inspect live portfolio Actors before authorized paid runs.

## Professional capability routing

Classify the request before loading specialist context:

1. **Discovery and research** — niche, competitors, reviews, demand, and evidence quality.
2. **Product strategy** — audience, positioning, MVP, requirements, pricing, and roadmap.
3. **Experience design** — journeys, onboarding, accessibility, design system, and platform conventions.
4. **Expo engineering** — architecture, implementation, native integrations, data, and offline behavior.
5. **Quality and security** — tests, performance, privacy, security, and release audits.
6. **Monetization** — subscriptions, paywalls, entitlements, cancellation, and win-back.
7. **Organic growth** — ASO, referrals, viral loops, creators, reviews, and lifecycle messaging.
8. **Paid acquisition** — Apple Ads, Google App campaigns, Meta app campaigns, and TikTok Spark Ads.
9. **Analytics and experimentation** — activation, retention, revenue, cohorts, attribution, and A/B tests.
10. **Store launch** — EAS, TestFlight, Google Play, metadata, privacy, and review readiness.
11. **Post-launch operations** — monitoring, feedback, retention, releases, and continuous optimization.

Use only the categories needed for the current outcome. A complete app request may span all eleven; a focused engineering task should not silently expand into marketing or account actions.

## Workflow

1. Clarify the target users, core outcome, smallest useful release, observable activation event, meaningful first result, offline or backend needs, monetization, and platform-specific features.
2. Inspect the existing repository before proposing changes. Before writing Expo code, read the exact [Expo SDK 54 documentation](https://docs.expo.dev/versions/v54.0.0/) relevant to the requested capability.
3. Produce a compact product and architecture plan covering navigation, state, data, accessibility, security, testing, onboarding-to-activation, and an explicit iOS/Android parity matrix. When first-run experience is in scope, choose the posture deliberately: `design-onboarding-quiz` (activation-first / honest default) for free/freemium/organic apps, or `design-onboarding-funnel` (sales-funnel archetype, Cal AI pattern) for paid consumer subscription apps; do not assume onboarding must be a quiz.
4. For growth, retention, monetization, and virality work, route to the matching skill: `pricing-strategy` / `design-paywall` / `command-build-paywall` (monetization); `design-onboarding-funnel` (conversion onboarding); `build-review-routing` / `command-build-review-prompt` (neutral milestone-based review prompts with a separate optional feedback channel); `design-shareable-result-card` / `design-viral-loop` / `build-creator-program` (virality); `design-retention-loop` / `build-win-back-flow` / `build-cancellation-flow` / `design-lifecycle-messaging` / `design-push-strategy` (retention); `instrument-growth-funnel` / `set-up-ab-testing` (measurement and experimentation); `run-paid-acquisition` (Apple Ads, Google App campaigns, TikTok Spark Ads, and Meta app campaigns); `asa-to-aso` / `asa-to-aso-android` (turning paid-search evidence into organic listing improvements). Prefer `add-posthog-rn` for privacy-safe analytics when its data contract fits the app.
5. Use TypeScript and Expo Router when they fit the app. Add dependencies with `npm exec --no -- expo install` when Expo compatibility matters, and introduce native code only when the product requirement justifies it.
6. Implement the smallest complete vertical slice from entry to a meaningful user result first. Include loading, empty, error, offline, accessibility, resume, and platform behavior instead of treating them as later polish.
7. Validate with linting, type checks, focused tests, and both iOS and Android smoke tests. For onboarding, verify the activation path, Back/Skip/resume behavior, permissions at point of need, reduced motion, and meaningful-result handoff. Distinguish source validation from evidence observed in simulators, emulators, devices, or provider dashboards.
8. Keep Expo, Apple, Google, Firebase, RevenueCat, Supabase, and other credentials out of source, prompts, logs, screenshots, fixtures, and generated examples. Use provider-approved secret management.
9. Prepare EAS, App Store, and Google Play configuration only after local quality gates pass. Require explicit authorization before builds, uploads, store submissions, publication or spend; do not request it again when the same action is already authorized in this session.

## Output

Return the product scope, architecture, screen and data flow, implementation changes, platform parity notes, validation evidence, and clearly separated release steps that still require user authorization.
