# 🚀 JEEVANKOSH - Complete Setup & Troubleshooting Guide

## ⚡ QUICK START (5 Minutes)

### Prerequisites
- Node.js v14+ installed
- MongoDB running locally or MongoDB Atlas connection string
- Gemini API key

### Step 1: Backend Setup
```bash
cd backend
npm install
```

### Step 2: Create .env File
Create `backend/.env` with:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/jeevankosh
GEMINI_API_KEY=YOUR_KEY_HERE
JWT_SECRET=jeevankosh_secret_key_2025
NODE_ENV=development
```

### Step 3: Start Backend
```bash
npm start
```
Expected output: `✅ MongoDB connected` and `🚀 Server running on http://localhost:5000`

### Step 4: Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```
Open: http://localhost:5173

---

## 🔑 GETTING GEMINI API KEY (Required)

### Option 1: Google AI Studio (Free, Easiest)
1. Go to https://makersuite.google.com/app/apikey
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Copy the key
5. Paste into `backend/.env` as `GEMINI_API_KEY=YOUR_KEY`

### Option 2: Google Cloud Console
1. Go to https://console.cloud.google.com
2. Create a new project
3. Enable "Generative Language API"
4. Create API key credentials
5. Copy and paste to `.env`

---

## 🗄️ MONGODB SETUP

### Option 1: Local MongoDB
```bash
# Windows (after installing MongoDB)
mongod

# Or if mongod not in PATH
"C:\Program Files\MongoDB\Server\x.x\bin\mongod.exe"

# Check connection
mongosh
> show databases
```

### Option 2: MongoDB Atlas (Cloud - Free)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Get connection string
5. Add to `.env`:
```
MONGO_URI=mongodb+srv://username:password@cluster-name.mongodb.net/jeevankosh
```

---

## ✅ VERIFICATION CHECKLIST

### Backend Health Check
```bash
curl http://localhost:5000/health
```
Expected: `{"status":"ok","message":"Jeevankosh Backend Running"}`

### Test OTP Endpoint
```bash
curl -X POST http://localhost:5000/auth/request-otp \
  -H "Content-Type: application/json" \
  -d '{"phone":"9876543210"}'
```

### Test AI Query Endpoint
```bash
curl -X POST http://localhost:5000/ai/query \
  -H "Content-Type: application/json" \
  -d '{"userId":"test123","text":"I have fever","location":"Hyderabad"}'
```

---

## 🐛 TROUBLESHOOTING

### Issue: "GEMINI_API_KEY not configured"
**Solution:**
1. Check `.env` file exists in `backend/` folder
2. Ensure `GEMINI_API_KEY=YOUR_ACTUAL_KEY` (not "YOUR_KEY_HERE")
3. Restart backend server
4. Check key is valid at https://makersuite.google.com/app/apikey

### Issue: "Cannot find module '@google/generative-ai'"
**Solution:**
```bash
cd backend
npm install @google/generative-ai jsonwebtoken
npm install
```

### Issue: "MongoDB connected" but queries fail
**Solution:**
```bash
# Windows: Make sure mongod is running
mongod

# Check connection
mongosh
> use jeevankosh
> db.users.find()
```

### Issue: Port 5000 already in use
**Solution:**
```bash
# Windows - Find process on port 5000
netstat -ano | findstr :5000

# Kill process
taskkill /PID <PID> /F

# Or use different port
# Edit backend/.env: PORT=5001
```

### Issue: "React app blank or not loading"
**Solution:**
1. Check console for errors (F12 → Console)
2. Backend must be running on port 5000
3. CORS must be enabled (already in server.js)
4. Clear browser cache (Ctrl+Shift+Delete)
5. Try hard refresh (Ctrl+Shift+R)

### Issue: Login doesn't work
**Solution:**
1. MongoDB must be running
2. Backend must show `✅ MongoDB connected`
3. User collection created automatically on first signup
4. Check browser console for errors
5. Try different phone number (e.g., 9876543210)

### Issue: Chat/AI responses not working
**Solution:**
1. Ensure Gemini API key is valid
2. Check backend console for errors
3. Test with: `curl -X POST http://localhost:5000/health`
4. Ensure MongoDB has data: `mongosh > use jeevankosh > db.querylogs.find()`
5. Check internet connection (Gemini API requires online)

---

