'use client';

import { useEffect, useState } from 'react';
import { searchNews } from '@/lib/newsapi';
import NewsCard from '@/components/NewsCard';
import type { NewsArticle } from '@/lib/newsapi';

const EDUCATION_TOPICS = [
  { label: 'All', query: 'education' },
  { label: 'Universities', query: 'university college education' },
  { label: 'K-12', query: 'school students K-12 education' },
  { label: 'Online Learning', query: 'online learning e-learning courses' },
  { label: 'STEM', query: 'STEM science technology engineering math education' },
  { label: 'EdTech', query: 'edtech education technology' },
];

export default function EducationPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTopic, setActiveTopic] = useState(EDUCATION_TOPICS[0]);

  useEffect(() => {
    const loadNews = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await searchNews(activeTopic.query);
        setArticles(data.articles);
      } catch {
        setError('Failed to load education news. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, [activeTopic]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          📚 Education News
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Stay informed with the latest news in education, learning, and academic innovation.
        </p>
      </div>

      {/* Topic filter */}
      <div className="overflow-x-auto mb-6">
        <div className="flex space-x-2 min-w-max py-2">
          {EDUCATION_TOPICS.map((topic) => (
            <button
              key={topic.label}
              onClick={() => setActiveTopic(topic)}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                activeTopic.label === topic.label
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {topic.label}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gray-200 dark:bg-gray-700 rounded-lg h-96 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <NewsCard key={article.url} article={article} />
          ))}
        </div>
      )}

      {!loading && articles.length === 0 && !error && (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            No education articles found
          </p>
        </div>
      )}
    </div>
  );
}
