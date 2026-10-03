# Handoffs and work ownership

## Task contract

Use the project's existing issue or planning system when present. A compact Markdown note is enough otherwise:

```text
Outcome: observable user behavior or decision
Owner role: role and actual executing agent/assistant
Owned paths: exact files or bounded module; shared paths named separately
Source location: approved checkout; branch and SHA when available
Inputs: artifact paths, version/date, assumptions, unresolved choices
Acceptance: checks or observations the receiving owner can reproduce
Dependencies: deliverable and owner; what can proceed independently
Authority: already authorized actions and any missing external authority
Deliverable: exact artifact or change expected
```

Assign paths before parallel work. One writer owns each file at a time. A module owner may request a shared-file change from the director rather than editing it concurrently. Every worker must know that other workers share the codebase, preserve their changes, and adapt to them. The director integrates after worker receipts; a worker's “done” is not integration proof.

## Git and checkout rules

Read the user's instructions and repository guidance first. A branch/worktree is an implementation choice, not a consequence of classifying an agency. Do not create a Git worktree merely because the user asks for a “classified worktree of skills and agents.”

If isolation is permitted and needed, use an existing suitable worktree or approved task worktree. If the project requires its root checkout or primary branch, respect that rule and assign disjoint files there. Inventory dirty files before editing, avoid sweeping cleanup, and serialize shared-file mutations. Do not delete branches/worktrees or hide changes to make the workspace appear clean.

## Evidence receipt

```text
From → to: producing role and receiving role
Task: outcome and acceptance verdict
Artifact/source: paths, branch, SHA, owned dirty changes
Evidence: command/observation, date, platform/environment, result
Limitations: missing tool/device/source, weak sample, unresolved decision
Next action: specific task the receiving role can execute
External state: not attempted / exact verified status
```

The receiving role checks input completeness before starting dependent work. Return an incomplete handoff with one precise missing item; keep independent tasks moving. Do not ask the user to approve routine reversible work already authorized by the task.

## Decision ledger

Record decisions that change scope or downstream assumptions: alternatives considered, chosen option, evidence, owner, date, and reversal cost. Separate observed data, third-party estimates, inference, and proposals. Research samples need source, date, retrieval method, sample size, locale/platform, and known selection bias. Device QA needs exact source/build identity and observed steps.

Keep only decision-relevant information. Do not copy raw transcripts, tokens, customer data, private account URLs, or proprietary screenshots into public handoffs.

## Permission continuity

Use the current session's explicit authorization for the same action and scope. A role change does not reset permission. Before an external action, check the latest scope and any repository gate; complete local preparation first so any needed approval addresses a concrete result. Research plans do not authorize paid Actor execution; release plans do not authorize upload or publication; ad drafts do not authorize spend or campaign activation.
