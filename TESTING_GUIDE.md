# 🧪 JEEVANKOSH - COMPLETE TESTING GUIDE

## ✅ PRE-TESTING CHECKLIST

Before testing, ensure:
- [ ] MongoDB is running (`mongod` command)
- [ ] GEMINI_API_KEY is added to `backend/.env`
- [ ] All npm packages installed (`npm install` in both backend and frontend)
- [ ] No port conflicts (5000 for backend, 5173 for frontend)

---

## 🚀 STEP 1: START BACKEND

### Terminal 1 - Start Backend
```bash
cd d:\Jeevankosh\backend
npm start
```

### Expected Output:
```
============================================================
🏥 JEEVANKOSH BACKEND STARTUP
============================================================
📍 Environment: development
🔌 Port: 5000
📊 MongoDB: localhost:27017/jeevankosh
🔑 Gemini API Key: ✓ Configured
============================================================

✅ MongoDB connected successfully
📦 Database: Local MongoDB

📍 Registering routes...
  ✓ Auth routes: /auth
  ✓ AI routes: /ai
  ✓ Alerts routes: /alerts
  ✓ Info routes: /info
  ✓ Health check: /health

🚀 Server is running!
📌 Backend: http://localhost:5000
📌 Frontend: http://localhost:5173 or http://localhost:3000

✅ Jeevankosh Backend Ready for Connections
```

**If you see errors**, check:
- MongoDB running? `mongod`
- Port 5000 free? Change `PORT=5001` in .env
- Gemini API key present? Check `.env` file

---

## 🚀 STEP 2: START FRONTEND

### Terminal 2 - Start Frontend
```bash
cd d:\Jeevankosh\frontend
npm run dev
```

