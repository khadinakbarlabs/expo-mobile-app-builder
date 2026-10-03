# Mobile App Builder

**An organized mobile app agency: research the opportunity, design the experience, build the app, verify it, and prepare its launch and growth.**

Mobile App Builder brings **184 workflows, 12 specialist roles and 8 departments** into one portable, open-source package for Expo and React Native apps on iOS and Android. Start with a product brief or an existing repository. The agency assigns responsibilities, loads the relevant skills, and passes concrete artifacts between stages.

Version **1.2.0** is an agency release candidate. The existing [public repository](https://github.com/khadinakbarlabs/expo-mobile-app-builder) remains the distribution source; this candidate needs publication before a GitHub install can retrieve the new agency workflows. Official directory approval is a separate platform state.

## Your agency team

| Department | Specialists | Deliverables |
| --- | --- | --- |
| Research & intelligence | Market researcher | Apify-backed competitor, review, demand, ad and inspiration evidence |
| Product & business strategy | Product strategist | Positioning, MVP, pricing, requirements and measurable success |
| UX, visual design & inspiration | UX designer, visual designer | Journeys, screen states, tokens, accessibility and design handoffs |
| Architecture & development | Mobile architect, Expo engineer | Architecture, complete features, native integrations and platform parity |
| QA, security & performance | QA engineer, security reviewer | Reproducible checks, interaction evidence, privacy and trust-boundary review |
| Store production & release | Store producer, release manager | Real screenshots, metadata, localization and release preparation |
| Marketing, ads & experimentation | Growth strategist | Acquisition briefs, creators, retention, funnel measurement and experiments |
| Agency direction & operations | Agency director, release manager | Task ownership, dependencies, decisions and completion receipts |

Use one specialist for a focused change or the full agency for a product journey. Native agent files load in compatible hosts such as Claude Code. The standalone agency skill bundles the same role cards for other hosts. Parallel work uses the host's actual delegation capabilities and authorization; sequential operation follows the same handoffs.

Explore the [agency operating model](docs/AGENCY.md), [complete skill catalog](docs/SKILL-CATALOG.md), and [resource library](docs/RESOURCES.md).

## Start with an outcome

```text
Use Mobile App Agency to build my iOS and Android app.
The audience is [audience], the problem is [problem], and the first
useful result is [result]. Inspect the repository, assign clear owners,
research assumptions, design the core journey, build a complete slice,
and verify it. Use the tools and external-action scope already authorized.
```

For a narrow request:

```text
Use the design team to improve this onboarding journey. Preserve the
product direction and deliver screen states, accessibility requirements,
design tokens and an implementation handoff.
```

```text
Use the research team to configure Apify actors for competitor reviews
and ad research. Inspect live input schemas, define a bounded run plan,
and keep source provenance and observed charges with the findings.
```

## Install or load the candidate

From an extracted release or a checkout containing version 1.2.0, point a skill-capable agent at `skills/mobile-app-agency/SKILL.md`. The skill is independently usable; the full package adds all specialized playbooks.

Claude Code can load the extracted Claude bundle directly:

```bash
claude --plugin-dir ./mobile-app-builder
```

For existing public GitHub workflows:

```bash
npx skills add khadinakbarlabs/expo-mobile-app-builder --list
```

Use that installed Skills CLI's help to choose supported agent profiles and install the available skills. After this candidate is published, select `mobile-app-agency` for agency coordination or `mobile-app-builder-ios-android` for focused implementation. Keep installations pinned when reproducibility matters.

## What is included

- **Apify research:** a configurable actor registry, current CLI/schema checks, sample and budget planning, dataset retrieval, deduplication and an evidence ledger. Actors are selected and configured in the user's environment; this package bundles no paid account or credentials.
- **Design resources:** Apple HIG, Material, Microsoft Fluent and Inclusive Design, accessibility, design inspiration and practical handoff checklists. Azure portal forms and cloud architecture are identified separately from mobile interaction guidance.
- **Development:** Expo/React Native architecture, state and data, authentication, native features, notifications, purchases and offline/error behavior. Existing SDK 54 references are a versioned baseline; match guidance to the app's actual installed SDK.
- **Quality:** focused behavior checks, iOS/Android interaction QA, performance, privacy, security and source/build evidence. The engineering guard preserves other work and follows the project's branch policy.
- **Store production:** screenshot storyboards, actual runtime captures, metadata and localization templates, asset manifests and export checks. Generated decorative art is kept distinct from captured product UI.
- **Growth:** advertising research and campaign briefs, ASO, creator programs, referrals, retention, subscriptions and measurable experiments.

Research findings need observed source data; QA claims need actual test evidence; launch claims need provider readback. Approved external actions can continue within their existing scope. New paid runs, production changes, publication, uploads and store submissions require the corresponding authorization.

## Browse by department

The directory keeps each skill independently installable. A checked taxonomy gives every skill one department and subcategory, with a primary platform tag.

```bash
node scripts/agency.mjs --department research
node scripts/agency.mjs --department design
node scripts/agency.mjs --query screenshots --json
node scripts/agency.mjs --platform android
```

These commands read only the local package. Classification is a resource tree; project Git branches and worktrees follow the user's repository rules and file-ownership needs.

```text
agency/          Machine-readable departments, categories and skill catalog
agents/          Twelve native specialist definitions
skills/          Independently installable workflows and bundled references
docs/            Agency, resources, catalog, prompts and distribution guidance
scripts/         Local catalog, package and safety validation
tests/           Classification and packaging regression checks
```

The [detailed workflow guide](WORKFLOWS.md) retains the existing research, engineering, store and growth playbooks. The separate [Cloudflare MCP adapter](docs/CLOUDFLARE-MCP.md) remains a planning service; building this package does not deploy that service.

## Validate and package

Run these checks from the canonical source checkout; distribution bundles contain the local catalog tools and omit source-only release validators.

```bash
node --test tests/*.test.mjs
node scripts/build-agency-catalog.mjs --check
node scripts/validate-agency.mjs
node scripts/validate-release.mjs
node scripts/audit-public-package.mjs .
python3 scripts/package-agency.py
node scripts/validate-openai-upload.mjs dist/1.2.0/mobile-app-builder-1.2.0-openai.zip
```

Packaging produces separate portable, OpenAI, Claude and Cursor candidates from an explicit allowlist, with archive checksums. No dependencies, signing files, environment configuration, Git history or hosted-service source enter those bundles. The OpenAI candidate carries portable role instructions through skills; its native Claude manifest and agents stay in the Claude bundle.

## Distribution and support

Local validation establishes package quality. GitHub publication, installed-host behavior, directory review, and public availability each require their own verification. See [distribution](docs/DISTRIBUTION.md) and the [release checklist](RELEASE-CHECKLIST.md).

[Privacy](PRIVACY.md) · [Terms](TERMS.md) · [Support](SUPPORT.md) · [Security](SECURITY.md) · [Contributing](CONTRIBUTING.md) · [MIT license](LICENSE)

Independent community project; not affiliated with Expo, Apple, Google, Microsoft, OpenAI, Anthropic or Cursor.
