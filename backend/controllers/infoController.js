// Logging utility
const log = {
  info: (msg) => console.log(`✅ [INFO] ${msg}`),
  error: (msg) => console.error(`❌ [INFO] ${msg}`),
  debug: (msg) => console.log(`🔍 [INFO] ${msg}`)
};

// Info controller - serves static content
export const getInfoContent = (req, res) => {
  try {
    log.debug('Fetching info content...');
    const content = {
      health: [
        'Drink water regularly to stay hydrated.',
        'Wash hands before eating and after using toilet.',
        'Get 7-8 hours of sleep daily.',
        'Eat a balanced diet with fruits and vegetables.',
        'Exercise 30 minutes daily.',
        'Avoid smoking and alcohol.',
        'Use mosquito nets to prevent diseases.',
        'Keep your surroundings clean.',
        'Visit doctor for regular check-ups.',
        'Stay updated with vaccinations.'
      ],
      diseases: [
        {
          name: '🦟 Dengue Fever',
          symptoms: ['High fever (104-105°F)', 'Severe headache', 'Joint and muscle pain', 'Rash', 'Fatigue', 'Low platelet count'],
          causes: 'Transmitted by Aedes mosquito',
          treatment: 'Rest, fluids, paracetamol (avoid aspirin), blood tests',
          prevention: 'Use mosquito nets, insect repellent, wear full sleeves'
        },
        {
          name: '🦠 Malaria',
          symptoms: ['Cyclical fever (39-40°C)', 'Chills', 'Sweating', 'Headache', 'Body aches', 'Anemia'],
          causes: 'Plasmodium parasite via Anopheles mosquito',
          treatment: 'Antimalarial drugs (Chloroquine, Artemisinin), blood tests',
          prevention: 'Mosquito nets, indoor spraying, prophylactic medication'
        },
        {
          name: '🤧 Common Cold & Flu',
          symptoms: ['Runny/stuffy nose', 'Sore throat', 'Cough', 'Fever', 'Fatigue', 'Sneezing'],
          causes: 'Viral infection spread through respiratory droplets',
          treatment: 'Rest, fluids, vitamin C, decongestants, cough syrup',
          prevention: 'Hand hygiene, vaccination, avoid close contact'
        },
        {
          name: '🤢 Gastroenteritis (Food Poisoning)',
          symptoms: ['Stomach cramps', 'Vomiting', 'Diarrhea', 'Nausea', 'Low fever', 'Loss of appetite'],
          causes: 'Contaminated food/water with bacteria or virus',
          treatment: 'ORS solution, bland diet, rest, avoid dairy',
          prevention: 'Boil water, wash hands before eating, cook food properly'
        },
        {
          name: '🫀 Hypertension (High Blood Pressure)',
          symptoms: ['Usually asymptomatic', 'Headache', 'Dizziness', 'Chest pain', 'Vision problems'],
          causes: 'Stress, salt, obesity, family history, smoking',
          treatment: 'BP medications (ACE inhibitors, Beta-blockers), lifestyle changes',
          prevention: 'Low salt diet, exercise, stress management, weight control'
        },
        {
          name: '💊 Diabetes Type 2',
          symptoms: ['Increased thirst', 'Frequent urination', 'Fatigue', 'Blurred vision', 'Slow wound healing'],
          causes: 'Insulin resistance, obesity, sedentary lifestyle, genetics',
          treatment: 'Medications (Metformin, Insulin), diet control, exercise',
          prevention: 'Healthy diet, regular exercise, weight management'
        },
        {
          name: '🦴 Arthritis',
          symptoms: ['Joint pain', 'Stiffness', 'Swelling', 'Reduced mobility', 'Warmth in joints'],
          causes: 'Age, inflammation, autoimmune disorder, wear and tear',
          treatment: 'NSAIDs, physiotherapy, hot/cold therapy, rest',
          prevention: 'Regular exercise, maintain healthy weight, protect joints'
        },
        {
          name: '😴 Asthma',
          symptoms: ['Shortness of breath', 'Chest tightness', 'Wheezing', 'Coughing especially at night', 'Fatigue'],
          causes: 'Allergies, triggers (pollution, exercise, cold air)',
          treatment: 'Inhalers, bronchodilators, steroids, trigger avoidance',
          prevention: 'Avoid triggers, maintain clean environment, regular inhaler'
        }
      ],
      medicines: [
        {
          name: '💊 Paracetamol (Acetaminophen)',
          dosage: '500-1000mg every 4-6 hours',
          use: 'Fever, headache, body pain',
          precautions: 'Avoid with liver disease, max 4000mg/day',
          sideEffects: 'Rare: liver damage, allergic reactions'
        },
        {
          name: '💊 Ibuprofen (NSAIDs)',
          dosage: '200-400mg every 6-8 hours',
          use: 'Pain, fever, inflammation, arthritis',
          precautions: 'Avoid with ulcers/kidney disease, with food',
          sideEffects: 'Stomach upset, nausea, headache'
        },
        {
          name: '💊 Amoxicillin',
          dosage: '250-500mg every 8 hours',
          use: 'Bacterial infections (throat, ear, urinary)',
          precautions: 'Tell doctor about allergies, take with/without food',
          sideEffects: 'Nausea, diarrhea, rash, allergic reactions'
        },
        {
          name: '💊 Metformin',
          dosage: '500mg 2-3 times daily with meals',
          use: 'Type 2 diabetes management',
          precautions: 'Kidney function monitoring, avoid in liver disease',
          sideEffects: 'Metallic taste, stomach upset, vitamin B12 deficiency'
        },
        {
          name: '💊 Lisinopril (ACE Inhibitor)',
          dosage: '10-40mg once daily',
          use: 'High blood pressure, heart disease',
          precautions: 'Monitor kidney function, avoid potassium supplements',
          sideEffects: 'Dry cough, dizziness, fatigue'
        },
        {
          name: '💊 Aspirin',
          dosage: '75-300mg daily',
          use: 'Blood thinner, heart attack prevention, pain relief',
          precautions: 'Avoid with bleeding disorders, ulcers',
          sideEffects: 'Stomach bleeding, bruising, allergic reactions'
        },
        {
          name: '💊 Omeprazole',
          dosage: '20-40mg once daily',
          use: 'Acid reflux, GERD, ulcers',
          precautions: 'Long-term use may affect vitamin B12, calcium',
          sideEffects: 'Headache, nausea, diarrhea, vitamin deficiencies'
        },
        {
          name: '💊 Cetirizine (Antihistamine)',
          dosage: '10mg once daily',
          use: 'Allergies, itching, hay fever',
          precautions: 'May cause drowsiness, avoid alcohol',
          sideEffects: 'Drowsiness, headache, dry mouth'
        }
      ],
      nutritionTips: [
        { category: '🥬 Vegetables', content: 'Leafy greens (spinach, kale) for iron, Tomatoes for lycopene, Carrots for beta-carotene' },
        { category: '🍎 Fruits', content: 'Bananas for potassium, Oranges for vitamin C, Berries for antioxidants, Apples for fiber' },
        { category: '🥛 Dairy', content: 'Milk for calcium and vitamin D, Yogurt for probiotics, Cheese for protein' },
        { category: '🥚 Proteins', content: 'Eggs for choline, Chicken for lean protein, Dal for vegetarian protein and fiber' },
        { category: '🍚 Grains', content: 'Brown rice for fiber, Wheat bread for nutrients, Oats for cholesterol control' },
        { category: '💧 Hydration', content: 'Drink 8-10 glasses water daily, Coconut water for electrolytes, Herbal tea for antioxidants' }
      ],
      wellness: [
        {
          title: '🧘 Yoga & Meditation',
          benefits: 'Reduces stress, improves flexibility, better sleep, lower blood pressure',
          tips: '20 minutes daily practice, morning is best time, start with basic poses'
        },
        {
          title: '🏃 Exercise Routine',
          benefits: 'Weight management, stronger heart, better mental health, increased energy',
          tips: '150 min moderate activity weekly, mix cardio with strength training'
        },
        {
          title: '😴 Sleep Hygiene',
          benefits: 'Better immunity, improved memory, emotional stability, faster healing',
          tips: 'Sleep 7-8 hours, consistent timing, no screens 1 hour before bed'
        },
        {
          title: '🧠 Mental Health',
          benefits: 'Stress reduction, better relationships, improved productivity',
          tips: 'Practice mindfulness, talk to friends, seek professional help when needed'
        }
      ],
      seasonalHealth: {
        summer: ['Drink extra water (3-4 liters)', 'Wear sunscreen SPF 30+', 'Avoid peak heat 12-4 PM', 'Eat light, frequent meals', 'Watch for heat stroke'],
        monsoon: ['Use umbrella and waterproof shoes', 'Boil drinking water', 'Keep dry clothes ready', 'Avoid waterlogged areas', 'Take vitamin C foods'],
        winter: ['Wear warm clothes, layers', 'Use moisturizer for skin', 'Get flu vaccination', 'Consume warm food/drinks', 'Stay active and exercise'],
        spring: ['Manage allergies with antihistamines', 'Increase fruits and vegetables', 'Stay hydrated', 'Do cleaning activities', 'Start new exercise routine']
      },
      climate: [
        'Wear sunscreen to protect from UV rays.',
        'Drink extra water during hot weather.',
        'Avoid outdoor activities during peak heat.',
        'Store water for dry season.',
        'Build proper drainage to prevent flooding.',
        'Plant trees to reduce heat.',
        'Wear light, loose-fitting clothes in summer.',
        'Protect crops with mulching.',
        'Monitor air quality during pollution.',
        'Use renewable energy sources.'
      ],
      safety: [
        'Never open door to strangers.',
        'Keep emergency contacts handy.',
        'Always wear helmet while riding bike.',
        'Cross roads at designated crossings.',
        'Report suspicious activity to police.',
        'Use seatbelt while driving.',
        'Avoid walking alone at night.',
        'Keep valuable documents in safe place.',
        'Know basic first aid.',
        'Have fire extinguisher at home.'
      ],
      education: [
        'Read regularly to improve vocabulary.',
        'Take notes during classes.',
        'Practice problems repeatedly.',
        'Join study groups for better understanding.',
        'Ask questions to clarify doubts.',
        'Create flashcards for memorization.',
        'Take breaks between study sessions.',
        'Use online resources for learning.',
        'Teach others to reinforce learning.',
        'Balance studies with physical activity.'
      ],
      general: [
        'Be kind to others.',
        'Help those in need.',
        'Learn something new daily.',
        'Respect different cultures.',
        'Save water and electricity.',
        'Reduce plastic use.',
        'Support local businesses.',
        'Participate in community activities.',
        'Share knowledge freely.',
        'Stay positive and healthy.'
      ]
    };

    log.info('Info content fetched with comprehensive health library');
    res.json({ success: true, content });
  } catch (error) {
    log.error(`Error fetching info: ${error.message}`);
    res.status(500).json({ error: 'Failed to fetch info', success: false });
  }
};

