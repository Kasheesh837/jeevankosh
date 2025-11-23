import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Mock OTP storage (in-memory for demo)
const otpStore = new Map();

// Secret for JWT (in production, use strong secret)
const JWT_SECRET = process.env.JWT_SECRET || 'jeevankosh_secret_key_2025';

// Logging utility
const log = {
  info: (msg) => console.log(`✅ [AUTH] ${msg}`),
  error: (msg) => console.error(`❌ [AUTH] ${msg}`),
  warn: (msg) => console.warn(`⚠️  [AUTH] ${msg}`),
  debug: (msg) => console.log(`🔍 [AUTH] ${msg}`)
};

// Request OTP
export const requestOTP = async (req, res) => {
  try {
    const { phone } = req.body;
    log.debug(`Request OTP - Phone: ${phone}`);

    if (!phone || !/^[0-9]{10}$/.test(phone)) {
      log.warn(`Invalid phone format: ${phone}`);
      return res.status(400).json({ error: 'Invalid phone number. Must be 10 digits.', success: false });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore.set(phone, { otp, expiresAt: Date.now() + 5 * 60 * 1000 });

    log.info(`OTP generated for ${phone}: ${otp} (expires in 5 min)`);
    
    res.json({ 
      message: 'OTP sent successfully', 
      otp, // Return OTP for testing
      phone,
      success: true,
      expiresIn: 300 
    });
  } catch (error) {
    log.error(`OTP request failed: ${error.message}`);
    res.status(500).json({ error: 'Failed to request OTP', success: false, message: error.message });
  }
};

// Verify OTP and complete registration/login
export const verifyOTPAndRegister = async (req, res) => {
  try {
    const { phone, otp, name, age, gender, location, knownConditions } = req.body;
    
    log.debug(`Verify OTP - Phone: ${phone}, OTP: ${otp}`);

    // Validate basic inputs
    if (!phone || !otp) {
      log.warn('Missing phone or OTP');
      return res.status(400).json({ error: 'Phone and OTP are required', success: false });
    }

    // Check if OTP exists and is valid
    const storedData = otpStore.get(phone);
    if (!storedData) {
      log.warn(`No OTP found for phone: ${phone}`);
      return res.status(400).json({ error: 'OTP not requested or expired', success: false });
    }

    if (storedData.otp !== otp) {
      log.warn(`Invalid OTP for ${phone}. Expected: ${storedData.otp}, Got: ${otp}`);
      return res.status(400).json({ error: 'Invalid OTP', success: false });
    }

    if (storedData.expiresAt < Date.now()) {
      log.warn(`OTP expired for ${phone}`);
      otpStore.delete(phone);
      return res.status(400).json({ error: 'OTP expired', success: false });
    }

    // Check if user already exists (LOGIN)
    let user = await User.findOne({ phone });
    let isNewUser = false;

    if (!user) {
      // NEW USER - SIGNUP: Require all fields
      if (!name || !location) {
        log.warn(`Missing registration fields for new user: ${phone}`);
        return res.status(400).json({ error: 'Name and location are required for new account', success: false });
      }

      log.info(`🆕 Creating NEW user: ${phone}`);
      user = new User({
        phone,
        name,
        age: parseInt(age) || 0,
        gender: gender || 'Not specified',
        location,
        knownConditions: Array.isArray(knownConditions) ? knownConditions : []
      });
      isNewUser = true;
    } else {
      // EXISTING USER - LOGIN: Don't update profile
      log.info(`👤 User LOGIN: ${phone} (existing account)`);
      // Don't update anything - just login
    }

    if (isNewUser) {
      await user.save();
      log.info(`✅ New user created successfully - ID: ${user._id}`);
    }
    
    otpStore.delete(phone);
    log.debug(`OTP cleared for ${phone}`);

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, phone: user.phone },
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    log.info(`${isNewUser ? '✅ SIGNUP' : '✅ LOGIN'}: ${phone} (ID: ${user._id})`);

    res.json({
      message: isNewUser ? '🎉 Registration successful! Welcome to Jeevankosh!' : '✅ Login successful!',
      success: true,
      userId: user._id.toString(),
      token,
      isNewUser,
      user: {
        _id: user._id.toString(),
        name: user.name,
        phone: user.phone,
        location: user.location,
        age: user.age,
        gender: user.gender,
        knownConditions: user.knownConditions
      }
    });
  } catch (error) {
    log.error(`OTP verification failed: ${error.message}`);
    res.status(500).json({ error: 'Failed to verify OTP', success: false, message: error.message });
  }
};

// Get user profile
export const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    
    log.debug(`Fetching profile for user: ${userId}`);

    if (!userId) {
      log.warn('User ID not provided');
      return res.status(400).json({ error: 'User ID required', success: false });
    }

    const user = await User.findById(userId);

    if (!user) {
      log.warn(`User not found: ${userId}`);
      return res.status(404).json({ error: 'User not found', success: false });
    }

    log.info(`Profile fetched: ${user.phone} (ID: ${userId})`);

    res.json({
      success: true,
      user: {
        _id: user._id.toString(),
        name: user.name,
        phone: user.phone,
        location: user.location,
        age: user.age,
        gender: user.gender,
        knownConditions: user.knownConditions,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    log.error(`Profile fetch error: ${error.message}`);
    res.status(500).json({ error: 'Failed to fetch profile', success: false, message: error.message });
  }
};

// Middleware to verify JWT
export const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};
