---
name: "play-ai-disclosure"
description: "Implement Google Play's Generative AI policy: in-app flagging, content moderation, listing disclosure. Use when the user says 'play ai policy', 'gen ai disclosure android', 'ai generated content android'."
---

# Play AI Disclosure

Google Play's policy (2024+, tightened 2025) — different from Apple's 5.1.2(i).

## When this applies
Your app generates content using AI (text, image, audio, video) OR shows AI-generated content to users.

## What's required

### 1. In-app flag button
Every AI-generated content piece must have a "Report" button user can tap to flag inappropriate output.

```tsx
<View>
  <Text>{aiGeneratedText}</Text>
  <Pressable onPress={openReportFlow}>
    <Text>Report inappropriate content</Text>
  </Pressable>
</View>
```

### 2. Server-side moderation
Run AI output through moderation (OpenAI Moderation API, Perspective API, or custom).
Block: hate, harassment, sexual, violence, self-harm, illegal acts.

### 3. Disclosure in Play Console
Play Console → Store presence → Store listing → "Generative AI category":
- Mark "Yes, app generates content using AI"
- Describe what types
- Describe moderation

### 4. Listing disclosure
Description must mention AI: "Powered by AI to generate X"

### 5. App tagging (Android 15+)
Future requirement: Android may auto-tag screenshots/videos showing AI content with metadata.

## What's NOT covered (so Apple 5.1.2(i) doesn't apply here)

Google's policy is about AI-generated *output*. It doesn't (yet) require disclosing third-party AI providers like OpenAI by name.

→ For cross-platform apps, do BOTH:
- Apple 5.1.2(i): name provider + consent modal (covered in iOS plugin)
- Google Play AI: flag button + moderation + listing disclosure

## Prohibited categories (auto-reject)

- AI deepfakes of real people without consent
- AI-generated child sexual abuse material (CSAM) → criminal, not just policy
- AI scam content (fake news, impersonation)
- AI medical/legal advice without disclaimer

## Implementation skill checklist

- [ ] In-app flag/report button on every AI output
- [ ] Server-side moderation on every AI input/output
- [ ] Play Console AI question answered "Yes"
- [ ] Description mentions AI capabilities
- [ ] Report flow leads to email/form to your support
- [ ] 24-hr response SLA for serious reports

## Pair with
- `5-1-2-i-ai-disclosure` (iOS counterpart, for cross-platform)
- `add-openai-streaming-android`
- `data-safety-form` (declare AI providers)
