---
name: "command-aso-pass"
description: "Coordinate the cross-platform /aso-pass workflow for Expo projects. Use when the user asks for this outcome."
---

# Command workflow: /aso-pass

Use this as a host-agnostic workflow. Adapt command names and capabilities to the active coding-agent host.

## Workflow contract

```yaml
description: "Full ASO refresh - keywords, screenshots, CPP variants, localization"
argument-hint: "<context>"
```

# /aso-pass

Refresh ASO for an existing live app. Run every 60-90 days.

## Workflow

1. Spawn `aso-marketer` sub-agent.
2. Run `aso-keywords` — pull current state, ASA conversion data if available.
3. Run `asa-to-aso` loop — promote ASA winners to organic Title/Subtitle/Keywords.
4. Run `localize-figs-j` — propagate to French/Italian/German/Spanish/Japanese.
5. Run `design-screenshots` — refresh first-3 screenshots (drive 80% of conversion).
6. Run `custom-product-pages` — build CPPs for top use cases (max 70).
7. Run `respond-to-reviews` — clear backlog, reply to every 1-2 star within 48h.
8. Push updates via `eas-submit-testflight` for the metadata-only update if needed.
