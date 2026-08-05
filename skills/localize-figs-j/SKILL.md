---
name: "localize-figs-j"
description: "Localize ASO + paywall + onboarding for FIGS+J (French, Italian, German, Spanish, Japanese). Each locale unlocks +160 indexed chars. Use when the user says 'localize', 'FIGS J', 'translate app', 'multi-language'."
---

# Localize FIGS+J

Each additional locale unlocks **+160 indexable chars** (30+30+100). The English market is the most competitive globally — translating into FIGS+J unlocks visibility in markets where 80% of competitors haven't bothered.

## Tier 1 — FIGS+J (do these first, ~80% of non-English revenue)
- French (France) — `fr-FR`
- Italian — `it-IT`
- German — `de-DE`
- Spanish (Mexico for LATAM volume, Spain for purchasing power) — `es-MX` / `es-ES`
- Japanese (highest ARPU mobile market on the planet) — `ja-JP`

## Tier 2 — add when Tier 1 is paying off
- Brazilian Portuguese — `pt-BR`
- Korean — `ko-KR`
- Simplified Chinese — `zh-Hans` (China App Store has its own rules)

## Tier 3 — opportunistic
- Turkish, Arabic, Vietnamese, Indonesian (high growth, low competition)

## March 2026 update
Apple expanded App Store Connect from 39 → **50 supported localizations**. Most indies still only ship English-US.

## Cost-efficient workflow
1. **Machine translate everything first** — DeepL > GPT-5 > Google Translate for European; native-speaker LLM for Asian
2. **Native speaker reviews ONLY 3 things**:
   - The paywall copy (where money is made)
   - The first 3 onboarding screens
   - First 3 lines of App Store description (above "more" fold)
3. **Cross-localization trick** — Even "English (UK)" and "English (Australia)" each unlock new keyword char allowances. Apple indexes them separately. **Free 320 extra characters for 5 minutes of work.**

## In-app localization (i18n)
For Expo apps:
```bash
npx expo install expo-localization i18n-js
```
```ts
import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';

const i18n = new I18n({
  en: { hello: 'Hello' },
  fr: { hello: 'Bonjour' },
  ja: { hello: 'こんにちは' },
});
i18n.locale = getLocales()[0].languageCode;
```

## ASO localization
ASC → App Store → app → version → + Add Language. Translate Name, Subtitle, Keywords, Promotional Text, Description, screenshots.

## Reference
`references/04-discovery-listing.md`
