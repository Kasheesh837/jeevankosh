import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar({ user, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Close profile dropdown when route changes
  useEffect(() => {
    setIsProfileOpen(false);
  }, [location]);

  // Add scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <>
      <style>{`
        .nav-wrapper {
          background: linear-gradient(135deg, #059669 0%, #047857 100%);
          box-shadow: ${isScrolled ? '0 4px 20px rgba(0,0,0,0.1)' : 'none'};
          position: sticky;
          top: 0;
          z-index: 1000;
          padding: 0;
          transition: all 0.3s ease;
          border-bottom: 3px solid #f59e0b;
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 70px;
        }

        .brand-section {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
        }

        .brand-logo {
          font-size: 2rem;
          background: linear-gradient(45deg, #ffffff, #fef3c7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
        }

        .brand-text {
          display: flex;
          flex-direction: column;
        }

        .brand-main {
          font-size: 1.4rem;
          font-weight: 700;
          color: #ffffff;
          line-height: 1.2;
          letter-spacing: -0.5px;
        }

        .brand-sub {
          font-size: 0.7rem;
          color: #d1fae5;
          font-weight: 500;
          letter-spacing: 0.5px;
        }

        .nav-content {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .welcome-text {
          color: #ffffff;
          font-size: 0.95rem;
          font-weight: 500;
          display: none;
        }

        .profile-section {
          position: relative;
          display: flex;
          align-items: center;
        }

        .profile-trigger {
          background: transparent;
          border: 2px solid rgba(255,255,255,0.3);
          border-radius: 50%;
          width: 44px;
          height: 44px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
        }

        .profile-trigger:hover {
          border-color: rgba(255,255,255,0.6);
          background: rgba(255,255,255,0.1);
          transform: scale(1.05);
        }

        .profile-trigger.open {
          border-color: #ffffff;
          background: rgba(255,255,255,0.2);
        }

        .profile-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(45deg, #f59e0b, #fbbf24);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #047857;
          font-weight: 600;
          font-size: 0.9rem;
          border: 2px solid #ffffff;
        }

        .profile-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          margin-top: 0.5rem;
          background: white;
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.15);
          min-width: 200px;
          padding: 0.5rem;
          display: ${isProfileOpen ? 'block' : 'none'};
          border: 1px solid #e5e7eb;
          animation: dropdownFade 0.2s ease-out;
        }

        @keyframes dropdownFade {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .dropdown-header {
          padding: 1rem;
          border-bottom: 1px solid #f3f4f6;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .dropdown-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(45deg, #059669, #047857);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 1rem;
        }

        .user-details {
          display: flex;
          flex-direction: column;
        }

        .user-name {
          font-weight: 600;
          color: #111827;
          font-size: 0.95rem;
        }

        .user-email {
          color: #6b7280;
          font-size: 0.8rem;
          margin-top: 0.1rem;
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          color: #374151;
          text-decoration: none;
          border-radius: 8px;
          transition: all 0.2s ease;
          border: none;
          background: none;
          width: 100%;
          text-align: left;
          cursor: pointer;
          font-size: 0.9rem;
        }

        .dropdown-item:hover {
          background: #f3f4f6;
          color: #059669;
        }

        .dropdown-item.logout {
          color: #dc2626;
          border-top: 1px solid #f3f4f6;
          margin-top: 0.25rem;
        }

        .dropdown-item.logout:hover {
          background: #fef2f2;
          color: #dc2626;
        }

        .dropdown-icon {
          font-size: 1.1rem;
          width: 20px;
          text-align: center;
        }

        /* Mobile Styles */
        @media (max-width: 768px) {
          .nav-container {
            padding: 0 1rem;
            height: 64px;
          }

          .brand-main {
            font-size: 1.2rem;
          }

          .brand-sub {
            font-size: 0.65rem;
          }

          .welcome-text {
            display: block;
            font-size: 0.85rem;
          }

          .profile-dropdown {
            position: fixed;
            top: 64px;
            left: 0;
            right: 0;
            margin: 0;
            border-radius: 0;
            border-left: none;
            border-right: none;
            min-width: auto;
          }
        }

        @media (max-width: 480px) {
          .brand-text {
            display: none;
          }
          
          .brand-logo {
            font-size: 2.5rem;
          }

          .welcome-text {
            display: none;
          }
        }

        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {
          .nav-wrapper,
          .profile-trigger,
          .dropdown-item {
            transition: none;
          }

          .profile-dropdown {
            animation: none;
          }
        }

        /* Focus styles for keyboard navigation */
        .profile-trigger:focus-visible,
        .dropdown-item:focus-visible {
          outline: 2px solid #f59e0b;
          outline-offset: 2px;
        }

        /* Backdrop for mobile */
        .dropdown-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: transparent;
          z-index: 999;
          display: ${isProfileOpen ? 'block' : 'none'};
        }
      `}</style>

      {/* Backdrop for closing dropdown when clicking outside */}
      {isProfileOpen && (
        <div 
          className="dropdown-backdrop"
          onClick={() => setIsProfileOpen(false)}
        />
      )}

      <nav className="nav-wrapper" role="navigation" aria-label="Main navigation">
        <div className="nav-container">
          {/* Logo Section */}
          <Link className="brand-section" to="/dashboard" aria-label="Jeevankosh Home">
            <img src="/ChatGPT Image Nov 23, 2025, 10_12_40 PM.png" alt="Jeevankosh Logo" className="brand-logo" style={{width: '50px', height: '50px', objectFit: 'contain'}} />
            <div className="brand-text">
              <div className="brand-main">Jeevankosh</div>
              <div className="brand-sub">Health Assistant</div>
            </div>
          </Link>

          {/* Navigation Content */}
          <div className="nav-content">
            {/* Welcome Text - Visible on tablet+ */}
            <div className="welcome-text">
              Welcome back, {user?.name || 'User'}!
            </div>

            {/* Profile Section */}
            <div className="profile-section">
              <button 
                className={`profile-trigger ${isProfileOpen ? 'open' : ''}`}
                onClick={toggleProfileDropdown}
                aria-label="User profile menu"
                aria-expanded={isProfileOpen}
              >
                <div className="profile-avatar">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
              </button>

              {/* Profile Dropdown Menu */}
              <div className="profile-dropdown">
                <div className="dropdown-header">
                  <div className="dropdown-avatar">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div className="user-details">
                    <div className="user-name">{user?.name || 'User'}</div>
                    <div className="user-email">{user?.email || 'user@example.com'}</div>
                  </div>
                </div>

                <Link 
                  className="dropdown-item"
                  to="/dashboard"
                  onClick={() => setIsProfileOpen(false)}
                >
                  <span className="dropdown-icon">📊</span>
                  Dashboard
                </Link>

                <Link 
                  className="dropdown-item"
                  to="/profile"
                  onClick={() => setIsProfileOpen(false)}
                >
                  <span className="dropdown-icon">👤</span>
                  My Profile
                </Link>

                <Link 
                  className="dropdown-item"
                  to="/settings"
                  onClick={() => setIsProfileOpen(false)}
                >
                  <span className="dropdown-icon">⚙️</span>
                  Settings
                </Link>

                <button 
                  className="dropdown-item logout"
                  onClick={handleLogout}
                >
                  <span className="dropdown-icon">🚪</span>
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}