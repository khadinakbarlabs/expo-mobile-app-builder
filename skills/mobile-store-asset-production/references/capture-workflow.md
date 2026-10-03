# Capture, compose, and validate

Requirements reviewed 2026-10-03. Recheck them when producing or submitting an asset pack; supported form factors and accepted dimensions can change.

## Primary requirements

- [Apple screenshot specifications](https://developer.apple.com/help/app-store-connect/reference/app-information/screenshot-specifications): match the actual supported device classes and accepted sizes. The reviewed iPhone 6.9-inch group includes portrait 1260×2736, 1290×2796, and 1320×2868; the iPhone 6.5-inch group is required when 6.9-inch screenshots are absent. iPad support requires the 13-inch group (2064×2752 or 2048×2732 portrait in the reviewed page). Apple accepts 1–10 JPEG/PNG images without transparency. These examples are not an exhaustive or permanent matrix.
- [Google Play preview assets](https://support.google.com/googleplay/android-developer/answer/9866151?hl=en): distinguish baseline eligibility from recommendation-format requirements. The reviewed baseline is at least two screenshots, JPEG or 24-bit PNG without alpha, dimensions from 320 to 3840 pixels, with the longest side no more than twice the shortest. Recommendation formats for apps call for at least four 1080px-minimum screenshots at 9:16 portrait or 16:9 landscape. Review tablet, Wear OS, TV, Automotive, and XR sections only when supported.
- [Apple review guidelines](https://developer.apple.com/app-store/review/guidelines/): check accurate metadata and feature representation. Recheck applicable rules for subscriptions, sensitive claims, and previews.

Record the chosen requirement URL, checked date, device class, accepted dimension, format, image count, and requirement level in the pack. Do not call 1080×1920 a universal Google Play minimum or assume a fixed iPhone model is always required.

## Runtime capture

1. Identify the current installed app and build/commit association. Record unknown association honestly.
2. Use local test accounts and clearly permissioned fictional fixture data. Never expose real customers, billing information, notifications, emails, or keys.
3. Reach the required screen through the real app flow. Confirm its primary action worked and no loading/error overlay is hidden by editing.
4. Capture each locale and supported device class. Record OS, device/simulator, orientation, theme, accessibility text size, route, fixture, and time.
5. Preserve untouched originals. Associate each original with the final composition and validation record. If data/behavior changes, recapture rather than painting replacement UI over an outdated image.

A local component export via [Expo SDK 54 react-native-view-shot](https://docs.expo.dev/versions/v54.0.0/sdk/captureRef/) can be useful for app-owned result cards; it captures a view and may omit system chrome or unsupported surfaces. Do not assume it produces a full store screenshot. Use the current runtime and a suitable full-screen capture surface for store proof. Inspect capture commands/tool help rather than guessing IDs, device names, or destinations.

## Storyboard and composition

Choose a small coherent narrative: core outcome, differentiating task, useful detail, recovery/continuity, and supported companion surface. The image count is a creative decision bounded by actual platform rules. Do not invent user counts, testimonials, ratings, conversion statistics, awards, prices, or comparison results. Actual UI should be legible at store thumbnail size.

For Play, review the preview-assets content guidance before adding testimonials, rankings, promotional price claims, device imagery, or install CTAs. Rules vary by asset type; do not reuse an App Store composition blindly. Headlines should clarify a demonstrated task. Confirm whether the claim remains true in free and paid states.

Localize the actual UI and the caption together. Review native phrasing, line breaks, long text, RTL order, locale-specific units, and prices against the current product. Do not ship a translated headline over an unrelated untranslated screen without a documented reason.

Generated backgrounds or illustrative art can support a truthful composition; keep their source/prompt/license and generated status separate from runtime originals. A device frame is presentation, not physical-device QA. Keep frame licenses and platform/device accuracy in the asset inventory.

## Export QA and handoff

Check file parseability, exact dimensions, alpha/color mode, orientation, compression clarity, locale, caption legibility, clipping, copyright/trademarks, original linkage, feature availability, and policy source/date. Name files predictably by platform/device/locale/order. Deliver the local pack and an explicit pending-capture/pending-review list. Do not upload assets or launch a store experiment as part of local export.
