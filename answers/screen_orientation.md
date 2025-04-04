# Setting Screen Orientation in React Native

There are several ways to control screen orientation in a React Native app. Here are the most common approaches:

## 1. Using `expo-screen-orientation` (for Expo projects)

```javascript
import * as ScreenOrientation from 'expo-screen-orientation';

// Lock to portrait
async function lockPortrait() {
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
}

// Lock to landscape
async function lockLandscape() {
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
}

// Allow all orientations
async function unlock() {
  await ScreenOrientation.unlockAsync();
}
```

## 2. Using `react-native-orientation-locker` (for bare React Native projects)

First install the package:
```bash
npm install react-native-orientation-locker
# or
yarn add react-native-orientation-locker
```

Then use it in your components:
```javascript
import Orientation from 'react-native-orientation-locker';

// Lock to portrait
Orientation.lockToPortrait();

// Lock to landscape
Orientation.lockToLandscape();

// Allow all orientations
Orientation.unlockAllOrientations();

// Listen to orientation changes
useEffect(() => {
  const subscription = Orientation.addOrientationListener((orientation) => {
    console.log('Orientation changed to:', orientation);
  });

  return () => {
    Orientation.removeOrientationListener(subscription);
    // Or for v1.1.8+: subscription.remove();
  };
}, []);
```

## 3. Native Configuration

### iOS (Info.plist)
Add these keys to your Info.plist:
```xml
<key>UISupportedInterfaceOrientations</key>
<array>
  <string>UIInterfaceOrientationPortrait</string>
</array>
<key>UISupportedInterfaceOrientations~ipad</key>
<array>
  <string>UIInterfaceOrientationPortrait</string>
  <string>UIInterfaceOrientationPortraitUpsideDown</string>
  <string>UIInterfaceOrientationLandscapeLeft</string>
  <string>UIInterfaceOrientationLandscapeRight</string>
</array>
```

### Android (AndroidManifest.xml)
In your AndroidManifest.xml, add this to your activity:
```xml
<activity
  android:name=".MainActivity"
  android:screenOrientation="portrait"
  ... >
```

## 4. Per-Screen Orientation

You can control orientation per screen using lifecycle methods:

```javascript
import { useFocusEffect } from '@react-navigation/native';

function MyScreen() {
  useFocusEffect(
    React.useCallback(() => {
      // Lock to landscape when screen is focused
      Orientation.lockToLandscape();
      
      return () => {
        // Reset to portrait when screen is unfocused
        Orientation.lockToPortrait();
      };
    }, [])
  );
  
  return (
    // Your screen content
  );
}
```

Choose the method that best fits your project type (Expo or bare React Native) and requirements.
