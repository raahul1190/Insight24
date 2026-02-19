'use client';

import { useState } from 'react';
import { useBookmarks } from '@/lib/hooks/useBookmarks';
import { useAuth } from '@/lib/hooks/useAuth';
import { NewsArticle } from '@/lib/newsapi';
import { useRouter } from 'next/navigation';

interface BookmarkButtonProps {
  article: NewsArticle;
}

export default function BookmarkButton({ article }: BookmarkButtonProps) {
  const { user } = useAuth();
  const { isBookmarked, addBookmark, removeBookmark, bookmarks } = useBookmarks();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const bookmarked = isBookmarked(article.url);

  const handleClick = async () => {
    if (!user) {
      router.push('/login');
      return;
    }

    setLoading(true);
    try {
      if (bookmarked) {
        const bookmark = bookmarks.find((b) => b.url === article.url);
        if (bookmark) {
          await removeBookmark(bookmark.id);
        }
      } else {
        await addBookmark(article);
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`p-2 rounded-full ${
        bookmarked
          ? 'text-yellow-500 hover:text-yellow-600'
          : 'text-gray-400 hover:text-gray-600'
      } ${loading ? 'opacity-50' : ''}`}
      aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
    >
      {bookmarked ? '⭐' : '☆'}
    </button>
  );
}
