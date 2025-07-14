import AsyncStorage from '@react-native-async-storage/async-storage';

// ✅ Store user object (e.g., during signup)
export const storeUser = async (user) => {
  try {
    await AsyncStorage.setItem('user', JSON.stringify(user));
    console.log('User saved to storage:', user);
  } catch (e) {
    console.error('Error saving user:', e);
  }
};

// ✅ Retrieve stored user (e.g., during login)
export const getUser = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('user');
    const user = jsonValue != null ? JSON.parse(jsonValue) : null;
    console.log('Retrieved user from storage:', user);
    return user;
  } catch (e) {
    console.error('Error fetching user:', e);
    return null;
  }
};

// ✅ Remove stored user (e.g., during logout)
export const removeUser = async () => {
  try {
    await AsyncStorage.removeItem('user');
    console.log('User removed from storage');
  } catch (e) {
    console.error('Error removing user:', e);
  }
};
