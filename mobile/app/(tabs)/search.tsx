import React, { useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { searchNews, NewsArticle } from '../../lib/newsapi';
import NewsCard from '../../components/NewsCard';
import SearchBar from '../../components/SearchBar';

export default function SearchScreen() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');

  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery);
    try {
      setLoading(true);
      setError('');
      const data = await searchNews(searchQuery);
      setArticles(data.articles);
    } catch (err) {
      setError('Failed to search news');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-gray-50 dark:bg-gray-900">
      <View className="pt-4">
        <Text className="text-3xl font-bold text-gray-900 dark:text-white px-4 mb-4">
          Search News
        </Text>
        <SearchBar onSearch={handleSearch} />
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
      ) : query ? (
        <FlatList
          data={articles}
          renderItem={({ item }) => <NewsCard article={item} />}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListEmptyComponent={
            <View className="flex-1 justify-center items-center py-12">
              <Text className="text-gray-600 dark:text-gray-400">
                No articles found for &quot;{query}&quot;
              </Text>
            </View>
          }
        />
      ) : (
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-600 dark:text-gray-400">
            Search for news articles
          </Text>
        </View>
      )}
    </View>
  );
}
