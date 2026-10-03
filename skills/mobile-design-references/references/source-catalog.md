# Design source catalog

Catalog reviewed 2026-10-03. URLs and access can change; recheck the page used for each decision. Documentation is linked, not copied into this package.

## Platform and inclusive design

| Resource | Use | Scope / access |
| --- | --- | --- |
| [Apple HIG](https://developer.apple.com/design/human-interface-guidelines) | iOS navigation, controls, presentation, typography, motion, accessibility | Public documentation; platform behavior first |
| [Apple design resources](https://developer.apple.com/design/resources/) | Official platform templates and assets | Download/license/account conditions vary |
| [Material 3](https://m3.material.io/) | Android components, adaptive layouts, color/type systems | Public documentation; verify component version |
| [Android accessibility](https://developer.android.com/guide/topics/ui/accessibility) | Semantics, navigation, assistive technology testing | Native behavior also matters in React Native |
| [Fluent 2](https://fluent2.microsoft.design/) | Microsoft design foundations and reusable interaction ideas | Adapt deliberately; do not impose Windows styling on iOS |
| [Microsoft Inclusive Design](https://inclusive.microsoft.design/) | Exclusion mapping and designing across abilities | Public principles/toolkits; links to owner resources |
| [WCAG 2.2](https://www.w3.org/TR/WCAG22/) | Contrast, focus, target, interaction, content checks | Web standard; map relevant criteria to native use, then test VoiceOver/TalkBack |
| [Azure portal create experience](https://learn.microsoft.com/en-us/azure/azure-resource-manager/managed-applications/create-uidefinition-overview) | Official portal form structure and validation concepts | Azure managed applications only, not mobile UX guidelines |
| [Azure Architecture Center](https://learn.microsoft.com/en-us/azure/architecture/) | Cloud/backend architecture decisions | Infrastructure reference, not visual design principles |

The historical Azure portal SDK design links could not be verified as available during this review. Do not describe them as a current mobile design authority. The portal create-experience source is available but applies narrowly to deployment forms. Fluent and Inclusive Design are the verified Microsoft UX starting points.

## Inspiration and workflow sources

| Resource | What to inspect | Availability / rights |
| --- | --- | --- |
| [Mobbin](https://mobbin.com/) | Flow sequences, information hierarchy, mobile patterns | Limited/public and account/subscription access may differ; screenshots are third-party content |
| [Page Flows](https://pageflows.com/) | Recorded interaction sequences | Check current access; unavailable in automated review on catalog date |
| [Figma Community](https://www.figma.com/community) | UI kits, tokens, layout examples | Account and per-file licenses vary; unavailable in automated review on catalog date |
| [Dribbble](https://dribbble.com/) | Visual exploration, type and composition | Often concepts; no interaction proof; verify creator licensing |
| [Behance](https://www.behance.net/) | Case-study rationale, identity, visual systems | Creator-owned work; gallery visibility grants no reuse permission |
| Public App Store / Play listings | Positioning and store presentation | Listings are marketing material; actual app/device inspection needed for flow evidence |
| A user-owned existing app | Tested task behavior and original assets | Best local fallback; use test accounts and no customer data |

Treat these as optional sources, not required paid subscriptions. A browser and a local board are enough to research patterns. Record unavailable sources honestly and choose a permitted alternative.

## Implementation reference

Use the repository's [Expo SDK 54 reference](https://docs.expo.dev/versions/v54.0.0/) baseline. Check implementation against the actual app's SDK and installed versions before suggesting a dependency or animation API. Do not upgrade a project merely to match an inspiration example.
