---
name: "prepare-chatgpt-app-submission"
description: "Prepare a reviewed chatgpt-app-submission.json draft for a ChatGPT Apps MCP server by delegating to OpenAI Developers' official chatgpt-app-submission skill, checking tool annotations, test coverage, sensitive inputs, and submission gates. Use when a user asks to submit an MCP server to ChatGPT, fill the ChatGPT Apps form, generate submission JSON, or add Codex-managed OpenAI app submission support."
---

# Prepare a ChatGPT App submission

Use this skill as the Codex-facing guardrail around OpenAI Developers' official
`chatgpt-app-submission` skill. The official skill understands the current
`chatgpt-app-submission.json` schema; this wrapper makes sure it is run against
the right repository, reviewed before upload, and never mistaken for a generic
static plugin or a permission to submit.

For current platform terminology and availability, verify the official [Plugins
in ChatGPT and Codex](https://help.openai.com/en/articles/20001256) guidance and
[Apps SDK](https://developers.openai.com/apps-sdk/) documentation. OpenAI's
current directory model packages new app submissions inside plugins.

## Preconditions

1. Inspect the current working directory before writing anything.
2. Confirm that it is an actual ChatGPT Apps MCP server repository. Look for a
   server entry point, MCP SDK dependency, `.mcp.json`, tool registrations,
   tool descriptors, resource/widget metadata, or a documented MCP endpoint.
3. If the repository is only a static Agent Skills/plugin package, stop. Do not
   generate an empty or invented `tools` object. Report that a ChatGPT Apps
   submission requires a real MCP server and ask for the correct MCP repository
   or an approved plan to build one.
4. Keep the generated JSON in a temporary or owner-selected submission staging
   directory by default. Do not commit it to a public repository unless the
   user explicitly asks for that artifact to be public and a safety review finds
   no private values.

## Required workflow

### 1. Delegate to the official OpenAI skill

When the OpenAI Developers plugin is available, invoke its
`chatgpt-app-submission` skill in the MCP server repository. Do not silently
reimplement or “improve” its schema from memory. If the official plugin is not
available, tell the user to install it or explicitly approve a separately
validated fallback; never fabricate a portal payload.

Use a prompt like:

```text
Use $chatgpt-app-submission in this MCP server repository. Inspect the real tool
implementations, annotations, output schemas, widget metadata, and side effects.
Generate chatgpt-app-submission.json in the approved submission staging folder.
Do not upload or submit it. Report every review finding and missing outputSchema
warning, and keep credentials, private paths, local logs, and account data out
of the JSON.
```

### 2. Inspect behavior, not names

Before accepting the generated file, verify each exposed tool against its real
implementation and reachable helpers. Record whether it reads, computes,
creates, updates, deletes, sends, publishes, enqueues, or changes an external
system. Confirm all three Apps SDK review annotations explicitly:

- `readOnlyHint` is true only when the tool cannot mutate state;
- `destructiveHint` is true for deletion, overwrite, revocation, irreversible
  transactions, or destructive parameter modes;
- `openWorldHint` is true when the tool changes public internet state or an
  external third-party system.

If a hint is missing, null, stale, or ambiguous, stop before generating a
misleading submission. List the tool, observed behavior, current value, and
recommended value, then ask for approval to update the MCP source. Do not infer
behavior from a tool name or from a default annotation.

### 3. Review the generated JSON

Check the file without exposing its contents in chat or committing it:

- filename is exactly `chatgpt-app-submission.json`;
- `$schema` and `schema_version` are present;
- `app_info` is factual, concise, and uses a functional subtitle of 30 or fewer
  characters;
- category is one of the schema-supported values;
- every tool has explicit `readOnlyHint`, `openWorldHint`, and
  `destructiveHint` values plus one-sentence justifications;
- there are exactly five positive and exactly three negative test cases;
- positive `tools_triggered` values use exact MCP action names;
- negative cases cover nearby but unsupported requests;
- no tokens, credentials, account identifiers, private source, local absolute
  paths, request IDs, stack traces, customer data, or signing material appear;
- descriptions and test expectations do not promise approval, uptime, legal
  compliance, current policy facts, or a review timeline.

Missing `outputSchema` is a warning to report, not a reason to invent a schema.
Name each affected tool and recommend adding an output schema so models can use
the result more reliably.

### 4. Review portal readiness separately

The JSON fills parts of the Apps submission form; it is not the submission
itself. Confirm the public MCP endpoint, privacy policy, terms, support contact,
product identity, app icon, screenshots or demo evidence, domain/CSP settings,
authentication description, and reviewer test account requirements from the
current official OpenAI submission surface. Keep reviewer credentials in the
portal's approved mechanism, never in this repository or the JSON draft.

### 5. Gate upload and submission

Show the user the generated app-info summary, tool count, test counts, warnings,
and every review finding before upload. Upload only after the user confirms the
exact file and destination. Submit for review only after a separate, explicit
owner instruction such as `SUBMIT FOR REVIEW`; a request to draft, inspect, or
upload does not automatically authorize final submission. Publication after
approval is a separate decision.

## Static-plugin boundary

This skill can live inside a static Agent Skills package, but a static package is
not itself a ChatGPT Apps MCP server. A plugin manifest, GitHub repository,
`skills/` directory, or `.codex-plugin/plugin.json` does not provide MCP tools,
an endpoint, widget resources, or a submission-ready app. When this skill is
triggered in such a repository, return the blocker and point the user to the
MCP server repository instead of producing fake submission JSON.

## Expected handoff

Return:

```text
Repository classification: MCP server / static plugin / ambiguous
Submission staging path: [path, if generated]
App info summary: [display name, subtitle, category]
Tools covered: [count and exact names]
Positive test cases: [must be 5]
Negative test cases: [must be 3]
Missing outputSchema warnings: [tools or none]
Review findings: [sensitive inputs, data use, naming, CSP, or none]
Upload status: not uploaded / uploaded with target evidence
Submission status: not submitted / submitted with portal evidence
Next owner action: [exact review or confirmation needed]
```

Never call a draft “approved” or “published” without live evidence from the
official OpenAI surface.
