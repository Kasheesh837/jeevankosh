import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function PublicNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Add scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <style>{`
        .public-nav-wrapper {
          background: ${isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)'};
          backdrop-filter: ${isScrolled ? 'blur(10px)' : 'none'};
          box-shadow: ${isScrolled ? '0 4px 20px rgba(0,0,0,0.1)' : 'none'};
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          transition: all 0.3s ease;
          border-bottom: ${isScrolled ? '1px solid #e5e7eb' : '3px solid #f59e0b'};
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 72px;
        }

        .brand-section {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
          text-decoration: none;
          transition: transform 0.2s ease;
        }

        .brand-section:hover {
          transform: translateY(-1px);
        }

        .brand-logo {
          font-size: 2.2rem;
          background: ${isScrolled ? 'linear-gradient(45deg, #1e3a8a, #1e40af)' : 'linear-gradient(45deg, #ffffff, #fef3c7)'};
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
        }

        .brand-text {
          display: flex;
          flex-direction: column;
        }

        .brand-main {
          font-size: 1.5rem;
          font-weight: 700;
          color: ${isScrolled ? '#1e3a8a' : '#ffffff'};
          line-height: 1.2;
          letter-spacing: -0.5px;
        }

        .brand-sub {
          font-size: 0.75rem;
          color: ${isScrolled ? '#6b7280' : '#dbeafe'};
          font-weight: 500;
          letter-spacing: 0.5px;
        }

        .menu-toggle {
          background: transparent;
          border: 2px solid ${isScrolled ? 'rgba(30, 58, 138, 0.2)' : 'rgba(255,255,255,0.3)'};
          border-radius: 8px;
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 48px;
          height: 48px;
          cursor: pointer;
          transition: all 0.3s ease;
          gap: 5px;
          padding: 10px;
        }

        .menu-toggle:hover {
          border-color: ${isScrolled ? 'rgba(30, 58, 138, 0.4)' : 'rgba(255,255,255,0.6)'};
          background: ${isScrolled ? 'rgba(30, 58, 138, 0.05)' : 'rgba(255,255,255,0.1)'};
        }

        .menu-toggle span {
          display: block;
          height: 2.5px;
          width: 22px;
          background: ${isScrolled ? '#1e3a8a' : '#ffffff'};
          transition: all 0.3s ease;
          border-radius: 2px;
        }

        .menu-toggle.open span:nth-child(1) {
          transform: rotate(45deg) translate(7px, 7px);
        }

        .menu-toggle.open span:nth-child(2) {
          opacity: 0;
        }

        .menu-toggle.open span:nth-child(3) {
          transform: rotate(-45deg) translate(7px, -7px);
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .nav-item {
          color: ${isScrolled ? '#4b5563' : '#e0f2fe'};
          font-size: 1rem;
          font-weight: 500;
          padding: 0.6rem 1.2rem;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          border: none;
          background: transparent;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          position: relative;
        }

        .nav-item:hover {
          background: ${isScrolled ? 'rgba(30, 58, 138, 0.08)' : 'rgba(255,255,255,0.15)'};
          color: ${isScrolled ? '#1e3a8a' : '#ffffff'};
          transform: translateY(-1px);
        }

        .nav-item.active {
          background: ${isScrolled ? 'rgba(30, 58, 138, 0.12)' : 'rgba(255,255,255,0.2)'};
          color: ${isScrolled ? '#1e3a8a' : '#ffffff'};
          font-weight: 600;
        }

        .nav-item.active::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 50%;
          transform: translateX(-50%);
          width: 24px;
          height: 3px;
          background: #f59e0b;
          border-radius: 2px;
        }

        .auth-buttons {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-left: 1rem;
          padding-left: 1.5rem;
          border-left: 1px solid ${isScrolled ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.2)'};
        }

        .login-btn {
          background: ${isScrolled ? '#1e40af' : 'rgba(255,255,255,0.9)'};
          color: ${isScrolled ? '#ffffff' : '#1e3a8a'};
          font-weight: 600;
          padding: 0.6rem 1.5rem;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.95rem;
        }

        .login-btn:hover {
          background: ${isScrolled ? '#1e3a8a' : '#ffffff'};
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .signup-btn {
          background: transparent;
          color: ${isScrolled ? '#1e40af' : '#ffffff'};
          font-weight: 600;
          padding: 0.6rem 1.5rem;
          border-radius: 8px;
          border: 2px solid ${isScrolled ? '#1e40af' : 'rgba(255,255,255,0.4)'};
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.95rem;
        }

        .signup-btn:hover {
          background: ${isScrolled ? '#1e40af' : 'rgba(255,255,255,0.1)'};
          color: ${isScrolled ? '#ffffff' : '#ffffff'};
          border-color: ${isScrolled ? '#1e3a8a' : 'rgba(255,255,255,0.8)'};
          transform: translateY(-1px);
        }

        /* Mobile Styles */
        @media (max-width: 768px) {
          .nav-container {
            padding: 0 1rem;
            height: 68px;
          }

          .menu-toggle {
            display: flex;
          }

          .brand-main {
            font-size: 1.3rem;
          }

          .brand-sub {
            font-size: 0.7rem;
          }

          .nav-links {
            position: fixed;
            top: 68px;
            left: 0;
            width: 100%;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(20px);
            flex-direction: column;
            padding: 1.5rem 0;
            gap: 0.5rem;
            display: ${isOpen ? 'flex' : 'none'};
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            border-top: 1px solid #e5e7eb;
            max-height: calc(100vh - 68px);
            overflow-y: auto;
          }

          .nav-item {
            width: 90%;
            margin: 0 auto;
            padding: 1rem 1.5rem;
            justify-content: flex-start;
            border-radius: 10px;
            color: #374151;
            font-size: 1.1rem;
          }

          .nav-item:hover {
            background: rgba(30, 58, 138, 0.08);
            color: #1e3a8a;
          }

          .nav-item.active {
            background: rgba(30, 58, 138, 0.12);
            color: #1e3a8a;
          }

          .auth-buttons {
            flex-direction: column;
            width: 90%;
            margin: 1rem auto 0;
            padding: 1.5rem 0 0;
            border-left: none;
            border-top: 1px solid #e5e7eb;
            gap: 0.75rem;
          }

          .login-btn, .signup-btn {
            width: 100%;
            justify-content: center;
            padding: 1rem 1.5rem;
            font-size: 1.1rem;
          }

          .login-btn {
            background: #1e40af;
            color: #ffffff;
          }

          .signup-btn {
            background: transparent;
            color: #1e40af;
            border-color: #1e40af;
          }
        }

        @media (max-width: 480px) {
          .brand-text {
            display: none;
          }
          
          .brand-logo {
            font-size: 2.5rem;
          }
        }

        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {
          .public-nav-wrapper,
          .nav-item,
          .login-btn,
          .signup-btn,
          .menu-toggle,
          .brand-section {
            transition: none;
          }
        }

        /* Focus styles for keyboard navigation */
        .nav-item:focus-visible,
        .login-btn:focus-visible,
        .signup-btn:focus-visible,
        .menu-toggle:focus-visible,
        .brand-section:focus-visible {
          outline: 2px solid #f59e0b;
          outline-offset: 2px;
        }

        /* Page content padding to account for fixed navbar */
        .page-content {
          padding-top: 72px;
        }
      `}</style>

      <nav className="public-nav-wrapper" role="navigation" aria-label="Main navigation">
        <div className="nav-container">
          {/* Logo Section */}
          <div 
            className="brand-section" 
            onClick={() => navigate('/')}
            role="button"
            tabIndex={0}
            aria-label="Jeevankosh Home"
            onKeyPress={(e) => e.key === 'Enter' && navigate('/')}
          >
            <img src="/ChatGPT Image Nov 23, 2025, 10_12_40 PM.png" alt="Jeevankosh Logo" className="brand-logo" style={{width: '50px', height: '50px', objectFit: 'contain'}} />
            <div className="brand-text">
              <div className="brand-main">Jeevankosh</div>
              <div className="brand-sub">Government Health Portal</div>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className={`menu-toggle ${isOpen ? 'open' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Navigation Links */}
          <div className={`nav-links ${isOpen ? 'open' : ''}`}>
            <button 
              className={`nav-item ${isActiveRoute('/') ? 'active' : ''}`}
              onClick={() => navigate('/')}
              aria-current={isActiveRoute('/') ? 'page' : undefined}
            >
              🏠 Home
            </button>
            
            <button 
              className={`nav-item ${isActiveRoute('/about') ? 'active' : ''}`}
              onClick={() => navigate('/about')}
              aria-current={isActiveRoute('/about') ? 'page' : undefined}
            >
              ℹ️ About
            </button>
            
            <button 
              className={`nav-item ${isActiveRoute('/contact') ? 'active' : ''}`}
              onClick={() => navigate('/contact')}
              aria-current={isActiveRoute('/contact') ? 'page' : undefined}
            >
              📞 Contact
            </button>

            {/* Authentication Buttons */}
            <div className="auth-buttons">
              <button 
                className="login-btn"
                onClick={() => navigate('/login')}
                aria-label="Login to your account"
              >
                🔑 Login
              </button>
              <button 
                className="signup-btn"
                onClick={() => navigate('/signup')}
                aria-label="Create new account"
              >
                📝 Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Add padding to main content to account for fixed navbar */}
      <div className="page-content"></div>
    </>
  );
}