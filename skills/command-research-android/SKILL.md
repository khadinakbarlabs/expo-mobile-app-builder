---
name: "command-research-android"
description: "Coordinate the cross-platform /research-android workflow for Expo projects. Use when the user asks for this outcome."
---

# Command workflow: /research-android

Use this as a host-agnostic workflow. Adapt command names and capabilities to the active coding-agent host.

## Workflow contract

```yaml
description: "Coordinate the market-researcher role for market/competitor/keyword/user-pain evidence (Play Store + Reddit)"
argument-hint: "<context>"
```

# /research-android

Coordinate the market-researcher role for market/competitor/keyword/user-pain evidence (Play Store + Reddit)

## Workflow

Run from the project root. Assign the relevant agency role; delegate only when the user asks or active host instructions permit it and dispatch tools are available. Otherwise perform the same role sequentially and identify that mode. Reuse session authorization; role assignment does not authorize paid runs or external publication.

Steps depend on subcommand context (see relevant skills in the plugin).

## Related skills

Skills called by this command live in `skills/`. Sub-agents spawned live in `agents/`.

See plugin README.md for full skill index.
