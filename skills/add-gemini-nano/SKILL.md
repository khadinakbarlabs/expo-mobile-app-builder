---
name: "add-gemini-nano"
description: "Add on-device LLM via Gemini Nano (Pixel 8+, Galaxy S24+) using MediaPipe LLM Inference or ML Kit. Use when the user says 'gemini nano', 'on-device ai android', 'on-device llm android', 'no-cloud llm'."
---

# Add Gemini Nano (On-Device LLM)

Android's equivalent of Apple Foundation Models. Free, offline, private.

## Hardware required
- Pixel 8 Pro / 8a / 9 / 9 Pro
- Samsung Galaxy S24 / S25 series
- Some OnePlus 12+
- ~4GB+ RAM for model

## Options

### Option A: MediaPipe LLM Inference (recommended)
```bash
# Add to expo prebuild via config plugin
pnpm add @1mt/expo-on-device-ai
```

```tsx
import { generateText } from '@1mt/expo-on-device-ai';
const result = await generateText({ prompt: 'Summarize: ...' });
```

### Option B: AI Edge SDK (Google native)
Requires native Kotlin module — drop down via expo-modules-core.

### Option C: ML Kit GenAI (newer, 2025+)
For specific tasks: summarization, image description, etc.

## When to use vs cloud LLM
- Privacy-sensitive (no data leaves device)
- Offline functionality required
- Cost reduction (no API bill)
- Avoid Google Play AI policy disclosure (no third-party transfer)

## Cross-platform pattern
- iOS: Foundation Models (skill: `add-foundation-models`)
- Android: Gemini Nano
- Wrapper: `@1mt/expo-on-device-ai` covers both with same API

## Limitations
- Smaller context window than cloud (~1k-4k tokens)
- Generation speed: 10-30 tok/sec
- Only ~50% of Android devices support
- Quality below GPT-4 — good for summarization, classification, simple chat

## Fallback for unsupported devices
```tsx
if (await isGeminiNanoAvailable()) {
  return await generateText({ prompt });
}
return await callCloudLLM({ prompt });  // with 5.1.2(i) consent
```

## Pair with
- `add-openai-streaming-android` for cloud fallback
- `play-ai-disclosure` for compliance (still needed even for on-device if it's AI-generated content)
