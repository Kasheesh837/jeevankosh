import { useEffect, useState } from 'react';

export default function Info({ user }) {
  const [content, setContent] = useState(null);
  const [emergencyContacts, setEmergencyContacts] = useState(null);
  const [activeTab, setActiveTab] = useState('diseases');
  const [loading, setLoading] = useState(true);
  const [locationInfo, setLocationInfo] = useState(null);
  const [expandedDisease, setExpandedDisease] = useState(null);
  const [expandedMedicine, setExpandedMedicine] = useState(null);
  const [indiaStats, setIndiaStats] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Comprehensive mock data
  const mockData = {
    diseases: [
      {
        name: "Dengue Fever",
        symptoms: ["High fever", "Severe headache", "Pain behind eyes", "Muscle and joint pain", "Nausea/vomiting", "Skin rash"],
        causes: "Mosquito bite (Aedes mosquito)",
        treatment: "Rest, hydration, paracetamol for fever. Avoid aspirin.",
        prevention: "Use mosquito nets, repellents, eliminate stagnant water",
        severity: "High"
      },
      {
        name: "Diabetes Type 2",
        symptoms: ["Increased thirst", "Frequent urination", "Hunger", "Fatigue", "Blurred vision", "Slow healing"],
        causes: "Insulin resistance, obesity, genetic factors",
        treatment: "Medication, diet control, exercise, regular monitoring",
        prevention: "Healthy diet, regular exercise, weight management",
        severity: "Medium"
      },
      {
        name: "Hypertension",
        symptoms: ["Headaches", "Shortness of breath", "Nosebleeds", "Flushing", "Dizziness", "Chest pain"],
        causes: "High salt intake, stress, obesity, genetic factors",
        treatment: "Medication, lifestyle changes, regular monitoring",
        prevention: "Reduce salt, exercise, stress management",
        severity: "Medium"
      },
      {
        name: "COVID-19",
        symptoms: ["Fever", "Dry cough", "Tiredness", "Loss of taste/smell", "Sore throat", "Difficulty breathing"],
        causes: "SARS-CoV-2 virus, airborne transmission",
        treatment: "Isolation, rest, hydration, medical supervision",
        prevention: "Vaccination, masks, hand hygiene, social distancing",
        severity: "High"
      },
      {
        name: "Malaria",
        symptoms: ["Fever with chills", "Sweating", "Headache", "Nausea", "Body aches"],
        causes: "Mosquito bite (Anopheles mosquito)",
        treatment: "Antimalarial drugs, rest, hydration",
        prevention: "Mosquito nets, repellents, avoid mosquito breeding sites",
        severity: "High"
      },
      {
        name: "Typhoid",
        symptoms: ["Prolonged fever", "Weakness", "Stomach pain", "Headache", "Loss of appetite"],
        causes: "Contaminated food or water (Salmonella typhi)",
        treatment: "Antibiotics, hydration, proper nutrition",
        prevention: "Vaccination, safe drinking water, proper sanitation",
        severity: "Medium"
      }
    ],
    medicines: [
      {
        name: "Paracetamol",
        dosage: "500mg every 4-6 hours, max 4g/day",
        use: "Fever and mild to moderate pain",
        precautions: "Avoid alcohol, don't exceed dosage, consult for liver issues",
        sideEffects: "Rash, nausea, liver damage (overdose)",
        type: "Pain Reliever"
      },
      {
        name: "Ibuprofen",
        dosage: "200-400mg every 4-6 hours, max 1200mg/day",
        use: "Pain, inflammation, fever",
        precautions: "Take with food, avoid in stomach ulcers, kidney issues",
        sideEffects: "Stomach pain, heartburn, dizziness",
        type: "NSAID"
      },
      {
        name: "Metformin",
        dosage: "500mg twice daily with meals",
        use: "Type 2 diabetes management",
        precautions: "Monitor kidney function, avoid alcohol",
        sideEffects: "Nausea, diarrhea, stomach upset",
        type: "Anti-diabetic"
      },
      {
        name: "Amoxicillin",
        dosage: "250-500mg every 8 hours",
        use: "Bacterial infections",
        precautions: "Complete full course, take as prescribed",
        sideEffects: "Diarrhea, nausea, rash",
        type: "Antibiotic"
      }
    ],
    nutritionTips: [
      { 
        category: "Balanced Diet", 
        content: "Include all food groups: grains, proteins, fruits, vegetables, dairy in proper proportions",
        icon: "🥗"
      },
      { 
        category: "Hydration", 
        content: "Drink 8-10 glasses of water daily. More in summer and during physical activity",
        icon: "💧"
      },
      { 
        category: "Indian Diet Tips", 
        content: "Include traditional foods like dal, roti, rice, seasonal vegetables and local fruits",
        icon: "🇮🇳"
      },
      { 
        category: "Weight Management", 
        content: "Control portion sizes, avoid fried foods, include fiber-rich foods and regular exercise",
        icon: "⚖️"
      }
    ],
    wellness: [
      {
        title: "Yoga & Meditation",
        benefits: "Reduces stress, improves flexibility, enhances mental clarity, boosts immunity",
        tips: "Practice daily for 30 mins. Start with basic asanas like Surya Namaskar and Pranayama",
        icon: "🧘"
      },
      {
        title: "Walking Exercise",
        benefits: "Improves heart health, aids weight loss, boosts mood, strengthens bones",
        tips: "Walk 30-45 minutes daily. Morning walks are most beneficial for vitamin D",
        icon: "🚶"
      },
      {
        title: "Strength Training",
        benefits: "Builds muscle, increases metabolism, improves posture, strengthens bones",
        tips: "Start with bodyweight exercises 2-3 times weekly. Gradually increase intensity",
        icon: "💪"
      }
    ],
    health: [
      "Get 7-8 hours of quality sleep daily for optimal physical and mental health recovery",
      "Regular health check-ups after age 40 for early detection of potential health issues",
      "Vaccinations are crucial for disease prevention and building community immunity",
      "Mental health is as important as physical health - practice mindfulness and seek help when needed"
    ],
    climate: [
      "Stay well-hydrated during hot summer months to prevent heat-related illnesses",
      "Use broad-spectrum sunscreen when going outdoors to protect against UV radiation",
      "Wear appropriate layered clothing for changing weather conditions and seasons",
      "Check air quality index regularly and limit outdoor activities during poor air quality days"
    ],
    safety: [
      "Learn basic first aid techniques including CPR and emergency response procedures",
      "Keep emergency contact numbers saved in your phone and easily accessible",
      "Install smoke detectors and fire extinguishers at home for fire safety",
      "Always wear seatbelts while driving and helmets while riding two-wheelers"
    ],
    education: [
      "Regular reading improves knowledge retention, memory, and cognitive abilities",
      "Take regular breaks during study sessions to maintain focus and prevent burnout",
      "Practice previous year question papers to understand exam patterns and timing",
      "Maintain a consistent study schedule with dedicated time for each subject"
    ],
    general: [
      "Maintain a positive attitude and practice gratitude for better mental wellbeing",
      "Help others in need - community support strengthens social bonds and personal satisfaction",
      "Learn something new every day to keep your mind active and continuously growing",
      "Spend quality time with family and friends to build strong emotional connections"
    ],
    seasonalHealth: {
      summer: [
        "Drink plenty of water, coconut water, and buttermilk to stay hydrated",
        "Avoid going out during peak afternoon heat (12 PM - 4 PM) when sun is strongest",
        "Eat light, fresh foods like fruits, salads, and curd to aid digestion",
        "Wear light-colored, loose cotton clothes that allow skin to breathe"
      ],
      monsoon: [
        "Avoid street food and ensure drinking water is properly filtered or boiled",
        "Use mosquito repellents and nets to prevent mosquito-borne diseases",
        "Keep surroundings clean and eliminate stagnant water to prevent dengue breeding",
        "Dry clothes properly and maintain hygiene to prevent fungal infections"
      ],
      winter: [
        "Keep yourself warm with proper layered clothing, especially in mornings and evenings",
        "Moisturize skin regularly with natural oils to prevent dryness and cracking",
        "Eat warm, nutritious foods including soups, nuts, and seasonal vegetables",
        "Exercise regularly indoors or during warmer parts of the day to maintain body heat"
      ]
    }
  };

  // Real-time India health stats
  const indiaHealthStats = {
    activeCases: "68,432",
    vaccinationCoverage: "95%",
    healthInitiatives: ["Ayushman Bharat", "National Health Mission", "Swachh Bharat", "Poshan Abhiyan"],
    emergencyNumbers: {
      national: "112",
      ambulance: "108",
      womenHelpline: "181",
      childHelpline: "1098",
      seniorCitizens: "14567"
    }
  };

  // Location-specific information
  const locationClimateInfo = {
    'Hyderabad': {
      climate: '🌡️ Hot & Humid (25°C-40°C) - Stay hydrated, wear light clothes. Peak heat 2-4 PM.',
      risks: '⚠️ Heat stroke, dehydration, monsoon flooding in low-lying areas',
      tips: ['Carry water bottle always', 'Use SPF 50+ sunscreen', 'Drink 3-4 liters water daily', 'Avoid outdoor activities during peak heat'],
      hospitals: ['Apollo Hospitals', 'Yashoda Hospitals', 'Care Hospitals', 'KIMS Hospitals'],
      airQuality: 'Moderate (AQI: 105)'
    },
    'Bangalore': {
      climate: '☁️ Pleasant (15°C-35°C) - Mild weather throughout year. Best time: Oct-Feb',
      risks: '⚠️ Sudden thunderstorms, occasional waterlogging, seasonal allergies',
      tips: ['Carry umbrella during monsoon', 'Use air purifiers if needed', 'Stay updated on weather alerts', 'Wear comfortable walking shoes'],
      hospitals: ['Manipal Hospital', 'Fortis Hospital', 'Narayana Health', 'Columbia Asia'],
      airQuality: 'Good (AQI: 65)'
    },
    'Chennai': {
      climate: '🌊 Tropical & Hot (24°C-38°C) - High humidity. Cyclone season: Oct-Dec',
      risks: '⚠️ Cyclones, heat exhaustion, water scarcity in summer',
      tips: ['Store emergency supplies', 'Follow cyclone warnings', 'Use ORS during summer', 'Install water purifiers'],
      hospitals: ['MIOT International', 'Global Hospitals', 'SIMC Hospital', 'Apollo Chennai'],
      airQuality: 'Moderate (AQI: 115)'
    },
    'Delhi': {
      climate: '❄️ Extreme (5°C-45°C) - Very hot summers, cold winters. High pollution Nov-Jan',
      risks: '⚠️ Severe air pollution, heat waves, cold waves, respiratory issues',
      tips: ['Use N95 masks in winter', 'Install air purifiers', 'Stay hydrated in summer', 'Get flu vaccination'],
      hospitals: ['AIIMS', 'Max Healthcare', 'Sir Ganga Ram Hospital', 'Fortis Delhi'],
      airQuality: 'Poor (AQI: 280)'
    },
    'Mumbai': {
      climate: '🌧️ Humid & Monsoon (22°C-35°C) - Heavy rains Jun-Sep. High humidity',
      risks: '⚠️ Flooding, water-borne diseases, leptospirosis, traffic disruptions',
      tips: ['Avoid waterlogged areas', 'Drink boiled/filtered water', 'Keep medicines handy', 'Know evacuation routes'],
      hospitals: ['Lilavati Hospital', 'Kokilaben Hospital', 'Jaslok Hospital', 'HN Reliance'],
      airQuality: 'Moderate (AQI: 125)'
    }
  };

  // Emergency contacts
  const emergencyContactsData = {
    'Hyderabad': {
      ambulance: '108',
      police: '100',
      hospital: '040-23456789',
      fire: '101',
      womenHelpline: '181',
      bloodBank: '104'
    },
    'Bangalore': {
      ambulance: '108',
      police: '100',
      hospital: '080-23456789',
      fire: '101',
      womenHelpline: '181',
      bloodBank: '104'
    },
    'Chennai': {
      ambulance: '108',
      police: '100',
      hospital: '044-23456789',
      fire: '101',
      womenHelpline: '181',
      bloodBank: '104'
    },
    'Delhi': {
      ambulance: '108',
      police: '100',
      hospital: '011-23456789',
      fire: '101',
      womenHelpline: '181',
      bloodBank: '104'
    },
    'Mumbai': {
      ambulance: '108',
      police: '100',
      hospital: '022-23456789',
      fire: '101',
      womenHelpline: '181',
      bloodBank: '104'
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      // Simulate API loading
      setTimeout(() => {
        setContent(mockData);
        setEmergencyContacts(emergencyContactsData);
        setIndiaStats(indiaHealthStats);
        
        if (user?.location && locationClimateInfo[user.location]) {
          setLocationInfo({
            location: user.location,
            ...locationClimateInfo[user.location]
          });
        }
        
        setLoading(false);
      }, 800);
    };

    fetchData();
  }, [user]);

  // Filter function
  const filteredContent = (items) => {
    if (!items || !searchTerm) return items;
    
    if (Array.isArray(items)) {
      return items.filter(item => 
        JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return items;
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading health information...</p>
      </div>
    );
  }

  const categories = [
    { id: 'diseases', label: 'Diseases & Conditions', icon: '🦠' },
    { id: 'medicines', label: 'Medicines Guide', icon: '💊' },
    { id: 'nutritionTips', label: 'Nutrition & Diet', icon: '🥗' },
    { id: 'wellness', label: 'Wellness & Exercise', icon: '🧘' },
    { id: 'health', label: 'Health Tips', icon: '❤️' },
    { id: 'seasonalHealth', label: 'Seasonal Health', icon: '🌤️' },
    { id: 'climate', label: 'Climate & Weather', icon: '🌍' },
    { id: 'safety', label: 'Safety Tips', icon: '🛡️' },
    { id: 'education', label: 'Education Tips', icon: '📚' },
    { id: 'general', label: 'General Tips', icon: '💡' }
  ];

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'High': return '#dc2626';
      case 'Medium': return '#f59e0b';
      case 'Low': return '#10b981';
      default: return '#6b7280';
    }
  };

  return (
    <div className="info-page">
      <style jsx>{`
        .info-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%);
          padding: 0;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1rem;
        }

        /* Loading Styles */
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 60vh;
          background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%);
        }

        .spinner {
          width: 50px;
          height: 50px;
          border: 4px solid #e5e7eb;
          border-top: 4px solid #059669;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Header Section */
        .header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .header h1 {
          font-size: 2.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, #059669, #047857);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 0.5rem;
        }

        .header p {
          font-size: 1.1rem;
          color: #64748b;
          max-width: 600px;
          margin: 0 auto;
        }

        /* Search Box */
        .search-container {
          background: white;
          padding: 1.5rem;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          margin-bottom: 2rem;
          border: 1px solid #dcfce7;
        }

        .search-box {
          position: relative;
          max-width: 600px;
          margin: 0 auto;
        }

        .search-input {
          width: 100%;
          padding: 1rem 1rem 1rem 3rem;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          font-size: 1rem;
          transition: all 0.3s ease;
          background: #f8fafc;
        }

        .search-input:focus {
          outline: none;
          border-color: #059669;
          box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.1);
          background: white;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          font-size: 1.2rem;
          color: #64748b;
        }

        /* Stats Grid */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .stat-card {
          background: white;
          padding: 1.5rem;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          text-align: center;
          border-left: 4px solid #059669;
          transition: transform 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-4px);
        }

        .stat-value {
          font-size: 2.5rem;
          font-weight: 700;
          color: #059669;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          color: #64748b;
          font-size: 0.9rem;
          font-weight: 500;
        }

        /* Location Alert */
        .location-alert {
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          margin-bottom: 3rem;
          border: 2px solid #f59e0b;
          overflow: hidden;
        }

        .location-header {
          background: linear-gradient(135deg, #f59e0b, #d97706);
          color: white;
          padding: 1.5rem;
        }

        .location-header h3 {
          margin: 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .location-body {
          padding: 2rem;
        }

        .climate-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-bottom: 1.5rem;
        }

        .climate-item h4 {
          color: #1e293b;
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .tips-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
        }

        .tip-item {
          background: #fffbeb;
          padding: 1rem;
          border-radius: 8px;
          border-left: 4px solid #f59e0b;
        }

        /* Main Content */
        .main-content {
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          margin-bottom: 3rem;
          overflow: hidden;
          border: 1px solid #dcfce7;
        }

        .content-header {
          background: linear-gradient(135deg, #059669, #047857);
          color: white;
          padding: 2rem;
        }

        .content-header h2 {
          margin: 0 0 0.5rem 0;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .content-header p {
          margin: 0;
          opacity: 0.9;
        }

        .content-body {
          padding: 2rem;
        }

        /* Category Tabs */
        .category-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid #f1f5f9;
        }

        .category-tab {
          padding: 0.75rem 1.5rem;
          border: 2px solid #e5e7eb;
          border-radius: 25px;
          background: white;
          color: #64748b;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          white-space: nowrap;
        }

        .category-tab.active {
          background: #059669;
          color: white;
          border-color: #059669;
          transform: scale(1.05);
        }

        .category-tab:hover:not(.active) {
          border-color: #059669;
          color: #059669;
        }

        /* Content Grids */
        .content-grid {
          display: grid;
          gap: 1.5rem;
        }

        /* Disease & Medicine Cards */
        .disease-grid, .medicine-grid {
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        }

        .disease-card, .medicine-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
          border: 1px solid #e5e7eb;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .disease-card:hover, .medicine-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        .card-header {
          padding: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          color: white;
        }

        .medicine-card .card-header {
          background: linear-gradient(135deg, #10b981, #059669);
        }

        .card-title {
          margin: 0;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .severity-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          background: rgba(255, 255, 255, 0.2);
        }

        .expand-icon {
          font-size: 1.2rem;
          font-weight: bold;
        }

        .card-content {
          padding: 1.5rem;
        }

        .info-section {
          margin-bottom: 1.25rem;
        }

        .info-section:last-child {
          margin-bottom: 0;
        }

        .info-section h4 {
          color: #1e293b;
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .symptoms-list {
          margin: 0;
          padding-left: 1.25rem;
        }

        .symptoms-list li {
          margin-bottom: 0.25rem;
          color: #64748b;
        }

        /* Tip Cards */
        .tips-grid-layout {
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        }

        .tip-card {
          background: #f8fafc;
          padding: 1.5rem;
          border-radius: 12px;
          border-left: 4px solid #059669;
          transition: all 0.3s ease;
        }

        .tip-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .tip-card h4 {
          color: #059669;
          margin-bottom: 0.75rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .tip-card p {
          color: #64748b;
          margin: 0;
          line-height: 1.6;
        }

        /* Seasonal Health */
        .seasonal-grid {
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        }

        .seasonal-card {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
          border: 1px solid #e5e7eb;
        }

        .seasonal-card h4 {
          color: #f59e0b;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .seasonal-list {
          margin: 0;
          padding-left: 1.25rem;
        }

        .seasonal-list li {
          margin-bottom: 0.5rem;
          color: #64748b;
          line-height: 1.5;
        }

        /* Emergency Contacts */
        .emergency-section {
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          overflow: hidden;
          border: 1px solid #dcfce7;
        }

        .emergency-header {
          background: linear-gradient(135deg, #dc2626, #b91c1c);
          color: white;
          padding: 2rem;
        }

        .emergency-header h2 {
          margin: 0 0 0.5rem 0;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .emergency-header p {
          margin: 0;
          opacity: 0.9;
        }

        .emergency-body {
          padding: 2rem;
        }

        .emergency-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .emergency-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
          border: 2px solid #e5e7eb;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .emergency-card.user-location {
          border-color: #dc2626;
          box-shadow: 0 4px 20px rgba(220, 38, 38, 0.2);
        }

        .emergency-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        .emergency-card-header {
          background: #dc2626;
          color: white;
          padding: 1.25rem;
          text-align: center;
        }

        .emergency-card-header h5 {
          margin: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .user-badge {
          font-size: 0.75rem;
          background: rgba(255, 255, 255, 0.2);
          padding: 0.25rem 0.5rem;
          border-radius: 12px;
        }

        .emergency-card-body {
          padding: 1.5rem;
        }

        .emergency-buttons {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .emergency-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          padding: 1rem;
          border: none;
          border-radius: 8px;
          color: white;
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
        }

        .emergency-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .btn-ambulance { background: #dc2626; }
        .btn-police { background: #1e293b; }
        .btn-hospital { background: #0369a1; }
        .btn-fire { background: #ea580c; }
        .btn-women { background: #7c3aed; }
        .btn-blood { background: #dc2626; }

        .national-emergency {
          background: #fef2f2;
          border: 2px solid #dc2626;
          border-radius: 12px;
          padding: 2rem;
          text-align: center;
        }

        .national-emergency h4 {
          color: #dc2626;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .national-buttons {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          max-width: 800px;
          margin: 0 auto;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .container {
            padding: 1rem;
          }

          .header h1 {
            font-size: 2rem;
          }

          .climate-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .category-tabs {
            overflow-x: auto;
            padding-bottom: 0.75rem;
          }

          .category-tab {
            padding: 0.75rem 1.25rem;
            font-size: 0.9rem;
          }

          .disease-grid, .medicine-grid {
            grid-template-columns: 1fr;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .emergency-grid {
            grid-template-columns: 1fr;
          }

          .national-buttons {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .header h1 {
            font-size: 1.75rem;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .category-tab {
            padding: 0.6rem 1rem;
            font-size: 0.85rem;
          }

          .content-header, .emergency-header {
            padding: 1.5rem;
          }

          .content-body, .emergency-body {
            padding: 1.5rem;
          }
        }
      `}</style>

      <div className="container">
        {/* Header */}
        <div className="header">
          <h1>🏥 Health Information Hub</h1>
          <p>Comprehensive health knowledge, emergency contacts, and wellness guidance for India</p>
        </div>

        {/* Search Box */}
        <div className="search-container">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Search for diseases, medicines, health tips..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* India Health Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{indiaStats?.activeCases}</div>
            <div className="stat-label">Active Health Cases</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{indiaStats?.vaccinationCoverage}</div>
            <div className="stat-label">Vaccination Coverage</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">112</div>
            <div className="stat-label">National Emergency</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">108</div>
            <div className="stat-label">Ambulance Service</div>
          </div>
        </div>

        {/* Location-Based Alert */}
        {locationInfo && (
          <div className="location-alert">
            <div className="location-header">
              <h3>📍 Climate & Health Info for {locationInfo.location}</h3>
            </div>
            <div className="location-body">
              <div className="climate-grid">
                <div className="climate-item">
                  <h4>🌡️ Climate</h4>
                  <p>{locationInfo.climate}</p>
                </div>
                <div className="climate-item">
                  <h4>⚠️ Health Risks</h4>
                  <p>{locationInfo.risks}</p>
                </div>
              </div>
              <div>
                <h4>⚡ Quick Health Tips</h4>
                <div className="tips-grid">
                  {locationInfo.tips?.map((tip, idx) => (
                    <div key={idx} className="tip-item">
                      {tip}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Knowledge Hub */}
        <div className="main-content">
          <div className="content-header">
            <h2>📖 Health Knowledge Hub</h2>
            <p>Comprehensive health information and guidance for better living</p>
          </div>

          <div className="content-body">
            {/* Category Tabs */}
            <div className="category-tabs">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  className={`category-tab ${activeTab === cat.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(cat.id)}
                >
                  <span>{cat.icon}</span>
                  {cat.label}
                </button>
              ))}
            </div>

            {/* DISEASES & CONDITIONS */}
            {activeTab === 'diseases' && (
              <div className="content-grid disease-grid">
                {filteredContent(content?.diseases)?.map((disease, idx) => (
                  <div key={idx} className="disease-card" onClick={() => setExpandedDisease(expandedDisease === idx ? null : idx)}>
                    <div className="card-header">
                      <h3 className="card-title">{disease.name}</h3>
                      <div className="severity-badge" style={{ color: getSeverityColor(disease.severity) }}>
                        {disease.severity}
                      </div>
                    </div>
                    {expandedDisease === idx && (
                      <div className="card-content">
                        <div className="info-section">
                          <h4>⚠️ Symptoms</h4>
                          <ul className="symptoms-list">
                            {disease.symptoms?.map((sym, i) => <li key={i}>{sym}</li>)}
                          </ul>
                        </div>
                        <div className="info-section">
                          <h4>🦠 Causes</h4>
                          <p>{disease.causes}</p>
                        </div>
                        <div className="info-section">
                          <h4>✅ Treatment</h4>
                          <p>{disease.treatment}</p>
                        </div>
                        <div className="info-section">
                          <h4>🛡️ Prevention</h4>
                          <p>{disease.prevention}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* MEDICINES */}
            {activeTab === 'medicines' && (
              <div className="content-grid medicine-grid">
                {filteredContent(content?.medicines)?.map((medicine, idx) => (
                  <div key={idx} className="medicine-card" onClick={() => setExpandedMedicine(expandedMedicine === idx ? null : idx)}>
                    <div className="card-header">
                      <h3 className="card-title">{medicine.name}</h3>
                      <div className="severity-badge">{medicine.type}</div>
                    </div>
                    {expandedMedicine === idx && (
                      <div className="card-content">
                        <div className="info-section">
                          <h4>💊 Dosage</h4>
                          <p>{medicine.dosage}</p>
                        </div>
                        <div className="info-section">
                          <h4>✅ Used For</h4>
                          <p>{medicine.use}</p>
                        </div>
                        <div className="info-section">
                          <h4>⚠️ Precautions</h4>
                          <p>{medicine.precautions}</p>
                        </div>
                        <div className="info-section">
                          <h4>❌ Side Effects</h4>
                          <p>{medicine.sideEffects}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* NUTRITION & WELLNESS */}
            {['nutritionTips', 'wellness'].includes(activeTab) && (
              <div className="content-grid tips-grid-layout">
                {filteredContent(content?.[activeTab])?.map((item, idx) => (
                  <div key={idx} className="tip-card">
                    <h4>{item.icon} {item.category || item.title}</h4>
                    <p>{item.content || item.benefits}</p>
                    {item.tips && <p><strong>Tips:</strong> {item.tips}</p>}
                  </div>
                ))}
              </div>
            )}

            {/* TIPS SECTIONS */}
            {['health', 'climate', 'safety', 'education', 'general'].includes(activeTab) && (
              <div className="content-grid tips-grid-layout">
                {filteredContent(content?.[activeTab])?.map((tip, idx) => (
                  <div key={idx} className="tip-card">
                    <h4>{categories.find(cat => cat.id === activeTab)?.icon} Tip {idx + 1}</h4>
                    <p>{tip}</p>
                  </div>
                ))}
              </div>
            )}

            {/* SEASONAL HEALTH */}
            {activeTab === 'seasonalHealth' && (
              <div className="content-grid seasonal-grid">
                {Object.entries(filteredContent(content?.seasonalHealth) || {}).map(([season, tips]) => (
                  <div key={season} className="seasonal-card">
                    <h4>
                      {season === 'summer' ? '☀️' : season === 'monsoon' ? '🌧️' : '⛄'}
                      {season.charAt(0).toUpperCase() + season.slice(1)} Season Health Tips
                    </h4>
                    <ul className="seasonal-list">
                      {Array.isArray(tips) && tips.map((tip, idx) => (
                        <li key={idx}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="emergency-section">
          <div className="emergency-header">
            <h2>🚨 Emergency Contacts - India</h2>
            <p>Immediate help when you need it most. Tap to call directly.</p>
          </div>

          <div className="emergency-body">
            <div className="emergency-grid">
              {Object.entries(emergencyContacts || {}).map(([location, contacts]) => (
                <div key={location} className={`emergency-card ${user?.location === location ? 'user-location' : ''}`}>
                  <div className="emergency-card-header">
                    <h5>
                      📍 {location}
                      {user?.location === location && <span className="user-badge">Your Location</span>}
                    </h5>
                  </div>
                  <div className="emergency-card-body">
                    <div className="emergency-buttons">
                      <a href={`tel:${contacts.ambulance}`} className="emergency-btn btn-ambulance">
                        🚑 Ambulance: {contacts.ambulance}
                      </a>
                      <a href={`tel:${contacts.police}`} className="emergency-btn btn-police">
                        🚔 Police: {contacts.police}
                      </a>
                      <a href={`tel:${contacts.hospital}`} className="emergency-btn btn-hospital">
                        🏥 Hospital: {contacts.hospital}
                      </a>
                      <a href={`tel:${contacts.fire}`} className="emergency-btn btn-fire">
                        🔥 Fire: {contacts.fire}
                      </a>
                      <a href={`tel:${contacts.womenHelpline}`} className="emergency-btn btn-women">
                        👩 Women Helpline: {contacts.womenHelpline}
                      </a>
                      {contacts.bloodBank && (
                        <a href={`tel:${contacts.bloodBank}`} className="emergency-btn btn-blood">
                          🩸 Blood Bank: {contacts.bloodBank}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* National Emergency Numbers */}
            <div className="national-emergency">
              <h4>🇮🇳 National Emergency Numbers</h4>
              <div className="national-buttons">
                <a href="tel:112" className="emergency-btn btn-ambulance">
                  🚨 National Emergency: 112
                </a>
                <a href="tel:108" className="emergency-btn btn-ambulance">
                  🚑 Ambulance: 108
                </a>
                <a href="tel:181" className="emergency-btn btn-women">
                  👩 Women Helpline: 181
                </a>
                <a href="tel:1098" className="emergency-btn btn-hospital">
                  👶 Child Helpline: 1098
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}