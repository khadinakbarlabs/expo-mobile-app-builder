---
name: "add-nativewind-android"
description: "Add NativeWind v5 (Tailwind for RN) to an Expo Android app. Use when the user says 'add nativewind', 'tailwind rn', 'tailwind android'."
---

# Add NativeWind v5 (Android)

Tailwind utility classes for RN. v5 (2025) is Server Components compatible.

## Install
```bash
pnpm add nativewind
pnpm add -D tailwindcss@3.3.2
npx tailwindcss init
```

## Tailwind config
```js
// tailwind.config.js
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: { extend: {} },
  plugins: [],
};
```

## Babel
NativeWind v5 doesn't need a babel plugin (uses Metro transformer).

`metro.config.js`:
```js
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const config = getDefaultConfig(__dirname);
module.exports = withNativeWind(config, { input: './global.css' });
```

`global.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Import in app entry:
```tsx
import './global.css';
```

## Usage
```tsx
import { View, Text } from 'react-native';
<View className="flex-1 bg-white items-center justify-center">
  <Text className="text-xl font-bold text-black">Hello</Text>
</View>
```

## When to use NativeWind vs Paper

NativeWind for:
- Custom design language
- Marketing-driven UI
- Fast prototyping

react-native-paper for:
- Standard Material 3 (less customization)
- Quick MVP
- Cross-platform consistency

Can mix: Paper components for inputs/buttons, NativeWind for layout.

## Common gotchas

- NativeWind doesn't handle Android-specific elevation natively — use `style={{ elevation: 4 }}`
- Variants for dark mode: `className="bg-white dark:bg-black"`
- Auto-import: install ESLint plugin to detect unused classes

## Pair with
- `apply-material3` if going Paper route
- `figma-to-rn-android` for design conversion
