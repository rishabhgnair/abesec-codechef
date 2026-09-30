import React from 'react';
import { Search, Filter, Terminal } from 'lucide-react';

const CATEGORIES = ['All', 'Coding', 'Workshop', 'Quiz', 'Gaming', 'Design', 'Talk'];

export default function EventFilter({
  selectedCategory,
  onSelectCategory,
  searchTerm,
  onSearchChange,
  eventCount
}) {
  return (
    <div className="bg-arcade-card border border-arcade-border rounded-xl p-4 md:p-6 mb-8 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-3 py-1.5 rounded-lg font-arcade text-[10px] sm:text-[11px] whitespace-nowrap transition-all uppercase ${
                  isSelected
                    ? 'bg-arcade-yellow text-arcade-dark font-bold shadow-arcade-yellow'
                    : 'text-slate-400 hover:text-white bg-arcade-dark/70 hover:bg-arcade-panel border border-arcade-border'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search Input & Counter */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-arcade-yellow absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Filter quests..."
              className="w-full bg-arcade-dark border border-arcade-border rounded-lg pl-9 pr-4 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-arcade-yellow transition-colors font-sans"
            />
            {searchTerm && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white text-xs font-mono"
              >
                ✕
              </button>
            )}
          </div>

          <div className="hidden lg:flex items-center gap-1.5 bg-arcade-dark px-3 py-2 rounded-lg border border-arcade-border font-vt text-arcade-cyan text-base shrink-0">
            <Terminal className="w-3.5 h-3.5" />
            <span>FOUND: {eventCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
