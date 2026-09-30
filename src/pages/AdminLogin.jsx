import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Shield, Lock, User, ArrowLeft, KeyRound, AlertTriangle, Info } from 'lucide-react';

export default function AdminLogin() {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('codechef7');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const { login, session } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();

  const from = location.state?.from?.pathname || '/admin';

  useEffect(() => {
    if (session) {
      navigate('/admin', { replace: true });
    }
  }, [session, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanUser = username.trim();
    if (!cleanUser || !password) {
      setErrorMessage('PLEASE PROVIDE BOTH USERNAME AND PASSWORD.');
      return;
    }

    setLoading(true);
    try {
      await login(cleanUser, password);
      showToast('OPERATOR AUTHENTICATED! WELCOME TO MISSION CONTROL.', 'success');
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Login failed:', err);
      const msg = err.message || 'Invalid credentials. Check username & password.';
      setErrorMessage(msg);
      showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-arcade-dark text-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-arcade-pink/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-arcade-neonBlue/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-md w-full bg-arcade-card border-4 border-arcade-pink rounded-xl shadow-arcade-pink p-6 sm:p-8 relative z-10">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-arcade text-slate-400 hover:text-arcade-yellow transition-colors mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO QUESTS</span>
        </Link>

        {/* Official Chapter Logo Card */}
        <div className="text-center mb-6">
          <div className="w-20 h-20 rounded-2xl bg-white p-1 border-2 border-arcade-pink mx-auto mb-3 shadow-[0_0_20px_rgba(255,64,129,0.35)] overflow-hidden">
            <img
              src="/codechef-abesec-logo.jpg"
              alt="CodeChef ABESEC Official"
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="font-arcade text-base sm:text-lg text-white tracking-wider mb-1">
            ADMIN CONSOLE
          </h1>
          <p className="font-vt text-slate-400 text-lg">
            CODECHEF &lt;ABESEC&gt; OPERATOR GATEWAY
          </p>
        </div>

        {/* Credentials hint */}
        <div className="mb-5 p-3 rounded-lg bg-arcade-panel border border-arcade-cyan/40 text-xs font-sans text-slate-300 flex items-start gap-2">
          <Info className="w-4 h-4 text-arcade-cyan shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-arcade-cyan font-arcade text-[10px] block mb-0.5">DEFAULT CREDENTIALS:</span>
            <span>Username: <strong className="text-arcade-yellow font-mono">admin</strong> • Password: <strong className="text-arcade-yellow font-mono">codechef7</strong></span>
          </div>
        </div>

        {errorMessage && (
          <div className="mb-5 p-3 rounded-lg border-2 border-arcade-red bg-arcade-red/15 text-arcade-red text-xs font-mono shadow-arcade-red flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <div className="font-arcade text-[9px] mb-0.5">ACCESS DENIED</div>
              <div className="text-slate-200">{errorMessage}</div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 font-sans text-sm">
          <div>
            <label className="block font-arcade text-[10px] text-slate-300 uppercase mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-arcade-cyan" />
              Operator Username
            </label>
            <input
              type="text"
              required
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              className="w-full bg-arcade-dark border border-arcade-border rounded-lg px-3.5 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-arcade-pink transition-colors text-sm font-sans"
            />
          </div>

          <div>
            <label className="block font-arcade text-[10px] text-slate-300 uppercase mb-1.5 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-arcade-pink" />
              Security Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="codechef7"
              className="w-full bg-arcade-dark border border-arcade-border rounded-lg px-3.5 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-arcade-pink transition-colors text-sm font-sans"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded bg-arcade-pink text-white font-arcade text-xs font-bold hover:bg-pink-600 active:scale-[0.98] transition-all shadow-arcade-pink flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>VERIFYING PASSCODE...</span>
                </>
              ) : (
                <>
                  <KeyRound className="w-4 h-4" />
                  <span>AUTHORIZE & ENTER</span>
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 pt-4 border-t border-arcade-border/60 text-center font-vt text-slate-500 text-sm">
          <span>LOCALSTORAGE SESSION PROTECTED • CODECHEF 7.0</span>
        </div>
      </div>
    </div>
  );
}
