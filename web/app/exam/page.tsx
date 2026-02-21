'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

interface Question {
  id: string;
  question: string;
  options: string[];
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface ExamResult {
  score: number;
  total: number;
  results: { questionId: string; correct: boolean; correctOption?: number; explanation?: string }[];
}

const SUBJECTS = ['All', 'Mathematics', 'Science', 'History', 'English', 'Computer Science'];
const DIFFICULTIES = ['All', 'easy', 'medium', 'hard'];

const difficultyColor: Record<string, string> = {
  easy: 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300',
  medium: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300',
  hard: 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300',
};

export default function ExamPage() {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [subject, setSubject] = useState('All');
  const [difficulty, setDifficulty] = useState('All');
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<ExamResult | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchQuestions = async () => {
    setLoading(true);
    setError('');
    setResult(null);
    setAnswers({});
    try {
      const params = new URLSearchParams();
      if (subject !== 'All') params.set('subject', subject);
      if (difficulty !== 'All') params.set('difficulty', difficulty);
      const res = await fetch(`${BACKEND_URL}/api/exam/questions?${params}`);
      const data = await res.json();
      setQuestions(data.questions || []);
    } catch {
      setError('Failed to load questions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subject, difficulty]);

  const handleSelect = (questionId: string, optionIndex: number) => {
    if (result) return;
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length === 0) {
      setError('Please answer at least one question before submitting.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      const payload = Object.entries(answers).map(([questionId, selectedOption]) => ({
        questionId,
        selectedOption,
      }));
      const res = await fetch(`${BACKEND_URL}/api/exam/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: payload }),
      });
      const data = await res.json();
      setResult(data);
    } catch {
      setError('Failed to submit exam. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Online Exam</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Select a subject and difficulty, then answer the questions and submit.
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
            Difficulty
          </label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {DIFFICULTIES.map((d) => (
              <option key={d} value={d}>
                {d.charAt(0).toUpperCase() + d.slice(1)}
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

      {/* Score banner */}
      {result && (
        <div className="bg-blue-50 dark:bg-blue-900 border border-blue-300 dark:border-blue-700 rounded-lg p-4 mb-6">
          <h2 className="text-xl font-bold text-blue-800 dark:text-blue-200">
            🎉 Exam Submitted! Score: {result.score} / {result.total}
          </h2>
          <p className="text-blue-700 dark:text-blue-300 mt-1">
            {Math.round((result.score / result.total) * 100)}% — scroll down to review answers.
          </p>
          <button
            onClick={fetchQuestions}
            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      )}

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-gray-200 dark:bg-gray-700 rounded-lg h-32 animate-pulse" />
          ))}
        </div>
      ) : questions.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No questions available for the selected filters.
          </p>
          {!user && (
            <p className="text-gray-400 dark:text-gray-500 mt-2">
              Admins can log in to add questions.
            </p>
          )}
        </div>
      ) : (
        <>
          <div className="space-y-6">
            {questions.map((q, idx) => {
              const resultForQ = result?.results.find((r) => r.questionId === q.id);
              return (
                <div
                  key={q.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {idx + 1}. {q.question}
                    </h3>
                    <span
                      className={`ml-3 px-2 py-1 rounded text-xs font-medium ${difficultyColor[q.difficulty]}`}
                    >
                      {q.difficulty}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {q.options.map((option, i) => {
                      const isSelected = answers[q.id] === i;
                      const isCorrect = resultForQ?.correctOption === i;
                      const isWrong = resultForQ && isSelected && !resultForQ.correct;

                      let optionClass =
                        'flex items-center p-3 border rounded-lg cursor-pointer transition-colors ';
                      if (result) {
                        if (isCorrect) {
                          optionClass +=
                            'border-green-500 bg-green-50 dark:bg-green-900 dark:border-green-600';
                        } else if (isWrong) {
                          optionClass +=
                            'border-red-500 bg-red-50 dark:bg-red-900 dark:border-red-600';
                        } else {
                          optionClass +=
                            'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800';
                        }
                      } else if (isSelected) {
                        optionClass +=
                          'border-blue-500 bg-blue-50 dark:bg-blue-900 dark:border-blue-600';
                      } else {
                        optionClass +=
                          'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 bg-white dark:bg-gray-800';
                      }

                      return (
                        <div
                          key={i}
                          className={optionClass}
                          onClick={() => handleSelect(q.id, i)}
                        >
                          <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center mr-3 text-sm font-medium text-gray-600 dark:text-gray-300">
                            {String.fromCharCode(65 + i)}
                          </span>
                          <span className="text-gray-800 dark:text-gray-200">{option}</span>
                        </div>
                      );
                    })}
                  </div>

                  {resultForQ?.explanation && (
                    <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 italic">
                      💡 {resultForQ.explanation}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {!result && (
            <div className="mt-8 flex justify-end">
              <button
                onClick={handleSubmit}
                disabled={submitting || Object.keys(answers).length === 0}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Submitting...' : `Submit Exam (${Object.keys(answers).length}/${questions.length} answered)`}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
