import { createMcpHandler } from "agents/mcp/server";
import { McpServer } from "@modelcontextprotocol/server";
import { z } from "zod";

const EXPO_SDK = "54.0.0";
const SOURCE_REPOSITORY =
  "https://github.com/khadinakbarlabs/expo-mobile-app-builder";
const EXPO_REFERENCE = "https://docs.expo.dev/versions/v54.0.0/";

const PLATFORMS = ["ios", "android"];
const MAX_TEXT = 4000;
const MAX_REQUEST_BODY_BYTES = 100_000;
// Every public tool is a pure, in-memory operation. Keep all MCP hints
// explicit so the review surface never relies on SDK defaults or null values.
// Repeating a call has no side effect, so idempotentHint is also true.
const READ_ONLY_ANNOTATIONS = Object.freeze({
  readOnlyHint: true,
  openWorldHint: false,
  destructiveHint: false,
  idempotentHint: true,
});
const QUICK_START_PROMPTS = [
  {
    title: "Plan an MVP",
    prompt:
      "Plan the smallest viable Expo MVP for [idea]. Define the core journey, iOS and Android parity, architecture, risks, non-goals, and evidence needed. Do not create files or accounts.",
  },
  {
    title: "Audit an existing app",
    prompt:
      "Inspect this Expo repository in read-only mode. Rank iOS and Android release-readiness gaps by user impact, show evidence and affected files, then recommend the smallest safe fixes.",
  },
  {
    title: "Build one vertical slice",
    prompt:
      "Implement one complete Expo vertical slice for [user outcome]. Reuse the existing architecture, cover loading, empty, error, offline, and accessibility states, and report separate iOS and Android validation evidence.",
  },
  {
    title: "Debug safely",
    prompt:
      "Debug this Expo iOS/Android issue: [symptom]. Inspect the current configuration, establish the highest-confidence root cause, make the smallest safe fix, and state what was verified on each platform. Never request credentials or signing material.",
  },
  {
    title: "Prepare a release",
    prompt:
      "Prepare this Expo app for a human-reviewed iOS and Android release. Audit identifiers, versions, icons, permissions, privacy disclosures, metadata, build profiles, and device evidence. Return pass/fail/unknown status. Do not build, upload, or submit.",
  },
  {
    title: "Plan app growth",
    prompt:
      "Create a measurable growth plan for [app]. Cover activation, retention, monetization, ASO, creator content, Apple Ads, Google App campaigns, Meta, and TikTok. Rank experiments by evidence, cost, and reversibility. Do not create campaigns or spend money.",
  },
];

const PROFESSIONAL_WORKFLOWS = [
  {
    category: "Discovery and research",
    capabilities: [
      "niche research",
      "competitor analysis",
      "review mining",
      "market validation",
    ],
    representativeSkills: [
      "find-niche",
      "mine-competitor-reviews",
      "competitor-feature-matrix",
    ],
  },
  {
    category: "Product strategy",
    capabilities: ["positioning", "MVP scope", "pricing", "roadmap"],
    representativeSkills: [
      "position-pitch",
      "pricing-strategy",
      "mobile-app-builder-ios-android",
    ],
  },
  {
    category: "Experience design",
    capabilities: [
      "information architecture",
      "onboarding",
      "accessibility",
      "design systems",
    ],
    representativeSkills: [
      "design-onboarding-funnel",
      "accessibility-audit",
      "accessibility-audit-android",
    ],
  },
  {
    category: "Expo engineering",
    capabilities: [
      "Expo SDK 54",
      "React Native",
      "native integrations",
      "offline architecture",
    ],
    representativeSkills: [
      "command-scaffold-app",
      "choose-backend",
      "choose-storage",
    ],
  },
  {
    category: "Quality and security",
    capabilities: ["testing", "performance", "privacy", "release audits"],
    representativeSkills: [
      "pre-submission-audit",
      "command-audit-rn",
      "add-expo-secure-store",
    ],
  },
  {
    category: "Monetization",
    capabilities: [
      "subscriptions",
      "paywalls",
      "billing compliance",
      "cancellation and win-back",
    ],
    representativeSkills: [
      "design-paywall",
      "pricing-strategy",
      "build-cancellation-flow",
      "build-win-back-flow",
    ],
  },
  {
    category: "Organic growth",
    capabilities: [
      "ASO",
      "virality",
      "referrals",
      "creator programs",
      "lifecycle messaging",
    ],
    representativeSkills: [
      "aso-keywords",
      "design-viral-loop",
      "build-creator-program",
      "design-lifecycle-messaging",
    ],
  },
  {
    category: "Paid acquisition",
    capabilities: [
      "Apple Ads",
      "Google App campaigns",
      "Meta app campaigns",
      "TikTok Spark Ads",
    ],
    representativeSkills: [
      "run-paid-acquisition",
      "asa-to-aso",
      "asa-to-aso-android",
    ],
  },
  {
    category: "Analytics and experimentation",
    capabilities: ["growth funnel", "attribution", "cohorts", "A/B testing"],
    representativeSkills: [
      "instrument-growth-funnel",
      "set-up-ab-testing",
      "add-posthog-rn",
    ],
  },
  {
    category: "Store launch",
    capabilities: [
      "EAS",
      "TestFlight",
      "Google Play",
      "store metadata",
      "review readiness",
    ],
    representativeSkills: [
      "eas-submit-testflight",
      "custom-store-listings",
      "pre-submission-audit",
    ],
  },
  {
    category: "Post-launch operations",
    capabilities: [
      "monitoring",
      "review feedback",
      "retention",
      "release iteration",
    ],
    representativeSkills: [
      "build-review-routing",
      "design-retention-loop",
      "add-sentry-rn",
    ],
  },
];

