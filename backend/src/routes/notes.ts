import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import {
  getNotes,
  getNoteById,
  createNote,
  deleteNote,
} from '../controllers/notesController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

const writeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  standardHeaders: true,
  legacyHeaders: false,
});

router.get('/', getNotes);
router.get('/:id', getNoteById);
router.post('/', writeLimiter, authMiddleware, createNote);
router.delete('/:id', writeLimiter, authMiddleware, deleteNote);

export default router;
