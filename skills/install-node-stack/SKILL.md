---
name: "install-node-stack"
description: "Plan a safe Node.js, package-manager, and Expo development setup. Use when the user says 'install node', 'set up nvm', 'install pnpm', 'node version manager', or 'I need newer node'."
---

# Set Up the Node Stack Safely

Installing runtimes modifies the user's workstation and shell profile. Explain the selected toolchain first and wait for confirmation before executing any installation command. Never pipe a remote download directly into a shell.

## Expo SDK 54 baseline

- Use a currently supported Node 20.19+ runtime, then verify the project's exact Expo SDK compatibility.
- Use the package manager already approved for the project. Prefer `npx expo install` for Expo SDK-compatible dependencies.
- Keep runtime configuration local to the workstation; never place access tokens or private registry credentials in project source.

## Recommended installation paths

Choose one owner-approved package-manager or signed-installer path for the user's operating system:

| Tool | Safer default |
|---|---|
| Node version manager | A system package manager or the official release artifact after validating its published checksum/signature |
| pnpm | Corepack or the approved system package manager |
| Bun | The approved system package manager or a verified official release artifact |

For macOS users who have explicitly approved Homebrew, a typical local setup is:

```bash
brew install nvm pnpm bun
```

Follow the package manager's printed post-install instructions for shell configuration instead of copying profile changes blindly.

## Verify after installation

```bash
node --version
corepack --version
pnpm --version
bun --version
```

Pin a compatible runtime in a project-local `.nvmrc` only after confirming the project's toolchain. Then run `npx expo doctor` from the app root to catch SDK or native dependency drift.

## Safety checks

- Do not pipe a network download directly into a shell or use an unverified global installer.
- Review package-manager output before accepting shell-profile changes.
- Keep npm registry tokens in owner-controlled credential storage, never in `.npmrc` committed to a public app or plugin.
- Confirm before changing the default Node version, installing global packages, or editing shell startup files.
