import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

const NEWS_API_KEY = process.env.NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

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

export const getTopHeadlines = async (
  category?: string,
  country: string = 'us'
): Promise<NewsResponse> => {
  try {
    const params: any = {
      apiKey: NEWS_API_KEY,
      country,
    };
    
    if (category) {
      params.category = category;
    }

    const response = await axios.get(`${BASE_URL}/top-headlines`, { params });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch top headlines');
  }
};

export const searchNews = async (
  query: string,
  page: number = 1,
  pageSize: number = 20
): Promise<NewsResponse> => {
  try {
    const response = await axios.get(`${BASE_URL}/everything`, {
      params: {
        apiKey: NEWS_API_KEY,
        q: query,
        page,
        pageSize,
        sortBy: 'publishedAt',
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to search news');
  }
};

export const getNewsByCategory = async (
  category: string,
  page: number = 1,
  pageSize: number = 20
): Promise<NewsResponse> => {
  try {
    const response = await axios.get(`${BASE_URL}/top-headlines`, {
      params: {
        apiKey: NEWS_API_KEY,
        category,
        country: 'us',
        page,
        pageSize,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch news by category');
  }
};
