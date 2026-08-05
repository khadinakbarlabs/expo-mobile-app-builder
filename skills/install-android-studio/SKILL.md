---
name: "install-android-studio"
description: "Install Android Studio IDE (Google's official Android IDE, not this plugin) with the right plugins, themes, and config for RN+Expo work. Use when the user says 'install android studio', 'set up android ide', 'install jetbrains', 'android studio plugins'."
---

# Install Android Studio IDE

The Google IDE — used for native debugging, Gradle inspection, emulator, AAB analyzer, Layout Inspector. Cursor/VSCode handles daily RN code.

## Download
developer.android.com/studio → latest stable (Koala Feature Drop 2024.3+ as of 2026).

## First-run wizard
Pick:
- UI theme: Darcula (or Material Theme UI plugin)
- Standard install (not custom, unless you know what you're skipping)
- SDK location: default `~/Library/Android/sdk`
- Accept ALL licenses (incl. Google Play TV/Auto if asked)

## Plugins to install (Preferences → Plugins)
- **Kotlin** (bundled — verify enabled)
- **Jetpack Compose** (bundled)
- **GitToolBox** — inline blame
- **Rainbow Brackets**
- **String Manipulation**
- **ADB Idea** — common ADB commands from menu
- **Database Inspector** (bundled, enable)

## Settings tweaks
- Editor → Inspections → enable Compose lints
- Build → Gradle JDK → JDK 21 (set in Project Structure)
- Build → Compiler → Build process heap size → 4096 MB
- Tools → Emulator → "Launch in tool window" = OFF (faster, separate window)

## When to use Android Studio vs Cursor
| Task | Use |
|---|---|
| Edit RN/TS code | Cursor (faster, AI) |
| Inspect Gradle build issues | Android Studio (better diagnostics) |
| AAB Analyzer (see what's inside your bundle) | Android Studio Build menu |
| Layout Inspector (live UI debug) | Android Studio |
| Native Kotlin module (`expo-modules-core`) | Android Studio |
| Profile native perf | Android Studio Profiler |
| Manage SDKs / system images | Android Studio SDK Manager |

## Common gotchas
- "Cannot resolve symbol R" → File → Invalidate Caches and Restart
- Gradle Sync fails → check `ANDROID_HOME` env var matches Project SDK location
- Slow indexing on Apple Silicon → set heap to 4-8GB
- Don't open Expo `android/` folder directly; let Expo prebuild handle it. Open from `android/` only for debugging native issues.
