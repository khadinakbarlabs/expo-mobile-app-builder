# Public release checklist

## Local package

- [ ] Run `node scripts/validate-release.mjs` and `node scripts/audit-public-package.mjs .`.
- [ ] Validate every skill frontmatter and referenced resource.
- [ ] Install at least one skill with the public Skills CLI and audit every skill as a standalone directory.
- [ ] Run the Plugin Creator and Codex Plugin Builder validators.
- [ ] Create and round-trip validate the root-layout ZIP.
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
