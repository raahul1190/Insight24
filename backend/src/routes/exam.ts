import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import {
  getQuestions,
  createQuestion,
  submitExam,
  deleteQuestion,
} from '../controllers/examController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

const writeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  standardHeaders: true,
  legacyHeaders: false,
});

router.get('/questions', getQuestions);
router.post('/questions', writeLimiter, authMiddleware, createQuestion);
router.delete('/questions/:id', writeLimiter, authMiddleware, deleteQuestion);
router.post('/submit', submitExam);

export default router;
