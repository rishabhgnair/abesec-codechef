import React from 'react';

export default function ArcadeFooter() {
  return (
    <footer className="mt-20 border-t-2 border-arcade-border bg-arcade-card/80 py-10 relative overflow-hidden">
      {/* Maze border dots */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-arcade-yellow via-arcade-cyan to-arcade-pink opacity-40"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Chapter & Event Branding */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-arcade text-arcade-yellow text-sm">CODECHEF 7.0</span>
              <span className="text-slate-500">•</span>
              <span className="font-vt text-slate-300 text-lg">ARCADE EDITION</span>
            </div>
            <p className="text-slate-400 text-xs font-sans max-w-md">
              Organized with passion by CodeChef ABESEC Chapter. Powering competitive programming, hackathons, and arcade tech spirit across campus.
            </p>
          </div>

          {/* Retro Arcade Cast (Pac-Man & Ghosts) */}
          <div className="flex items-center gap-4 bg-arcade-dark px-4 py-2 rounded-full border border-arcade-border text-2xl">
            <span title="Pac-Man" className="hover:scale-125 transition-transform cursor-pointer">🟡</span>
            <span title="Blinky (Red Ghost)" className="hover:scale-125 transition-transform cursor-pointer">🔴</span>
            <span title="Pinky (Pink Ghost)" className="hover:scale-125 transition-transform cursor-pointer">🌸</span>
            <span title="Inky (Cyan Ghost)" className="hover:scale-125 transition-transform cursor-pointer">🩵</span>
            <span title="Clyde (Orange Ghost)" className="hover:scale-125 transition-transform cursor-pointer">🟧</span>
          </div>

          {/* Credits */}
          <div className="text-center md:text-right">
            <div className="font-vt text-slate-400 text-base">
              HIGH SCORE SAVED TO SUPABASE
            </div>
            <div className="font-arcade text-[10px] text-slate-500 mt-1">
              © 2026 ABESEC CODECHEF • ALL RIGHTS RESERVED
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
