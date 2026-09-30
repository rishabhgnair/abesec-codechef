import React from 'react';
import { Terminal, KeyRound, AlertTriangle, ExternalLink, RefreshCw } from 'lucide-react';

export default function MissingKeysScreen() {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-arcade-dark text-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-arcade-neonBlue/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-arcade-yellow/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-2xl w-full bg-arcade-card border-4 border-arcade-yellow rounded-xl shadow-arcade-yellow p-6 md:p-8 relative z-10">
        {/* Retro Header Marquee */}
        <div className="flex items-center justify-between border-b-2 border-arcade-border pb-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="w-4 h-4 rounded-full bg-arcade-red animate-ping"></span>
            <span className="font-arcade text-xs md:text-sm text-arcade-yellow">
              SYSTEM ALERT: CONFIG REQUIRED
            </span>
          </div>
          <span className="font-vt text-arcade-cyan text-xl tracking-widest">
            ERROR: 404_KEYS
          </span>
        </div>

        {/* PAC-MAN Arcade Graphic */}
        <div className="flex items-center justify-center gap-4 py-4 mb-6 bg-arcade-dark/60 rounded-lg border border-arcade-border/50">
          <div className="text-3xl animate-bounce">👾</div>
          <div className="flex gap-2">
            <span className="w-3 h-3 bg-arcade-yellow rounded-full animate-pulse"></span>
            <span className="w-3 h-3 bg-arcade-yellow rounded-full animate-pulse delay-75"></span>
            <span className="w-3 h-3 bg-arcade-yellow rounded-full animate-pulse delay-150"></span>
          </div>
          <div className="text-3xl animate-bounce delay-100">👻</div>
          <div className="flex gap-2">
            <span className="w-3 h-3 bg-arcade-yellow rounded-full animate-pulse delay-200"></span>
            <span className="w-3 h-3 bg-arcade-yellow rounded-full animate-pulse delay-300"></span>
          </div>
          <div className="text-3xl">🍒</div>
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="font-arcade text-lg md:text-2xl text-arcade-yellow tracking-wide mb-2 leading-relaxed">
            INSERT SUPABASE KEYS
          </h1>
          <p className="text-slate-300 font-sans text-sm md:text-base">
            The CodeChef 7.0 arcade engine is ready, but your Supabase environment variables are missing or not yet configured in <code className="bg-arcade-dark px-2 py-0.5 rounded text-arcade-cyan font-mono">.env</code>.
          </p>
        </div>

        {/* Step by step box */}
        <div className="bg-arcade-dark/80 rounded-lg p-5 border border-arcade-border mb-6 font-mono text-xs md:text-sm text-slate-300 space-y-3">
          <div className="flex items-center gap-2 text-arcade-cyan font-bold font-sans">
            <Terminal className="w-4 h-4" /> Quick Setup Instructions:
          </div>
          <ol className="list-decimal list-inside space-y-2 pl-1 leading-relaxed text-slate-300">
            <li>
              Create a file named <span className="text-arcade-yellow font-bold">.env</span> in the root directory.
            </li>
            <li>
              Copy the variables from <span className="text-arcade-pink font-bold">.env.example</span>:
              <div className="mt-2 bg-black/60 p-3 rounded border border-slate-800 text-arcade-green font-mono select-all overflow-x-auto">
                <div>VITE_SUPABASE_URL=https://your-project-id.supabase.co</div>
                <div>VITE_SUPABASE_ANON_KEY=your-supabase-anon-key</div>
              </div>
            </li>
            <li>
              Run the SQL scripts located in <span className="text-arcade-yellow font-bold">supabase/schema.sql</span> and <span className="text-arcade-yellow font-bold">supabase/seed.sql</span> in your Supabase SQL Editor.
            </li>
            <li>Save the file and refresh this page.</li>
          </ol>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <button
            onClick={handleReload}
            className="w-full sm:w-auto px-6 py-3 bg-arcade-yellow text-arcade-dark font-arcade text-xs rounded hover:bg-yellow-400 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-arcade-yellow font-bold"
          >
            <RefreshCw className="w-4 h-4" />
            RETRY / RELOAD
          </button>
          <a
            href="https://supabase.com/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3 bg-arcade-panel border border-arcade-cyan/50 text-arcade-cyan font-arcade text-xs rounded hover:bg-arcade-cyan/10 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            OPEN SUPABASE
          </a>
        </div>
      </div>
    </div>
  );
}
