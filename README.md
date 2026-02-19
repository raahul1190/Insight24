# Insight24 🌐📱

A full-stack news tracking application built with modern web and mobile technologies. Stay updated with the latest news across multiple categories with features like bookmarking, push notifications, and more.

## ✨ Features

- 🔍 **News Search** - Search for articles across multiple news sources
- 📂 **Category Filtering** - Browse news by categories (Technology, Business, Sports, etc.)
- 🔖 **Bookmarks** - Save articles to read later
- 🔔 **Push Notifications** - Get notified about breaking news
- 🔐 **User Authentication** - Secure user accounts with Firebase Auth
- 🌙 **Dark Mode** - Eye-friendly dark theme support
- 🔥 **Trending News** - Stay updated with trending topics

## 🛠️ Tech Stack

| Component | Technology |
|-----------|-----------|
| **Web** | Next.js 14, React, TypeScript, Tailwind CSS |
| **Mobile** | Expo, React Native, TypeScript |
| **Backend** | Node.js, Express, TypeScript |
| **Database** | Firebase Firestore |
| **Authentication** | Firebase Auth |
| **News API** | NewsAPI.org |
| **Deployment** | Vercel (Web), Railway (Backend), Expo EAS (Mobile) |

## 📁 Project Structure

```
Insight24/
├── backend/              # Node.js/Express API server
│   ├── src/             # Source code
│   ├── .env.example     # Environment variables template
│   ├── package.json     # Backend dependencies
│   ├── railway.json     # Railway deployment config
│   └── Procfile         # Process configuration
│
├── web/                 # Next.js web application
│   ├── src/             # Source code
│   ├── public/          # Static assets
│   ├── .env.local.example  # Environment variables template
│   ├── package.json     # Web dependencies
│   └── vercel.json      # Vercel deployment config
│
├── mobile/              # React Native mobile app
│   ├── src/             # Source code
│   ├── .env.example     # Environment variables template
│   ├── package.json     # Mobile dependencies
│   ├── app.json         # Expo configuration
│   └── eas.json         # EAS Build configuration
│
├── .github/
│   ├── workflows/       # CI/CD pipelines
│   └── SECRETS_SETUP.md # GitHub Secrets documentation
│
├── .gitignore
└── README.md
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** or **yarn** package manager
- **Expo CLI** - Install with `npm install -g expo-cli`
- **Git** for version control
- **Firebase Account** - [Create one here](https://firebase.google.com/)
- **NewsAPI Account** - [Get API key here](https://newsapi.org/register)

## 🔧 Environment Variables Setup

### Step 1: Get NewsAPI Key
1. Visit [NewsAPI.org](https://newsapi.org/register)
2. Sign up for a free account
3. Copy your API key from the dashboard

### Step 2: Set Up Firebase
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Enable **Firestore Database** and **Authentication**
4. For **Web/Mobile** - Go to Project Settings → Your Apps → Add App
   - Copy the Firebase configuration values
5. For **Backend** - Go to Project Settings → Service Accounts
   - Click "Generate New Private Key"
   - Save the JSON file securely

### Step 3: Configure Environment Files

#### Backend (`/backend/.env`)
```bash
cp backend/.env.example backend/.env
```
Then edit `backend/.env` with your values:
```
PORT=5000
NEWS_API_KEY=your_actual_newsapi_key
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

#### Web (`/web/.env.local`)
```bash
cp web/.env.local.example web/.env.local
```
Then edit `web/.env.local` with your values from Firebase Web Config.

#### Mobile (`/mobile/.env`)
```bash
cp mobile/.env.example mobile/.env
```
Then edit `mobile/.env` with your values from Firebase.

## 🚀 Installation & Running Locally

### Backend Server
```bash
cd backend
npm install
npm run dev
```
The backend will start on `http://localhost:5000`

### Web Application
```bash
cd web
npm install
npm run dev
```
The web app will start on `http://localhost:3000`

### Mobile Application
```bash
cd mobile
npm install
npx expo start
```
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with Expo Go app for physical device

## 📦 Deployment

### Web Application (Vercel)
1. Install Vercel CLI: `npm install -g vercel`
2. Navigate to web directory: `cd web`
3. Run: `vercel`
4. Follow the prompts to link your project
5. Set environment variables in Vercel Dashboard
6. Deploy: `vercel --prod`

**Or use GitHub Integration:**
- Connect your repository to Vercel
- Vercel will auto-deploy on push to `main`

### Backend Server (Railway)
1. Install Railway CLI: `npm install -g @railway/cli`
2. Login: `railway login`
3. Navigate to backend: `cd backend`
4. Initialize: `railway init`
5. Add environment variables: `railway variables`
6. Deploy: `railway up`

**Or use GitHub Integration:**
- Connect your repository to Railway
- Railway will auto-deploy on push to `main`

### Mobile App (Expo EAS Build)
1. Install EAS CLI: `npm install -g eas-cli`
2. Login: `eas login`
3. Configure: `eas build:configure`
4. Build for iOS: `eas build --platform ios`
5. Build for Android: `eas build --platform android`
6. Submit to stores: `eas submit`

## 🔐 GitHub Secrets Setup

For CI/CD pipelines to work, you need to configure GitHub repository secrets:

**Go to:** Repository Settings → Secrets and variables → Actions → New repository secret

### Required Secrets:

| Secret Name | Description | Where to Get |
|------------|-------------|--------------|
| `NEWS_API_KEY` | NewsAPI key for backend | [newsapi.org/account](https://newsapi.org/account) |
| `FIREBASE_PROJECT_ID` | Firebase project ID | Firebase Console → Project Settings |
| `FIREBASE_CLIENT_EMAIL` | Service account email | Firebase Console → Service Accounts |
| `FIREBASE_PRIVATE_KEY` | Service account private key | Firebase Console → Service Accounts → Generate Key |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase web API key | Firebase Console → Your Apps |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase auth domain | Firebase Console → Your Apps |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase project ID | Firebase Console → Your Apps |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket | Firebase Console → Your Apps |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging ID | Firebase Console → Your Apps |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase app ID | Firebase Console → Your Apps |
| `NEXT_PUBLIC_BACKEND_URL` | Backend API URL | Your Railway deployment URL |
| `VERCEL_TOKEN` | Vercel deployment token | [vercel.com/account/tokens](https://vercel.com/account/tokens) |
| `VERCEL_ORG_ID` | Vercel organization ID | Vercel Settings → General |
| `VERCEL_PROJECT_ID` | Vercel project ID | Vercel Project Settings |
| `RAILWAY_TOKEN` | Railway deployment token | [railway.app/account/tokens](https://railway.app/account/tokens) |

See [`.github/SECRETS_SETUP.md`](.github/SECRETS_SETUP.md) for detailed instructions.

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request

### Development Guidelines
- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [NewsAPI](https://newsapi.org/) for providing the news data
- [Firebase](https://firebase.google.com/) for backend services
- [Vercel](https://vercel.com/) for web hosting
- [Railway](https://railway.app/) for backend hosting
- [Expo](https://expo.dev/) for mobile development

---

**Built with ❤️ by the Insight24 Team**
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
