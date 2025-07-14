import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen'; // ✅ renamed
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => (
  <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Signup" component={SignupScreen} /> {/* ✅ Corrected name */}
    <Stack.Screen name="Home" component={HomeScreen} />
  </Stack.Navigator>
);

export default AuthStack;
