---
name: "command-research"
description: "Coordinate the cross-platform /research workflow for Expo projects. Use when the user asks for this outcome."
---

# Command workflow: /research

Use this as a host-agnostic workflow. Adapt command names and capabilities to the active coding-agent host.

## Workflow contract

```yaml
description: "Coordinate market-researcher work for market, competitor, keyword, or user-pain evidence"
argument-hint: "<context>"
```

# /research

Use the `market-researcher` agency role for evidence collection. Delegate only when the user asks or applicable host instructions permit it and the host has dispatch tools; otherwise complete the same role sequentially.

## Workflow

1. Infer the research scope from the request: market | competitor | keyword | user-pain | app-name. Clarify only choices that block collection.
2. Assign the `market-researcher` role the decision question, sources, seeds, sample limits and acceptance. Use `apify-mobile-research` when installed for Actor configuration and CLI research.
3. Collect evidence with available authorized tools. Check current schemas and budget before any billable run; preserve source/run provenance and sample limits.
4. Return findings, named sources, limitations and recommended next actions. Record whether a separate agent ran or the work was sequential.
5. Main thread persists the result to `research/[scope]-[date].md` for later reference.
