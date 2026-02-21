'use client';

import { useState, useEffect } from 'react';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

interface Paper {
  id: string;
  title: string;
  subject: string;
  year: number;
  fileUrl?: string;
  description?: string;
}

const SUBJECTS = ['All', 'Mathematics', 'Science', 'History', 'English', 'Computer Science'];

export default function PapersPage() {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [subject, setSubject] = useState('All');
  const [year, setYear] = useState('');

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

  const fetchPapers = async () => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams();
      if (subject !== 'All') params.set('subject', subject);
      if (year) params.set('year', year);
      const res = await fetch(`${BACKEND_URL}/api/papers?${params}`);
      const data = await res.json();
      setPapers(data.papers || []);
    } catch {
      setError('Failed to load papers. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPapers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subject, year]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
        Previous Year Question Papers
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Browse and download previous year question papers to prepare for your exams.
      </p>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Subject
          </label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {SUBJECTS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Year
          </label>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Years</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-200 dark:bg-gray-700 rounded-lg h-32 animate-pulse" />
          ))}
        </div>
      ) : papers.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow">
          <p className="text-5xl mb-4">📄</p>
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No papers found for the selected filters.
          </p>
          <p className="text-gray-400 dark:text-gray-500 mt-1 text-sm">
            Admins can upload papers from the backend.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {papers.map((paper) => (
            <div
              key={paper.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
                    {paper.subject}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-semibold">
                    {paper.year}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {paper.title}
                </h3>
                {paper.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">{paper.description}</p>
                )}
              </div>

              {paper.fileUrl && (
                <a
                  href={paper.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-medium"
                >
                  📥 Download Paper
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
