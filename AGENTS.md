# Public package rules

- Keep all examples credential-free and portable; never add `.env` values, signing material, personal paths, internal URLs, or account identifiers.
- Use the versioned Expo SDK 54 reference before changing mobile implementation guidance.
- Preserve iOS and Android parity unless a capability is explicitly platform-specific.
- Run `node scripts/audit-public-package.mjs .`, the skill validators, and package validation after changes.
- Do not submit, publish, deploy, upload binaries, create accounts, or change availability without explicit user authorization for that external action.
