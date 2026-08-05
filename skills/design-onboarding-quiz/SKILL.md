---
name: "design-onboarding-quiz"
description: "Design Cal AI-style multi-step quiz onboarding (8-15 questions to personalized paywall). Use when the user says 'design onboarding', 'quiz onboarding', 'Cal AI pattern', 'onboarding flow'."
---

# Design Onboarding Quiz

Cal AI ran 61 paywall experiments and grew MRR 3x in 10 months with this pattern.

## Why it works
- Personalization makes user feel seen
- Sunk-cost commitment (12 questions answered = invested)
- Segmentation data for analytics
- Anchors them for the price by surfacing depth of problem

## 7-step flow
1. **Welcome / Promise** — single dream-outcome sentence + Continue
2. **Identity question** — "What's your goal?" 3-4 options. Segments + personalizes.
3. **Pain point question** — "What's stopped you before?" Acknowledges past failures, builds empathy.
4. **Aspiration question** — "Where do you want to be in 6 months?" Visualizes the win.
5. **(more 5-12 questions if appropriate)**
6. **Personalization output** — animated transition: "Building your plan..." (engineered 2-3s delay)
7. **Social proof** — "47,000 people like you started this week" + 3 testimonials
8. **Paywall** — references quiz answers ("Your personalized plan to [their answer]")

## Code skeleton (Expo Router + Zustand)
```tsx
// state/onboarding.ts
export const useOnboarding = create<{
  step: number;
  answers: Record<string, string>;
  next: () => void;
  setAnswer: (key: string, value: string) => void;
}>((set) => ({
  step: 0,
  answers: {},
  next: () => set((s) => ({ step: s.step + 1 })),
  setAnswer: (key, value) => set((s) => ({ answers: { ...s.answers, [key]: value } })),
}));

// app/(onboarding)/[step].tsx
const STEPS = [WelcomeStep, GoalStep, PainStep, AspirationStep, PersonalizingStep, SocialStep, PaywallStep];
```

## Animated personalization
```tsx
import Animated, { withTiming, useSharedValue, useAnimatedStyle } from 'react-native-reanimated';

const progress = useSharedValue(0);
useEffect(() => { progress.value = withTiming(1, { duration: 2500 }); }, []);
```

## Apple compliance
- Don't gate functional content behind login (5.1.1 reject)
- No fake progress bars implying payment processed (2.3.1)
- No "skip → reduced version" with hidden free tier
- Restore button reachable from paywall

## Post-close 24h discount
Critical pattern: show discounted annual offer banner when user dismisses paywall. Recovers 10-20% of bouncers.

## Reference
`references/03-monetization.md`
