---
name: "eas-update-rollout"
description: "Use EAS Update to ship JS-only OTA updates with channels and rollouts. Use when the user says 'EAS Update', 'OTA update', 'over the air', 'rollout percentage'."
---

# EAS Update Rollout

OTA push for JS, assets, styles without store re-submission. Native code can NOT be OTA'd.

## External action gate

Preparing an update is safe; publishing one changes a live product. Before any `eas update`, `eas update:edit`, or rollback command, confirm the EAS account, project, channel, runtime version, rollout percentage, monitoring owner, and rollback update group with the owner. Never infer production approval from a request to draft a release plan.

## What can / cannot OTA
**OTA OK:** screens, business logic, copy, styles, assets, react-native libs with no native code, dependency updates within same major.

**Requires new binary:** new native module, native dep upgrade, Expo SDK bump, app.json key affecting native (permissions, plugins, entitlements, bundle ID, Info.plist), new platform target.

## Runtime versioning (use fingerprint)
app.json:
```json
{
  "expo": {
    "runtimeVersion": { "policy": "fingerprint" }
  }
}
```

`fingerprint` hashes everything that can affect native runtime — config plugins, native modules, app.json keys. Hash bumps automatically on native change. JS-only changes don't bump it. Eliminates the entire class of "OTA crashed because native is out of sync" bugs.

## Publish update after confirmation
```bash
# Start at 10%
eas update --channel production --message "Fix onboarding crash" --rollout-percentage 10

# After 2h of clean Sentry, ramp
eas update:edit --rollout-percentage 50
eas update:edit --rollout-percentage 100
```

## Rollback after confirmation
Republish previous good update:
```bash
eas update:republish --group <previous-update-group-id>
```

Note: native changes can't roll back via EAS Update — must ship new binary.

## Apple's OTA rules (3.3.2)
OTA may not change app's primary purpose or add features the reviewed binary couldn't have done. **Bug fixes, perf, copy, A/B tests, feature flags = fine. Adding a new permission prompt or pivoting product = not fine, build a new binary.**

## Pricing
EAS Update usage and pricing can change. Check the current Expo pricing page before approving a release that could incur charges.

## Reference
`references/02-eas-pipeline.md`
