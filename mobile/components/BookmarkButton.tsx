import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { auth, db } from '../lib/firebase';
import { collection, query, onSnapshot, doc, setDoc, deleteDoc, orderBy } from 'firebase/firestore';
import { NewsArticle } from '../lib/newsapi';
import { useRouter } from 'expo-router';
import { encode } from 'base-64';

interface BookmarkButtonProps {
  article: NewsArticle;
}

export default function BookmarkButton({ article }: BookmarkButtonProps) {
  const [bookmarked, setBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = auth.currentUser;
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      setBookmarked(false);
      return;
    }

    const bookmarksRef = collection(db, 'users', user.uid, 'bookmarks');
    const q = query(bookmarksRef, orderBy('savedAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const isBookmarked = snapshot.docs.some((doc) => doc.data().url === article.url);
      setBookmarked(isBookmarked);
    });

    return unsubscribe;
  }, [user, article.url]);

  const handlePress = async () => {
    if (!user) {
      router.push('/login');
      return;
    }

    setLoading(true);
    try {
      const bookmarkId = encode(article.url).replace(/[/+=]/g, '');
      const bookmarkRef = doc(db, 'users', user.uid, 'bookmarks', bookmarkId);

      if (bookmarked) {
        await deleteDoc(bookmarkRef);
      } else {
        await setDoc(bookmarkRef, {
          ...article,
          savedAt: new Date().toISOString(),
        });
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={loading}
      className={`p-2 ${loading ? 'opacity-50' : ''}`}
    >
      <Text className="text-2xl">{bookmarked ? '⭐' : '☆'}</Text>
    </TouchableOpacity>
  );
}
