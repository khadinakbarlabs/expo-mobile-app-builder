---
name: "command-aso-pass-play"
description: "Coordinate the cross-platform /aso-pass-play workflow for Expo projects. Use when the user asks for this outcome."
---

# Command workflow: /aso-pass-play

Use this as a host-agnostic workflow. Adapt command names and capabilities to the active coding-agent host.

## Workflow contract

```yaml
description: "Full Play ASO refresh: keywords, screenshots, listing experiments, custom store listings, localization"
argument-hint: "<context>"
```

# /aso-pass-play

Full Play ASO refresh: keywords, screenshots, listing experiments, custom store listings, localization

## Workflow

This command orchestrates the relevant skills + sub-agents. Run from project root.

Steps depend on subcommand context (see relevant skills in the plugin).

## Related skills

Skills called by this command live in `skills/`. Sub-agents spawned live in `agents/`.

See plugin README.md for full skill index.
