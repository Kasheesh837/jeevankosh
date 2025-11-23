# ⚡ QUICK VERIFICATION GUIDE

Run these exact commands to verify everything works.

## 1️⃣ VERIFY BACKEND SETUP

### Check Dependencies
```bash
cd d:\Jeevankosh\backend
npm list express cors mongoose @google/generative-ai jsonwebtoken
```
✅ Should show all packages installed

### Check .env File
```bash
type .env
```
✅ Should show:
- PORT=5000
- GEMINI_API_KEY=AIzaSyCa_vdadwXUSbLd_Eo15YCMe0wXkNj0LfM (or your key)
- JWT_SECRET=jeevankosh_secret_key_2025
- MONGO_URI=mongodb://localhost:27017/jeevankosh

### Start MongoDB
```bash
mongod
```
✅ Should show: `waiting for connections on port 27017`

### Start Backend
```bash
npm start
```
✅ Should show:
```
✅ MongoDB connected
🚀 Server running on http://localhost:5000
```

---

## 2️⃣ TEST BACKEND ENDPOINTS

### Health Check
```bash
curl http://localhost:5000/health
```
✅ Response: `{"status":"ok","message":"Jeevankosh Backend Running"}`

### Test OTP Request
```bash
curl -X POST http://localhost:5000/auth/request-otp ^
  -H "Content-Type: application/json" ^
  -d "{\"phone\":\"9876543210\"}"
```
✅ Response includes `"otp":"123456"` (6-digit OTP)

### Test User Registration
```bash
curl -X POST http://localhost:5000/auth/verify-otp ^
  -H "Content-Type: application/json" ^
  -d "{\"phone\":\"9876543210\",\"otp\":\"123456\",\"name\":\"Test User\",\"age\":25,\"gender\":\"Male\",\"location\":\"Hyderabad\",\"knownConditions\":[]}"
```
✅ Response includes `"success":true` and `"token":"..."`

---

## 3️⃣ VERIFY FRONTEND SETUP

### Check Dependencies
```bash
cd d:\Jeevankosh\frontend
npm list react react-router-dom axios bootstrap
```
✅ Should show all packages installed

### Start Frontend
```bash
npm run dev
```
✅ Should show:
```
VITE v5.x.x ready in xxx ms
➜  Local:   http://localhost:5173/
➜  Press q to quit
```

---

## 4️⃣ TEST FRONTEND IN BROWSER

### Open Application
Go to: http://localhost:5173/

### Test Public Pages
- ✅ Click "Home" - Should see hero section and features
- ✅ Click "About" - Should see mission and features
- ✅ Click "Contact" - Should see contact info and FAQ
- ✅ Click "Sign Up" - Should show signup form
- ✅ Click "Login" - Should show login form

### Test Signup
1. Enter phone: `9876543210`
2. Click "Send OTP"
3. ✅ Should see OTP (e.g., "123456")
4. Enter OTP: Copy from display
5. Click "Verify OTP"
6. Fill registration form:
   - Name: Test User
   - Age: 25
   - Gender: Male
   - Location: Hyderabad
7. Click "Complete Signup"
8. ✅ Should redirect to Dashboard

### Test Dashboard
- ✅ See "Welcome, Test User!"
- ✅ See location: "Hyderabad"
- ✅ All 6 feature cards visible (Chat, Knowledge, Alerts, Emergency, Profile, History)
- ✅ 5 language badges shown

### Test Chat Feature
1. Click "Chat" in navbar or dashboard
2. Ask question: "में बुखार है" (Hindi: "I have fever")
3. Click "Send"
4. ✅ Should see:
   - Loading spinner (Thinking...)
   - AI response in Hindi
   - Category badge (e.g., "HEALTH")
   - Severity indicator
   - Suggestions
   - Emergency contact button (if health query)

### Test Voice (Optional)
1. In Chat page, click microphone icon
2. ✅ Should see "Listening..." message
3. Speak a question (English or Indian language)
4. ✅ Should recognize and send

### Test Knowledge Hub
1. Click "Knowledge" in navbar
2. ✅ Should see 50 tips in 5 categories
3. Try each category tab (Health, Education, Safety, Climate, General)
4. ✅ Tips should filter correctly

### Test Emergency Contacts
1. In Knowledge Hub page, scroll to "Emergency Directory"
2. ✅ Should see 7 cities
3. Try clicking different city tabs
4. ✅ Should show hospital, police, ambulance numbers
5. Click a number (e.g., ambulance)
6. ✅ Should open dialer (tel: link)

### Test Alerts
1. Click "Alerts" in navbar
2. ✅ Should show community alerts (may be empty initially)
3. After 5+ health queries, alerts should trigger automatically

### Test Profile
1. Click "Profile" in navbar
2. ✅ Should see all user information
3. ✅ Logout button should work
4. Click "Logout"
5. ✅ Should redirect to public home page

---

## 5️⃣ TEST WITH GEMINI (Optional - Requires API Key)

### Verify API Key Works
```bash
curl -X POST http://localhost:5000/ai/query ^
  -H "Content-Type: application/json" ^
  -d "{\"userId\":\"test123\",\"text\":\"હું બીમાર છું\",\"location\":\"Hyderabad\"}"
```
✅ Should return:
```json
{
  "category": "health",
  "language": "gu",
  "answer": "...",
  "severity": "low|medium|high",
  "suggestions": [...],
  "emergencyContact": ""
}
```

### Languages to Test
Try these phrases in different languages:
- 🇮🇳 Hindi: "मुझे सर्दी है" (I have cold)
- 🇹🇱 Telugu: "నాకు జ్వరం ఉంది" (I have fever)
- 🇰🇳 Kannada: "ನನಗೆ ಹೊಟ್ಟೆ ನೋವಾಗಿದೆ" (I have stomach ache)
- 🇹🇦 Tamil: "எனக்கு தலைவலி இருக்கிறது" (I have headache)
- 🇬🇧 English: "I have a cough"

---

## ✅ FINAL CHECKLIST

- [ ] MongoDB running
- [ ] Backend started successfully
- [ ] All health checks passing
- [ ] Frontend app loads
- [ ] Public pages working
- [ ] Signup/Login working
- [ ] Dashboard visible
- [ ] Chat responding (with AI or fallback)
- [ ] Knowledge hub showing tips
- [ ] Emergency contacts displaying
- [ ] Profile page working
- [ ] Logout works
- [ ] No console errors
- [ ] No network errors in DevTools

---

## 🚀 YOU'RE DONE!

If all checks pass, your Jeevankosh app is ready:
- ✅ Backend working on http://localhost:5000
- ✅ Frontend working on http://localhost:5173
- ✅ MongoDB connected
- ✅ Gemini API integrated
- ✅ All features functional

**Next Steps:**
1. Test with real queries in different languages
2. Create test alerts (5+ similar queries)
3. Explore all features
4. Deploy to production when ready

---

**Issues?** Check SETUP_GUIDE.md for troubleshooting