const PLATFORM_OUTPUT_SCHEMA = z.array(z.enum(PLATFORMS));
const EXPO_OUTPUT_SCHEMA = z.object({
  sdk: z.string(),
  reference: z.string(),
});
const CAPABILITIES_OUTPUT_SCHEMA = z.object({
  name: z.string(),
  description: z.string(),
  transport: z.string(),
  expo: EXPO_OUTPUT_SCHEMA,
  platforms: PLATFORM_OUTPUT_SCHEMA,
  lifecycle: z.array(z.string()),
  professionalWorkflows: z.array(
    z.object({
      category: z.string(),
      capabilities: z.array(z.string()),
      representativeSkills: z.array(z.string()),
    }),
  ),
  promptWriting: z.object({
    pattern: z.string(),
    quickStartPrompts: z.array(
      z.object({ title: z.string(), prompt: z.string() }),
    ),
  }),
  skillLibrary: z.object({
    catalogSize: z.number().int().nonnegative(),
    source: z.string(),
    availability: z.string(),
  }),
  credentialBoundary: z.object({
    publicWorker: z.string(),
    privateRunner: z.string(),
  }),
  executionPolicy: z.string(),
});
const PLAN_OUTPUT_SCHEMA = z.object({
  projectName: z.string(),
  appIdea: z.string(),
  platforms: PLATFORM_OUTPUT_SCHEMA,
  expo: EXPO_OUTPUT_SCHEMA,
  phases: z.array(
    z.object({ id: z.string(), deliverables: z.array(z.string()) }),
  ),
  requirements: z.array(z.string()),
  acceptanceCriteria: z.array(z.string()),
  nextTool: z.string(),
});
const RESEARCH_OUTPUT_SCHEMA = z.object({
  question: z.string(),
  audience: z.string(),
  constraints: z.array(z.string()),
  researchMethod: z.array(z.string()),
  officialReferences: z.array(z.object({ title: z.string(), url: z.string() })),
  evidenceBoundary: z.string(),
  nextTool: z.string(),
});
const VALIDATION_OUTPUT_SCHEMA = z.object({
  valid: z.boolean(),
  platforms: PLATFORM_OUTPUT_SCHEMA,
  expoReference: z.string(),
  findings: z.array(
    z.object({
      severity: z.enum(["info", "error"]),
      code: z.string(),
      message: z.string(),
      fields: z.array(z.string()).optional(),
    }),
  ),
  checks: z.array(z.string()),
});
const STORE_OUTPUT_SCHEMA = z.object({
  appName: z.string(),
  platforms: PLATFORM_OUTPUT_SCHEMA,
  status: z.literal("DRAFT_ONLY"),
  checklist: z.array(z.string()),
  capabilities: z.array(z.string()),
  declaredDataCollection: z.array(z.string()),
  references: z.array(z.string()),
});
const BUILD_OUTPUT_SCHEMA = z.object({
  projectName: z.string(),
  platforms: PLATFORM_OUTPUT_SCHEMA,
  profile: z.enum(["development", "preview", "production"]),
  sourceRevision: z.string(),
  status: z.literal("READY_FOR_AUTHORIZED_PRIVATE_BUILD"),
  handoff: z.array(z.string()),
  publicWorkerBoundary: z.string(),
});

