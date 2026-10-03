# Design QA checklist

Apply the checklist to the primary flow and at least one recovery flow on both target platforms. These are project acceptance checks, not a claim of formal WCAG certification.

## Hierarchy and navigation

- One clear primary action per decision point; action labels describe the result.
- Back/close/cancel behavior and tab state are specified; destructive actions have an appropriate recovery or confirmation.
- Safe areas, Android edge-to-edge insets, keyboard, modal height, and scrolling work together.
- Phone, tablet, landscape, and foldable behavior are deliberately scoped rather than stretched accidentally.

## Tokens and visual construction

- Semantic colors cover background, surface, content, accent, border, disabled, danger, success, and focus in each supported theme.
- Typography has roles, font source/license, supported scripts, fallback, weight, line height, and scaling behavior. Layout survives large type without clipping or hiding key actions.
- Spacing follows an explicit project scale; visual grouping and touch targets remain distinct.
- Icons have consistent semantics, strokes, optical size, licensed origin, and accessible labels when needed.
- Media has crop/aspect rules, loading placeholder, error state, and meaningful alternative text.

## States and interactions

- Specify loaded, empty, loading, error/retry, offline, disabled, selected, permission denied, expired session, and partial-success states where applicable.
- Preserve entered data after recoverable errors. Explain errors with a next action and no internal service details.
- Keyboard and assistive focus order follow the reading order; dialogs contain focus and return it sensibly when closed.
- Screen-reader labels, roles, values, and announcements are specified; test with VoiceOver and TalkBack.
- Motion has a purpose, interrupt behavior, and reduced-motion alternative. Avoid essential information conveyed only by animation, sound, haptics, or color.

## Localization and accessibility

- Test long strings, actual translated copy, locale-aware numbers/dates, RTL mirroring, truncation, and punctuation.
- Contrast follows relevant platform/accessibility requirements and is measured using actual final colors; validate interactive states and dark mode too.
- Record touch-target decisions against current platform guidance. Web CSS pixels, iOS points, and Android dp are distinct units.
- Permission requests, subscriptions, prices, and privacy controls use plain accurate language and are placed at the relevant task moment.

## Handoff quality

- Every route/state has an acceptance criterion, owner, and evidence location.
- Reference patterns are labeled as observed, inferred, or proposed.
- QA can verify behavior on the current build without needing the design author to interpret a mood board.
