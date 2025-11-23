# Jeevankosh - AI-Powered Multilingual Assistance Platform

A complete MERN stack application providing voice-first, multilingual AI assistance for health, education, climate, safety, and general queries.

## 🌍 Features

✅ **Phone Login** - Mock OTP verification with user profiling
✅ **AI Chatbot** - Text, voice input with Web Speech API
✅ **Voice Output** - Text-to-speech in detected language
✅ **Multilingual** - Auto-detects and responds in user's language
✅ **Query Routing** - Gemini-powered classification (health/education/climate/safety/general)
✅ **Community Alerts** - Auto-triggered when 5+ similar queries in location within 2 hours
✅ **Emergency Contacts** - One-tap calling for ambulance/police/hospital
✅ **Info Pages** - 50 curated tips across 5 categories
✅ **Bootstrap UI** - Mobile-friendly, clean interface

## 🛠️ Tech Stack

**Backend:**
- Node.js + Express
- MongoDB
- Google Gemini 1.5 Flash API
- Mongoose ORM

**Frontend:**
- React 18
- Vite
- Bootstrap 5
- Web Speech API
- Axios

## 📋 Prerequisites

- Node.js (v14+)
- MongoDB (local or cloud)
- Google Gemini API Key ([Get one here](https://makersuite.google.com/app/apikey))

## 🚀 Installation & Setup

### Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/jeevankosh
GEMINI_API_KEY=your_gemini_api_key_here
NODE_ENV=development
```

Start MongoDB (if local):
```bash
mongod
```

Start backend:
```bash
npm start
# or with nodemon for development
npm run dev
```

Backend runs on `http://localhost:5000`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`

## 📁 Project Structure

```
Jeevankosh/
├── backend/
│   ├── models/
│   │   ├── User.js          # User schema
│   │   ├── QueryLog.js      # Query logging
│   │   └── Alert.js         # Community alerts
│   ├── controllers/
│   │   ├── authController.js    # Login & OTP
│   │   ├── aiController.js      # Gemini integration
│   │   ├── alertController.js   # Alert management
│   │   └── infoController.js    # Tips & emergency contacts
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── aiRoutes.js
│   │   ├── alertRoutes.js
│   │   └── infoRoutes.js
│   ├── server.js            # Express app
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx      # Phone login with OTP
│   │   │   ├── Home.jsx       # Dashboard
│   │   │   ├── Chat.jsx       # AI chat with voice
│   │   │   ├── Info.jsx       # Tips & emergency contacts
│   │   │   └── Alerts.jsx     # Community alerts
│   │   ├── App.jsx            # Main router
│   │   └── main.jsx           # Entry point
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

## 🔑 API Endpoints

### Auth
- `POST /auth/request-otp` - Request OTP
- `POST /auth/verify-otp` - Verify OTP & register
- `GET /auth/profile/:userId` - Get user profile

### AI
- `POST /ai/query` - Send query to Gemini

### Alerts
- `GET /alerts` - Get alerts (with filters)
- `GET /alerts/location/:location` - Get alerts for location
- `POST /alerts/clear-old` - Clear alerts older than 24h

### Info
- `GET /info/content` - Get tips (health/climate/safety/education/general)
- `GET /info/emergency-contacts` - Get emergency numbers

## 🔬 How It Works

### 1. Login Flow
1. User enters 10-digit phone number
2. Mock OTP sent (displayed for testing)
3. User verifies OTP
4. User completes profile (name, age, gender, location, conditions)
5. User logged in with token stored locally

### 2. AI Chat Flow
1. User types or speaks query
2. Query sent to backend
3. Gemini API processes with master prompt
4. Language auto-detected
5. Category classified
6. Response generated in same language
7. Community alert checked (if 5+ similar queries)
8. Response read aloud with TTS
9. Chat displayed with metadata

### 3. Community Alert Trigger
- Queries logged with location, category, timestamp
- Check if 5+ queries in same location + category within 2 hours
- Alert created with severity level
- Frontend displays real-time alerts

## 🎤 Voice Features

**Input:**
- Click microphone button
- Speak your query
- Uses Web Speech API (Chrome/Edge/Safari)

**Output:**
- Responses automatically read aloud
- Browser speechSynthesis with language support
- Stop button in browser's speech controls

## 🌍 Supported Languages

Auto-detected by script:
- Telugu (te)
- Kannada (kn)
- Tamil (ta)
- Hindi (hi)
- English (en)

Responses always in same language as input.

## 💾 Data Models

### User
```javascript
{
  phone: String,           // 10-digit
  name: String,
  age: Number,
  gender: String,          // Male/Female/Other
  location: String,        // City name
  knownConditions: [String],
  createdAt: Date,
  updatedAt: Date
}
```

### QueryLog
```javascript
{
  userId: ObjectId,
  text: String,
  location: String,
  category: String,        // health/education/climate/safety/general
  language: String,
  response: String,
  severity: String,        // low/medium/high (health only)
  timestamp: Date
}
```

### Alert
```javascript
{
  area: String,
  category: String,
  count: Number,
  detectedAt: Date,
  queries: [{userId, text, timestamp}],
  severity: String         // low/medium/high
}
```

## 🧪 Testing

### Test Login
- Phone: `9876543210`
- OTP: Will be displayed (use same in form)
- Name: Test User
- Age: 25
- Gender: Male
- Location: Hyderabad
- Conditions: (leave empty or add some)

### Test Queries
- Health: "मुझे सिरदर्द है" (Hindi)
- Education: "నాకు గణితం చెప్పండి" (Telugu)
- Safety: "திருடர் வந்து விட్టால் என்ன செய்ய வேண்டும்" (Tamil)
- Climate: "ಬೇಸಿಗೆಯಲ್ಲಿ ಯಾವುದು ಮಾಡಬೇಕು" (Kannada)

## 📊 Gemini AI Master Prompt

The system uses a carefully crafted prompt:
1. Detects query language
2. Classifies into 5 categories
3. Provides tailored responses
4. Returns JSON with metadata
5. Handles emergency routing

## 🚨 Emergency Contacts

Hardcoded for major Indian cities:
- Hyderabad, Bangalore, Chennai, Delhi, Mumbai, Pune, Kolkata
- Includes: Hospital, Police, Ambulance, Fire numbers
- Clickable `tel:` links for instant calling

## 🔒 Security Notes

⚠️ **Demo Features (Not Production-Ready):**
- OTP sent to console/frontend
- Token is UUID (use JWT in production)
- No rate limiting
- No input validation/sanitization
- MongoDB local connection

**For Production:**
- Use real Twilio/SMS service for OTP
- Implement JWT with refresh tokens
- Add rate limiting, CORS validation
- Use MongoDB Atlas with auth
- Add HTTPS, helmet, input validation
- Implement email verification
- Add user audit logging

## 📱 Mobile Responsiveness

- Bootstrap grid system
- Mobile-first CSS
- Touch-friendly buttons
- Responsive navbar
- Optimized chat layout

## 🐛 Troubleshooting

**"Cannot find module" errors:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**MongoDB connection failed:**
- Ensure MongoDB is running: `mongod`
- Check MONGO_URI in .env
- Use MongoDB Atlas cloud: `mongodb+srv://user:pass@cluster.mongodb.net/jeevankosh`

**Gemini API errors:**
- Verify API key is correct
- Check API quota/limits
- Ensure internet connection

**Voice input not working:**
- Use Chrome/Edge/Safari (not Firefox)
- Check microphone permissions
- Ensure HTTPS in production

**No alerts showing:**
- Need 5+ queries in same location within 2 hours
- Check MongoDB alerts collection

## 📖 API Usage Examples

### Request OTP
```bash
curl -X POST http://localhost:5000/auth/request-otp \
  -H "Content-Type: application/json" \
  -d '{"phone":"9876543210"}'
```

### Verify OTP
```bash
curl -X POST http://localhost:5000/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{
    "phone":"9876543210",
    "otp":"123456",
    "name":"John",
    "age":25,
    "gender":"Male",
    "location":"Hyderabad"
  }'
```

### Send Query
```bash
curl -X POST http://localhost:5000/ai/query \
  -H "Content-Type: application/json" \
  -d '{
    "userId":"507f1f77bcf86cd799439011",
    "text":"मुझे सिरदर्द है",
    "location":"Hyderabad"
  }'
```

## 🎯 Future Enhancements

- [ ] Real SMS OTP service
- [ ] Push notifications for alerts
- [ ] User dashboard analytics
- [ ] Multi-language UI
- [ ] Offline mode with service workers
- [ ] Doctor consultation booking
- [ ] Medicine reminder system
- [ ] Community forum
- [ ] Multilingual FAQ

## 📄 License

MIT

## 👨‍💻 Support

For issues, email support@jeevankosh.com or open an issue on GitHub.

---

**Made with ❤️ for Indian communities**
