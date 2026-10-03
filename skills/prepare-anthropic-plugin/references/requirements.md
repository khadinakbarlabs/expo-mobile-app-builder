# Anthropic requirements and recurring blockers

Verified against current primary documentation on 2026-10-03. Refresh before a release; the local checker is a conservative preparation gate, not Anthropic's complete validator or policy decision.

## Official sources

- [Manifest and directory fields](https://code.claude.com/docs/en/plugins-reference)
- [Publication workflow](https://code.claude.com/docs/en/plugins/publish)
- [Directory submission and source tracking](https://claude.com/docs/plugins/submit)
- [Directory pre-submission checklist](https://claude.com/docs/plugins/pre-submission-checklist)
- [Feature support by surface](https://claude.com/docs/plugins/platform-support)
- [Plugin structure and testing](https://claude.com/docs/plugins/build)
- [Directory policy](https://support.claude.com/en/articles/13145358-anthropic-software-directory-policy)
- [npm local/remote execution semantics](https://docs.npmjs.com/cli/v11/commands/npm-exec/)

The native plugin manifest contains the directory icon and documentation, support, privacy and terms URLs. Keep those fields out of marketplace entries. Claude Code before 2.1.281 can report those valid keys as unknown; validate with a compatible pinned tool, leaving the user's installation intact.

## Structural preparation

Use regular files with platform-safe names and exact component spelling. Reject symlinks, submodules, LFS pointers, OS files, credential artifacts, trailing dots/spaces, Windows device names and case-only collisions. Component paths stay inside the selected plugin folder. Inspect Git attributes at the repository root, above the folder and inside it for archive/content rewrites. Folder-path segments must use letters, digits, dots, hyphens or underscores.

Keep the GitHub archive below 50 MiB, unpacked repository below 256 MiB, repository entries below 10,000, and each plugin file below 5 MiB. Above 512 plugin files, text at or above 256 KiB, unsupported binaries, or image/font references from executable contexts can cause reviewer holds. Ship readable source and ordinary Markdown image references. Don't remove defensive security checks or disguise artwork paths just to suppress a finding; explain actual behavior for review.

Pin package launchers to exact versions. For an existing app, use its installed and locked toolchain; `npm exec --no --` declines missing-package installation. Stop on a missing tool and prepare an explicit compatible dependency change. Even a pinned external launcher can require reviewer attention because dependencies resolve later. No-lockfile or unpinned app dependency claims are not reproducibility proof.

Keep credential delivery and outbound destinations explicit. Do not bundle real secrets or silently forward an ambient environment credential. A skills-only package with no connector needs no invented MCP/userConfig configuration. For a real connector requiring a secret, use documented sensitive user configuration and validate every transport; don't copy a user's local environment into an arbitrary endpoint.

## Repeated failure patterns and repairs

| Symptom | Check and repair |
| --- | --- |
| Unknown directory keys locally | Check actual CLI version; use directory-aware validator. Preserve valid fields. |
| Package passes, portal reads old version | Compare exact GitHub branch commit with local candidate and portal fetched commit. Revalidate after approved publication. |
| ZIP fits, submitted source exceeds limits | Publish an approved native tree at a dedicated branch root or plugin folder. Count the actual portal folder/repository. |
| Could not validate repository | Inspect filename collisions, path case, Git attributes, archive sizes and connected-org GitHub access. |
| Name/update mismatch | Preserve registered identity; inspect existing record. Don't silently rename or create duplicates. |
| Scanner flags security checks or art | Review the reported lines, runtime bindings and outbound behavior. Give a factual explanation; don't obfuscate or declare warnings cleared without readback. |
| Host seems to ignore the team | Chat skips agents. Use portable skill role cards or test Cowork/Code with actual tool capabilities. |
| Research success without useful data | Inspect actual run/build, dataset, coverage, provenance and settled charges before claiming findings. |
| Expo device/build mismatch | Match app SDK, locked dependencies, native modules, running server and installed binary identity. Expo Go isn't proof for a custom native dev client. |
| Destructive prebuild breaks native work | Preserve changes, use the project's Git rules and authorization, and distinguish prebuild source from built/installed runtime. |
| Review tool fails | Keep the failure as a missing check; use an available reviewer when authorized. No fabricated independent review. |
| Retry duplicates submission or paid run | Check existing record/run first; resume it and preserve its identity before retrying. |

## Publication boundaries

The portal reads a GitHub repository, exact plugin folder and branch/tag. An eligible Claude plan, correct organization, connected GitHub push permissions and later public source are required. Explicit branch entry matters for slash-containing refs. Reuse the existing source submission when present. Contact verification and policy acknowledgments are owner decisions. Validation covers the fetched commit; a later push requires revalidation. Security scan, reviewer approval, owner publishing choices and live availability are distinct states.

Skills load across chat, Cowork and Code; agents load in Cowork and Code. Tool-dependent operations still require the actual host environment. Local structural checks don't measure workflow quality; run realistic examples and compare outputs before claiming those benefits.
