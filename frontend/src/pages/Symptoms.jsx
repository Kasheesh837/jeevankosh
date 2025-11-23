import axios from 'axios';
import { useState } from 'react';

const API_BASE = 'http://localhost:5000';

export default function Symptoms({ user }) {
  const [symptoms, setSymptoms] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [duration, setDuration] = useState('');
  const [severity, setSeverity] = useState('mild');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const availableSymptoms = [
    'Fever', 'Cough', 'Cold', 'Headache', 'Body Pain', 'Fatigue',
    'Sore Throat', 'Runny Nose', 'Stomach Pain', 'Nausea',
    'Vomiting', 'Diarrhea', 'Rash', 'Eye Irritation', 'Shortness of Breath',
    'Chest Pain', 'Dizziness', 'Loss of Appetite', 'Joint Pain', 'Skin Itching'
  ];

  // Mock diagnosis data based on symptoms
  const getMockDiagnosis = (selectedSymptoms, severity) => {
    const symptomsStr = selectedSymptoms.join(' ').toLowerCase();
    
    if (symptomsStr.includes('fever') && symptomsStr.includes('cough')) {
      return {
        possibleConditions: [
          { name: 'Common Cold', probability: '60%', severity: 'Low' },
          { name: 'Flu (Influenza)', probability: '25%', severity: 'Medium' },
          { name: 'COVID-19', probability: '10%', severity: 'Medium' },
          { name: 'Bronchitis', probability: '5%', severity: 'Medium' }
        ],
        recommendedMedicines: [
          { name: 'Paracetamol', dosage: '500mg', frequency: '3 times daily', cost: '₹20-50', purpose: 'For fever & pain' },
          { name: 'Cough Syrup (Ascoril)', dosage: '10ml', frequency: '3 times daily', cost: '₹80-120', purpose: 'For cough relief' },
          { name: 'Vitamin C', dosage: '500mg', frequency: 'Twice daily', cost: '₹30-60', purpose: 'Immune support' },
          { name: 'Honey', dosage: '1 spoon', frequency: '3 times daily', cost: '₹100-200', purpose: 'Throat relief' }
        ],
        doctorSpecialists: [
          { type: 'General Physician', urgency: 'Non-urgent', timing: 'Within 2-3 days' },
          { type: 'ENT Specialist', urgency: 'If symptoms persist', timing: 'After 5-7 days' }
        ],
        recommendations: [
          'Rest for 5-7 days',
          'Drink plenty of warm water and fluids',
          'Use steam inhalation for congestion',
          'Avoid cold foods and dairy products',
          'Take honey and ginger regularly',
          'Monitor temperature twice daily',
          'Isolate if COVID-19 is suspected',
          'Avoid public places for 3-5 days'
        ]
      };
    } else if (symptomsStr.includes('stomach') || symptomsStr.includes('nausea') || symptomsStr.includes('diarrhea')) {
      return {
        possibleConditions: [
          { name: 'Gastroenteritis', probability: '70%', severity: 'Low to Medium' },
          { name: 'Food Poisoning', probability: '20%', severity: 'Medium' },
          { name: 'Indigestion', probability: '10%', severity: 'Low' }
        ],
        recommendedMedicines: [
          { name: 'Omeprazole', dosage: '20mg', frequency: 'Once daily', cost: '₹40-80', purpose: 'Reduce stomach acid' },
          { name: 'Imodium/Loperamide', dosage: '2mg', frequency: 'After each loose motion', cost: '₹30-60', purpose: 'Stop diarrhea' },
          { name: 'ORS (Oral Rehydration)', dosage: '1 sachet', frequency: 'As needed', cost: '₹10-20', purpose: 'Rehydration' },
          { name: 'Ginger Powder', dosage: '½ tsp', frequency: '3 times daily', cost: '₹50-100', purpose: 'Digestion aid' }
        ],
        doctorSpecialists: [
          { type: 'General Physician', urgency: 'Urgent if severe', timing: 'Same day if needed' },
          { type: 'Gastroenterologist', urgency: 'If symptoms persist > 3 days', timing: 'Within 3-5 days' }
        ],
        recommendations: [
          'Stay hydrated - drink water, coconut water, buttermilk',
          'Eat bland foods - rice, curd, salt',
          'Avoid spicy, oily, and dairy foods',
          'Rest and avoid heavy meals',
          'Monitor for signs of severe dehydration',
          'Maintain hygiene and handwashing',
          'Keep toilet seat clean',
          'If symptoms persist > 3 days, seek medical help'
        ]
      };
    } else if (symptomsStr.includes('headache')) {
      return {
        possibleConditions: [
          { name: 'Tension Headache', probability: '60%', severity: 'Low' },
          { name: 'Migraine', probability: '30%', severity: 'Medium' },
          { name: 'Sinus Headache', probability: '10%', severity: 'Low to Medium' }
        ],
        recommendedMedicines: [
          { name: 'Paracetamol', dosage: '500mg', frequency: '3 times daily', cost: '₹20-50', purpose: 'Pain relief' },
          { name: 'Ibuprofen', dosage: '200-400mg', frequency: '3 times daily', cost: '₹30-80', purpose: 'Anti-inflammatory' },
          { name: 'Aspirin', dosage: '300-500mg', frequency: 'Once or twice daily', cost: '₹20-40', purpose: 'Quick relief' },
          { name: 'Peppermint Oil', dosage: 'Topical', frequency: 'As needed', cost: '₹100-150', purpose: 'Cooling effect' }
        ],
        doctorSpecialists: [
          { type: 'General Physician', urgency: 'If persistent', timing: 'Within 3-5 days' },
          { type: 'Neurologist', urgency: 'If recurring', timing: 'Within 1-2 weeks' }
        ],
        recommendations: [
          'Get adequate rest and sleep (7-8 hours)',
          'Avoid stress and anxiety',
          'Stay hydrated',
          'Apply warm compress to temples',
          'Avoid bright lights and loud sounds',
          'Practice relaxation techniques',
          'Maintain regular meal schedule',
          'Limit screen time'
        ]
      };
    } else if (symptomsStr.includes('rash') || symptomsStr.includes('itching')) {
      return {
        possibleConditions: [
          { name: 'Allergic Reaction', probability: '50%', severity: 'Low to Medium' },
          { name: 'Fungal Infection', probability: '30%', severity: 'Low to Medium' },
          { name: 'Eczema', probability: '20%', severity: 'Low' }
        ],
        recommendedMedicines: [
          { name: 'Calamine Lotion', dosage: 'Topical', frequency: 'As needed', cost: '₹40-80', purpose: 'Itch relief' },
          { name: 'Cetirizine', dosage: '10mg', frequency: 'Once daily', cost: '₹20-50', purpose: 'Anti-allergy' },
          { name: 'Antifungal Cream', dosage: 'Topical', frequency: 'Twice daily', cost: '₹100-200', purpose: 'Fungal treatment' },
          { name: 'Hydrocortisone Cream', dosage: 'Topical 1%', frequency: 'Twice daily', cost: '₹80-150', purpose: 'Inflammation relief' }
        ],
        doctorSpecialists: [
          { type: 'Dermatologist', urgency: 'If spreading or severe', timing: 'Within 2-3 days' },
          { type: 'General Physician', urgency: 'For initial assessment', timing: 'Within 3-5 days' }
        ],
        recommendations: [
          'Keep the affected area clean and dry',
          'Avoid scratching the rash',
          'Use lukewarm water for bathing',
          'Apply moisturizer to prevent drying',
          'Wear cotton clothing',
          'Avoid irritants and strong soaps',
          'Maintain hygiene',
          'Consult doctor if rash spreads or doesn\'t improve in 5-7 days'
        ]
      };
    } else {
      return {
        possibleConditions: [
          { name: 'General Viral Infection', probability: '50%', severity: 'Low to Medium' },
          { name: 'Fatigue/Stress', probability: '35%', severity: 'Low' },
          { name: 'Requires More Information', probability: '15%', severity: 'Variable' }
        ],
        recommendedMedicines: [
          { name: 'Multivitamin', dosage: '1 tablet', frequency: 'Once daily', cost: '₹50-100', purpose: 'General health' },
          { name: 'Vitamin C Tablets', dosage: '500mg', frequency: 'Twice daily', cost: '₹30-60', purpose: 'Immune support' },
          { name: 'Calcium & Magnesium', dosage: 'As per label', frequency: 'Once daily', cost: '₹100-200', purpose: 'Mineral supplement' },
          { name: 'Ginseng/Ashwagandha', dosage: 'As per label', frequency: 'Once daily', cost: '₹150-300', purpose: 'Energy & stress relief' }
        ],
        doctorSpecialists: [
          { type: 'General Physician', urgency: 'For full assessment', timing: 'Within 5-7 days' }
        ],
        recommendations: [
          'Maintain a healthy diet with fruits and vegetables',
          'Get 7-8 hours of quality sleep',
          'Exercise regularly (30 minutes daily)',
          'Stay hydrated (8-10 glasses of water)',
          'Manage stress through yoga or meditation',
          'Avoid smoking and alcohol',
          'Maintain hygiene',
          'Schedule a routine checkup with your doctor'
        ]
      };
    }
  };

  const handleSymptomToggle = (symptom) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleAnalyze = async () => {
    if (selectedSymptoms.length === 0) {
      setError('Please select at least one symptom');
      return;
    }

    if (!duration) {
      setError('Please specify how long you have these symptoms');
      return;
    }

    setError('');
    setLoading(true);

    try {
      // Call backend API to analyze symptoms using Gemini
      const response = await axios.post(`${API_BASE}/ai/analyze-symptoms`, {
        symptoms: selectedSymptoms,
        duration,
        severity
      });

      if (response.data.success && response.data.analysis) {
        setResult(response.data.analysis);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      console.error('Symptom analysis error:', err);
      // Fallback to mock data if API fails
      const diagnosis = getMockDiagnosis(selectedSymptoms, severity);
      setResult(diagnosis);
      setError(err.message || 'Using standard analysis (API unavailable). Consult a doctor for proper diagnosis.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedSymptoms([]);
    setDuration('');
    setSeverity('mild');
    setResult(null);
    setError('');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', padding: '2rem 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
          color: 'white',
          borderRadius: '16px',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: '0 10px 30px rgba(37, 99, 235, 0.2)'
        }}>
          <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem' }}>
            🩺 Symptom Checker
          </h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>
            Describe your symptoms and get instant AI-powered analysis
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(600px, 1fr))', gap: '2rem' }}>
          {/* Input Section */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
            border: '1px solid #e2e8f0'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem', color: '#1e293b' }}>
              Select Your Symptoms
            </h2>

            {/* Symptoms Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
              gap: '1rem',
              marginBottom: '2rem'
            }}>
              {availableSymptoms.map(symptom => (
                <label key={symptom} style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '1rem',
                  background: selectedSymptoms.includes(symptom) ? '#dbeafe' : '#f8fafc',
                  border: `2px solid ${selectedSymptoms.includes(symptom) ? '#3b82f6' : '#e2e8f0'}`,
                  borderRadius: '10px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}>
                  <input
                    type="checkbox"
                    checked={selectedSymptoms.includes(symptom)}
                    onChange={() => handleSymptomToggle(symptom)}
                    style={{ marginRight: '0.5rem', cursor: 'pointer' }}
                  />
                  <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>{symptom}</span>
                </label>
              ))}
            </div>

            {/* Duration */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#1e293b' }}>
                How long have you had these symptoms?
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
              >
                <option value="">Select duration...</option>
                <option value="less-24h">Less than 24 hours</option>
                <option value="1-3d">1-3 days</option>
                <option value="3-7d">3-7 days</option>
                <option value="1-2w">1-2 weeks</option>
                <option value="more-2w">More than 2 weeks</option>
              </select>
            </div>

            {/* Severity */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#1e293b' }}>
                Severity Level
              </label>
              <div style={{ display: 'flex', gap: '1rem' }}>
                {['mild', 'moderate', 'severe'].map(level => (
                  <label key={level} style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                      type="radio"
                      name="severity"
                      value={level}
                      checked={severity === level}
                      onChange={(e) => setSeverity(e.target.value)}
                      style={{ marginRight: '0.5rem' }}
                    />
                    <span style={{ textTransform: 'capitalize' }}>{level}</span>
                  </label>
                ))}
              </div>
            </div>

            {error && (
              <div style={{
                background: '#fee2e2',
                color: '#991b1b',
                padding: '1rem',
                borderRadius: '8px',
                marginBottom: '1rem',
                border: '1px solid #fecaca'
              }}>
                ⚠️ {error}
              </div>
            )}

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={handleAnalyze}
                disabled={loading}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  background: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  opacity: loading ? 0.5 : 1
                }}
              >
                {loading ? 'Analyzing...' : '🔍 Analyze Symptoms'}
              </button>
              <button
                onClick={handleReset}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: '#e2e8f0',
                  color: '#1e293b',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Reset
              </button>
            </div>
          </div>

          {/* Results Section */}
          {result && (
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '2rem',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
              border: '1px solid #e2e8f0',
              maxHeight: '80vh',
              overflowY: 'auto'
            }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem', color: '#1e293b' }}>
                ✅ Analysis Results
              </h2>

              {/* Possible Conditions */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem', color: '#1e293b' }}>
                  📋 Possible Conditions
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {result.possibleConditions.map((cond, idx) => (
                    <div key={idx} style={{
                      background: '#f0fdf4',
                      padding: '1rem',
                      borderRadius: '8px',
                      border: '1px solid #bbf7d0'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                        <span style={{ fontWeight: '600' }}>{cond.name}</span>
                        <span style={{ background: '#10b981', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.85rem' }}>
                          {cond.probability}
                        </span>
                      </div>
                      <small style={{ color: '#64748b' }}>Severity: {cond.severity}</small>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Medicines */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem', color: '#1e293b' }}>
                  💊 Recommended Medicines
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {result.recommendedMedicines.map((med, idx) => (
                    <div key={idx} style={{
                      background: '#eff6ff',
                      padding: '1rem',
                      borderRadius: '8px',
                      border: '1px solid #bfdbfe'
                    }}>
                      <div style={{ fontWeight: '600', marginBottom: '0.5rem' }}>{med.name}</div>
                      <div style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: '1.6' }}>
                        <div>📏 Dosage: {med.dosage}</div>
                        <div>⏰ Frequency: {med.frequency}</div>
                        <div>💰 Cost: {med.cost}</div>
                        <div>ℹ️ Purpose: {med.purpose}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Doctor Specialists */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem', color: '#1e293b' }}>
                  👨‍⚕️ Recommended Doctors
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {result.doctorSpecialists.map((doctor, idx) => (
                    <div key={idx} style={{
                      background: '#fef3c7',
                      padding: '1rem',
                      borderRadius: '8px',
                      border: '1px solid #fcd34d'
                    }}>
                      <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>{doctor.type}</div>
                      <div style={{ fontSize: '0.9rem', color: '#64748b' }}>
                        🔴 {doctor.urgency} | ⏱️ {doctor.timing}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem', color: '#1e293b' }}>
                  ✓ Health Recommendations
                </h3>
                <ul style={{ paddingLeft: '1.5rem', lineHeight: '2' }}>
                  {result.recommendations.map((rec, idx) => (
                    <li key={idx} style={{ color: '#475569', fontSize: '0.95rem' }}>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{
                background: '#fef2f2',
                padding: '1rem',
                borderRadius: '8px',
                marginTop: '1.5rem',
                border: '1px solid #fecaca',
                color: '#991b1b',
                fontSize: '0.9rem'
              }}>
                ⚠️ <strong>Disclaimer:</strong> This is an AI-powered preliminary assessment. It is not a medical diagnosis. Please consult a qualified healthcare professional for proper diagnosis and treatment.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