// Get emergency contacts
export const getEmergencyContacts = (req, res) => {
  try {
    log.debug('Fetching emergency contacts...');
    const emergencyContacts = {
      Hyderabad: {
        hospital: '08866666666',
        police: '100',
        ambulance: '108',
        fire: '101'
      },
      Bangalore: {
        hospital: '08066666666',
        police: '100',
        ambulance: '108',
        fire: '101'
      },
      Chennai: {
        hospital: '04466666666',
        police: '100',
        ambulance: '108',
        fire: '101'
      },
      Delhi: {
        hospital: '01166666666',
        police: '100',
        ambulance: '108',
        fire: '101'
      },
      Mumbai: {
        hospital: '02266666666',
        police: '100',
        ambulance: '108',
        fire: '101'
      },
      Pune: {
        hospital: '02066666666',
        police: '100',
        ambulance: '108',
        fire: '101'
      },
      Kolkata: {
        hospital: '03366666666',
        police: '100',
        ambulance: '108',
        fire: '101'
      }
    };

    log.info(`Emergency contacts fetched (${Object.keys(emergencyContacts).length} cities)`);
    res.json({ success: true, emergencyContacts });
  } catch (error) {
    log.error(`Error fetching emergency contacts: ${error.message}`);
    res.status(500).json({ error: 'Failed to fetch emergency contacts', success: false });
  }
};
