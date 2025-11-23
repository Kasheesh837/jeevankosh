import { useNavigate } from 'react-router-dom';

export default function PublicHome() {
  const navigate = useNavigate();

  const css = `
    :root {
      --primary-blue: #1e40af;
      --primary-dark: #1e3a8a;
      --primary-light: #3b82f6;
      --accent-gold: #f59e0b;
      --accent-light: #fbbf24;
      --bg-light: #f8fafc;
      --bg-white: #ffffff;
      --text-dark: #1e293b;
      --text-muted: #64748b;
      --text-light: #f1f5f9;
      --border-light: #e2e8f0;
      --radius-lg: 16px;
      --radius-md: 12px;
      --shadow-sm: 0 2px 8px rgba(0,0,0,0.06);
      --shadow-md: 0 8px 30px rgba(0,0,0,0.08);
      --shadow-lg: 0 16px 40px rgba(0,0,0,0.12);
      --gradient-primary: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
      --gradient-gold: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
      --gradient-light: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      background: var(--bg-white);
      font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
      line-height: 1.6;
      color: var(--text-dark);
      overflow-x: hidden;
    }

    .public-home {
      min-height: 100vh;
    }

    /* Hero Section */
    .hero-section {
      background: var(--gradient-primary);
      padding: 120px 0 80px;
      position: relative;
      overflow: hidden;
    }

    .hero-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E");
    }

    .hero-content {
      position: relative;
      z-index: 2;
    }

    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(10px);
      color: white;
      padding: 8px 16px;
      border-radius: 50px;
      font-size: 0.9rem;
      font-weight: 500;
      margin-bottom: 24px;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .hero-title {
      font-size: 3.5rem;
      font-weight: 800;
      color: white;
      margin-bottom: 16px;
      line-height: 1.1;
      letter-spacing: -0.02em;
    }

    .hero-title .highlight {
      background: var(--gradient-gold);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .hero-subtitle {
      font-size: 1.3rem;
      color: rgba(255, 255, 255, 0.9);
      margin-bottom: 32px;
      line-height: 1.6;
      max-width: 600px;
    }

    .hero-description {
      font-size: 1.1rem;
      color: rgba(255, 255, 255, 0.8);
      margin-bottom: 40px;
      max-width: 500px;
      line-height: 1.7;
    }

    .hero-buttons {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
    }

    .btn-primary {
      background: var(--gradient-gold);
      border: none;
      padding: 16px 32px;
      border-radius: var(--radius-md);
      color: white;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: var(--shadow-md);
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-lg);
    }

    .btn-secondary {
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(10px);
      border: 2px solid rgba(255, 255, 255, 0.3);
      padding: 16px 32px;
      border-radius: var(--radius-md);
      color: white;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.25);
      transform: translateY(-2px);
    }

    .hero-stats {
      display: flex;
      gap: 40px;
      margin-top: 60px;
      flex-wrap: wrap;
    }

    .stat-item {
      display: flex;
      flex-direction: column;
      color: white;
    }

    .stat-number {
      font-size: 2.5rem;
      font-weight: 700;
      color: var(--accent-light);
    }

    .stat-label {
      font-size: 0.9rem;
      opacity: 0.9;
    }

    /* Features Section */
    .features-section {
      padding: 100px 0;
      background: var(--bg-light);
    }

    .section-header {
      text-align: center;
      margin-bottom: 80px;
    }

    .section-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: var(--gradient-primary);
      color: white;
      padding: 8px 20px;
      border-radius: 50px;
      font-size: 0.9rem;
      font-weight: 600;
      margin-bottom: 16px;
    }

    .section-title {
      font-size: 2.8rem;
      font-weight: 700;
      color: var(--text-dark);
      margin-bottom: 16px;
      line-height: 1.2;
    }

    .section-subtitle {
      font-size: 1.2rem;
      color: var(--text-muted);
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.6;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 30px;
      margin-top: 50px;
    }

    .feature-card {
      background: var(--bg-white);
      padding: 40px 30px;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-sm);
      transition: all 0.3s ease;
      border: 1px solid var(--border-light);
      text-align: center;
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
      background: var(--gradient-primary);
    }

    .feature-card:hover {
      transform: translateY(-8px);
      box-shadow: var(--shadow-lg);
    }

    .feature-icon {
      width: 80px;
      height: 80px;
      background: var(--gradient-primary);
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      margin: 0 auto 24px;
      box-shadow: var(--shadow-md);
    }

    .feature-card h3 {
      font-size: 1.4rem;
      font-weight: 600;
      color: var(--text-dark);
      margin-bottom: 16px;
    }

    .feature-card p {
      color: var(--text-muted);
      line-height: 1.6;
    }

    /* CTA Section */
    .cta-section {
      padding: 100px 0;
      background: var(--gradient-primary);
      text-align: center;
      position: relative;
      overflow: hidden;
    }

    .cta-content {
      position: relative;
      z-index: 2;
      max-width: 800px;
      margin: 0 auto;
    }

    .cta-title {
      font-size: 2.5rem;
      font-weight: 700;
      color: white;
      margin-bottom: 20px;
      line-height: 1.2;
    }

    .cta-subtitle {
      font-size: 1.2rem;
      color: rgba(255, 255, 255, 0.9);
      margin-bottom: 40px;
      line-height: 1.6;
    }

    .cta-buttons {
      display: flex;
      gap: 16px;
      justify-content: center;
      flex-wrap: wrap;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .hero-section {
        padding: 100px 0 60px;
      }

      .hero-title {
        font-size: 2.5rem;
      }

      .hero-subtitle {
        font-size: 1.1rem;
      }

      .hero-buttons {
        flex-direction: column;
        align-items: flex-start;
      }

      .btn-primary, .btn-secondary {
        width: 100%;
        justify-content: center;
      }

      .hero-stats {
        gap: 20px;
        justify-content: space-between;
      }

      .stat-number {
        font-size: 2rem;
      }

      .section-title {
        font-size: 2.2rem;
      }

      .features-grid {
        grid-template-columns: 1fr;
        gap: 20px;
      }

      .feature-card {
        padding: 30px 20px;
      }

      .cta-title {
        font-size: 2rem;
      }

      .cta-buttons {
        flex-direction: column;
      }
    }

    @media (max-width: 480px) {
      .hero-title {
        font-size: 2rem;
      }

      .section-title {
        font-size: 1.8rem;
      }

      .features-grid {
        grid-template-columns: 1fr;
      }
    }

    /* Accessibility */
    @media (prefers-reduced-motion: reduce) {
      .feature-card,
      .btn-primary,
      .btn-secondary {
        transition: none;
        transform: none;
      }
    }

    /* Focus styles */
    .btn-primary:focus-visible,
    .btn-secondary:focus-visible {
      outline: 3px solid var(--accent-gold);
      outline-offset: 2px;
    }
  `;

  const features = [
    {
      icon: "🎤",
      title: "Voice Support",
      description: "Speak your questions naturally and get responses in your preferred Indian language with advanced speech recognition."
    },
    {
      icon: "🌍",
      title: "Multilingual AI",
      description: "Available in Telugu, Kannada, Tamil, Hindi, and English with culturally relevant health guidance."
    },
    {
      icon: "🚨",
      title: "Emergency Assistance",
      description: "Instant access to local emergency contacts, hospitals, and crisis support services across India."
    },
    {
      icon: "🧠",
      title: "AI-Powered Insights",
      description: "Powered by Gemini AI for accurate, contextual health information and personalized recommendations."
    },
    {
      icon: "📚",
      title: "Knowledge Repository",
      description: "Comprehensive library of 50+ health guides, safety protocols, and government health schemes."
    },
    {
      icon: "⚠️",
      title: "Community Alerts",
      description: "Real-time safety alerts, health advisories, and emergency notifications for your region."
    }
  ];

  return (
    <div className="public-home">
      <style>{css}</style>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <span>🔬</span>
              Government Certified Health Platform
            </div>
            
            <h1 className="hero-title">
              Transforming Healthcare with{' '}
              <span className="highlight">AI-Powered Assistance</span>
            </h1>
            
            <p className="hero-subtitle">
              Jeevankosh - Your trusted multilingual health companion powered by advanced AI technology
            </p>
            
            <p className="hero-description">
              Get instant health guidance, educational support, safety information, and emergency assistance in your native language. Serving Indian communities with cutting-edge technology.
            </p>

            <div className="hero-buttons">
              <button 
                className="btn-primary"
                onClick={() => navigate('/signup')}
                aria-label="Get Started with Jeevankosh"
              >
                <span>🚀</span>
                Get Started Free
              </button>
              
              <button 
                className="btn-secondary"
                onClick={() => navigate('/login')}
                aria-label="Login to your account"
              >
                <span>🔑</span>
                Existing User Login
              </button>
            </div>

            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-number">50K+</div>
                <div className="stat-label">Active Users</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">5</div>
                <div className="stat-label">Languages</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">24/7</div>
                <div className="stat-label">Support</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">100+</div>
                <div className="stat-label">Cities Covered</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">
              <span>✨</span>
              Why Choose Jeevankosh?
            </div>
            <h2 className="section-title">Comprehensive Health Solutions</h2>
            <p className="section-subtitle">
              Designed specifically for Indian communities with features that matter most to you and your family's wellbeing
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Experience Better Healthcare?</h2>
            <p className="cta-subtitle">
              Join thousands of Indian families who trust Jeevankosh for their daily health guidance and emergency support needs
            </p>
            
            <div className="cta-buttons">
              <button 
                className="btn-primary"
                onClick={() => navigate('/signup')}
                aria-label="Create your account now"
              >
                <span>📝</span>
                Create Your Account
              </button>
              
              <button 
                className="btn-secondary"
                onClick={() => navigate('/login')}
                aria-label="Login to existing account"
              >
                <span>→</span>
                Already Registered? Login
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}