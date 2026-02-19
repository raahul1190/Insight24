import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import { db } from '../lib/firebase-admin';

export const getBookmarks = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.uid;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const bookmarksRef = db.collection('users').doc(userId).collection('bookmarks');
    const snapshot = await bookmarksRef.orderBy('savedAt', 'desc').get();

    const bookmarks = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json({ bookmarks });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const addBookmark = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.uid;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { article } = req.body;

    if (!article || !article.url) {
      res.status(400).json({ error: 'Article data is required' });
      return;
    }

    const bookmarkId = Buffer.from(article.url).toString('base64').replace(/[/+=]/g, '');
    const bookmarkRef = db
      .collection('users')
      .doc(userId)
      .collection('bookmarks')
      .doc(bookmarkId);

    await bookmarkRef.set({
      ...article,
      savedAt: new Date().toISOString(),
    });

    res.json({ message: 'Bookmark added successfully', id: bookmarkId });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const removeBookmark = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.uid;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { id } = req.params;

    await db.collection('users').doc(userId).collection('bookmarks').doc(id).delete();

    res.json({ message: 'Bookmark removed successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const checkBookmark = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.uid;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const url = req.query.url as string;

    if (!url) {
      res.status(400).json({ error: 'URL parameter is required' });
      return;
    }

    const bookmarkId = Buffer.from(url).toString('base64').replace(/[/+=]/g, '');
    const bookmarkRef = db
      .collection('users')
      .doc(userId)
      .collection('bookmarks')
      .doc(bookmarkId);

    const doc = await bookmarkRef.get();

    res.json({ isBookmarked: doc.exists });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
