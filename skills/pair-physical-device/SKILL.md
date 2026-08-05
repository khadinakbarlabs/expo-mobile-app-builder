---
name: "pair-physical-device"
description: "Pair an iPhone or iPad with Xcode for on-device testing and debugging. Use when the user says 'pair iphone', 'test on real device', 'connect physical device', 'wireless debug', 'developer mode iphone'."
---

# Pair Physical Device

Test on a real iPhone, not just simulator. Critical for camera, GPS, push, biometrics, haptics, AR.

## Prerequisites
- Apple ID added to Xcode
- iPhone/iPad on iOS 16+ (some features need iOS 17+)
- Lightning or USB-C cable for first pair (then wireless after)

## Step-by-step

### 1. Enable Developer Mode on the device (iOS 16+)
Settings -> Privacy & Security -> Developer Mode -> ON -> phone restarts.

### 2. Plug device into Mac
Trust the computer when prompted on the device.

### 3. Open Xcode -> Window -> Devices and Simulators
Your device appears. If "Preparing debugger support" hangs >5 min, restart device.

### 4. Enable wireless (recommended)
Same panel: check "Connect via network". After this, you can debug over WiFi when both Mac and device are on same network.

### 5. Run RN/Expo app on device
```bash
# Expo
npx expo run:ios --device

# Bare RN
npx react-native run-ios --device "the user's iPhone"
```

## Common gotchas

- "Untrusted Developer" dialog on device first run: Settings -> General -> VPN & Device Management -> trust your dev certificate
- Wireless debug only works when device is unlocked
- Some features (Live Activities, Widgets) MUST be tested on physical device — simulator has bugs
- iOS 17+ requires Developer Mode; the toggle only appears AFTER you connect to Xcode once

## Next: enable wireless cycle for daily use
After paired wirelessly, you can disconnect cable and continue debugging. Battery on device drains faster though — keep cable plugged for long sessions.
