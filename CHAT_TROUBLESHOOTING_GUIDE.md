# 🔧 Chat & AI Troubleshooting Guide

## Overview
This guide helps diagnose and fix issues with the Chat feature in Jeevankosh when AI responses are not working or showing errors.

---

## Quick Diagnosis

### Check 1: Is Backend Running?
```bash
# Test if backend API is responding
curl http://localhost:5000/health 2>/dev/null || echo "Backend not responding"

# Check if AI endpoint is accessible
curl -X POST http://localhost:5000/ai/query \
  -H "Content-Type: application/json" \
  -d '{"userId":"test","text":"hello","location":"Hyderabad"}'
```

### Check 2: Is Frontend Running?
```bash
# Test frontend on port 5173 or 3001
curl http://localhost:5173 2>/dev/null | head -5 || echo "Frontend not accessible"
```

### Check 3: Browser Console Errors
1. Open DevTools: F12 or Ctrl+Shift+I
2. Go to **Console** tab
3. Look for red error messages
4. Check for network requests in **Network** tab

---

## Common Issues & Solutions

### Issue 1: "Cannot connect to backend"
**Symptoms:**
- Error message: "Cannot connect to backend"
- No response from API calls
- Network tab shows 0 bytes/failed requests

**Root Causes:**
1. Backend server not running
2. Backend listening on wrong port
3. CORS issues
4. Firewall blocking port 5000

**Solutions:**

```bash
# Step 1: Check if backend is running
netstat -ano | findstr :5000

# Step 2: If not running, start backend
cd d:\Jeevankosh\backend
node server.js

# Step 3: Verify it's responding
curl http://localhost:5000/
```

Expected output: `{"message":"Jeevankosh API Server"...}`

---

### Issue 2: "AI API Key Not Configured"
**Symptoms:**
- Error: "Gemini API key not configured"
- Backend returns 500 error
- No AI responses at all

**Root Cause:**
- `GEMINI_API_KEY` not set in backend/.env file
- API key is invalid or leaked

**Solutions:**

#### Step 1: Get a Fresh Gemini API Key
1. Go to: https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. Copy the generated key

#### Step 2: Add to .env File
```bash
# File: d:\Jeevankosh\backend\.env
GEMINI_API_KEY=your_api_key_here
MONGODB_URI=mongodb://localhost:27017/jeevankosh
PORT=5000
```

#### Step 3: Restart Backend
```bash
# Kill existing process
netstat -ano | findstr :5000  # Get PID
taskkill /PID <PID> /F

# Start new instance with updated .env
cd d:\Jeevankosh\backend
node server.js
```

#### Step 4: Verify
```bash
curl -X POST http://localhost:5000/ai/query \
  -H "Content-Type: application/json" \
  -d '{"userId":"test","text":"fever","location":"Hyderabad"}'
```

---

### Issue 3: "Gemini API Key Reported as Leaked"
**Symptoms:**
- Error: "Your API key was reported as leaked"
- API key was exposed in git/github
- Status: 403 Forbidden

**Root Cause:**
- API key accidentally committed to version control
- API key exposed in logs
- API key shared in chat/communication

**Solutions:**

1. **Immediately regenerate the key:**
   - Go to: https://makersuite.google.com/app/apikey
   - Delete the leaked key
   - Create a new API key
   - Update `.env` file

2. **Prevent future exposure:**
   ```bash
   # Verify .env is ignored
   cat d:\Jeevankosh\backend\.gitignore
   # Should contain: .env
   ```

3. **Check if key was exposed:**
   - Search GitHub for your old key
   - Use: https://github.com/settings/tokens to check
   - Remove from git history if committed

---

### Issue 4: "Analyzing your query..." Never Ends
**Symptoms:**
- Loading spinner appears but never finishes
- Message says "Analyzing your query..."
- No response after 30+ seconds

**Root Causes:**
1. Gemini API is slow/timing out
2. Network connection dropped
3. Backend crashed
4. Database connection issue

**Solutions:**

```bash
# Check backend is still running
netstat -ano | findstr :5000

# Check MongoDB is running
mongo --version

# Check network connectivity
ping makersuite.google.com

# Restart backend
cd d:\Jeevankosh\backend
node server.js
```

---

### Issue 5: Empty Emergency Contact Numbers
**Symptoms:**
- Emergency contacts section shows no data
- Alert: "No emergency contacts loaded yet"
- Contact buttons appear empty

**Root Causes:**
1. Emergency contacts API not returning data
2. Location not set on user profile
3. Frontend not properly parsing response

**Solutions:**

```bash
# Test the endpoint
curl http://localhost:5000/info/emergency-contacts

# Expected output should show contacts like:
# {"success":true,"emergencyContacts":{"Hyderabad":{...},"Mumbai":{...}}}

# If empty, check:
# 1. infoController.js has the contact data
# 2. Routes are properly configured
# 3. User location is set
```

---

### Issue 6: Chat Works but Says "I'm having trouble"
**Symptoms:**
- Chat responds but with fallback message
- Says: "I'm having trouble connecting to the AI service"
- But some basic responses work

**Root Cause:**
- Gemini API temporarily down
- API rate limit exceeded
- Network timeout
- Fallback mode activated

**Workaround:**
- Wait 1-2 minutes
- Try again
- Contact Gemini support if persistent
- System will use fallback responses for common queries

---

## Fallback System

