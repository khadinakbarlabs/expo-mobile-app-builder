# Mobile App Builder for Expo

[![skills.sh](https://skills.sh/b/khadinakbarlabs/expo-mobile-app-builder)](https://skills.sh/khadinakbarlabs/expo-mobile-app-builder)
[![CI](https://github.com/khadinakbarlabs/expo-mobile-app-builder/actions/workflows/validate.yml/badge.svg)](https://github.com/khadinakbarlabs/expo-mobile-app-builder/actions/workflows/validate.yml)
[![license](https://img.shields.io/badge/license-MIT-2154D8)](LICENSE)
[![Expo SDK 54](https://img.shields.io/badge/Expo-SDK%2054-000020)](https://docs.expo.dev/versions/v54.0.0/)

An open-source, skills-only mobile engineering studio for planning, designing, building, testing, and preparing Expo apps for iOS and Android.

The package contains 163 focused Agent Skills for product discovery, React Native and Expo implementation, native platform work, accessibility, testing, EAS release preparation, monetization planning, and store-readiness review. Expo SDK 54 is the versioned documentation baseline.

> This independent community project is not affiliated with or endorsed by Expo, Apple, Google, React Native, EAS, Anthropic, Cursor, or OpenAI.

## Install

### Agent Skills installer and skills.sh

List the available skills, then install them for a supported coding agent:

```bash
npx skills add khadinakbarlabs/expo-mobile-app-builder --list
npx skills add khadinakbarlabs/expo-mobile-app-builder --skill '*' --agent codex --copy --yes
```

Replace `codex` with `claude-code`, `cursor`, or another profile supported by the installed Skills CLI. Browse the catalog on [skills.sh](https://skills.sh/khadinakbarlabs/expo-mobile-app-builder).

### Codex

```bash
codex plugin marketplace add khadinakbarlabs/expo-mobile-app-builder
codex plugin add expo-mobile-app-builder@expo-mobile-app-builder
```

If the installed Codex build does not support plugin marketplaces, use the Agent Skills installer above with `--agent codex`.

### Claude Code

```text
/plugin marketplace add khadinakbarlabs/expo-mobile-app-builder
/plugin install expo-mobile-app-builder@expo-mobile-app-builder
```

### Cursor

Install the portable skills for Cursor:

```bash
npx skills add khadinakbarlabs/expo-mobile-app-builder --skill '*' --agent cursor --copy --yes
```

The repository also contains a native Cursor plugin manifest for the Cursor Marketplace.

### ChatGPT and the universal Plugins Directory

After the official listing is approved and published, search for **Mobile App Builder for Expo** in the Plugins Directory shared by ChatGPT and Codex. The GitHub, Claude Code, Codex CLI, Cursor, and Agent Skills installation routes remain independent of that review.

### Clone from GitHub

```bash
git clone https://github.com/khadinakbarlabs/expo-mobile-app-builder.git
cd expo-mobile-app-builder
node scripts/validate-release.mjs
node scripts/audit-public-package.mjs .
```

## Start with a task

```text
Use Mobile App Builder for Expo to scaffold a production-ready iOS and Android app.
Audit this Expo app for accessibility, privacy, and release-readiness gaps.
Diagnose this EAS, iOS, or Android build failure without exposing credentials.
Plan subscriptions and store configuration, but stop before any account or publishing action.
```

## What is included

- Cross-platform Expo and React Native architecture, navigation, state, data, offline, and UI workflows.
- iOS guidance for Apple platform features, accessibility, signing preparation, testing, and App Store readiness.
- Android guidance for Material, modern platform behavior, Play requirements, device classes, testing, and release preparation.
- EAS Build, Update, Submit, hosting, observability, and workflow guidance with explicit external-action gates.
- Authentication, backend, analytics, subscriptions, notifications, deep links, security, and privacy workflows.
- Product discovery, naming, onboarding, ASO, pricing, retention, and launch-planning workflows.

The canonical catalog lives in [`skills/`](skills/). Each skill is narrowly triggered so an agent can load only the guidance relevant to the current task.

## What it never includes

- Expo access tokens, Apple signing keys, Android keystores, Play service-account files, API keys, `.env` values, or account identifiers.
- A hosted backend, telemetry collector, plugin account, remote executor, or install-time script.
- Automatic EAS builds, binary uploads, store submissions, directory submissions, publication, pricing changes, or paid activation.
- Claims that App Store or Google Play approval, legal compliance, rankings, or current policy facts are guaranteed.

## Safety and validation

Run the dependency-free release checks from the repository root:

```bash
node scripts/validate-release.mjs
node scripts/audit-public-package.mjs .
```

The safety audit rejects credential artifacts, common secret-shaped values, private filesystem paths, private-source markers, unsafe network-to-shell installers, and broken relative Markdown links. It reports file paths and rule names, never matched values.

To print a credential-free new-project plan:

```bash
node scripts/plan-expo-project.mjs my-mobile-app
```

The helper prints commands only. It does not create a project, log in, start a build, or make a provider-account change.

## Repository layout

```text
skills/                    163 portable Agent Skills
docs/references/           Versioned Expo, Apple, Android, and security references
.codex-plugin/             OpenAI Codex and Plugins Directory manifest
.agents/plugins/           Direct Codex repository marketplace metadata
.claude-plugin/            Claude Code plugin and marketplace metadata
.cursor-plugin/            Cursor plugin metadata
scripts/                   Credential-free planner and release validation
assets/                    Public package icon
```

Official marketplace acceptance is controlled by each platform and is not implied by the presence of a manifest. See [distribution status and review boundaries](docs/DISTRIBUTION.md).

## Privacy, support, and terms

- [Privacy policy](PRIVACY.md)
- [Terms of use](TERMS.md)
- [Support](SUPPORT.md)
- [Security reporting](SECURITY.md)
- [Contributing](CONTRIBUTING.md)
- [Release checklist](RELEASE-CHECKLIST.md)

## License

[MIT](LICENSE)
