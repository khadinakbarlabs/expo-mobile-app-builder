# iOS and Android store readiness

Treat store release as an evidence review, not a final build command. Apple and Google policies, technical requirements, and review practices can change; verify the current official source immediately before a submission.

## Cross-platform preflight

- Confirm the shipped binary's actual version and build number/version code match the metadata and release notes.
- Test a clean install, update path, login/logout if applicable, offline/error states, permission handling, subscription restoration, account deletion, and accessibility.
- Audit data collection, third-party SDKs, privacy disclosures, support link, terms, privacy policy, and content moderation responsibilities.
- Verify production URLs, deep links, icon/splash assets, screenshots, and localization where claimed.
- Keep a redacted build and test evidence bundle; exclude all secrets and signing material.

## Platform-specific cautions

- For iOS, verify current App Store Connect, privacy, account, and review guidance.
- For Android, verify current Play Console, target API, Data safety, testing-track, and policy guidance.
- Do not present a cached threshold, policy number, or approval rate as current without live primary-source verification.

## Approval gate

Before a build upload, store submission, staged rollout, or public release, ask for the exact account, artifact, track/region, and owner confirmation. Re-check the selected destination immediately before the action.
