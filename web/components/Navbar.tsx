'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/hooks/useAuth';
import SearchBar from './SearchBar';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              Insight24
            </Link>
            <div className="hidden md:block flex-1 max-w-md">
              <SearchBar />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-4">
              <Link
                href="/exam"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium"
              >
                📝 Exam
              </Link>
              <Link
                href="/papers"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium"
              >
                📄 Papers
              </Link>
              <Link
                href="/notes"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium"
              >
                📚 Notes
              </Link>
              <Link
                href="/ai-assistant"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium"
              >
                🤖 AI Assistant
              </Link>
              <Link
                href="/resources"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium"
              >
                🌐 Resources
              </Link>
            </div>
            <ThemeToggle />
            {user ? (
              <>
                <Link
                  href="/bookmarks"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Bookmarks
                </Link>
                <button
                  onClick={() => logout()}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Login
              </Link>
            )}
          </div>
        </div>

        <div className="md:hidden pb-4">
          <SearchBar />
        </div>
      </div>
    </nav>
  );
}
