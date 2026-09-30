import React from 'react';

export default function PacManLoader({ text = 'LOADING ARCADE QUESTS...' }) {
  return (
    <div className="py-20 flex flex-col items-center justify-center text-center">
      {/* Pac-Man eating dots animation */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative w-10 h-10 bg-arcade-yellow rounded-full flex items-center justify-center shadow-arcade-yellow overflow-hidden">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-y-[10px] border-y-transparent border-r-[20px] border-r-arcade-dark animate-chomp"></div>
          <div className="absolute top-2 left-3 w-1.5 h-1.5 bg-arcade-dark rounded-full"></div>
        </div>

        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 bg-arcade-yellow rounded-full animate-pulse"></span>
          <span className="w-2.5 h-2.5 bg-arcade-yellow rounded-full animate-pulse delay-75"></span>
          <span className="w-2.5 h-2.5 bg-arcade-yellow rounded-full animate-pulse delay-150"></span>
          <span className="w-2.5 h-2.5 bg-arcade-yellow rounded-full animate-pulse delay-200"></span>
        </div>

        <span className="text-2xl animate-ghost-float">👻</span>
      </div>

      <p className="font-arcade text-xs text-arcade-yellow tracking-wider animate-pulse">
        {text}
      </p>
      <p className="font-vt text-slate-400 text-lg mt-1">INSERT COIN TO CONTINUE</p>
    </div>
  );
}
