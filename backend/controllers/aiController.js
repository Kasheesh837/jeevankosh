import { GoogleGenerativeAI } from '@google/generative-ai';
import Alert from '../models/Alert.js';
import QueryLog from '../models/QueryLog.js';

// Logging utility
const log = {
  info: (msg) => console.log(`✅ [AI] ${msg}`),
  error: (msg) => console.error(`❌ [AI] ${msg}`),
  warn: (msg) => console.warn(`⚠️  [AI] ${msg}`),
  debug: (msg) => console.log(`🔍 [AI] ${msg}`)
};

// Initialize Gemini lazily (when needed, not at import time)
let genAI = null;

function initializeGemini() {
  if (!genAI) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      log.error('GEMINI_API_KEY is not set in .env file!');
      return null;
    }
    genAI = new GoogleGenerativeAI(apiKey);
    log.info(`Gemini AI initialized successfully ✓`);
  }
  return genAI;
}

// Master AI Prompt
const MASTER_PROMPT = `You are Jeevankosh — a multilingual health and safety assistant for Indian communities.

User Query: <USER_TEXT>

IMPORTANT INSTRUCTIONS:
1. Detect the user's language automatically
2. ALWAYS respond in the SAME language as the user input
3. Classify the query into: health | education | climate | safety | general
4. Keep responses simple, clear and easy to understand (no medical jargon)
5. For HEALTH queries: provide basic guidance, suggest common medicines, mention approximate costs in rupees
6. For other categories: provide relevant, helpful information
7. ALWAYS return a valid JSON response with this exact format:

{
  "category": "health|education|climate|safety|general",
  "language": "en|hi|te|ta|kn",
  "answer": "Your response text here in user's language",
  "severity": "low|medium|high or null",
  "suggestions": ["suggestion 1", "suggestion 2"],
  "emergencyContact": ""
}

Remember: answer field should be plain text, friendly and informative.`;

// Detect language (simple detection based on script/keywords)
function detectLanguage(text) {
  const teluguRegex = /[\u0C00-\u0C7F]/g;
  const kannadaRegex = /[\u0C80-\u0CFF]/g;
  const tamilRegex = /[\u0B80-\u0BFF]/g;
  const hindiRegex = /[\u0900-\u097F]/g;

  if (teluguRegex.test(text)) return 'te';
  if (kannadaRegex.test(text)) return 'kn';
  if (tamilRegex.test(text)) return 'ta';
  if (hindiRegex.test(text)) return 'hi';
  return 'en';
}

// Get emergency contact based on location
function getEmergencyContact(location, category) {
  const emergencyContacts = {
    'Hyderabad': { health: '08866666666', police: '100', ambulance: '108' },
    'Bangalore': { health: '08066666666', police: '100', ambulance: '108' },
    'Chennai': { health: '04466666666', police: '100', ambulance: '108' },
    'Delhi': { health: '01166666666', police: '100', ambulance: '108' },
    'Mumbai': { health: '02266666666', police: '100', ambulance: '108' }
  };

  const contacts = emergencyContacts[location];
  if (!contacts) return '';

  if (category === 'health') return `tel:${contacts.ambulance}`;
  if (category === 'safety') return `tel:${contacts.police}`;
  return '';
}

// Parse Gemini response safely
function parseGeminiResponse(text) {
  try {
    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return {
        category: 'general',
        language: 'en',
        answer: text,
        severity: null,
        suggestions: [],
        emergencyContact: ''
      };
    }

    const parsed = JSON.parse(jsonMatch[0]);
    return {
      category: parsed.category || 'general',
      language: parsed.language || 'en',
      answer: parsed.answer || text,
      severity: parsed.severity || null,
      suggestions: Array.isArray(parsed.suggestions) ? parsed.suggestions : [],
      emergencyContact: parsed.emergencyContact || ''
    };
  } catch (error) {
    console.error('Parse error:', error);
    return {
      category: 'general',
      language: 'en',
      answer: text,
      severity: null,
      suggestions: [],
      emergencyContact: ''
    };
  }
}

