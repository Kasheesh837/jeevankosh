import { useState } from 'react';

export default function Contact() {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const faqs = [
    {
      question: "Is Jeevankosh a substitute for a doctor?",
      answer: "No. Jeevankosh provides guidance and information only. Always consult a qualified doctor for diagnosis and treatment. For emergencies, call 108 immediately."
    },
    {
      question: "Is my health data safe and private?",
      answer: "Yes. All your health data is encrypted and stored securely. We never sell or share your personal health information with third parties. Your privacy is our top priority."
    },
    {
      question: "What languages are supported?",
      answer: "We support Hindi, Telugu, Kannada, Tamil, and English. The system automatically detects your language and responds in the same language for both text and voice interactions."
    },
    {
      question: "Is Jeevankosh free to use?",
      answer: "Currently, Jeevankosh is completely free for all users. We may introduce premium features in the future, but core health guidance and emergency services will always remain free."
    },
    {
      question: "How do I report a technical problem?",
      answer: "Email us at support@jeevankosh.in with details of the issue, including screenshots if possible. Our technical team typically responds within 24 hours."
    },
    {
      question: "Can I use Jeevankosh for emergency medical help?",
      answer: "While we provide emergency contact information and guidance, Jeevankosh is not a substitute for emergency medical services. Always call 108 for life-threatening situations."
    }
  ];

  return (
    <div className="contact-page">
      <style jsx>{`
        .contact-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%);
          padding: 2rem 1rem;
        }

        .container {
          max-width: 1000px;
          margin: 0 auto;
        }

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
          margin-bottom: 1rem;
        }

        .header p {
          font-size: 1.1rem;
          color: #64748b;
          max-width: 600px;
          margin: 0 auto;
        }

        /* Contact Cards */
        .contact-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .contact-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          padding: 2rem;
          border: 1px solid #dcfce7;
          transition: all 0.3s ease;
        }

        .contact-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
        }

        .card-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .card-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #059669;
          margin-bottom: 1rem;
        }

        .card-content {
          color: #64748b;
          line-height: 1.6;
        }

        .card-content strong {
          color: #1e293b;
        }

        /* Office Section */
        .office-section {
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          padding: 2rem;
          margin-bottom: 3rem;
          border: 1px solid #dcfce7;
        }

        .office-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .office-icon {
          font-size: 2rem;
        }

        .office-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1e293b;
          margin: 0;
        }

        .office-content {
          color: #64748b;
          line-height: 1.6;
        }

        .office-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-top: 1.5rem;
        }

        .office-location {
          background: #f8fafc;
          padding: 1rem;
          border-radius: 8px;
          border-left: 4px solid #059669;
        }

        .office-location strong {
          color: #059669;
        }

        /* FAQ Section */
        .faq-section {
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          padding: 2rem;
          margin-bottom: 2rem;
          border: 1px solid #dcfce7;
        }

        .faq-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .faq-icon {
          font-size: 2rem;
        }

        .faq-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1e293b;
          margin: 0;
        }

        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .faq-item {
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .faq-item.active {
          border-color: #059669;
          box-shadow: 0 4px 12px rgba(5, 150, 105, 0.1);
        }

        .faq-question {
          background: #f8fafc;
          padding: 1.5rem;
          border: none;
          width: 100%;
          text-align: left;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 1rem;
          font-weight: 500;
          color: #1e293b;
          transition: all 0.3s ease;
        }

        .faq-question:hover {
          background: #f1f5f9;
        }

        .faq-arrow {
          font-size: 1.2rem;
          transition: transform 0.3s ease;
        }

        .faq-item.active .faq-arrow {
          transform: rotate(180deg);
        }

        .faq-answer {
          padding: 0 1.5rem;
          max-height: 0;
          overflow: hidden;
          transition: all 0.3s ease;
          color: #64748b;
          line-height: 1.6;
        }

        .faq-item.active .faq-answer {
          padding: 1.5rem;
          max-height: 500px;
        }

        /* Emergency Alert */
        .emergency-alert {
          background: linear-gradient(135deg, #fef3c7, #fde68a);
          border: 2px solid #f59e0b;
          border-radius: 12px;
          padding: 1.5rem;
          text-align: center;
          margin-bottom: 2rem;
        }

        .emergency-icon {
          font-size: 2rem;
          margin-bottom: 1rem;
        }

        .emergency-title {
          color: #92400e;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .emergency-content {
          color: #92400e;
          margin: 0;
        }

        /* Quick Actions */
        .quick-actions {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-top: 2rem;
        }

        .action-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          padding: 1rem 1.5rem;
          background: #059669;
          color: white;
          text-decoration: none;
          border-radius: 10px;
          font-weight: 600;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
        }

        .action-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(5, 150, 105, 0.3);
          color: white;
        }

        .action-btn.secondary {
          background: #3b82f6;
        }

        .action-btn.outline {
          background: transparent;
          border: 2px solid #059669;
          color: #059669;
        }

        .action-btn.outline:hover {
          background: #059669;
          color: white;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .contact-page {
            padding: 1rem;
          }

          .header h1 {
            font-size: 2rem;
          }

          .contact-cards {
            grid-template-columns: 1fr;
          }

          .office-grid {
            grid-template-columns: 1fr;
          }

          .quick-actions {
            grid-template-columns: 1fr;
          }

          .contact-card, .office-section, .faq-section {
            padding: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .header h1 {
            font-size: 1.75rem;
          }

          .faq-question {
            padding: 1.25rem;
            font-size: 0.95rem;
          }

          .faq-item.active .faq-answer {
            padding: 1.25rem;
          }
        }
      `}</style>

      <div className="container">
        {/* Header */}
        <div className="header">
          <h1>📞 Contact Jeevankosh</h1>
          <p>We're here to help you with any questions or concerns about your health journey</p>
        </div>

        {/* Contact Methods */}
        <div className="contact-cards">
          <div className="contact-card">
            <div className="card-icon">📧</div>
            <h3 className="card-title">Email Support</h3>
            <div className="card-content">
              <p><strong>General Support:</strong><br/>support@jeevankosh.in</p>
              <p><strong>Feedback & Suggestions:</strong><br/>feedback@jeevankosh.in</p>
              <p><strong>Partnerships:</strong><br/>partners@jeevankosh.in</p>
              <p><strong>Technical Issues:</strong><br/>tech@jeevankosh.in</p>
            </div>
          </div>

          <div className="contact-card">
            <div className="card-icon">📱</div>
            <h3 className="card-title">Phone & Live Chat</h3>
            <div className="card-content">
              <p><strong>Support Hotline:</strong><br/>+91-40-9876-5432</p>
              <p><strong>Emergency Guidance:</strong><br/>+91-40-9876-5433</p>
              <p><strong>Operating Hours:</strong><br/>24/7 (Calls answered 7AM-11PM)</p>
              <p><strong>Languages Supported:</strong><br/>English, Hindi, Telugu, Tamil, Kannada</p>
            </div>
          </div>

          <div className="contact-card">
            <div className="card-icon">💬</div>
            <h3 className="card-title">Live Chat & Social</h3>
            <div className="card-content">
              <p><strong>In-App Chat:</strong><br/>Available 24/7 in the app</p>
              <p><strong>WhatsApp Business:</strong><br/>+91-98765-43210</p>
              <p><strong>Response Time:</strong><br/>Typically within 2 hours</p>
              <p><strong>Social Media:</strong><br/>@JeevankoshOfficial</p>
            </div>
          </div>
        </div>

        {/* Office Address */}
        <div className="office-section">
          <div className="office-header">
            <div className="office-icon">🏢</div>
            <h2 className="office-title">Office Locations</h2>
          </div>
          <div className="office-content">
            <p><strong>Headquarters:</strong><br/>
            Jeevankosh - AI Health Platform<br/>
            Tech Park, HITEC City<br/>
            Hyderabad, Telangana 500032<br/>
            India</p>
            
            <div className="office-grid">
              <div className="office-location">
                <strong>📍 Bangalore</strong><br/>
                Manyata Tech Park<br/>
                Bengaluru, Karnataka
              </div>
              <div className="office-location">
                <strong>📍 Chennai</strong><br/>
                DLF IT Park<br/>
                Chennai, Tamil Nadu
              </div>
              <div className="office-location">
                <strong>📍 Delhi</strong><br/>
                Cyber City<br/>
                Gurugram, Haryana
              </div>
              <div className="office-location">
                <strong>📍 Mumbai</strong><br/>
                Mindspace<br/>
                Mumbai, Maharashtra
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="faq-section">
          <div className="faq-header">
            <div className="faq-icon">❓</div>
            <h2 className="faq-title">Frequently Asked Questions</h2>
          </div>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className={`faq-item ${activeAccordion === index ? 'active' : ''}`}>
                <button className="faq-question" onClick={() => toggleAccordion(index)}>
                  {faq.question}
                  <span className="faq-arrow">▼</span>
                </button>
                <div className="faq-answer">
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Alert */}
        <div className="emergency-alert">
          <div className="emergency-icon">🚨</div>
          <h4 className="emergency-title">Medical Emergency?</h4>
          <p className="emergency-content">
            Don't use this contact form for emergencies. Call 108 for ambulance or visit the nearest hospital immediately.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <a href="mailto:support@jeevankosh.in" className="action-btn">
            📧 Email Support
          </a>
          <a href="tel:+914098765432" className="action-btn secondary">
            📞 Call Now
          </a>
          <button className="action-btn outline" onClick={() => window.open('/chat', '_self')}>
            💬 Live Chat
          </button>
          <button className="action-btn outline" onClick={() => window.open('/info', '_self')}>
            🏥 Emergency Contacts
          </button>
        </div>
      </div>
    </div>
  );
}