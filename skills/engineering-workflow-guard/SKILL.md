---
name: "engineering-workflow-guard"
description: "Keep existing mobile-app repositories clean, attributable, secure, and testable across AI sessions, Git branches, worktrees, and simulator builds. Use for implementation, debugging, code-health, native-build, or workflow-recovery work; not for pure product research."
---

# Engineering workflow guard

Use this guard before changing an existing mobile app. The goal is not a cosmetically clean Git status; it is a codebase where every change has an owner, purpose, test result, and recoverable source location.

## Non-negotiable invariants

- Preserve existing work. Never use reset, checkout, clean, stash-drop, branch deletion, force-push, or broad file replacement to make a repository look clean without explicit owner approval and an exact target.
- Follow explicit user and repository rules for checkout, branch, commit, and integration strategy. A project may require direct work on its primary branch; do not invent a conflicting branch or worktree requirement. If permitted and useful, isolate concurrent writers in task worktrees. Otherwise assign disjoint files in the approved checkout and serialize shared-file changes. The word “worktree” in an agency organization does not authorize creating a Git worktree.
- One task has one dominant outcome, one owner, one approved source location, and one completion receipt. Split unrelated changes instead of bundling them into a convenient large commit.
- A commit is a saved checkpoint, not proof that a feature reached `main`; a merge is not proof that it is backed up remotely; a successful build is not proof that the installed simulator uses the intended source.
- Never expose credentials, signing material, private user data, or production secrets in source, prompts, logs, fixtures, screenshots, generated artifacts, or commit messages.

## Start with a read-only baseline

Before editing, inspect and report:

1. Repository root, current branch, HEAD SHA, tracking remote, and ahead/behind state.
2. Changed, staged, and untracked paths in the current checkout.
3. Existing worktrees, their branch or detached SHA, and their dirty state.
4. Relevant stashes and local commits that are not in the intended integration branch.
5. The app's package manager, test, lint, typecheck, native-build, and platform-smoke commands.
6. Any active Metro process, installed simulator/emulator app identity, and current build provenance when native QA is involved.

If the repository is already messy, enter **recovery mode**: inventory the separate batches and explain their likely ownership and risk before touching unrelated files. Do not blindly merge, delete, or combine them. For an urgent fix, use the source location allowed by user and repository policy, own a narrow file boundary, and leave unrelated batches intact.

## Define a task contract

Before implementation, state a compact contract:

```text
Outcome: what user-visible behavior changes.
Scope: owned files or module boundary.
Acceptance: observable behavior plus tests.
Risk: the main security, data, native, or regression concern.
Branch/worktree: exact location of the work.
Out of scope: related work deliberately not changed.
```

Keep a unit small enough to review and verify independently. If a task changes data, authentication, payments, permissions, playback, notifications, navigation, or a native boundary, explicitly identify the affected contract and its failure behavior.

## Implement deliberately

1. Work from the approved source location and ownership boundary. A dirty checkout can be used when project policy requires it; distinguish inherited changes from your edits and record their effect on provenance.
2. Prefer a focused behavior test before or alongside a bug fix or feature. Extend regression coverage for the exact failure that motivated the change.
3. Keep modules and functions focused. Preserve typed boundaries, immutable updates where appropriate, explicit error handling, and accessible loading, empty, error, offline, resume, and platform states.
4. Validate user input and authorization on the correct trust boundary. Parameterize database access, avoid leaking internals in errors, use approved secret storage, and apply rate limits where an endpoint or paid resource needs them.
5. Do not mix formatting sweeps, dependency upgrades, generated files, product experiments, or unrelated cleanup into the same task unless the user explicitly asks for that combined scope.

## Verify in layers

Run the smallest relevant checks first, then broaden according to risk:

1. Diff review: inspect changed files and run whitespace validation.
2. Static checks: formatter, lint, typecheck, and dependency/platform compatibility checks.
3. Behavior checks: focused unit or integration tests for the changed contract and its error path.
4. Platform checks: iOS and Android smoke tests when shared mobile behavior, native code, permissions, navigation, rendering, or purchase flows are affected.
5. Release checks: the repository's full release command, security/privacy review, and real-device or provider checks when preparing a release.

Report failures truthfully. A passing local test does not prove a cloud deployment, store upload, installed binary, paid entitlement, or production service outcome.

## Commit and integrate safely

- Review the exact diff and ensure it contains one coherent intent before committing.
- Use a conventional, outcome-based commit message when the repository uses conventional commits.
- Do not commit secrets, local build products, unrelated untracked files, or another task's changes.
- Before integration, verify the repository’s required source baseline, required checks, and target-branch drift. If user policy permits inherited dirty changes, account for them explicitly rather than silently cleaning them.
- Integrate or push only when authorized for this task and consistent with the repository workflow. Use the project’s integration branch, which may or may not be `main`. Do not create branches, merge, or push merely because this skill lists those operations.
- Authorization and user preferences persist across the session. Before asking for commit, merge, push, or release permission, check whether the user already authorized that same action and scope. If authority is missing, prepare the concrete reviewable result first, leave work intact, and request only the missing authorization. Never imply that a local commit is already merged or pushed. External publishing, submission, upload, paid runs, and production changes require authority for that external action; build or review authority alone does not supply it.

## Native build and simulator provenance

Before building for a simulator, emulator, device, TestFlight, Play, or production:

- for a release candidate, use the repository’s required source baseline and record branch, full SHA, dirty state, and any approved exception; for local development QA, record the exact SHA plus owned dirty changes without claiming a clean release candidate;
- record version/build number, build time, build command/profile, platform and target device, and result;
- give QA devices meaningful names, for example `App Main QA · main · 1a2b3c4`, rather than generic names such as `QA` or `latest`;
- do not infer a source branch from an app name or version number alone; inspect embedded build metadata or the build ledger;
- keep one active purpose per QA device and do not overwrite a useful test state without confirming whether it must be preserved.

If a build fails, capture the first actionable failure signature, source SHA, and environment. Do not label the device updated unless installation completed and the installed app identity was read back.

## Completion receipt

End every implementation task with a short receipt:

```text
Task: <outcome>
Branch/worktree: <name and path>
Source: <full SHA; clean or dirty>
Changes: <files and behavior>
Verification: <commands and pass/fail results>
Integration: <uncommitted | committed SHA | merged to main | pushed remote>
Build/QA: <not run, or exact platform/device/build evidence>
Remaining risk or owner decision: <one clear item, if any>
```

The receipt is the handoff between humans and agents. It prevents a future session from mistaking an uncommitted experiment, a local-only commit, or an old simulator binary for the current product.
