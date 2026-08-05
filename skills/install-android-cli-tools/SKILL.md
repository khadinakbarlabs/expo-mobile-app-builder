---
name: "install-android-cli-tools"
description: "Plan an owner-confirmed Android and Expo CLI toolchain without exposing service-account credentials or running remote installer scripts. Use when the user says 'install android clis', 'install bundletool', 'install adb', or 'android command line tools'."
---

# Install Android and Expo CLI Tools

These tools can modify the workstation, create provider sessions, or access app-store accounts. Explain the selected tools and wait for user confirmation before running installs or logins. Never pipe a remote installer response into a shell.

## Common local tools

| Tool | Purpose | Safer installation boundary |
|---|---|---|
| Android platform tools | `adb` and device debugging | Android Studio or official SDK Manager |
| Bundletool | Inspect and install AAB-derived artifacts | Approved system package manager or verified release artifact |
| EAS CLI | Expo build and submit tooling | Approved Node package manager |
| Firebase CLI | Firebase administration | Approved Node package manager |
| Maestro | Mobile E2E testing | Official package-manager tap or verified release artifact |
| Fastlane / Sentry / GitHub CLI | Automation and release support | Approved system package manager |

For an explicitly approved macOS/Homebrew setup:

```bash
brew install bundletool fastlane scrcpy
brew install getsentry/tools/sentry-cli
brew install revenuecat/rc/rc
brew tap mobile-dev-inc/tap
brew install maestro
npm install -g eas-cli firebase-tools
```

Install Android Studio through its official installer or SDK Manager when the project needs emulators, `adb`, or native build tools.

## Verify

```bash
adb --version
bundletool version
eas --version
firebase --version
fastlane --version
maestro --version
```

## Google Play service account boundary

Automated Play submissions can use a least-privilege service account, but its JSON key is a secret.

- Create or authorize it only after the account owner confirms the target Play Console account and intended release track.
- Keep the JSON file outside the repository and plugin source, or in protected CI secret storage.
- Add its filename pattern to the app's `.gitignore`; never commit it in `eas.json`, a fixture, a screenshot, or chat.
- Verify the current EAS Submit configuration schema before referencing a local secret file path.

First upload, tester invitations, release promotion, production rollout, and publishing are each separate confirmation gates.
