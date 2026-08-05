---
name: "generate-privacy-policy-android"
description: "Generate Privacy Policy that satisfies Play Data Safety + GDPR + CCPA. Use when the user says 'privacy policy android', 'play privacy policy', 'data safety policy'."
---

# Generate Privacy Policy (Android)

Required for Play submission. Must match Data Safety form declarations exactly.

(See iOS plugin's `generate-privacy-policy` for full template.)

## Android-specific additions

### SDK list must include
- Google Sign-In (if used) — Personal info: name, email
- Firebase Crashlytics — Diagnostics, device info
- FCM — Device ID, push token
- Google Play Billing — Purchase info via Play
- Google Play Services — Device + identifier info (auto-bundled with Android)

### Data Safety form alignment

If form says "collects email" → policy MUST mention email collection.
If form says "doesn't collect location" → no location-related text.

Mismatch = Play rejection.

## Required Android sections

- Account deletion: in-app + web URL (must match `account-deletion-flow-android` setup)
- Children's privacy (Family Designed for Family programs)
- Targeted advertising opt-out (if you do ads)
- Data sharing with Google (Crashlytics → Google retention)

## Where to host
- Public URL on marketing site
- Linked in Play Console → Store presence → App content → Privacy policy
- Linked in app Settings → About

## Tools
Same as iOS: Termly, iubenda, or custom. iubenda has Play Data Safety integration.

## Pair with
- `data-safety-form` (must match)
- `account-deletion-flow-android`
- iOS plugin's `generate-privacy-policy`
