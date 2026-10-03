---
name: "install-jdk-gradle"
description: "Diagnose and plan the Java, AGP and Gradle toolchain compatible with the existing Expo Android project. Use for JDK setup, Gradle compatibility, or Java version build failures."
---

# Configure the Android Java and Gradle Toolchain

Inspect the current Expo SDK, React Native, Android Gradle Plugin (AGP), Gradle wrapper and CI configuration before choosing Java. Use https://developer.android.com/build/jdks and the exact AGP release notes at https://developer.android.com/build/releases/gradle-plugin for compatibility. AGP 8.x requires JDK 17; do not assert AGP 8.6 requires JDK 21 or substitute a newer React Native toolchain into an Expo SDK 54 project.

## Read-only diagnosis

With authorization to inspect the project, read its Gradle configuration, wrapper properties and CI Java setup. Run local version checks such as `java -version` and `javac -version`. Inspect the committed wrapper's origin and distribution URL/checksum before executing it, because a wrapper runs project code and may download a distribution.

## Plan before changing the machine

Select the Java version compatible with that project's locked toolchain. Prefer the existing Android Studio JDK where compatible. If installation is necessary, present an official vendor or trusted package-manager source, version, scope and proposed changes; obtain missing installation authorization. Do not automatically install JDKs, rewrite shell profiles, alter global PATH, upgrade AGP or regenerate the Gradle wrapper.

Use temporary session/project configuration for JAVA_HOME where practical. Explain how the owner can restore their previous selection. Preserve generated Expo configuration and avoid independent AGP/Kotlin/SDK overrides that invalidate Expo compatibility.

## Verify and deliver

After an authorized change, verify Java and the trusted project wrapper versions, then run the affected build using existing project instructions. Report the precise toolchain, build result and any unresolved compatibility issue. A passing version check does not prove a successful Android build.
