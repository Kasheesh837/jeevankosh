FRONTEND SETUP GUIDE

## Prerequisites
- Node.js v14+
- Modern browser (Chrome/Edge/Safari for voice features)

## Quick Start

1. Install dependencies:
   npm install

2. Update API endpoint if needed in components:
   const API_BASE = 'http://localhost:5000'

3. Run development server:
   npm run dev

Frontend will run on http://localhost:3000

## Build for Production

npm run build
npm run preview

## Pages & Routes

/login - Phone login with OTP verification
/home - Dashboard with feature overview
/chat - AI chatbot with voice input/output
/info - Health tips, climate tips, emergency contacts
/alerts - Community alerts for your location

## Features

Chat Page:
- Text input for queries
- Microphone button for voice input
- Responses with category badges
- Emergency contact buttons
- Text-to-speech output

Info Page:
- 50 curated tips (10 each category)
- Emergency contact numbers
- One-tap calling via tel: links

Alerts Page:
- Real-time community alerts
- Filter by category
- Refresh every 30 seconds
- Severity indicators

## Voice Features

Input:
- Click microphone icon
- Browser requests microphone permission
- Speak clearly
- Auto-sends when done

Output:
- Automatic speech synthesis
- Detects language from response
- Plays in background

## Browser Support

Voice API:
- Chrome ✅
- Edge ✅
- Safari ✅
- Firefox ❌

All browsers:
- Text chat works everywhere
- Bootstrap responsive UI
- Local storage for user data

## Storage

Uses browser localStorage:
- user: { userId, token, name, phone, location }
- Persists across page reloads
- Cleared on logout

## API Integration

All requests use Axios:
- Base URL: http://localhost:5000
- Proxy configured in vite.config.js
- All requests include user context

## Bootstrap Customization

CSS variables in index.html:
- Colors: #667eea, #764ba2
- Animations: fade-in, slide-in, pulse
- Breakpoints: Bootstrap standard

Override by editing:
- frontend/index.html <style> section
- Component inline styles
- Bootstrap CDN classes

## Testing

Test Account:
Phone: 9876543210
OTP: (shown in alert during verification)

Test Queries:
- "मुझे सिरदर्द है" (Hindi - Health)
- "నాకు గణితం చెప్పండి" (Telugu - Education)
- "ಬೇಸಿಗೆಯಲ್ಲಿ ಸುರಕ್ಷತೆ" (Kannada - Safety)

## Known Issues

- OTP timing: 5 minutes for testing
- Voice works best in quiet environment
- Mobile: Enable microphone in browser settings
- Some devices may not support Web Speech API

## Environment

API Endpoint: http://localhost:5000
Development: http://localhost:3000
Production: Use your deployed backend URL

Update in axios calls if deploying backend elsewhere.

## Responsive Design

Mobile (< 768px):
- Single column layouts
- Stacked buttons
- Optimized chat height
- Touch-friendly buttons

Tablet (768px - 1024px):
- Two column layouts
- Grid cards

Desktop (> 1024px):
- Full layout
- All features visible
