import express from 'express';
import { clearOldAlerts, createTestAlerts, getAlerts, getAlertsByLocation } from '../controllers/alertController.js';

const router = express.Router();

router.get('/', getAlerts);
router.get('/location/:location', getAlertsByLocation);
router.post('/clear-old', clearOldAlerts);
router.post('/create-test', createTestAlerts);

export default router;
