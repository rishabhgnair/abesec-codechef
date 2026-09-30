import React, { useState, useEffect, useMemo } from 'react';
import { getEvents } from '../services/api';
import EventCard from '../components/EventCard';
import EventFilter from '../components/EventFilter';
import RegisterModal from '../components/RegisterModal';
import PacManLoader from '../components/PacManLoader';
import SectionTitle from '../components/SectionTitle';
import EasterEggGame from '../components/EasterEggGame';
import useKonamiCode from '../hooks/useKonamiCode';
import { useToast } from '../context/ToastContext';
import { Sparkles, Calendar, Clock, Users, RefreshCw, Trophy } from 'lucide-react';

export default function HomePage({ isEasterEggOpen, setIsEasterEggOpen }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [registeringEvent, setRegisteringEvent] = useState(null);

  const { showToast } = useToast();

  // Listen for Konami Code (↑ ↑ ↓ ↓ ← → ← → B A)
  useKonamiCode(() => {
    showToast('KONAMI CODE DETECTED! UNLOCKING ARCADE ARENA...', 'success');
    if (setIsEasterEggOpen) {
      setIsEasterEggOpen(true);
    }
  });

  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getEvents();
      setEvents(data);
    } catch (err) {
      console.error('Failed to load events:', err);
      setError(err.message || 'Failed to fetch events');
      showToast('ERROR LOADING EVENTS', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Filtered events
  const filteredEvents = useMemo(() => {
    return events.filter((ev) => {
      const matchesCategory =
        selectedCategory === 'All' || ev.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch =
        ev.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ev.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ev.venue.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [events, selectedCategory, searchTerm]);

  // Featured event
  const featuredEvent = useMemo(() => {
    return events.find((ev) => ev.featured) || null;
  }, [events]);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* HERO SECTION: Featured Event */}
        {featuredEvent && (
          <section className="mb-12 relative">
            <div className="relative overflow-hidden rounded-2xl border-4 border-arcade-yellow bg-arcade-card p-6 md:p-10 shadow-[0_0_30px_rgba(255,230,0,0.25)]">
              <div className="absolute top-0 right-0 w-96 h-96 bg-arcade-neonBlue/15 rounded-full blur-3xl pointer-events-none"></div>

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3 py-1 bg-arcade-yellow text-arcade-dark font-arcade text-xs rounded font-bold shadow-arcade-yellow flex items-center gap-1.5 animate-pulse">
                      <Trophy className="w-3.5 h-3.5" />
                      FLAGSHIP QUEST • FEATURED
                    </span>
                    <span className="px-3 py-1 bg-arcade-dark border border-arcade-border text-arcade-cyan font-vt text-lg rounded">
                      CATEGORY: {featuredEvent.category}
                    </span>
                  </div>

                  <h1 className="font-arcade text-xl sm:text-2xl md:text-3xl text-white tracking-wide leading-tight text-glow-yellow">
                    {featuredEvent.name}
                  </h1>

                  <p className="text-slate-300 font-sans text-sm md:text-base leading-relaxed line-clamp-3">
                    {featuredEvent.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <div className="bg-arcade-dark/70 border border-arcade-border p-3 rounded-lg flex items-center gap-2.5">
                      <Calendar className="w-4 h-4 text-arcade-cyan shrink-0" />
                      <div>
                        <div className="text-[10px] font-arcade text-slate-400">DATE</div>
                        <div className="text-xs font-mono text-white">{featuredEvent.date}</div>
                      </div>
                    </div>

                    <div className="bg-arcade-dark/70 border border-arcade-border p-3 rounded-lg flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-arcade-pink shrink-0" />
                      <div>
                        <div className="text-[10px] font-arcade text-slate-400">TIME</div>
                        <div className="text-xs font-mono text-white">{featuredEvent.time.slice(0, 5)} hrs</div>
                      </div>
                    </div>

                    <div className="bg-arcade-dark/70 border border-arcade-border p-3 rounded-lg flex items-center gap-2.5">
                      <Users className="w-4 h-4 text-arcade-yellow shrink-0" />
                      <div>
                        <div className="text-[10px] font-arcade text-slate-400">AVAILABLE SEATS</div>
                        <div className="text-xs font-mono text-arcade-green font-bold">
                          {featuredEvent.maxSeats
                            ? `${Math.max(0, featuredEvent.maxSeats - featuredEvent.registeredCount)} / ${featuredEvent.maxSeats}`
                            : 'OPEN'}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center gap-4">
                    <button
                      onClick={() => setRegisteringEvent(featuredEvent)}
                      disabled={featuredEvent.maxSeats !== null && featuredEvent.registeredCount >= featuredEvent.maxSeats}
                      className="px-6 py-3.5 bg-arcade-yellow text-arcade-dark font-arcade text-xs md:text-sm font-bold rounded-lg hover:bg-yellow-400 active:scale-95 transition-all shadow-arcade-yellow flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Sparkles className="w-4 h-4" />
                      {featuredEvent.maxSeats !== null && featuredEvent.registeredCount >= featuredEvent.maxSeats
                        ? 'SEATS SOLD OUT'
                        : 'INSERT COIN • REGISTER NOW'}
                    </button>
                    <span className="font-vt text-slate-400 text-lg hidden sm:inline">
                      READY PLAYER ONE?
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="relative aspect-video lg:aspect-square rounded-xl overflow-hidden border-2 border-arcade-yellow/70 shadow-2xl group">
                    <img
                      src={featuredEvent.posterUrl || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=80'}
                      alt={featuredEvent.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
                    <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center text-xs font-vt text-arcade-yellow">
                      <span>LOCATION: {featuredEvent.venue}</span>
                      <span>STAGE 1</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Section Title & Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
          <SectionTitle
            subtitle="ALL ACTIVE CAMPAIGNS"
            title="QUEST CATALOG"
            highlight="7.0"
          />

          <button
            onClick={fetchEvents}
            disabled={loading}
            className="px-3 py-1.5 rounded bg-arcade-card border border-arcade-border text-slate-300 hover:text-arcade-yellow font-arcade text-[10px] flex items-center gap-2 transition-all active:scale-95"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            REFRESH
          </button>
        </div>

        {/* SEARCH AND CATEGORY FILTER */}
        <EventFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          eventCount={filteredEvents.length}
        />

        {/* LOADING STATE */}
        {loading && <PacManLoader text="LOADING ARCADE QUESTS..." />}

        {/* ERROR STATE */}
        {!loading && error && (
          <div className="py-16 bg-arcade-card border-2 border-arcade-red rounded-xl p-8 text-center max-w-xl mx-auto shadow-arcade-red">
            <div className="text-4xl mb-4">👾</div>
            <h3 className="font-arcade text-arcade-red text-sm mb-2">SYSTEM ERROR</h3>
            <p className="text-slate-300 font-sans text-xs mb-6">{error}</p>
            <button
              onClick={fetchEvents}
              className="px-5 py-2.5 bg-arcade-red text-white font-arcade text-xs rounded hover:bg-red-600 transition-colors shadow-arcade-red font-bold"
            >
              RETRY CONNECTION
            </button>
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && !error && filteredEvents.length === 0 && (
          <div className="py-20 text-center bg-arcade-card/60 rounded-xl border border-arcade-border p-8">
            <div className="text-4xl mb-3">👻</div>
            <h3 className="font-arcade text-sm text-arcade-yellow mb-2">
              NO QUESTS FOUND IN THIS MAZE
            </h3>
            <p className="text-slate-400 font-sans text-xs max-w-md mx-auto mb-6">
              No events matched category "{selectedCategory}" or search "{searchTerm}". Try changing your filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchTerm('');
              }}
              className="px-4 py-2 bg-arcade-panel border border-arcade-cyan text-arcade-cyan font-arcade text-[10px] rounded hover:bg-arcade-cyan/10 transition-colors"
            >
              RESET ALL FILTERS
            </button>
          </div>
        )}

        {/* EVENTS GRID */}
        {!loading && !error && filteredEvents.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onRegisterClick={(ev) => setRegisteringEvent(ev)}
              />
            ))}
          </div>
        )}

        {/* REGISTRATION MODAL */}
        <RegisterModal
          event={registeringEvent}
          isOpen={Boolean(registeringEvent)}
          onClose={() => setRegisteringEvent(null)}
          onRegistered={fetchEvents}
        />
      </main>
    </div>
  );
}
