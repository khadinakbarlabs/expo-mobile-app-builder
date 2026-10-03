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

Prepare an ASO refresh for an existing app using its actual listing, product behavior and measurement. Choose review cadence from evidence and release needs.

## Workflow

1. Assign `store-producer` for metadata and assets, with `growth-strategist` for acquisition hypotheses. Delegate only when the user asks or active host instructions permit it; otherwise perform those roles sequentially.
2. Run `aso-keywords` — pull current state, ASA conversion data if available.
3. Run `asa-to-aso` loop — promote ASA winners to organic Title/Subtitle/Keywords.
4. Run `localize-figs-j` — propagate to French/Italian/German/Spanish/Japanese.
5. Use `mobile-store-asset-production` when installed, alongside `design-screenshots`, for actual runtime captures and truthful compositions. Prioritize the opening images using measured conversion and tested hypotheses; do not invent a universal conversion percentage.
6. Use `custom-product-pages` to prepare variants for relevant use cases. Verify current platform limits at execution.
7. Summarize review themes and prepare reply drafts if requested. Send replies only with explicit messaging authorization; the package does not contain a `respond-to-reviews` skill.
8. Deliver reviewable metadata, captures, localization and experiment proposals. A metadata-only change uses the current App Store Connect workflow; TestFlight uploads are a separate binary action. Complete publication only within the user's explicit authorization.
