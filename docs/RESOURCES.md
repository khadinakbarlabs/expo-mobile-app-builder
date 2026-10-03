# Mobile agency resource catalog

Reviewed **2026-10-03**. This catalog classifies resources by agency desk, explains their role, and routes work to bundled skills. Documentation links are primary sources unless explicitly labeled inspiration. Check the source again when acting on changing prices, policy, dimensions, schemas, SDKs, or account access. A listed tool is a conditional dependency, not a requirement to buy an account.

## Research and competitive intelligence

| Resource | Purpose | Skill route | Access / evidence rules |
| --- | --- | --- | --- |
| [Apify CLI reference](https://docs.apify.com/cli/docs/reference) | Discover selected existing Actors, inspect schema, execute bounded collection, read run/storage evidence | `apify-mobile-research` | CLI version/help first; remote runs require account, budget, and authorization |
| [Actor runs and builds](https://docs.apify.com/actors/running/runs-and-builds) | Associate results with the actual run/build | `apify-mobile-research` | Record actual run/build/dataset, terminal status, coverage, and source dates |
| [Actor usage and resources](https://docs.apify.com/actors/running/usage-and-resources) | Bound resources and inspect actual usage | `apify-mobile-research` | An input limit is not a universal spend cap; unknown charges stay unknown |
| [Apify Store](https://apify.com/store) | Select a real Actor for review, web, community, ad, or inspiration collection | `apify-mobile-research` | Registry ships disabled with no Actor IDs; inspect live schema/pricing/source rights |
| [Reddit Data API terms](https://redditinc.com/policies/data-api-terms) | Understand source access and permitted use | `mine-reddit-pain-points`, `mine-reddit-android-pain-points` | An Actor does not grant unrestricted rights to underlying source data |
| Public App Store / Play listings and permissioned app inspection | Competitor feature/positioning/paywall/onboarding comparisons | `mine-competitor-reviews`, `mine-play-reviews`, `competitor-feature-matrix`, `competitor-onboarding-teardown`, `competitor-paywall-analysis`, `competitor-paywall-analysis-android` | Store images are marketing; verify interaction on a real runtime before claiming behavior |

Local resources: [Apify research protocol](../skills/apify-mobile-research/references/research-protocol.md), [CLI workflow](../skills/apify-mobile-research/references/cli-workflow.md), [unconfigured Actor registry](../skills/apify-mobile-research/templates/actor-registry.json), [run manifest](../skills/apify-mobile-research/templates/run-manifest.json), and [research brief](../skills/apify-mobile-research/templates/research-brief.md). Raw records remain in an ignored local folder; publish only rights-cleared, redacted findings.

## UI/UX, accessibility, and design systems

| Primary source | Purpose | Skill route | Scope |
| --- | --- | --- | --- |
| [Apple HIG](https://developer.apple.com/design/human-interface-guidelines) | iOS behavior, components, visual hierarchy, typography, motion | `mobile-design-references`, `apply-hig` | Platform guidance; verify relevant current section |
| [Apple design resources](https://developer.apple.com/design/resources/) | Official kits and platform templates | `mobile-design-references` | Per-download terms/account requirements vary |
| [Material 3](https://m3.material.io/) | Android components, color/type systems, adaptive layouts | `mobile-design-references`, `apply-material3` | Preserve Android expectations rather than cloning iOS visuals |
| [Android accessibility](https://developer.android.com/guide/topics/ui/accessibility) | Native semantics, navigation, assistive technology | `accessibility-audit-android` | Verify in TalkBack on the current app |
| [Microsoft Fluent 2](https://fluent2.microsoft.design/) | Design foundations and interaction principles | `mobile-design-references` | Microsoft design system; adapt by task and platform |
| [Microsoft Inclusive Design](https://inclusive.microsoft.design/) | Exclusion mapping and inclusive problem framing | `mobile-design-references` | Inclusive principles complement runtime accessibility checks |
| [WCAG 2.2](https://www.w3.org/TR/WCAG22/) | Contrast, focus, interaction, and content criteria | `accessibility-audit`, `accessibility-audit-android` | Web standard; map relevant checks to native behavior and test VoiceOver/TalkBack |
| [Azure managed-application portal create experience](https://learn.microsoft.com/en-us/azure/azure-resource-manager/managed-applications/create-uidefinition-overview) | Portal forms, validation, step structure | `mobile-design-references` when relevant to admin/portal work | Official Azure-specific UI documentation, not a mobile design system |
| [Azure Architecture Center](https://learn.microsoft.com/en-us/azure/architecture/) | Backend/cloud architecture and system decisions | `choose-backend` when Azure is actually selected | Cloud architecture is separate from UI/UX principles |

Historical Azure portal SDK design links could not be verified as available in this review. The available create-experience documentation has a narrow portal-form scope. Use Fluent and Inclusive Design for Microsoft UX principles; do not label Azure cloud architecture as mobile design guidance.

Local resources: [categorized design sources](../skills/mobile-design-references/references/source-catalog.md), [typography/spacing/motion/state checklist](../skills/mobile-design-references/references/design-qa-checklist.md), [inspiration board](../skills/mobile-design-references/templates/inspiration-board.md), and [design handoff](../skills/mobile-design-references/templates/design-handoff.md).

## Inspiration and design collaboration

| Inspiration source / tool | Purpose | Optional dependency / restrictions |
| --- | --- | --- |
| [Mobbin](https://mobbin.com/) | Production screen/flow references | Account/subscription access varies; no embedded screenshot redistribution rights assumed |
| [Page Flows](https://pageflows.com/) | Recorded flow reference | Automated review unavailable on catalog date; use permitted manual access or an alternative |
| [Figma Community](https://www.figma.com/community) | Community kits, tokens, design examples | Automated review unavailable on catalog date; account and per-file license conditions vary |
| [Dribbble](https://dribbble.com/) / [Behance](https://www.behance.net/) | Composition, identity, visual concepts | Inspiration, often speculative; creator rights apply; not runtime proof |
| Figma / Figma MCP, if available | Inspect user-supplied design context and implementation measurements | `figma-to-rn`, `figma-to-rn-android`; no new subscription required |
| Local token tables and owned screenshots | Account-free design handoff and reference board | Complete fallback when galleries or connectors are unavailable |

Record author, URL, observation date, production/concept status, platform, pattern, rights, and attribution. Extract task-serving principles instead of copying trademarks or licensed assets.

## Development and architecture

| Primary source | Purpose | Skill route / dependency |
| --- | --- | --- |
| [Expo SDK 54](https://docs.expo.dev/versions/v54.0.0/) | Repository implementation baseline | `mobile-app-builder-ios-android`, feature-specific `add-*` skills; compare with actual app SDK before edits |
| [Expo development builds](https://docs.expo.dev/develop/development-builds/introduction/) | Explain runtime/tooling limitations and native module testing | `eas-build-profiles`, `eas-build-profiles-android`, device pairing skills |
| [Expo development tools](https://docs.expo.dev/develop/tools/) | Choose available local/device debugging surfaces | Install only needed tools, inspect local versions first |
| [EAS Build](https://docs.expo.dev/build/introduction/) | Local/cloud binary workflow and signing scope | `eas-build-profiles`, `eas-build-profiles-android`; cloud use/account/cost authorization as applicable |
| [React Native documentation](https://reactnative.dev/docs/getting-started) | Native components, architecture and platform behavior | Feature specialists; use app-compatible version rather than assuming latest APIs |
| [Expo SDK 54 view capture](https://docs.expo.dev/versions/v54.0.0/sdk/captureRef/) | App-owned view exports such as result cards | `design-shareable-result-card`; a view capture is not automatically a full-screen store capture |

Backend, subscriptions, analytics, notifications, and crash tools are selected by product needs. `choose-backend`, `choose-storage`, `integrate-revenuecat-rn` / Android, `add-posthog-rn` / Android, and `add-sentry-rn` / Android are conditional routes. The package contains guidance; it does not ship service credentials, enabled accounts, or an automatic cloud deployment.

## QA and release evidence

| Primary source / evidence | Purpose | Skill route |
| --- | --- | --- |
| [React Native testing overview](https://reactnative.dev/docs/testing-overview) | Choose unit, integration, and runtime checks by risk | `e2e-checklist`, `e2e-checklist-android`, audit skills |
| [Android app testing](https://developer.android.com/training/testing) | Android device/test strategy | `e2e-checklist-android`, `pair-android-device` |
| [Apple testing documentation](https://developer.apple.com/documentation/testing) | Apple platform test context | `e2e-checklist`, `pair-physical-device` |
| Current runtime on a simulator/emulator | Reproduce visual and interaction behavior | State device/OS/build and exact journey; no physical-device claim |
| Current installed runtime on a physical device | Validate device interactions and capabilities | State what was observed; screenshots do not prove unrelated services |
| Store/Console readback | Verify upload, review, availability, and rollout status | `pre-submission-audit`, `pre-submission-audit-play`, submission/release skills; external authorization applies |

A passing source test, native build, installed binary, physical-device journey, deployed backend, and store availability are different evidence. Track each gate explicitly. Browser previews and polished compositions are useful but do not satisfy native device QA.

## Store metadata, screenshots, and localization

| Primary source | Purpose | Skill route |
| --- | --- | --- |
| [Apple screenshot specifications](https://developer.apple.com/help/app-store-connect/reference/app-information/screenshot-specifications) | Current accepted device classes, sizes, formats | `mobile-store-asset-production`; requirements rechecked for each pack |
| [Apple platform version information](https://developer.apple.com/help/app-store-connect/reference/app-information/platform-version-information) | Metadata field scope and current limits | `aso-keywords`, `command-aso-pass` |
| [Apple review guidelines](https://developer.apple.com/app-store/review/guidelines/) | Accurate presentation and applicable store policy | `pre-submission-audit`, `paywall-compliance`; no acceptance guarantee |
| [Play preview assets](https://support.google.com/googleplay/android-developer/answer/9866151?hl=en) | Screenshot/icon/feature graphic requirements and content guidance | `mobile-store-asset-production`, `design-screenshots-play` |
| [Play listing best practices](https://support.google.com/googleplay/android-developer/answer/13393723?hl=en) | Listing clarity and relevant metadata | `aso-keywords-play`, `command-aso-pass-play` |

Local resources: [real-capture workflow](../skills/mobile-store-asset-production/references/capture-workflow.md), [storyboard and metadata template](../skills/mobile-store-asset-production/templates/storyboard-metadata.md), and [capture/export manifest](../skills/mobile-store-asset-production/templates/capture-manifest.json). `design-screenshots` and `design-screenshots-play` provide creative frameworks; current primary requirements and real feature evidence take precedence over fixed sizes, indexing assertions, example testimonials, or unverified conversion claims. Localize both UI and captions, use owned/licensed assets, and keep decorative generated artwork distinct from actual runtime captures.

## Ads research, launch, and growth

| Primary source / desk resource | Purpose | Skill route | Access / evidence |
| --- | --- | --- | --- |
| [Meta Ad Library](https://www.facebook.com/ads/library/) | Observe public ad angles and creative | `apify-mobile-research`, `run-paid-acquisition` planning | Automated review unavailable on catalog date; availability varies; no private spend/ROAS claims |
| [Google Ads Transparency Center](https://adstransparency.google.com/) | Public advertiser/creative observation | `apify-mobile-research` | Active creative is not proven profitability |
| [TikTok Creative Center](https://ads.tiktok.com/business/creativecenter/) | Official public creative/trend inspiration | `apify-mobile-research`, `run-paid-acquisition` planning | Region/account/data access varies; confirm the exact feature before use |
| [Apple Ads Help](https://ads.apple.com/app-store/help) | Current campaign and App Store ad concepts | `asa-to-aso`, `asa-to-aso-android` only where relevant to its own platform | Apple Ads scope is Apple; do not infer Android capability from similarly named skills |
| First-party, owner-authorized funnel data | Acquisition-to-retention learning | `instrument-growth-funnel`, `set-up-ab-testing`, `design-retention-loop`, lifecycle/launch skills | Account-specific metrics require actual readback and approved access |

Creative research classifies hook, problem, promise, format, visual pattern, offer, CTA, landing-page continuity, and claim evidence. `plan-launch` / `plan-launch-android`, `position-pitch` / Android, pricing, affiliate, creator, and viral-loop skills turn findings into bounded experiments. Do not promise installs, revenue, retention, or margin from a swipe file. Campaign creation, spend, outreach, tracking changes, and publishing require their applicable authorization.

## Conditional tool matrix

| Capability | Use when present | Portable fallback |
| --- | --- | --- |
| Apify CLI + authenticated user account | Bounded remote data collection | Local research brief, manually supplied public evidence, disabled registry |
| Browser access | Current primary-doc verification and permitted inspiration | User-provided source excerpts; mark unverifiable/current-sensitive decisions pending |
| Figma / MCP | Owned designs and measurements | Local token/layout/state handoff |
| Device/simulator/emulator capture tool | Real current runtime screenshots and QA | Storyboard and capture plan with pending evidence; never fabricated UI |
| Image generation/editing tool | Clearly labeled decorative art, owned asset variation | Licensed/owned static backgrounds and standard composition |
| Local native toolchain | Build/install/test actual app | Explain exact missing capability; source checks remain separately labeled |
| EAS / store accounts | Authorized build/submission/release workflow | Local preparation and explicit external gates |
| Analytics/crash/subscription services | Needed first-party integrations | Local contract and test fixtures; no fabricated telemetry or entitlement proof |

This package does not require paid inspiration libraries, ad budgets, Azure subscriptions, Figma seats, or hosted analytics to plan and build locally. Accounts, tool installs, network runs, and external actions are selected only when the user task needs them.
