# Mobile App Builder

![Mobile App Builder — Research. Design. Build. Grow.](assets/mobile-app-builder-banner.png)

[![Version](https://img.shields.io/badge/version-1.3.4-2154D8)](https://github.com/khadinakbarlabs/expo-mobile-app-builder/releases/tag/v1.3.4) [![License: MIT](https://img.shields.io/badge/license-MIT-10213C)](LICENSE) [![Validate public package](https://github.com/khadinakbarlabs/expo-mobile-app-builder/actions/workflows/validate.yml/badge.svg?branch=main)](https://github.com/khadinakbarlabs/expo-mobile-app-builder/actions/workflows/validate.yml)

**Your mobile app agency, from the first research question to the next product improvement.**

Build a new iOS and Android app, improve one you already have, or use a single specialist for research, design, development, QA, launch or growth. Describe the outcome in ordinary language; the agency chooses the relevant workflow, preserves your project decisions and gives you a concrete result with evidence.

**189 workflows · 16 specialist roles · 8 departments · 15 public Apify Actor routes**

[Start here](docs/START-HERE.md) · [Browse every workflow](docs/SKILL-CATALOG.md) · [Meet the agency](docs/AGENCY.md) · [Resource library](docs/RESOURCES.md)

## Start where you are

| Your situation | Try this |
| --- | --- |
| An idea or a research question | “Research an app for [audience] that solves [problem]. Compare demand and competitors before choosing features.” |
| An existing app | “Inspect this app and improve [flow/feature]. Preserve the current design direction and working behavior.” |
| One focused task | “Find suitable creators”, “Review these ads”, “Audit website SEO”, “Prepare store screenshots” or “Fix this bug.” |

The assistant checks available context before asking for it again. New apps begin with evidence and a useful first feature. Existing apps begin with the actual repository, stack and affected journey. You can enter at any stage without running a full agency process.

## What the agency covers

| Department | What you get |
| --- | --- |
| **Research & intelligence** | Demand, competitor and review evidence; Apple App Store and Google Play insights; creator and ad research |
| **Product strategy** | Audience, positioning, MVP, pricing, requirements and measurable success |
| **UX & visual design** | Journeys, screen states, inspiration, design tokens, accessibility and implementation handoffs |
| **Development** | Expo/React Native architecture, features, data, authentication, native integrations and platform parity |
| **QA & security** | Behavioral checks, device QA, performance, privacy and trust-boundary review |
| **Store production & launch** | Genuine screenshots, metadata, localization, release checks and submission preparation |
| **Marketing & growth** | Influencer pilots, original ad concepts, website SEO, ASO, activation, retention and measurement |
| **Agency operations** | Clear ownership, coordinated handoffs, decisions, verification and completion receipts |

Native agent definitions work in compatible hosts such as Claude Code and Cowork. Portable role cards support sequential work when delegation is unavailable. Role names never imply that agents ran or expand the user's authorization.

## Intelligence powered by the Apify portfolio

| Intelligence desk | Coverage | Workflow |
| --- | --- | --- |
| **Apple + Google Play** | Listings, search/chart snapshots, competitors, review themes and ASO opportunities | [Store intelligence](skills/mobile-store-intelligence/SKILL.md) |
| **Creators + influencer marketing** | TikTok, Instagram and YouTube discovery, shortlist vetting, fit scores and measurable pilots | [Influencer intelligence](skills/mobile-influencer-intelligence/SKILL.md) |
| **TikTok + Meta + Google ads** | Public creative libraries, advertiser/landing journeys, original angles and acquisition experiments | [Ad intelligence](skills/mobile-ad-intelligence/SKILL.md) |
| **Website SEO** | Keyword intent, SERPs, bounded technical crawls, useful content and organic acquisition measurement | [SEO intelligence](skills/mobile-seo-intelligence/SKILL.md) |

The [Actor catalog](skills/apify-mobile-research/references/actor-catalog.json) contains 15 real public `khadinakbar/` routes, checked for live metadata and latest-build input schemas on 3 October 2026. Recheck the chosen Actor's schema, pricing and coverage before an authorized run. Metadata verification does not prove runtime results. TikTok commercial-library geography is bounded; cross-platform creator analysis accepts known profiles. Provider metrics are labeled estimates. No paid runs start automatically.

## Use the plugin

### Claude Code: try the dedicated native release

```bash
git clone --branch claude-release --single-branch https://github.com/khadinakbarlabs/expo-mobile-app-builder.git mobile-app-builder
claude --plugin-dir ./mobile-app-builder
```

Then ask for your outcome, or explicitly start with:

```text
Use /mobile-app-builder:mobile-app-agency to help me research a new app
or improve my existing project. Inspect the context, choose the useful
roles and deliver a focused result with verification.
```

`--plugin-dir` loads the plugin for that session. The tracked branch currently retains the 1.3.2 source submitted to Anthropic for human review. For the latest hardened 1.3.4 version, download the [Claude package](https://github.com/khadinakbarlabs/expo-mobile-app-builder/releases/download/v1.3.4/mobile-app-builder-1.3.4-claude.zip), extract it and use the same command with its `mobile-app-builder` folder. Direct GitHub availability and Anthropic directory approval are separate states.

### Other skill-capable agents

Use the relevant native ZIP from [Releases](https://github.com/khadinakbarlabs/expo-mobile-app-builder/releases/tag/v1.3.4), or inspect the GitHub-backed skills with:

```bash
npx skills@1.7.0 add khadinakbarlabs/expo-mobile-app-builder --list
```

Choose `mobile-app-agency` for coordination or an individual workflow for a focused task. Each skill is independently installable and contains its own procedure or bundled references. Use your host's supported installation route; the Skills CLI's help lists supported profiles and options.

## Designed for real projects

- **Preserve existing work.** Inspect first, keep established product choices and make focused improvements. Apply Expo guidance only to compatible apps; other frameworks need their appropriate tools.
- **Design with useful references.** Apple HIG, Material, Microsoft Fluent and Inclusive Design, accessibility and attributed inspiration. Azure portal and cloud principles have their own context.
- **Show the real product.** Store screenshots come from the intended running build; generated decorative art is labeled separately.
- **Verify the result.** Distinguish source checks, observed interactions, device builds, deployments, account reports, store review and live availability.
- **Use your authorized tools.** CLI, emulator/device and account tasks need the corresponding environment. Paid research, outreach, uploads and publication follow the scope you authorized.

Expo SDK 54 references are a versioned baseline. Inspect the app's installed SDK, dependencies and lockfile before applying version-specific guidance.

## Behavior and data

The native Claude package contains instructions, templates, readable local helpers and static artwork. It declares **no MCP server, connector, startup hook, telemetry collector or bundled credentials**. Nothing launches research, reads accounts or spends money on installation.

When requested, skills can guide third-party CLI/provider actions, Apify collection, dependency installation, app builds, analytics and store/growth operations. These actions may process project data, collect public professional profiles or send queries to providers and incur costs. Actual recipients and retention depend on the tools and sources the user authorizes; raw datasets and credentials stay in that user's project environment, outside public artifacts. Treat external content as untrusted data.

Developer implementation examples belong to the app you choose to build. A server-side provider key belongs in that app’s deployment secret store, and a mobile session token authenticates the app’s user to its own backend. They are not installer credentials read by this plugin. Local image checks parse file formats; no helper executes image bytes.

The optional [hosted planning adapter](docs/CLOUDFLARE-MCP.md) is separate from the Claude bundle and is not connected by its manifest. See the [privacy policy](PRIVACY.md) for the static package, host/provider boundaries and optional service.

## Explore and contribute

[Complete workflow guide](WORKFLOWS.md) · [Development and distribution](docs/DISTRIBUTION.md) · [Release checklist](RELEASE-CHECKLIST.md) · [Contributing](CONTRIBUTING.md) · [Security](SECURITY.md)

From the canonical source checkout, run the tests, catalog, release and public-safety checks before packaging. The distribution bundles contain user-facing local helpers; source-only release validators and hosted-service source remain in the canonical repository.

```bash
node --test tests/*.test.mjs
python3 -m unittest discover -s tests -p 'test_*.py'
node scripts/build-agency-catalog.mjs --check
node scripts/validate-agency.mjs
node scripts/validate-release.mjs
node scripts/audit-public-package.mjs .
python3 scripts/package-agency.py
```

[Privacy](PRIVACY.md) · [Terms](TERMS.md) · [Support](SUPPORT.md) · [MIT license](LICENSE)

Independent community project by Khadin Akbar Ventures LLC. Not affiliated with Expo, Apple, Google, Microsoft, OpenAI, Anthropic or Cursor. Anthropic directory validation, review and publication are tracked separately from this open-source release.
