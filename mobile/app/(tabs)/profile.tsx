import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { auth } from '../../lib/firebase';
import { signOut, onAuthStateChanged, User } from 'firebase/auth';
import { useRouter } from 'expo-router';
import { registerForPushNotificationsAsync } from '../../lib/notifications';

export default function ProfileScreen() {
  const [user, setUser] = useState<User | null>(null);
  const [pushToken, setPushToken] = useState<string | undefined>();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (user) {
      registerForPushNotificationsAsync().then(token => setPushToken(token));
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (!user) {
    return (
      <View className="flex-1 bg-gray-50 dark:bg-gray-900 justify-center items-center px-4">
        <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Not Logged In
        </Text>
        <TouchableOpacity
          onPress={() => router.push('/login')}
          className="bg-blue-600 px-6 py-3 rounded-lg"
        >
          <Text className="text-white text-lg font-semibold">Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50 dark:bg-gray-900 px-4 pt-8">
      <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Profile</Text>

      <View className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-4">
        <Text className="text-gray-600 dark:text-gray-400 mb-2">Email</Text>
        <Text className="text-lg text-gray-900 dark:text-white mb-4">{user.email}</Text>

        <Text className="text-gray-600 dark:text-gray-400 mb-2">User ID</Text>
        <Text className="text-sm text-gray-900 dark:text-white font-mono">{user.uid}</Text>
      </View>

      {pushToken && (
        <View className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-4">
          <Text className="text-gray-600 dark:text-gray-400 mb-2">Push Notifications</Text>
          <Text className="text-sm text-green-600 dark:text-green-400">✓ Enabled</Text>
        </View>
      )}

      <TouchableOpacity
        onPress={handleLogout}
        className="bg-red-500 px-6 py-3 rounded-lg"
      >
        <Text className="text-white text-lg font-semibold text-center">Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
