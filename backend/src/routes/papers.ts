import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import {
  getPapers,
  getPaperById,
  createPaper,
  deletePaper,
} from '../controllers/papersController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

const writeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  standardHeaders: true,
  legacyHeaders: false,
});

router.get('/', getPapers);
router.get('/:id', getPaperById);
router.post('/', writeLimiter, authMiddleware, createPaper);
router.delete('/:id', writeLimiter, authMiddleware, deletePaper);

export default router;
