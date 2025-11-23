import express from 'express';
import { getEmergencyContacts, getInfoContent } from '../controllers/infoController.js';

const router = express.Router();

router.get('/content', getInfoContent);
router.get('/emergency-contacts', getEmergencyContacts);

export default router;
