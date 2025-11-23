import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import aiRoutes from './routes/aiRoutes.js';
import alertRoutes from './routes/alertRoutes.js';
import authRoutes from './routes/authRoutes.js';
import infoRoutes from './routes/infoRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/jeevankosh';

console.log('\n' + '='.repeat(60));
console.log('🏥 JEEVANKOSH BACKEND STARTUP');
console.log('='.repeat(60));
console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
console.log(`🔌 Port: ${PORT}`);
console.log(`📊 MongoDB: ${MONGO_URI.split('@')[1] || MONGO_URI.substring(0, 30) + '...'}`);
console.log(`🔑 Gemini API Key: ${process.env.GEMINI_API_KEY ? '✓ Configured' : '✗ Missing'}`);
console.log('='.repeat(60) + '\n');

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:3173'],
  credentials: true
}));
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  try {
    const timestamp = new Date().toLocaleTimeString();
    console.log(`📨 ${timestamp} [${req.method}] ${req.path}`);
  } catch (e) {
    console.error('❌ Error in logging middleware:', e);
  }
  next();
});

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    console.log(`📦 Database: ${MONGO_URI.includes('mongodb+srv') ? 'MongoDB Atlas' : 'Local MongoDB'}\n`);
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    console.error('   Make sure MongoDB is running: mongod');
    process.exit(1);
  });

// Routes
console.log('📍 Registering routes...');
app.use('/auth', authRoutes);
console.log('  ✓ Auth routes: /auth');
app.use('/ai', aiRoutes);
console.log('  ✓ AI routes: /ai');
app.use('/alerts', alertRoutes);
console.log('  ✓ Alerts routes: /alerts');
app.use('/info', infoRoutes);
console.log('  ✓ Info routes: /info');

// Test route
app.post('/ai/test', (req, res) => {
  try {
    console.log('✅ TEST ROUTE CALLED');
    res.json({ test: 'ok' });
  } catch (e) {
    console.error('❌ Error in test route:', e);
    res.status(500).json({ error: e.message });
  }
});
console.log('  ✓ Test route: /ai/test');

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Jeevankosh Backend Running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});
console.log('  ✓ Health check: /health\n');

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(`❌ Error: ${err.message}`);
  res.status(err.status || 500).json({ 
    error: err.message, 
    success: false,
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log('🚀 Server is running!');
  console.log(`📌 Backend: http://localhost:${PORT}`);
  console.log(`📌 Frontend: http://localhost:5173 or http://localhost:3000`);
  console.log('\n✅ Jeevankosh Backend Ready for Connections\n');
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('❌ UNCAUGHT EXCEPTION:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ UNHANDLED REJECTION at:', promise, 'reason:', reason);
});
