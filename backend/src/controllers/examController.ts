import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import { db } from '../lib/firebase-admin';

export interface ExamQuestion {
  id?: string;
  question: string;
  options: string[];
  correctOption: number;
  explanation?: string;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  createdAt?: string;
}

// GET /api/exam/questions?subject=math&difficulty=easy
export const getQuestions = async (req: Request, res: Response): Promise<void> => {
  try {
    let query: FirebaseFirestore.Query = db.collection('examQuestions');

    const subject = req.query.subject as string | undefined;
    const difficulty = req.query.difficulty as string | undefined;

    if (subject) query = query.where('subject', '==', subject);
    if (difficulty) query = query.where('difficulty', '==', difficulty);

    const snapshot = await query.orderBy('createdAt', 'desc').get();

    const questions = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      correctOption: undefined, // hide answer from students
    }));

    res.json({ questions });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// POST /api/exam/questions  (admin only — requires auth)
export const createQuestion = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { question, options, correctOption, explanation, subject, difficulty } = req.body;

    if (!question || !options || correctOption === undefined || !subject || !difficulty) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    if (!Array.isArray(options) || options.length < 2) {
      res.status(400).json({ error: 'options must be an array with at least 2 items' });
      return;
    }

    const docRef = await db.collection('examQuestions').add({
      question,
      options,
      correctOption,
      explanation: explanation || '',
      subject,
      difficulty,
      createdAt: new Date().toISOString(),
    });

    res.status(201).json({ message: 'Question created', id: docRef.id });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// POST /api/exam/submit — student submits answers, gets score
export const submitExam = async (req: Request, res: Response): Promise<void> => {
  try {
    const { answers } = req.body as { answers: { questionId: string; selectedOption: number }[] };

    if (!Array.isArray(answers) || answers.length === 0) {
      res.status(400).json({ error: 'answers array is required' });
      return;
    }

    const ids = answers.map((a) => a.questionId);
    const snapshots = await Promise.all(
      ids.map((id) => db.collection('examQuestions').doc(id).get())
    );

    let score = 0;
    const results = snapshots.map((snap, i) => {
      if (!snap.exists) return { questionId: ids[i], correct: false };
      const data = snap.data() as ExamQuestion;
      const correct = data.correctOption === answers[i].selectedOption;
      if (correct) score++;
      return {
        questionId: ids[i],
        correct,
        correctOption: data.correctOption,
        explanation: data.explanation,
      };
    });

    res.json({ score, total: answers.length, results });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE /api/exam/questions/:id (admin only — requires auth)
export const deleteQuestion = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await db.collection('examQuestions').doc(id).delete();
    res.json({ message: 'Question deleted' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
