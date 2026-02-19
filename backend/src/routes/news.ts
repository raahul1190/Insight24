import { Router } from 'express';
import {
  getTrendingNews,
  searchNewsController,
  getNewsByCategoryController,
} from '../controllers/newsController';

const router = Router();

router.get('/trending', getTrendingNews);
router.get('/search', searchNewsController);
router.get('/category/:category', getNewsByCategoryController);

export default router;
