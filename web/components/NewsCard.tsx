'use client';

import Image from 'next/image';
import { NewsArticle } from '@/lib/newsapi';
import BookmarkButton from './BookmarkButton';

interface NewsCardProps {
  article: NewsArticle;
}

export default function NewsCard({ article }: NewsCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {article.urlToImage && (
        <div className="relative h-48 w-full">
          <Image
            src={article.urlToImage}
            alt={article.title}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      )}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 flex-1">
            {article.title}
          </h3>
          <BookmarkButton article={article} />
        </div>
        {article.description && (
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-3">
            {article.description}
          </p>
        )}
        <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-500">
          <span>{article.source.name}</span>
          <span>{formatDate(article.publishedAt)}</span>
        </div>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-blue-600 dark:text-blue-400 hover:underline"
        >
          Read full article →
        </a>
      </div>
    </div>
  );
}
