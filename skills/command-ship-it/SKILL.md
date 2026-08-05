---
name: "command-ship-it"
description: "Coordinate the cross-platform /ship-it workflow for Expo projects. Use when the user asks for this outcome."
---

# Command workflow: /ship-it

Use this as a host-agnostic workflow. Adapt command names and capabilities to the active coding-agent host.

## Workflow contract

```yaml
description: "Full ship pipeline for an iOS RN app: pre-submission audit, screenshots, metadata, EAS build, EAS submit, review notes"
argument-hint: "<context>"
```

# /ship-it

Orchestrate the complete ship pipeline. Run this when ready to release.

## External action gate

This workflow can complete local validation and prepare store assets. Building with EAS, uploading a binary, adding testers, submitting for review, and changing phased-release availability are external actions. Obtain explicit confirmation for each action after identifying the exact developer account, app, build, store target, and release status.

## Workflow

1. Run `pre-submission-audit` skill on the current Expo project. Halt on any CRITICAL.
2. Run `accessibility-audit` skill — surface failures.
3. Run `prep-app-store-listing` skill — refresh metadata for en-US (and FIGS+J if localized).
4. Run `design-screenshots` skill — verify 10-shot framework + captions ready.
5. Run `write-review-notes` skill — generate App Review notes + demo account.
6. Use `eas-submit-testflight` to prepare, but not execute, the build and upload commands.
7. Request a specific confirmation before starting a build; after it completes, request a separate confirmation before upload to TestFlight.
8. Wait for TestFlight processing and present the result. Ask again before any App Store submission.
9. After a confirmed App Store submission, use `phased-release` only to prepare the staged-release plan until each availability change is approved.

End with a release summary, prepared commands, and outstanding approvals. Do not promise an App Review timeline.
