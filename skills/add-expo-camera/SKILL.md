---
name: "add-expo-camera"
description: "Add expo-camera for in-app camera, video recording, barcode scanning. Use when the user says 'camera', 'expo-camera', 'take photo', 'barcode scan', 'QR scanner'."
---

# Add Expo Camera

In-app camera for photo, video, barcode/QR.

## Install
```bash
npx expo install expo-camera
```

## app.json
```json
{
  "expo": {
    "plugins": [
      ["expo-camera", { "cameraPermission": "Allow $(PRODUCT_NAME) to access your camera." }]
    ]
  }
}
```

## Photo capture
```tsx
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState<string | null>(null);
  const ref = useRef<CameraView>(null);

  if (!permission) return <View />;
  if (!permission.granted) return <Pressable onPress={requestPermission}><Text>Grant camera</Text></Pressable>;

  const takePhoto = async () => {
    const result = await ref.current?.takePictureAsync({ quality: 0.8 });
    if (result?.uri) setPhoto(result.uri);
  };

  return (
    <CameraView ref={ref} style={{ flex: 1 }} facing="back">
      <Pressable onPress={takePhoto} style={styles.shutterButton} />
    </CameraView>
  );
}
```

## Barcode / QR scanning
```tsx
const handleBarcodeScanned = ({ data }: { data: string }) => {
  if (!/^[A-Za-z0-9._~-]{1,256}$/.test(data)) {
    showInvalidCodeMessage();
    return;
  }

  router.push({ pathname: '/scanned/[data]', params: { data } });
};

<CameraView
  barcodeScannerSettings={{ barcodeTypes: ['qr', 'ean13', 'code128'] }}
  onBarcodeScanned={handleBarcodeScanned}
  style={{ flex: 1 }}
/>
```

## Permission pre-prompt
Always pre-prompt with custom UI explaining WHY before triggering system dialog. iOS only gives ONE shot — denied = locked out unless user opens Settings manually.

Treat barcode data as untrusted input. Validate its expected format and pass it as a structured route parameter; do not concatenate it into a navigation URL or use it to open arbitrary links.

## Reference
`../../docs/references/01-expo-sdk-54.md`
