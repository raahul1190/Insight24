import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

const categories = [
  { name: 'All', slug: '' },
  { name: 'Technology', slug: 'technology' },
  { name: 'Business', slug: 'business' },
  { name: 'Sports', slug: 'sports' },
  { name: 'Entertainment', slug: 'entertainment' },
  { name: 'Health', slug: 'health' },
  { name: 'Science', slug: 'science' },
];

interface CategoryFilterProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function CategoryFilter({ activeCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mb-4"
      contentContainerStyle={{ paddingHorizontal: 16 }}
    >
      {categories.map((category) => (
        <TouchableOpacity
          key={category.slug}
          onPress={() => onSelectCategory(category.slug)}
          className={`px-4 py-2 rounded-full mr-2 ${
            activeCategory === category.slug
              ? 'bg-blue-600'
              : 'bg-gray-200 dark:bg-gray-700'
          }`}
        >
          <Text
            className={
              activeCategory === category.slug
                ? 'text-white'
                : 'text-gray-700 dark:text-gray-300'
            }
          >
            {category.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
