---
name: "build-review-routing"
description: "Build neutral, milestone-based native App Store and Google Play review requests with optional feedback available to everyone. Use for review prompts, rating requests, review routing, or replacing satisfaction gates with a policy-aligned flow."
---

# Native reviews and optional feedback

Choose a calm moment after the user has experienced enough of the product to give useful feedback. Make review eligibility independent of satisfaction, predicted rating, purchase status, support history, or survey answers. The existing skill name is retained for compatibility; it does not authorize sentiment routing.

## Product contract

```text
A documented usage milestone + a shared cooldown
  → request the platform's native review flow
  → resume the normal app experience

Settings → Review this app → user-initiated store link
Settings → Send feedback → optional feedback/support for everyone
```

A completed task or level can be a usage milestone. Do not infer approval from task completion. Apply the same eligibility and cooldown rules to everyone; do not use earlier sentiment answers to filter users or delay their access to reviews. Keep feedback independent of the review journey and available regardless of rating, sentiment, or whether a review request was attempted.

## Platform rules and references

Checked against official guidance on 2026-10-03; recheck before release.

- Apple requires its provided review API and disallows custom review prompts. Its discovery-fraud rule prohibits manipulation of reviews. Use native UI rather than a custom satisfaction question or rating modal. [App Review Guidelines 5.6.1 and 5.6.3](https://developer.apple.com/app-store/review/guidelines/)
- Google prohibits opinion or predictive-rating questions before or during the review UI. Present its card without overlays or modification. A delayed call based on an earlier sentiment answer is still sentiment filtering; this workflow rejects it. [Google Play In-App Reviews guidance](https://developer.android.com/guide/playcore/in-app-review)
- Google flow completion confirms neither display of the dialog nor submission of a review. Continue the ordinary journey after completion, including on errors. [Google integration guidance](https://developer.android.com/guide/playcore/in-app-review/kotlin-java)

## Implementation workflow

1. Inspect existing prompts, stored satisfaction scores, user segmentation, analytics and store links. Remove their connection to review eligibility, including delayed or remote-config filtering.
2. Use the project's Expo SDK reference and the SDK-compatible `expo-store-review` library for Expo projects, or the existing native integration for bare React Native. Verify current availability and platform behavior instead of assuming development shells reproduce production behavior.
3. Define a neutral milestone, an app-owned cooldown and a safe presentation moment. Avoid interrupting onboarding, active input, critical actions or error recovery for any user. Document that the cooldown is an app UX choice, not a guarantee of platform quota availability.
4. Persist the time of a request attempt and prevent duplicate concurrent requests. Apply the cooldown across restarts and ordinary version changes. A version bump or a support resolution must not bypass it.
5. Check capability, then request the native flow. If unavailable, suppressed or unsuccessful, continue normally. Do not automatically open the store, retry repeatedly or show an error to force a rating.
6. Offer a clearly labeled, user-initiated store link in Settings alongside feedback/support. Validate configured public store identifiers and handle link failures gracefully; do not hard-code example account identifiers as production defaults.
7. Keep feedback optional. Let users review any diagnostic details before sending; do not attach credentials, personal data or logs automatically. If sending fails, preserve the draft and explain how to retry.

## Hard rules

- No sentiment gates, predicted-star targeting, selective invitation or review suppression.
- No incentives, purchased/fake reviews, pressure for a particular score, or features locked behind reviews.
- No custom imitation of the native rating card, overlays or programmatic dismissal.
- No claim that a review was displayed or posted because the request resolved. Do not display “Thanks for rating” based on an API callback.
- Optional feedback must not replace or hide public review access for dissatisfied users.

## Measurement and acceptance

Measure only observable actions: `review_request_attempted`, `review_request_skipped` with a technical/cooldown reason, `review_request_failed`, `review_store_link_opened`, and `feedback_opened`. Never interpret these as a posted review or a rating conversion. Keep review text, inferred sentiment and individual store ratings out of eligibility logic.

Write focused behavior checks when implementing this flow:

- Identical usage/cooldown inputs produce identical eligibility despite different feedback, support history or purchase status.
- Cooldown survives restart/version changes; concurrent triggers produce one attempt.
- Unsupported APIs, suppression and request errors leave the main user journey usable without an automatic store redirect.
- Completion produces no “review posted” event or thank-you claim.
- Settings review and feedback links remain accessible to everyone; feedback failure retains the draft.

Verify integration on both platforms using their supported testing routes. Record the build and observed behavior separately; an API call or test stub does not prove a public review was submitted.

Pair with `instrument-growth-funnel`, `mine-competitor-reviews` and `mine-play-reviews` for measurement and research.
