# Distribution

The same canonical skills are packaged for several agent ecosystems. A native manifest makes direct installation possible; it does not imply endorsement or acceptance into a platform-operated directory.

| Surface | Package route | Publication model |
| --- | --- | --- |
| GitHub | `khadinakbarlabs/expo-mobile-app-builder` | Canonical open-source repository and release assets |
| skills.sh | GitHub-backed Agent Skills catalog | Indexed from Skills CLI installations |
| Agent Plugins 1.0 | Root `plugin.json` plus `skills/` | Vendor-neutral portable package; installation and permissions remain client-specific |
| Codex CLI | `.agents/plugins/marketplace.json` | Direct repository marketplace |
| Claude Code | `.claude-plugin/marketplace.json` | Direct repository marketplace; official directory is separately reviewed |
| Cursor | `.cursor-plugin/plugin.json` | Direct portable skill install; official marketplace is separately reviewed |
| ChatGPT plugin directory | Skills-only OpenAI ZIP; optional remote MCP is separate | Native skills package draft and hosted service submission are distinct; review and publication are separate platform steps |

Official directory status can change independently of a GitHub release. Verify the live platform surface before describing a listing as approved or published.

## Current directory status — 2026-10-03

GitHub release 1.3.4 is published. Anthropic follows the already-submitted `claude-release` 1.3.2 commit: security scan passed, In review, Live not yet, with a component-inventory policy hold requiring reviewer interpretation. The latest 1.3.4 Claude ZIP is available for direct installation; the tracked branch was preserved to avoid resetting the existing human review.

OpenAI has the skills-only 1.3.4 draft under Khadin Akbar Ventures. Revised uploads saved despite generic error responses; changed skills must finish their scans and the owner must confirm the six OpenAI attestations before review submission. No live OpenAI directory listing is claimed.

## Earlier agency candidate — 2026-10-03

Version 1.2.0 is prepared locally from the newer 179-workflow source, preserving its existing hardening and adding five agency/resource workflows. Public GitHub main was verified at 165 workflows during preparation; release v1.1.0 exists and PR #1 remains open. This local candidate has not changed public GitHub, directory availability, installed caches or the hosted Worker.

Bundles use the current canonical source identity `mobile-app-builder`. Before updating a legacy OpenAI record, inspect its actual registered internal name: a record named `expo-mobile-app-builder` requires a matching native update adapter, independently validated, rather than a silent canonical identity rename. No live portal publication status was verified for this candidate.

## Anthropic review candidate — 2026-10-03

Version 1.3.0 adds the Anthropic preparation workflow (189 total), directory metadata, regenerated mobile-development branding, local structural checks and pinned launcher guidance. Its native Claude payload is staged at the versioned distribution directory's `anthropic-source` folder. That tree is intended for an approved branch root; the mixed canonical source now exceeds 512 files and should not be submitted as the directory plugin folder. The native tree omits other host manifests, tests, hosted-service source and source-only release tooling while retaining readable runtime helpers and all workflows.

The owner must verify the candidate before source publication or submission. An authorized later publication must name the exact native branch/folder and read back its public commit and policy contents. Only then should the existing Anthropic submission, if one exists, be revalidated at that exact commit. No directory draft, webhook, submission, approval or live status has been changed or verified here.

## Public source release 1.3.1 — 2026-10-03

The canonical development source follows `main`; the native Claude payload follows `claude-release` at the repository root. Native release contents come from the checked package allowlist, including the README, policies, skills, roles, local user-facing helpers and selected artwork. Source-only build/release validators, other host manifests and hosted-service implementation are excluded from that branch. Both branches preserve repository identity; the native branch is the intended Anthropic source with an empty plugin path.

For direct Claude Code use, clone that branch and load its root with `--plugin-dir`. Portal validation must read the exact published native commit. The directory's listing/review/security result is independent of GitHub publication. Do not duplicate an existing repository/folder submission.
