import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { auth } from '../lib/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push('/(tabs)');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-gray-50 dark:bg-gray-900 justify-center px-6">
      <View className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
        <Text className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
          {isSignup ? 'Sign Up' : 'Login'} to Insight24
        </Text>

        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email
          </Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </View>

        <View className="mb-6">
          <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Password
          </Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </View>

        <TouchableOpacity
          onPress={handleSubmit}
          disabled={loading}
          className={`w-full py-3 bg-blue-600 rounded-lg mb-4 ${loading ? 'opacity-50' : ''}`}
        >
          <Text className="text-white text-center text-lg font-semibold">
            {loading ? 'Loading...' : isSignup ? 'Sign Up' : 'Login'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIsSignup(!isSignup)}>
          <Text className="text-center text-sm text-gray-600 dark:text-gray-400">
            {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
            <Text className="text-blue-600 dark:text-blue-400">
              {isSignup ? 'Login' : 'Sign Up'}
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
