QUICK START GUIDE

🚀 Get Jeevankosh running in 5 minutes!

## STEP 1: Setup Backend

cd backend
npm install

Create .env file:
PORT=5000
MONGO_URI=mongodb://localhost:27017/jeevankosh
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
NODE_ENV=development

Start MongoDB (ensure mongod is running)

Start backend:
npm start

✅ Backend ready on http://localhost:5000

## STEP 2: Setup Frontend

Open new terminal:

cd frontend
npm install
npm run dev

✅ Frontend ready on http://localhost:3000

## STEP 3: Test the App

1. Go to http://localhost:3000
2. Login with test credentials:
   - Phone: 9876543210
   - OTP: (shown in alert - copy & paste)
   - Name: Test User
   - Age: 25
   - Gender: Male
   - Location: Hyderabad

3. Go to Chat page
4. Type or speak a query (e.g., "মাথা ব্যাথা করছে")
5. Get AI response in same language!

## API Testing

Test backend directly:

Request OTP:
curl -X POST http://localhost:5000/auth/request-otp \
  -H "Content-Type: application/json" \
  -d '{"phone":"9876543210"}'

Get Tips:
curl http://localhost:5000/info/content

Get Alerts:
curl http://localhost:5000/alerts

Get Emergency Contacts:
curl http://localhost:5000/info/emergency-contacts

## Troubleshooting

MongoDB error?
- Ensure mongod is running: mongod
- Or use MongoDB Atlas cloud database

API key error?
- Get free key from https://makersuite.google.com/app/apikey
- Add to .env GEMINI_API_KEY

Can't connect frontend to backend?
- Check CORS headers in server.js
- Verify http://localhost:5000 is accessible

Voice not working?
- Use Chrome/Edge/Safari (not Firefox)
- Allow microphone permission
- Test with English first

## Project Structure

Jeevankosh/
├── backend/
│   ├── models/ (User, QueryLog, Alert)
│   ├── controllers/ (auth, ai, alerts, info)
│   ├── routes/ (all API endpoints)
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/ (Login, Home, Chat, Info, Alerts)
│   │   ├── components/ (Navbar)
│   │   └── App.jsx
│   └── package.json
│
└── README.md (full documentation)

## Key Features

✅ Multilingual (Telugu, Kannada, Tamil, Hindi, English)
✅ Voice input & output
✅ AI powered by Google Gemini
✅ Community alerts
✅ Emergency contacts
✅ Bootstrap UI (mobile-friendly)
✅ Real-time chat

## For Production

1. Use MongoDB Atlas (cloud)
2. Deploy backend to Heroku/Railway/Render
3. Deploy frontend to Vercel/Netlify
4. Update API endpoint in frontend
5. Use HTTPS everywhere
6. Setup proper environment variables
7. Enable rate limiting
8. Add monitoring/logging

See DEPLOYMENT.md for detailed steps.

## Support

Issues? Check:
1. Backend logs (terminal)
2. Frontend console (browser DevTools)
3. MongoDB connection
4. API key validity
5. Network tabs for API calls

Happy coding! 🎉
