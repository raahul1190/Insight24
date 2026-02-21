import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import { db } from '../lib/firebase-admin';

// GET /api/papers?subject=math&year=2023
export const getPapers = async (req: Request, res: Response): Promise<void> => {
  try {
    let query: FirebaseFirestore.Query = db.collection('previousPapers');

    const subject = req.query.subject as string | undefined;
    const year = req.query.year as string | undefined;

    if (subject) query = query.where('subject', '==', subject);
    if (year) query = query.where('year', '==', parseInt(year));

    const snapshot = await query.orderBy('year', 'desc').get();

    const papers = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json({ papers });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/papers/:id
export const getPaperById = async (req: Request, res: Response): Promise<void> => {
  try {
    const doc = await db.collection('previousPapers').doc(req.params.id).get();
    if (!doc.exists) {
      res.status(404).json({ error: 'Paper not found' });
      return;
    }
    res.json({ id: doc.id, ...doc.data() });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// POST /api/papers  (requires auth)
export const createPaper = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, subject, year, fileUrl, description } = req.body;

    if (!title || !subject || !year) {
      res.status(400).json({ error: 'title, subject and year are required' });
      return;
    }

    const docRef = await db.collection('previousPapers').add({
      title,
      subject,
      year: parseInt(year),
      fileUrl: fileUrl || '',
      description: description || '',
      createdAt: new Date().toISOString(),
    });

    res.status(201).json({ message: 'Paper created', id: docRef.id });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE /api/papers/:id (requires auth)
export const deletePaper = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    await db.collection('previousPapers').doc(req.params.id).delete();
    res.json({ message: 'Paper deleted' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
