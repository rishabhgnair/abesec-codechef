import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import {
  getEvents,
  addEvent,
  updateEvent,
  deleteEvent,
  getRegistrations,
  deleteRegistration
} from '../services/api';
import { exportRegistrationsToCSV } from '../utils/csvExport';
import Modal from '../components/Modal';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Award,
  Plus,
  Trash2,
  Edit,
  Download,
  Search,
  Filter,
  LogOut,
  RefreshCw,
  Sparkles,
  AlertTriangle,
  ExternalLink,
  ChevronRight,
  Shield,
  Layers,
  GraduationCap
} from 'lucide-react';

const CATEGORIES = ['Coding', 'Workshop', 'Quiz', 'Gaming', 'Design', 'Talk'];
const COLLEGE_YEARS = ['All', '1st Year', '2nd Year', '3rd Year', '4th Year', 'Faculty / Other'];

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState('events'); // 'events' | 'registrations'

  // Data states
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Registrations filtering
  const [selectedEventFilter, setSelectedEventFilter] = useState('all');
  const [selectedYearFilter, setSelectedYearFilter] = useState('All');
  const [registrationSearch, setRegistrationSearch] = useState('');

  // Event modal state
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [eventFormData, setEventFormData] = useState({
    name: '',
    category: 'Coding',
    date: '',
    time: '10:00:00',
    venue: '',
    maxSeats: 100,
    posterUrl: '',
    featured: false,
    description: ''
  });
  const [savingEvent, setSavingEvent] = useState(false);

  // Deletion modal state
  const [deletingItem, setDeletingItem] = useState(null); // { type: 'event' | 'registration', id: string, name: string }
  const [isDeleting, setIsDeleting] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const [eventsData, regsData] = await Promise.all([
        getEvents(),
        getRegistrations('all')
      ]);
      setEvents(eventsData);
      setRegistrations(regsData);
    } catch (err) {
      console.error('Error loading admin data:', err);
      showToast(err.message || 'Failed to load data', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      showToast('LOGGED OUT SUCCESSFULLY', 'info');
      navigate('/admin/login');
    } catch (err) {
      showToast(err.message || 'Logout failed', 'error');
    }
  };

  // Summary Stat Cards
  const stats = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    const totalEvents = events.length;
    const upcomingEvents = events.filter((ev) => ev.date >= today).length;
    const totalRegistrations = registrations.length;

    return {
      totalEvents,
      upcomingEvents,
      totalRegistrations
    };
  }, [events, registrations]);

  // Filtered registrations
  const filteredRegistrations = useMemo(() => {
    return registrations.filter((reg) => {
      const matchesEvent =
        selectedEventFilter === 'all' || reg.eventId === selectedEventFilter;
      const matchesYear =
        selectedYearFilter === 'All' || reg.collegeYear === selectedYearFilter;

      const searchLower = registrationSearch.toLowerCase().trim();
      const matchesSearch =
        !searchLower ||
        reg.name.toLowerCase().includes(searchLower) ||
        reg.email.toLowerCase().includes(searchLower);

      return matchesEvent && matchesYear && matchesSearch;
    });
  }, [registrations, selectedEventFilter, selectedYearFilter, registrationSearch]);

  // CSV Export
  const handleExportCSV = () => {
    if (filteredRegistrations.length === 0) {
      showToast('NO REGISTRATIONS TO EXPORT', 'warning');
      return;
    }
    exportRegistrationsToCSV(
      filteredRegistrations,
      `codechef7_registrations_${Date.now()}.csv`
    );
    showToast(`EXPORTED ${filteredRegistrations.length} REGISTRATIONS AS CSV!`, 'success');
  };

  // Add Event
  const handleOpenAddEvent = () => {
    setEditingEvent(null);
    setEventFormData({
      name: '',
      category: 'Coding',
      date: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      time: '10:00:00',
      venue: 'Main Auditorium, ABESEC',
      maxSeats: 100,
      posterUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
      featured: false,
      description: ''
    });
    setIsEventModalOpen(true);
  };

  // Edit Event
  const handleOpenEditEvent = (ev) => {
    setEditingEvent(ev);
    setEventFormData({
      name: ev.name,
      category: ev.category,
      date: ev.date,
      time: ev.time,
      venue: ev.venue,
      maxSeats: ev.maxSeats || 100,
      posterUrl: ev.posterUrl || '',
      featured: Boolean(ev.featured),
      description: ev.description || ''
    });
    setIsEventModalOpen(true);
  };

  // Save Event (Add or Update)
  const handleSaveEvent = async (e) => {
    e.preventDefault();
    if (!eventFormData.name.trim() || !eventFormData.date || !eventFormData.time) {
      showToast('Please fill in all required event details', 'warning');
      return;
    }

    setSavingEvent(true);
    try {
      if (editingEvent) {
        await updateEvent(editingEvent.id, eventFormData);
        showToast(`EVENT "${eventFormData.name}" UPDATED!`, 'success');
      } else {
        await addEvent(eventFormData);
        showToast(`NEW EVENT "${eventFormData.name}" ADDED!`, 'success');
      }
      setIsEventModalOpen(false);
      await loadData();
    } catch (err) {
      showToast(err.message || 'Failed to save event', 'error');
    } finally {
      setSavingEvent(false);
    }
  };

  // Confirm Delete
  const handleConfirmDelete = async () => {
    if (!deletingItem) return;
    setIsDeleting(true);
    try {
      if (deletingItem.type === 'event') {
        await deleteEvent(deletingItem.id);
        showToast(`EVENT AND REGISTRATIONS DELETED`, 'success');
      } else {
        await deleteRegistration(deletingItem.id);
        showToast(`REGISTRATION REMOVED`, 'success');
      }
      setDeletingItem(null);
      await loadData();
    } catch (err) {
      showToast(err.message || 'Deletion failed', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-arcade-dark text-slate-100 flex flex-col md:flex-row">
      {/* SIDEBAR */}
      <aside className="w-full md:w-64 bg-arcade-card border-r-2 border-arcade-border flex flex-col justify-between shrink-0">
        <div>
          {/* Sidebar Header with Official Chapter Logo */}
          <div className="p-5 border-b border-arcade-border flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl overflow-hidden border-2 border-arcade-yellow bg-white p-0.5 shadow-arcade-yellow shrink-0">
              <img
                src="/codechef-abesec-logo.jpg"
                alt="CodeChef ABESEC"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="font-arcade text-xs text-arcade-yellow tracking-wider">
                ADMIN ARENA
              </div>
              <div className="font-vt text-slate-400 text-sm">
                OPERATOR: {user?.username || 'admin'}
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-2 font-arcade text-xs">
            <button
              onClick={() => setActiveTab('events')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
                activeTab === 'events'
                  ? 'bg-arcade-yellow text-arcade-dark font-bold shadow-arcade-yellow'
                  : 'text-slate-300 hover:bg-arcade-panel hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4" />
                <span>EVENTS ({events.length})</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setActiveTab('registrations')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
                activeTab === 'registrations'
                  ? 'bg-arcade-cyan text-arcade-dark font-bold shadow-arcade-cyan'
                  : 'text-slate-300 hover:bg-arcade-panel hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4" />
                <span>REGISTRATIONS ({registrations.length})</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </nav>
        </div>

        {/* Sidebar Footer Actions */}
        <div className="p-4 border-t border-arcade-border space-y-2">
          <Link
            to="/"
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-lg border border-arcade-border text-slate-300 hover:bg-arcade-panel hover:text-arcade-yellow font-arcade text-xs transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>PUBLIC QUESTS</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-lg bg-arcade-red/20 border border-arcade-red text-arcade-red hover:bg-arcade-red hover:text-white font-arcade text-xs transition-colors shadow-arcade-red"
          >
            <LogOut className="w-4 h-4" />
            <span>LOGOUT</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 mb-8 border-b border-arcade-border">
          <div>
            <h1 className="font-arcade text-xl sm:text-2xl text-white flex items-center gap-2">
              MISSION CONTROL DASHBOARD
            </h1>
            <p className="font-vt text-slate-400 text-lg">
              REAL-TIME LOCALSTORAGE STORE • ABESEC CHAPTER 7.0
            </p>
          </div>

          <button
            onClick={loadData}
            disabled={loading}
            className="px-3.5 py-2 rounded bg-arcade-card border border-arcade-border text-slate-300 hover:text-arcade-yellow font-arcade text-xs flex items-center gap-2 active:scale-95 transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>REFRESH</span>
          </button>
        </div>

        {/* SUMMARY STAT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          {/* Card 1: Total Events */}
          <div className="bg-arcade-card border-2 border-arcade-border hover:border-arcade-yellow transition-all rounded-xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-arcade text-[10px] text-slate-400 uppercase">TOTAL EVENTS</span>
              <Calendar className="w-4 h-4 text-arcade-yellow" />
            </div>
            <div className="font-arcade text-2xl text-white">{stats.totalEvents}</div>
            <div className="font-vt text-slate-400 text-sm mt-1">AVAILABLE IN CATALOG</div>
          </div>

          {/* Card 2: Upcoming Events */}
          <div className="bg-arcade-card border-2 border-arcade-border hover:border-arcade-cyan transition-all rounded-xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-arcade text-[10px] text-slate-400 uppercase">UPCOMING EVENTS</span>
              <Clock className="w-4 h-4 text-arcade-cyan" />
            </div>
            <div className="font-arcade text-2xl text-arcade-cyan">{stats.upcomingEvents}</div>
            <div className="font-vt text-slate-400 text-sm mt-1">SCHEDULED FUTURE QUESTS</div>
          </div>

          {/* Card 3: Total Registrations */}
          <div className="bg-arcade-card border-2 border-arcade-border hover:border-arcade-green transition-all rounded-xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-arcade text-[10px] text-slate-400 uppercase">TOTAL REGISTRATIONS</span>
              <Users className="w-4 h-4 text-arcade-green" />
            </div>
            <div className="font-arcade text-2xl text-arcade-green">{stats.totalRegistrations}</div>
            <div className="font-vt text-slate-400 text-sm mt-1">ACTIVE ENROLLED PLAYERS</div>
          </div>
        </div>

        {/* TAB 1: EVENTS MANAGEMENT */}
        {activeTab === 'events' && (
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h2 className="font-arcade text-base sm:text-lg text-white">
                  EVENTS MANAGEMENT
                </h2>
                <p className="font-vt text-slate-400 text-base">
                  ADD, EDIT, DELETE AND CONFIGURE FEATURED STATUS
                </p>
              </div>

              <button
                onClick={handleOpenAddEvent}
                className="px-4 py-2.5 rounded bg-arcade-yellow text-arcade-dark font-arcade text-xs font-bold hover:bg-yellow-400 active:scale-95 transition-all shadow-arcade-yellow flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>ADD EVENT</span>
              </button>
            </div>

            {events.length === 0 ? (
              <div className="bg-arcade-card border border-arcade-border rounded-xl p-8 text-center">
                <p className="font-arcade text-xs text-slate-400 mb-4">NO EVENTS FOUND</p>
                <button
                  onClick={handleOpenAddEvent}
                  className="px-4 py-2 bg-arcade-yellow text-arcade-dark font-arcade text-xs rounded font-bold"
                >
                  CREATE YOUR FIRST EVENT
                </button>
              </div>
            ) : (
              <div className="bg-arcade-card border border-arcade-border rounded-xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-sans text-xs sm:text-sm">
                    <thead className="bg-arcade-panel text-slate-400 font-arcade text-[10px] uppercase border-b border-arcade-border">
                      <tr>
                        <th className="p-4">Event</th>
                        <th className="p-4">Category</th>
                        <th className="p-4">Schedule</th>
                        <th className="p-4">Venue</th>
                        <th className="p-4">Seats / Registered</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-arcade-border">
                      {events.map((ev) => (
                        <tr key={ev.id} className="hover:bg-arcade-dark/50 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={ev.posterUrl || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=150&q=80'}
                                alt=""
                                className="w-12 h-12 object-cover rounded border border-arcade-border shrink-0"
                              />
                              <div>
                                <div className="font-bold text-white flex items-center gap-2">
                                  {ev.name}
                                  {ev.featured && (
                                    <span className="px-2 py-0.5 rounded bg-arcade-yellow text-arcade-dark font-arcade text-[9px] font-bold shadow-arcade-yellow">
                                      ★ FEATURED
                                    </span>
                                  )}
                                </div>
                                <div className="text-slate-400 text-xs line-clamp-1 max-w-xs font-sans">
                                  {ev.description}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="px-2.5 py-1 rounded bg-arcade-dark border border-arcade-border font-arcade text-[10px] text-arcade-cyan">
                              {ev.category}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="font-mono text-slate-200">{ev.date}</div>
                            <div className="font-vt text-slate-400 text-sm">{ev.time.slice(0, 5)} hrs</div>
                          </td>
                          <td className="p-4 text-slate-300 font-sans">{ev.venue}</td>
                          <td className="p-4">
                            <div className="font-mono font-bold text-arcade-green">
                              {ev.registeredCount} / {ev.maxSeats || '∞'}
                            </div>
                            <div className="text-[11px] text-slate-400">
                              {ev.maxSeats ? `${Math.max(0, ev.maxSeats - ev.registeredCount)} left` : 'Unlimited'}
                            </div>
                          </td>
                          <td className="p-4">
                            {ev.maxSeats && ev.registeredCount >= ev.maxSeats ? (
                              <span className="px-2 py-0.5 rounded bg-arcade-red/20 text-arcade-red border border-arcade-red font-arcade text-[9px]">
                                FULL
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded bg-arcade-green/20 text-arcade-green border border-arcade-green font-arcade text-[9px]">
                                OPEN
                              </span>
                            )}
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleOpenEditEvent(ev)}
                                className="p-1.5 rounded hover:bg-arcade-panel text-arcade-cyan transition-colors"
                                title="Edit Event"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setDeletingItem({ type: 'event', id: ev.id, name: ev.name })}
                                className="p-1.5 rounded hover:bg-arcade-panel text-arcade-red transition-colors"
                                title="Delete Event"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: REGISTRATIONS MANAGEMENT */}
        {activeTab === 'registrations' && (
          <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <h2 className="font-arcade text-base sm:text-lg text-white">
                  REGISTRATIONS MANAGEMENT
                </h2>
                <div className="flex items-center gap-3 mt-1">
                  <span className="font-vt text-slate-400 text-base">
                    VIEWING ALL SUBMITTED REGISTRATIONS
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-arcade-cyan/20 border border-arcade-cyan text-arcade-cyan font-arcade text-[10px]">
                    {filteredRegistrations.length} RESULTS
                  </span>
                </div>
              </div>

              <button
                onClick={handleExportCSV}
                className="px-4 py-2.5 rounded bg-arcade-green text-arcade-dark font-arcade text-xs font-bold hover:bg-emerald-400 active:scale-95 transition-all shadow-[0_0_15px_rgba(0,230,118,0.4)] flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>EXPORT FILTERED CSV</span>
              </button>
            </div>

            {/* Filters Row */}
            <div className="bg-arcade-card border border-arcade-border rounded-xl p-4 mb-6 grid grid-cols-1 sm:grid-cols-12 gap-4">
              {/* Event selector */}
              <div className="sm:col-span-4">
                <label className="block font-arcade text-[10px] text-slate-400 uppercase mb-1 flex items-center gap-1.5">
                  <Filter className="w-3.5 h-3.5 text-arcade-cyan" />
                  Filter By Event
                </label>
                <select
                  value={selectedEventFilter}
                  onChange={(e) => setSelectedEventFilter(e.target.value)}
                  className="w-full bg-arcade-dark border border-arcade-border rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-arcade-cyan text-xs sm:text-sm font-sans"
                >
                  <option value="all">All Events ({registrations.length})</option>
                  {events.map((ev) => (
                    <option key={ev.id} value={ev.id}>
                      {ev.name} ({ev.registeredCount})
                    </option>
                  ))}
                </select>
              </div>

              {/* College Year Filter */}
              <div className="sm:col-span-3">
                <label className="block font-arcade text-[10px] text-slate-400 uppercase mb-1 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-arcade-pink" />
                  Filter By Year
                </label>
                <select
                  value={selectedYearFilter}
                  onChange={(e) => setSelectedYearFilter(e.target.value)}
                  className="w-full bg-arcade-dark border border-arcade-border rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-arcade-pink text-xs sm:text-sm font-sans"
                >
                  {COLLEGE_YEARS.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>

              {/* Search by Name/Email */}
              <div className="sm:col-span-5">
                <label className="block font-arcade text-[10px] text-slate-400 uppercase mb-1 flex items-center gap-1.5">
                  <Search className="w-3.5 h-3.5 text-arcade-yellow" />
                  Search Name or Email
                </label>
                <input
                  type="text"
                  value={registrationSearch}
                  onChange={(e) => setRegistrationSearch(e.target.value)}
                  placeholder="Type name or email..."
                  className="w-full bg-arcade-dark border border-arcade-border rounded-lg px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-arcade-yellow text-xs sm:text-sm font-sans"
                />
              </div>
            </div>

            {/* Registrations Table */}
            {filteredRegistrations.length === 0 ? (
              <div className="bg-arcade-card border border-arcade-border rounded-xl p-8 text-center">
                <p className="font-arcade text-xs text-slate-400 mb-2">NO REGISTRATIONS FOUND</p>
                <p className="font-sans text-xs text-slate-500">
                  Try adjusting the event, college year, or search filters.
                </p>
              </div>
            ) : (
              <div className="bg-arcade-card border border-arcade-border rounded-xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-sans text-xs sm:text-sm">
                    <thead className="bg-arcade-panel text-slate-400 font-arcade text-[10px] uppercase border-b border-arcade-border">
                      <tr>
                        <th className="p-4">Name</th>
                        <th className="p-4">Email</th>
                        <th className="p-4">College / Year</th>
                        <th className="p-4">Phone</th>
                        <th className="p-4">Event Name</th>
                        <th className="p-4">Registration Time</th>
                        <th className="p-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-arcade-border">
                      {filteredRegistrations.map((reg) => (
                        <tr key={reg.id} className="hover:bg-arcade-dark/50 transition-colors">
                          <td className="p-4 font-bold text-white">
                            {reg.name}
                          </td>
                          <td className="p-4 font-mono text-arcade-cyan">
                            {reg.email}
                          </td>
                          <td className="p-4">
                            <span className="px-2 py-0.5 rounded bg-arcade-dark border border-arcade-border font-arcade text-[9px] text-arcade-yellow">
                              {reg.collegeYear}
                            </span>
                          </td>
                          <td className="p-4 font-mono text-slate-300">
                            {reg.phone}
                          </td>
                          <td className="p-4 font-medium text-slate-200">
                            {reg.eventName}
                          </td>
                          <td className="p-4 text-slate-400 font-mono text-xs">
                            {new Date(reg.createdAt).toLocaleDateString()} {new Date(reg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </td>
                          <td className="p-4 text-right">
                            <button
                              onClick={() => setDeletingItem({ type: 'registration', id: reg.id, name: `${reg.name} (${reg.email})` })}
                              className="p-1.5 rounded hover:bg-arcade-panel text-arcade-red transition-colors"
                              title="Delete Registration"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* MODAL: ADD / EDIT EVENT */}
        <Modal
          isOpen={isEventModalOpen}
          onClose={() => setIsEventModalOpen(false)}
          title={editingEvent ? 'EDIT EVENT' : 'ADD NEW EVENT'}
          subtitle="CONFIGURE EVENT PARAMETERS & FEATURED BADGE"
          maxWidth="max-w-2xl"
          borderColor="border-arcade-yellow"
          shadowColor="shadow-arcade-yellow"
        >
          <form onSubmit={handleSaveEvent} className="space-y-4 font-sans text-xs sm:text-sm">
            <div>
              <label className="block font-arcade text-[10px] text-slate-300 uppercase mb-1">
                Event Name <span className="text-arcade-red">*</span>
              </label>
              <input
                type="text"
                required
                value={eventFormData.name}
                onChange={(e) => setEventFormData({ ...eventFormData, name: e.target.value })}
                placeholder="e.g. CodeChef 7.0 Flagship Hackathon"
                className="w-full bg-arcade-dark border border-arcade-border rounded-lg px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-arcade-yellow"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-arcade text-[10px] text-slate-300 uppercase mb-1">
                  Category <span className="text-arcade-red">*</span>
                </label>
                <select
                  value={eventFormData.category}
                  onChange={(e) => setEventFormData({ ...eventFormData, category: e.target.value })}
                  className="w-full bg-arcade-dark border border-arcade-border rounded-lg px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-arcade-yellow"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-arcade text-[10px] text-slate-300 uppercase mb-1">
                  Featured Event
                </label>
                <div className="flex items-center gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="featuredToggle"
                    checked={eventFormData.featured}
                    onChange={(e) => setEventFormData({ ...eventFormData, featured: e.target.checked })}
                    className="w-4 h-4 text-arcade-yellow bg-arcade-dark border-arcade-border rounded focus:ring-0"
                  />
                  <label htmlFor="featuredToggle" className="font-arcade text-[10px] text-arcade-yellow cursor-pointer">
                    FEATURED HERO EVENT
                  </label>
                </div>
                {eventFormData.featured && (
                  <p className="text-[11px] text-slate-400 font-sans mt-1">
                    * Only one event can be featured at a time.
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-arcade text-[10px] text-slate-300 uppercase mb-1">
                  Date <span className="text-arcade-red">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={eventFormData.date}
                  onChange={(e) => setEventFormData({ ...eventFormData, date: e.target.value })}
                  className="w-full bg-arcade-dark border border-arcade-border rounded-lg px-3.5 py-2 text-slate-100 focus:outline-none focus:border-arcade-yellow"
                />
              </div>

              <div>
                <label className="block font-arcade text-[10px] text-slate-300 uppercase mb-1">
                  Time <span className="text-arcade-red">*</span>
                </label>
                <input
                  type="time"
                  required
                  step="1"
                  value={eventFormData.time}
                  onChange={(e) => setEventFormData({ ...eventFormData, time: e.target.value })}
                  className="w-full bg-arcade-dark border border-arcade-border rounded-lg px-3.5 py-2 text-slate-100 focus:outline-none focus:border-arcade-yellow"
                />
              </div>

              <div>
                <label className="block font-arcade text-[10px] text-slate-300 uppercase mb-1">
                  Max Seats
                </label>
                <input
                  type="number"
                  min="1"
                  value={eventFormData.maxSeats}
                  onChange={(e) => setEventFormData({ ...eventFormData, maxSeats: parseInt(e.target.value, 10) || '' })}
                  placeholder="100"
                  className="w-full bg-arcade-dark border border-arcade-border rounded-lg px-3.5 py-2 text-slate-100 focus:outline-none focus:border-arcade-yellow"
                />
              </div>
            </div>

            <div>
              <label className="block font-arcade text-[10px] text-slate-300 uppercase mb-1">
                Venue Location
              </label>
              <input
                type="text"
                value={eventFormData.venue}
                onChange={(e) => setEventFormData({ ...eventFormData, venue: e.target.value })}
                placeholder="Auditorium / Lab 402, ABESEC"
                className="w-full bg-arcade-dark border border-arcade-border rounded-lg px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-arcade-yellow"
              />
            </div>

            <div>
              <label className="block font-arcade text-[10px] text-slate-300 uppercase mb-1">
                Poster Image URL (Optional)
              </label>
              <input
                type="url"
                value={eventFormData.posterUrl}
                onChange={(e) => setEventFormData({ ...eventFormData, posterUrl: e.target.value })}
                placeholder="https://images.unsplash.com/..."
                className="w-full bg-arcade-dark border border-arcade-border rounded-lg px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-arcade-yellow"
              />
            </div>

            <div>
              <label className="block font-arcade text-[10px] text-slate-300 uppercase mb-1">
                Event Description
              </label>
              <textarea
                rows="3"
                value={eventFormData.description}
                onChange={(e) => setEventFormData({ ...eventFormData, description: e.target.value })}
                placeholder="Brief overview of the event..."
                className="w-full bg-arcade-dark border border-arcade-border rounded-lg px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-arcade-yellow"
              ></textarea>
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsEventModalOpen(false)}
                className="px-4 py-2.5 rounded border border-arcade-border text-slate-300 font-arcade text-xs hover:bg-arcade-panel"
              >
                CANCEL
              </button>
              <button
                type="submit"
                disabled={savingEvent}
                className="px-6 py-2.5 rounded bg-arcade-yellow text-arcade-dark font-arcade text-xs font-bold hover:bg-yellow-400 active:scale-95 shadow-arcade-yellow"
              >
                {savingEvent ? 'SAVING...' : editingEvent ? 'UPDATE EVENT' : 'ADD EVENT'}
              </button>
            </div>
          </form>
        </Modal>

        {/* MODAL: DELETE CONFIRMATION */}
        {deletingItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="w-full max-w-md bg-arcade-card border-4 border-arcade-red rounded-xl shadow-arcade-red p-6 text-slate-100 text-center">
              <div className="w-12 h-12 bg-arcade-red/20 border-2 border-arcade-red rounded-full flex items-center justify-center mx-auto mb-4 text-arcade-red">
                <AlertTriangle className="w-6 h-6" />
              </div>

              <h3 className="font-arcade text-sm text-white mb-2">
                CONFIRM DELETION
              </h3>

              <p className="text-slate-300 text-xs font-sans mb-4">
                Are you sure you want to delete <span className="font-bold text-arcade-red">"{deletingItem.name}"</span>?
              </p>

              {deletingItem.type === 'event' && (
                <div className="p-3 rounded bg-arcade-red/10 border border-arcade-red/30 text-[11px] font-sans text-slate-300 mb-6 text-left">
                  ⚠️ <strong className="text-arcade-red font-bold">WARNING:</strong> Deleting this event will also delete all of its registrations!
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setDeletingItem(null)}
                  disabled={isDeleting}
                  className="w-1/2 py-2.5 rounded border border-arcade-border text-slate-300 font-arcade text-xs hover:bg-arcade-panel"
                >
                  CANCEL
                </button>
                <button
                  onClick={handleConfirmDelete}
                  disabled={isDeleting}
                  className="w-1/2 py-2.5 rounded bg-arcade-red text-white font-arcade text-xs font-bold hover:bg-red-600 shadow-arcade-red"
                >
                  {isDeleting ? 'DELETING...' : 'YES, DELETE'}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
