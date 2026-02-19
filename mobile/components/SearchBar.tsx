import React, { useState } from 'react';
import { View, TextInput } from 'react-native';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = () => {
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <View className="mx-4 mb-4">
      <TextInput
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSubmit}
        placeholder="Search news..."
        placeholderTextColor="#9CA3AF"
        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        returnKeyType="search"
      />
    </View>
  );
}
