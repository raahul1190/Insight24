import { Request, Response } from 'express';
import axios from 'axios';

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
      const mockReplies: Record<string, string> = {
        default:
          'I\'m your AI study assistant! To enable real AI responses, please configure the OPENAI_API_KEY environment variable. In the meantime, feel free to explore the exam questions, previous year papers, and important notes sections.',
      };

      const lowerMsg = message.toLowerCase();
      let reply = mockReplies.default;

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
          'Hello! I\'m your AI study assistant. I can help you with exam preparation, explain concepts, and guide you through study materials. What would you like to learn today? 😊';
      }

      res.json({ reply });
    }
  } catch (error: any) {
    res.status(500).json({ error: 'AI service unavailable. Please try again later.' });
  }
};
