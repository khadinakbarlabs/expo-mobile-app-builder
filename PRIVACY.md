# Privacy policy

Effective date: September 6, 2026

Mobile App Builder includes a static skills package and an optional public MCP
endpoint hosted on Cloudflare Workers. Neither surface creates a user account,
stores workspace files, or uses a plugin-owned database. The MCP endpoint
processes a tool request in memory to return its response and does not provide
build execution, provider-account access, uploads, or store submission.

The Cloudflare-hosted endpoint uses operational observability to keep the
service reliable. Request query strings are redacted and the Worker does not
write tool arguments, prompt content, credential-shaped values, or workspace
files to application logs. Cloudflare may process service telemetry under its
own terms and privacy policy. The static skills package contains no analytics
SDK, tracking pixel, or telemetry collector.

The AI host chosen by the user may process the user’s prompt and any files the user authorizes it to access under that host’s own terms and controls. Third-party command-line tools, provider dashboards, device emulators, and app stores are also governed by their respective policies when the user chooses to use them.

The package does not request or collect Expo, Apple, Google, Firebase, RevenueCat, Supabase, OpenAI, or other credentials. Do not paste credentials into prompts, source code, screenshots, or issue reports. Use provider-approved secret management, redact diagnostics, and rotate a credential that may have been exposed.

This policy is published with the canonical source at [github.com/khadinakbarlabs/expo-mobile-app-builder](https://github.com/khadinakbarlabs/expo-mobile-app-builder). It will be updated before any release that adds authentication, a new data recipient, persistent storage, or a material change in logging.