When Gemini API is unavailable, the system uses intelligent fallback responses for common queries:

### Supported Fallback Queries:
- **Fever** - "Fever is usually a sign of infection..."
- **Cold** - "Common cold is viral..."
- **Cough** - "Cough can be dry or productive..."
- **Headache** - "Headache can be tension..."
- **Pain** - "Pain relief: Take ibuprofen..."
- **Stomach** - "Stomach pain might be indigestion..."
- **Diarrhea** - "For diarrhea: Drink ORS..."
- **Vomiting** - "For vomiting: Rest..."
- **Allergies** - "For allergies: Take antihistamine..."
- **Emergency** - Directs to 108 immediately

### How to Verify Fallback Works:
```bash
# Make request with invalid API key
# Backend should still respond with fallback answer
curl -X POST http://localhost:5000/ai/query \
  -H "Content-Type: application/json" \
  -d '{"userId":"test","text":"I have a cough","location":"Hyderabad"}'

# Response should include helpful medical advice
```

---

## Database Issues

### MongoDB Not Connected
**Symptoms:**
- 500 errors when sending messages
- "Cannot save query to database"
- Previous chats not loading

**Solutions:**

```bash
# Check MongoDB is running
netstat -ano | findstr :27017

# If not running, start MongoDB
# Windows: Services > MongoDB Server > Start
# Or from terminal:
mongod --dbpath="C:\Program Files\MongoDB\Server\5.0\data"

# Verify connection
mongo mongodb://localhost:27017/jeevankosh
```

---

## Performance & Optimization

### If Chat is Slow:

1. **Check browser console for memory leaks:**
   - Open DevTools (F12)
   - Go to Performance tab
   - Record and look for memory spike

2. **Clear browser cache:**
   - Ctrl+Shift+Delete
   - Clear browsing data
   - Hard refresh: Ctrl+Shift+R

3. **Reduce message history:**
   - Old messages with lots of data slow down DOM
   - Limit displayed messages to last 50

4. **Optimize backend:**
   ```bash
   # Check for slow queries
   # In backend logs, look for:
   # 🔍 [AI] Step 1-10: should each complete in <100ms
   ```

---

## Testing Checklist

Before assuming chat is broken, test each component:

- [ ] Backend running: `curl http://localhost:5000/`
- [ ] Frontend accessible: `curl http://localhost:5173/`
- [ ] Gemini API key configured: Check `.env`
- [ ] MongoDB running: `netstat -ano | findstr :27017`
- [ ] User location set: Check user profile
- [ ] Network connectivity: `ping google.com`
- [ ] No browser errors: Check DevTools console
- [ ] Test with simple query: "fever"
- [ ] Check database: Open Mongo shell, run `db.querylogs.findOne()`

---

## Emergency Debug Commands

```bash
# Get backend status
cd d:\Jeevankosh\backend
node -e "console.log('Node.js:', process.version)"

# Check all ports in use
netstat -ano

# Test each component individually
# 1. Test backend
curl -X POST http://localhost:5000/ai/query \
  -H "Content-Type: application/json" \
  -d '{"userId":"test","text":"hello","location":"Hyderabad"}'

# 2. Test emergency contacts
curl http://localhost:5000/info/emergency-contacts

# 3. Test alert endpoint
curl http://localhost:5000/alerts

# Kill and restart backend if stuck
taskkill /IM node.exe /F
cd d:\Jeevankosh\backend && node server.js
```

---

## When to Seek Help

If you've tried all solutions and chat still doesn't work:

1. **Collect debug information:**
   - Backend console logs
   - Browser DevTools console errors
   - Network tab requests/responses
   - Error messages (copy exact text)

2. **Check:**
   - Is Gemini API working? (test on makersuite.google.com)
   - Is MongoDB running?
   - Are ports 5000, 5173 free?

3. **Try clean restart:**
   ```bash
   # Kill all node processes
   taskkill /IM node.exe /F
   
   # Clear MongoDB (optional)
   # mongo mongodb://localhost:27017/jeevankosh --eval "db.querylogs.deleteMany({})"
   
   # Start fresh
   cd d:\Jeevankosh\backend && npm install && node server.js
   # In another terminal:
   cd d:\Jeevankosh\frontend && npm run dev
   ```

---

## Expected Behavior

### Working Chat Should:
✅ Accept text or voice input
✅ Show "Analyzing..." while processing  
✅ Return response within 2-5 seconds
✅ Display category badge (health/emergency/medication)
✅ Show suggestions when applicable
✅ Read response aloud
✅ Show emergency contact button for health queries

### Chat Queries to Test:
```
"I have fever"
"What about cold?"
"Emergency contact"
"Heart attack symptoms"
"Medicine dosage"
"Stomach pain"
```

---

## Quick Reference

| Issue | Status Code | Solution |
|-------|------------|----------|
| Backend down | No connection | Start backend on port 5000 |
| No API key | 500 error | Add GEMINI_API_KEY to .env |
| API leaked | 403 Forbidden | Get new API key from Gemini |
| DB error | 500 error | Start MongoDB on port 27017 |
| CORS error | 0 bytes | Check backend CORS settings |
| Timeout | Request hangs | Wait or increase timeout |

---

## Logs Location
- Backend: `d:\Jeevankosh\backend\server.js` (console output)
- Frontend: Browser DevTools Console (F12)
- Database: MongoDB log file

