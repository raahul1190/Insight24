import { Request, Response } from 'express';
import axios from 'axios';
import { db } from '../lib/firebase-admin';

// POST /api/ai/chat
export const chatWithAI = async (req: Request, res: Response): Promise<void> => {
  try {
    const { message } = req.body as { message: string };

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      res.status(400).json({ error: 'message is required' });
      return;
    }

    const openaiKey = process.env.OPENAI_API_KEY;

    if (openaiKey) {
      // Real OpenAI completion
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content:
                'You are a helpful AI study assistant for students preparing for exams. Answer questions clearly and concisely, provide examples where helpful, and encourage students.',
            },
            { role: 'user', content: message.trim() },
          ],
          max_tokens: 500,
        },
        {
          headers: {
            Authorization: `Bearer ${openaiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const reply: string = response.data.choices[0]?.message?.content ?? '';
      res.json({ reply });
    } else {
      // Mock response when OPENAI_API_KEY is not configured
      const lowerMsg = message.toLowerCase();
      let reply =
        "I'm your AI study assistant! To enable real AI responses, please configure the OPENAI_API_KEY environment variable. In the meantime, feel free to explore the exam questions, previous year papers, and important notes sections.";

      if (lowerMsg.includes('exam') || lowerMsg.includes('question')) {
        reply =
          'Great question about exams! Head to the Exam section to practice with our question bank. You can filter by subject and difficulty level. Good luck with your preparation! 📚';
      } else if (lowerMsg.includes('note') || lowerMsg.includes('study')) {
        reply =
          'For study notes, check out the Important Notes section where you can find curated notes organized by subject. Consistent studying is the key to success! 🎯';
      } else if (lowerMsg.includes('paper') || lowerMsg.includes('previous')) {
        reply =
          'Previous year question papers are a great way to prepare! Visit the Papers section to browse and download papers filtered by subject and year. 📄';
      } else if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
        reply =
          "Hello! I'm your AI study assistant. I can help you with exam preparation, explain concepts, and guide you through study materials. What would you like to learn today? 😊";
      }

      res.json({ reply });
    }
  } catch (error: any) {
    res.status(500).json({ error: 'AI service unavailable. Please try again later.' });
  }
};

// ─── Exam Pattern Analysis ────────────────────────────────────────────────────

interface PatternDataPoint {
  subject: string;
  difficulty: string;
  year?: number;
  month?: string;
  topicKeywords: string[];
}

function extractKeywords(text: string): string[] {
  // Simple keyword extraction: lowercase words longer than 4 chars, excluding stop-words
  const STOP_WORDS = new Set([
    'what', 'which', 'where', 'when', 'this', 'that', 'with', 'from', 'have',
    'will', 'they', 'their', 'there', 'about', 'below', 'above', 'between',
    'following', 'answer', 'question', 'correct', 'option', 'choose',
  ]);
  return [
    ...new Set(
      text
        .toLowerCase()
        .replace(/[^a-z\s]/g, ' ')
        .split(/\s+/)
        .filter((w) => w.length > 4 && !STOP_WORDS.has(w))
        .slice(0, 8)
    ),
  ];
}

function buildSummaryText(points: PatternDataPoint[], subject: string, yearRange: number[]): string {
  const total = points.length;
  if (total === 0) {
    return `No exam data found for the selected subject and year range.`;
  }

  // Count by difficulty
  const diffCount: Record<string, number> = {};
  // Count by year
  const yearCount: Record<number, number> = {};
  // Aggregate keywords
  const keywordFreq: Record<string, number> = {};

  for (const p of points) {
    diffCount[p.difficulty] = (diffCount[p.difficulty] || 0) + 1;
    if (p.year) yearCount[p.year] = (yearCount[p.year] || 0) + 1;
    for (const kw of p.topicKeywords) {
      keywordFreq[kw] = (keywordFreq[kw] || 0) + 1;
    }
  }

  const topKeywords = Object.entries(keywordFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
    .map(([w, c]) => `${w} (×${c})`)
    .join(', ');

  const diffSummary = Object.entries(diffCount)
    .map(([d, c]) => `${d}: ${c} (${Math.round((c / total) * 100)}%)`)
    .join(', ');

  const yearSummary = Object.entries(yearCount)
    .sort((a, b) => Number(a[0]) - Number(b[0]))
    .map(([y, c]) => `${y}: ${c} questions`)
    .join(', ');

  return `
Subject: ${subject === 'All' ? 'All Subjects' : subject}
Year range: ${yearRange[0]}–${yearRange[1]}
Total questions / papers analysed: ${total}

Difficulty breakdown: ${diffSummary || 'N/A'}

Questions per year: ${yearSummary || 'N/A'}

Most frequently occurring topic keywords: ${topKeywords || 'N/A'}
`.trim();
}

// POST /api/ai/analyze-patterns
export const analyzePatterns = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      subject = 'All',
      yearFrom = new Date().getFullYear() - 4,
      yearTo = new Date().getFullYear(),
    } = req.body as { subject?: string; yearFrom?: number; yearTo?: number };

    const fromYear = Number(yearFrom);
    const toYear = Number(yearTo);

    // ── Fetch exam questions ──────────────────────────────────────────────────
    let qQuery: FirebaseFirestore.Query = db.collection('examQuestions');
    if (subject !== 'All') qQuery = qQuery.where('subject', '==', subject);
    const qSnap = await qQuery.get();

    const questionPoints: PatternDataPoint[] = qSnap.docs
      .map((doc) => {
        const d = doc.data();
        const createdAt = d.createdAt as string | undefined;
        const year = createdAt ? new Date(createdAt).getFullYear() : undefined;
        return {
          subject: d.subject || 'Unknown',
          difficulty: d.difficulty || 'unknown',
          year,
          topicKeywords: extractKeywords((d.question as string) || ''),
        };
      })
      .filter((p) => p.year === undefined || (p.year >= fromYear && p.year <= toYear));

    // ── Fetch previous year papers ────────────────────────────────────────────
    let pQuery: FirebaseFirestore.Query = db.collection('previousPapers');
    if (subject !== 'All') pQuery = pQuery.where('subject', '==', subject);
    const pSnap = await pQuery.get();

    const paperPoints: PatternDataPoint[] = pSnap.docs
      .map((doc) => {
        const d = doc.data();
        const year = d.year as number | undefined;
        return {
          subject: d.subject || 'Unknown',
          difficulty: 'N/A',
          year,
          topicKeywords: extractKeywords((d.title as string) + ' ' + (d.description as string || '')),
        };
      })
      .filter((p) => p.year === undefined || (p.year >= fromYear && p.year <= toYear));

    const allPoints = [...questionPoints, ...paperPoints];
    const summaryText = buildSummaryText(allPoints, subject, [fromYear, toYear]);

    const openaiKey = process.env.OPENAI_API_KEY;

    if (openaiKey) {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content:
                'You are an expert educational data analyst. Analyse exam question patterns and provide structured, actionable insights for students. Always structure your response with clear sections: 1) Overview, 2) Topic Trends, 3) Difficulty Pattern, 4) Year-on-Year Changes, 5) Predictions & Recommendations.',
            },
            {
              role: 'user',
              content: `Based on the following exam data summary, analyse the patterns throughout the year and provide detailed insights:\n\n${summaryText}`,
            },
          ],
          max_tokens: 800,
        },
        {
          headers: {
            Authorization: `Bearer ${openaiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const analysis: string = response.data.choices[0]?.message?.content ?? '';
      res.json({ analysis, summary: summaryText, dataPoints: allPoints.length });
    } else {
      // ── Mock analysis when no OpenAI key ─────────────────────────────────────
      const mockAnalysis = buildMockAnalysis(summaryText, subject, fromYear, toYear, allPoints);
      res.json({ analysis: mockAnalysis, summary: summaryText, dataPoints: allPoints.length });
    }
  } catch (error: any) {
    res.status(500).json({ error: 'Pattern analysis failed. Please try again later.' });
  }
};

