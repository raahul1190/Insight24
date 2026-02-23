import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Online Exam Resources – Insight24',
  description: 'A curated list of good and simple ed-tech / online exam websites for students and educators.',
};

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
      'Completely free learning platform with thousands of practice exercises and quizzes across maths, science, humanities and more. Perfect for self-paced study and exam preparation.',
    tags: ['Free', 'Self-paced', 'All subjects', 'K-12 & college'],
    isFree: true,
  },
  {
    name: 'Google Forms',
    url: 'https://forms.google.com',
    emoji: '📋',
    tagline: 'Create online exams in minutes — no coding needed',
    description:
      'The simplest way to build an online quiz or exam. Auto-grading, result summaries, and integration with Google Classroom make it ideal for teachers who want a no-fuss solution.',
    tags: ['Free', 'Easy setup', 'Auto-grading', 'Google Workspace'],
    isFree: true,
  },
  {
    name: 'ClassMarker',
    url: 'https://www.classmarker.com',
    emoji: '✅',
    tagline: 'Professional online testing for businesses and educators',
    description:
      'A dedicated online exam platform with time limits, randomised questions, instant results and detailed reporting. Offers a free tier for small-scale testing.',
    tags: ['Free tier', 'Time limits', 'Randomised questions', 'Certificates'],
    isFree: true,
  },
  {
    name: 'ProProfs Quiz Maker',
    url: 'https://www.proprofs.com/quiz-school',
    emoji: '🧩',
    tagline: 'Easily create quizzes, surveys and assessments',
    description:
      'Feature-rich quiz builder supporting MCQs, true/false, fill-in-the-blanks and more. Includes a large public quiz library and detailed analytics.',
    tags: ['Free tier', 'Multiple question types', 'Analytics', 'Quiz library'],
    isFree: true,
  },
  {
    name: 'Quizlet',
    url: 'https://quizlet.com',
    emoji: '🃏',
    tagline: 'Study tools and games that make learning stick',
    description:
      'World-popular flashcard and practice-test platform. Students can create study sets, take adaptive tests and track their progress. Great for revision before exams.',
    tags: ['Free tier', 'Flashcards', 'Adaptive tests', 'Collaborative'],
    isFree: true,
  },
  {
    name: 'Kahoot!',
    url: 'https://kahoot.com',
    emoji: '🎮',
    tagline: 'Game-based learning that everyone loves',
    description:
      'Turns quizzes into live competitive games. Teachers host a game; students join on any device. Excellent for classroom engagement, revision sessions and formative assessments.',
    tags: ['Free tier', 'Live games', 'Engaging', 'Classroom'],
    isFree: true,
  },
  {
    name: 'Moodle',
    url: 'https://moodle.org',
    emoji: '🏫',
    tagline: 'Open-source LMS with a powerful quiz engine',
    description:
      "The world's most widely used open-source learning management system. Its built-in Quiz module supports dozens of question types, adaptive testing and detailed reporting.",
    tags: ['Free & open-source', 'Self-hosted', 'LMS', 'Enterprise'],
    isFree: true,
  },
  {
    name: 'Testmoz',
    url: 'https://testmoz.com',
    emoji: '⚡',
    tagline: 'Build a test in under 5 minutes',
    description:
      'Extremely simple online test builder — no account needed for students. Just create a test, share the link and watch results come in. Ideal for quick informal assessments.',
    tags: ['Free tier', 'No student login', 'Fast setup', 'Simple'],
    isFree: true,
  },
  {
    name: 'Socrative',
    url: 'https://www.socrative.com',
    emoji: '🚀',
    tagline: 'Real-time classroom assessment tool',
    description:
      'Lets teachers launch quizzes and exit tickets instantly and see responses in real time. Supports space-race games for motivation. Free plan covers most classroom needs.',
    tags: ['Free tier', 'Real-time results', 'Space Race', 'Classroom'],
    isFree: true,
  },
  {
    name: 'ExamBuilder',
    url: 'https://www.exambuilder.com',
    emoji: '🛠️',
    tagline: 'Online exam software for professional certification',
    description:
      'Designed for professional certification bodies and corporate training. Supports question banks, proctoring, custom branding and advanced analytics.',
    tags: ['Paid', 'Proctoring', 'Certification', 'Enterprise'],
    isFree: false,
  },
];

function TagBadge({ label }: { label: string }) {
  return (
    <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
      {label}
    </span>
  );
}

export default function ResourcesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
        📖 Online Exam Resources
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
        A curated list of good, simple ed-tech websites for online exams, quizzes and learning.
        Whether you are a student looking to practise or an educator building assessments, these
        platforms are worth exploring.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SITES.map((site) => (
          <a
            key={site.url}
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition-shadow p-6 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{site.emoji}</span>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {site.name}
                </h2>
              </div>
              {site.isFree ? (
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">
                  Free
                </span>
              ) : (
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300">
                  Paid
                </span>
              )}
            </div>

            <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2">
              {site.tagline}
            </p>

            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-1 mb-4">
              {site.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-4">
              {site.tags.map((tag) => (
                <TagBadge key={tag} label={tag} />
              ))}
            </div>

            {/* Visit Website button */}
            <span className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-blue-600 group-hover:bg-blue-700 text-white text-sm font-semibold self-start transition-colors">
              Visit Website →
            </span>
          </a>
        ))}
      </div>

      <p className="mt-10 text-sm text-center text-gray-400 dark:text-gray-500">
        Links open in a new tab · Insight24 is not affiliated with any of the above platforms.
      </p>
    </div>
  );
}
