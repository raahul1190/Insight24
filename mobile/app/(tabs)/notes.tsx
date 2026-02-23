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

interface Note {
  id: string;
  title: string;
  subject: string;
  content: string;
  tags?: string[];
}

const SUBJECTS = ['All', 'Mathematics', 'Science', 'History', 'English', 'Computer Science'];

export default function NotesScreen() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState('All');
  const [expanded, setExpanded] = useState<string | null>(null);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (subject !== 'All') params.set('subject', subject);
      const res = await fetch(`${BACKEND_URL}/api/notes?${params}`);
      const data = await res.json();
      setNotes(data.notes || []);
    } catch {
      Alert.alert('Error', 'Failed to load notes.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subject]);

  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <View className="px-4 pt-6 pb-4">
        <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
          Important Notes
        </Text>
        <Text className="text-gray-600 dark:text-gray-400 mb-4">
          Curated study notes by subject.
        </Text>

        {/* Subject filter */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
          {SUBJECTS.map((s) => (
            <TouchableOpacity
              key={s}
              onPress={() => setSubject(s)}
              className={`mr-2 px-3 py-1.5 rounded-full ${
                subject === s ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
              }`}
            >
              <Text
                className={
                  subject === s ? 'text-white text-sm' : 'text-gray-700 dark:text-gray-300 text-sm'
                }
              >
                {s}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {loading ? (
        <View className="flex-1 justify-center items-center py-16">
          <ActivityIndicator size="large" color="#3B82F6" />
        </View>
      ) : notes.length === 0 ? (
        <View className="flex-1 items-center py-16">
          <Text className="text-4xl mb-3">📝</Text>
          <Text className="text-gray-500 dark:text-gray-400 text-lg">No notes found.</Text>
        </View>
      ) : (
        <View className="px-4 pb-8">
          {notes.map((note) => (
            <View key={note.id} className="bg-white dark:bg-gray-800 rounded-lg shadow mb-3">
              <TouchableOpacity
                onPress={() => setExpanded(expanded === note.id ? null : note.id)}
                className="flex-row justify-between items-center p-4"
              >
                <View className="flex-1 mr-3">
                  <Text className="text-base font-semibold text-gray-900 dark:text-white">
                    {note.title}
                  </Text>
                  <Text className="text-xs text-blue-600 dark:text-blue-400 mt-0.5">
                    {note.subject}
                  </Text>
                </View>
                <Text className="text-gray-400 text-lg">
                  {expanded === note.id ? '▲' : '▼'}
                </Text>
              </TouchableOpacity>

              {expanded === note.id && (
                <View className="px-4 pb-4 border-t border-gray-100 dark:border-gray-700">
                  <Text className="text-gray-700 dark:text-gray-300 leading-relaxed mt-3">
                    {note.content}
                  </Text>
                  {note.tags && note.tags.length > 0 && (
                    <View className="flex-row flex-wrap mt-3">
                      {note.tags.map((tag) => (
                        <View
                          key={tag}
                          className="bg-gray-100 dark:bg-gray-700 rounded px-2 py-0.5 mr-1 mb-1"
                        >
                          <Text className="text-xs text-gray-600 dark:text-gray-400">#{tag}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              )}
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}
