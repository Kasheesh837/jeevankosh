import axios from 'axios';
import { useEffect, useState } from 'react';

const API_BASE = 'http://localhost:5000';

export default function Alerts({ user }) {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [expandedAlert, setExpandedAlert] = useState(null);

  useEffect(() => {
    fetchAlerts();
    // Refresh every 30 seconds
    const interval = setInterval(fetchAlerts, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchAlerts = async () => {
    try {
      console.log('🔍 Fetching alerts for location:', user?.location);
      
      const response = await axios.get(`${API_BASE}/alerts`, {
        params: { location: user?.location || '' }
      });
      
      console.log('✅ Alerts API response:', response.data);
      
      // Handle both { alerts } and direct array response
      const alertsData = response.data?.alerts || response.data;
      const alertsArray = Array.isArray(alertsData) ? alertsData : [];
      
      console.log('📊 Processed alerts:', alertsArray);
      setAlerts(alertsArray);
    } catch (error) {
      console.error('❌ Failed to fetch alerts:');
      console.error('   Status:', error.response?.status);
      console.error('   Data:', error.response?.data);
      console.error('   Message:', error.message);
      
      // Show error message to user - use mock data as fallback
      setAlerts([]);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryBadge = (category) => {
    const badges = {
      health: 'bg-danger',
      climate: 'bg-warning',
      safety: 'bg-dark',
      education: 'bg-info',
      general: 'bg-secondary'
    };
    return badges[category] || 'bg-secondary';
  };

  const getSeverityColor = (severity) => {
    const colors = {
      high: '#dc3545',
      medium: '#ffc107',
      low: '#198754'
    };
    return colors[severity] || '#6c757d';
  };

  // Extract symptoms/conditions from query texts
  const extractSymptoms = (queries) => {
    if (!queries || queries.length === 0) return [];
    const symptoms = new Set();
    queries.forEach(q => {
      if (q.text) {
        // Extract common symptoms mentioned
        const text = q.text.toLowerCase();
        if (text.match(/fever|temperature|temp/i)) symptoms.add('Fever');
        if (text.match(/cough|cold|flu/i)) symptoms.add('Cough/Cold');
        if (text.match(/headache|head pain/i)) symptoms.add('Headache');
        if (text.match(/stomach|belly|digestion/i)) symptoms.add('Stomach issues');
        if (text.match(/rash|skin/i)) symptoms.add('Rash/Skin issue');
        if (text.match(/joint|pain|ache|body pain/i)) symptoms.add('Joint/Body pain');
        if (text.match(/eye|vision|sight/i)) symptoms.add('Eye problem');
        if (text.match(/breathing|breath|respiratory/i)) symptoms.add('Breathing issue');
        if (text.match(/diarrhea|loose motion/i)) symptoms.add('Diarrhea');
        if (text.match(/vomiting|nausea/i)) symptoms.add('Vomiting/Nausea');
      }
    });
    return Array.from(symptoms);
  };

  const filteredAlerts = filter === 'all' 
    ? alerts 
    : alerts.filter(a => a.category === filter);

  return (
    <div className="container-main">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card">
            <div className="card-header bg-danger text-white">
              <h5 className="mb-0">🚨 Community Alerts</h5>
            </div>

            <div className="card-body">
              <div className="mb-4">
                <div className="btn-group" role="group">
                  {['all', 'health', 'climate', 'safety', 'education', 'general'].map(cat => (
                    <button
                      key={cat}
                      type="button"
                      className={`btn btn-sm ${filter === cat ? 'btn-danger' : 'btn-outline-danger'}`}
                      onClick={() => setFilter(cat)}
                    >
                      {cat === 'all' ? '📊 All' : cat}
                    </button>
                  ))}
                </div>
              </div>

              {loading && (
                <div className="text-center py-5">
                  <div className="spinner-border"></div>
                </div>
              )}

              {!loading && filteredAlerts.length === 0 && (
                <div className="alert alert-info" style={{ backgroundColor: '#e7f3ff', borderColor: '#b3d9ff', color: '#004085' }}>
                  <strong>ℹ️ No Active Alerts</strong>
                  <p style={{ marginTop: '0.5rem', marginBottom: 0 }}>
                    When community members report similar health issues in your area, alerts will appear here. 
                    Community alerts trigger when 5+ people ask about the same health concern in 2 hours.
                  </p>
                </div>
              )}

              <div className="row g-3">
                {filteredAlerts.map((alert, idx) => {
                  const symptoms = extractSymptoms(alert.queries);
                  const isExpanded = expandedAlert === idx;
                  
                  return (
                    <div key={idx} className="col-md-6">
                      <div 
                        className="alert-card card h-100" 
                        style={{ 
                          borderLeftColor: getSeverityColor(alert.severity),
                          borderLeftWidth: '5px',
                          cursor: 'pointer'
                        }}
                        onClick={() => setExpandedAlert(isExpanded ? null : idx)}
                      >
                        <div className="card-body">
                          {/* Header with location and severity */}
                          <div className="d-flex justify-content-between align-items-start mb-3">
                            <div>
                              <h6 className="card-title mb-1">
                                📍 {alert.area}
                              </h6>
                              <span className={`badge ${getCategoryBadge(alert.category)}`}>
                                {alert.category.toUpperCase()}
                              </span>
                            </div>
                            <span 
                              className="badge"
                              style={{ background: getSeverityColor(alert.severity) }}
                            >
                              🔴 {alert.severity.toUpperCase()}
                            </span>
                          </div>

                          {/* Alert stats */}
                          <div className="alert alert-warning py-2 mb-3">
                            <strong>⚠️ {alert.count} people</strong> reported similar issues in the last 2 hours
                          </div>

                          {/* Symptoms/Health issues detected */}
                          {symptoms.length > 0 && (
                            <div className="mb-3">
                              <small className="d-block fw-bold text-danger mb-2">🏥 Health Issues Detected:</small>
                              <div className="d-flex flex-wrap gap-2">
                                {symptoms.map((symptom, i) => (
                                  <span key={i} className="badge bg-danger-light text-dark" style={{ background: '#ffe5e5' }}>
                                    {symptom}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Timestamp */}
                          <small className="text-muted d-block mb-2">
                            🕐 {new Date(alert.detectedAt).toLocaleString()}
                          </small>

                          {/* Expandable queries */}
                          {alert.queries && alert.queries.length > 0 && (
                            <div className={`mt-3 pt-3 border-top ${isExpanded ? '' : 'collapsed-queries'}`}>
                              <small className="d-block fw-bold mb-2">
                                📋 Sample queries ({alert.queries.length}):
                                <span className="float-end text-muted">{isExpanded ? '▼' : '▶'}</span>
                              </small>
                              {isExpanded && (
                                <ul className="small mb-0 ps-3">
                                  {alert.queries.slice(0, 5).map((q, i) => (
                                    <li key={i} className="mb-1" title={q.text}>
                                      <strong>•</strong> {q.text.substring(0, 50)}
                                      {q.text.length > 50 ? '...' : ''}
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          )}

                          {/* Health recommendations */}
                          {alert.category === 'health' && alert.severity === 'high' && (
                            <div className="alert alert-danger mt-3 py-2">
                              <small>
                                <strong>✓ Recommendation:</strong> Please consult a healthcare provider if you experience similar symptoms.
                              </small>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="card mt-4">
            <div className="card-body">
              <h6>ℹ️ How Health Alerts Work</h6>
              <ul className="small mb-0">
                <li><strong>Real-time Detection:</strong> When 5+ people ask about similar health issues in your area within 2 hours, we trigger an alert</li>
                <li><strong>Symptom Analysis:</strong> The alert shows what symptoms people are reporting (fever, cough, stomach issues, etc.)</li>
                <li><strong>Severity Levels:</strong>
                  <ul>
                    <li>🔴 <strong>HIGH:</strong> Many cases detected - seek medical help if symptoms appear</li>
                    <li>🟡 <strong>MEDIUM:</strong> Some cases - stay cautious and follow hygiene</li>
                    <li>🟢 <strong>LOW:</strong> Few cases - monitor situation</li>
                  </ul>
                </li>
                <li><strong>Action:</strong> Check emergency contacts or consult a healthcare provider if you or family members show similar symptoms</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
