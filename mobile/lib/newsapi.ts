import axios from 'axios';

const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL || 'http://localhost:5000';

export interface NewsArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

export const fetchTrendingNews = async (category?: string): Promise<NewsResponse> => {
  try {
    const params = category ? { category } : {};
    const response = await axios.get(`${BACKEND_URL}/api/news/trending`, { params });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch trending news');
  }
};

export const searchNews = async (query: string, page: number = 1): Promise<NewsResponse> => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/news/search`, {
      params: { q: query, page },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to search news');
  }
};

export const fetchNewsByCategory = async (
  category: string,
  page: number = 1
): Promise<NewsResponse> => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/news/category/${category}`, {
      params: { page },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch news by category');
  }
};
