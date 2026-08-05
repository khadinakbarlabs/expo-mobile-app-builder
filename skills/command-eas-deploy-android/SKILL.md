---
name: "command-eas-deploy-android"
description: "Coordinate the cross-platform /eas-deploy-android workflow for Expo projects. Use when the user asks for this outcome."
---

# Command workflow: /eas-deploy-android

Use this as a host-agnostic workflow. Adapt command names and capabilities to the active coding-agent host.

## Workflow contract

```yaml
description: "EAS build + EAS submit + EAS update orchestration for Android"
argument-hint: "<context>"
```

# /eas-deploy-android

EAS build + EAS submit + EAS update orchestration for Android

## External action gate

Use this workflow to inspect, validate, and prepare an Android release plan. Do not run EAS, access Play Console, read a service-account key, create a build, upload an AAB, or change a release track without the owner's explicit confirmation of that specific action and target account.

## Workflow

This command coordinates the relevant skills from the project root. It does not assume that sub-agents, accounts, or credentials are available.

Steps depend on the release context (see relevant skills in the plugin). Prepare a local checklist, command preview, rollback plan, and requested confirmation before any external action.

## Related skills

Related skills live in `skills/`.

See plugin README.md for full skill index.
