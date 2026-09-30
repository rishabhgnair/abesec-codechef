import React from 'react';
import { Calendar, Clock, MapPin, Users, Award, Sparkles } from 'lucide-react';

export default function EventCard({ event, onRegisterClick }) {
  const isFull = event.maxSeats !== null && event.registeredCount >= event.maxSeats;
  const seatsLeft = event.maxSeats !== null ? Math.max(0, event.maxSeats - event.registeredCount) : null;
  const percentFilled = event.maxSeats ? Math.min(100, Math.round((event.registeredCount / event.maxSeats) * 100)) : 0;

  const getCategoryColor = (cat) => {
    switch (cat) {
      case 'Coding':
        return 'border-arcade-yellow text-arcade-yellow bg-arcade-yellow/10';
      case 'Workshop':
        return 'border-arcade-cyan text-arcade-cyan bg-arcade-cyan/10';
      case 'Quiz':
        return 'border-arcade-pink text-arcade-pink bg-arcade-pink/10';
      case 'Gaming':
        return 'border-arcade-red text-arcade-red bg-arcade-red/10';
      case 'Design':
        return 'border-purple-400 text-purple-400 bg-purple-400/10';
      case 'Talk':
        return 'border-arcade-orange text-arcade-orange bg-arcade-orange/10';
      default:
        return 'border-slate-400 text-slate-300 bg-slate-800/40';
    }
  };

  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div
      className={`group relative bg-arcade-card rounded-xl border-2 transition-all duration-300 flex flex-col overflow-hidden ${
        event.featured
          ? 'border-arcade-yellow shadow-[0_0_20px_rgba(255,230,0,0.25)] hover:shadow-[0_0_25px_rgba(255,230,0,0.45)]'
          : 'border-arcade-border hover:border-arcade-cyan/60 hover:shadow-[0_0_15px_rgba(0,229,255,0.2)]'
      }`}
    >
      {/* Poster Image */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-900">
        <img
          src={event.posterUrl || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80'}
          alt={event.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80';
          }}
        />

        {/* Scanline overlay effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-arcade-card via-transparent to-black/30 pointer-events-none"></div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <span className={`px-2.5 py-1 rounded font-arcade text-[10px] uppercase border ${getCategoryColor(event.category)}`}>
            {event.category}
          </span>
          {event.featured && (
            <span className="px-2.5 py-1 rounded font-arcade text-[10px] uppercase border border-arcade-yellow text-arcade-dark bg-arcade-yellow font-bold shadow-arcade-yellow flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> FEATURED
            </span>
          )}
        </div>

        {/* Full / Sold Out Badge */}
        {isFull && (
          <div className="absolute inset-0 bg-arcade-dark/85 backdrop-blur-[2px] flex items-center justify-center">
            <div className="border-2 border-arcade-red px-4 py-2 bg-arcade-red/20 rounded shadow-arcade-red transform -rotate-3 text-center">
              <span className="font-arcade text-arcade-red text-sm font-bold tracking-widest block animate-pulse">
                GAME OVER
              </span>
              <span className="font-vt text-slate-200 text-lg tracking-wider">
                SEATS SOLD OUT
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-arcade text-sm text-slate-100 group-hover:text-arcade-yellow transition-colors leading-relaxed line-clamp-2 mb-2">
            {event.name}
          </h3>

          <p className="text-slate-400 text-xs font-sans line-clamp-2 mb-4 leading-relaxed">
            {event.description}
          </p>

          {/* Details list */}
          <div className="space-y-2 text-xs font-sans text-slate-300 mb-4 bg-arcade-dark/60 p-3 rounded-lg border border-arcade-border/50">
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-arcade-cyan shrink-0" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-arcade-pink shrink-0" />
              <span>{event.time.slice(0, 5)} hrs</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-arcade-yellow shrink-0" />
              <span className="truncate">{event.venue}</span>
            </div>
          </div>
        </div>

        {/* Seats & Action */}
        <div>
          {/* Seats bar */}
          {event.maxSeats !== null && (
            <div className="mb-4">
              <div className="flex items-center justify-between text-[11px] mb-1 font-vt text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-arcade-yellow" />
                  CAPACITY: {event.registeredCount} / {event.maxSeats}
                </span>
                <span className={`font-bold ${isFull ? 'text-arcade-red' : seatsLeft <= 10 ? 'text-arcade-orange' : 'text-arcade-green'}`}>
                  {isFull ? '0 SEATS LEFT' : `${seatsLeft} SEATS LEFT`}
                </span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                <div
                  className={`h-full transition-all duration-500 rounded-full ${
                    isFull
                      ? 'bg-arcade-red shadow-arcade-red'
                      : percentFilled > 80
                      ? 'bg-arcade-orange'
                      : 'bg-arcade-green shadow-[0_0_8px_rgba(0,230,118,0.5)]'
                  }`}
                  style={{ width: `${percentFilled}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Button */}
          <button
            onClick={() => onRegisterClick(event)}
            disabled={isFull}
            className={`w-full py-2.5 px-4 rounded font-arcade text-xs tracking-wider transition-all flex items-center justify-center gap-2 ${
              isFull
                ? 'bg-slate-800/80 text-slate-500 cursor-not-allowed border border-slate-700'
                : 'bg-arcade-yellow text-arcade-dark font-bold hover:bg-yellow-400 active:scale-[0.98] shadow-arcade-yellow'
            }`}
          >
            {isFull ? 'SOLD OUT' : 'INSERT COIN • REGISTER'}
          </button>
        </div>
      </div>
    </div>
  );
}
