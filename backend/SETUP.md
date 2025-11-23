BACKEND SETUP GUIDE

## Prerequisites
- Node.js v14+
- MongoDB (local or cloud)
- Google Gemini API Key

## Quick Start

1. Install dependencies:
   npm install

2. Create .env file with:
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/jeevankosh
   GEMINI_API_KEY=your_key_here
   NODE_ENV=development

3. Start MongoDB:
   mongod

4. Run backend:
   npm start

Server will run on http://localhost:5000

## Available Routes

Auth:
- POST /auth/request-otp (body: {phone})
- POST /auth/verify-otp (body: {phone, otp, name, age, gender, location, knownConditions})
- GET /auth/profile/:userId

AI:
- POST /ai/query (body: {userId, text, location})

Alerts:
- GET /alerts (query: ?location=&category=)
- GET /alerts/location/:location
- POST /alerts/clear-old

Info:
- GET /info/content
- GET /info/emergency-contacts

Health Check:
- GET /health

## Environment Variables

PORT - Express server port (default 5000)
MONGO_URI - MongoDB connection string
GEMINI_API_KEY - Google Gemini API key (required)
NODE_ENV - development or production

## Database Collections

- users: User profiles
- querylogs: Query history (indexed by location, category, timestamp)
- alerts: Community alerts

Indexes are automatically created on startup.

## API Response Format

All responses return JSON:
- Success: {data: {...}}
- Error: {error: "message"}

## Gemini Integration

Uses gemini-1.5-flash model for:
- Language detection
- Query classification
- Response generation
- JSON parsing

Automatic fallback if response isn't valid JSON.

## Community Alert Logic

Triggered when:
- 5+ queries in same location
- Same category
- Within 2-hour window

Severity automatically set to 'high' for health alerts.

## Notes

- OTP sent to console (not real SMS)
- All queries logged for alert detection
- Alerts auto-expire after 24 hours
