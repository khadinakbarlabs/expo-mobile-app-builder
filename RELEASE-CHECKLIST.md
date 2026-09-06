# Public release checklist

## Local package

- [ ] Run `node scripts/validate-release.mjs` and `node scripts/audit-public-package.mjs .`.
- [ ] Run `node scripts/verify-public-mcp.mjs <mcp-url>` after deployment and record the returned version and endpoint.
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
- [ ] Supply exactly five positive and three negative reviewer cases.
- [ ] Obtain an explicit owner instruction: `SUBMIT FOR REVIEW`.
- [ ] After review approval, obtain a separate explicit instruction before publishing.
