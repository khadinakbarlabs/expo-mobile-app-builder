# Security policy

## Supported version

Security fixes are applied to the latest published release.

## Report a vulnerability

Do not open a public issue containing a credential, private key, token, signing artifact, customer data, or reproduction steps that could enable unauthorized access.

Use GitHub's private **Report a vulnerability** flow:

https://github.com/khadinakbarlabs/expo-mobile-app-builder/security/advisories/new

Include the affected release, file path, impact, and a safe reproduction outline. Redact live values and rotate any credential that may have been exposed before reporting it.

## Package safety model

- The package is static and has no hosted backend, telemetry, account system, remote executor, or install-time hook.
- `scripts/audit-public-package.mjs` blocks common secret patterns, credential artifacts, private source markers, local absolute paths, and unsafe network-to-shell installers.
- Provider credentials remain in owner-controlled secret storage and must never enter documentation, source control, test fixtures, screenshots, issue reports, or logs.
- Builds, uploads, submissions, publishing, pricing changes, and paid activations require a user-confirmed target and authorization.
