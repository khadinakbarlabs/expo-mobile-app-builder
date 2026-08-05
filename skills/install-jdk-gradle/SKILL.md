---
name: "install-jdk-gradle"
description: "Install JDK 21 and configure Gradle for RN+Expo Android builds with the right wrapper version and AGP. Use when the user says 'install jdk', 'jdk 21', 'gradle setup', 'install gradle', 'fix gradle version'."
---

# Install JDK + Gradle

AGP 8.6+ requires JDK 21. AGP 8.0-8.5 works with 17. RN 0.83+ ships AGP 8.6.

## Install JDK 21 (LTS)
```bash
# macOS — Zulu (free, Azul builds)
brew install --cask zulu@21

# Or Temurin (Eclipse Adoptium)
brew install --cask temurin@21

# Verify
java -version           # → 21.x
javac -version          # → 21.x

# /usr/libexec/java_home on macOS shows install path
/usr/libexec/java_home -V
```

## Set JAVA_HOME
```bash
# ~/.zshrc
export JAVA_HOME=$(/usr/libexec/java_home -v 21)
export PATH=$JAVA_HOME/bin:$PATH
```

## Gradle (don't install globally — use wrapper)
Each project ships its own Gradle via wrapper (`gradlew`). Never run `gradle` directly.

```bash
cd android
./gradlew --version
```

If wrapper is missing or wrong version:
```bash
./gradlew wrapper --gradle-version 8.11.1 --distribution-type all
```

## AGP (Android Gradle Plugin)
Set in `android/build.gradle`:
```gradle
buildscript {
    ext {
        agpVersion = "8.6.0"   // matches RN 0.83
        kotlinVersion = "2.0.21"
        compileSdkVersion = 35
        targetSdkVersion = 35  // bump to 36 by Aug 31, 2026
        minSdkVersion = 24     // Android 7.0 — Expo SDK 54 minimum
    }
}
```

## Multiple JDK versions
If you need both 17 and 21:
```bash
brew install --cask zulu@17 zulu@21

# Switch via .zshrc function:
jdk17() { export JAVA_HOME=$(/usr/libexec/java_home -v 17); }
jdk21() { export JAVA_HOME=$(/usr/libexec/java_home -v 21); }
```

## Common gotchas
- "Cannot find symbol" or weird AGP errors → wrong JDK active, run `java -version` to verify
- Gradle daemon stuck → `./gradlew --stop` then retry
- Apple Silicon: use ARM64 JDK builds (Zulu and Temurin both ship ARM)
- Don't `brew install gradle` — wrapper handles it
- "Could not determine java version from 21.0.x" → upgrade AGP to 8.6+
