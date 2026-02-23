import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';

interface ExamSite {
  name: string;
  url: string;
  emoji: string;
  tagline: string;
  description: string;
  tags: string[];
  isFree: boolean;
}

const SITES: ExamSite[] = [
  {
    name: 'Khan Academy',
    url: 'https://www.khanacademy.org',
    emoji: '🎓',
    tagline: 'Free world-class education for anyone, anywhere',
    description:
      'Free platform with thousands of practice exercises and quizzes across maths, science, humanities and more. Great for self-paced exam prep.',
    tags: ['Free', 'Self-paced', 'All subjects'],
    isFree: true,
  },
  {
    name: 'Google Forms',
    url: 'https://forms.google.com',
    emoji: '📋',
    tagline: 'Create online exams in minutes — no coding needed',
    description:
      'Simplest way to build an online quiz. Auto-grading and integration with Google Classroom make it ideal for teachers.',
    tags: ['Free', 'Easy setup', 'Auto-grading'],
    isFree: true,
  },
  {
    name: 'ClassMarker',
    url: 'https://www.classmarker.com',
    emoji: '✅',
    tagline: 'Professional online testing for businesses and educators',
    description:
      'Dedicated exam platform with time limits, randomised questions, instant results and detailed reporting.',
    tags: ['Free tier', 'Time limits', 'Randomised questions'],
    isFree: true,
  },
  {
    name: 'ProProfs Quiz Maker',
    url: 'https://www.proprofs.com/quiz-school',
    emoji: '🧩',
    tagline: 'Easily create quizzes, surveys and assessments',
    description:
      'Feature-rich quiz builder supporting MCQs, true/false, fill-in-the-blanks and more. Includes a large public quiz library.',
    tags: ['Free tier', 'Multiple types', 'Analytics'],
    isFree: true,
  },
  {
    name: 'Quizlet',
    url: 'https://quizlet.com',
    emoji: '🃏',
    tagline: 'Study tools and games that make learning stick',
    description:
      'World-popular flashcard and practice-test platform. Create study sets, take adaptive tests and track your progress.',
    tags: ['Free tier', 'Flashcards', 'Adaptive tests'],
    isFree: true,
  },
  {
    name: 'Kahoot!',
    url: 'https://kahoot.com',
    emoji: '🎮',
    tagline: 'Game-based learning that everyone loves',
    description:
      'Turns quizzes into live competitive games. Students join on any device. Excellent for classroom revision sessions.',
    tags: ['Free tier', 'Live games', 'Classroom'],
    isFree: true,
  },
  {
    name: 'Moodle',
    url: 'https://moodle.org',
    emoji: '🏫',
    tagline: 'Open-source LMS with a powerful quiz engine',
    description:
      "The world's most widely used open-source LMS. Built-in quiz module supports dozens of question types and detailed reporting.",
    tags: ['Free & open-source', 'Self-hosted', 'LMS'],
    isFree: true,
  },
  {
    name: 'Testmoz',
    url: 'https://testmoz.com',
    emoji: '⚡',
    tagline: 'Build a test in under 5 minutes',
    description:
      'Extremely simple online test builder — no student account needed. Share a link and see results instantly.',
    tags: ['Free tier', 'No student login', 'Fast setup'],
    isFree: true,
  },
  {
    name: 'Socrative',
    url: 'https://www.socrative.com',
    emoji: '🚀',
    tagline: 'Real-time classroom assessment tool',
    description:
      'Launch quizzes and see responses in real time. Supports space-race games for motivation.',
    tags: ['Free tier', 'Real-time', 'Space Race'],
    isFree: true,
  },
  {
    name: 'ExamBuilder',
    url: 'https://www.exambuilder.com',
    emoji: '🛠️',
    tagline: 'Online exam software for professional certification',
    description:
      'Designed for certification bodies. Supports proctoring, question banks, custom branding and advanced analytics.',
    tags: ['Paid', 'Proctoring', 'Certification'],
    isFree: false,
  },
];

export default function ResourcesScreen() {
  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <View className="px-4 pt-6 pb-2">
        <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
          📖 Online Exam Resources
        </Text>
        <Text className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
          Good and simple ed-tech websites for online exams, quizzes and learning.
        </Text>
      </View>

      <View className="px-4 pb-10">
        {SITES.map((site) => (
          <TouchableOpacity
            key={site.url}
            onPress={() => openLink(site.url)}
            className="bg-white dark:bg-gray-800 rounded-xl shadow mb-4 p-4"
            activeOpacity={0.75}
          >
            {/* Header row */}
            <View className="flex-row items-center justify-between mb-1">
              <View className="flex-row items-center flex-1 mr-2">
                <Text className="text-2xl mr-2">{site.emoji}</Text>
                <Text className="text-base font-bold text-gray-900 dark:text-white flex-shrink">
                  {site.name}
                </Text>
              </View>
              <View
                className={`px-2 py-0.5 rounded-full ${
                  site.isFree
                    ? 'bg-green-100 dark:bg-green-900'
                    : 'bg-orange-100 dark:bg-orange-900'
                }`}
              >
                <Text
                  className={`text-xs font-semibold ${
                    site.isFree
                      ? 'text-green-700 dark:text-green-300'
                      : 'text-orange-700 dark:text-orange-300'
                  }`}
                >
                  {site.isFree ? 'Free' : 'Paid'}
                </Text>
              </View>
            </View>

            <Text className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-1">
              {site.tagline}
            </Text>

            <Text className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
              {site.description}
            </Text>

            {/* Tags */}
            <View className="flex-row flex-wrap">
              {site.tags.map((tag) => (
                <View
                  key={tag}
                  className="bg-gray-100 dark:bg-gray-700 rounded-full px-2 py-0.5 mr-1 mb-1"
                >
                  <Text className="text-xs text-gray-600 dark:text-gray-400">{tag}</Text>
                </View>
              ))}
            </View>

            {/* Visit Website button */}
            <TouchableOpacity
              onPress={() => openLink(site.url)}
              className="mt-3 bg-blue-600 rounded-lg py-2 px-4 self-start"
              activeOpacity={0.8}
            >
              <Text className="text-white text-sm font-semibold">Visit Website →</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
