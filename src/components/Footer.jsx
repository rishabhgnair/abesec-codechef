import React from 'react';

export default function Footer({ onTriggerEasterEgg }) {
  return (
    <footer className="mt-20 border-t-2 border-arcade-border bg-arcade-card/90 py-10 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-arcade-yellow via-arcade-cyan to-arcade-pink opacity-40"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Chapter Identity */}
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-arcade-yellow/70 bg-white p-1 shadow-arcade-yellow shrink-0">
              <img
                src="/codechef-abesec-logo.jpg"
                alt="CodeChef ABESEC Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1 justify-center md:justify-start">
                <span className="font-arcade text-arcade-yellow text-sm">CODECHEF 7.0</span>
                <span className="text-slate-500">•</span>
                <span className="font-vt text-slate-300 text-lg">&lt;ABESEC&gt; CHAPTER</span>
              </div>
              <p className="text-slate-400 text-xs font-sans max-w-md">
                Official student chapter portal for competitive programming, hackathons, and arcade tech spirit at ABESEC Ghaziabad.
              </p>
            </div>
          </div>

          {/* Arcade Cast with Easter Egg trigger */}
          <div className="flex items-center gap-4 bg-arcade-dark px-4 py-2 rounded-full border border-arcade-border text-2xl">
            <span title="Pac-Man" className="hover:scale-125 transition-transform cursor-pointer">🟡</span>
            <button
              onClick={onTriggerEasterEgg}
              title="Click for Easter Egg!"
              className="hover:scale-125 transition-transform"
            >
              👻
            </button>
            <span title="Power Pellet" className="hover:scale-125 transition-transform cursor-pointer">🍒</span>
          </div>

          <div className="text-center md:text-right">
            <div className="font-vt text-slate-400 text-base">
              CREDENTIALS: ADMIN / CODECHEF7
            </div>
            <div className="font-arcade text-[10px] text-slate-500 mt-1">
              © 2026 CODECHEF ABESEC • ALL RIGHTS RESERVED
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
