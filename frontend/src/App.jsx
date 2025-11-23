import { useEffect, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import PublicNavbar from './components/PublicNavbar';
import About from './pages/About';
import Alerts from './pages/Alerts';
import Chat from './pages/Chat';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import Emergency from './pages/Emergency';
import FirstAid from './pages/FirstAid';
import History from './pages/History';
import Hospitals from './pages/Hospitals';
import Info from './pages/Info';
import Login from './pages/Login';
import Outbreaks from './pages/Outbreaks';
import Profile from './pages/Profile';
import PublicHome from './pages/PublicHome';
import Signup from './pages/Signup';
import Symptoms from './pages/Symptoms';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('jj_user');
    const token = localStorage.getItem('jj_token');
    if (storedUser && token) {
      try {
        setUser(JSON.parse(storedUser));
        setIsLoggedIn(true);
      } catch (e) {
        localStorage.removeItem('jj_user');
        localStorage.removeItem('jj_token');
      }
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem('jj_user', JSON.stringify(userData));
    localStorage.setItem('jj_token', userData.token);
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('jj_user');
    localStorage.removeItem('jj_token');
  };

  // ProtectedRoute component
  const ProtectedRoute = ({ element }) => {
    return isLoggedIn ? element : <Navigate to="/login" />;
  };

  return (
    <Router>
      {/* PUBLIC PAGES - Show PublicNavbar */}
      {!isLoggedIn && <PublicNavbar />}
      
      {/* PRIVATE PAGES - Show Navbar */}
      {isLoggedIn && <Navbar user={user} onLogout={handleLogout} />}

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<PublicHome />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        
        {/* AUTH ROUTES */}
        <Route
          path="/login"
          element={!isLoggedIn ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/signup"
          element={!isLoggedIn ? <Signup onLogin={handleLogin} /> : <Navigate to="/dashboard" />}
        />

        {/* PRIVATE ROUTES */}
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={<Dashboard user={user} />} />}
        />
        <Route
          path="/chat"
          element={<ProtectedRoute element={<Chat user={user} />} />}
        />
        <Route
          path="/info"
          element={<ProtectedRoute element={<Info user={user} />} />}
        />
        <Route
          path="/alerts"
          element={<ProtectedRoute element={<Alerts user={user} />} />}
        />
        <Route
          path="/profile"
          element={<ProtectedRoute element={<Profile user={user} onLogout={handleLogout} />} />}
        />
        <Route
          path="/history"
          element={<ProtectedRoute element={<History user={user} />} />}
        />
        <Route
          path="/symptoms"
          element={<ProtectedRoute element={<Symptoms user={user} />} />}
        />
        <Route
          path="/emergency"
          element={<ProtectedRoute element={<Emergency user={user} />} />}
        />
        <Route
          path="/hospitals"
          element={<ProtectedRoute element={<Hospitals user={user} />} />}
        />
        <Route
          path="/first-aid"
          element={<ProtectedRoute element={<FirstAid user={user} />} />}
        />
        <Route
          path="/outbreaks"
          element={<ProtectedRoute element={<Outbreaks user={user} />} />}
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to={isLoggedIn ? "/dashboard" : "/"} />} />
      </Routes>
    </Router>
  );
}
