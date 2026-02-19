'use client';

import { useAuth } from '@/lib/hooks/useAuth';
import { useBookmarks } from '@/lib/hooks/useBookmarks';
import NewsCard from '@/components/NewsCard';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function BookmarksPage() {
  const { user, loading: authLoading } = useAuth();
  const { bookmarks, loading: bookmarksLoading } = useBookmarks();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  if (authLoading || bookmarksLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-600 dark:text-gray-400">Loading...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Saved Articles
      </h1>

      {bookmarks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            No bookmarks yet. Start saving articles you want to read later!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarks.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
