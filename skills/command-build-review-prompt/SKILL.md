---
name: "command-build-review-prompt"
description: "Coordinate the cross-platform /build-review-prompt workflow for Expo projects — implement a routed review-collection flow (satisfaction gate → store or feedback). Use when the user asks for this outcome."
---

# Command workflow: /build-review-prompt

Use this as a host-agnostic workflow. Adapt command names and capabilities to the active coding-agent host.

## Workflow contract

```yaml
description: "Build a routed review-collection flow: satisfaction gate → native store prompt (happy) or private feedback (unhappy)"
argument-hint: "<context>"
```

# /build-review-prompt

Build a review/rating collection system that protects the store rating by routing happy users to the native App Store / Google Play prompt and unhappy users to private feedback — so complaints become support tickets, not 1-star reviews.

## Workflow

1. Run `build-review-routing` to define the satisfaction gate, routing logic, timing triggers, cooldown rules, and the unhappy-path destination.
2. Confirm the review library choice for the project:
   - `expo-store-review` for Expo/managed apps (default).
   - `react-native-in-app-review` for bare RN.
   - Add `react-native-rate` only if an explicit Settings "Rate us" button with a store fallback is needed.
3. Implement the multi-condition gate (sessions ≥ 3 AND daysSinceInstall ≥ 7 AND success-event-just-happened AND cooldown ≥ 90d). Persist `installDate`, `sessions`, `lastAsked`, `satisfaction`, and `promptedStoreReview` in `expo-secure-store` (iOS) or encrypted storage (Android).
4. Build the satisfaction step as your own brand UI (3-point emoji or thumbs — one tap, dismissible, never the native dialog). Use neutral copy: "How are you enjoying AppName?" Not "Will you rate us 5 stars?"
5. Wire the happy path → `StoreReview.requestReview()` (iOS) / `launchReviewFlow()` (Android). Add the store write-review deep-link fallback for when the native prompt is unavailable or suppressed.
6. Wire the unhappy path → in-app feedback form, `mailto:` with prefilled diagnostics, or a support SDK (Intercom/Helpshift/Crisp/Sentry user-report). Never send the unhappy path to the store.
7. On Android, keep the satisfaction question a **standalone, separate moment** from the review card to respect Google's no-preconditioning rule. On iOS the inline ask-then-route pattern is fine.
8. Instrument the funnel via `instrument-growth-funnel`: `review_gate_shown`, `review_gate_answered`, `review_route_store_called`, `review_route_store_fallback`, `review_route_feedback_opened`, `review_cooldown_skipped`.
9. Add an explicit "Rate us" entry in Settings that deep-links to the store write-review page — never burns a system-prompt attempt on a button.
10. Write focused tests: gating logic (all conditions), each route, cooldown reset, version-bump re-arm, and offline feedback fallback.
11. Verify on both platforms: iOS (remember Apple may suppress; 3/365-day cap), Android (opaque quota; no display signal).

## Hard rules (non-negotiable)

- **Never incentivize reviews** (no "rate for coins/unlock/ads-off"). Banned by both stores; most common takedown cause.
- **Never mimic the native review dialog.** Your satisfaction step is brand UI only.
- **Never show "Thanks for rating!"** — neither API confirms a rating was left.
- **Never prompt on first launch, during onboarding, after a paywall rejection, or after an error.**
- **Never block features behind a review.**
- Keep "continue cancelling"-style graceful exits. No dark patterns.

## Minimum acceptance checks

```text
[ ] Satisfaction gate is your own UI, one-tap, dismissible
[ ] Happy path calls the native review API with a store deep-link fallback
[ ] Unhappy path routes to a private channel (form / mailto / support SDK)
[ ] Multi-condition gate enforced (sessions, days, success event, cooldown)
[ ] Cooldown persisted across sessions and app restarts
[ ] "Rate us" button deep-links to store, does not call requestReview()
[ ] Funnel events instrumented
[ ] No incentivized, preconditioned, or native-dialog-mimicking UI
[ ] iOS and Android both verified (with platform quota/suppression behavior understood)
```

## Pair with

- `build-review-routing` — the full technique reference.
- `instrument-growth-funnel`, `add-posthog-rn` — analytics.
- `mine-competitor-reviews` / `mine-play-reviews` — complementary review reading.