function jsonText(value) {
  return {
    content: [{ type: "text", text: JSON.stringify(value, null, 2) }],
    structuredContent: value,
  };
}

function cleanText(value, fallback = "") {
  return String(value ?? fallback)
    .trim()
    .slice(0, MAX_TEXT);
}

function normalizePlatforms(platforms) {
  const requested = Array.isArray(platforms) ? platforms : PLATFORMS;
  const normalized = [
    ...new Set(requested.map((value) => String(value).toLowerCase())),
  ].filter((value) => PLATFORMS.includes(value));
  return normalized.length ? normalized : PLATFORMS;
}

function findCredentialFields(value, path = [], findings = []) {
  if (!value || typeof value !== "object" || path.length > 12) return findings;
  const secretLike =
    /(token|secret|password|private[_-]?key|client[_-]?secret|access[_-]?key|signing)/i;
  for (const [key, nestedValue] of Object.entries(value)) {
    const fieldPath = [...path, key].join(".");
    if (secretLike.test(key)) findings.push(fieldPath);
    if (findings.length < 50) findCredentialFields(nestedValue, [...path, key], findings);
  }
  return findings;
}

function createServer() {
  const server = new McpServer({
    name: "Mobile App Builder",
    version: "1.1.3",
  });

  server.registerTool(
    "get_mobile_builder_capabilities",
    {
      title: "Mobile builder capabilities",
      description:
        "Describe the credential-free Expo and React Native planning surface.",
      annotations: READ_ONLY_ANNOTATIONS,
      inputSchema: {},
      outputSchema: CAPABILITIES_OUTPUT_SCHEMA,
    },
    async () =>
      jsonText({
        name: "Mobile App Builder",
        description:
          "Research, plan, build, test, grow, monetize, and launch professional Android and iOS apps with Expo.",
        transport: "stateless-streamable-http",
        expo: { sdk: EXPO_SDK, reference: EXPO_REFERENCE },
        platforms: PLATFORMS,
        lifecycle: [
          "research",
          "product strategy",
          "experience design",
          "implementation guidance",
          "validation",
          "monetization",
          "organic growth",
          "paid acquisition",
          "store preparation",
          "post-launch optimization",
        ],
        professionalWorkflows: PROFESSIONAL_WORKFLOWS,
        promptWriting: {
          pattern:
            "State the operating mode, user outcome, audience, platforms, constraints, non-goals, proof required, and external-action boundary.",
          quickStartPrompts: QUICK_START_PROMPTS,
        },
        skillLibrary: {
          catalogSize: 179,
          source: SOURCE_REPOSITORY,
          availability:
            "The public MCP does not install or execute local skills. Install the open-source package separately to use its skill library.",
        },
        credentialBoundary: {
          publicWorker:
            "No provider credentials, signing material, account identifiers, or private source.",
          privateRunner:
            "Required for any real EAS build, signing, upload, or store submission.",
        },
        executionPolicy:
          "This public surface creates plans and checklists; it does not build, upload, or submit binaries.",
      }),
  );

  server.registerTool(
    "plan_expo_app",
    {
      title: "Plan an Expo app",
      description:
        "Create a bounded, implementation-ready plan for an Expo Android and iOS app.",
      annotations: READ_ONLY_ANNOTATIONS,
      inputSchema: {
        projectName: z.string().min(1).max(80),
        appIdea: z.string().min(1).max(2000),
        platforms: z.array(z.enum(PLATFORMS)).optional(),
        requirements: z.array(z.string().min(1).max(300)).max(20).optional(),
      },
      outputSchema: PLAN_OUTPUT_SCHEMA,
    },
    async ({ projectName, appIdea, platforms, requirements = [] }) => {
      const targetPlatforms = normalizePlatforms(platforms);
      return jsonText({
        projectName: cleanText(projectName),
        appIdea: cleanText(appIdea),
        platforms: targetPlatforms,
        expo: { sdk: EXPO_SDK, reference: EXPO_REFERENCE },
        phases: [
          {
            id: "research",
            deliverables: [
              "problem brief",
              "audience assumptions",
              "risk register",
            ],
          },
          {
            id: "architecture",
            deliverables: [
              "screen map",
              "navigation model",
              "data and offline boundary",
            ],
          },
          {
            id: "implementation",
            deliverables: [
              "Expo project",
              "iOS/Android parity checklist",
              "accessibility pass",
            ],
          },
          {
            id: "quality",
            deliverables: ["unit tests", "device matrix", "release validation"],
          },
          {
            id: "growth",
            deliverables: [
              "activation and retention model",
              "ASO plan",
              "organic and paid acquisition experiments",
              "measurement plan",
            ],
          },
          {
            id: "monetization",
            deliverables: [
              "business model",
              "pricing and paywall plan",
              "billing compliance checklist",
            ],
          },
          {
            id: "distribution",
            deliverables: [
              "privacy disclosures",
              "store metadata",
              "human-reviewed submission draft",
              "post-launch feedback loop",
            ],
          },
        ],
        requirements: requirements
          .map((item) => cleanText(item))
          .filter(Boolean),
        acceptanceCriteria: [
          "The app launches on every requested platform.",
          "No provider credential or signing material is committed to source.",
          "Permission prompts, privacy disclosures, and data collection are truthful.",
          "Build and store actions remain explicitly authorized by the owner.",
        ],
        nextTool: "validate_expo_project_metadata",
      });
    },
  );

  server.registerTool(
    "research_mobile_app_opportunity",
    {
      title: "Research a mobile app idea",
      description:
        "Return a research method and official Expo and store-policy references without performing live web or store research.",
      annotations: READ_ONLY_ANNOTATIONS,
      inputSchema: {
        idea: z.string().min(1).max(2000),
        audience: z.string().max(500).optional(),
        constraints: z.array(z.string().min(1).max(300)).max(12).optional(),
      },
      outputSchema: RESEARCH_OUTPUT_SCHEMA,
    },
    async ({ idea, audience = "not specified", constraints = [] }) =>
      jsonText({
        question: cleanText(idea),
        audience: cleanText(audience),
        constraints: constraints.map((item) => cleanText(item)),
        researchMethod: [
          "Define the user problem and a falsifiable outcome.",
          "Compare at least three alternatives and record evidence dates.",
          "Check platform policies, permissions, privacy, and monetization constraints.",
          "Turn assumptions into a small Expo prototype and measurable validation test.",
        ],
        officialReferences: [
          { title: "Expo SDK 54 documentation", url: EXPO_REFERENCE },
          {
            title: "Expo app development guides",
            url: "https://docs.expo.dev/develop/development-builds/introduction/",
          },
          {
            title: "Apple App Review Guidelines",
            url: "https://developer.apple.com/app-store/review/guidelines/",
          },
          {
            title: "Google Play policy center",
            url: "https://support.google.com/googleplay/android-developer/topic/9858052",
          },
        ],
        evidenceBoundary:
          "Use current primary sources before relying on a policy, pricing, or market claim.",
        nextTool: "plan_expo_app",
      }),
  );

  server.registerTool(
    "validate_expo_project_metadata",
    {
      title: "Validate Expo project metadata",
      description:
        "Check supplied project metadata for Expo alignment, platform parity, and credential-shaped values.",
      annotations: READ_ONLY_ANNOTATIONS,
      inputSchema: {
        metadata: z.record(z.string(), z.unknown()),
        platforms: z.array(z.enum(PLATFORMS)).optional(),
      },
      outputSchema: VALIDATION_OUTPUT_SCHEMA,
    },
    async ({ metadata, platforms }) => {
      const serialized = JSON.stringify(metadata);
      const findings = [];
      if (!serialized.toLowerCase().includes("54")) {
        findings.push({
          severity: "info",
          code: "EXPO_VERSION_UNCONFIRMED",
          message:
            "Confirm the project uses Expo SDK 54 or an intentionally supported version.",
        });
      }
      const secretFields = findCredentialFields(metadata);
      if (secretFields.length) {
        findings.push({
          severity: "error",
          code: "CREDENTIAL_SHAPED_INPUT",
          message:
            "Move credential-shaped fields to a private runtime; do not commit or send their values to this public Worker.",
          fields: secretFields,
        });
      }
      const targetPlatforms = normalizePlatforms(platforms);
      return jsonText({
        valid: !findings.some((finding) => finding.severity === "error"),
        platforms: targetPlatforms,
        expoReference: EXPO_REFERENCE,
        findings,
        checks: [
          "credential boundary",
          "Expo version confirmation",
          "platform parity",
          "privacy and permissions review",
        ],
      });
    },
  );

  server.registerTool(
    "prepare_store_submission",
    {
      title: "Prepare store submission",
      description:
        "Draft App Store and Google Play submission requirements without uploading or submitting anything.",
      annotations: READ_ONLY_ANNOTATIONS,
      inputSchema: {
        appName: z.string().min(1).max(80),
        platforms: z.array(z.enum(PLATFORMS)).optional(),
        capabilities: z.array(z.string().min(1).max(200)).max(30).optional(),
        dataCollection: z.array(z.string().min(1).max(200)).max(30).optional(),
      },
      outputSchema: STORE_OUTPUT_SCHEMA,
    },
    async ({ appName, platforms, capabilities = [], dataCollection = [] }) =>
      jsonText({
        appName: cleanText(appName),
        platforms: normalizePlatforms(platforms),
        status: "DRAFT_ONLY",
        checklist: [
          "Verify bundle identifiers and version numbers in the private release environment.",
          "Create truthful screenshots, description, age rating, and support contact.",
          "Document every permission and data practice in the privacy disclosures.",
          "Run release builds on supported iOS and Android devices.",
          "Obtain explicit owner approval before any upload or submission.",
        ],
        capabilities: capabilities.map((item) => cleanText(item)),
        declaredDataCollection: dataCollection.map((item) => cleanText(item)),
        references: [
          "https://developer.apple.com/app-store/review/guidelines/",
          "https://support.google.com/googleplay/android-developer/topic/9858052",
        ],
      }),
  );

  server.registerTool(
    "prepare_cloud_build",
    {
      title: "Prepare a private cloud build",
      description:
        "Create a dry-run build job plan; never accepts or stores signing credentials.",
      annotations: READ_ONLY_ANNOTATIONS,
      inputSchema: {
        projectName: z.string().min(1).max(80),
        platforms: z.array(z.enum(PLATFORMS)).optional(),
        profile: z
          .enum(["development", "preview", "production"])
          .default("preview"),
        sourceRevision: z.string().max(120).optional(),
      },
      outputSchema: BUILD_OUTPUT_SCHEMA,
    },
    async ({ projectName, platforms, profile, sourceRevision }) =>
      jsonText({
        projectName: cleanText(projectName),
        platforms: normalizePlatforms(platforms),
        profile,
        sourceRevision: cleanText(sourceRevision, "working-tree"),
        status: "READY_FOR_AUTHORIZED_PRIVATE_BUILD",
        handoff: [
          "Run the build in a private CI or EAS environment.",
          "Resolve signing and provider credentials through the platform secret manager.",
          "Attach build logs and artifacts to the owner-controlled release record.",
          "Run device checks before any store upload.",
        ],
        publicWorkerBoundary:
          "This Worker does not run EAS, access Apple or Google accounts, or receive signing material.",
      }),
  );

  return server;
}

