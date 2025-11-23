import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

const API_BASE = 'http://localhost:5000';

export default function Chat({ user }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [inputLanguage, setInputLanguage] = useState('en-IN');
  const [listeningStatus, setListeningStatus] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [showQuickActions, setShowQuickActions] = useState(true);
  const chatEndRef = useRef(null);

  // Language codes for Web Speech API
  const languages = {
    'en-IN': '🇮🇳 English',
    'hi-IN': '🇮🇳 Hindi',
    'te-IN': '🇮🇳 Telugu',
    'ta-IN': '🇮🇳 Tamil',
    'kn-IN': '🇮🇳 Kannada',
  };

  // Health-focused quick actions
  const quickActions = [
    {
      category: 'symptoms',
      icon: '🤒',
      title: 'Symptom Checker',
      questions: [
        'Fever and headache',
        'Stomach pain',
        'Cough and cold',
        'Skin problems'
      ]
    },
    {
      category: 'emergency',
      icon: '🚑',
      title: 'Emergency',
      questions: [
        'Heart attack signs',
        'Severe bleeding',
        'Allergic reaction',
        'Stroke symptoms'
      ]
    },
    {
      category: 'medication',
      icon: '💊',
      title: 'Medication',
      questions: [
        'Medicine dosage',
        'Side effects',
        'When to take',
        'Drug interactions'
      ]
    }
  ];

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = true;
      rec.lang = inputLanguage;

      rec.onstart = () => {
        setIsListening(true);
        setListeningStatus('🎙️ Listening...');
      };
      
      rec.onend = () => {
        setIsListening(false);
        setListeningStatus('');
      };

      rec.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setInput(transcript);
      };

      rec.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setListeningStatus('❌ Error: ' + event.error);
        setIsListening(false);
      };

      setRecognition(rec);
    }

    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, inputLanguage]);

  const startListening = () => {
    if (recognition) {
      setInput('');
      recognition.lang = inputLanguage;
      try {
        recognition.start();
      } catch (error) {
        console.error('Recognition start error:', error);
      }
    }
  };

  const handleQuickAction = (question) => {
    setInput(question);
    // Auto-send after short delay
    setTimeout(() => handleSendMessage(question), 100);
  };

  const handleSendMessage = async (customInput = null) => {
    const messageText = customInput || input;
    if (!messageText.trim() || loading) return;

    // Check if user data is available
    if (!user || !user.userId || !user.location) {
      console.error('❌ User data incomplete:', user);
      setMessages(prev => [...prev, {
        type: 'bot',
        text: 'Error: User data is missing. Please login again.',
        category: 'error',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      return;
    }

    setMessages(prev => [...prev, { 
      type: 'user', 
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    
    if (!customInput) {
      setInput('');
    }
    
    setLoading(true);

    try {
      console.log('📤 Sending query to backend:', { userId: user.userId, text: messageText, location: user.location });
      const response = await axios.post(`${API_BASE}/ai/query`, {
        userId: user.userId,
        text: messageText,
        location: user.location
      });

      const { category, language, answer, severity, suggestions, emergencyContact } = response.data;

      const botMessage = {
        type: 'bot',
        text: answer,
        category: category || 'general',
        language,
        severity,
        suggestions,
        emergencyContact,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMessage]);

      // Text-to-speech
      if (window.speechSynthesis) {
        const utterance = new SpeechSynthesisUtterance(answer);
        const langMap = {
          'te': 'te-IN', 'ta': 'ta-IN', 'kn': 'kn-IN', 'hi': 'hi-IN', 'en': 'en-IN',
        };
        utterance.lang = langMap[language] || 'en-IN';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
      }
    } catch (error) {
      console.error('❌ Chat error:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      
      let errorMessage = 'Sorry, I encountered an error. Please try again.';
      
      if (error.response?.status === 400) {
        errorMessage = 'Invalid request. Please check your input and location.';
      } else if (error.response?.status === 500) {
        errorMessage = 'Server error. The backend service might be offline. Please try again later.';
      } else if (error.message === 'Network Error') {
        errorMessage = 'Cannot connect to backend. Please ensure backend server is running on port 5000.';
      }
      
      setMessages(prev => [...prev, {
        type: 'bot',
        text: errorMessage,
        category: 'error',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setLoading(false);
    }
  };

  const filteredMessages = activeCategory === 'all' 
    ? messages 
    : messages.filter(msg => msg.category === activeCategory);

  return (
    <div className="chat-app">
      <style jsx>{`
        .chat-app {
          height: 100vh;
          background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%);
          display: flex;
          flex-direction: column;
        }

        /* Header */
        .chat-header {
          background: linear-gradient(135deg, #059669 0%, #047857 100%);
          color: white;
          padding: 1rem;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1200px;
          margin: 0 auto;
        }

        .header-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.25rem;
          font-weight: 600;
        }

        .mobile-toggle {
          background: rgba(255,255,255,0.2);
          border: none;
          border-radius: 8px;
          padding: 0.5rem;
          color: white;
          cursor: pointer;
          display: none;
        }

        /* Main Content */
        .chat-main {
          flex: 1;
          display: flex;
          overflow: hidden;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }

        /* Quick Actions Sidebar */
        .quick-actions-sidebar {
          width: 300px;
          background: white;
          border-right: 1px solid #e2e8f0;
          padding: 1rem;
          overflow-y: auto;
          transition: transform 0.3s ease;
        }

        .sidebar-header {
          display: flex;
          align-items: center;
          justify-content: between;
          margin-bottom: 1rem;
        }

        .sidebar-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #059669;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .quick-action-card {
          background: #f8fafc;
          border-radius: 12px;
          padding: 1rem;
          margin-bottom: 1rem;
          border: 1px solid #e2e8f0;
        }

        .quick-action-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }

        .quick-action-icon {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
        }

        .quick-action-title {
          font-weight: 600;
          color: #1e293b;
          font-size: 0.9rem;
        }

        .quick-action-questions {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .quick-question {
          padding: 0.5rem 0.75rem;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 0.8rem;
          color: #475569;
          cursor: pointer;
          text-align: left;
          transition: all 0.2s ease;
        }

        .quick-question:hover {
          background: #059669;
          color: white;
          border-color: #059669;
        }

        /* Chat Area */
        .chat-area {
          flex: 1;
          display: flex;
          flex-direction: column;
          background: white;
        }

        /* Category Filters */
        .category-filters {
          padding: 1rem;
          border-bottom: 1px solid #e2e8f0;
          background: #f8fafc;
        }

        .category-buttons {
          display: flex;
          gap: 0.5rem;
          overflow-x: auto;
          padding-bottom: 0.25rem;
        }

        .category-btn {
          padding: 0.5rem 1rem;
          border: 1px solid #d1d5db;
          border-radius: 20px;
          background: white;
          color: #6b7280;
          font-size: 0.8rem;
          font-weight: 500;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s ease;
        }

        .category-btn.active {
          background: #059669;
          color: white;
          border-color: #059669;
        }

        /* Messages Container */
        .messages-container {
          flex: 1;
          overflow-y: auto;
          padding: 1rem;
          background: #f8fafc;
        }

        .welcome-message {
          text-align: center;
          padding: 2rem 1rem;
          color: #6b7280;
        }

        .welcome-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
          opacity: 0.7;
        }

        .welcome-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #374151;
        }

        .welcome-subtitle {
          font-size: 0.9rem;
          margin-bottom: 1.5rem;
          line-height: 1.4;
        }

        .message {
          margin-bottom: 1rem;
          display: flex;
        }

        .message.user {
          justify-content: flex-end;
        }

        .message.bot {
          justify-content: flex-start;
        }

        .message-bubble {
          max-width: 85%;
          padding: 0.75rem 1rem;
          border-radius: 16px;
          position: relative;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .message.user .message-bubble {
          background: linear-gradient(135deg, #059669, #047857);
          color: white;
          border-bottom-right-radius: 4px;
        }

        .message.bot .message-bubble {
          background: white;
          color: #1f2937;
          border: 1px solid #e5e7eb;
          border-bottom-left-radius: 4px;
        }

        .message-text {
          line-height: 1.4;
          white-space: pre-wrap;
          font-size: 0.9rem;
        }

        .message-meta {
          font-size: 0.7rem;
          opacity: 0.7;
          margin-top: 0.25rem;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .message-category {
          padding: 0.2rem 0.5rem;
          border-radius: 10px;
          font-size: 0.65rem;
          font-weight: 600;
          color: white;
          background: #059669;
        }

        .suggestions-box {
          background: #f0f9ff;
          border: 1px solid #bae6fd;
          border-radius: 8px;
          padding: 0.75rem;
          margin-top: 0.75rem;
        }

        .suggestions-title {
          font-weight: 600;
          color: #0369a1;
          margin-bottom: 0.25rem;
          font-size: 0.8rem;
        }

        .suggestions-list {
          margin: 0;
          padding-left: 1rem;
          font-size: 0.8rem;
        }

        .suggestions-list li {
          margin-bottom: 0.1rem;
          color: #0c4a6e;
        }

        .emergency-contact {
          margin-top: 0.75rem;
        }

        .emergency-btn {
          background: #dc2626;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          font-weight: 600;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
        }

        .loading-dots {
          display: inline-flex;
          gap: 3px;
        }

        .loading-dots span {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #6b7280;
          animation: bounce 1.4s ease-in-out infinite both;
        }

        .loading-dots span:nth-child(1) { animation-delay: -0.32s; }
        .loading-dots span:nth-child(2) { animation-delay: -0.16s; }

        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }

        /* Input Area */
        .chat-input-area {
          padding: 1rem;
          border-top: 1px solid #e5e7eb;
          background: white;
        }

        .language-selector {
          margin-bottom: 0.75rem;
        }

        .language-label {
          font-weight: 600;
          color: #374151;
          margin-bottom: 0.25rem;
          font-size: 0.8rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .language-dropdown {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          background: white;
          font-size: 0.8rem;
        }

        .input-group {
          display: flex;
          gap: 0.5rem;
          align-items: end;
        }

        .text-input {
          flex: 1;
          padding: 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 12px;
          font-size: 0.9rem;
          resize: none;
          min-height: 44px;
          max-height: 120px;
        }

        .text-input:focus {
          outline: none;
          border-color: #059669;
          box-shadow: 0 0 0 2px rgba(5, 150, 105, 0.1);
        }

        .action-buttons {
          display: flex;
          gap: 0.5rem;
        }

        .voice-btn, .send-btn {
          padding: 0.75rem;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          font-weight: 500;
          min-width: 44px;
          height: 44px;
        }

        .voice-btn {
          background: ${isListening ? '#dc2626' : '#7c3aed'};
          color: white;
        }

        .send-btn {
          background: #059669;
          color: white;
        }

        .send-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .listening-status {
          margin-top: 0.5rem;
          padding: 0.5rem;
          background: #fef3c7;
          border: 1px solid #f59e0b;
          border-radius: 6px;
          color: #92400e;
          font-size: 0.8rem;
        }

        /* Mobile Styles */
        @media (max-width: 768px) {
          .chat-header {
            padding: 0.75rem;
          }

          .header-title {
            font-size: 1.1rem;
          }

          .mobile-toggle {
            display: block;
          }

          .quick-actions-sidebar {
            position: fixed;
            top: 0;
            left: 0;
            height: 100%;
            z-index: 1000;
            transform: ${showQuickActions ? 'translateX(0)' : 'translateX(-100%)'};
            box-shadow: 2px 0 10px rgba(0,0,0,0.1);
          }

          .chat-main {
            position: relative;
          }

          .category-buttons {
            padding-bottom: 0.5rem;
          }

          .category-btn {
            font-size: 0.75rem;
            padding: 0.4rem 0.8rem;
          }

          .message-bubble {
            max-width: 90%;
          }

          .input-group {
            flex-direction: column;
            gap: 0.75rem;
          }

          .action-buttons {
            width: 100%;
            justify-content: space-between;
          }

          .voice-btn, .send-btn {
            flex: 1;
            height: 44px;
          }

          .text-input {
            min-height: 44px;
          }
        }

        @media (max-width: 480px) {
          .chat-header {
            padding: 0.5rem;
          }

          .header-title span:first-child {
            display: none;
          }

          .messages-container {
            padding: 0.75rem;
          }

          .message-bubble {
            max-width: 95%;
            padding: 0.6rem 0.8rem;
          }

          .message-text {
            font-size: 0.85rem;
          }

          .welcome-title {
            font-size: 1.1rem;
          }

          .welcome-subtitle {
            font-size: 0.8rem;
          }
        }

        /* Desktop optimizations */
        @media (min-width: 769px) {
          .mobile-toggle {
            display: none;
          }
        }
      `}</style>

      {/* Header */}
      <div className="chat-header">
        <div className="header-content">
          <div className="header-title">
            <span>🏥</span>
            Jeevankosh Health Assistant
          </div>
          <button 
            className="mobile-toggle"
            onClick={() => setShowQuickActions(!showQuickActions)}
          >
            {showQuickActions ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="chat-main">
        {/* Quick Actions Sidebar */}
        <div className="quick-actions-sidebar">
          <div className="sidebar-header">
            <div className="sidebar-title">
              <span>⚡</span>
              Quick Help
            </div>
          </div>
          
          {quickActions.map((action, index) => (
            <div key={index} className="quick-action-card">
              <div className="quick-action-header">
                <div 
                  className="quick-action-icon"
                  style={{ 
                    background: action.category === 'symptoms' ? '#f59e0b' : 
                               action.category === 'emergency' ? '#dc2626' : 
                               action.category === 'medication' ? '#7c3aed' : '#059669'
                  }}
                >
                  {action.icon}
                </div>
                <div className="quick-action-title">{action.title}</div>
              </div>
              <div className="quick-action-questions">
                {action.questions.map((question, qIndex) => (
                  <button
                    key={qIndex}
                    className="quick-question"
                    onClick={() => handleQuickAction(question)}
                    disabled={loading}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Chat Area */}
        <div className="chat-area">
          {/* Category Filters */}
          <div className="category-filters">
            <div className="category-buttons">
              <button
                className={`category-btn ${activeCategory === 'all' ? 'active' : ''}`}
                onClick={() => setActiveCategory('all')}
              >
                All
              </button>
              {quickActions.map((action) => (
                <button
                  key={action.category}
                  className={`category-btn ${activeCategory === action.category ? 'active' : ''}`}
                  onClick={() => setActiveCategory(action.category)}
                >
                  {action.icon} {action.title}
                </button>
              ))}
            </div>
          </div>

          {/* Messages Container */}
          <div className="messages-container">
            {filteredMessages.length === 0 ? (
              <div className="welcome-message">
                <div className="welcome-icon">👨‍⚕️</div>
                <h2 className="welcome-title">Welcome to Health Assistant</h2>
                <p className="welcome-subtitle">
                  I'm here to help with your health concerns, medication questions, 
                  and emergency guidance in multiple Indian languages.
                </p>
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button
                    className="category-btn active"
                    onClick={() => handleQuickAction('What are the symptoms of fever?')}
                  >
                    🤒 Symptoms
                  </button>
                  <button
                    className="category-btn active"
                    onClick={() => handleQuickAction('Emergency contact numbers')}
                  >
                    🚑 Emergency
                  </button>
                </div>
              </div>
            ) : (
              filteredMessages.map((msg, idx) => (
                <div key={idx} className={`message ${msg.type}`}>
                  <div className="message-bubble">
                    <div className="message-text">{msg.text}</div>
                    <div className="message-meta">
                      <span>{msg.timestamp}</span>
                      {msg.type === 'bot' && msg.category && (
                        <>
                          <span>•</span>
                          <span className="message-category">
                            {msg.category}
                          </span>
                        </>
                      )}
                    </div>

                    {msg.type === 'bot' && msg.suggestions && msg.suggestions.length > 0 && (
                      <div className="suggestions-box">
                        <div className="suggestions-title">💡 Recommendations</div>
                        <ul className="suggestions-list">
                          {msg.suggestions.map((suggestion, sIdx) => (
                            <li key={sIdx}>{suggestion}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {msg.type === 'bot' && msg.emergencyContact && (
                      <div className="emergency-contact">
                        <a 
                          href={msg.emergencyContact} 
                          className="emergency-btn"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          🚨 Emergency Call
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}

            {loading && (
              <div className="message bot">
                <div className="message-bubble">
                  <div className="message-text">
                    <div className="loading-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    Analyzing your query...
                  </div>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="chat-input-area">
        <div className="language-selector">
          <div className="language-label">
            <span>🗣️</span>
            Language
          </div>
          <select 
            className="language-dropdown"
            value={inputLanguage}
            onChange={(e) => setInputLanguage(e.target.value)}
            disabled={isListening}
          >
            {Object.entries(languages).map(([code, name]) => (
              <option key={code} value={code}>{name}</option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <textarea
            className="text-input"
            placeholder="Describe your symptoms or ask a health question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows="1"
            disabled={loading || isListening}
          />
          <div className="action-buttons">
            <button
              className="voice-btn"
              onClick={startListening}
              disabled={isListening || loading}
            >
              {isListening ? '🔴' : '🎤'}
            </button>
            <button
              className="send-btn"
              onClick={() => handleSendMessage()}
              disabled={loading || !input.trim()}
            >
              {loading ? (
                <div className="loading-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              ) : (
                'Send'
              )}
            </button>
          </div>
        </div>

        {listeningStatus && (
          <div className="listening-status">
            {listeningStatus}
          </div>
        )}
      </div>
    </div>
  );
}