// Process AI Query
export const processQuery = async (req, res) => {
  try {
    const { userId, text, location } = req.body;
    
    log.debug(`Processing query - User: ${userId}, Location: ${location}, Query: "${text}"`);

    if (!userId || !text || !location) {
      log.warn(`Missing fields - User: ${userId}, Text: ${text ? '✓' : '✗'}, Location: ${location}`);
      return res.status(400).json({ error: 'Missing required fields (userId, text, location)', success: false });
    }

    // Check if API key is configured
    if (!process.env.GEMINI_API_KEY) {
      log.error('GEMINI_API_KEY not configured in .env file');
      return res.status(500).json({ 
        error: 'Gemini API key not configured',
        success: false,
        hint: 'Add GEMINI_API_KEY to backend/.env file from https://makersuite.google.com/app/apikey'
      });
    }

    const detectedLanguage = detectLanguage(text);
    log.info(`Detected language: ${detectedLanguage} for query from user ${userId}`);
    
    let responseText;
    try {
      log.debug('Step 1: Initializing Gemini...');
      const geminiInstance = initializeGemini();
      
      if (!geminiInstance) {
        throw new Error('Gemini API Key not configured in .env file');
      }
      log.debug('Step 2: Gemini instance ready');
      
      const model = geminiInstance.getGenerativeModel({ model: 'gemini-2.5-flash' });
      log.debug('Step 3: Model created');
      
      const prompt = MASTER_PROMPT.replace('<USER_TEXT>', text);
      log.debug('Step 4: Prompt prepared');
      
      log.debug('Step 5: Calling Gemini API...');
      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }]
      });
      log.debug('Step 6: Gemini response received');
      
      responseText = result.response.text();
      log.info(`✅ Gemini response received (${responseText.length} chars)`);
    } catch (geminiError) {
      log.error(`Gemini API error: ${geminiError.message}`);
      log.debug(`Error stack: ${geminiError.stack}`);
      
      // Generate fallback response based on query content
      const fallbackAnswer = generateFallbackResponse(text, detectedLanguage);
      
      // Fallback response when Gemini fails
      responseText = JSON.stringify({
        category: 'general',
        language: detectedLanguage,
        answer: fallbackAnswer,
        severity: null,
        suggestions: ['Check internet connection', 'Try again shortly'],
        emergencyContact: ''
      });
    }

    log.debug('Step 7: Parsing response');
    // Parse response
    const parsedResponse = parseGeminiResponse(responseText);
    log.debug(`Parsed response - Category: ${parsedResponse.category}, Language: ${parsedResponse.language}`);

    log.debug('Step 8: Saving query log');
    // Save query log
    const queryLog = new QueryLog({
      userId,
      text,
      location,
      category: parsedResponse.category,
      language: detectedLanguage,
      response: parsedResponse.answer,
      severity: parsedResponse.category === 'health' ? parsedResponse.severity : null
    });

    await queryLog.save();
    log.info(`Query saved to DB - ID: ${queryLog._id}, Category: ${parsedResponse.category}`);

    log.debug('Step 9: Checking for community alert');
    // Check for community alert
    await checkCommunityAlert(location, parsedResponse.category);

    log.debug('Step 10: Getting emergency contact');
    // Add emergency contact if needed
    const emergencyContact = getEmergencyContact(location, parsedResponse.category);

    log.info(`Query processed successfully for user ${userId}`);
    
    res.json({
      success: true,
      ...parsedResponse,
      emergencyContact: emergencyContact || parsedResponse.emergencyContact
    });
  } catch (error) {
    log.error(`Query processing failed: ${error.message}`);
    log.debug(`Error stack: ${error.stack}`);
    res.status(500).json({ error: 'Failed to process query', success: false, message: error.message });
  }
};

// Get user's query history
export const getQueryHistory = async (req, res) => {
  try {
    const { userId } = req.params;

    log.debug(`Fetching query history for user: ${userId}`);

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required', success: false });
    }

    // Fetch all queries for the user, sorted by most recent first
    const queries = await QueryLog.find({ userId })
      .sort({ timestamp: -1 })
      .lean();

    log.info(`Retrieved ${queries.length} queries for user ${userId}`);

    res.json({
      success: true,
      queries: queries || []
    });
  } catch (error) {
    log.error(`History fetch error: ${error.message}`);
    res.status(500).json({ error: 'Failed to fetch query history', success: false, message: error.message });
  }
};

// Analyze symptoms using Gemini AI
export const analyzeSymptoms = async (req, res) => {
  try {
    const { symptoms, duration, severity } = req.body;

    log.debug(`Analyzing symptoms: ${symptoms.join(', ')}, Duration: ${duration}, Severity: ${severity}`);

    if (!symptoms || symptoms.length === 0) {
      return res.status(400).json({ error: 'At least one symptom is required', success: false });
    }

    const symptomPrompt = `You are a medical AI assistant. Analyze the following symptoms and provide a comprehensive assessment:

Symptoms: ${symptoms.join(', ')}
Duration: ${duration}
Reported Severity: ${severity}

IMPORTANT: Provide a JSON response with EXACTLY this structure (no other text):
{
  "possibleConditions": [
    {
      "name": "Condition Name",
      "probability": "X%",
      "description": "Brief description",
      "severity": "Low|Medium|High"
    }
  ],
  "recommendedMedicines": [
    {
      "name": "Medicine Name",
      "dosage": "Amount",
      "frequency": "Times per day",
      "cost": "₹X-Y",
      "purpose": "Why to take"
    }
  ],
  "doctorSpecialists": [
    {
      "type": "Doctor Type",
      "urgency": "Urgent|Non-urgent",
      "timing": "When to visit"
    }
  ],
  "recommendations": ["Recommendation 1", "Recommendation 2"],
  "disclaimer": "This is an AI assessment, not medical diagnosis. Consult healthcare professional."
}

CRITICAL RULES:
- Keep medicines list to 3-4 items maximum
- Include realistic costs in rupees
- Be conservative with probability percentages
- Include appropriate warnings
- Focus on common, accessible medications
- Always include general wellness recommendations`;

    const geminiInstance = initializeGemini();
    if (!geminiInstance) {
      throw new Error('Gemini API Key not configured');
    }

    log.debug('Calling Gemini for symptom analysis...');
    const model = geminiInstance.getGenerativeModel({ model: 'gemini-2.5-flash' });
    
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: symptomPrompt }] }]
    });

    const responseText = result.response.text();
    log.info(`✅ Symptom analysis received (${responseText.length} chars)`);

    // Parse response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid response format from Gemini');
    }

    const analysis = JSON.parse(jsonMatch[0]);

    log.info(`Symptom analysis completed - Found ${analysis.possibleConditions?.length || 0} possible conditions`);

    res.json({
      success: true,
      analysis
    });
  } catch (error) {
    log.error(`Symptom analysis error: ${error.message}`);
    res.status(500).json({ 
      error: 'Failed to analyze symptoms', 
      success: false, 
      message: error.message 
    });
  }
};

