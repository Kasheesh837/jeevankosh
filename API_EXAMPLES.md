# 🔌 API EXAMPLES & TESTING

## Base URL
```
http://localhost:5000
```

---

## 1️⃣ AUTHENTICATION ENDPOINTS

### Request OTP
```bash
curl -X POST http://localhost:5000/auth/request-otp \
  -H "Content-Type: application/json" \
  -d '{"phone":"9876543210"}'
```

**Response:**
```json
{
  "message": "OTP sent (Mock)",
  "otp": "123456"
}
```

---

### Verify OTP & Register
```bash
curl -X POST http://localhost:5000/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "9876543210",
    "otp": "123456",
    "name": "Rajesh Kumar",
    "age": 28,
    "gender": "Male",
    "location": "Hyderabad",
    "knownConditions": ["Diabetes", "Asthma"]
  }'
```

**Response:**
```json
{
  "message": "Login successful",
  "userId": "507f1f77bcf86cd799439011",
  "token": "uuid-token-here",
  "user": {
    "name": "Rajesh Kumar",
    "phone": "9876543210",
    "location": "Hyderabad"
  }
}
```

---

### Get User Profile
```bash
curl -X GET http://localhost:5000/auth/profile/507f1f77bcf86cd799439011
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "phone": "9876543210",
  "name": "Rajesh Kumar",
  "age": 28,
  "gender": "Male",
  "location": "Hyderabad",
  "knownConditions": ["Diabetes", "Asthma"],
  "createdAt": "2025-11-23T10:00:00Z",
  "updatedAt": "2025-11-23T10:00:00Z"
}
```

---

## 2️⃣ AI QUERY ENDPOINT

### Send Query
```bash
curl -X POST http://localhost:5000/ai/query \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "507f1f77bcf86cd799439011",
    "text": "मुझे सिरदर्द है",
    "location": "Hyderabad"
  }'
```

**Response (Hindi Health Query):**
```json
{
  "category": "health",
  "language": "hi",
  "answer": "सिरदर्द के लिए आप निम्नलिखित कर सकते हैं:\n1. शांत जगह में बैठें\n2. आंखें बंद करें\n3. पानी पिएं\n4. अगर दर्द 2 घंटे से अधिक है तो डॉक्टर से मिलें",
  "severity": "medium",
  "suggestions": [
    "पर्याप्त पानी पिएं",
    "तनाव कम करें",
    "नियमित नींद लें"
  ],
  "emergencyContact": "tel:108"
}
```

---

## 3️⃣ ALERTS ENDPOINTS

### Get All Alerts
```bash
curl -X GET "http://localhost:5000/alerts"
```

**Response:**
```json
[
  {
    "_id": "507f191e810c19729de860ea",
    "area": "Hyderabad",
    "category": "health",
    "count": 6,
    "detectedAt": "2025-11-23T12:30:00Z",
    "severity": "high",
    "queries": [
      {
        "userId": "507f1f77bcf86cd799439011",
        "text": "मुझे सिरदर्द है",
        "timestamp": "2025-11-23T12:15:00Z"
      }
    ]
  }
]
```

---

### Get Alerts by Location
```bash
curl -X GET "http://localhost:5000/alerts/location/Hyderabad"
```

**Response:** (Same as above)

---

### Get Alerts with Filters
```bash
curl -X GET "http://localhost:5000/alerts?location=Hyderabad&category=health"
```

---

### Clear Old Alerts (24h+)
```bash
curl -X POST http://localhost:5000/alerts/clear-old
```

**Response:**
```json
{
  "message": "Old alerts cleared",
  "deletedCount": 3
}
```

---

## 4️⃣ INFO ENDPOINTS

### Get All Tips
```bash
curl -X GET http://localhost:5000/info/content
```

