import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import EasterEggGame from './components/EasterEggGame';

export default function App() {
  const [isEasterEggOpen, setIsEasterEggOpen] = useState(false);

  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-arcade-dark text-slate-100 flex flex-col relative selection:bg-arcade-yellow selection:text-arcade-dark">
            {/* Ambient CRT Scanline Overlay */}
            <div className="fixed inset-0 crt-overlay pointer-events-none z-50"></div>

            <Navbar onTriggerEasterEgg={() => setIsEasterEggOpen(true)} />

            <div className="flex-1">
              <Routes>
                <Route
                  path="/"
                  element={
                    <HomePage
                      isEasterEggOpen={isEasterEggOpen}
                      setIsEasterEggOpen={setIsEasterEggOpen}
                    />
                  }
                />
                <Route path="/admin/login" element={<AdminLogin />} />

                {/* Protected Admin Routes */}
                <Route path="/admin" element={<ProtectedRoute />}>
                  <Route index element={<AdminDashboard />} />
                </Route>

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>

            <Footer onTriggerEasterEgg={() => setIsEasterEggOpen(true)} />

            {/* Hidden Easter Egg Mini-Game */}
            <EasterEggGame
              isOpen={isEasterEggOpen}
              onClose={() => setIsEasterEggOpen(false)}
            />
          </div>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  );
}
