---
name: "command-research-android"
description: "Coordinate the cross-platform /research-android workflow for Expo projects. Use when the user asks for this outcome."
---

# Command workflow: /research-android

Use this as a host-agnostic workflow. Adapt command names and capabilities to the active coding-agent host.

## Workflow contract

```yaml
description: "Dispatch researcher sub-agent for market/competitor/keyword/user-pain research (Play Store + Reddit)"
argument-hint: "<context>"
```

# /research-android

Dispatch researcher sub-agent for market/competitor/keyword/user-pain research (Play Store + Reddit)

## Workflow

This command orchestrates the relevant skills + sub-agents. Run from project root.

Steps depend on subcommand context (see relevant skills in the plugin).

## Related skills

Skills called by this command live in `skills/`. Sub-agents spawned live in `agents/`.

See plugin README.md for full skill index.
