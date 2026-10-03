---
name: "command-build-onboarding"
description: "Plan, implement, and verify activation-first onboarding for an Expo iOS and Android app. Use when the user asks to build, redesign, fix, or instrument a first-run or personalized onboarding flow."
---

# Build activation-first onboarding

Use this as a host-agnostic implementation workflow. Adapt commands to the repository and preserve the app's existing architecture, visual system, analytics provider, and navigation patterns.

## Workflow contract

```yaml
description: "Build the shortest trustworthy path to a meaningful first result"
argument-hint: "<product outcome, existing flow, or target repository>"
```

## Workflow

1. Inspect the current onboarding route, navigation guard, persisted completion state, authentication, permissions, paywall, analytics, design tokens, and tests. Preserve unrelated worktree changes.
2. Read the exact Expo documentation for the installed SDK version before changing Expo code. Read current Apple and Android guidance for any permission or billing behavior being changed.
3. Use `design-onboarding-quiz` to define the activation event, meaningful result, shortest path, question-utility ledger, answer-to-experience mapping, gates, telemetry, and test matrix. A quiz is optional.
4. Write focused tests for the current or intended activation path before implementation. Cover fresh install, partial progress, resume, Back, Skip, reset, offline behavior, and already-completed users.
5. Implement a typed onboarding state machine with explicit step IDs rather than relying only on array position. Persist only the minimum state needed to resume safely and version persisted state so future flow changes can migrate or reset it deliberately.
6. Give each screen one primary action. Apply useful answers immediately, provide safe defaults for skipped optional inputs, and end with a real configured result plus a clear next core action.
7. Place account creation, system permissions, and payment at their moment of need. Add a benefit pre-prompt before system permission dialogs and preserve functional Back/Skip/close/restore behavior where required.
8. Add purposeful motion and haptics using the existing stack. Avoid fixed fake-processing delays and unnecessary dependencies. Respect reduced motion, text scaling, screen readers, contrast, safe areas, keyboard insets, and platform haptics settings.
9. Emit stable, low-cardinality analytics for step views/completions, meaningful-result views, activation, permission outcomes, abandonment, and elapsed time. Do not send answer text or sensitive values by default.
10. Verify focused tests, type checks, lint, and the complete path on both iOS and Android. Test small screens, large text, screen readers, reduced motion, interrupted processing, network failure, and Android system Back.
11. Report the activation contract, screen and state changes, platform differences, validation evidence, remaining assumptions, and any external build or release action that still requires authorization.

## Implementation rules

- Prefer the project's existing Expo Router, React Native, Zustand or other state solution, Reanimated, analytics, and test stack.
- Do not add `react-native-onboarding-swiper` or another onboarding framework by default. Add a package only when it reduces real complexity and is compatible with the installed Expo SDK.
- Do not hard-code a universal number of questions or screens.
- Do not use fabricated social proof, misleading progress, confirmshaming, false urgency, cosmetic personalization, or unsupported conversion claims.
- Do not force all users through a new flow after an app update unless product requirements explicitly justify it and migration behavior is tested.
- Keep analytics, permissions, account data, and purchase state within their appropriate privacy and security boundaries.

## Minimum acceptance checks

```text
[ ] Activation event and meaningful result are observable
[ ] Every required step contributes to that result or its safe delivery
[ ] Every retained answer changes the experience visibly
[ ] One primary action per screen
[ ] Optional inputs have truthful Skip behavior and useful defaults
[ ] Permission/account/payment timing has a documented reason
[ ] Completion lands on a useful result, not an empty dashboard
[ ] Resume, reset, migration, and existing-user behavior are tested
[ ] Reduced motion, large text, screen reader, and Android Back work
[ ] Analytics exclude free-form and sensitive answer values by default
[ ] iOS and Android activation paths have direct smoke-test evidence
```
