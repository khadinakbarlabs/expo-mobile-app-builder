---
name: "5-1-2-i-ai-disclosure"
description: "Implement 5.1.2(i) third-party AI disclosure: name provider explicitly + explicit consent modal before first call. Use when the user says '5.1.2(i)', 'AI disclosure', 'third-party AI consent', 'OpenAI consent', 'Anthropic disclosure'."
---

# 5.1.2(i) AI Disclosure

The Nov 2025 rule that's the single most disruptive change for any RN app touching LLMs.

## What 5.1.2(i) requires
For every third-party AI provider you call (OpenAI, Anthropic, Replicate, Gemini, AWS Bedrock, etc.):
1. **Name the provider explicitly** in privacy disclosures (Privacy Policy + Privacy Nutrition Label). Generic "we share data with service providers" is NOT enough.
2. **Show explicit consent modal** before the first network call to that provider. Modal must name the provider.

## Exempt
- On-device inference (Apple Foundation Models, Core ML, on-device Whisper, llama.cpp)
- Run `add-foundation-models` to use the exempt path when possible

## Sample consent modal copy

### OpenAI
```
Use AI assistance?

To answer your question, we'll send your message to OpenAI.

OpenAI is a third-party service. They will receive what you type so they can generate a response. Per their policy, they don't train models on this data when accessed via API.

Your message: [preview of what will be sent]

[Cancel]   [Allow OpenAI]
```

### Anthropic
```
Use Claude?

To process this, we'll send your text to Anthropic (Claude).

Anthropic is a third-party AI provider. They will receive your input to generate the response. Per their API policy, they don't train models on your data.

[Cancel]   [Allow Anthropic]
```

## Implementation pattern
```tsx
// services/ai-consent.ts
import * as SecureStore from 'expo-secure-store';

export async function ensureAIConsent(provider: 'openai' | 'anthropic') {
  const key = `ai_consent_${provider}`;
  const granted = await SecureStore.getItemAsync(key);
  if (granted === 'true') return true;

  return new Promise<boolean>((resolve) => {
    Alert.alert(
      `Use ${provider === 'openai' ? 'OpenAI' : 'Claude'}?`,
      `We'll send your text to ${provider === 'openai' ? 'OpenAI' : 'Anthropic'} for processing.`,
      [
        { text: 'Cancel', onPress: () => resolve(false) },
        { text: 'Allow', onPress: async () => {
          await SecureStore.setItemAsync(key, 'true');
          resolve(true);
        }},
      ]
    );
  });
}

// usage
const consented = await ensureAIConsent('anthropic');
if (consented) await callExternalAIProvider(prompt);
```

## Privacy Policy update
Add section:
```
Third-Party AI Services

When you use the [feature] feature, your input is sent to [Provider] (a third-party AI service) to generate the response. [Provider]'s data handling is governed by their [link to their privacy policy].

We obtain explicit consent before sending data to [Provider] for the first time. You can revoke consent in Settings → Privacy → AI Providers.
```

## Settings revoke flow
```tsx
<Pressable onPress={async () => {
  await SecureStore.deleteItemAsync('ai_consent_openai');
  Alert.alert('Revoked', 'Consent revoked. We will ask again next time.');
}}>
  <Text>Revoke OpenAI consent</Text>
</Pressable>
```

## Reference
`references/06-store-readiness.md`
