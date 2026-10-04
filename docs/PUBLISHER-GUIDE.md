# Publisher guide

Use a canonical source checkout on `main` for contribution, validation and packaging. The installed native branch and release ZIPs intentionally exclude tests, publisher tooling and this guide; those packages include the user workflows and their required local helpers.

## Required source checks

```bash
node --test tests/*.test.mjs
python3 -m unittest discover -s tests -p 'test_*.py'
node scripts/build-agency-catalog.mjs --check
node scripts/validate-agency.mjs
node scripts/validate-release.mjs
node scripts/audit-public-package.mjs .
python3 scripts/package-agency.py
```

Packaging stages the exact Claude tree and rejects unresolved installed helper commands, local module imports, backtick resource routes and manifest component paths. The resulting `component-inventory.json` records every shipped file and discovered static component outside the installed tree. This report helps audit the payload; Anthropic runs its own inventory and review.

## Verify exact Claude discovery

After packaging, substitute the actual release version below:

```bash
node scripts/verify-claude-inventory.mjs dist/1.3.9/anthropic-source
npx --yes @anthropic-ai/claude-code@2.1.287 plugin validate dist/1.3.9/anthropic-source --strict
node scripts/validate-openai-upload.mjs dist/1.3.9/mobile-app-builder-1.3.9-openai.zip
```

The pinned Claude inventory command lists components without starting a model session. Its output must match every catalog skill and specialist; successful manifest validation alone does not prove discovery. Version 2.1.287 listed zero agents for the prior inline plugin with explicit manifest agent files; default `agents/` discovery listed all 16. Keep the standard layout and retain the host check in CI.

The package's image validator is separate from text/component inspection. Also decode both selected images fully before release. Any unresolved local reference or host component mismatch blocks release.

## Detailed validation gates

Run the dependency-free package gates from the repository root:

```bash
node scripts/validate-release.mjs
node scripts/audit-public-package.mjs .
node scripts/verify-public-mcp.mjs https://app-builder.khadinakbar.dev/mcp
```

### Release validator

`validate-release.mjs` checks the package shape, including:

- required public manifests and policy documents;
- normalized package names across ecosystems;
- the exact public display name;
- the OpenAI display-name length limit;
- valid skill frontmatter and directory/name agreement;
- required OpenAI skill metadata;
- standalone relative-link safety;
- parity between the root and standalone scaffold planners;
- absence of symbolic links in the public package.

`validate-openai-upload.mjs` is the strict OpenAI skills-only gate. It checks the
ZIP itself, including archive integrity, root/manifest unambiguity, compressed
and extracted size limits, path traversal and collision rules, supported
metadata limits, normalized starter prompts, legal URLs, brand assets, the
skills-only MCP/app boundary, skill frontmatter, and `agents/openai.yaml`
metadata. It should be run against the exact ZIP selected in the upload dialog.

### Public-package audit

`audit-public-package.mjs` checks the current tree for public-release hazards and broken relative Markdown links. It is intentionally safe to run in CI because findings identify the rule and path without printing the matching value.

### Contributor release gate

Before publishing a new package version, contributors should also:

1. validate every changed skill with the relevant plugin/skill validator;
2. run a secret scanner over the intended public tree;
3. inspect the git diff for accidental private content;
4. build the distributable archive from a clean, allowlisted staging directory;
5. extract the archive into a temporary directory;
6. rerun validation and the public audit against the extracted package;
7. inspect the archive file list, size, and checksum;
8. verify the pushed commit and CI result before describing the release as public.

The [release checklist](../RELEASE-CHECKLIST.md) is the canonical operational reference.

## Optional hosted adapter

The hosted Worker is a separate product surface. Read [Cloudflare deployment](CLOUDFLARE-MCP.md) and verify it only when an authorized task changes that service. It is not connected by the installed Claude manifest.

Follow the [release checklist](../RELEASE-CHECKLIST.md) and [contribution rules](../CONTRIBUTING.md). Reuse pending directory submissions. Verify the exact fetched native commit and current review outcome before claiming cleared findings or live publication.
