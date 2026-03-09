# Firebase Authentication Setup Guide

## ✅ What's Been Done

Your frontend is now synced with your backend to use **Firebase Authentication**:

1. ✅ Installed Firebase SDK
2. ✅ Created Firebase configuration ([firebase.ts](src/lib/firebase.ts))
3. ✅ Updated login form to use Firebase Auth with Google provider
4. ✅ Configured to send Firebase ID tokens to backend
5. ✅ Backend is ready to verify Firebase tokens

## 🔧 Complete the Setup

### Step 1: Get Firebase Web App Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **`social-job-platform`**
3. Click the gear icon ⚙️ > **Project settings**
4. Scroll to **Your apps** section
5. If you don't have a web app yet:
   - Click **Add app** > Select **Web** (</> icon)
   - Register app with nickname: "Social Job Platform Web"
   - You don't need to set up Firebase Hosting
6. Copy the configuration values

### Step 2: Update Environment Variables

Update your `.env.local` file with the values from Firebase Console:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIza... (from Firebase Console)
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=social-job-platform.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=social-job-platform
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=social-job-platform.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789... (from Firebase Console)
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:... (from Firebase Console)
```

### Step 3: Enable Google Sign-In in Firebase

1. In Firebase Console, go to **Authentication** > **Sign-in method**
2. Click **Google** provider
3. Click **Enable** toggle
4. Set a support email
5. Click **Save**

### Step 4: Test the Integration

```bash
cd social-job-platform-web
npm run dev
```

Visit `http://localhost:3000/login` and click "Tiếp tục với Google"

## 🔄 How It Works

```
User clicks Google Login
     ↓
Firebase Auth (signInWithPopup)
     ↓
Get Firebase ID Token
     ↓
Send to Backend (/api/auth/firebase)
     ↓
Backend verifies with Firebase Admin SDK
     ↓
Create/find user in database
     ↓
Return user data to frontend
```

## 🔍 Authentication Flow Details

**Frontend** ([login-form.tsx](src/components/auth/login-form.tsx)):

- Uses `signInWithPopup(auth, googleProvider)` from Firebase
- Gets Firebase ID token with `user.getIdToken()`
- Sends token to backend via `/api/auth/firebase`

**Backend** (AuthController.java):

- Receives `idToken` in request body
- Verifies token using Firebase Admin SDK
- Extracts user info (email, name, avatar)
- Creates/updates user in database
- Returns user data

## 📝 Notes

- Firebase ID tokens are valid for 1 hour
- Backend uses the same Firebase project (social-job-platform)
- Service account is already configured in backend
- This supports Google, Facebook, and any Firebase auth provider
