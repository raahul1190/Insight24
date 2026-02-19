import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { fetchTrendingNews, NewsArticle } from '../../lib/newsapi';
import NewsCard from '../../components/NewsCard';
import CategoryFilter from '../../components/CategoryFilter';

export default function HomeScreen() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeCategory, setActiveCategory] = useState('');

  useEffect(() => {
    loadNews();
  }, [activeCategory]);

  const loadNews = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await fetchTrendingNews(activeCategory || undefined);
      setArticles(data.articles);
    } catch (err) {
      setError('Failed to load news');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-gray-50 dark:bg-gray-900">
      <View className="pt-4">
        <Text className="text-3xl font-bold text-gray-900 dark:text-white px-4 mb-4">
          Trending News
        </Text>
        <CategoryFilter activeCategory={activeCategory} onSelectCategory={setActiveCategory} />
      </View>

      {error && (
        <View className="bg-red-100 dark:bg-red-900 mx-4 p-3 rounded mb-4">
          <Text className="text-red-700 dark:text-red-200">{error}</Text>
        </View>
      )}

      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#3B82F6" />
        </View>
      ) : (
        <FlatList
          data={articles}
          renderItem={({ item }) => <NewsCard article={item} />}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListEmptyComponent={
            <View className="flex-1 justify-center items-center py-12">
              <Text className="text-gray-600 dark:text-gray-400">No articles found</Text>
            </View>
          }
        />
      )}
    </View>
  );
}
