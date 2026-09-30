import React from 'react';
import { X } from 'lucide-react';

export default function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'max-w-lg',
  borderColor = 'border-arcade-yellow',
  shadowColor = 'shadow-arcade-yellow'
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div
        className={`relative w-full ${maxWidth} bg-arcade-card border-4 ${borderColor} rounded-xl ${shadowColor} p-6 md:p-8 my-8 text-slate-100`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-6 h-6" />
        </button>

        {(title || subtitle) && (
          <div className="border-b border-arcade-border pb-4 mb-6">
            {subtitle && (
              <div className="text-arcade-cyan font-vt text-base uppercase mb-1">
                {subtitle}
              </div>
            )}
            {title && (
              <h3 className="font-arcade text-sm md:text-base text-white leading-relaxed">
                {title}
              </h3>
            )}
          </div>
        )}

        {children}
      </div>
    </div>
  );
}