function buildMockAnalysis(
  summaryText: string,
  subject: string,
  fromYear: number,
  toYear: number,
  points: PatternDataPoint[]
): string {
  const subjectLabel = subject === 'All' ? 'all subjects' : subject;
  const total = points.length;

  if (total === 0) {
    return `📊 **Exam Pattern Analysis**\n\nNo exam data is available yet for ${subjectLabel} in ${fromYear}–${toYear}. Once questions and previous year papers are added to the system, the AI will analyse patterns across topics, difficulty levels and years to give you actionable preparation insights.\n\n💡 **To get started:** Ask an admin to upload exam questions and previous year papers via the backend API.`;
  }

  const easyCount = points.filter((p) => p.difficulty === 'easy').length;
  const medCount = points.filter((p) => p.difficulty === 'medium').length;
  const hardCount = points.filter((p) => p.difficulty === 'hard').length;

  const keywordFreq: Record<string, number> = {};
  for (const p of points) {
    for (const kw of p.topicKeywords) keywordFreq[kw] = (keywordFreq[kw] || 0) + 1;
  }
  const topTopics = Object.entries(keywordFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([w]) => w)
    .join(', ');

  return `📊 **Exam Pattern Analysis** (${fromYear}–${toYear})
Subject: ${subjectLabel}
Data points analysed: ${total}

---

**1. Overview**
A total of ${total} exam items were analysed across the period ${fromYear} to ${toYear}. The data covers exam questions from the question bank and previous year papers.

**2. Topic Trends**
The most frequently recurring topics are: ${topTopics || 'insufficient data for keyword extraction'}.
These themes appear consistently across multiple years, suggesting they are core examination areas that receive regular attention. Students should ensure strong understanding of these topics.

**3. Difficulty Pattern**
• Easy questions: ${easyCount} (${total > 0 ? Math.round((easyCount / total) * 100) : 0}%)
• Medium questions: ${medCount} (${total > 0 ? Math.round((medCount / total) * 100) : 0}%)
• Hard questions: ${hardCount} (${total > 0 ? Math.round((hardCount / total) * 100) : 0}%)
${medCount >= easyCount && medCount >= hardCount ? 'Medium-difficulty questions dominate, which is typical for standardised assessments.' : hardCount > medCount ? 'The exam leans harder — focus on deep conceptual understanding.' : 'The exam has a lighter difficulty profile — ensure you cover breadth of topics.'}

**4. Year-on-Year Changes**
Based on the available data across ${fromYear}–${toYear}, the volume of questions per year helps identify active examination periods. Years with more questions typically reflect higher exam frequency or a broader syllabus scope.

**5. Predictions & Recommendations**
• Focus your revision on the high-frequency topics identified above.
• Practise medium and hard difficulty questions to build confidence.
• Review previous year papers for ${Math.max(fromYear, toYear - 2)}–${toYear} as the most recent patterns are strongest predictors.
• Use the AI Assistant tab to ask deep-dive questions on any topic.

⚠️ *Configure OPENAI_API_KEY in the backend .env file to get real AI-generated pattern analysis.*`;
}

