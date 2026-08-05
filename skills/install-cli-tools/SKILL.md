---
name: "install-cli-tools"
description: "Plan an owner-confirmed iOS and Expo CLI toolchain without exposing account credentials or running remote installer scripts. Use when the user says 'install CLIs', 'install eas cli', 'install fastlane', or 'install ios cli tools'."
---

# Install iOS and Expo CLI Tools

These tools can alter a development machine or open provider login flows. Present the exact selected tools, their source, and their side effects before installing anything. Never pipe a network download into a shell.

## External action gate

Installing tools, running provider logins, creating credentials, and configuring EAS can change a machine or external account. Do not perform them until the owner confirms the selected tool, installation source, target account, and intended action.

## Common local tools

| Tool | Purpose | Safer installation boundary |
|---|---|---|
| EAS CLI | Expo build and submit tooling | Approved Node package manager |
| Fastlane | Apple automation | Approved system package manager |
| Sentry CLI | Source-map and release operations | Approved system package manager |
| Maestro | Mobile E2E testing | Official package-manager tap or verified release artifact |
| GitHub CLI | Repository operations | Approved system package manager; `gh auth login` needs owner confirmation |

For an explicitly approved macOS/Homebrew setup, install only the tools needed for the current project:

```bash
npm install -g eas-cli
brew install fastlane
brew install getsentry/tools/sentry-cli
brew tap mobile-dev-inc/tap
brew install maestro
brew install gh
```

Run provider logins, credential setup, `eas credentials`, builds, and uploads only after a separate confirmation names the target account and intended action.

## Verify

```bash
eas --version
fastlane --version
sentry-cli --version
maestro --version
gh --version
```

## Credential handling

- Never save Apple `.p8` files, EAS tokens, Sentry tokens, or provider keys in this plugin, a public repository, shell history, or screenshots.
- Use the provider's owner-controlled login or secret-storage flow. Do not ask a user to paste a credential into chat.
- Prefer least-privilege, project-scoped credentials and rotate/revoke them when access changes.
