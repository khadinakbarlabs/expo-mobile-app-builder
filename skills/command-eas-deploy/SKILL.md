---
name: "command-eas-deploy"
description: "Coordinate the cross-platform /eas-deploy workflow for Expo projects. Use when the user asks for this outcome."
---

# Command workflow: /eas-deploy

Use this as a host-agnostic workflow. Adapt command names and capabilities to the active coding-agent host.

## Workflow contract

```yaml
description: "EAS Build + EAS Update + EAS Submit orchestration"
argument-hint: "<context>"
```

# /eas-deploy

Deploy via EAS. Choose: native build (binary change) or OTA update (JS-only change).

## External action gate

This workflow may inspect a diff, prepare commands, and make a release plan locally. It must not run an EAS build or update, access an account, upload a binary, or change a rollout until the owner explicitly confirms the exact account, environment, channel, and action. A binary build and an OTA publication are separate confirmations.

## Workflow

1. Detect change type: `git diff` for native files (`ios/`, `android/`, `app.json`, native modules in `package.json`).
2. If native change, use `eas-build-profiles` to prepare the intended `eas build` command and list the signing, store, and cost implications.
3. If JS-only, use `eas-update-rollout` to prepare the intended `eas update` command, a rollback target, and a staged rollout proposal.
4. Ask the owner to confirm the precise external command before running it.
5. For a native build, treat TestFlight or Play submission as a separate confirmed action; use the relevant submit skill only after the build is accepted.
6. For an OTA update, agree on monitoring signals and a ramp schedule before each percentage increase.
7. Output release notes, the prepared commands, rollout schedule, and every approval still needed.