// Check and trigger community alerts
async function checkCommunityAlert(location, category) {
  try {
    // Find similar queries in last 2 hours
    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);

    const similarQueries = await QueryLog.find({
      location,
      category,
      timestamp: { $gte: twoHoursAgo }
    }).countDocuments();

    log.debug(`Alert check: ${similarQueries} "${category}" queries in ${location} (last 2 hours)`);

    // Trigger alert if 5+ queries
    if (similarQueries >= 5) {
      log.warn(`⚠️  Alert threshold reached: ${similarQueries} "${category}" queries in ${location}`);
      
      const existingAlert = await Alert.findOne({
        area: location,
        category,
        detectedAt: { $gte: twoHoursAgo }
      });

      if (!existingAlert) {
        const queries = await QueryLog.find({
          location,
          category,
          timestamp: { $gte: twoHoursAgo }
        }).limit(5);

        const newAlert = new Alert({
          area: location,
          category,
          count: similarQueries,
          queries: queries.map(q => ({
            userId: q.userId,
            text: q.text,
            timestamp: q.timestamp
          })),
          severity: category === 'health' ? 'high' : 'medium'
        });

        await newAlert.save();
        log.info(`🚨 ALERT TRIGGERED: ${newAlert.severity.toUpperCase()} - ${category} in ${location} (${similarQueries} queries) - Alert ID: ${newAlert._id}`);
      } else {
        log.debug(`Alert already exists for ${location} - ${category}`);
      }
    }
  } catch (error) {
    log.error(`Alert check error: ${error.message}`);
  }
}

// Fallback response generator when API fails
function generateFallbackResponse(userQuery, language) {
  const query = userQuery.toLowerCase();
  
  // Common health queries
  const healthResponses = {
    fever: 'Fever is usually a sign of infection. Rest, drink plenty of water, and take paracetamol 500mg every 4-6 hours. If fever persists above 39°C for more than 3 days, consult a doctor.',
    cold: 'Common cold is viral. Rest, stay hydrated, and take vitamin C. Symptoms usually improve in 5-7 days. Use saline nasal drops for relief.',
    cough: 'Cough can be dry or productive. Drink warm water, use honey, and take cough syrup. If severe or lasting more than 2 weeks, see a doctor.',
    headache: 'Headache can be tension or migraine. Rest in a quiet dark room, drink water, and take ibuprofen 200mg. Avoid screens for 30 minutes.',
    pain: 'Pain relief: Take ibuprofen 200-400mg every 6-8 hours with food, or paracetamol 500mg every 4-6 hours. Use hot/cold compress for 15 minutes.',
    stomach: 'Stomach pain might be indigestion or gastritis. Drink ORS solution, avoid spicy/oily food, and rest. Take omeprazole if acid reflux. See doctor if severe.',
    diarrhea: 'For diarrhea: Drink ORS solution frequently, avoid dairy and solid food for 24 hours. Take zinc supplement. Seek help if it lasts more than 3 days.',
    vomiting: 'For vomiting: Rest, drink small sips of water or ORS. Avoid food for 2 hours. Take antiemetic if prescribed. Consult doctor if persistent.',
    allergies: 'For allergies: Take antihistamine like cetirizine 10mg once daily. Avoid allergen triggers, use saline drops. Consult doctor if severe.',
    default: 'I understand you have a health concern. For accurate diagnosis and treatment, please consult a qualified healthcare provider. In emergencies, call 108.'
  };

  // Emergency keywords
  if (query.includes('emergency') || query.includes('heart') || query.includes('severe') || query.includes('accident')) {
    return 'This is a medical emergency. Call 108 immediately for ambulance. If unconscious, perform basic first aid and call emergency services at 108 (Ambulance), 100 (Police), or 101 (Fire).';
  }

  // Check for keywords
  for (const [key, response] of Object.entries(healthResponses)) {
    if (query.includes(key)) {
      return response;
    }
  }

  return 'Thank you for your query. Please describe your symptoms or concern in more detail. For urgent medical help, call 108 immediately.';
}

