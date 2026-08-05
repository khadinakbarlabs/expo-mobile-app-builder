# Contributing

1. Keep changes portable across ChatGPT, Codex, Claude Code, Cursor, and Agent Skills-compatible hosts, and preserve the skills-only architecture unless an owner-approved plan says otherwise.
2. Use the [Expo SDK 54 reference](docs/references/01-expo-sdk-54.md) before changing versioned Expo guidance.
3. Do not add personal paths, account IDs, credentials, signing artifacts, private logs, or vendor-specific secrets.
4. Keep every skill trigger-focused, concise, and host-agnostic. Use an external action only with an explicit confirmation boundary.
5. Run `node scripts/validate-release.mjs`, the public-safety audit, plugin validation, and ZIP round-trip validation before proposing a release.

New public directory or store publication remains a separate owner action, even after local checks pass.
