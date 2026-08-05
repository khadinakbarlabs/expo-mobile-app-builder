---
name: "add-image-android"
description: "Add expo-image for high-performance image loading on Android with caching, blurhash, and lazy loading. Use when the user says 'add expo-image', 'fast images rn android', 'image cache android'."
---

# Add expo-image (Android)

Drop-in `<Image>` replacement with caching, blurhash, WebP support, and SVG.

## Install
```bash
npx expo install expo-image
```

## Use
```tsx
import { Image } from 'expo-image';

<Image
  source={{ uri: 'https://cdn.example.com/image.jpg' }}
  style={{ width: 200, height: 200 }}
  contentFit="cover"
  placeholder={{ blurhash: 'L6PZfSi_.AyE_3t7t7R**0o#DgR4' }}
  transition={300}
  cachePolicy="memory-disk"
/>
```

## Why over RN Image

- Disk cache by default (RN Image doesn't on Android)
- Blurhash placeholder
- WebP encoding/decoding
- Tinting + content fit modes
- Transitions (fade-in on load)

## Cache policies

- `none` — no cache
- `disk` — disk only
- `memory` — RAM only
- `memory-disk` — both (default, recommended)

## Performance tips

```tsx
<Image
  // Provide intrinsic size to avoid layout shifts
  source={{ uri, width: 800, height: 600 }}
  // Use lower-res placeholder during list scroll
  recyclingKey={uri}
  // For very large lists
  priority="low"
/>
```

## Local assets

```tsx
import Logo from '../assets/logo.png';
<Image source={Logo} />
```

## SVG support

```bash
pnpm add react-native-svg
```

Use `<SvgUri />` for remote SVG.

## Android-specific gotchas

- Glide-backed under the hood
- Animated WebP/GIF works
- Don't render >1000 images simultaneously (use FlashList virtualization)
- Memory cache cleared on app background; disk cache persists

## Pair with
- `add-flashlist` for image-heavy lists
- `optimize-aab-size` (image assets bloat AAB)
