---
name: "phased-release"
description: "Set up Apple's Phased Release for App Store updates: 1% to 100% over 7 days, with pause and expedited review options. Use when the user says 'phased release', 'gradual rollout', 'expedited review', 'rollback'."
---

# Phased Release

Apple's built-in 7-day rollout for App Store updates: 1% → 2% → 5% → 10% → 20% → 50% → 100%.

## External action gate

Enabling, pausing, resuming, or expediting a release changes App Store Connect state. Prepare the rollout and monitoring plan locally, then obtain explicit owner confirmation of the Apple account, app version, release target, and exact availability action. Check Apple's current policies before acting.

## Enable in ASC
App Store Connect → app → version → "Phased Release for Automatic Updates" → ON.

Or prepare a Fastlane configuration for an approved release:
```ruby
upload_to_app_store(phased_release: true)
```

## Pause control
Pausing stops new automatic updates; users who already updated keep the new version. Verify Apple's current pause policy before relying on a time limit.

## To force a full rollback
Apple doesn't support "rollback to previous version" directly. To revert:
1. Submit a new version with the previous binary content
2. Or fix forward with hotfix (faster)

## Expedited review for hotfixes
Request via App Store Connect → Contact Us → App Review → Request Expedited Review.

Apple grants for genuine critical issues:
- Crash on launch
- Security vulnerability
- Broken core functionality
- Time-sensitive event (launch tied to conference)

Do not rely on a particular review timeline. Use expedited-review requests only for genuine, owner-approved critical issues.

## When to skip phased release
- First-time launch (no users to phase)
- Hot bug fix (you want everyone updated immediately)
- A/B test that depends on full population

## Pair with EAS Update for OTA hotfixes
For JS-only fixes, skip phased release entirely — use `eas update --rollout-percentage 10` (run `eas-update-rollout`).

## Reference
`../../docs/references/06-store-readiness.md`
