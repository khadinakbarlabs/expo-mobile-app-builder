---
name: "command-build-review-prompt"
description: "Coordinate the cross-platform /build-review-prompt workflow for Expo projects: neutral milestone-based native review requests, shared cooldowns, and optional feedback for everyone. Use when implementing or correcting review prompts."
---

# Command workflow: /build-review-prompt

Use this host-agnostic workflow to implement native review requests without satisfaction gates or rating manipulation. Retain the existing command and skill names for compatibility.

## Workflow

1. Apply `build-review-routing` and its official Apple/Google references. Inspect the current app before changing code.
2. Define a usage milestone, a calm presentation point, a shared cooldown and acceptance behavior. Eligibility must not depend on sentiment, predicted stars, purchases, support history or survey answers.
3. Select the SDK-compatible `expo-store-review` integration, or preserve the existing native library when appropriate. Use the Expo reference shipped with this package and confirm platform support.
4. Remove custom pre-review satisfaction dialogs and any delayed filtering based on their answers. Keep optional feedback separate and available to everyone.
5. Persist request-attempt time, prevent duplicate requests and preserve cooldown across restarts and version changes. Request native UI only when supported; resume normally on suppression, failure or completion.
6. Add clearly labeled Settings entries for a user-initiated store link and optional feedback. Do not automatically redirect to the store when native UI fails or does not appear.
7. Instrument attempts, technical skips/errors and user-initiated link actions. Do not emit “review submitted,” infer stars, or thank users for rating from an API completion callback.
8. Write focused tests for eligibility independence, shared cooldown, concurrent triggers, unavailable APIs, failure behavior and feedback accessibility. Verify the integration on iOS and Android with appropriate builds and platform testing routes.

## Minimum acceptance checks

```text
[ ] No satisfaction question, sentiment filter or predicted-rating targeting
[ ] One documented usage milestone and cooldown applied to everyone
[ ] Cooldown persists across restart/version changes; duplicate attempts prevented
[ ] Platform review UI used without customization, overlay or interception
[ ] Suppression/errors/completion resume the ordinary app journey
[ ] No automatic store fallback or unsupported review-success claims
[ ] User-initiated store link and optional feedback available to everyone
[ ] No incentives, purchased reviews, required reviews or score pressure
[ ] Focused behavior checks and iOS/Android integration evidence recorded
```

## Handoff

Report the eligible milestone, cooldown policy, removed gating, verification results and any unverified platform behavior. Separate request attempts from confirmed store-side outcomes. Store submission and publication follow the user's external-action authority; this workflow does not grant it.

Pair with `build-review-routing`, `instrument-growth-funnel`, `mine-competitor-reviews` and `mine-play-reviews`.
