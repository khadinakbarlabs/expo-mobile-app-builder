---
name: "add-watch-app"
description: "Add an Apple Watch app via expo-apple-targets + react-native-watch-connectivity. Use when the user says 'Apple Watch', 'watchOS', 'companion app', 'Watch Connectivity'."
---

# Add Watch App

Apple Watch companion. **Watch UI is SwiftUI only — cannot be written in JS.** Use `expo-apple-targets` to add a SwiftUI target, then `react-native-watch-connectivity` to communicate.

## When to add a Watch app
- Glanceable info (timer, streak, status)
- Quick actions (start workout, add note)
- Complications (watch face widgets)
- Don't add for content/social/long sessions — bad UX

## Install
```bash
npm install @bacons/apple-targets react-native-watch-connectivity
npx expo prebuild --clean
```

## app.json
```json
{
  "expo": {
    "plugins": [
      ["@bacons/apple-targets", { "targets": ["./targets/watch"] }]
    ]
  }
}
```

## Watch SwiftUI view (in `targets/watch/ContentView.swift`)
```swift
import SwiftUI

struct ContentView: View {
    @State private var streak = SharedStore.streak()
    var body: some View {
        VStack {
            Text("\(streak)").font(.system(size: 60, weight: .bold))
            Text("Day Streak").font(.caption2)
            Button("Log Today") {
                streak += 1
                SharedStore.setStreak(streak)
                WatchConnectivity.send(["streak": streak])
            }
        }
    }
}
```

## Communicate with iPhone from JS
```ts
import { sendMessage, watchEvents } from 'react-native-watch-connectivity';

await sendMessage({ streak: 7 });

watchEvents.on('message', (msg) => {
  console.log('From watch:', msg);
});
```

## Skip Watch if
- App needs heavy compute / network / large screen
- Just ship widgets + Live Activity instead — covers 80% of Watch use cases for less work