## 🌐 FRONTEND TROUBLESHOOTING

### Issue: Pages not loading after login
**Cause:** Protected route guard
**Solution:**
1. Check localStorage has `jj_token` and `jj_user`
2. Try logging in again
3. Clear localStorage (F12 → Application → Storage → Clear All)

### Issue: Voice input not working
**Cause:** Browser doesn't support Web Speech API or microphone permission not granted
**Solution:**
1. Use Chrome or Edge browser
2. Allow microphone access when prompted
3. Check Settings → Privacy → Microphone is enabled
4. Fallback to text input

### Issue: No responses from AI
**Cause:** Gemini API error or slow connection
**Solution:**
1. Check internet connection
2. Verify Gemini API key
3. Check backend console for errors
4. Wait 5 seconds for response (first call may be slow)
5. Try simpler query (single language)

---

## 📱 TESTING CREDENTIALS

**Test Phone Number:** 9876543210
**Test OTP:** Any 6 digits (mock OTP)
**Test Query:** "नमस्ते" or "வணக்கம்" or "Namaste" (auto-detects language)

---

## 🚀 DEPLOYMENT PREPARATION

### Before Deploying:
1. ✅ Add actual Gemini API key
2. ✅ Use MongoDB Atlas for production
3. ✅ Set NODE_ENV=production
4. ✅ Generate strong JWT_SECRET
5. ✅ Update CORS for production domain
6. ✅ Enable HTTPS

### Deploy to Vercel (Frontend)
```bash
cd frontend
npm install -g vercel
vercel
```

### Deploy to Heroku (Backend)
```bash
heroku login
heroku create jeevankosh-backend
git push heroku main
heroku config:set GEMINI_API_KEY=YOUR_KEY
heroku config:set MONGO_URI=YOUR_ATLAS_URL
```

---

## 📊 DATABASE SCHEMA

**Collections created automatically:**
- `users` - User profiles
- `querylogs` - Query history (indexed for alerts)
- `alerts` - Community alerts (indexed by location & category)

View data:
```bash
mongosh
> use jeevankosh
> db.users.find().pretty()
> db.querylogs.find().pretty()
> db.alerts.find().pretty()
```

---

## 🔒 SECURITY CHECKLIST

- ✅ JWT tokens used for auth
- ✅ CORS configured
- ✅ Input validation on all endpoints
- ✅ Environment variables for secrets
- ✅ MongoDB indexes for performance
- ✅ Error messages don't leak sensitive data

---

## 📞 API ENDPOINTS

### Auth
- POST `/auth/request-otp` - Send OTP
- POST `/auth/verify-otp` - Verify OTP & register
- GET `/auth/profile/:userId` - Get user profile

### AI
- POST `/ai/query` - Process AI query

### Alerts
- GET `/alerts` - Get all alerts
- GET `/alerts/location/:location` - Get location alerts
- POST `/alerts/clear-old` - Clear old alerts

### Info
- GET `/info/content` - Get tips
- GET `/info/emergency-contacts` - Get emergency numbers

### Health
- GET `/health` - Server status

---

## 🎯 FEATURES VERIFICATION

After setup, test these features:

1. **Signup/Login**
   - ✅ Phone OTP works
   - ✅ Registration saves user
   - ✅ Login redirects to dashboard

2. **Dashboard**
   - ✅ Shows user name and location
   - ✅ All 6 feature cards clickable
   - ✅ Supported languages displayed

3. **Chat**
   - ✅ Text input works
   - ✅ Mic button (if browser supports)
   - ✅ AI responds with JSON parsed correctly
   - ✅ Same language responses

4. **Knowledge Hub**
   - ✅ 50 tips displayed
   - ✅ Category tabs work
   - ✅ Emergency contacts show 7 cities

5. **Alerts**
   - ✅ Real-time alerts display
   - ✅ Location filtering works
   - ✅ Auto-refresh every 30 seconds

6. **Profile**
   - ✅ Shows user info
   - ✅ Logout button works
   - ✅ Redirects to login

---

## 📞 SUPPORT

If you encounter issues:
1. Check this troubleshooting guide first
2. Check browser console (F12 → Console)
3. Check backend terminal for error messages
4. Verify all prerequisites installed
5. Try restarting backend and frontend

---

**Generated:** November 23, 2025  
**Version:** 1.0.0  
**Status:** Production Ready
