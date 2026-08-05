---
name: "apply-hig"
description: "Apply Apple Human Interface Guidelines to a React Native screen. Use when the user says 'HIG compliance', 'iOS native feel', 'Apple guidelines', '44pt taps', 'Dynamic Type'."
---

# Apply HIG

Apple HIG essentials for RN devs. Non-negotiable for shipping a native-feeling iOS app.

## Touch targets: 44x44 pt minimum
- Set `minWidth: 44, minHeight: 44` on every Pressable
- Wrap small icons in transparent hit area: `<Pressable hitSlop={{top: 12, bottom: 12, left: 12, right: 12}}>`

## Dynamic Type
- All `<Text>` has `allowFontScaling` (default true) — leave it
- Don't hardcode heights on text containers — use `flex` or `minHeight`
- Test at largest size: Settings → Accessibility → Larger Text → Accessibility XXXL

## Semantic colors
```tsx
import { PlatformColor } from 'react-native';

const styles = StyleSheet.create({
  text: { color: PlatformColor('label') },           // adapts to light/dark + contrast
  secondary: { color: PlatformColor('secondaryLabel') },
  bg: { backgroundColor: PlatformColor('systemBackground') },
});
```
Available iOS semantic colors via `PlatformColor`: `label`, `secondaryLabel`, `tertiaryLabel`, `systemBackground`, `secondarySystemBackground`, `separator`, `link`, `systemBlue`, `systemRed`, etc.

## SF Symbols
```bash
npm install react-native-sfsymbols
```
```tsx
import { SFSymbol } from 'react-native-sfsymbols';
<SFSymbol name="heart.fill" size={24} color="systemRed" />
```

## Accessibility labels
Every interactive element:
```tsx
<Pressable
  accessibilityRole="button"
  accessibilityLabel="Like"
  accessibilityHint="Adds this post to favorites"
  accessibilityState={{ selected: liked }}
  onPress={onPress}
>
```

## Test before ship
- Settings → Accessibility → VoiceOver → On. Swipe through every screen.
- Settings → Display & Text Size → Larger Text → Accessibility XXXL. Open every screen.
- Settings → Accessibility → Display & Text Size → Increase Contrast → On.

## Reference
`references/05-product-design.md`
