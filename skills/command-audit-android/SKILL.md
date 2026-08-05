---
name: "command-audit-android"
description: "Coordinate the cross-platform /audit-android workflow for Expo projects. Use when the user asks for this outcome."
---

# Command workflow: /audit-android

Use this as a host-agnostic workflow. Adapt command names and capabilities to the active coding-agent host.

## Workflow contract

```yaml
description: "Pre-submission audit for RN+Expo Android apps (Data Safety form, AI policy, Privacy Policy, paywall, account deletion, target API)"
argument-hint: "<context>"
```

# /audit-android

Pre-submission audit for RN+Expo Android apps (Data Safety form, AI policy, Privacy Policy, paywall, account deletion, target API)

## Workflow

This command orchestrates the relevant skills + sub-agents. Run from project root.

Steps depend on subcommand context (see relevant skills in the plugin).

## Related skills

Skills called by this command live in `skills/`. Sub-agents spawned live in `agents/`.

See plugin README.md for full skill index.
