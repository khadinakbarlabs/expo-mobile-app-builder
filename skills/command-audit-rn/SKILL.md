---
name: "command-audit-rn"
description: "Coordinate the cross-platform /audit-rn workflow for Expo projects. Use when the user asks for this outcome."
---

# Command workflow: /audit-rn

Use this as a host-agnostic workflow. Adapt command names and capabilities to the active coding-agent host.

## Workflow contract

```yaml
description: "Pre-submission rejection-prevention audit for React Native + Expo iOS apps"
argument-hint: "<context>"
```

# /audit-rn

Run the full pre-submission audit on the current Expo project.

## Workflow

1. Spawn `app-review-specialist` sub-agent.
2. Run `pre-submission-audit` skill against the codebase.
3. Run `5-1-2-i-ai-disclosure` check — is there explicit AI provider naming + consent modal?
4. Run `privacy-manifest-rn` check — is `PrivacyInfo.xcprivacy` present with required reasons?
5. Run `account-deletion-flow` check — is in-app deletion implemented?
6. Run `paywall-compliance` check — exact price, billing freq, trial timeline, restore button visible?
7. Run `accessibility-audit` — VoiceOver, Dynamic Type, 44pt taps.
8. Output structured report: CRITICAL / HIGH / MEDIUM / PASS with file:line fixes.
