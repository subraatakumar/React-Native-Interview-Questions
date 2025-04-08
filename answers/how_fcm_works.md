Here's a simple example to help you understand how FCM (Firebase Cloud Messaging) works with both a **backend server** and a **React Native frontend app**. This walkthrough includes detailed steps for setup, coding, and testing push notifications.

---

## 🔧 What We’re Building

- **Frontend (React Native with Expo + Firebase)**: A simple app that registers for push notifications and sends the device token to the backend.
- **Backend (Node.js + Express)**: A basic server to store device tokens and send push notifications using Firebase Admin SDK.

---

## 🔁 Flow Overview

1. User opens app → app requests push notification permissions.
2. FCM provides a unique **device token**.
3. The app sends this token to the **backend**.
4. Backend stores the token.
5. When triggered (e.g., via endpoint), backend sends a push notification using **Firebase Admin SDK** to that token.
6. App receives and displays the notification.

---

## 🔌 Step 1: Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/).
2. Create a new project.
3. Go to **Project Settings > Cloud Messaging**.
4. Copy the **Server key** and **Sender ID**.
5. Download the `google-services.json` for Android and `GoogleService-Info.plist` for iOS if using bare React Native. For Expo, we don't need them directly.

---

## 📱 Step 2: React Native Frontend (Expo + FCM)

### ✅ 2.1. Install dependencies

```bash
npx create-expo-app FCMExample
cd FCMExample

npx expo install expo-notifications expo-device
```

### ✅ 2.2. Configure app

**`App.js`**

```js
import React, { useEffect, useRef, useState } from 'react';
import { View, Button, Platform, Text } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
      if (token) {
        setExpoPushToken(token);
        // Send token to backend
        fetch('http://YOUR_SERVER_IP:4000/save-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });
      }
    });

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification received:', notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Notification clicked:', response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Your Expo Push Token:</Text>
      <Text selectable>{expoPushToken}</Text>
    </View>
  );
}

async function registerForPushNotificationsAsync() {
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      alert('Permission for push notifications not granted!');
      return;
    }

    const tokenData = await Notifications.getExpoPushTokenAsync();
    return tokenData.data;
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
    });
  }
}
```

---

## 🌐 Step 3: Backend with Node.js + Firebase Admin

### ✅ 3.1. Set up project

```bash
mkdir fcm-server && cd fcm-server
npm init -y
npm install express cors body-parser firebase-admin
```

### ✅ 3.2. Add Firebase Admin credentials

- Go to Firebase Console → Project Settings → Service accounts → Generate new private key.
- Save it as `serviceAccountKey.json`.

### ✅ 3.3. Backend code

**`index.js`**

```js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
const PORT = 4000;
let tokens = [];

app.use(cors());
app.use(bodyParser.json());

app.post('/save-token', (req, res) => {
  const { token } = req.body;
  if (token && !tokens.includes(token)) {
    tokens.push(token);
    console.log('Token saved:', token);
  }
  res.send({ success: true });
});

app.post('/send-notification', async (req, res) => {
  const message = {
    notification: {
      title: req.body.title || 'Test Notification',
      body: req.body.body || 'This is a test message',
    },
    tokens,
  };

  try {
    const response = await admin.messaging().sendMulticast(message);
    console.log('Notification sent:', response);
    res.send(response);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

app.listen(PORT, () => {
  console.log(`FCM server running on http://localhost:${PORT}`);
});
```

---

## 🚀 Step 4: Test It

1. **Run the backend**:

```bash
node index.js
```

2. **Run the Expo app**:

```bash
npx expo start
```

3. Open app on a physical device (push notifications won’t work in simulator/emulator).

4. Use Postman or CURL to test:

```bash
curl -X POST http://localhost:4000/send-notification \
  -H "Content-Type: application/json" \
  -d '{"title":"Hello","body":"This is a test push from backend!"}'
```

---

## ✅ Summary

- **Expo/React Native app** gets the push token.
- **Backend** stores it and can send notifications via FCM.
- FCM handles delivery and the app listens for and displays the notifications.

---
