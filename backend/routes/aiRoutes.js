import express from 'express';
import { analyzeSymptoms, getQueryHistory, processQuery } from '../controllers/aiController.js';

const router = express.Router();

router.post('/query', processQuery);
router.get('/history/:userId', getQueryHistory);
router.post('/analyze-symptoms', analyzeSymptoms);

export default router;
