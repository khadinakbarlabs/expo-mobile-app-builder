---
name: "dissect-competitor-android-app"
description: "Deep teardown of a competitor Android app: install, screen-record onboarding, document every screen, identify aha moment, time-to-value, friction points, monetization pattern. Use when the user says 'tear down android app', 'analyze android competitor', 'how does their android onboarding work'."
---

# Dissect Competitor Android App

Same protocol as iOS `dissect-competitor-app`, with Android-specific captures.

## The 5-phase teardown

### Phase 1: Install + first impression (10 min)
1. Play Store: install via Play Store (not sideload)
2. Screen record from first tap (use scrcpy + obs, or built-in Android 11+ screen record)
3. Time to first value: cold install → first useful screen
4. Permission asks: which permissions, when, how framed

### Phase 2: Onboarding (30 min)
Document every screen + Android-specific:
- Notif permission timing (Android 13+ asks runtime)
- Account creation: Google Sign-In available? Email-only? Phone OTP?
- Quiz / wizard / sample-data / coachmarks?
- Linking patterns: deep links from web → app? Marketing → app?

### Phase 3: Core flow (1 hour)
- Top 3 actions taken
- Where got stuck
- Empty states
- Loading states (skeleton? spinner? edge-to-edge handling?)
- Material 3 compliance (or custom design language?)
- Dark mode quality
- Tablet/foldable behavior (if relevant)

### Phase 4: Monetization (30 min)
- When paywall appears
- Plans + pricing
- Trial structure (3/7/14 day)
- Restore visible? Cancel link visible?
- Play Billing flow (vs custom external — if external, are they enrolled in External Payments?)
- Use `competitor-paywall-analysis-android` for deep dive

### Phase 5: Engagement loops
- Notif cadence first 7 days
- In-app messages
- Email cadence
- Re-engagement after inactive

## Android-specific things to capture

- **Permissions stack** — which it asks, when, how (system dialog vs custom pre-prompt)
- **FCM push pattern** — how often, what content, deep-link to where
- **Material 3 dynamic colors** — does it respect user's theme?
- **Edge-to-edge** — full-screen content under nav bar?
- **Predictive back** — supports Android 14+ predictive back gesture?
- **Foreground service** — any persistent notif? What type?
- **Battery impact** — leave running overnight; check Settings → Battery
- **Dark mode** — fully themed or partial?
- **Foldable layout** — if you have a foldable, test outer + inner display
- **Tablet layout** — test on Pixel Tablet or similar

## Output

`research/competitors/[name]-android.md`:
- App store URL + package name
- Install count + rating + trend
- Onboarding screen-by-screen table
- Time to aha
- Monetization breakdown
- Material 3 score
- Permissions stack
- Battery / perf impact
- 5 things to steal
- 5 things to avoid

## Tools for capture
- scrcpy (mirror + record Android to Mac)
- Android Studio Layout Inspector (live UI debugging)
- Charles Proxy (network inspection)
- Apify "App Store Screenshot Downloader" (Play store assets in bulk)

## Pair with
- `mine-play-reviews` for the review side
- `competitor-paywall-analysis-android` for paywall depth
- `competitor-onboarding-teardown` for onboarding-specific
- `competitor-feature-matrix` to compare 10 competitors at once
