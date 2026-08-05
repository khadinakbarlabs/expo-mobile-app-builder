---
name: "add-image"
description: "Use expo-image for performant image loading + caching, never react-native Image. Use when the user says 'images', 'expo-image', 'image caching', 'image loading'."
---

# Add Expo Image

`expo-image` is the 2026 default for image loading + caching. Replaces `react-native` Image.

## Install
```bash
npx expo install expo-image
```

## Basic usage
```tsx
import { Image } from 'expo-image';

<Image
  source={{ uri: 'https://example.com/avatar.jpg' }}
  style={{ width: 60, height: 60, borderRadius: 30 }}
  contentFit="cover"
  transition={200}
  cachePolicy="memory-disk"
  placeholder={blurhash}  // Blurhash string for instant placeholder
/>
```

## Why not react-native Image
- expo-image uses native image loaders (SDWebImage on iOS, Glide on Android)
- ~3-5x faster decode + render
- Built-in memory + disk cache
- Blurhash placeholder support
- HEIC, WebP, AVIF support out of the box

## Cache management
```tsx
import { Image } from 'expo-image';

await Image.prefetch(['https://example.com/img1.jpg', '...']);
await Image.clearMemoryCache();
await Image.clearDiskCache();
```

## Common mistakes
- Loading huge unprocessed images → memory spike. Use thumbnails or `transform: [{ scale: 0.5 }]`.
- No `placeholder` for slow networks → user sees blank
- Forgetting `contentFit` → images stretch
