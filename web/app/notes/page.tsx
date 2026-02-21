'use client';

import { useState, useEffect } from 'react';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

interface Note {
  id: string;
  title: string;
  subject: string;
  content: string;
  tags?: string[];
  createdAt?: string;
}

const SUBJECTS = ['All', 'Mathematics', 'Science', 'History', 'English', 'Computer Science'];

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [subject, setSubject] = useState('All');
  const [expanded, setExpanded] = useState<string | null>(null);

  const fetchNotes = async () => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams();
      if (subject !== 'All') params.set('subject', subject);
      const res = await fetch(`${BACKEND_URL}/api/notes?${params}`);
      const data = await res.json();
      setNotes(data.notes || []);
    } catch {
      setError('Failed to load notes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subject]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Important Notes</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Curated study notes and key concepts organized by subject.
      </p>

      {/* Filters */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Filter by Subject
        </label>
        <div className="flex flex-wrap gap-2">
          {SUBJECTS.map((s) => (
            <button
              key={s}
              onClick={() => setSubject(s)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                subject === s
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {s}
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
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-200 dark:bg-gray-700 rounded-lg h-20 animate-pulse" />
          ))}
        </div>
      ) : notes.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow">
          <p className="text-5xl mb-4">📝</p>
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No notes found for the selected subject.
          </p>
          <p className="text-gray-400 dark:text-gray-500 mt-1 text-sm">
            Admins can add notes from the backend.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {notes.map((note) => (
            <div key={note.id} className="bg-white dark:bg-gray-800 rounded-lg shadow">
              <button
                className="w-full text-left px-5 py-4 flex items-center justify-between"
                onClick={() => setExpanded(expanded === note.id ? null : note.id)}
              >
                <div>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                    {note.title}
                  </h3>
                  <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                    {note.subject}
                  </span>
                </div>
                <span className="text-gray-400 text-xl">{expanded === note.id ? '▲' : '▼'}</span>
              </button>

              {expanded === note.id && (
                <div className="px-5 pb-5">
                  <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                      {note.content}
                    </p>
                    {note.tags && note.tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1">
                        {note.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
