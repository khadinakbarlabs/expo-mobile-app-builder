# Public release checklist

## Local package

- [ ] Run `node scripts/validate-release.mjs` and `node scripts/audit-public-package.mjs .`.
- [ ] Run catalog freshness, agency validation, JavaScript and Python regression tests; verify all skills independently.
- [ ] If separately changing the hosted MCP, run `node scripts/verify-public-mcp.mjs <mcp-url>` after authorized deployment and record its version and endpoint.
- [ ] Validate every skill frontmatter and referenced resource.
- [ ] Install at least one skill with the public Skills CLI and audit every skill as a standalone directory.
- [ ] Run the Plugin Creator and Codex Plugin Builder validators.
- [ ] Create and round-trip validate the root-layout ZIP.
- [ ] Run `node scripts/validate-openai-upload.mjs <exact-openai-zip>` against the exact ZIP selected in the OpenAI uploader; confirm the strict skills-only root, manifest, metadata, archive, asset, and size gates pass.
- [ ] Re-scan the final archive and Git history for credential artifacts and private paths.
- [ ] Confirm all listing copy matches actual package behavior and does not promise store approval or current policy facts.

## External directory gate

- [ ] Verify the public repository and stable HTTPS website, privacy, terms, and support URLs.
- [ ] Select a verified OpenAI developer or business identity.
- [ ] Choose approved countries or regions.
- [ ] Upload the final skills-only archive and run portal checks.
- [ ] For a new MCP app review, supply exactly five positive and three negative cases plus a verified demo. Skills-only bundles require no MCP cases, demo or reviewer credentials.
- [ ] Obtain an explicit owner instruction: `SUBMIT FOR REVIEW`.
- [ ] After review approval, obtain a separate explicit instruction before publishing.

## Anthropic candidate checks

- [ ] Owner verifies the current brand, listing and exact package before external actions.
- [ ] Publish the approved native source tree rather than the mixed canonical root; verify exact public commit and current policy contents.
- [ ] Validate the exact native tree with Claude Code 2.1.281+ (current pinned check: 2.1.287).
- [ ] Confirm plugin file count, per-file limits, platform-safe names, paths, Git attributes, supported binaries and no credential artifacts.
- [ ] Keep publisher filesystem scanners, catalog generation and media inspection source-only. Verify the installed agency browser against its prepared catalog and the source-only checks against the exact native tree.
- [ ] Load intended Claude surfaces and record actual behavior/evaluation evidence.
- [ ] Reuse the existing source submission, verify organization/GitHub push access and revalidate the fetched commit.
- [ ] Owner verifies compliance contact and completes attestations; portal validation, security scan, reviewer approval and live publication remain separate.
