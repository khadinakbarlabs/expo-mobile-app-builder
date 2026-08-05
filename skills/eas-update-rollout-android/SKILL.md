---
name: "eas-update-rollout-android"
description: "Use EAS Update to ship OTA JS bundle updates on Android (no Play resubmission for JS-only changes). Use when the user says 'eas update android', 'ota android', 'over the air android'."
---

# EAS Update (Android)

OTA JS bundle updates. No Play Store resubmission needed for JS-only changes.

## External action gate

`eas update:configure`, publishing an update, changing a rollout, and republishing a prior update can change a real project. Prepare the commands locally, then obtain explicit confirmation of the EAS account, project, branch, runtime version, and percentage before each external action.

## Initial config
```bash
eas update:configure
```

This adds runtime version and update URL to app.json.

## Publish update after confirmation
```bash
eas update --branch production --message "Fix paywall typo"
```

Rolls to all users on production channel within minutes.

## Branches → release tracks

| EAS Branch | Connected to Play track |
|---|---|
| `production` | Production |
| `staging` | Closed testing alpha |
| `dev` | Internal testing |

Use `expo-build-properties` to map runtime version → branch.

## Staged rollout after confirmation
EAS Update supports % rollouts:
```bash
eas update --branch production --rollout-percentage 10
# Watch for crashes for 24h
eas update --branch production --rollout-percentage 100
```

## When NOT to use EAS Update

- Native code change (must Play submission)
- Permission change (must Play submission)
- AndroidManifest change (must Play submission)
- Critical security fix where you want forced update (Play has in-app update API for this)

## Fingerprint runtime versioning
SDK 53+ default. Each build gets a fingerprint hash. Updates only ship to matching fingerprints — protects against shipping JS that depends on newer native code.

## Pair with
- `versioning-fingerprint-android`
- `phased-release-play` for Play-side staged rollout
