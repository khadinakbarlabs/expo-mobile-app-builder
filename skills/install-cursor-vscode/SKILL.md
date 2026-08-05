---
name: "install-cursor-vscode"
description: "Install and configure Cursor or VSCode for RN/Expo development with the right extensions and terminal-based coding-agent workflow. Use when the user says 'install cursor', 'set up vscode', 'best ide for react native', 'cursor vs vscode', or 'editor setup'."
---

# Install Cursor / VSCode

Choose the user's IDE. Cursor is a useful AI-native option built on VSCode.

## Cursor (recommended)

Download from cursor.com -> install. Then:

```bash
# CLI launcher
ln -s "/Applications/Cursor.app/Contents/Resources/app/bin/code" /usr/local/bin/cursor
# Now: cursor . opens current dir
```

## Required extensions (install via Cursor extensions panel)

| Extension | Purpose |
|---|---|
| ESLint | Lint TS/JS |
| Prettier | Format on save |
| Tailwind CSS IntelliSense | If using NativeWind |
| GitLens | Inline blame, rich diff |
| Expo Tools | Expo IntelliSense for app.json |
| Error Lens | Inline error display |
| GitHub Copilot OR Cursor's built-in AI | Pair programming |

## Settings (paste into Cursor settings.json)

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "typescript.preferences.importModuleSpecifier": "non-relative",
  "files.exclude": {
    "**/.git": true,
    "**/node_modules": true,
    "**/ios/Pods": true,
    "**/ios/build": true,
    "**/android/build": true,
    "**/.expo": true
  },
  "search.exclude": {
    "**/node_modules": true,
    "**/ios/Pods": true,
    "**/.expo": true
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

## Coding-agent workflow

Use the editor's integrated terminal to run the user's preferred coding agent. Give it the repository path and keep generated code, build credentials, and store-upload secrets out of shared editor settings.

## Why not Xcode for daily work

Xcode is for native iOS module work, signing, archive review. For RN/Expo daily dev, Cursor + terminal + iOS simulator is faster.

## Common gotchas

- ESLint needs project-local config; install in app: `pnpm add -D eslint @react-native/eslint-config`
- Prettier conflicts with ESLint? Add `eslint-config-prettier`
- Follow the editor or agent provider's current authentication guidance; never paste a provider key into project source or shared workspace settings
