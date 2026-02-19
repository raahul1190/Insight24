'use client';

import Link from 'next/link';

const categories = [
  { name: 'All', slug: '' },
  { name: 'Technology', slug: 'technology' },
  { name: 'Business', slug: 'business' },
  { name: 'Sports', slug: 'sports' },
  { name: 'Entertainment', slug: 'entertainment' },
  { name: 'Health', slug: 'health' },
  { name: 'Science', slug: 'science' },
];

export default function CategoryFilter({ activeCategory = '' }: { activeCategory?: string }) {
  return (
    <div className="overflow-x-auto">
      <div className="flex space-x-2 min-w-max py-4">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={category.slug ? `/category/${category.slug}` : '/'}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              activeCategory === category.slug
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
