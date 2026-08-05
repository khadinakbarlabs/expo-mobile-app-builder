---
name: "e2e-checklist-android"
description: "The list of E2E flows every Android app should test before submission. Use when the user says 'e2e checklist android', 'what to test android', 'ship checklist tests'."
---

# E2E Checklist (Android)

The flows every app should test before Play submission.

## Tier 1: Critical (blocks ship)

- [ ] Cold launch → home screen (no crash)
- [ ] Sign in (Google + email/magic link)
- [ ] Sign out
- [ ] Account deletion (Play required)
- [ ] Onboarding completion
- [ ] Paywall purchase (sandbox)
- [ ] Restore purchase
- [ ] Push notification permission flow
- [ ] Main JTBD flow (the core user action)
- [ ] Network failure handling
- [ ] Settings → privacy policy link works
- [ ] Settings → terms link works

## Tier 2: Important

- [ ] Background → foreground (state preserved)
- [ ] Keyboard appearance + dismiss
- [ ] Form validation + error states
- [ ] Empty states (no data yet)
- [ ] Loading states (skeleton vs spinner)
- [ ] Modal dismissal (back gesture + button)
- [ ] Deep link open (cold + warm)
- [ ] Notification tap → deep link
- [ ] Pull-to-refresh
- [ ] Infinite scroll pagination
- [ ] Image upload (camera + gallery)

## Tier 3: Polish

- [ ] Predictive back gesture (Android 14+)
- [ ] Edge-to-edge layout (Android 15+)
- [ ] Dark mode toggle
- [ ] Dynamic colors (Material You)
- [ ] Tablet layout (Pixel Tablet test)
- [ ] Foldable layout (Pixel Fold test)
- [ ] Rotation (portrait ↔ landscape)
- [ ] Slow network (3G emulation)
- [ ] Low storage (handle disk full)
- [ ] Battery saver mode (verify functionality)

## Tier 4: Device coverage

Test on emulators:
- [ ] Pixel 8 API 35 (current target)
- [ ] Pixel 7a API 34 (one back)
- [ ] Pixel 4a API 30 (minSdk floor)
- [ ] Pixel Tablet API 35
- [ ] Pixel Fold API 35

Real device (at minimum):
- [ ] Samsung (most-used Android in target markets)
- [ ] Xiaomi/Oppo (if targeting India/SEA)

## Translate to flows

Each Tier 1 + 2 item = one Maestro flow:
```
flows/
  smoke-cold-launch.yaml
  smoke-signin-google.yaml
  smoke-signout.yaml
  smoke-delete-account.yaml
  smoke-onboarding.yaml
  smoke-paywall-purchase.yaml
  smoke-restore-purchase.yaml
  smoke-notif-permission.yaml
  smoke-core-jtbd.yaml
  ...
```

Run all in CI:
```bash
maestro test flows/
```

## Pair with
- `set-up-maestro-android` for the framework
- `pre-submission-audit-play` for full pre-ship audit
