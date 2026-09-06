# Cloudflare MCP deployment

The `cloudflare/` directory is a small, stateless MCP adapter for the Mobile App Builder skill library. It exposes planning, research, metadata validation, private-build handoff, and store-submission checklist tools over Cloudflare Workers Streamable HTTP.

## Public boundary

The Worker is intentionally credential-free. It does not run EAS, access Apple Developer or Google Play accounts, sign binaries, upload artifacts, or accept provider tokens. Those actions belong in a separately authenticated runner after an owner-approved handoff. The public tools return plans and drafts only.

The optional `OPENAI_APPS_CHALLENGE` Worker secret is reserved for a future ChatGPT Apps verification flow. It is not required for the public MCP tools and must never be committed to source.

## Deploy with Wrangler

From this directory:

```bash
npm install
npx wrangler login
npx wrangler deploy
```

The default Worker name is `mobile-app-builder`. The primary public MCP endpoint is `https://app-builder.khadinakbar.dev/mcp`; `/health` is a non-MCP health check. The original `workers.dev` endpoint remains available as a fallback. New clients should use Streamable HTTP. The older SSE transport is not implemented.

Before a release, run the repository checks from the package root:

```bash
node scripts/audit-public-package.mjs .
node scripts/validate-release.mjs
node scripts/verify-public-mcp.mjs https://app-builder.khadinakbar.dev/mcp
```

The verifier performs a credential-free production smoke test. It confirms the
health endpoint, MCP handshake, six-tool inventory, explicit annotations,
schemas, idempotent results, and credential-redaction boundary. It is not a
load test and it does not execute builds, call Expo, or contact Apple or Google.

## Tool contract

| Tool | Purpose | Side effects |
| --- | --- | --- |
| `get_mobile_builder_capabilities` | Discover Expo, platform, lifecycle, and credential-boundary support | None |
| `research_mobile_app_opportunity` | Create an official-source-first research brief | None |
| `plan_expo_app` | Produce an implementation and release plan | None |
| `validate_expo_project_metadata` | Check metadata for Expo alignment and credential-shaped fields | None |
| `prepare_cloud_build` | Create a private-runner handoff | No build or credential access |
| `prepare_store_submission` | Draft App Store and Google Play checklists | No upload or submission |

## Private runner extension

When real builds are needed, keep them behind an authenticated service such as a private CI workflow or EAS project. Pass an opaque project/revision reference to that runner rather than credentials to this Worker. Add user-scoped authorization before exposing any tool that can mutate a project, spend provider credits, sign a binary, upload an artifact, or submit to a store.
