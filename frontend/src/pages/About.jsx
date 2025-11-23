export default function About() {
  return (
    <div className="about-page">
      <style jsx>{`
        .about-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%);
          padding: 2rem 0;
        }

        .about-container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .about-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .about-title {
          font-size: 3rem;
          font-weight: 700;
          background: linear-gradient(135deg, #059669, #047857);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 1rem;
        }

        .about-subtitle {
          font-size: 1.2rem;
          color: #64748b;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .content-grid {
          display: grid;
          gap: 2rem;
        }

        .mission-vision-cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        @media (max-width: 768px) {
          .mission-vision-cards {
            grid-template-columns: 1fr;
          }
        }

        .mission-card, .vision-card {
          background: white;
          padding: 2rem;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border: 1px solid #dcfce7;
          text-align: center;
        }

        .card-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .card-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #059669;
          margin-bottom: 1rem;
        }

        .card-content {
          color: #64748b;
          line-height: 1.6;
        }

        .section {
          background: white;
          padding: 2rem;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border: 1px solid #dcfce7;
          margin-bottom: 2rem;
        }

        .section-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .section-title-icon {
          font-size: 1.5rem;
        }

        .how-it-works {
          display: grid;
          gap: 1.5rem;
        }

        .step-card {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1.5rem;
          background: #f8fafc;
          border-radius: 12px;
          border-left: 4px solid #059669;
        }

        .step-number {
          background: #059669;
          color: white;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 0.9rem;
          flex-shrink: 0;
        }

        .step-content h4 {
          color: #1e293b;
          margin-bottom: 0.5rem;
          font-size: 1.1rem;
        }

        .step-content p {
          color: #64748b;
          line-height: 1.6;
          margin: 0;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1rem;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem;
          background: #f0fdf4;
          border-radius: 8px;
          border: 1px solid #dcfce7;
        }

        .feature-icon {
          color: #059669;
          font-size: 1.2rem;
        }

        .feature-text {
          color: #374151;
          font-weight: 500;
        }

        .team-section {
          text-align: center;
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-top: 1.5rem;
        }

        .team-member {
          text-align: center;
        }

        .member-avatar {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #059669, #047857);
          border-radius: 50%;
          margin: 0 auto 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.5rem;
          font-weight: 600;
        }

        .member-role {
          color: #059669;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .member-name {
          color: #1e293b;
          font-weight: 500;
        }

        .privacy-card {
          background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
          border: 1px solid #bae6fd;
          border-radius: 12px;
          padding: 1.5rem;
        }

        .support-section {
          text-align: center;
          background: linear-gradient(135deg, #fffbeb, #fef3c7);
          border: 1px solid #fcd34d;
          border-radius: 12px;
          padding: 2rem;
        }

        .support-title {
          color: #92400e;
          margin-bottom: 1rem;
        }

        .support-email {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #059669;
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 25px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .support-email:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(5, 150, 105, 0.3);
          color: white;
        }

        .emergency-alert {
          background: linear-gradient(135deg, #fef2f2, #fee2e2);
          border: 1px solid #fecaca;
          border-radius: 12px;
          padding: 1.5rem;
          text-align: center;
          margin-top: 2rem;
        }

        .emergency-title {
          color: #dc2626;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .emergency-content {
          color: #991b1b;
          margin: 0;
        }

        @media (max-width: 768px) {
          .about-title {
            font-size: 2.5rem;
          }
          
          .about-subtitle {
            font-size: 1.1rem;
          }
          
          .mission-card, .vision-card, .section {
            padding: 1.5rem;
          }
          
          .features-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .about-page {
            padding: 1rem 0;
          }
          
          .about-container {
            padding: 0 1rem;
          }
          
          .about-title {
            font-size: 2rem;
          }
          
          .step-card {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>

      <div className="about-container">
        {/* Header */}
        <div className="about-header">
          <h1 className="about-title">Jeevankosh</h1>
          <p className="about-subtitle">
            Your AI-powered health companion making medical guidance accessible 
            to every Indian in their native language
          </p>
        </div>

        <div className="content-grid">
          {/* Mission & Vision */}
          <div className="mission-vision-cards">
            <div className="mission-card">
              <div className="card-icon">🎯</div>
              <h2 className="card-title">Our Mission</h2>
              <p className="card-content">
                Make AI-powered health and safety guidance accessible to every Indian, 
                regardless of literacy level or language spoken. Technology should serve everyone.
              </p>
            </div>
            
            <div className="vision-card">
              <div className="card-icon">🌍</div>
              <h2 className="card-title">Our Vision</h2>
              <p className="card-content">
                A world where Indian communities can access reliable, instant, multilingual 
                guidance on health, safety, and emergencies from their smartphones.
              </p>
            </div>
          </div>

          {/* How It Works */}
          <div className="section">
            <h2 className="section-title">
              <span className="section-title-icon">💡</span>
              How It Works
            </h2>
            <div className="how-it-works">
              <div className="step-card">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h4>Voice-First Design</h4>
                  <p>Ask questions in your own language using voice or text input</p>
                </div>
              </div>
              
              <div className="step-card">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h4>AI Processing</h4>
                  <p>Google Gemini AI understands and responds intelligently to your health queries</p>
                </div>
              </div>
              
              <div className="step-card">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h4>Multilingual Response</h4>
                  <p>Always get answers in the same language you asked, with voice output support</p>
                </div>
              </div>
              
              <div className="step-card">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h4>Emergency Support</h4>
                  <p>Instant access to hospitals, police, and ambulance contacts in your area</p>
                </div>
              </div>
              
              <div className="step-card">
                <div className="step-number">5</div>
                <div className="step-content">
                  <h4>Community Alerts</h4>
                  <p>Get real-time alerts about health and safety issues in your locality</p>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="section">
            <h2 className="section-title">
              <span className="section-title-icon">🎯</span>
              Key Features
            </h2>
            <div className="features-grid">
              <div className="feature-item">
                <span className="feature-icon">🏥</span>
                <span className="feature-text">Health guidance & symptom assistance</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">💊</span>
                <span className="feature-text">Medication information & dosage guidance</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🚨</span>
                <span className="feature-text">Emergency contact directory</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">📚</span>
                <span className="feature-text">Educational support & explanations</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🌦️</span>
                <span className="feature-text">Climate & weather safety tips</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🛡️</span>
                <span className="feature-text">Public safety instructions</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🔔</span>
                <span className="feature-text">Community health alerts</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🗣️</span>
                <span className="feature-text">Voice input/output in 5 languages</span>
              </div>
            </div>
          </div>

          {/* Privacy & Security */}
          <div className="section">
            <h2 className="section-title">
              <span className="section-title-icon">🛡️</span>
              Privacy & Security
            </h2>
            <div className="privacy-card">
              <p>
                Your health information is confidential and encrypted. We never share your personal 
                data with third parties. All queries are stored securely and used only to improve 
                your experience and generate anonymous community health alerts.
              </p>
            </div>
          </div>

          {/* Team */}
          <div className="section team-section">
            <h2 className="section-title">
              <span className="section-title-icon">👥</span>
              Our Team
            </h2>
            <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
              Built by passionate professionals committed to bridging the digital health divide in India
            </p>
            <div className="team-grid">
              <div className="team-member">
                <div className="member-avatar">MD</div>
                <div className="member-role">Medical Director</div>
                <div className="member-name">Dr. Medical Expert</div>
              </div>
              <div className="team-member">
                <div className="member-avatar">AI</div>
                <div className="member-role">AI Engineer</div>
                <div className="member-name">Tech Specialist</div>
              </div>
              <div className="team-member">
                <div className="member-avatar">CD</div>
                <div className="member-role">Community Director</div>
                <div className="member-name">Community Advocate</div>
              </div>
              <div className="team-member">
                <div className="member-avatar">UX</div>
                <div className="member-role">UX Designer</div>
                <div className="member-name">Design Expert</div>
              </div>
            </div>
          </div>

          {/* Support */}
          <div className="support-section">
            <h3 className="support-title">Need Help?</h3>
            <p style={{ color: '#92400e', marginBottom: '1.5rem' }}>
              Our support team is here to help you with any questions
            </p>
            <a href="mailto:support@jeevankosh.in" className="support-email">
              <span>📧</span>
              support@jeevankosh.in
            </a>
          </div>

          {/* Emergency Alert */}
          <div className="emergency-alert">
            <h4 className="emergency-title">⚠️ Important Medical Notice</h4>
            <p className="emergency-content">
              Jeevankosh provides health guidance only and is not a substitute for professional medical care. 
              For emergencies, always call 108 (Ambulance) or visit a hospital immediately.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}