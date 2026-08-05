---
name: "pair-android-device"
description: "Pair a physical Android phone or tablet via USB or wireless ADB for on-device testing. Use when the user says 'pair android phone', 'usb debugging', 'wireless adb', 'connect physical device android', 'test on real android'."
---

# Pair Physical Android Device

Test on real hardware — especially for camera, GPS, push, biometrics, haptics, foldables, and battery/perf.

## Enable Developer Options
Settings → About phone → tap "Build number" 7 times → Developer Mode unlocked.

Settings → System → Developer options → enable:
- USB debugging
- Stay awake (while charging)
- Wireless debugging (Android 11+)

## USB pair (first time)
1. Plug in USB-C cable
2. On phone: "Allow USB debugging from this computer?" → check "Always allow" → Allow
3. `adb devices` on Mac → shows device serial
```bash
adb devices
# List of devices attached
# 1A2B3C4D5E       device
```

## Wireless ADB (Android 11+)
Pair once via WiFi (no cable after that):
```bash
# On phone: Developer options → Wireless debugging → Pair device with pairing code
# It shows: ip:port + 6-digit code

# On Mac:
adb pair 192.168.1.42:42121
# Enter the 6-digit code when prompted

# Then connect (use the OTHER port shown in same screen):
adb connect 192.168.1.42:5555

# Verify
adb devices
```

## Run RN/Expo on device
```bash
# Expo dev build
npx expo run:android --device

# OR just installed bundle
npx expo start --dev-client
# Then on phone: open the dev client app, scan QR
```

## Run prod build on device
```bash
# Install local AAB
bundletool build-apks --bundle=app.aab --output=app.apks --connected-device
bundletool install-apks --apks=app.apks
```

## Common gotchas
- USB-C cable matters — data cable required (some "charge only" cables don't work)
- Multiple Android devices: `adb -s 1A2B3C4D5E install app.apk`
- Wireless ADB drops on screen lock — keep screen on or re-pair
- "INSTALL_FAILED_USER_RESTRICTED" → enable "USB debugging (Security settings)" too on some Xiaomi/Oppo
- Manufacturer skins (MIUI, OneUI) often need extra "Install via USB" toggle
