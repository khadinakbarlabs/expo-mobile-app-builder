---
name: "eas-submit-testflight"
description: "Prepare a controlled iOS build and TestFlight upload with EAS Submit. Use when the user asks to submit an iOS build to TestFlight."
---

# EAS Submit (TestFlight)

`eas submit -p ios` uploads a finished `.ipa` to App Store Connect. It is an external account action, not a local validation step.

## External action gate

Do not run an EAS build, access App Store Connect credentials, or upload an `.ipa` without explicit owner confirmation. Confirm the Apple developer account, App Store Connect app, bundle identifier, selected build, intended testers, and whether the action is a build or an upload. Building and uploading require separate confirmation.

## Pre-flight (must all pass)
- [ ] `MARKETING_VERSION` in app.json correct (semver)
- [ ] Built with the SDK/Xcode version currently required by Apple
- [ ] PrivacyInfo.xcprivacy present
- [ ] All 3rd-party SDKs ship PrivacyInfo + signature
- [ ] No deprecated APIs / build warnings
- [ ] Tests + lint pass

## Build then submit after confirmation
```bash
# Build
eas build --platform ios --profile production --non-interactive --no-wait

# Wait for build to finish (~10-25 min), or:
# eas build --platform ios --profile production  # interactive, waits

# Submit latest build to TestFlight
eas submit --platform ios --profile production --latest --non-interactive
```

## Versioning gotchas
- `CURRENT_PROJECT_VERSION` (build number) MUST monotonically increase. EAS handles this with `autoIncrement: "buildNumber"` in eas.json.
- Changing `MARKETING_VERSION` triggers re-review for external testers
- Submit < 6 builds per 24 hours — Apple's hard cap

## ASC setup (eas.json)
```json
"submit": {
  "production": {
    "ios": {
      "ascApiKeyId": "<owner-managed-key-id>",
      "ascApiKeyIssuerId": "<owner-managed-issuer-id>",
      "ascApiKeyPath": "<path-outside-the-repository/AuthKey.p8>",
      "ascAppId": "<owner-managed-app-id>"
    }
  }
}
```

Keep the `.p8` file outside the repository or in an approved CI secret store. Never commit it, paste it into a prompt, or expose it in logs.

## After upload
Apple processes ~10-30 min. Then:
1. **Internal testing** — instant, up to 100 ASC team members. No Beta Review.
2. **External testing** — first build per version requires Beta Review (~24h). Then up to 10,000 testers via email or public link.
3. **App Store submission** — a separate, explicitly confirmed step in ASC. Run `prep-app-store-listing` + `write-review-notes` first.

## Build expiry
TestFlight builds expire 90 days after upload. Plan rolling cadence so you always have a build <90 days old.

## Reference
`../../docs/references/02-eas-pipeline.md`
