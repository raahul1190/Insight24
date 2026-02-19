import { Router } from 'express';
import {
  getBookmarks,
  addBookmark,
  removeBookmark,
  checkBookmark,
} from '../controllers/bookmarkController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.use(authMiddleware);

router.get('/', getBookmarks);
router.post('/', addBookmark);
router.delete('/:id', removeBookmark);
router.get('/check', checkBookmark);

export default router;
