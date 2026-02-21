import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import { db } from '../lib/firebase-admin';

// GET /api/notes?subject=math
export const getNotes = async (req: Request, res: Response): Promise<void> => {
  try {
    let query: FirebaseFirestore.Query = db.collection('importantNotes');

    const subject = req.query.subject as string | undefined;
    if (subject) query = query.where('subject', '==', subject);

    const snapshot = await query.orderBy('createdAt', 'desc').get();

    const notes = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json({ notes });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/notes/:id
export const getNoteById = async (req: Request, res: Response): Promise<void> => {
  try {
    const doc = await db.collection('importantNotes').doc(req.params.id).get();
    if (!doc.exists) {
      res.status(404).json({ error: 'Note not found' });
      return;
    }
    res.json({ id: doc.id, ...doc.data() });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// POST /api/notes  (requires auth)
export const createNote = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, subject, content, tags } = req.body;

    if (!title || !subject || !content) {
      res.status(400).json({ error: 'title, subject and content are required' });
      return;
    }

    const docRef = await db.collection('importantNotes').add({
      title,
      subject,
      content,
      tags: tags || [],
      createdAt: new Date().toISOString(),
    });

    res.status(201).json({ message: 'Note created', id: docRef.id });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE /api/notes/:id  (requires auth)
export const deleteNote = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    await db.collection('importantNotes').doc(req.params.id).delete();
    res.json({ message: 'Note deleted' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
