// src/utils/firebase.js
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyDu2ssvpXQvoKhOuTl6qyFUYP-A_oIqWdE",
  authDomain: "baisc-auth.firebaseapp.com",
  projectId: "baisc-auth",
  storageBucket: "baisc-auth.firebasestorage.app",
  messagingSenderId: "160932968063",
  appId: "1:160932968063:web:f1268daddff62ee557f14a",
  measurementId: "G-D0P8F5R38H"
};

// Initialize Firebase app (only once)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Auth with AsyncStorage persistence (only once)
let auth;
try {
  auth = getAuth(app);
} catch (error) {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
}

export { auth };
