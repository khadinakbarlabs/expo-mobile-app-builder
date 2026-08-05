---
name: "e2e-checklist"
description: "Pre-release smoke test checklist for an iOS RN app. Use when the user says 'pre-release checklist', 'smoke test', 'before submit', 'release checklist'."
---

# E2E Checklist

Pre-release smoke test before submitting to TestFlight or App Store.

## External action gate

This checklist prepares a release. TestFlight upload, App Store submission, phased-release activation, tester invites, and production monitoring integrations each require explicit owner confirmation of the account, build, and intended action.

## Code health
- [ ] `npm test` — all unit tests pass
- [ ] `npm run lint` — no errors
- [ ] `npx tsc --noEmit` — no TS errors
- [ ] No console.log in production code (search: `grep -r console.log src/`)
- [ ] Maestro smoke flow passes (critical user journey)

## App Store + TestFlight
- [ ] `MARKETING_VERSION` set (semver, e.g., 1.4.2)
- [ ] `CURRENT_PROJECT_VERSION` higher than last TestFlight upload (use EAS autoIncrement)
- [ ] Built with the SDK/Xcode version currently required by Apple
- [ ] Privacy Manifest present + accurate
- [ ] Privacy Policy URL valid in ASC AND in-app
- [ ] `NSUserTrackingUsageDescription` if using ATT
- [ ] All 3rd-party SDKs ship PrivacyInfo + signature
- [ ] Demo account credentials prepared for review notes

## Compliance
- [ ] Account deletion flow accessible (5.1.1(v))
- [ ] Restore Purchases on paywall AND Settings
- [ ] Paywall shows: exact price, billing freq, trial timeline, restore
- [ ] AI consent modal naming provider (5.1.2(i)) if 3rd-party AI
- [ ] Sign in with Apple offered if any 3rd-party social login (4.8)

## UX states (every screen)
- [ ] Happy path
- [ ] Empty state
- [ ] Loading state (skeleton, not spinner)
- [ ] Error state with retry
- [ ] No screens with placeholder text or TODO

## Accessibility
- [ ] VoiceOver: all interactive elements labeled
- [ ] Dynamic Type: tested at xSmall + Accessibility XXXL
- [ ] Touch targets: ≥ 44x44 pt everywhere
- [ ] Reduce Motion: tested with motion off
- [ ] Increase Contrast: tested with contrast on

## Performance
- [ ] Cold launch < 400ms on slowest target device
- [ ] Scroll 60fps on key screens
- [ ] No memory leaks visible in profiler
- [ ] App size reasonable (< 50MB initial download for utilities)

## Final
- [ ] Prepare the `eas submit` command and review notes; upload only after owner confirmation
- [ ] Prepare a phased-release plan; change availability only after owner confirmation
- [ ] Monitor Sentry/Crashlytics for first 24h
