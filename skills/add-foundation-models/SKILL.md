---
name: "add-foundation-models"
description: "Use Apple Foundation Models (on-device LLM, iOS 26+) via expo-apple-intelligence config plugin. Use when the user says 'Foundation Models', 'Apple Intelligence', 'on-device LLM', 'free AI'."
---

# Add Foundation Models

On-device LLM via Apple Foundation Models. **Free, private, offline, zero MB to app size.** iOS 26+ on Apple Intelligence-eligible devices only.

## Install
```bash
npx expo install expo-apple-intelligence
npx expo prebuild --clean
```

## Availability gate (do this first)
```tsx
import * as AppleIntelligence from 'expo-apple-intelligence';

const isAvailable = AppleIntelligence.isAvailable();
if (!isAvailable) {
  // fall back to hosted LLM (OpenAI, Anthropic) with 5.1.2(i) consent modal
}
```

In 2026, ~70% of installed iPhones are NOT on Apple Intelligence-capable hardware. Always plan a fallback.

## Basic generation
```tsx
const session = AppleIntelligence.createSession({
  instructions: 'You are a fast weeknight cooking assistant.',
});

const response = await session.respond({
  prompt: 'Suggest one recipe for: leftover chicken',
  options: { temperature: 0.6 },
});

console.log(response.content);
```

## Structured output (typed result)
```tsx
const recipe = await session.respond({
  prompt: 'Suggest one recipe',
  schema: {
    name: 'string',
    ingredients: ['string'],
    stepsMinutes: 'number',
  },
});
```

## Why default to Foundation Models
- **No 5.1.2(i) consent modal needed** — only third-party AI requires explicit naming + consent
- Zero per-token cost
- No network round-trip (offline-capable)
- Apple loves featuring apps that use it

## Reference
`references/06-store-readiness.md` — 5.1.2(i) AI disclosure exemption for on-device.
