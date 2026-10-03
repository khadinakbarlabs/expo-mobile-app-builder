---
name: "design-shareable-result-card"
description: "Design and implement a shareable result card that turns an in-app outcome into organic marketing — the Wordle grid / Cal AI calorie card / Spotify Wrapped pattern. Use when the user says 'shareable card', 'viral share', 'Instagram Story share', 'result card', 'share image', 'make my app viral', or wants organic word-of-mouth."
---

# Design a shareable result card

The single highest-leverage organic growth feature for most consumer apps. The share itself is simultaneously a user achievement (the "flex") and an advertisement (your watermark + name, traveling through feeds with no ad spend). Wordle's emoji grid, Cal AI's calorie card, Spotify Wrapped, BeReal, and Strava segment efforts all share the same DNA.

## The pattern

Engineer a specific screen or output to be the shareable artifact. When a user hits a satisfying outcome — a result, a streak, a transformation, a rank — present a one-tap "Share" action that produces an image built for social feeds.

### The five elements of a card that actually gets shared

1. **The "flex" element.** A big, satisfying number, rank, streak, score, or before/after that makes the user look good. This is the *entire* motivation to share. A card without a flex is not shared.
2. **1080×1920 px (9:16) for Instagram Stories / TikTok.** This is the dominant share surface. Build the card `<View>` at these proportions. ([Expo Sharing](https://docs.expo.dev/versions/latest/sdk/sharing/)) Also render a 1:1 (1080×1080) variant for feed posts and X.
3. **High contrast, legible at thumbnail size.** Dark text on light background (or vice versa). Feeds show the card small — if it's unreadable at 200px it won't travel.
4. **Watermark + app name** embedded bottom-corner. This is the attribution when the image is screenshotted and reposted with no link. TikTok's model: watermark unless users pay to remove.
5. **Spoiler-free / privacy-safe output.** Wordle's lesson: show the *journey* (the colored-square guess pattern), hide the *secret* (the answer). Never put private user data on a shareable card unless the user explicitly chose to.

### Scarcity and recurrence drive habitual sharing

Wordle was once-a-day and the same word worldwide, so sharing let people compare results collectively. Cal AI is every meal. Decide the cadence: daily (scarcity, habit) vs per-result (volume, more impressions). Daily works for puzzles/habits; per-result works for utilities/AI outputs.

## Implementation (React Native / Expo)

```bash
npm exec --no -- expo install expo-sharing react-native-view-shot
```

```tsx
import { useRef } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import ViewShot from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';

export function ResultCard({ result, userName }: { result: number; userName: string }) {
  const ref = useRef<ViewShot>(null);

  const share = async () => {
    const uri = await ref.current?.capture({ result: 'tmpfile', format: 'png' });
    if (!uri) return;
    await Sharing.shareAsync(uri, {
      mimeType: 'image/png',
      dialogTitle: 'Share your result',
    });
  };

  return (
    <>
      {/* Render at 1080×1920 proportions; scale via style for the screen */}
      <ViewShot ref={ref} options={{ width: 1080, height: 1920, format: 'png' }}>
        <View style={styles.card}>
          <Text style={styles.flex}>{result.toLocaleString()}</Text>
          <Text style={styles.label}>{userName}'s result this week</Text>
          <Text style={styles.watermark}>AppName</Text>
        </View>
      </ViewShot>

      <Pressable style={styles.shareBtn} onPress={share} accessibilityRole="button" accessibilityLabel="Share result">
        <Text>Share your result</Text>
      </Pressable>
    </>
  );
}
```

**Targeting Instagram Stories directly** (skip the share sheet): use the Instagram URL scheme with the `InstagramStories` background-image. This requires hosting the image at a public URL first (upload to your backend or a CDN), then:

```ts
const bgImage = encodeURIComponent('https://cdn.yourapp.com/share/123.png');
Linking.openURL(`instagram-stories://share?backgroundImage=${bgImage}`);
```

Note this only works on devices with Instagram installed and requires the image to be publicly reachable — a constraint that often pushes teams to the generic `Sharing.shareAsync` sheet instead, which is more reliable and works cross-platform.

## When to prompt the share (the trigger)

Share prompts convert best at the **moment of peak positive emotion** — right after the "aha" outcome, a milestone, a streak, a personal record. Don't prompt on every result (fatigue); prompt on the best ones. If the result is share-worthy, surface the card *as* the result screen, with Share as the primary action.

## Pair with deep links so the shared link opens the app

A shareable image with no link is brand awareness; a shareable image with a deep link is a **conversion path**. Universal Links (iOS) + App Links (Android) open the app directly from a web URL. See `add-deep-links`. For first-launch / new-installers (deferred deep linking), use Branch.io or the DIY clipboard trick — see `build-affiliate-program` and `design-viral-loop`.

## AI outputs are the 2026 shareable card

The dominant indie model of 2024–2026 is the single-purpose AI wrapper whose **output is the card**: AI meal plan → card; AI workout summary → card; AI photo transformation → before/after card. On-device AI (Foundation Models on iOS, Gemini Nano on Android — see `add-foundation-models`, `add-gemini-nano`) makes generation instant and free, so users can produce unlimited cards, each a potential organic impression. Design the AI feature so its output *is* the share artifact.

## Measure virality

```text
share_card_shown          {trigger: result|milestone|streak|manual}
share_card_shared         {surface: instagram_story|tiktok|whatsapp|x|system_sheet}
share_link_tapped         {source: card|deep_link|referral}   // incoming, from MMP or deep-link handler
install_attributed_share  // deferred — needs Branch/AppsFlyer
```

The viral coefficient **K = i × c** (invites sent per user × conversion of those invites) is the north star. See `design-viral-loop`. A shareable card raises `i` (more users share) and, if the landing is good, `c`.

## Pair with

- `design-viral-loop` — the K-factor math and the full viral mechanic.
- `add-deep-links`, `build-affiliate-program` — so shared links open the app and attribute installs.
- `build-creator-program` — the paid amplifier for organic sharing.
- `add-foundation-models` / `add-gemini-nano` — AI-generated shareable outputs.
