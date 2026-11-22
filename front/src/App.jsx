import { useEffect, useState } from 'react';
import { session } from './api.js';
import Login from './pages/Login.jsx';
import Reviews from './pages/Reviews.jsx';

export default function App() {
  const [user, setUser] = useState(session.user());

  // Si el token expira, api.js avisa y volvemos al login
  useEffect(() => {
    const onExpired = () => setUser(null);
    window.addEventListener('auth:expired', onExpired);
    return () => window.removeEventListener('auth:expired', onExpired);
  }, []);

  const handleAuth = ({ token, user }) => {
    session.save(token, user);
    setUser(user);
  };

  const logout = () => {
    session.clear();
    setUser(null);
  };

  return user ? <Reviews user={user} onLogout={logout} /> : <Login onAuth={handleAuth} />;
}