**Response:**
```json
{
  "health": [
    "Drink water regularly to stay hydrated.",
    "Wash hands before eating and after using toilet.",
    "Get 7-8 hours of sleep daily.",
    "Eat a balanced diet with fruits and vegetables.",
    "Exercise 30 minutes daily.",
    "Avoid smoking and alcohol.",
    "Use mosquito nets to prevent diseases.",
    "Keep your surroundings clean.",
    "Visit doctor for regular check-ups.",
    "Stay updated with vaccinations."
  ],
  "climate": [
    "Wear sunscreen to protect from UV rays.",
    "..."
  ],
  "safety": [...],
  "education": [...],
  "general": [...]
}
```

---

### Get Emergency Contacts
```bash
curl -X GET http://localhost:5000/info/emergency-contacts
```

**Response:**
```json
{
  "Hyderabad": {
    "hospital": "08866666666",
    "police": "100",
    "ambulance": "108",
    "fire": "101"
  },
  "Bangalore": {
    "hospital": "08066666666",
    "police": "100",
    "ambulance": "108",
    "fire": "101"
  },
  "Chennai": {...},
  "Delhi": {...},
  "Mumbai": {...},
  "Pune": {...},
  "Kolkata": {...}
}
```

---

## 5️⃣ HEALTH CHECK

### Check Server Status
```bash
curl -X GET http://localhost:5000/health
```

**Response:**
```json
{
  "status": "ok",
  "message": "Jeevankosh Backend Running"
}
```

---

## 🧪 COMPLETE REQUEST/RESPONSE FLOW

### Example: Full User Journey

#### Step 1: Request OTP
```bash
curl -X POST http://localhost:5000/auth/request-otp \
  -H "Content-Type: application/json" \
  -d '{"phone":"9876543210"}'
```

Get OTP: `654321`

#### Step 2: Verify & Register
```bash
curl -X POST http://localhost:5000/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{
    "phone":"9876543210",
    "otp":"654321",
    "name":"Priya",
    "age":25,
    "gender":"Female",
    "location":"Bangalore",
    "knownConditions":[]
  }'
```

Get: `userId = "abc123xyz"`, `token = "uuid-token"`

#### Step 3: Send Query (Telugu)
```bash
curl -X POST http://localhost:5000/ai/query \
  -H "Content-Type: application/json" \
  -d '{
    "userId":"abc123xyz",
    "text":"నాకు జ్వరం ఉంది",
    "location":"Bangalore"
  }'
```

Response in Telugu:
```json
{
  "category": "health",
  "language": "te",
  "answer": "జ్వరం కోసం:\n1. విశ్రాంతి తీసుకోండి\n2. ద్రవాలు సరిపోయేలా తీసుకోండి\n3. చల్లని నీటిలో తుడుపుకోండి\n4. 2 దిన్నులకు మించి ఉంటే డాక్టర్ కు సంప్రదించండి",
  "severity": "medium",
  "suggestions": ["నీరు తాగండి", "విశ్రాంతి"],
  "emergencyContact": "tel:108"
}
```

#### Step 4: Check Alerts
After 5+ similar queries in Bangalore within 2 hours:

```bash
curl -X GET "http://localhost:5000/alerts?location=Bangalore&category=health"
```

Alert will be triggered!

---

## 📊 MULTILINGUAL EXAMPLES

### Health Query - Tamil
```bash
curl -X POST http://localhost:5000/ai/query \
  -H "Content-Type: application/json" \
  -d '{
    "userId":"abc123xyz",
    "text":"என்னுடைய வயிறு வலிக்கிறது",
    "location":"Chennai"
  }'
```

### Education Query - Kannada
```bash
curl -X POST http://localhost:5000/ai/query \
  -H "Content-Type: application/json" \
  -d '{
    "userId":"abc123xyz",
    "text":"ಪೈಥಾಗೊರಸ್ ಪ್ರಮೇಯ ಎಂದರೇನು",
    "location":"Bangalore"
  }'
```

### Safety Query - English
```bash
curl -X POST http://localhost:5000/ai/query \
  -H "Content-Type: application/json" \
  -d '{
    "userId":"abc123xyz",
    "text":"How do I handle a snake in my house?",
    "location":"Hyderabad"
  }'
```

