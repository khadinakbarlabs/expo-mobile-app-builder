---
name: "apply-liquid-glass"
description: "Adopt iOS 26 Liquid Glass material in React Native via expo-glass-effect or @callstack/liquid-glass. Use when the user says 'Liquid Glass', 'iOS 26 design', 'glass effect', 'modern UI', 'translucent material'."
---

# Apply Liquid Glass

iOS 26's defining material. Two libraries available; both fall back gracefully on older iOS.

## Option A: expo-glass-effect (Expo SDK 54+)
```bash
npx expo install expo-glass-effect
```
```tsx
import { GlassView } from 'expo-glass-effect';

<GlassView
  style={styles.container}
  glassEffectStyle="regular"
  tintColor="rgba(255,255,255,0.3)"
  isInteractive={true}
  reducedTransparencyFallbackColor="rgba(255,255,255,0.9)"
>
  <Text>Floats on glass</Text>
</GlassView>
```

`reducedTransparencyFallbackColor` is CRITICAL for accessibility — when user has Reduce Transparency on, the GlassView falls back to this color.

## Option B: @callstack/liquid-glass (Fabric/TurboModules)
For production New Architecture apps that want closer parity to SwiftUI's glass:
```bash
npm install @callstack/liquid-glass
```

## Fallback for iOS <26
Use `expo-blur`:
```tsx
import { BlurView } from 'expo-blur';
<BlurView intensity={80} tint="systemMaterial" style={styles.toolbar}>
  <Text>Toolbar content</Text>
</BlurView>
```

## When to use
- Floating chrome: toolbars, tab bars, sheet headers, navigation
- NOT content (text, images) — glass is a chrome material

## Common mistakes
- Stacking `<GlassView>` inside another `<GlassView>` — glass can't sample glass cleanly
- Forgetting reduced-transparency fallback — fails accessibility
- Using glass on content backgrounds — looks wrong, hurts readability

## Reference
`references/01-expo-sdk-54.md`
