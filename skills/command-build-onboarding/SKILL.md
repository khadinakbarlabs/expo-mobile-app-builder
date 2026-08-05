---
name: "command-build-onboarding"
description: "Coordinate the cross-platform /build-onboarding workflow for Expo projects. Use when the user asks for this outcome."
---

# Command workflow: /build-onboarding

Use this as a host-agnostic workflow. Adapt command names and capabilities to the active coding-agent host.

## Workflow contract

```yaml
description: "Build a Cal AI-style quiz onboarding flow that personalizes the paywall"
argument-hint: "<context>"
```

# /build-onboarding

Build the 8-15 step quiz onboarding flow proven to 3x MRR (Cal AI pattern).

## Workflow

1. Run `design-onboarding-quiz` skill to plan question sequence.
2. Generate `<OnboardingFlow />` with screens for: welcome, identity, pain, aspiration, personalizing animation, social proof, paywall.
3. Use `react-native-onboarding-swiper` or custom Reanimated implementation.
4. Personalize the paywall headline using quiz answers.
5. Add post-close 24-hour discounted annual offer banner.
6. Wire `expo-tracking-transparency` if attribution needed (rare).
7. Add analytics events at every step (TelemetryDeck or PostHog).
