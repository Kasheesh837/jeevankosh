import axios from 'axios';
import { useEffect, useState } from 'react';

const API_BASE = 'http://localhost:5000';

export default function Profile({ user, onLogout }) {
  const [profile, setProfile] = useState(user);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (profile) {
      setEditData({
        name: profile.name || '',
        phone: profile.phone || '',
        age: profile.age || '',
        gender: profile.gender || '',
        location: profile.location || '',
        knownConditions: profile.knownConditions || []
      });
    }
  }, [profile]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('jj_token');
      const response = await axios.get(`${API_BASE}/auth/profile/${user?.userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile(response.data.user);
    } catch (error) {
      console.error('Profile fetch error:', error);
      setMessage('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('jj_token');
      await axios.put(`${API_BASE}/auth/profile/${user?.userId}`, editData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Profile updated successfully!');
      setIsEditing(false);
      fetchProfile(); // Refresh data
    } catch (error) {
      console.error('Profile update error:', error);
      setMessage('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('jj_token');
    localStorage.removeItem('jj_user');
    onLogout();
  };

  const css = `
    .profile-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
      padding: 2rem 0;
    }

    .profile-card {
      background: white;
      border-radius: 20px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
      border: 1px solid #e2e8f0;
      overflow: hidden;
      transition: all 0.3s ease;
    }

    .profile-card:hover {
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
    }

    .profile-header {
      background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
      color: white;
      padding: 2.5rem 2rem;
      position: relative;
      overflow: hidden;
    }

    .profile-header::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E");
    }

    .profile-avatar {
      width: 80px;
      height: 80px;
      background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      color: white;
      margin-bottom: 1rem;
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }

    .profile-title {
      font-size: 1.8rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    .profile-subtitle {
      opacity: 0.9;
      font-size: 1.1rem;
    }

    .profile-body {
      padding: 2.5rem;
    }

    .profile-section {
      margin-bottom: 2rem;
    }

    .section-label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.9rem;
      font-weight: 600;
      color: #64748b;
      margin-bottom: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .field-value {
      font-size: 1.1rem;
      color: #1e293b;
      font-weight: 500;
      padding: 0.75rem 0;
      border-bottom: 1px solid #f1f5f9;
    }

    .field-value:last-child {
      border-bottom: none;
    }

    .edit-input {
      width: 100%;
      padding: 0.75rem 1rem;
      border: 2px solid #e2e8f0;
      border-radius: 10px;
      font-size: 1.1rem;
      transition: all 0.3s ease;
      background: white;
    }

    .edit-input:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .conditions-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .condition-badge {
      background: linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%);
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 25px;
      font-size: 0.9rem;
      font-weight: 500;
      box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
    }

    .empty-state {
      color: #94a3b8;
      font-style: italic;
    }

    .action-buttons {
      display: flex;
      gap: 1rem;
      margin-top: 2rem;
      flex-wrap: wrap;
    }

    .btn-primary {
      background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
      color: white;
      border: none;
      padding: 1rem 2rem;
      border-radius: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      flex: 1;
      justify-content: center;
    }

    .btn-primary:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(30, 64, 175, 0.3);
    }

    .btn-secondary {
      background: white;
      color: #64748b;
      border: 2px solid #e2e8f0;
      padding: 1rem 2rem;
      border-radius: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      flex: 1;
      justify-content: center;
    }

    .btn-secondary:hover {
      border-color: #94a3b8;
      transform: translateY(-2px);
    }

    .btn-danger {
      background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
      color: white;
      border: none;
      padding: 1rem 2rem;
      border-radius: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      flex: 1;
      justify-content: center;
    }

    .btn-danger:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(220, 38, 38, 0.3);
    }

    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none !important;
    }

    .info-card {
      background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
      border: 1px solid #bae6fd;
      border-radius: 16px;
      padding: 1.5rem;
      margin-top: 2rem;
    }

    .info-title {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 600;
      color: #0369a1;
      margin-bottom: 0.5rem;
    }

    .info-content {
      color: #0c4a6e;
      line-height: 1.6;
    }

    .loading-spinner {
      display: inline-block;
      width: 20px;
      height: 20px;
      border: 3px solid #ffffff;
      border-radius: 50%;
      border-top-color: transparent;
      animation: spin 1s ease-in-out infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .profile-container {
        padding: 1rem;
      }

      .profile-header {
        padding: 2rem 1.5rem;
      }

      .profile-body {
        padding: 2rem 1.5rem;
      }

      .action-buttons {
        flex-direction: column;
      }

      .btn-primary, .btn-secondary, .btn-danger {
        flex: none;
      }
    }

    /* Accessibility */
    @media (prefers-reduced-motion: reduce) {
      .profile-card,
      .btn-primary,
      .btn-secondary,
      .btn-danger {
        transition: none;
      }
      
      .btn-primary:hover:not(:disabled),
      .btn-secondary:hover,
      .btn-danger:hover {
        transform: none;
      }
    }

    .btn:focus-visible {
      outline: 3px solid #f59e0b;
      outline-offset: 2px;
    }
  `;

  if (loading && !profile) {
    return (
      <div className="profile-container">
        <style>{css}</style>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <div className="profile-card">
                <div className="profile-body text-center py-5">
                  <div className="loading-spinner mx-auto mb-3"></div>
                  <p>Loading your profile...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <style>{css}</style>
      
      <div className="container">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            {/* Success Message */}
            {message && (
              <div className="alert alert-success alert-dismissible fade show mb-4" role="alert">
                <strong>✅ Success!</strong> {message}
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setMessage('')}
                  aria-label="Close"
                ></button>
              </div>
            )}

            <div className="profile-card">
              {/* Profile Header */}
              <div className="profile-header">
                <div className="profile-avatar">
                  {profile?.name ? profile.name.charAt(0).toUpperCase() : '👤'}
                </div>
                <h1 className="profile-title">{profile?.name || 'User'}</h1>
                <p className="profile-subtitle">Jeevankosh Health Portal Member</p>
              </div>

              {/* Profile Body */}
              <div className="profile-body">
                {/* Personal Information Section */}
                <div className="profile-section">
                  <h3 className="section-label">
                    <span>📋</span>
                    Personal Information
                  </h3>
                  
                  <div className="field-value">
                    <strong>Full Name:</strong><br />
                    {isEditing ? (
                      <input
                        type="text"
                        className="edit-input"
                        value={editData.name}
                        onChange={(e) => setEditData({...editData, name: e.target.value})}
                      />
                    ) : (
                      profile?.name || 'Not provided'
                    )}
                  </div>

                  <div className="field-value">
                    <strong>📱 Phone Number:</strong><br />
                    {isEditing ? (
                      <input
                        type="tel"
                        className="edit-input"
                        value={editData.phone}
                        onChange={(e) => setEditData({...editData, phone: e.target.value})}
                      />
                    ) : (
                      profile?.phone || 'Not provided'
                    )}
                  </div>

                  <div className="field-value">
                    <strong>🎂 Age:</strong><br />
                    {isEditing ? (
                      <input
                        type="number"
                        className="edit-input"
                        value={editData.age}
                        onChange={(e) => setEditData({...editData, age: e.target.value})}
                      />
                    ) : (
                      profile?.age ? `${profile.age} years` : 'Not provided'
                    )}
                  </div>

                  <div className="field-value">
                    <strong>⚧ Gender:</strong><br />
                    {isEditing ? (
                      <select
                        className="edit-input"
                        value={editData.gender}
                        onChange={(e) => setEditData({...editData, gender: e.target.value})}
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                      </select>
                    ) : (
                      profile?.gender || 'Not provided'
                    )}
                  </div>

                  <div className="field-value">
                    <strong>📍 Location:</strong><br />
                    {isEditing ? (
                      <input
                        type="text"
                        className="edit-input"
                        value={editData.location}
                        onChange={(e) => setEditData({...editData, location: e.target.value})}
                        placeholder="Enter your city or region"
                      />
                    ) : (
                      profile?.location || 'Not provided'
                    )}
                  </div>
                </div>

                {/* Health Information Section */}
                <div className="profile-section">
                  <h3 className="section-label">
                    <span>🏥</span>
                    Health Information
                  </h3>
                  
                  <div className="field-value">
                    <strong>Known Health Conditions:</strong><br />
                    <div className="conditions-grid mt-2">
                      {profile?.knownConditions && profile.knownConditions.length > 0 ? (
                        profile.knownConditions.map((condition, idx) => (
                          <span key={idx} className="condition-badge">
                            {condition}
                          </span>
                        ))
                      ) : (
                        <span className="empty-state">No conditions recorded</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Account Information Section */}
                <div className="profile-section">
                  <h3 className="section-label">
                    <span>📅</span>
                    Account Information
                  </h3>
                  
                  <div className="field-value">
                    <strong>Member Since:</strong><br />
                    {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }) : 'Unknown'}
                  </div>

                  <div className="field-value">
                    <strong>User ID:</strong><br />
                    <code>{profile?.userId || 'Unknown'}</code>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="action-buttons">
                  {isEditing ? (
                    <>
                      <button 
                        className="btn-primary" 
                        onClick={handleUpdate}
                        disabled={loading}
                      >
                        {loading ? <div className="loading-spinner"></div> : '💾'}
                        {loading ? 'Saving...' : 'Save Changes'}
                      </button>
                      <button 
                        className="btn-secondary" 
                        onClick={() => setIsEditing(false)}
                        disabled={loading}
                      >
                        ❌ Cancel
                      </button>
                    </>
                  ) : (
                    <button 
                      className="btn-primary" 
                      onClick={() => setIsEditing(true)}
                    >
                      ✏️ Edit Profile
                    </button>
                  )}
                  
                  <button 
                    className="btn-danger" 
                    onClick={handleLogout}
                  >
                    🚪 Logout
                  </button>
                </div>
              </div>
            </div>

            {/* Information Card */}
            <div className="info-card">
              <div className="info-title">
                <span>💡</span>
                Profile Tips
              </div>
              <div className="info-content">
                Keeping your profile updated helps us provide better personalized health guidance 
                and emergency assistance. Ensure your location and health conditions are current 
                for the most accurate support.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}