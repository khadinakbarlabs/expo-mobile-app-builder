# EAS build and release boundary

EAS is a user-owned build and delivery surface. This plugin can help validate configuration and prepare commands, but it never signs in, creates credentials, starts remote builds, submits binaries, or changes release channels by itself.

## Safe progression

1. Validate app configuration, package versions, runtime/update choices, platform identifiers, icon assets, permissions, and test results locally.
2. Ask the owner to name the EAS project, build profile, platform, distribution target, and account before any remote action.
3. Prefer provider-managed credentials when that matches the owner's security policy; never print, save, or embed the underlying credential material in the project.
4. Review the resulting build artifact, version, signing identity, and release target before proposing an upload.
5. Treat TestFlight, Play testing tracks, store submission, phased rollout, and production publication as separate confirmed actions.

## Configuration guidance

Keep development, internal-test, and production profiles separate. Document whether an Android internal build is an APK and whether a Play release is an AAB. Keep update channels and runtime compatibility explicit; native changes require a compatible new binary, not an unsafe over-the-air update assumption.

## Evidence to retain

Keep redacted build logs, final app version/build identifiers, test results, and a human-readable release checklist. Do not retain authentication tokens, signing keys, `.p8`, `.p12`, `.jks`, or keystore files in the repository.

Read the [current Expo EAS documentation](https://docs.expo.dev/eas/) before issuing provider-specific commands because account flows and service behavior can change.
