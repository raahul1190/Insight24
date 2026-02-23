import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { chatWithAI, analyzePatterns } from '../controllers/aiController';

const router = Router();

const analysisLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/chat', chatWithAI);
router.post('/analyze-patterns', analysisLimiter, analyzePatterns);

export default router;
