import React from 'react';

export default function SectionTitle({ title, subtitle, highlight }) {
  return (
    <div className="mb-6">
      {subtitle && (
        <div className="flex items-center gap-2 text-arcade-cyan font-arcade text-xs mb-1">
          <span className="w-2 h-2 rounded-full bg-arcade-cyan animate-pulse"></span>
          <span>{subtitle}</span>
        </div>
      )}
      <h2 className="font-arcade text-lg sm:text-2xl text-white flex items-center gap-2">
        {title}
        {highlight && (
          <span className="text-arcade-yellow text-glow-yellow">{highlight}</span>
        )}
      </h2>
    </div>
  );
}
