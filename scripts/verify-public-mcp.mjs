#!/usr/bin/env node

/**
 * Exercise the deployed, public MCP contract without requiring credentials.
 *
 * Usage:
 *   node scripts/verify-public-mcp.mjs [https://example.com/mcp]
 *
 * The default is the production Mobile App Builder endpoint. This is a
 * release gate, not a load test: it checks the public health response, the
 * Streamable HTTP handshake, tool inventory, explicit annotations, stable
 * read-only results, and the credential-redaction boundary.
 */

import process from "node:process";

const endpoint = new URL(
  process.argv[2] ??
    process.env.MOBILE_APP_BUILDER_MCP_URL ??
    "https://app-builder.khadinakbar.dev/mcp",
);
const healthUrl = new URL("/health", endpoint);
const expectedTools = new Set([
  "get_mobile_builder_capabilities",
  "plan_expo_app",
  "research_mobile_app_opportunity",
  "validate_expo_project_metadata",
  "prepare_store_submission",
  "prepare_cloud_build",
]);
const expectedAnnotations = {
  readOnlyHint: true,
  openWorldHint: false,
  destructiveHint: false,
  idempotentHint: true,
};
let requestId = 0;

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function parseResponse(text, label) {
  const json = text.startsWith("event:")
    ? text.match(/^data:\s*(.+)$/mu)?.[1]
    : text;
  try {
    return JSON.parse(json);
  } catch {
    throw new Error(`${label}: expected a JSON-RPC or SSE data response`);
  }
}

async function requestJson(method, url, body) {
  const response = await fetch(url, {
    method,
    headers: body
      ? {
          accept: "application/json, text/event-stream",
          "content-type": "application/json",
        }
      : { accept: "application/json" },
    body: body ? JSON.stringify(body) : undefined,
    signal: AbortSignal.timeout(15_000),
  });
  return { response, text: await response.text() };
}

async function rpc(method, params) {
  const { response, text } = await requestJson("POST", endpoint, {
    jsonrpc: "2.0",
    id: ++requestId,
    method,
    params,
  });
  assert(response.ok, `${method}: expected HTTP success, got ${response.status}`);
  const payload = parseResponse(text, method);
  if (payload.error) throw new Error(`${method}: ${payload.error.message ?? "JSON-RPC error"}`);
  return payload.result;
}

const health = await requestJson("GET", healthUrl);
assert(health.response.ok, `/health: expected HTTP success, got ${health.response.status}`);
const healthBody = JSON.parse(health.text);
assert(healthBody.ok === true, "/health: expected ok: true");
assert(healthBody.name === "mobile-app-builder", "/health: unexpected service name");

const mcpGet = await requestJson("GET", endpoint);
assert(mcpGet.response.status === 405, "/mcp: expected GET to be rejected with HTTP 405");

const init = await rpc("initialize", {
  protocolVersion: "2025-06-18",
  capabilities: {},
  clientInfo: { name: "mobile-app-builder-production-verifier", version: "1.0.0" },
});
assert(init.serverInfo?.name === "Mobile App Builder", "initialize: unexpected server name");
assert(init.serverInfo?.version === "1.1.3", "initialize: unexpected server version");

const toolList = await rpc("tools/list", {});
assert(toolList.tools?.length === expectedTools.size, "tools/list: unexpected tool count");
for (const tool of toolList.tools) {
  assert(expectedTools.has(tool.name), `tools/list: unexpected tool ${tool.name}`);
  assert(tool.inputSchema && tool.outputSchema, `${tool.name}: schema missing`);
  for (const [key, value] of Object.entries(expectedAnnotations)) {
    assert(tool.annotations?.[key] === value, `${tool.name}: ${key} is not ${value}`);
  }
}

const cases = [
  ["get_mobile_builder_capabilities", {}],
  [
    "plan_expo_app",
    {
      projectName: "Habit Atlas",
      appIdea: "An offline bilingual habit tracker for students.",
      platforms: ["ios", "android"],
    },
  ],
  [
    "research_mobile_app_opportunity",
    { idea: "A private family budget tracker.", audience: "Pakistani households" },
  ],
  [
    "validate_expo_project_metadata",
    { metadata: { expo: { sdkVersion: "54.0.0" }, ios: {}, android: {} } },
  ],
  [
    "prepare_store_submission",
    { appName: "Habit Atlas", capabilities: ["notifications"], dataCollection: ["email address"] },
  ],
  [
    "prepare_cloud_build",
    { projectName: "Habit Atlas", platforms: ["ios", "android"], profile: "preview", sourceRevision: "main" },
  ],
];

for (const [name, args] of cases) {
  const first = await rpc("tools/call", { name, arguments: args });
  const second = await rpc("tools/call", { name, arguments: args });
  assert(!first.isError, `${name}: returned an error result`);
  assert(first.structuredContent && first.content?.[0]?.text, `${name}: missing result content`);
  assert(
    first.content[0].text === JSON.stringify(first.structuredContent, null, 2),
    `${name}: text and structured results differ`,
  );
  assert(JSON.stringify(first) === JSON.stringify(second), `${name}: result is not idempotent`);
}

const credentialProbe = await rpc("tools/call", {
  name: "validate_expo_project_metadata",
  arguments: {
    metadata: {
      expo: { sdkVersion: "54.0.0", extra: { apiToken: "not-a-real-secret" } },
    },
  },
});
assert(
  credentialProbe.structuredContent?.findings?.some((finding) => finding.code === "CREDENTIAL_SHAPED_INPUT"),
  "credential boundary: missing CREDENTIAL_SHAPED_INPUT finding",
);
assert(
  !JSON.stringify(credentialProbe).includes("not-a-real-secret"),
  "credential boundary: input value appeared in the response",
);

console.log(
  JSON.stringify(
    {
      status: "PASS",
      endpoint: endpoint.toString(),
      version: init.serverInfo.version,
      toolCount: toolList.tools.length,
      idempotency: "PASS",
      credentialBoundary: "PASS",
    },
    null,
    2,
  ),
);
