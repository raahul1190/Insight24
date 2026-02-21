import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';

const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL || 'http://localhost:5000';

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
  easy: 'text-green-600',
  medium: 'text-yellow-600',
  hard: 'text-red-600',
};

export default function ExamScreen() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState('All');
  const [difficulty, setDifficulty] = useState('All');
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<ExamResult | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchQuestions = async () => {
    setLoading(true);
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
      Alert.alert('Error', 'Failed to load questions.');
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
      Alert.alert('No Answers', 'Please answer at least one question.');
      return;
    }
    setSubmitting(true);
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
      Alert.alert('Error', 'Failed to submit exam.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <View className="px-4 pt-6 pb-2">
        <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-1">Online Exam</Text>
        <Text className="text-gray-600 dark:text-gray-400 mb-4">
          Select filters and answer all questions.
        </Text>

        {/* Subject filter */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-3">
          {SUBJECTS.map((s) => (
            <TouchableOpacity
              key={s}
              onPress={() => setSubject(s)}
              className={`mr-2 px-3 py-1.5 rounded-full ${
                subject === s
                  ? 'bg-blue-600'
                  : 'bg-gray-200 dark:bg-gray-700'
              }`}
            >
              <Text className={subject === s ? 'text-white text-sm' : 'text-gray-700 dark:text-gray-300 text-sm'}>
                {s}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Difficulty filter */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
          {DIFFICULTIES.map((d) => (
            <TouchableOpacity
              key={d}
              onPress={() => setDifficulty(d)}
              className={`mr-2 px-3 py-1.5 rounded-full ${
                difficulty === d
                  ? 'bg-blue-600'
                  : 'bg-gray-200 dark:bg-gray-700'
              }`}
            >
              <Text className={difficulty === d ? 'text-white text-sm' : 'text-gray-700 dark:text-gray-300 text-sm'}>
                {d.charAt(0).toUpperCase() + d.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {result && (
        <View className="mx-4 mb-4 bg-blue-50 dark:bg-blue-900 border border-blue-300 dark:border-blue-700 rounded-lg p-4">
          <Text className="text-xl font-bold text-blue-800 dark:text-blue-200">
            🎉 Score: {result.score} / {result.total}
          </Text>
          <TouchableOpacity
            onPress={fetchQuestions}
            className="mt-3 bg-blue-600 rounded-lg py-2 items-center"
          >
            <Text className="text-white font-medium">Try Again</Text>
          </TouchableOpacity>
        </View>
      )}

      {loading ? (
        <View className="flex-1 justify-center items-center py-16">
          <ActivityIndicator size="large" color="#3B82F6" />
        </View>
      ) : questions.length === 0 ? (
        <View className="flex-1 items-center py-16">
          <Text className="text-gray-500 dark:text-gray-400 text-lg">No questions available.</Text>
        </View>
      ) : (
        <View className="px-4 pb-8">
          {questions.map((q, idx) => {
            const resultForQ = result?.results.find((r) => r.questionId === q.id);
            return (
              <View key={q.id} className="bg-white dark:bg-gray-800 rounded-lg shadow mb-4 p-4">
                <View className="flex-row justify-between items-start mb-3">
                  <Text className="flex-1 text-base font-semibold text-gray-900 dark:text-white">
                    {idx + 1}. {q.question}
                  </Text>
                  <Text className={`ml-2 text-xs font-medium ${difficultyColor[q.difficulty]}`}>
                    {q.difficulty}
                  </Text>
                </View>

                {q.options.map((option, i) => {
                  const isSelected = answers[q.id] === i;
                  const isCorrect = resultForQ?.correctOption === i;
                  const isWrong = resultForQ && isSelected && !resultForQ.correct;

                  let bg = 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800';
                  if (result) {
                    if (isCorrect) bg = 'border-green-500 bg-green-50 dark:bg-green-900';
                    else if (isWrong) bg = 'border-red-500 bg-red-50 dark:bg-red-900';
                  } else if (isSelected) {
                    bg = 'border-blue-500 bg-blue-50 dark:bg-blue-900';
                  }

                  return (
                    <TouchableOpacity
                      key={i}
                      onPress={() => handleSelect(q.id, i)}
                      className={`flex-row items-center p-3 border rounded-lg mb-2 ${bg}`}
                    >
                      <Text className="w-6 text-gray-600 dark:text-gray-300 font-medium">
                        {String.fromCharCode(65 + i)}.
                      </Text>
                      <Text className="flex-1 text-gray-800 dark:text-gray-200 ml-2">{option}</Text>
                    </TouchableOpacity>
                  );
                })}

                {resultForQ?.explanation && (
                  <Text className="mt-2 text-sm text-gray-600 dark:text-gray-400 italic">
                    💡 {resultForQ.explanation}
                  </Text>
                )}
              </View>
            );
          })}

          {!result && (
            <TouchableOpacity
              onPress={handleSubmit}
              disabled={submitting || Object.keys(answers).length === 0}
              className="bg-blue-600 rounded-lg py-4 items-center disabled:opacity-50 mt-2"
            >
              <Text className="text-white font-bold text-base">
                {submitting
                  ? 'Submitting...'
                  : `Submit (${Object.keys(answers).length}/${questions.length})`}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </ScrollView>
  );
}
