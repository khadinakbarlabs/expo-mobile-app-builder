---
name: "add-gemini-nano"
description: "Plan a privacy-aware Android on-device AI integration using verified ML Kit GenAI APIs and explicit availability checks. Use for Gemini Nano, offline Android AI, or on-device inference."
---

# Add On-Device AI with Gemini Nano

Assess the app's task and device support before promising offline AI. Start with Google's official ML Kit GenAI documentation: https://developers.google.com/ml-kit/genai and the selected API's Android setup guide. Gemini Nano via AICore and downloadable MediaPipe models are distinct approaches; do not label an arbitrary local model as Gemini Nano.

## Choose an integration

Inspect the Expo SDK, native build and supported Android versions. Select an official ML Kit task API or Prompt API where currently supported, then plan a narrow Kotlin bridge through Expo Modules. Verify documented dependency versions, permissions, model availability and licensing before proposing changes. Third-party wrappers require a separate maintainer, source and compatibility review; do not automatically install an unverified package.

Check feature status using the selected API's documented runtime availability method. Handle unavailable, downloadable, downloading and available states. A phone model name alone does not prove API availability. Model downloads may require connectivity, storage and user approval; describe this before starting them.

## Privacy and fallback

Keep prompts and outputs out of diagnostics by default. Test whether the chosen integration sends telemetry or data before describing it as private. On-device processing does not remove applicable AI content, disclosure or reporting requirements.

For unsupported devices, show a useful unavailable state. A cloud fallback is a separate user choice: identify the provider and data transferred, obtain applicable consent, authenticate through a backend and enforce rate limits. Never send a prompt to the cloud automatically after a local failure. Never place provider credentials in mobile code.

## Deliver and verify

Produce an integration plan with exact dependencies, supported API states and privacy boundaries. Test supported and unsupported physical devices, denied downloads, low storage, cancellation, error handling and a network-disconnected inference after model readiness. Record measured latency and output quality without invented device coverage or speed estimates.

Pair with `play-ai-disclosure`, `add-foundation-models` and `add-openai-streaming-rn` as applicable.
