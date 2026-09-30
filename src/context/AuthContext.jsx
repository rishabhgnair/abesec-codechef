import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAdminSession, adminLogin, adminLogout } from '../services/api';

const AuthContext = createContext({
  session: null,
  user: null,
  loading: true,
  login: async () => {},
  logout: async () => {}
});

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initSession = async () => {
      try {
        const storedSession = await getAdminSession();
        if (storedSession) {
          setSession(storedSession);
          setUser({ username: storedSession.username });
        }
      } catch (err) {
        console.error('Session init error:', err);
      } finally {
        setLoading(false);
      }
    };

    initSession();
  }, []);

  const login = async (username, password) => {
    const data = await adminLogin(username, password);
    setSession(data.session);
    setUser(data.user);
    return data;
  };

  const logout = async () => {
    try {
      await adminLogout();
    } finally {
      setSession(null);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ session, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
