import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE = 'http://localhost:5000';

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const [step, setStep] = useState('phone'); // phone, otp
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mockOtp, setMockOtp] = useState('');

  const handleRequestOTP = async (e) => {
    e.preventDefault();
    if (!/^[0-9]{10}$/.test(phone)) {
      setError('Enter valid 10-digit phone number');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API_BASE}/auth/request-otp`, { phone });
      setMockOtp(response.data.otp);
      setStep('otp');
      console.log('✅ OTP sent successfully');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send OTP');
      console.error('❌ OTP request failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError('Enter valid 6-digit OTP');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // For existing users, only pass phone and otp
      const response = await axios.post(`${API_BASE}/auth/verify-otp`, {
        phone,
        otp,
        // Don't send name, age, gender, location for login
        name: '', // Backend will handle existing user
        age: 0,
        gender: '',
        location: ''
      });

      const userData = {
        userId: response.data.userId,
        token: response.data.token,
        ...response.data.user
      };

      localStorage.setItem('jj_token', userData.token);
      localStorage.setItem('jj_user', JSON.stringify(userData));

      console.log('✅ Login successful for user:', userData.phone);
      onLogin(userData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
      console.error('❌ Login failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid py-5 min-vh-100 d-flex align-items-center" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div className="row justify-content-center w-100">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-lg">
            <div className="card-body p-5">
              <h2 className="text-center mb-2">🏥 Jeevankosh</h2>
              <p className="text-center text-muted mb-4">Login to Your Account</p>

              {error && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                  <strong>Error!</strong> {error}
                  <button type="button" className="btn-close" onClick={() => setError('')}></button>
                </div>
              )}

              {step === 'phone' && (
                <form onSubmit={handleRequestOTP}>
                  <div className="mb-4">
                    <label className="form-label fw-bold">📱 Phone Number</label>
                    <input
                      type="tel"
                      className="form-control form-control-lg"
                      placeholder="10-digit number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      maxLength="10"
                      autoFocus
                    />
                    <small className="text-muted">Example: 9876543210</small>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary w-100 btn-lg"
                    disabled={loading}
                  >
                    {loading ? '⏳ Sending OTP...' : '📤 Send OTP'}
                  </button>
                  <p className="text-center mt-4">
                    New user? <a href="/signup" className="text-primary fw-bold">Create account</a>
                  </p>
                </form>
              )}

              {step === 'otp' && (
                <form onSubmit={handleVerifyOTP}>
                  <div className="alert alert-info" role="alert">
                    <strong>OTP sent to:</strong> +91 {phone}
                    {mockOtp && (
                      <div className="mt-2">
                        <strong>Demo OTP:</strong> <span className="badge bg-warning text-dark">{mockOtp}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="mb-4">
                    <label className="form-label fw-bold">🔐 Enter OTP</label>
                    <input
                      type="text"
                      className="form-control form-control-lg text-center"
                      placeholder="000000"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                      maxLength="6"
                      autoFocus
                      style={{ fontSize: '24px', letterSpacing: '10px' }}
                    />
                    <small className="text-muted">6-digit code sent to your phone</small>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100 btn-lg"
                    disabled={loading}
                  >
                    {loading ? '⏳ Verifying...' : '✅ Verify & Login'}
                  </button>

                  <button
                    type="button"
                    className="btn btn-outline-secondary w-100 mt-2"
                    onClick={() => {
                      setStep('phone');
                      setOtp('');
                    }}
                  >
                    ← Back to Phone
                  </button>
                </form>
              )}

              <div className="mt-4 p-3 bg-light rounded">
                <small className="text-muted">
                  💡 <strong>Demo Mode:</strong> Enter any 10-digit phone number. OTP will be shown on screen.
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
