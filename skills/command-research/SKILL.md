---
name: "command-research"
description: "Coordinate the cross-platform /research workflow for Expo projects. Use when the user asks for this outcome."
---

# Command workflow: /research

Use this as a host-agnostic workflow. Adapt command names and capabilities to the active coding-agent host.

## Workflow contract

```yaml
description: "Dispatch the app-researcher sub-agent for market, competitor, keyword, or user-pain research"
argument-hint: "<context>"
```

# /research

Dispatch a deep-research sub-agent in isolated context.

## Workflow

1. Ask user the research scope: market | competitor | keyword | user-pain | app-name.
2. Spawn `app-researcher` sub-agent with the scope and any seed terms.
3. Sub-agent runs WebSearch + WebFetch in isolated context (no main thread pollution).
4. Sub-agent returns: top findings, named sources, recommended next actions.
5. Main thread persists the result to `research/[scope]-[date].md` for later reference.
