import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { registerForEvent } from '../services/api';
import { useToast } from '../context/ToastContext';
import { X, User, Mail, GraduationCap, Phone, Sparkles, AlertCircle } from 'lucide-react';

export default function RegisterModal({ event, isOpen, onClose, onRegistered }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [collegeYear, setCollegeYear] = useState('1st Year');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { showToast } = useToast();

  if (!isOpen || !event) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsDuplicate(false);

    if (!name.trim() || !email.trim() || !phone.trim()) {
      setErrorMessage('PLEASE FILL IN ALL REQUIRED PLAYER DATA.');
      return;
    }

    setLoading(true);

    try {
      await registerForEvent({
        eventId: event.id,
        name,
        email,
        collegeYear,
        phone
      });

      // Celebration confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // ignore if canvas is restricted
      }

      setIsSuccess(true);
      showToast(`REGISTRATION CONFIRMED FOR ${event.name}!`, 'success');

      if (onRegistered) {
        onRegistered();
      }
    } catch (err) {
      console.error('Registration failed:', err);
      if (err.message === 'DUPLICATE') {
        setIsDuplicate(true);
        setErrorMessage('PLAYER ALREADY REGISTERED! This email is already signed up for this quest.');
      } else if (err.message?.includes('GAME OVER') || err.message?.includes('Seats full')) {
        setErrorMessage('GAME OVER - Seats full! All slots have been claimed.');
        showToast('GAME OVER - Seats full!', 'error');
      } else {
        setErrorMessage(err.message || 'Registration failed. Please try again.');
        showToast(err.message || 'Registration failed', 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setName('');
    setEmail('');
    setCollegeYear('1st Year');
    setPhone('');
    setErrorMessage(null);
    setIsDuplicate(false);
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-lg bg-arcade-card border-4 border-arcade-yellow rounded-xl shadow-arcade-yellow p-6 md:p-8 my-8 text-slate-100">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-arcade-yellow p-1 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Header */}
        <div className="border-b border-arcade-border pb-4 mb-6">
          <div className="flex items-center gap-2 text-arcade-yellow mb-1 font-arcade text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-arcade-yellow animate-ping"></span>
            <span>PLAYER 1 REGISTRATION</span>
          </div>
          <h2 className="font-arcade text-sm md:text-base text-white leading-relaxed">
            {event.name}
          </h2>
          <div className="font-vt text-arcade-cyan text-base mt-1">
            VENUE: {event.venue} • DATE: {event.date}
          </div>
        </div>

        {/* Success View */}
        {isSuccess ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-arcade-green/20 border-2 border-arcade-green rounded-full flex items-center justify-center mx-auto text-3xl shadow-[0_0_15px_rgba(0,230,118,0.5)]">
              👾
            </div>
            <h3 className="font-arcade text-arcade-green text-sm md:text-base">
              QUEST ACCEPTED!
            </h3>
            <p className="text-slate-300 text-sm font-sans max-w-sm mx-auto">
              Your registration slot has been locked into the arcade database. A confirmation beacon will be tracked for your player tag.
            </p>
            <div className="pt-4">
              <button
                onClick={handleClose}
                className="px-6 py-2.5 bg-arcade-yellow text-arcade-dark font-arcade text-xs rounded hover:bg-yellow-400 shadow-arcade-yellow font-bold active:scale-95 transition-all"
              >
                RETURN TO MAZE
              </button>
            </div>
          </div>
        ) : (
          /* Registration Form */
          <form onSubmit={handleSubmit} className="space-y-4 font-sans text-sm">
            {/* Inline Arcade Error Alert */}
            {errorMessage && (
              <div
                className={`p-3.5 rounded-lg border-2 flex items-start gap-2.5 text-xs font-mono ${
                  isDuplicate
                    ? 'border-arcade-orange bg-arcade-orange/15 text-arcade-orange shadow-[0_0_10px_rgba(255,145,0,0.3)]'
                    : 'border-arcade-red bg-arcade-red/15 text-arcade-red shadow-arcade-red'
                }`}
              >
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <div className="font-arcade text-[10px] mb-1">
                    {isDuplicate ? 'WARNING: DUPLICATE ENTRY' : 'SYSTEM ALERT'}
                  </div>
                  <div className="text-slate-200">{errorMessage}</div>
                </div>
              </div>
            )}

            {/* Name */}
            <div>
              <label className="block font-arcade text-[10px] text-slate-300 uppercase mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-arcade-yellow" />
                Player Full Name <span className="text-arcade-red">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alex Mercer"
                className="w-full bg-arcade-dark border border-arcade-border rounded-lg px-3.5 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-arcade-yellow transition-colors font-sans text-sm"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block font-arcade text-[10px] text-slate-300 uppercase mb-1.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-arcade-cyan" />
                Email Address <span className="text-arcade-red">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="player@abes.ac.in"
                className="w-full bg-arcade-dark border border-arcade-border rounded-lg px-3.5 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-arcade-cyan transition-colors font-sans text-sm"
              />
            </div>

            {/* College Year & Phone Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-arcade text-[10px] text-slate-300 uppercase mb-1.5 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-arcade-pink" />
                  College Year <span className="text-arcade-red">*</span>
                </label>
                <select
                  value={collegeYear}
                  onChange={(e) => setCollegeYear(e.target.value)}
                  className="w-full bg-arcade-dark border border-arcade-border rounded-lg px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-arcade-pink transition-colors font-sans text-sm"
                >
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                  <option value="Faculty / Other">Faculty / Other</option>
                </select>
              </div>

              <div>
                <label className="block font-arcade text-[10px] text-slate-300 uppercase mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-arcade-green" />
                  Phone Number <span className="text-arcade-red">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full bg-arcade-dark border border-arcade-border rounded-lg px-3.5 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-arcade-green transition-colors font-sans text-sm"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="w-full sm:w-1/3 py-2.5 px-4 rounded border border-arcade-border text-slate-300 hover:bg-arcade-panel font-arcade text-[11px] transition-colors"
              >
                CANCEL
              </button>
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-2/3 py-2.5 px-4 rounded bg-arcade-yellow text-arcade-dark font-arcade text-xs font-bold hover:bg-yellow-400 active:scale-[0.98] transition-all shadow-arcade-yellow flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-arcade-dark border-t-transparent rounded-full animate-spin"></span>
                    <span>REGISTERING...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>CONFIRM REGISTRATION</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
