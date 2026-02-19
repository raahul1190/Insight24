import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { auth, db } from '../../lib/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import NewsCard from '../../components/NewsCard';
import { useRouter } from 'expo-router';

export default function BookmarksScreen() {
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser;
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const bookmarksRef = collection(db, 'users', user.uid, 'bookmarks');
    const q = query(bookmarksRef, orderBy('savedAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const bookmarksData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBookmarks(bookmarksData);
      setLoading(false);
    });

    return unsubscribe;
  }, [user]);

  if (!user) {
    return (
      <View className="flex-1 bg-gray-50 dark:bg-gray-900 justify-center items-center px-4">
        <Text className="text-xl text-gray-900 dark:text-white mb-4">
          Please login to view bookmarks
        </Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View className="flex-1 bg-gray-50 dark:bg-gray-900 justify-center items-center">
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50 dark:bg-gray-900">
      <Text className="text-3xl font-bold text-gray-900 dark:text-white px-4 pt-4 mb-4">
        Saved Articles
      </Text>

      <FlatList
        data={bookmarks}
        renderItem={({ item }) => <NewsCard article={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center py-12">
            <Text className="text-gray-600 dark:text-gray-400 text-center px-4">
              No bookmarks yet. Start saving articles you want to read later!
            </Text>
          </View>
        }
      />
    </View>
  );
}