### Climate Query - Hindi
```bash
curl -X POST http://localhost:5000/ai/query \
  -H "Content-Type: application/json" \
  -d '{
    "userId":"abc123xyz",
    "text":"गर्मी में सुरक्षित कैसे रहें",
    "location":"Delhi"
  }'
```

---

## ⚠️ ERROR RESPONSES

### Invalid Phone Format
```bash
curl -X POST http://localhost:5000/auth/request-otp \
  -H "Content-Type: application/json" \
  -d '{"phone":"12345"}'
```

**Response (400):**
```json
{
  "error": "Invalid phone number"
}
```

---

### Invalid OTP
```bash
curl -X POST http://localhost:5000/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{
    "phone":"9876543210",
    "otp":"999999",
    "name":"Test",
    "age":25,
    "gender":"Male",
    "location":"Hyderabad"
  }'
```

**Response (400):**
```json
{
  "error": "Invalid or expired OTP"
}
```

---

### Missing Required Fields
```bash
curl -X POST http://localhost:5000/ai/query \
  -H "Content-Type: application/json" \
  -d '{
    "userId":"abc123xyz"
  }'
```

**Response (400):**
```json
{
  "error": "Missing required fields"
}
```

---

### Server Error
```bash
curl -X GET http://localhost:5000/auth/profile/invalid-id
```

**Response (500):**
```json
{
  "error": "Failed to fetch profile"
}
```

---

## 🧪 TESTING WITH POSTMAN

### Import Collection Template

```json
{
  "info": {
    "name": "Jeevankosh API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Request OTP",
      "request": {
        "method": "POST",
        "header": ["Content-Type: application/json"],
        "body": {
          "raw": "{\"phone\":\"9876543210\"}"
        },
        "url": "http://localhost:5000/auth/request-otp"
      }
    },
    {
      "name": "Verify OTP",
      "request": {
        "method": "POST",
        "header": ["Content-Type: application/json"],
        "body": {
          "raw": "{\"phone\":\"9876543210\",\"otp\":\"123456\",\"name\":\"Test\",\"age\":25,\"gender\":\"Male\",\"location\":\"Hyderabad\"}"
        },
        "url": "http://localhost:5000/auth/verify-otp"
      }
    },
    {
      "name": "Send Query",
      "request": {
        "method": "POST",
        "header": ["Content-Type: application/json"],
        "body": {
          "raw": "{\"userId\":\"USER_ID_HERE\",\"text\":\"मुझे सिरदर्द है\",\"location\":\"Hyderabad\"}"
        },
        "url": "http://localhost:5000/ai/query"
      }
    },
    {
      "name": "Get Alerts",
      "request": {
        "method": "GET",
        "url": "http://localhost:5000/alerts"
      }
    },
    {
      "name": "Get Tips",
      "request": {
        "method": "GET",
        "url": "http://localhost:5000/info/content"
      }
    },
    {
      "name": "Get Emergency Contacts",
      "request": {
        "method": "GET",
        "url": "http://localhost:5000/info/emergency-contacts"
      }
    }
  ]
}
```

---

## 💾 RESPONSE STATUS CODES

| Code | Meaning | Example |
|------|---------|---------|
| 200 | Success | Query processed |
| 400 | Bad Request | Invalid phone |
| 401 | Unauthorized | Invalid OTP |
| 404 | Not Found | User not found |
| 500 | Server Error | Database error |

---

## 🎯 TESTING CHECKLIST

- [ ] Health check returns ok
- [ ] Can request OTP
- [ ] Can verify OTP
- [ ] Can fetch user profile
- [ ] Can send query in English
- [ ] Can send query in Hindi
- [ ] Can send query in Telugu
- [ ] Can get alerts
- [ ] Can get tips
- [ ] Can get emergency contacts
- [ ] Error handling works
- [ ] Invalid inputs rejected

---

## 📝 NOTES

- All phone numbers must be 10 digits
- OTP is 6 digits (shown in response for testing)
- OTP expires in 5 minutes
- All queries are logged
- Alerts require 5+ similar queries
- Emergency contacts are pre-defined per city
- All timestamps in UTC

---

**Happy API testing!** 🚀
