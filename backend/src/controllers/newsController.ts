import { Request, Response } from 'express';
import { getTopHeadlines, searchNews, getNewsByCategory } from '../lib/newsapi';

export const getTrendingNews = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = req.query.category as string | undefined;
    const news = await getTopHeadlines(category);
    res.json(news);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const searchNewsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const query = req.query.q as string;
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 20;

    if (!query) {
      res.status(400).json({ error: 'Query parameter "q" is required' });
      return;
    }

    const news = await searchNews(query, page, pageSize);
    res.json(news);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getNewsByCategoryController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { category } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 20;

    const validCategories = [
      'general',
      'technology',
      'sports',
      'business',
      'entertainment',
      'health',
      'science',
    ];

    if (!validCategories.includes(category)) {
      res.status(400).json({ error: 'Invalid category' });
      return;
    }

    const news = await getNewsByCategory(category, page, pageSize);
    res.json(news);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
