import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard({ user }) {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Simulate weather data - in real app, fetch from API
    const simulatedWeather = {
      temperature: 28,
      condition: 'Partly Cloudy',
      icon: '⛅'
    };
    setWeather(simulatedWeather);

    return () => clearInterval(timer);
  }, []);

  const featureCategories = [
    {
      category: 'health',
      title: '🏥 Health Services',
      features: [
        { 
          icon: '💬', 
          title: 'AI Health Assistant', 
          desc: 'Get instant health guidance in your language', 
          path: '/chat',
          badge: 'AI Powered',
          gradient: 'linear-gradient(135deg, #10b981, #059669)'
        },
        { 
          icon: '🩺', 
          title: 'Symptom Checker', 
          desc: 'Understand your symptoms and get recommendations', 
          path: '/symptoms',
          badge: 'Quick Assessment',
          gradient: 'linear-gradient(135deg, #3b82f6, #2563eb)'
        },
        { 
          icon: '📚', 
          title: 'Health Library', 
          desc: 'Comprehensive health guides and resources', 
          path: '/info',
          badge: '50+ Guides',
          gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)'
        }
      ]
    },
    {
      category: 'emergency',
      title: '🚨 Emergency Services',
      features: [
        { 
          icon: '📞', 
          title: 'Emergency Contacts', 
          desc: 'Immediate access to local emergency services', 
          path: '/emergency',
          badge: 'Critical',
          gradient: 'linear-gradient(135deg, #ef4444, #dc2626)'
        },
        { 
          icon: '🏥', 
          title: 'Nearby Hospitals', 
          desc: 'Find hospitals and clinics near your location', 
          path: '/hospitals',
          badge: 'Location-based',
          gradient: 'linear-gradient(135deg, #f59e0b, #d97706)'
        },
        { 
          icon: '🚑', 
          title: 'First Aid Guide', 
          desc: 'Step-by-step emergency first aid instructions', 
          path: '/first-aid',
          badge: 'Life Saving',
          gradient: 'linear-gradient(135deg, #ec4899, #db2777)'
        }
      ]
    },
    {
      category: 'community',
      title: '👥 Community & Alerts',
      features: [
        { 
          icon: '⚠️', 
          title: 'Health Alerts', 
          desc: 'Real-time community health advisories', 
          path: '/alerts',
          badge: 'Live Updates',
          gradient: 'linear-gradient(135deg, #f97316, #ea580c)'
        },
        { 
          icon: '📊', 
          title: 'Health History', 
          desc: 'Your past queries and health interactions', 
          path: '/history',
          badge: 'Personalized',
          gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)'
        },
        { 
          icon: '🌡️', 
          title: 'Disease Outbreaks', 
          desc: 'Track disease outbreaks in your region', 
          path: '/outbreaks',
          badge: 'Regional',
          gradient: 'linear-gradient(135deg, #84cc16, #65a30d)'
        }
      ]
    }
  ];

  const quickStats = [
    { icon: '🕒', label: 'Response Time', value: '< 2s', desc: 'AI Response' },
    { icon: '🌍', label: 'Languages', value: '5', desc: 'Supported' },
    { icon: '🏙️', label: 'Cities', value: '100+', desc: 'Covered' },
    { icon: '👥', label: 'Active Users', value: '50K+', desc: 'This Month' }
  ];

  const supportedLanguages = [
    { code: 'hi', name: 'हिंदी', native: 'Hindi' },
    { code: 'te', name: 'తెలుగు', native: 'Telugu' },
    { code: 'ta', name: 'தமிழ்', native: 'Tamil' },
    { code: 'kn', name: 'ಕನ್ನಡ', native: 'Kannada' },
    { code: 'en', name: 'English', native: 'English' }
  ];

  const css = `
    .dashboard-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
      padding: 2rem 0;
    }

    .welcome-section {
      background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
      color: white;
      border-radius: 20px;
      padding: 2.5rem;
      margin-bottom: 2rem;
      position: relative;
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(30, 64, 175, 0.2);
    }

    .welcome-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E");
    }

    .welcome-content {
      position: relative;
      z-index: 2;
    }

    .welcome-greeting {
      font-size: 2.5rem;
      font-weight: 800;
      margin-bottom: 0.5rem;
      line-height: 1.1;
    }

    .welcome-subtitle {
      font-size: 1.2rem;
      opacity: 0.9;
      margin-bottom: 1.5rem;
    }

    .user-info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
      margin-top: 2rem;
    }

    .info-card {
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 12px;
      padding: 1.25rem;
      color: white;
    }

    .info-label {
      font-size: 0.9rem;
      opacity: 0.8;
      margin-bottom: 0.5rem;
    }

    .info-value {
      font-size: 1.1rem;
      font-weight: 600;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 1rem;
      margin-bottom: 3rem;
    }

    .stat-card {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      text-align: center;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      border: 1px solid #e2e8f0;
      transition: all 0.3s ease;
    }

    .stat-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
    }

    .stat-icon {
      font-size: 2rem;
      margin-bottom: 0.75rem;
    }

    .stat-value {
      font-size: 1.5rem;
      font-weight: 700;
      color: #1e40af;
      margin-bottom: 0.25rem;
    }

    .stat-label {
      font-size: 0.9rem;
      color: #64748b;
      font-weight: 500;
    }

    .stat-desc {
      font-size: 0.8rem;
      color: #94a3b8;
      margin-top: 0.25rem;
    }

    .category-section {
      margin-bottom: 3rem;
    }

    .category-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 2px solid #e2e8f0;
    }

    .category-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: #1e293b;
      margin: 0;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .feature-card {
      background: white;
      border-radius: 16px;
      padding: 2rem;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
      border: 1px solid #e2e8f0;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }

    .feature-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
    }

    .feature-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.15);
    }

    .feature-header {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .feature-icon {
      width: 60px;
      height: 60px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.75rem;
      flex-shrink: 0;
    }

    .feature-text {
      flex: 1;
    }

    .feature-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 0.5rem;
      line-height: 1.3;
    }

    .feature-badge {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      background: #f1f5f9;
      color: #64748b;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    .feature-desc {
      color: #64748b;
      line-height: 1.5;
      margin-bottom: 1.5rem;
    }

    .feature-action {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #3b82f6;
      font-weight: 600;
      font-size: 0.9rem;
      transition: all 0.3s ease;
    }

    .feature-card:hover .feature-action {
      color: #1e40af;
      transform: translateX(4px);
    }

    .info-section {
      background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
      border: 1px solid #bae6fd;
      border-radius: 16px;
      padding: 2.5rem;
      margin-bottom: 2rem;
    }

    .info-title {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 1.5rem;
      font-weight: 700;
      color: #0369a1;
      margin-bottom: 1.5rem;
    }

    .guide-steps {
      display: grid;
      gap: 1rem;
    }

    .guide-step {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      padding: 1rem;
      background: rgba(255, 255, 255, 0.7);
      border-radius: 10px;
      border-left: 4px solid #0ea5e9;
    }

    .step-number {
      width: 32px;
      height: 32px;
      background: #0ea5e9;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      flex-shrink: 0;
    }

    .step-content {
      flex: 1;
    }

    .step-title {
      font-weight: 600;
      color: #0c4a6e;
      margin-bottom: 0.25rem;
    }

    .step-desc {
      color: #475569;
      font-size: 0.9rem;
      line-height: 1.5;
    }

    .languages-section {
      background: white;
      border-radius: 16px;
      padding: 2rem;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
      border: 1px solid #e2e8f0;
    }

    .languages-title {
      text-align: center;
      font-size: 1.5rem;
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }

    .languages-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 1rem;
    }

    .language-card {
      background: #f8fafc;
      border: 2px solid #e2e8f0;
      border-radius: 12px;
      padding: 1.5rem;
      text-align: center;
      transition: all 0.3s ease;
    }

    .language-card:hover {
      border-color: #3b82f6;
      background: white;
      transform: translateY(-2px);
    }

    .language-name {
      font-size: 1.1rem;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 0.25rem;
    }

    .language-native {
      color: #64748b;
      font-size: 0.9rem;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .dashboard-container {
        padding: 1rem;
      }

      .welcome-section {
        padding: 2rem 1.5rem;
      }

      .welcome-greeting {
        font-size: 2rem;
      }

      .user-info-grid {
        grid-template-columns: 1fr;
      }

      .stats-grid {
        grid-template-columns: repeat(2, 1fr);
      }

      .features-grid {
        grid-template-columns: 1fr;
      }

      .info-section {
        padding: 2rem 1.5rem;
      }

      .languages-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 480px) {
      .stats-grid {
        grid-template-columns: 1fr;
      }

      .languages-grid {
        grid-template-columns: 1fr;
      }

      .feature-header {
        flex-direction: column;
        text-align: center;
      }

      .feature-icon {
        align-self: center;
      }
    }

    /* Accessibility */
    @media (prefers-reduced-motion: reduce) {
      .feature-card,
      .stat-card,
      .language-card {
        transition: none;
        transform: none;
      }
    }

    .feature-card:focus-visible {
      outline: 3px solid #f59e0b;
      outline-offset: 2px;
    }
  `;

  return (
    <div className="dashboard-container">
      <style>{css}</style>
      
      <div className="container">
        {/* Welcome Section */}
        <div className="welcome-section">
          <div className="welcome-content">
            <h1 className="welcome-greeting">
              👋 Welcome back, {user?.name || 'User'}!
            </h1>
            <p className="welcome-subtitle">
              Your trusted AI-powered health and safety companion
            </p>
            
            <div className="user-info-grid">
              <div className="info-card">
                <div className="info-label">📍 Current Location</div>
                <div className="info-value">{user?.location || 'Not set'}</div>
              </div>
              <div className="info-card">
                <div className="info-label">🕒 Current Time</div>
                <div className="info-value">
                  {currentTime.toLocaleTimeString('en-IN', { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    second: '2-digit'
                  })}
                </div>
              </div>
              <div className="info-card">
                <div className="info-label">📅 Today's Date</div>
                <div className="info-value">
                  {currentTime.toLocaleDateString('en-IN', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
              {weather && (
                <div className="info-card">
                  <div className="info-label">{weather.icon} Weather</div>
                  <div className="info-value">
                    {weather.temperature}°C • {weather.condition}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="stats-grid">
          {quickStats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-desc">{stat.desc}</div>
            </div>
          ))}
        </div>

        {/* Categorized Features */}
        {featureCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="category-section">
            <div className="category-header">
              <h2 className="category-title">{category.title}</h2>
            </div>
            
            <div className="features-grid">
              {category.features.map((feature, featureIndex) => (
                <div
                  key={featureIndex}
                  className="feature-card"
                  onClick={() => navigate(feature.path)}
                  tabIndex={0}
                  onKeyPress={(e) => e.key === 'Enter' && navigate(feature.path)}
                  role="button"
                  aria-label={`Open ${feature.title}`}
                >
                  <div className="feature-header">
                    <div 
                      className="feature-icon"
                      style={{ background: feature.gradient }}
                    >
                      {feature.icon}
                    </div>
                    <div className="feature-text">
                      <h3 className="feature-title">{feature.title}</h3>
                      <span className="feature-badge">{feature.badge}</span>
                      <p className="feature-desc">{feature.desc}</p>
                    </div>
                  </div>
                  <div className="feature-action">
                    <span>Get Started</span>
                    <span>→</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* How to Use Section */}
        <div className="info-section">
          <h3 className="info-title">
            <span>ℹ️</span>
            How to Use Jeevankosh
          </h3>
          
          <div className="guide-steps">
            <div className="guide-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <div className="step-title">Ask Your Question</div>
                <div className="step-desc">
                  Use the AI Chat to ask health, safety, or emergency questions in your preferred language
                </div>
              </div>
            </div>
            
            <div className="guide-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <div className="step-title">Get AI-Powered Response</div>
                <div className="step-desc">
                  Receive instant, accurate guidance powered by Gemini AI with severity assessment
                </div>
              </div>
            </div>
            
            <div className="guide-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <div className="step-title">Access Health Resources</div>
                <div className="step-desc">
                  Browse comprehensive health guides, emergency contacts, and community alerts
                </div>
              </div>
            </div>
            
            <div className="guide-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <div className="step-title">Emergency Assistance</div>
                <div className="step-desc">
                  Get immediate access to local emergency services and first aid guidance
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Supported Languages */}
        <div className="languages-section">
          <h3 className="languages-title">
            <span>🌍</span>
            Supported Languages
          </h3>
          
          <div className="languages-grid">
            {supportedLanguages.map((language, index) => (
              <div key={index} className="language-card">
                <div className="language-name">{language.name}</div>
                <div className="language-native">{language.native}</div>
              </div>
            ))}
          </div>
          
          <p style={{ 
            textAlign: 'center', 
            color: '#64748b', 
            marginTop: '1.5rem',
            fontSize: '0.9rem'
          }}>
            Ask in any language - we'll respond in the same language with culturally relevant guidance
          </p>
        </div>
      </div>
    </div>
  );
}