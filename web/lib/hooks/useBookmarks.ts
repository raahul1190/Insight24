'use client';

import { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from './useAuth';
import { NewsArticle } from '../newsapi';
import axios from 'axios';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

export const useBookmarks = () => {
  const { user, getIdToken } = useAuth();
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setBookmarks([]);
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

  const addBookmark = async (article: NewsArticle) => {
    if (!user) return;

    try {
      const token = await getIdToken();
      await axios.post(
        `${BACKEND_URL}/api/bookmarks`,
        { article },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error('Error adding bookmark:', error);
      throw error;
    }
  };

  const removeBookmark = async (bookmarkId: string) => {
    if (!user) return;

    try {
      const token = await getIdToken();
      await axios.delete(`${BACKEND_URL}/api/bookmarks/${bookmarkId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error('Error removing bookmark:', error);
      throw error;
    }
  };

  const isBookmarked = (url: string): boolean => {
    return bookmarks.some((bookmark) => bookmark.url === url);
  };

  return {
    bookmarks,
    loading,
    addBookmark,
    removeBookmark,
    isBookmarked,
  };
};
