---
name: "eas-build-profiles"
description: "Configure EAS build profiles (development, preview, production) with environment variables and resource classes. Use when the user says 'EAS build profiles', 'build configurations', 'env vars EAS'."
---

# EAS Build Profiles

Three default profiles + how to extend them.

## Credential and external action gate

Editing a local profile is safe. Creating EAS environment variables, reading or storing credentials, starting a cloud build, or changing a project setting is external and may incur cost. Obtain owner confirmation of the exact EAS account, project, environment, variable classification, and action first. Never place a server secret in an `EXPO_PUBLIC_*` variable or commit it to `eas.json`.

## Default 3 profiles
- **development** — `developmentClient: true`, `distribution: internal`. Dev tools enabled. Install dev client on physical iPhone.
- **preview** — `distribution: internal`. Production-style binary for internal QA. Skips TestFlight processing wait.
- **production** — store-bound. No dev client, release config, signed with distribution cert.

## Extending base profiles
```json
{
  "build": {
    "base": {
      "node": "20.19.0",
      "ios": { "resourceClass": "m-medium" },
      "env": { "EXPO_PUBLIC_API_URL": "https://api.example.com" }
    },
    "development": {
      "extends": "base",
      "developmentClient": true,
      "distribution": "internal",
      "channel": "development",
      "ios": { "simulator": true },
      "env": {
        "EXPO_PUBLIC_API_URL": "http://localhost:3000",
        "APP_VARIANT": "development"
      }
    }
  }
}
```

## Resource classes (iOS)
- `m-medium` — default, ~8 min average build
- `m-large` — paid tier, faster, for large apps
- Use `m-large` only if `m-medium` is bottlenecking your dev cycle

## Environment variables — single source of truth
Use **EAS Environment Variables** (web dashboard or `eas env:create`), not `eas.json`. Scoped to development/preview/production. Create them only after the owner approves the project and variable classification.

```bash
eas env:create --scope project --environment production --name SENTRY_DSN --value "<owner-managed-value>"
```

Three visibility levels:
- **Plaintext** — visible in UI/logs
- **Sensitive** — hidden in UI, readable in build
- **Secret** — only readable inside build job

## Build cache
`eas build --clear-cache` invalidates dependency cache. Use it only after approval for the associated build; cache duration and cost vary by plan and project.

## Reference
`references/02-eas-pipeline.md`
