import express from 'express';
import { getUserProfile, requestOTP, verifyOTPAndRegister } from '../controllers/authController.js';

const router = express.Router();

router.post('/request-otp', requestOTP);
router.post('/verify-otp', verifyOTPAndRegister);
router.get('/profile/:userId', getUserProfile);

export default router;
