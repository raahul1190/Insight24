'use client';

import { useState } from 'react';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

const SUBJECTS = ['All', 'Mathematics', 'Science', 'History', 'English', 'Computer Science'];

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 10 }, (_, i) => currentYear - i);

interface PatternResult {
  analysis: string;
  summary: string;
  dataPoints: number;
}

/** Render simple markdown-like bold (**text**) and newlines */
function AnalysisText({ text }: { text: string }) {
  return (
    <div className="space-y-3">
      {text.split('\n').map((line, i) => {
        if (line.startsWith('---')) {
          return <hr key={i} className="border-gray-200 dark:border-gray-700" />;
        }
        // Bold headers like **1. Overview**
        const boldified = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        return (
          <p
            key={i}
            className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: boldified || '&nbsp;' }}
          />
        );
      })}
    </div>
  );
}

export default function ExamPatternsPage() {
  const [subject, setSubject] = useState('All');
  const [yearFrom, setYearFrom] = useState(currentYear - 4);
  const [yearTo, setYearTo] = useState(currentYear);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PatternResult | null>(null);
  const [error, setError] = useState('');

  const handleAnalyse = async () => {
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const res = await fetch(`${BACKEND_URL}/api/ai/analyze-patterns`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, yearFrom, yearTo }),
      });
      if (!res.ok) throw new Error('Request failed');
      const data: PatternResult = await res.json();
      setResult(data);
    } catch {
      setError('Failed to fetch pattern analysis. Please make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
        📊 AI Exam Pattern Analysis
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Select a subject and year range and let AI analyse patterns across exam questions and
        previous year papers — revealing recurring topics, difficulty trends, and what to focus on.
      </p>

      {/* Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-6">
        <div className="flex flex-wrap gap-4 mb-6">
          {/* Subject */}
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

          {/* From year */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              From Year
            </label>
            <select
              value={yearFrom}
              onChange={(e) => setYearFrom(Number(e.target.value))}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {YEARS.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          {/* To year */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              To Year
            </label>
            <select
              value={yearTo}
              onChange={(e) => setYearTo(Number(e.target.value))}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {YEARS.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={handleAnalyse}
          disabled={loading || yearFrom > yearTo}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Analysing…
            </>
          ) : (
            '🤖 Analyse Patterns with AI'
          )}
        </button>

        {yearFrom > yearTo && (
          <p className="mt-2 text-sm text-red-500">"From Year" must be ≤ "To Year".</p>
        )}
      </div>

      {error && (
        <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="space-y-6">
          {/* Stats bar */}
          <div className="flex flex-wrap gap-3">
            <div className="bg-blue-50 dark:bg-blue-900 rounded-lg px-4 py-3 flex items-center gap-2">
              <span className="text-2xl">📂</span>
              <div>
                <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">Data Points</p>
                <p className="text-xl font-bold text-blue-800 dark:text-blue-200">
                  {result.dataPoints}
                </p>
              </div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900 rounded-lg px-4 py-3 flex items-center gap-2">
              <span className="text-2xl">📅</span>
              <div>
                <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">
                  Year Range
                </p>
                <p className="text-xl font-bold text-purple-800 dark:text-purple-200">
                  {yearFrom}–{yearTo}
                </p>
              </div>
            </div>
            <div className="bg-green-50 dark:bg-green-900 rounded-lg px-4 py-3 flex items-center gap-2">
              <span className="text-2xl">📚</span>
              <div>
                <p className="text-xs text-green-600 dark:text-green-400 font-medium">Subject</p>
                <p className="text-xl font-bold text-green-800 dark:text-green-200">{subject}</p>
              </div>
            </div>
          </div>

          {/* Raw data summary (collapsible) */}
          <details className="bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <summary className="cursor-pointer px-5 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 select-none">
              📋 View Raw Data Summary
            </summary>
            <pre className="px-5 pb-4 text-xs text-gray-600 dark:text-gray-400 whitespace-pre-wrap font-mono leading-relaxed">
              {result.summary}
            </pre>
          </details>

          {/* AI Analysis */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              🤖 AI Analysis Report
            </h2>
            <AnalysisText text={result.analysis} />
          </div>
        </div>
      )}

      {!result && !loading && (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow">
          <p className="text-5xl mb-4">📊</p>
          <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
            Select filters and click &quot;Analyse Patterns with AI&quot; to get started
          </p>
          <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
            The AI will examine all exam questions and previous year papers in the selected range
          </p>
        </div>
      )}
    </div>
  );
}
