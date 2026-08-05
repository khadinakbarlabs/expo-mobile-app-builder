---
name: "phased-release-play"
description: "Use Play Console staged rollouts (1% to 5% to 20% to 100%) with crash monitoring. Use when the user says 'staged rollout play', 'phased release android', 'gradual release android'."
---

# Phased Release (Play)

Roll new versions to small % first, monitor crashes, expand or halt.

## External action gate

Creating, halting, resuming, or expanding a Play rollout changes production availability. Prepare the schedule, monitoring thresholds, rollback path, and owner of each decision locally. Obtain explicit owner confirmation of the Play account, app, release, track, and percentage before every state-changing action.

## Default rollout schedule
- Day 1: 1% of users
- Day 2-3: 5%
- Day 4-7: 20%
- Day 8-14: 50%
- Day 15+: 100%

## Configure in Play Console

Play Console → Production → Create release → Choose rollout %.

## Halt rollout if crashes spike

Play Console → Production → Halt rollout.

Stops new users from getting the version. Existing users on it stay.

## Vitals to watch

| Metric | Threshold | Action if exceeded |
|---|---|---|
| Crash rate | >1.09% | Halt |
| ANR rate | >0.47% | Halt |
| Cold start time | >2 sec | Halt |
| User-perceived crash rate | >0.5% | Investigate |

Play Console → Vitals tab.

## Re-resume

After fix:
1. Submit new version
2. Resume rollout (Play console action)
3. Old version remains halted (users on it stuck until they update)

## Emergency update behavior

Expo's supported OTA package is `expo-updates`. It can check, fetch, and reload a compatible update, but it does not replace a required native or store update. For an emergency, first determine whether the issue is JS-only and compatible with the installed runtime; otherwise prepare a new binary and follow the owner-confirmed Play release path. Avoid surprising users with an immediate reload unless the product's UX and policy review explicitly allow it.

## EAS Update for hotfixes after confirmation

JS-only fixes can use an EAS Update when compatible with the installed runtime. Prepare the command, rollback target, and monitoring plan first:
```bash
eas update --branch production --message "Fix crash on cart"
```

Publish only after the owner confirms the EAS project, branch, rollout, and action.

## Pair with
- `eas-update-rollout-android`
- `add-sentry-rn-android` for crash monitoring
