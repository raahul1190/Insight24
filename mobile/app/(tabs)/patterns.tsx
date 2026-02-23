import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';

const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL || 'http://localhost:5000';

const SUBJECTS = ['All', 'Mathematics', 'Science', 'History', 'English', 'Computer Science'];

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 10 }, (_, i) => currentYear - i);

interface PatternResult {
  analysis: string;
  summary: string;
  dataPoints: number;
}

export default function ExamPatternsScreen() {
  const [subject, setSubject] = useState('All');
  const [yearFrom, setYearFrom] = useState(currentYear - 4);
  const [yearTo, setYearTo] = useState(currentYear);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PatternResult | null>(null);
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const handleAnalyse = async () => {
    if (yearFrom > yearTo) {
      Alert.alert('Invalid Range', '"From Year" must be ≤ "To Year".');
      return;
    }
    setLoading(true);
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
      Alert.alert('Error', 'Failed to fetch pattern analysis. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <View className="px-4 pt-6 pb-2">
        <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
          📊 AI Exam Patterns
        </Text>
        <Text className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
          Discover recurring topics, difficulty trends and predictions across the year using AI.
        </Text>
      </View>

      {/* Controls card */}
      <View className="mx-4 bg-white dark:bg-gray-800 rounded-xl shadow p-4 mb-4">
        {/* Subject filter */}
        <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
          {SUBJECTS.map((s) => (
            <TouchableOpacity
              key={s}
              onPress={() => setSubject(s)}
              className={`mr-2 px-3 py-1.5 rounded-full ${
                subject === s ? 'bg-blue-600' : 'bg-gray-100 dark:bg-gray-700'
              }`}
            >
              <Text
                className={
                  subject === s
                    ? 'text-white text-sm'
                    : 'text-gray-700 dark:text-gray-300 text-sm'
                }
              >
                {s}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Year range */}
        <View className="flex-row gap-3 mb-4">
          <View className="flex-1">
            <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              From Year
            </Text>
            <TouchableOpacity
              onPress={() => { setShowFromPicker(!showFromPicker); setShowToPicker(false); }}
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700"
            >
              <Text className="text-gray-900 dark:text-white">{yearFrom}</Text>
            </TouchableOpacity>
            {showFromPicker && (
              <View className="border border-gray-200 dark:border-gray-700 rounded-lg mt-1 bg-white dark:bg-gray-800 max-h-40 overflow-hidden">
                <ScrollView nestedScrollEnabled>
                  {YEARS.map((y) => (
                    <TouchableOpacity
                      key={y}
                      onPress={() => { setYearFrom(y); setShowFromPicker(false); }}
                      className={`px-3 py-2 ${yearFrom === y ? 'bg-blue-50 dark:bg-blue-900' : ''}`}
                    >
                      <Text className={yearFrom === y ? 'text-blue-600 dark:text-blue-300 font-semibold' : 'text-gray-900 dark:text-white'}>
                        {y}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>

          <View className="flex-1">
            <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              To Year
            </Text>
            <TouchableOpacity
              onPress={() => { setShowToPicker(!showToPicker); setShowFromPicker(false); }}
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700"
            >
              <Text className="text-gray-900 dark:text-white">{yearTo}</Text>
            </TouchableOpacity>
            {showToPicker && (
              <View className="border border-gray-200 dark:border-gray-700 rounded-lg mt-1 bg-white dark:bg-gray-800 max-h-40 overflow-hidden">
                <ScrollView nestedScrollEnabled>
                  {YEARS.map((y) => (
                    <TouchableOpacity
                      key={y}
                      onPress={() => { setYearTo(y); setShowToPicker(false); }}
                      className={`px-3 py-2 ${yearTo === y ? 'bg-blue-50 dark:bg-blue-900' : ''}`}
                    >
                      <Text className={yearTo === y ? 'text-blue-600 dark:text-blue-300 font-semibold' : 'text-gray-900 dark:text-white'}>
                        {y}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>
        </View>

        <TouchableOpacity
          onPress={handleAnalyse}
          disabled={loading || yearFrom > yearTo}
          className="bg-blue-600 rounded-lg py-3 items-center disabled:opacity-50"
        >
          {loading ? (
            <View className="flex-row items-center gap-2">
              <ActivityIndicator size="small" color="#ffffff" />
              <Text className="text-white font-semibold ml-2">Analysing…</Text>
            </View>
          ) : (
            <Text className="text-white font-bold text-base">🤖 Analyse Patterns with AI</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Results */}
      {result && (
        <View className="px-4 pb-8">
          {/* Stats */}
          <View className="flex-row flex-wrap gap-3 mb-4">
            <View className="bg-blue-50 dark:bg-blue-900 rounded-xl px-4 py-3 flex-row items-center">
              <Text className="text-2xl mr-2">📂</Text>
              <View>
                <Text className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                  Data Points
                </Text>
                <Text className="text-xl font-bold text-blue-800 dark:text-blue-200">
                  {result.dataPoints}
                </Text>
              </View>
            </View>
            <View className="bg-purple-50 dark:bg-purple-900 rounded-xl px-4 py-3 flex-row items-center">
              <Text className="text-2xl mr-2">📅</Text>
              <View>
                <Text className="text-xs text-purple-600 dark:text-purple-400 font-medium">
                  Range
                </Text>
                <Text className="text-xl font-bold text-purple-800 dark:text-purple-200">
                  {yearFrom}–{yearTo}
                </Text>
              </View>
            </View>
          </View>

          {/* Raw summary toggle */}
          <TouchableOpacity
            onPress={() => setShowSummary(!showSummary)}
            className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 mb-4"
          >
            <Text className="text-sm font-medium text-gray-700 dark:text-gray-300">
              📋 Raw Data Summary {showSummary ? '▲' : '▼'}
            </Text>
            {showSummary && (
              <Text className="mt-2 text-xs text-gray-600 dark:text-gray-400 font-mono leading-relaxed">
                {result.summary}
              </Text>
            )}
          </TouchableOpacity>

          {/* AI Analysis */}
          <View className="bg-white dark:bg-gray-800 rounded-xl shadow p-5">
            <Text className="text-lg font-bold text-gray-900 dark:text-white mb-3">
              🤖 AI Analysis Report
            </Text>
            {result.analysis.split('\n').map((line, i) => {
              if (line.startsWith('---')) {
                return (
                  <View
                    key={i}
                    className="border-t border-gray-200 dark:border-gray-700 my-2"
                  />
                );
              }
              const isBoldLine = line.startsWith('**') && line.includes('**');
              const cleanLine = line.replace(/\*\*/g, '');
              return (
                <Text
                  key={i}
                  className={`mb-1 leading-relaxed ${
                    isBoldLine
                      ? 'text-sm font-bold text-gray-900 dark:text-white mt-2'
                      : 'text-sm text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {cleanLine || ' '}
                </Text>
              );
            })}
          </View>
        </View>
      )}

      {!result && !loading && (
        <View className="mx-4 mb-8 bg-white dark:bg-gray-800 rounded-xl shadow p-8 items-center">
          <Text className="text-5xl mb-3">📊</Text>
          <Text className="text-gray-500 dark:text-gray-400 text-base font-medium text-center">
            Select filters and tap &quot;Analyse&quot; to get AI-powered exam pattern insights
          </Text>
        </View>
      )}
    </ScrollView>
  );
}
