import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';

const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL || 'http://localhost:5000';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SUGGESTED_QUESTIONS = [
  'How do I prepare for exams?',
  'Explain Pythagoras theorem.',
  'What are Newton\'s Laws?',
  'Tips for MCQ questions?',
];

export default function AIAssistantScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        'Hello! 👋 I\'m your AI study assistant. Ask me anything about your studies — I\'m here to help!',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const sendMessage = async (text: string) => {
    const msg = text.trim();
    if (!msg || loading) return;

    setMessages((prev) => [...prev, { role: 'user', content: msg }]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(`${BACKEND_URL}/api/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.reply || 'Sorry, could not process that.' },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Connection error. Please try again.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-gray-50 dark:bg-gray-900"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <View className="px-4 pt-6 pb-2">
        <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
          AI Study Assistant
        </Text>
        <Text className="text-gray-600 dark:text-gray-400 text-sm">
          Ask me anything about your studies!
        </Text>
      </View>

      <ScrollView
        ref={scrollRef}
        className="flex-1 px-4 py-2"
        contentContainerStyle={{ paddingBottom: 16 }}
      >
        {messages.map((msg, i) => (
          <View
            key={i}
            className={`mb-3 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            <View
              className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                msg.role === 'user'
                  ? 'bg-blue-600 rounded-br-none'
                  : 'bg-white dark:bg-gray-800 rounded-bl-none shadow'
              }`}
            >
              <Text
                className={
                  msg.role === 'user'
                    ? 'text-white text-sm leading-relaxed'
                    : 'text-gray-900 dark:text-gray-100 text-sm leading-relaxed'
                }
              >
                {msg.content}
              </Text>
            </View>
          </View>
        ))}

        {loading && (
          <View className="items-start mb-3">
            <View className="bg-white dark:bg-gray-800 rounded-2xl rounded-bl-none shadow px-4 py-3">
              <ActivityIndicator size="small" color="#3B82F6" />
            </View>
          </View>
        )}

        {/* Suggested questions */}
        {messages.length === 1 && (
          <View className="mt-2">
            <Text className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              Suggested questions:
            </Text>
            <View className="flex-row flex-wrap">
              {SUGGESTED_QUESTIONS.map((q) => (
                <TouchableOpacity
                  key={q}
                  onPress={() => sendMessage(q)}
                  className="bg-blue-50 dark:bg-blue-900 rounded-full px-3 py-1.5 mr-2 mb-2"
                >
                  <Text className="text-blue-700 dark:text-blue-300 text-xs">{q}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </ScrollView>

      {/* Input */}
      <View className="flex-row items-center px-4 pb-4 pt-2 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Ask a study question..."
          placeholderTextColor="#9CA3AF"
          className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-full px-4 py-2.5 mr-2 text-sm"
          returnKeyType="send"
          onSubmitEditing={() => sendMessage(input)}
          editable={!loading}
        />
        <TouchableOpacity
          onPress={() => sendMessage(input)}
          disabled={loading || !input.trim()}
          className="bg-blue-600 rounded-full w-10 h-10 items-center justify-center disabled:opacity-50"
        >
          <Text className="text-white font-bold text-lg">➤</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
