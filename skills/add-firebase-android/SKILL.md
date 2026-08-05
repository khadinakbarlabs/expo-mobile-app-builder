---
name: "add-firebase-android"
description: "Add Firebase Android SDK for Crashlytics, FCM, Test Lab. Use when the user says 'add firebase android'."
---

# Add Firebase (Android)

```bash
npx expo install @react-native-firebase/app @react-native-firebase/crashlytics
```

`app.json` plugin config; place `google-services.json` in `android/app/`.

## Crashlytics
```tsx
import crashlytics from '@react-native-firebase/crashlytics';
crashlytics().log('User opened paywall');
crashlytics().recordError(new Error('Custom error'));
crashlytics().setUserId(userId);
```

## Symbol upload (for native crashes)
Configure in `android/app/build.gradle`:
```gradle
apply plugin: "com.google.firebase.crashlytics"
firebaseCrashlytics { nativeSymbolUploadEnabled true }
```

## Test crash
```tsx
crashlytics().crash(); // hard crash
```
Wait 5 min → Firebase console → Crashlytics → see crash.

## Pair with
- `set-up-firebase-project`, `add-sentry-rn-android`
