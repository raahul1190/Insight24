# Insight24 - Full-Stack News Tracking App 📰

A complete, production-ready News Tracking Application with:
- **Web App** built with Next.js 14
- **Mobile App** built with Expo React Native
- **Backend API** built with Node.js + Express
- **Firebase** for authentication and data storage
- **NewsAPI** for real-time news data

## 🎯 Features

### Core Functionality
- ✅ **Search News by Keyword** - Search for news articles across all sources
- ✅ **Filter by Category** - Browse news by category (Technology, Business, Sports, etc.)
- ✅ **Bookmark Articles** - Save articles to read later (synced via Firestore)
- ✅ **User Authentication** - Email/Password and Google Sign-In via Firebase Auth
- ✅ **Dark Mode** - Full dark mode support on both web and mobile
- ✅ **Trending Topics** - View top headlines and trending news
- ✅ **Push Notifications** (Mobile) - Get notified about breaking news

### Technical Features
- Responsive design (mobile, tablet, desktop)
- Real-time bookmark synchronization
- Skeleton loading states
- Error handling with user-friendly messages
- TypeScript throughout
- Optimized images with lazy loading

## 📂 Project Structure

```
Insight24/
├── backend/          # Node.js + Express API
├── web/             # Next.js 14 Web App
├── mobile/          # Expo React Native App
├── README.md
└── .gitignore
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Firebase account ([Create one here](https://console.firebase.google.com/))
- NewsAPI key ([Get one here](https://newsapi.org/register))
- For mobile: Expo CLI and Expo Go app on your phone

### 1. Clone the Repository

```bash
git clone https://github.com/raahul1190/Insight24.git
cd Insight24
```

### 2. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable **Authentication** with Email/Password and Google Sign-In
4. Create a **Firestore Database** (start in test mode)
5. Get your Firebase config from Project Settings
6. Download the service account key JSON for the backend

### 3. NewsAPI Setup

1. Sign up at [NewsAPI.org](https://newsapi.org/register)
2. Get your API key from the dashboard

## 🔧 Backend Setup

```bash
cd backend
npm install
```

Create `.env` file in the `backend` directory:

```env
PORT=5000
NEWS_API_KEY=your_newsapi_key_here
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_CLIENT_EMAIL=your_firebase_client_email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

**Note**: For `FIREBASE_PRIVATE_KEY`, use the private key from your Firebase service account JSON file.

Run the backend:

```bash
npm run dev
```

The API will be running at `http://localhost:5000`

### API Endpoints

- `GET /api/news/trending?category=technology` - Get trending news
- `GET /api/news/search?q=keyword` - Search news
- `GET /api/news/category/:category` - Get news by category
- `GET /api/bookmarks` - Get user bookmarks (requires auth)
- `POST /api/bookmarks` - Add bookmark (requires auth)
- `DELETE /api/bookmarks/:id` - Remove bookmark (requires auth)

## 💻 Web App Setup

```bash
cd web
npm install
```

Create `.env.local` file in the `web` directory:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

Run the web app:

```bash
npm run dev
```

The web app will be running at `http://localhost:3000`

### Web App Features

- **Home Page** (`/`) - Trending news feed
- **Search** (`/search?q=keyword`) - Search results
- **Category Pages** (`/category/technology`) - News by category
- **Bookmarks** (`/bookmarks`) - Saved articles
- **Login** (`/login`) - Authentication page

## 📱 Mobile App Setup

```bash
cd mobile
npm install
```

Create `.env` file in the `mobile` directory:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
EXPO_PUBLIC_BACKEND_URL=http://your-computer-ip:5000
```

**Note**: For mobile development, replace `localhost` with your computer's local IP address (e.g., `http://192.168.1.100:5000`)

Run the mobile app:

```bash
npx expo start
```

- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with Expo Go app on your phone

### Mobile App Features

- **Home Tab** - Trending news with category filter
- **Search Tab** - Search for news articles
- **Bookmarks Tab** - View saved articles
- **Profile Tab** - User profile and push notification settings

## 🎨 Available Categories

- General
- Technology
- Business
- Sports
- Entertainment
- Health
- Science

## 🔐 Authentication

Both web and mobile apps support:
- **Email/Password** authentication
- **Google Sign-In**

Users must be authenticated to:
- Bookmark articles
- View bookmarks
- Receive push notifications (mobile)

## 📊 Firestore Data Structure

```
users/
  {userId}/
    bookmarks/
      {bookmarkId}/
        - title
        - description
        - url
        - urlToImage
        - source
        - publishedAt
        - savedAt
```

## 🌙 Dark Mode

### Web
- Toggle button in navbar
- Persisted in localStorage
- Uses Tailwind CSS dark mode classes

### Mobile
- Respects system preferences
- Uses NativeWind for styling

## 🔔 Push Notifications (Mobile Only)

The mobile app includes push notification support:

1. Notifications are requested on profile screen
2. Push tokens are registered with Expo
3. Breaking news notifications can be sent via Expo Push API

## 🚀 Deployment

### Backend Deployment

Deploy to platforms like:
- Railway
- Render
- Heroku
- DigitalOcean

Make sure to set all environment variables in your hosting platform.

### Web Deployment

Deploy to Vercel (recommended for Next.js):

```bash
cd web
npm run build
# Deploy to Vercel
```

Or use:
- Netlify
- Cloudflare Pages
- AWS Amplify

### Mobile Deployment

Build for production:

```bash
cd mobile
npx expo build:android
npx expo build:ios
```

Submit to app stores:
- Google Play Store (Android)
- Apple App Store (iOS)

## 🛠️ Tech Stack

### Backend
- Node.js & Express
- TypeScript
- Firebase Admin SDK
- NewsAPI
- CORS middleware

### Web App
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Firebase Auth & Firestore
- Axios

### Mobile App
- Expo SDK 51
- React Native
- Expo Router (file-based routing)
- NativeWind (Tailwind for RN)
- Firebase Auth & Firestore
- Expo Notifications

## 📝 Development Tips

### Backend
- Use `ts-node-dev` for hot reloading during development
- Check Firebase Admin SDK credentials are correct
- Ensure NewsAPI key is valid and not rate-limited

### Web
- Use Next.js dev mode for fast refresh
- Check browser console for errors
- Firebase config must be in environment variables

### Mobile
- Use Expo Go for quick testing
- Check Expo logs for errors: `npx expo start`
- For push notifications, test on physical device

## 🐛 Troubleshooting

### Backend Issues
- **500 Error**: Check Firebase credentials and NewsAPI key
- **CORS Error**: Ensure CORS is enabled in backend
- **Rate Limit**: NewsAPI free tier has 100 requests/day limit

### Web Issues
- **Firebase Init Error**: Check `.env.local` variables
- **Image Loading**: Next.js config allows external images
- **Dark Mode**: Clear localStorage if theme is stuck

### Mobile Issues
- **Metro Bundler Error**: Clear cache with `npx expo start -c`
- **Firebase Error**: Check `.env` file exists and is loaded
- **Network Error**: Use computer's IP instead of localhost

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

## 👨‍💻 Author

Built as a demonstration of full-stack development with modern technologies.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

**Happy Coding! 🚀**