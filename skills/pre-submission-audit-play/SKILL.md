---
name: "pre-submission-audit-play"
description: "Run the complete pre-submission audit for Google Play before uploading. Use when the user says 'pre submission play', 'audit before play submit', 'is my android app ready'."
---

# Pre-Submission Audit (Play)

The 50-point checklist before AAB upload.

## Tier 1: Will reject if missing

- [ ] App targets API 35+ (Android 15)
- [ ] minSdk reasonable (24 = Android 7, indie sweet spot)
- [ ] Privacy Policy URL accessible
- [ ] Data Safety form complete + matches actual SDKs
- [ ] Account deletion in-app AND on website
- [ ] Content rating IARC questionnaire complete
- [ ] All permissions justified in description
- [ ] No external payment links (or enrolled in External Payments if EEA/UK/US)
- [ ] No misleading claims in description
- [ ] App signing set up (Play App Signing)
- [ ] AAB built with ProGuard + R8

## Tier 2: Likely rejection

- [ ] AI-generated content disclosed (Play AI policy)
- [ ] Foreground service types declared (if any)
- [ ] Notifications permission requested at runtime (Android 13+)
- [ ] Crash rate <1.09% (28-day Vitals threshold)
- [ ] ANR rate <0.47%
- [ ] Cold start <2 sec (Vitals threshold)
- [ ] No crashes in pre-launch report (Test Lab)

## Tier 3: Polish

- [ ] Adaptive icon (foreground + background + monochrome)
- [ ] Edge-to-edge layout (Android 15+ standard)
- [ ] Predictive back gesture support (Android 14+)
- [ ] Material 3 components used
- [ ] Dynamic colors via Material You
- [ ] Dark mode support
- [ ] Tablet layout
- [ ] Foldable layout
- [ ] Accessibility (TalkBack tested)
- [ ] 8 screenshots designed
- [ ] Feature graphic 1024x500
- [ ] Promo video <30 sec (optional)
- [ ] Localized at least to en + 1 other

## Tier 4: Store optimization

- [ ] Title 30 chars optimized
- [ ] Short description 80 chars (indexed!)
- [ ] Long description 4000 chars (indexed)
- [ ] Listing experiments configured (A/B test)
- [ ] Pre-registration set up (if pre-launch)

## Permissions justification

For each permission, document in Play Console "Permissions" section:
- Why needed
- Where used in UX
- What happens if user denies

Foreground service types: must record 30-sec video justifying.

## Output
`docs/pre-submission-checklist.md` filled in, all boxes checked → submit.

## Pair with
- `data-safety-form`, `play-ai-disclosure`
- `account-deletion-flow-android`
- All Tier 3 + 4 skills above
