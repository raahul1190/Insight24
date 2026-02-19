import React from 'react';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import { NewsArticle } from '../lib/newsapi';
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

  const openArticle = () => {
    Linking.openURL(article.url);
  };

  return (
    <View className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-4 mx-4">
      {article.urlToImage && (
        <Image
          source={{ uri: article.urlToImage }}
          className="w-full h-48"
          resizeMode="cover"
        />
      )}
      <View className="p-4">
        <View className="flex-row justify-between items-start mb-2">
          <Text className="text-lg font-semibold text-gray-900 dark:text-white flex-1 mr-2">
            {article.title}
          </Text>
          <BookmarkButton article={article} />
        </View>
        {article.description && (
          <Text className="text-gray-600 dark:text-gray-400 text-sm mb-3" numberOfLines={3}>
            {article.description}
          </Text>
        )}
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-xs text-gray-500">{article.source.name}</Text>
          <Text className="text-xs text-gray-500">{formatDate(article.publishedAt)}</Text>
        </View>
        <TouchableOpacity onPress={openArticle}>
          <Text className="text-blue-600 dark:text-blue-400">Read full article →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
