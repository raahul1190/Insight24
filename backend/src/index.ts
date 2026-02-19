import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import newsRoutes from './routes/news';
import bookmarkRoutes from './routes/bookmarks';
import authRoutes from './routes/auth';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Insight24 API Server',
    version: '1.0.0',
    endpoints: {
      news: '/api/news',
      bookmarks: '/api/bookmarks',
      auth: '/api/auth',
    },
  });
});

app.use('/api/news', newsRoutes);
app.use('/api/bookmarks', bookmarkRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
