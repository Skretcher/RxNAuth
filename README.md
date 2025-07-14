# 📱 RxNAuth – React Native Firebase Authentication App

A simple React Native authentication app using **email/password login** with **Firebase Authentication**. Supports registration, login, and persistent login state.

---

## 📂 Folder Structure
```
RxNAuth/
├── android/
├── ios/
├── src/
│   ├── screens/
│   │   ├── LoginScreen.js
│   │   ├── SignupScreen.js
│   │   └── HomeScreen.js
│   └── utils/
│       └── firebase.js
├── App.jsx
├── package.json
├── README.md
```

---

## 🚀 Getting Started

### 1. **Initialize React Native App (Without Expo)**

```bash
npx @react-native-community/cli init RxNAuth
cd RxNAuth
```

---

### 2. **Install Dependencies**

```bash
# Navigation
npm install @react-navigation/native
npm install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated react-native-vector-icons
npm install @react-navigation/native-stack

# Firebase SDK
npm install firebase
npm install @react-native-firebase/app
npm install @react-native-firebase/auth

# AsyncStorage for auth persistence
npm install @react-native-async-storage/async-storage
npx pod-install
```

---

### 3. **Android Firebase Setup**

#### ✅ Firebase Console
- Create Firebase project → `baisc-auth`
- Add Android app with package name: `com.rxnauth`
- Download `google-services.json` and place it in:  
  `android/app/google-services.json`

#### ✅ `android/build.gradle` (Project level)
```groovy
buildscript {
  dependencies {
    classpath 'com.google.gms:google-services:4.3.15' // ✅ Add this line
  }
}
```

#### ✅ `android/app/build.gradle` (App level)
At the bottom:

```groovy
apply plugin: 'com.google.gms.google-services' // ✅ Required to enable Firebase
```

In `plugins {}` (if you're using newer syntax):

```groovy
plugins {
  id 'com.google.gms.google-services'
}
```

---

## 🔥 Firebase Integration

### 📁 `src/utils/firebase.js`

```js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyDu2ssvpXQvoKhOuTl6qyFUYP-A_oIqWdE",
  authDomain: "baisc-auth.firebaseapp.com",
  projectId: "baisc-auth",
  storageBucket: "baisc-auth.appspot.com",
  messagingSenderId: "160932968063",
  appId: "1:160932968063:web:f1268daddff62ee557f14a",
  measurementId: "G-D0P8F5R38H"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };
```

---

## 🔀 Navigation Setup

### 📁 App.jsx

```jsx
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import HomeScreen from './src/screens/HomeScreen';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './src/utils/firebase';
import { useState, useEffect } from 'react';

const Stack = createNativeStackNavigator();

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      if (initializing) setInitializing(false);
    });
    return unsubscribe;
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? 'Home' : 'Login'}>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ title: 'Create Account' }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

---

## 🧠 Mistakes & Fixes

| ❌ Mistake                              | ✅ Fix                                                                           |
| -------------------------------------- | ------------------------------------------------------------------------------- |
| `"auth.default is not a function"`     | Export `auth` properly from `firebase.js`, not as `default`                     |
| `"Firebase already initialized"`       | Use `initializeAuth` with AsyncStorage only once                                |
| `"Screen 'Home' not found"`            | Ensure `'Home'` is defined inside `Stack.Navigator`                             |
| Firebase auth not persisting           | Use `@react-native-async-storage/async-storage` and pass it to `initializeAuth` |
| Forgot to apply Google Services plugin | Add `apply plugin: 'com.google.gms.google-services'` in app-level Gradle        |
| Signup not working                     | Make sure to `await` and handle `createUserWithEmailAndPassword` correctly      |

---

## ✅ Features Implemented

- [x] Signup with Firebase
- [x] Login with Firebase
- [x] Navigation between screens
- [x] Firebase auth state persistence using AsyncStorage
- [x] Auto-login user if already authenticated

---

## 📌 Future Enhancements

- Add Logout button
- Add Forgot Password feature
- Validate inputs with regex
- Handle loading state

---



## 📝 License

This project is open-source and free to use under the [MIT License](LICENSE).

---

## 👨‍💻 Developed by

**Devendra Kumar Singh**
