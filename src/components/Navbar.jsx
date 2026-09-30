import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Shield, LogOut, Terminal, Sparkles } from 'lucide-react';

export default function Navbar({ onTriggerEasterEgg }) {
  const { session, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [ghostClicks, setGhostClicks] = useState(0);

  const handleGhostClick = () => {
    const next = ghostClicks + 1;
    setGhostClicks(next);
    if (next >= 5) {
      setGhostClicks(0);
      showToast('SECRET EASTER EGG UNLOCKED! 👾', 'success');
      if (onTriggerEasterEgg) onTriggerEasterEgg();
    } else {
      showToast(`GHOST CLICKED ${next}/5 TIMES...`, 'info');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      showToast('ADMIN LOGGED OUT. GAME RESET.', 'info');
      navigate('/admin/login');
    } catch (err) {
      showToast(err.message || 'Logout failed', 'error');
    }
  };

  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <header className="sticky top-0 z-40 bg-arcade-dark/95 backdrop-blur-md border-b-2 border-arcade-border">
      {/* Ticker HUD */}
      <div className="bg-arcade-card/90 border-b border-arcade-border/60 px-4 py-1 flex items-center justify-between text-[11px] font-arcade text-slate-400 overflow-x-auto">
        <div className="flex items-center gap-4 shrink-0">
          <span className="text-arcade-yellow flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-arcade-yellow animate-ping"></span>
            1UP <span className="text-white font-vt text-base">007000</span>
          </span>
          <span className="text-arcade-cyan hidden sm:inline">
            HIGH SCORE <span className="text-white font-vt text-base">999990</span>
          </span>
        </div>
        <div className="flex items-center gap-4 shrink-0 text-slate-300">
          <button
            onClick={handleGhostClick}
            title="Click me 5 times for a secret easter egg!"
            className="hover:scale-125 transition-transform"
          >
            👻
          </button>
          <span className="text-arcade-green font-vt text-base">
            &lt;ABESEC&gt; CHAPTER OFFICIAL
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand with Official Chapter Logo + Pac-Man Mascot */}
        <Link to="/" className="flex items-center gap-3 group">
          {/* Official Chapter Hexagon Logo */}
          <div className="relative w-10 h-10 rounded-lg overflow-hidden border-2 border-arcade-yellow/80 shadow-arcade-yellow shrink-0 group-hover:scale-105 transition-transform bg-white p-0.5">
            <img
              src="/codechef-abesec-logo.jpg"
              alt="CodeChef ABESEC Chapter Logo"
              className="w-full h-full object-contain"
            />
          </div>

          {/* PAC-MAN animated logo icon */}
          <div className="relative w-8 h-8 bg-arcade-yellow rounded-full hidden sm:flex items-center justify-center shadow-arcade-yellow group-hover:scale-105 transition-transform overflow-hidden shrink-0">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-y-[9px] border-y-transparent border-r-[16px] border-r-arcade-dark animate-chomp"></div>
            <div className="absolute top-1.5 left-2.5 w-1.5 h-1.5 bg-arcade-dark rounded-full"></div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-arcade text-sm sm:text-base text-arcade-yellow tracking-wider text-glow-yellow">
                CODECHEF 7.0
              </span>
              <span className="hidden sm:inline-block bg-arcade-neonBlue/20 text-arcade-cyan text-[10px] font-arcade px-1.5 py-0.5 rounded border border-arcade-cyan/40">
                ARCADE
              </span>
            </div>
            <span className="font-vt text-slate-400 text-sm tracking-widest uppercase">
              &lt;ABESEC&gt; Student Chapter
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-2 sm:gap-4">
          <Link
            to="/"
            className={`px-3 py-1.5 rounded font-arcade text-xs transition-all flex items-center gap-1.5 ${
              location.pathname === '/'
                ? 'bg-arcade-yellow text-arcade-dark font-bold shadow-arcade-yellow'
                : 'text-slate-300 hover:text-arcade-yellow hover:bg-arcade-panel'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>QUESTS</span>
          </Link>

          {session ? (
            <div className="flex items-center gap-2">
              <Link
                to="/admin"
                className={`px-3 py-1.5 rounded font-arcade text-xs transition-all flex items-center gap-1.5 ${
                  location.pathname === '/admin'
                    ? 'bg-arcade-cyan text-arcade-dark font-bold shadow-arcade-cyan'
                    : 'text-arcade-cyan hover:bg-arcade-cyan/10 border border-arcade-cyan/40'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">ADMIN</span> DASHBOARD
              </Link>
              <button
                onClick={handleLogout}
                title={`Logged in as ${user?.username || 'admin'}`}
                className="px-2.5 py-1.5 rounded font-arcade text-xs text-arcade-red hover:bg-arcade-red/10 border border-arcade-red/30 transition-all flex items-center gap-1"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden md:inline">LOGOUT</span>
              </button>
            </div>
          ) : (
            <Link
              to="/admin/login"
              className={`px-3 py-1.5 rounded font-arcade text-xs transition-all flex items-center gap-1.5 ${
                isAdminRoute
                  ? 'bg-arcade-pink text-white font-bold shadow-arcade-pink'
                  : 'text-slate-400 hover:text-slate-200 border border-arcade-border hover:border-arcade-pink/50'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>ADMIN LOGIN</span>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