const mcpHandler = createMcpHandler(createServer);

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const contentLength = Number(request.headers.get("content-length") ?? 0);
    if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BODY_BYTES) {
      return Response.json({ error: "Request body too large" }, { status: 413 });
    }
    if (url.pathname === "/health") {
      return Response.json({
        ok: true,
        name: "mobile-app-builder",
        transport: "streamable-http",
      });
    }
    if (url.pathname === "/.well-known/openai-apps-challenge") {
      if (!env.OPENAI_APPS_CHALLENGE)
        return new Response("Not configured", { status: 404 });
      return new Response(env.OPENAI_APPS_CHALLENGE, {
        headers: { "content-type": "text/plain; charset=utf-8" },
      });
    }
    if (url.pathname === "/") {
      return Response.json({
        name: "Mobile App Builder",
        mcp: "/mcp",
        health: "/health",
        credentialFree: true,
      });
    }
    if (url.pathname !== "/mcp")
      return new Response("Not found", { status: 404 });
    try {
      return await mcpHandler(request, env, ctx);
    } catch (error) {
      console.error(
        JSON.stringify({
          message: "MCP request failed",
          method: request.method,
          path: url.pathname,
          error: error instanceof Error ? error.message : String(error),
        }),
      );
      return Response.json({ error: "Internal server error" }, { status: 500 });
    }
  },
};
