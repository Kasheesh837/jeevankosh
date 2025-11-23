import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE = 'http://localhost:5000';

export default function Signup({ onLogin }) {
  const navigate = useNavigate();

  const [step, setStep] = useState('phone'); // phone → otp → register
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [location, setLocation] = useState('');
  const [knownConditions, setKnownConditions] = useState('');
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
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError('Enter valid 6-digit OTP');
      return;
    }
    setStep('register');
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !age || !gender || !location) {
      setError('Fill all required fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API_BASE}/auth/verify-otp`, {
        phone,
        otp,
        name,
        age: parseInt(age),
        gender,
        location,
        knownConditions: knownConditions.split(',').filter(c => c.trim())
      });

      const userData = {
        userId: response.data.userId,
        token: response.data.token,
        ...response.data.user
      };

      localStorage.setItem('jj_token', userData.token);
      localStorage.setItem('jj_user', JSON.stringify(userData));

      onLogin(userData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  // -------------------- EMBEDDED CSS --------------------
  const css = `
    :root {
      --primary: #1a73e8;
      --primary-dark: #0f5fcc;
      --bg: #f4f7fb;
      --card-bg: #ffffff;
      --text: #1a1f36;
      --muted: #6b7280;
      --radius: 12px;
      --shadow: 0 6px 20px rgba(0,0,0,0.07);
    }

    body {
      background: var(--bg);
      font-family: 'Inter', sans-serif;
    }

    .wrapper {
      display: flex;
      justify-content: center;
      padding: 40px 20px;
    }

    .card-box {
      background: var(--card-bg);
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      width: 100%;
      max-width: 450px;
      padding: 40px;
      transition: 0.3s ease;
    }

    .heading-title {
      text-align: center;
      font-size: 1.8rem;
      font-weight: 700;
      margin-bottom: 6px;
    }

    .muted {
      color: var(--muted);
      text-align: center;
      margin-bottom: 25px;
    }

    .input-box {
      margin-bottom: 18px;
    }

    .input-label {
      font-weight: 600;
      font-size: 0.95rem;
      margin-bottom: 6px;
      display: block;
    }

    .input-field, select {
      width: 100%;
      padding: 12px 14px;
      border-radius: 10px;
      border: 1px solid #d0d7e2;
      outline: none;
      font-size: 0.95rem;
      transition: 0.2s;
      background: #fff;
    }

    .input-field:focus, select:focus {
      border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(26, 115, 232, 0.15);
    }

    .btn-primary {
      width: 100%;
      padding: 12px;
      margin-top: 5px;
      border: none;
      border-radius: 10px;
      font-size: 1rem;
      font-weight: 600;
      background: var(--primary);
      color: white;
      cursor: pointer;
      transition: 0.25s;
    }

    .btn-primary:hover {
      background: var(--primary-dark);
      transform: translateY(-2px);
      box-shadow: var(--shadow);
    }

    .btn-outline {
      width: 100%;
      padding: 12px;
      border-radius: 10px;
      font-size: 1rem;
      font-weight: 600;
      border: 2px solid var(--primary);
      background: white;
      color: var(--primary);
      transition: 0.25s;
      cursor: pointer;
    }

    .btn-outline:hover {
      background: var(--primary);
      color: white;
      transform: translateY(-2px);
    }

    .alert-error {
      background: #ffe5e5;
      color: #b50000;
      padding: 12px;
      border-radius: 10px;
      margin-bottom: 16px;
      font-size: 0.9rem;
      border-left: 4px solid #b50000;
    }

    a {
      color: var(--primary);
      text-decoration: none;
      font-weight: 600;
    }

    a:hover {
      text-decoration: underline;
    }

    .mock-otp-box {
      background: #e9f1ff;
      padding: 12px;
      border-radius: 8px;
      font-size: 0.9rem;
      margin-bottom: 16px;
    }
  `;

  return (
    <div className="wrapper">
      <style>{css}</style>

      <div className="card-box">
        <h2 className="heading-title">🏥 Jeevankosh</h2>
        <p className="muted">Create Your Account</p>

        {error && <div className="alert-error">{error}</div>}

        {/* ---------------- PHONE STEP ---------------- */}
        {step === 'phone' && (
          <form onSubmit={handleRequestOTP}>
            <div className="input-box">
              <label className="input-label">📱 Phone Number</label>
              <input
                type="tel"
                className="input-field"
                placeholder="10-digit number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                maxLength="10"
              />
            </div>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Sending...' : 'Send OTP'}
            </button>

            <p className="muted" style={{ marginTop: "15px" }}>
              Already have an account? <a href="/login">Login</a>
            </p>
          </form>
        )}

        {/* ---------------- OTP STEP ---------------- */}
        {step === 'otp' && (
          <form onSubmit={handleVerifyOTP}>
            <div className="mock-otp-box">
              OTP sent to <strong>{phone}</strong>
              {mockOtp && (
                <div style={{ marginTop: "6px" }}>
                  Mock OTP: <b>{mockOtp}</b>
                </div>
              )}
            </div>

            <div className="input-box">
              <label className="input-label">🔐 Enter OTP</label>
              <input
                type="text"
                className="input-field"
                placeholder="6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength="6"
              />
            </div>

            <button type="button" className="btn-outline" onClick={() => setStep('phone')}>
              Back
            </button>

            <button type="submit" className="btn-primary">
              Verify OTP
            </button>
          </form>
        )}

        {/* ---------------- REGISTER STEP ---------------- */}
        {step === 'register' && (
          <form onSubmit={handleRegister}>
            <div className="input-box">
              <label className="input-label">👤 Full Name</label>
              <input type="text" className="input-field" value={name} onChange={e => setName(e.target.value)} />
            </div>

            <div className="input-box">
              <label className="input-label">🎂 Age</label>
              <input type="number" className="input-field" value={age} onChange={e => setAge(e.target.value)} />
            </div>

            <div className="input-box">
              <label className="input-label">⚧ Gender</label>
              <select value={gender} onChange={e => setGender(e.target.value)}>
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="input-box">
              <label className="input-label">📍 Location</label>
              <select value={location} onChange={e => setLocation(e.target.value)}>
                <option value="">Select</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Chennai">Chennai</option>
                <option value="Delhi">Delhi</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Pune">Pune</option>
                <option value="Kolkata">Kolkata</option>
              </select>
            </div>

            <div className="input-box">
              <label className="input-label">🏥 Known Conditions (optional)</label>
              <input
                type="text"
                className="input-field"
                placeholder="Diabetes, Asthma"
                value={knownConditions}
                onChange={(e) => setKnownConditions(e.target.value)}
              />
            </div>

            <button type="button" className="btn-outline" onClick={() => setStep('otp')}>
              Back
            </button>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Creating Account...' : 'Complete Signup'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
