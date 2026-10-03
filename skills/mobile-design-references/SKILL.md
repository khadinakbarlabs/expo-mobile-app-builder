---
name: mobile-design-references
description: "Build a source-backed mobile design direction with Apple HIG, Material, Fluent, inclusive design, accessibility, and licensed inspiration. Use for UX research, visual direction, design tokens, and developer handoffs."
---

# Mobile Design References

Work as the agency's design research and UI/UX desk. Establish a coherent direction from user tasks and the existing product, then translate it into buildable, testable decisions.

1. Identify platforms, audience, core task, current approved direction, brand constraints, accessibility needs, and supported screen sizes/locales. Preserve established decisions unless the brief asks to replace them.
2. Read [source catalog](references/source-catalog.md). Use Apple HIG for iOS behavior, Material for Android behavior, and Microsoft Fluent/inclusive design for relevant cross-platform principles. Azure portal forms and cloud architecture are separate resources; they are not a mobile design system.
3. Inspect 3–5 relevant flows through permitted access. Record sources with [inspiration board](templates/inspiration-board.md). Distinguish production UI, speculative concepts, marketing art, and observed interaction behavior.
4. Choose a focused direction: hierarchy, type, color, spacing, navigation, imagery, motion, and state behavior. Explain why each serves the task. Use [design QA checklist](references/design-qa-checklist.md).
5. Produce a developer-ready [design handoff](templates/design-handoff.md) with semantic tokens, platform adaptations, routes, all meaningful states, accessibility, localization, and acceptance criteria.
6. Route implementation to `figma-to-rn` / `figma-to-rn-android`, platform review to `apply-hig` / `apply-material3`, and accessibility to `accessibility-audit` / `accessibility-audit-android`. With no Figma account/MCP, hand off token tables, measured layouts, owned images, and written flow/state specs locally.

## Evidence and rights

Use references as evidence of a pattern, not permission to redistribute screenshots, fonts, icons, trademarks, or proprietary kits. Verify each asset's license and platform availability; record author, URL, rights, and attribution. Do not bypass sign-in, paywalls, robots restrictions, or access controls. Public gallery images may be speculative and may omit empty/error states. Never present a gallery concept as a tested production flow.

## Done

The chosen direction explains the core task, fits iOS/Android expectations, includes a clear token/state contract, handles text scaling and assistive technology, and gives development/QA specific acceptance criteria. A pretty mood board alone is not a completed design handoff.
