import React, { createContext, useContext, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';

const ToastContext = createContext({
  showToast: () => {},
});

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'info') => {
    const id = Date.now() + Math.random().toString();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const getToastStyles = (type) => {
    switch (type) {
      case 'success':
        return 'border-arcade-green text-arcade-green bg-arcade-dark/95 shadow-[0_0_15px_rgba(0,230,118,0.4)]';
      case 'error':
        return 'border-arcade-red text-arcade-red bg-arcade-dark/95 shadow-[0_0_15px_rgba(255,23,68,0.4)]';
      case 'warning':
        return 'border-arcade-orange text-arcade-orange bg-arcade-dark/95 shadow-[0_0_15px_rgba(255,145,0,0.4)]';
      default:
        return 'border-arcade-cyan text-arcade-cyan bg-arcade-dark/95 shadow-[0_0_15px_rgba(0,229,255,0.4)]';
    }
  };

  const getToastIcon = (type) => {
    switch (type) {
      case 'success':
        return <span className="text-xl">🟡</span>; // Pac-Man power pellet
      case 'error':
        return <span className="text-xl">👻</span>; // Ghost
      case 'warning':
        return <span className="text-xl">⚠️</span>;
      default:
        return <span className="text-xl">🍒</span>; // Cherry
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-md w-full px-4 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className={`pointer-events-auto border-2 rounded-lg p-4 flex items-start gap-3 backdrop-blur-md ${getToastStyles(
                toast.type
              )}`}
            >
              <div className="shrink-0 pt-0.5">{getToastIcon(toast.type)}</div>
              <div className="flex-1">
                <div className="font-arcade text-[10px] uppercase tracking-wider mb-1 opacity-80">
                  {toast.type === 'error' ? 'SYSTEM ERROR' : toast.type === 'success' ? 'HIGH SCORE' : 'ARCADE NOTICE'}
                </div>
                <div className="font-sans text-sm font-medium text-slate-100 break-words">
                  {toast.message}
                </div>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="shrink-0 text-slate-400 hover:text-white transition-colors p-1"
                aria-label="Close notification"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