### Expected Output:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  press q to quit
```

Go to: **http://localhost:5173**

---

## 📋 TEST 1: PUBLIC PAGES (No Login Required)

### Test Home Page
1. Open http://localhost:5173/
2. ✅ Should see:
   - Hero section with "🏥 Jeevankosh"
   - Features cards (6 features)
   - "Sign Up / Login" buttons
   - PublicNavbar with Home, About, Contact, Login, Sign Up

### Watch Backend Terminal:
```
📨 14:30:45 [GET] /
```

### Test About Page
1. Click "About" in navbar
2. ✅ Should see mission, vision, features

### Test Contact Page
1. Click "Contact" in navbar
2. ✅ Should see contact info, FAQ accordion

---

## 📋 TEST 2: AUTHENTICATION FLOW

### Test 1: OTP Request
1. Click "Sign Up" button
2. Enter phone: **9876543210**
3. Click "Send OTP"

**Watch Backend Terminal:**
```
📨 14:30:50 [POST] /auth/request-otp
✅ [AUTH] OTP generated for 9876543210: 123456 (expires in 5 min)
```

### Test 2: OTP Verification
1. Copy OTP shown on screen
2. Enter OTP (e.g., 123456)
3. Click "Verify OTP"

**Watch Backend Terminal:**
```
📨 14:31:00 [POST] /auth/verify-otp
🔍 [AUTH] Verify OTP - Phone: 9876543210, OTP: 123456, Name: Test User, Location: Hyderabad
```

### Test 3: User Registration
1. Fill registration form:
   - Name: **Test User**
   - Age: **25**
   - Gender: **Male**
   - Location: **Hyderabad**
   - Known Conditions: **Diabetes** (optional)
2. Click "Complete Signup"

**Watch Backend Terminal:**
```
📨 14:31:05 [POST] /auth/verify-otp
✅ [AUTH] Creating new user: 9876543210
✅ [AUTH] User saved successfully - ID: 507f1f77bcf86cd799439011
✅ [AUTH] OTP cleared for 9876543210
✅ [AUTH] New user registered: 9876543210 (ID: 507f1f77bcf86cd799439011)
```

**Frontend:**
- ✅ Redirect to Dashboard
- ✅ Show "Welcome, Test User!"
- ✅ Show "Location: Hyderabad"

---

## 📋 TEST 3: DASHBOARD

### Dashboard Features
1. ✅ Should see user greeting: "Welcome, Test User!"
2. ✅ Should show location: "Location: Hyderabad"
3. ✅ Should show 6 feature cards:
   - 💬 AI Chat
   - 📚 Knowledge Hub
   - 🚨 Alerts
   - 📱 Emergency
   - 👤 Profile
   - 📊 History
4. ✅ Should show 5 supported languages
5. ✅ Navbar shows: Dashboard, Chat, Knowledge, Alerts, Profile, Logout

**Watch Backend Terminal:**
```
📨 14:31:10 [GET] /auth/profile/507f1f77bcf86cd799439011
✅ [AUTH] Profile fetched: 9876543210
```

---

## 📋 TEST 4: AI CHAT & GEMINI INTEGRATION

### Test 1: Simple Text Query (English)
1. Click "Chat" in navbar or dashboard
2. Type: **"I have a fever"**
3. Click "Send"

**Watch Backend Terminal:**
```
📨 14:31:15 [POST] /ai/query
🔍 [AI] Processing query - User: 507f1f77bcf86cd799439011, Location: Hyderabad, Query: "I have a fever"
✅ [AI] Detected language: en for query from user 507f1f77bcf86cd799439011
🔍 [AI] Calling Gemini API...
✅ [AI] Gemini response received (1234 chars)
🔍 [AI] Parsed response - Category: health, Language: en
✅ [AI] Query saved to DB - ID: 507f1f77bcf86cd799439012, Category: health
🔍 [ALERTS] Alert check: 1 "health" queries in Hyderabad (last 2 hours)
✅ [AI] Query processed successfully for user 507f1f77bcf86cd799439011
```

**Frontend Chat:**
- ✅ Show user message: "I have a fever"
- ✅ Show AI response (from Gemini)
- ✅ Show category badge: "HEALTH"
- ✅ Show language: "en"
- ✅ Show severity (if applicable)
- ✅ Show suggestions
- ✅ Show emergency button (if health query)

### Test 2: Hindi Query
1. Type: **"मुझे बुखार है"** (I have fever in Hindi)
2. Click "Send"

**Watch Backend Terminal:**
```
🔍 [AI] Detected language: hi for query from user...
✅ [AI] Gemini response received
✅ [AI] Query saved to DB - Category: health
```

**Frontend:**
- ✅ Response should be in Hindi
- ✅ Same formatting as English response

### Test 3: Voice Input (Optional)
1. Click microphone icon
2. ✅ Should see "🎙️ Listening..."
3. Speak question in English or Indian language
4. ✅ Should convert to text and send

---

## 📋 TEST 5: COMMUNITY ALERTS

### Trigger Alert (5+ Similar Queries)
1. Send 5 similar health queries from same location:
   - "I have cough"
   - "I have cold"
   - "I have fever"
   - "I have headache"
   - "I am sick"

**Watch Backend Terminal After 5th Query:**
```
⚠️  [ALERTS] Alert threshold reached: 5 "health" queries in Hyderabad
🚨 ALERT TRIGGERED: HIGH - health in Hyderabad (5 queries) - Alert ID: 507f1f77bcf86cd799439020
```

### Check Alerts Page
1. Click "Alerts" in navbar
2. ✅ Should see alert card with:
   - Location: "Hyderabad"
   - Category: "health"
   - Severity: "high"
   - Count: "5"

**Watch Backend Terminal:**
```
📨 14:31:45 [GET] /alerts
🔍 [ALERTS] Fetching alerts - Location: Hyderabad, Category: undefined
✅ [ALERTS] Fetched 1 alerts
```

---

## 📋 TEST 6: KNOWLEDGE HUB (Tips & Emergency Contacts)

### Test 1: Browse Tips
1. Click "Knowledge" in navbar
2. ✅ Should see 5 category tabs
3. ✅ Should see 10 tips per category
4. Try each tab:
   - 💊 Health Tips
   - 🌡️ Climate Tips
   - ⚠️ Safety Tips
   - ✏️ Education Tips
   - ⭐ General Tips

**Watch Backend Terminal:**
```
📨 14:32:00 [GET] /info/content
🔍 [INFO] Fetching info content...
✅ [INFO] Info content fetched (5 categories, 50 tips)
```

### Test 2: Emergency Contacts
1. In Knowledge page, scroll to "Emergency Contacts"
2. ✅ Should see 7 cities (tabs or cards)
3. Try clicking different cities:
   - Hyderabad
   - Bangalore
   - Chennai
   - Delhi
   - Mumbai
   - Pune
   - Kolkata
4. ✅ Should see 4 emergency numbers for each:
   - 🚑 Ambulance
   - 🚔 Police
   - 🏥 Hospital
   - 🔥 Fire

**Watch Backend Terminal:**
```
📨 14:32:10 [GET] /info/emergency-contacts
🔍 [INFO] Fetching emergency contacts...
✅ [INFO] Emergency contacts fetched (7 cities)
```

### Test 3: One-Tap Calling
1. Click any emergency number button
2. ✅ Should open phone dialer (if on mobile) or copy number

---

## 📋 TEST 7: PROFILE & LOGOUT

### Test 1: View Profile
1. Click "Profile" in navbar
2. ✅ Should show all user information:
   - Name
   - Phone
   - Age
   - Gender
   - Location
   - Known Conditions
   - Member Since date

**Watch Backend Terminal:**
```
📨 14:32:20 [GET] /auth/profile/507f1f77bcf86cd799439011
✅ [AUTH] Profile fetched: 9876543210 (ID: 507f1f77bcf86cd799439011)
```

### Test 2: Logout
1. Click "Logout" button
2. ✅ Should clear localStorage
3. ✅ Should redirect to public home page
4. ✅ Navbar should change to PublicNavbar

**Watch Backend Terminal:**
```
No specific log for logout (client-side only)
```

### Test 3: Re-Login
1. Click "Login" button
2. Enter same phone: **9876543210**
3. Click "Send OTP"
4. Enter OTP
5. Enter details (name pre-filled if updating)
6. Click "Complete Login"

**Watch Backend Terminal:**
```
✅ [AUTH] OTP generated for 9876543210: 654321
🔍 [AUTH] Verify OTP - Phone: 9876543210, OTP: 654321
✅ [AUTH] Updating existing user: 9876543210
✅ [AUTH] User saved successfully - ID: 507f1f77bcf86cd799439011
✅ [AUTH] User logged in: 9876543210 (ID: 507f1f77bcf86cd799439011)
```

---

## 📋 TEST 8: MULTILINGUAL SUPPORT

Test queries in all 5 supported languages:

### Telugu (తెలుగు)
Query: **"నాకు జ్వరం ఉంది"** (I have fever)
- ✅ Backend should detect: `hi`
- ✅ Gemini should respond in Telugu

### Kannada (ಕನ್ನಡ)
Query: **"ನನಗೆ ಹೊಟ್ಟೆ ನೋವಾಗಿದೆ"** (I have stomach ache)
- ✅ Backend should detect: `kn`
- ✅ Response in Kannada

### Tamil (தமிழ்)
Query: **"எனக்கு தலைவலி"** (I have headache)
- ✅ Backend should detect: `ta`
- ✅ Response in Tamil

### Hindi (हिंदी)
Query: **"मुझे ठंड है"** (I have cold)
- ✅ Backend should detect: `hi`
- ✅ Response in Hindi

### English
Query: **"What is diabetes?"**
- ✅ Backend should detect: `en`
- ✅ Response in English

---

## 🔍 BACKEND TERMINAL MONITORING

While testing, monitor the backend terminal for:

### ✅ Good Signs:
```
✅ MongoDB connected
✅ [AUTH] OTP generated
✅ [AUTH] User saved successfully
✅ [AI] Gemini response received
✅ [AI] Query saved to DB
✅ [ALERTS] Alert threshold reached
🚨 ALERT TRIGGERED
```

### ❌ Error Signs:
```
❌ MongoDB error - Make sure mongod is running
❌ [AUTH] OTP request failed - Check phone format
❌ [AI] GEMINI_API_KEY not configured - Add to .env
❌ [AI] Gemini API error - Check API key validity
❌ [ALERTS] Error fetching alerts - Database issue
```

---

## 🧪 FULL END-TO-END TEST FLOW

1. ✅ Visit http://localhost:5173 (Public Home)
2. ✅ Sign Up with phone 9876543210
3. ✅ Go to Dashboard
4. ✅ Ask question in Chat (English + Hindi)
5. ✅ View responses from Gemini
6. ✅ Create 5 queries to trigger alert
7. ✅ Check Alerts page
8. ✅ Browse Knowledge Hub tips
9. ✅ View Emergency Contacts
10. ✅ Check Profile
11. ✅ Logout and re-login

**All 11 steps working = ✅ APPLICATION IS FULLY FUNCTIONAL**

---

## 📊 DATABASE VERIFICATION

To verify data is being saved correctly:

```bash
mongosh
> use jeevankosh
> db.users.find().pretty()           # Should show Test User
> db.querylogs.find().pretty()        # Should show 5+ health queries
> db.alerts.find().pretty()           # Should show 1 alert
```

---

## 🐛 TROUBLESHOOTING

### Issue: Blank Frontend
- Check browser console (F12 → Console)
- Backend must return `success: true` in responses
- Check CORS is enabled in backend

### Issue: Auth Fails
- MongoDB must be running
- Check OTP format (6 digits)
- Phone must be 10 digits

### Issue: AI Not Responding
- Check Gemini API key in .env
- Check internet connection
- Check backend logs for Gemini errors

### Issue: Alerts Not Triggering
- Need 5+ similar queries in 2-hour window
- All from same location
- All same category

---

## ✅ FINAL VERIFICATION

All tests passing? Your Jeevankosh app is ready! ✅

- Backend: Fully functional with logging
- Frontend: All pages working
- Database: Storing data correctly
- AI: Gemini integration working
- Alerts: Community detection working
- Multilingual: 5 languages supported
- Voice: Input/Output ready (browser-dependent)

🎉 **JEEVANKOSH IS PRODUCTION READY** 🎉
