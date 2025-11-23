# TECHNICAL ARCHITECTURE

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    JEEVANKOSH PLATFORM                      │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐        ┌──────────────┐   ┌────────────┐ │
│  │   Frontend   │        │   Backend    │   │  MongoDB   │ │
│  │  (React)     │◄──────►│  (Node/Expr) │◄──┤  Database  │ │
│  │  Bootstrap   │        │              │   └────────────┘ │
│  │  Web Speech  │        │  Mongoose    │                   │
│  │              │        │              │   ┌────────────┐ │
│  └──────────────┘        └──────────────┘   │   Gemini   │ │
│         │                       │            │    API     │ │
│         │                       └───────────►└────────────┘ │
│         │                                                     │
│    User Input               Server Logic      AI Processing  │
│    • Text                   • Auth            • Language     │
│    • Voice                  • Routing         • Category     │
│    • Tap                    • Validation      • Response     │
│                             • Logging         • Fallback     │
│                             • Alerts                         │
└─────────────────────────────────────────────────────────────┘
```

## Request Flow

### 1. Authentication Flow
```
User Input (Phone)
    ↓
POST /auth/request-otp
    ↓
Validate phone format
    ↓
Generate mock OTP (6 digits)
    ↓
Store in memory (5 min expiry)
    ↓
Return OTP to frontend
    ↓
User enters OTP
    ↓
POST /auth/verify-otp
    ↓
Validate OTP matches
    ↓
Create/Update User in MongoDB
    ↓
Return JWT token + user data
    ↓
Frontend stores in localStorage
    ↓
Redirect to /home
```

### 2. AI Query Flow
```
User types/speaks query
    ↓
Text input captured
    ↓
POST /ai/query {userId, text, location}
    ↓
Backend receives request
    ↓
Detect language (script analysis)
    ↓
Create Gemini prompt with master template
    ↓
Call Gemini 1.5 Flash API
    ↓
Parse JSON response
    ↓
Validate response structure
    ↓
Save QueryLog to MongoDB
    ↓
Check community alert trigger
    ↓
Return response to frontend
    ↓
Frontend displays with formatting
    ↓
Text-to-speech plays audio
```

### 3. Community Alert Flow
```
Every query logged in QueryLog collection
    ↓
Count similar queries:
  - Same location
  - Same category
  - Within last 2 hours
    ↓
Count >= 5?
    ↓
YES: Check if alert already exists
    ↓
Create new Alert document
    ↓
Assign severity (health=high, other=medium)
    ↓
Store alert metadata
    ↓
Frontend polls /alerts endpoint
    ↓
Display alerts with timestamps
```

## Data Flow

### Input Validation
```
Phone → 10 digits regex
OTP → 6 digits, matches stored OTP
Query → Non-empty string
Location → From predefined list
Age → Integer 1-150
Gender → Male/Female/Other
```

### Processing
```
1. Language Detection
   - Check Unicode ranges
   - Match against script blocks
   - Fallback to English

2. Category Classification
   - Send to Gemini with prompt
   - Parse JSON response
   - Validate category value
   - Fallback to 'general'

3. Response Generation
   - Use master prompt with query
   - Gemini generates response
   - Ensure same language as input
   - Extract JSON structure
   - Handle malformed JSON

4. Emergency Routing
   - Check category
   - Get location
   - Lookup emergency contacts
   - Format as tel: link
```

### Output Formatting
```
Response JSON:
{
  category: string (health|education|climate|safety|general),
  language: string (detected language code),
  answer: string (response in same language),
  severity: string (low|medium|high|null),
  suggestions: string[],
  emergencyContact: string (tel: link or empty)
}
```

## Component Architecture

### Frontend Components
```
App (Router)
├── Login (Step: phone → otp → register)
├── Home (Dashboard with feature cards)
├── Chat (Messages + Voice + TTS)
├── Info (Tips + Emergency contacts)
├── Alerts (Community alerts)
└── Navbar (Navigation + Logout)
```

### Backend Controllers
```
authController
├── requestOTP (Generate & store)
├── verifyOTPAndRegister (Validate & create user)
└── getUserProfile (Fetch user data)

aiController
├── processQuery (Main AI logic)
├── detectLanguage (Unicode script detection)
├── checkCommunityAlert (Alert trigger)
└── getEmergencyContact (Location-based)

alertController
├── getAlerts (All/filtered)
├── getAlertsByLocation (Location-specific)
└── clearOldAlerts (Cleanup 24h+ old)

