---
name: "add-live-activity"
description: "Add a Live Activity for Lock Screen + Dynamic Island via expo-live-activity. Use when the user says 'Live Activity', 'Dynamic Island', 'Lock Screen widget', 'live updates'."
---

# Add Live Activity

Lock Screen + Dynamic Island updates via ActivityKit. Use for time-bound info: orders, rides, sports, workouts, timers.

## Install
```bash
npm install expo-live-activity
npx expo prebuild --clean
```

(For more control, also see Voltra: `react-native-live-activity`.)

## app.json
```json
{
  "expo": {
    "plugins": ["expo-live-activity"],
    "ios": {
      "infoPlist": {
        "NSSupportsLiveActivities": true,
        "NSSupportsLiveActivitiesFrequentUpdates": true
      }
    }
  }
}
```

## Define attributes (Swift, in generated `ios/` after prebuild)
```swift
struct DeliveryAttributes: ActivityAttributes {
    public struct ContentState: Codable, Hashable {
        var minutesAway: Int
        var status: String
    }
    var orderNumber: String
}
```

## Start / update / end from JS
```tsx
import * as LiveActivity from 'expo-live-activity';

// Start
const activityId = await LiveActivity.startActivity({
  attributes: { orderNumber: '1234' },
  contentState: { minutesAway: 30, status: 'Preparing' },
});

// Update
await LiveActivity.updateActivity(activityId, { minutesAway: 20, status: 'On the way' });

// End
await LiveActivity.endActivity(activityId, { minutesAway: 0, status: 'Delivered' });
```

## Push updates via APNs
Topic: `<bundle-id>.push-type.liveactivity`. Push the activity's pushToken (returned from startActivity) for remote updates.

## Limitation
- iOS-only (no Android)
- 4-hour max activity duration; can be extended via push update

## Reference
`../../docs/references/01-expo-sdk-54.md`
