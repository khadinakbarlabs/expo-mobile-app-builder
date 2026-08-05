---
name: "add-expo-camera-android"
description: "Add expo-camera with Android-specific permission handling and CameraX-backed performance. Use when the user says 'add camera android', 'expo camera', 'qr scanner android'."
---

# Add Expo Camera (Android)

CameraX-backed camera with permission handling.

## Install
```bash
npx expo install expo-camera
```

## Permissions in app.json
```json
{
  "expo": {
    "plugins": [
      ["expo-camera", { "cameraPermission": "Allow $(PRODUCT_NAME) to access your camera." }]
    ]
  }
}
```

## Request runtime permission
```tsx
import { CameraView, useCameraPermissions } from 'expo-camera';

const [permission, requestPermission] = useCameraPermissions();

if (!permission) return null;
if (!permission.granted) return <Button title="Grant" onPress={requestPermission} />;

<CameraView style={{ flex: 1 }} facing="back" />
```

## QR / barcode scanning
```tsx
<CameraView
  barcodeScannerSettings={{ barcodeTypes: ['qr', 'ean13'] }}
  onBarcodeScanned={({ data }) => console.log(data)}
/>
```

## Photo capture
```tsx
const cam = useRef<CameraView>(null);
const photo = await cam.current?.takePictureAsync({ quality: 0.8 });
// photo.uri — local file path
```

## Video recording (Android 13+)
```tsx
const video = await cam.current?.recordAsync({ maxDuration: 60 });
```

## Android-specific gotchas

- "Camera not available" → emulator without webcam; enable webcam in AVD config
- Permission denied permanently → show settings deep link: `Linking.openSettings()`
- Recording requires `RECORD_AUDIO` permission too
- Some manufacturers (Xiaomi, OnePlus) restrict camera even with permission — check manufacturer-specific docs

## Pair with
- `add-expo-secure-store-keystore` if saving images encrypted
- Use `expo-image-picker` for gallery access instead of camera
