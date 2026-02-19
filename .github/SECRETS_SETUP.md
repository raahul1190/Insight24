# GitHub Secrets Setup

This guide explains how to configure all required GitHub repository secrets for the Insight24 project's CI/CD pipelines.

## How to Add Secrets

Go to: **Repository Settings** → **Secrets and variables** → **Actions** → **New repository secret**

## Required Secrets

### NewsAPI

| Secret Name | Where to Get |
|-------------|-------------|
| `NEWS_API_KEY` | https://newsapi.org/account |

**Steps:**
1. Sign up or log in to NewsAPI
2. Navigate to your account dashboard
3. Copy your API key
4. Add it as `NEWS_API_KEY` secret in GitHub

---

### Firebase (Backend)

| Secret Name | Where to Get |
|-------------|-------------|
| `FIREBASE_PROJECT_ID` | Firebase Console → Project Settings |
| `FIREBASE_CLIENT_EMAIL` | Firebase Console → Project Settings → Service Accounts |
| `FIREBASE_PRIVATE_KEY` | Firebase Console → Project Settings → Service Accounts → Generate Key |

**Steps:**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click on Project Settings (gear icon)
4. Navigate to **Service Accounts** tab
5. Click **Generate New Private Key**
6. Download the JSON file
7. Extract the following values from the JSON:
   - `project_id` → `FIREBASE_PROJECT_ID`
   - `client_email` → `FIREBASE_CLIENT_EMAIL`
   - `private_key` → `FIREBASE_PRIVATE_KEY` (keep the quotes and newlines as-is)

---

### Firebase (Web/Mobile)

| Secret Name | Where to Get |
|-------------|-------------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase Console → Project Settings → Your Apps |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase Console → Project Settings → Your Apps |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase Console → Project Settings → Your Apps |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase Console → Project Settings → Your Apps |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase Console → Project Settings → Your Apps |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase Console → Project Settings → Your Apps |

**Steps:**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click on Project Settings (gear icon)
4. Scroll down to **Your apps** section
5. If you haven't added a web app, click the web icon (`</>`) to add one
6. Copy the Firebase configuration object values
7. Add each value as a GitHub secret with the corresponding name

---

### Backend URL

| Secret Name | Where to Get |
|-------------|-------------|
| `NEXT_PUBLIC_BACKEND_URL` | Your Railway deployment URL or `http://localhost:5000` for development |

**Steps:**
1. Deploy your backend to Railway (see deployment guide)
2. Copy the deployment URL from Railway dashboard
3. Add it as `NEXT_PUBLIC_BACKEND_URL` secret in GitHub

---

### Vercel Deployment

| Secret Name | Where to Get |
|-------------|-------------|
| `VERCEL_TOKEN` | https://vercel.com/account/tokens |
| `VERCEL_ORG_ID` | Vercel → Settings → General |
| `VERCEL_PROJECT_ID` | Vercel → Project → Settings → General |

**Steps for VERCEL_TOKEN:**
1. Go to https://vercel.com/account/tokens
2. Click **Create Token**
3. Give it a name (e.g., "GitHub Actions")
4. Select appropriate scope
5. Copy the token and add it to GitHub secrets

**Steps for VERCEL_ORG_ID and VERCEL_PROJECT_ID:**
1. Install Vercel CLI: `npm install -g vercel`
2. Navigate to your web directory: `cd web`
3. Run: `vercel link`
4. Follow the prompts to link your project
5. A `.vercel` folder will be created with `project.json`
6. Open `.vercel/project.json` to find:
   - `orgId` → `VERCEL_ORG_ID`
   - `projectId` → `VERCEL_PROJECT_ID`
7. Add both to GitHub secrets
8. **Do not commit** the `.vercel` folder to your repository

---

### Railway Deployment

| Secret Name | Where to Get |
|-------------|-------------|
| `RAILWAY_TOKEN` | https://railway.app/account/tokens |

**Steps:**
1. Go to https://railway.app/account/tokens
2. Click **Create Token**
3. Give it a name (e.g., "GitHub Actions")
4. Copy the token and add it as `RAILWAY_TOKEN` in GitHub secrets

---

## Verification

After adding all secrets, verify they're configured correctly:

1. Go to your repository's **Actions** tab
2. Trigger a workflow run by pushing to `main` branch
3. Check the workflow logs for any missing secrets errors
4. If any secrets are missing or incorrect, update them in repository settings

## Security Best Practices

- ✅ **Never** commit secrets to your repository
- ✅ **Never** share secrets in pull request comments or issues
- ✅ Rotate secrets regularly (every 90 days recommended)
- ✅ Use different secrets for development and production
- ✅ Limit secret access to necessary team members only
- ✅ Monitor secret usage in GitHub Actions logs

---

## Troubleshooting

### Workflow fails with "Secret not found"
- Verify the secret name matches exactly (case-sensitive)
- Check that the secret is set in the correct repository
- Ensure the secret has a value (not empty)

### Firebase authentication fails
- Verify `FIREBASE_PRIVATE_KEY` includes proper newlines (`\n`)
- Check that the service account has necessary permissions
- Ensure the Firebase project ID matches across all secrets

### Deployment fails
- Verify deployment tokens are valid and not expired
- Check that organization/project IDs are correct
- Ensure the deployment service (Vercel/Railway) has the project configured

---

For more help, see the [main README](../README.md) or open an issue.
