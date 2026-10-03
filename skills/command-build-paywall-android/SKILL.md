---
name: "command-build-paywall-android"
description: "Coordinate the cross-platform /build-paywall-android workflow for Expo projects. Use when the user asks for this outcome."
---

# Command workflow: /build-paywall-android

Use this as a host-agnostic workflow. Adapt command names and capabilities to the active coding-agent host.

## Workflow contract

```yaml
description: "Play-compliant paywall via RevenueCat Paywalls v2 with edge-to-edge handling + trial timeline"
argument-hint: "<context>"
```

# /build-paywall-android

Play-compliant paywall via RevenueCat Paywalls v2 with edge-to-edge handling + trial timeline

## Workflow

Run from the project root. Assign the relevant agency role; delegate only when the user asks or active host instructions permit it and dispatch tools are available. Otherwise perform the same role sequentially and identify that mode. Reuse session authorization; role assignment does not authorize paid runs or external publication.

Steps depend on subcommand context (see relevant skills in the plugin).

## Related skills

Skills called by this command live in `skills/`. Sub-agents spawned live in `agents/`.

See plugin README.md for full skill index.
