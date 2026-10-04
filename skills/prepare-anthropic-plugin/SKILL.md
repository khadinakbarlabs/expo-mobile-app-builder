---
name: prepare-anthropic-plugin
description: "Prepare a Claude plugin's Anthropic listing, brand assets, policy links, native manifest, local preflight and owner review pack before submission. Use when finalizing a plugin for the Claude directory or diagnosing recurring publication blockers."
---

# Prepare an Anthropic plugin

Produce a concrete package the owner can verify before any submission. This workflow works independently of the rest of Mobile App Builder. Use the current official [requirements and blocker playbook](references/requirements.md); refresh the linked documentation before every release because schemas and directory rules change.

## Inspect and plan

1. Locate the actual plugin root and installed/public identity, version, repository, branch and dirty changes. Preserve the established slug and artwork. Inspect prior validation reports and the exact source commit; do not assume a stale default branch, old ZIP or installed cache represents the candidate.
2. Inventory skills, agents, scripts, hooks, connectors and all outbound behavior. Record what runs automatically, what needs a user action, and any provider costs/data access. Do not bundle hosted-service source, signing files or credentials in a skills-only native payload. Removing a required connector changes behavior and needs an explicit product decision.
3. Plan the final native payload and a small owner review pack. Use [the reusable review template](templates/review-pack.md). Keep unknown publisher facts, compliance-contact verification and legal attestations pending for the owner; never invent them.

## Create the listing and branding

4. Set the real stable name, explicit version, display name, supported description, publisher, license and repository in the native manifest. Add the icon and HTTPS documentation, support, privacy and terms links to the plugin manifest only. The marketplace schema has a different field set. Preserve other hosts' original identities and use their separate native packages.
5. Reuse suitable original art. If art is missing or explicitly being replaced, use the host's image-generation capability to create an actual distinctive icon, then inspect it on light and dark backgrounds at small size. Do not copy provider logos or imply affiliation. If generation is unavailable, finish metadata and a concrete art brief, and report the asset as pending. A prompt is not an icon.
6. Prepare a brand guide with original symbol/wordmark usage, palette, typography, legibility, clear space and exports. A square PNG at least 256 pixels and below 5 MiB is this workflow's recommended listing export, not a claimed universal Anthropic dimension requirement. Use the selected artwork as both icon and logo where appropriate; do not add unsupported logo keys to Claude's manifest. Show actual art in the README using Markdown image syntax, with contained paths.
7. Open every actual public URL without private authentication and inspect the promised content. A 200 response, guessed endpoint or unpublished local policy is insufficient. Record date, redirect and content agreement with the candidate. Draft corrected pages locally if needed and retain their publication as a separate gate. Do not create a website or contact channel that the owner did not authorize.

## Check the exact native package

8. Use the host's file tools to inventory the intended native folder against the structural preparation section in [requirements](references/requirements.md): regular contained files, exact component routes, safe filenames, directory limits, README/license, listing URLs, contained icon metadata and pinned launchers. Inspect all candidate instructions and executable code for credential access and outbound behavior. Skip credentials and signing artifacts by filename and reject them from the payload; do not read their values into a report. Record explicit findings and checks still pending.

This installed workflow contains instructions and templates, without a bundled filesystem scanner. An optional [publisher structural checker](https://github.com/khadinakbarlabs/expo-mobile-app-builder/blob/main/scripts/check-anthropic-package.mjs) remains in the canonical source repository for verified publisher checkouts; it is also a mandatory gate in this project's packaging pipeline. It checks text, paths, sizes and launchers; it does not inspect image bytes, fetch URLs, scan all secrets, execute skills, validate every native component schema or inspect Git attributes above the target folder. Run separate source-only media validation, a full image decoder, a credential audit and the current native validator before release; review runtime components separately. Keep publisher filesystem/media scanners out of installed commands and hooks.

9. Use a directory-aware Claude Code validator; the five directory fields require version 2.1.281 or later. As verified 2026-10-03, an isolated exact validator can be run without replacing the user's global installation:

```sh
npx --yes @anthropic-ai/claude-code@2.1.287 plugin validate ./candidate-plugin --strict
```

This downloads the explicitly pinned validator; read authorization and network scope first. If unavailable, retain the package and report the missing validation. Never remove valid metadata to satisfy an older validator, hide scanner patterns, or treat a failed reviewer tool as an independent review.

10. Build the ZIP from an explicit allowlist. Check the exact archive and extracted folder, component paths, policy text, file count, hashes and catalog freshness. Keep the native Claude source tree ready for a dedicated repository-root branch or approved plugin subfolder. The directory reads GitHub source, not a local ZIP. Publishing a mixed canonical source tree can exceed the directory limits even if the native ZIP fits.
11. Test the installed behavior on the surfaces the owner intends to support. Skills load in chat, Cowork and Code; agents load in Cowork and Code, and chat ignores them. CLI/device tasks require executable tools in the active environment. If only structural tests ran, label behavioral/evaluation cases as unrun. Record real prompts, observed outcomes, failures and surface/version; don't invent scores or recordings.

## Owner review and later submission

12. Deliver the listing, visible artwork, policy/link evidence, archive hashes, native folder and test receipt. Separate source readiness, user verification, public source publication, host behavior, portal validation, security scan, reviewer approval and live status.
13. Wait for the owner's verification when requested. Creating a draft, connecting accounts, installing webhooks, submitting, publishing, sending reviewer messages or changing availability are distinct external actions. Continue only within explicit current authorization. Reuse an existing submission for the same repository/folder; never create a duplicate to work around a warning. On a later authorized portal visit, verify organization, GitHub push access, exact branch and fetched commit; revalidate the same draft after source changes. Legal attestations and compliance contact verification belong to the owner.

Finish with the prepared artifact and the next real gate. A local pass does not mean Anthropic accepted or published the plugin.