infoController
├── getInfoContent (Return tips JSON)
└── getEmergencyContacts (Return contact JSON)
```

## Data Models

### User Collection
```
{
  _id: ObjectId,
  phone: String (unique),
  name: String,
  age: Number,
  gender: String,
  location: String,
  knownConditions: String[],
  createdAt: Date,
  updatedAt: Date
}
Index: phone (unique)
```

### QueryLog Collection
```
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  text: String,
  location: String,
  category: String,
  language: String,
  response: String,
  severity: String,
  timestamp: Date
}
Indexes:
  - location + category + timestamp (for alerts)
  - timestamp (for cleanup)
```

### Alert Collection
```
{
  _id: ObjectId,
  area: String,
  category: String,
  count: Number,
  detectedAt: Date,
  queries: [
    {
      userId: ObjectId,
      text: String,
      timestamp: Date
    }
  ],
  severity: String
}
Index: area + category + detectedAt
```

## Language Detection Algorithm

```javascript
const teluguRegex = /[\u0C00-\u0C7F]/g;  // Telugu Unicode range
const kannadaRegex = /[\u0C80-\u0CFF]/g; // Kannada Unicode range
const tamilRegex = /[\u0B80-\u0BFF]/g;   // Tamil Unicode range
const hindiRegex = /[\u0900-\u097F]/g;   // Hindi Unicode range

If text matches regex → language detected
Otherwise → English (default)
```

## Gemini API Integration

```javascript
1. Initialize client
   const genAI = new GoogleGenerativeAI(API_KEY)
   const model = genAI.getGenerativeModel({
     model: 'gemini-1.5-flash'
   })

2. Create prompt with template
   Replace <USER_TEXT> with actual query

3. Call API
   const result = await model.generateContent(prompt)

4. Extract response
   const text = result.response.text()

5. Parse JSON
   const json = JSON.parse(text)

6. Validate schema
   Check required fields exist

7. Return to frontend
```

## Voice Integration

### Input (Web Speech API)
```
1. Initialize SpeechRecognition
2. User clicks microphone
3. Browser requests permission
4. User speaks
5. speechRecognition fires onresult event
6. Extract transcript from event
7. Set as input text
8. Auto-submit or show for editing
```

### Output (Speech Synthesis)
```
1. Get response text
2. Detect language from response
3. Create SpeechSynthesisUtterance
4. Set language: response.lang
5. Call speechSynthesis.speak()
6. Browser plays audio
7. User can pause/stop in browser controls
```

## Security Architecture

### Input Sanitization
```
1. Trim whitespace
2. Validate format (phone, OTP, etc.)
3. Check against whitelist (locations, genders)
4. Limit string lengths
5. Reject special characters
```

### Authentication
```
Mock implementation:
- Phone → identify user
- OTP → verify session
- Token → stored locally
- Each API call includes userId

Production would use:
- JWT with expiry
- Refresh tokens
- Secure HTTP-only cookies
- Rate limiting
```

### Error Handling
```
1. Client errors (400)
   - Missing fields
   - Invalid format
   - Bad request

2. Authentication errors (401)
   - Invalid OTP
   - User not found
   - Expired token

3. Server errors (500)
   - DB connection
   - API failures
   - Parsing errors

4. Fallbacks
   - Return error message
   - Log to console
   - Don't expose internals
```

## Performance Considerations

### Frontend
- Lazy load pages with React Router
- Memoize expensive components
- Debounce text input
- Cache chat messages in state
- Local storage for persistence

### Backend
- Index database queries
- Connection pooling with MongoDB
- Gemini API rate limiting
- Cache emergency contacts in memory
- Alert queries use indexed fields

### Network
- Compress responses (gzip)
- Use HTTP/2
- Optimize API payload size
- WebSocket for real-time alerts (future)

## Deployment Architecture

### Local Development
```
Frontend (Vite) → localhost:3000
Backend (Express) → localhost:5000
MongoDB (Local) → localhost:27017
```

### Production (Cloud)
```
Frontend (Vercel/Netlify)
    ↓
Backend (Heroku/Railway)
    ↓
MongoDB Atlas
    ↓
Gemini API
```

## Testing Strategy

### Unit Tests
- Language detection
- Category classification
- Emergency contact lookup

### Integration Tests
- Login flow
- Chat flow
- Alert creation
- Alert retrieval

### E2E Tests
- Full user journey
- Login to logout
- Multiple queries
- Alert generation

## Monitoring & Logging

### Backend Logs
```
Request logging: timestamp, endpoint, method
Error logging: stack trace, request data
API call logging: Gemini API usage
Database logging: connection, queries
```

### Frontend Logs
```
Error tracking: Sentry integration
Performance: timing, API calls
User analytics: page visits, actions
```

---

This architecture is designed for scalability, maintainability, and quick deployment while serving users in multiple Indian languages with AI-powered responses.
