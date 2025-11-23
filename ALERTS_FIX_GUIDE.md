# Alerts Page - 500 Error Fix

## Issues Fixed

### 1. **Backend Error Handling**
   - Added better error logging with stack traces
   - Added `.lean()` for efficient query execution
   - Added null/empty check for location parameter
   - Fixed response consistency

### 2. **Frontend Error Handling**
   - Added detailed console logging for debugging
   - Improved error messages
   - Added better fallback UI message

### 3. **Test Data Endpoint**
   - Created `POST /alerts/create-test` endpoint
   - Populates test alerts for development

---

## How to Test Alerts Page

### Step 1: Generate Test Alerts
Open your browser console or use curl to create test data:

```bash
# Using curl
curl -X POST http://localhost:5000/alerts/create-test

# Or from browser console
fetch('http://localhost:5000/alerts/create-test', { method: 'POST' })
  .then(r => r.json())
  .then(d => console.log(d))
```

### Step 2: Check Backend Logs
The console will show:
```
✅ [ALERTS] Creating test alerts for development...
✅ [ALERTS] Created 3 test alerts
```

### Step 3: Visit Alerts Page
1. Login to the app
2. Go to Dashboard
3. Click "Health Alerts" card (or navigate to `/alerts`)
4. You should see alerts for:
   - **Hyderabad**: Fever & Cough (HIGH severity)
   - **Bangalore**: Stomach Issues (MEDIUM severity)
   - **Chennai**: Heat-related issues (MEDIUM severity)

### Step 4: Test Features
- ✅ Click alert cards to expand/collapse
- ✅ See symptoms extracted automatically
- ✅ Filter by category using buttons
- ✅ See 24h new cases, total cases, deaths
- ✅ View affected regions per disease

---

## API Endpoints

### 1. Get All Alerts
```
GET /alerts?location=Hyderabad&category=health
Response: { success: true, alerts: [...], count: N }
```

### 2. Get Alerts by Location
```
GET /alerts/location/Hyderabad
Response: { success: true, alerts: [...], count: N, location: "Hyderabad" }
```

### 3. Create Test Alerts (Dev Only)
```
POST /alerts/create-test
Response: { success: true, message: "...", count: N, alerts: [...] }
```

### 4. Clear Old Alerts
```
POST /alerts/clear-old
Response: { success: true, message: "...", deletedCount: N }
```

---

## What Was Causing the 500 Error

### Root Causes:
1. **Empty location parameter**: When `location=""` was passed, query might fail in some MongoDB setups
2. **Null checks missing**: Response could have been undefined in some cases
3. **Silent failures**: Frontend wasn't logging errors for debugging
4. **No test data**: Database might have been empty

### Fixes Applied:
```javascript
// Before
if (location) query.area = location;  // Could pass empty string

// After
if (location && location.trim() !== '') {
  query.area = location;  // Only query if location has value
}

// Added .lean() for performance
const alerts = await Alert.find(query)
  .sort({ detectedAt: -1 })
  .limit(20)
  .lean();  // Returns plain JS objects, not Mongoose docs

// Better response
res.json({ 
  success: true, 
  alerts: alerts || [], 
  count: alerts?.length || 0 
});
```

---

## Testing with Mock Data (Frontend Only)

If you want to test the UI without backend data:

1. The frontend now handles empty alerts gracefully
2. Shows informative message: "No Active Alerts"
3. Explains how alerts are triggered
4. Users can still use symptom checker and other features

---

## Debugging Steps

### If Still Getting 500 Error:

1. **Check Backend Logs**
   ```
   Look for: ❌ [ALERTS] Error fetching alerts
   ```

2. **Check MongoDB Connection**
   ```bash
   # Make sure MongoDB is running
   mongod
   ```

3. **Check Browser Console**
   ```javascript
   // Should show
   🔍 Fetching alerts for location: Hyderabad
   ✅ Alerts API response: { success: true, alerts: [...] }
   ```

4. **Test Direct Endpoint**
   ```bash
   curl http://localhost:5000/alerts
   curl http://localhost:5000/alerts?location=Hyderabad
   ```

5. **Check Network Tab**
   - Open DevTools → Network tab
   - Click on Alerts page
   - Look for `/alerts` request
   - Check Response tab for error details

---

## Expected Behavior After Fix

✅ **With Test Data**
- Alerts display with symptoms, severity, trends
- Expandable query details
- Category filtering works
- Shows # of people affected

✅ **Without Test Data**
- Friendly message: "No Active Alerts"
- Explains when alerts appear
- No error messages
- Page loads cleanly

✅ **On Error**
- Detailed console logs show what went wrong
- User sees: No alerts (graceful degradation)
- Backend sends proper error details

---

## Quick Start

```bash
# 1. Start backend
cd backend
npm install
npm start

# 2. Generate test alerts (in another terminal)
curl -X POST http://localhost:5000/alerts/create-test

# 3. Start frontend
cd frontend
npm install
npm run dev

# 4. Login and visit Alerts page
# http://localhost:5173/alerts
```

---

## Files Changed

1. **backend/controllers/alertController.js**
   - Improved error handling in `getAlerts()`
   - Added `createTestAlerts()` function

2. **backend/routes/alertRoutes.js**
   - Added `POST /alerts/create-test` route

3. **frontend/src/pages/Alerts.jsx**
   - Enhanced `fetchAlerts()` with better logging
   - Improved empty state message
   - Better error handling

---

## Notes

- Test alerts auto-expire after 24 hours (configurable)
- Each alert tracks queries that triggered it
- Symptoms are extracted automatically from query text
- Severity is determined by count and category
- All data is from mock/test - for production, integrate real health APIs
