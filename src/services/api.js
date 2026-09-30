import { ADMIN_CREDENTIALS, ADMIN_SESSION_KEY } from '../config/adminConfig';

const STORAGE_KEYS = {
  EVENTS: 'codechef7_events',
  REGISTRATIONS: 'codechef7_registrations'
};

// 8 Realistic sample events across all 6 categories
const INITIAL_EVENTS = [
  {
    id: 'ev-1',
    name: 'CodeChef 7.0: The Flagship Arcade Arena',
    description: 'The premier 24-hour flagship hackathon and competitive coding showdown of ABESEC. Enter the labyrinth, navigate algorithmic boss fights, outcode rival guilds, and claim glory on the national high-score leaderboard.',
    date: '2026-11-20',
    time: '09:00:00',
    venue: 'Main Auditorium & B-Block Labs, ABESEC Campus',
    category: 'Coding',
    maxSeats: 150,
    posterUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    featured: true,
    createdAt: new Date('2026-09-01T10:00:00Z').toISOString()
  },
  {
    id: 'ev-2',
    name: 'ByteQuest: Data Structures & Algorithmic Duel',
    description: 'A high-speed speedrunning challenge through graphs, dynamic programming, and binary trees. 5 rounds of escalating complexity with instant automated judging.',
    date: '2026-11-28',
    time: '14:00:00',
    venue: 'Lab 402, Ramanujan Block',
    category: 'Coding',
    maxSeats: 80,
    posterUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    featured: false,
    createdAt: new Date('2026-09-05T10:00:00Z').toISOString()
  },
  {
    id: 'ev-3',
    name: 'Pac-Hack: Creative Web & 3D Arcade Dev',
    description: 'Hands-on workshop exploring Three.js, Canvas APIs, and WebGL to engineer retro arcade mechanics, responsive physics engines, and custom game loops.',
    date: '2026-12-05',
    time: '11:00:00',
    venue: 'Seminar Hall 2, Academic Block',
    category: 'Workshop',
    maxSeats: 60,
    posterUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80',
    featured: false,
    createdAt: new Date('2026-09-10T10:00:00Z').toISOString()
  },
  {
    id: 'ev-4',
    name: 'Retro Bytes: The 8-Bit Tech Quiz Showdown',
    description: 'Fast-paced buzzer quiz spanning computer architecture, open-source lore, hacker history, and retro gaming trivia. Grab your team and hit the buzzer!',
    date: '2026-12-12',
    time: '15:30:00',
    venue: 'Mini Auditorium, Central Block',
    category: 'Quiz',
    maxSeats: 100,
    posterUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80',
    featured: false,
    createdAt: new Date('2026-09-12T10:00:00Z').toISOString()
  },
  {
    id: 'ev-5',
    name: 'Retro Esports Arena: Valorant & Smash 1v1',
    description: 'ABESEC annual LAN tournament. Dual brackets featuring competitive tactical FPS and retro brawler face-offs on the big stage. Live caster commentary and prize pool.',
    date: '2026-12-18',
    time: '10:00:00',
    venue: 'Student Activity Centre, ABESEC',
    category: 'Gaming',
    maxSeats: 120,
    posterUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
    featured: false,
    createdAt: new Date('2026-09-15T10:00:00Z').toISOString()
  },
  {
    id: 'ev-6',
    name: 'PixelCraft: UI/UX & Retro Sprite Design Sprint',
    description: 'Design marathon focused on game UI, pixel art illustration, micro-interactions, and futuristic cyberpunk design systems using Figma and Aseprite.',
    date: '2026-12-22',
    time: '13:00:00',
    venue: 'Design Studio Lab 105',
    category: 'Design',
    maxSeats: 50,
    posterUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80',
    featured: false,
    createdAt: new Date('2026-09-18T10:00:00Z').toISOString()
  },
  {
    id: 'ev-7',
    name: 'TechTalk: Architecting Planetary Scale AI Systems',
    description: 'Keynote discourse by industry veterans and alumni on distributed machine learning, low-latency microservices, and next-gen autonomous cloud architectures.',
    date: '2027-01-08',
    time: '16:00:00',
    venue: 'Main Auditorium, ABESEC',
    category: 'Talk',
    maxSeats: 200,
    posterUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80',
    featured: false,
    createdAt: new Date('2026-09-20T10:00:00Z').toISOString()
  },
  {
    id: 'ev-8',
    name: 'Bug Hunt: Arcade Security & CTF Duel',
    description: 'Capture The Flag cybersecurity simulation. Exploit vulnerabilities, reverse engineer retro binaries, and crack crypto ciphers to unlock bonus levels.',
    date: '2027-01-16',
    time: '11:30:00',
    venue: 'Cyber Security Lab, CS Department',
    category: 'Workshop',
    maxSeats: 75,
    posterUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    featured: false,
    createdAt: new Date('2026-09-22T10:00:00Z').toISOString()
  }
];

const INITIAL_REGISTRATIONS = [
  {
    id: 'reg-1',
    eventId: 'ev-1',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    collegeYear: '3rd Year',
    phone: '+91 9876543210',
    createdAt: new Date('2026-09-25T14:30:00Z').toISOString()
  },
  {
    id: 'reg-2',
    eventId: 'ev-1',
    name: 'Priya Patel',
    email: 'priya.patel@example.com',
    collegeYear: '2nd Year',
    phone: '+91 9812345678',
    createdAt: new Date('2026-09-26T11:15:00Z').toISOString()
  },
  {
    id: 'reg-3',
    eventId: 'ev-2',
    name: 'Rohan Verma',
    email: 'rohan.verma@example.com',
    collegeYear: '4th Year',
    phone: '+91 9988776655',
    createdAt: new Date('2026-09-27T09:45:00Z').toISOString()
  }
];

// Helper to initialize localStorage
const getStoredEvents = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.EVENTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(INITIAL_EVENTS));
      return INITIAL_EVENTS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading events from localStorage:', err);
    return INITIAL_EVENTS;
  }
};

const saveStoredEvents = (events) => {
  localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
};

const getStoredRegistrations = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.REGISTRATIONS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(INITIAL_REGISTRATIONS));
      return INITIAL_REGISTRATIONS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading registrations from localStorage:', err);
    return INITIAL_REGISTRATIONS;
  }
};

const saveStoredRegistrations = (registrations) => {
  localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(registrations));
};

/**
 * Fetch all events with calculated registeredCount, ordered by date ascending
 */
export const getEvents = async () => {
  // Simulate quick asynchronous latency for realistic feel
  await new Promise((res) => setTimeout(res, 80));

  const events = getStoredEvents();
  const registrations = getStoredRegistrations();

  const eventsWithCounts = events.map((ev) => {
    const count = registrations.filter((r) => r.eventId === ev.id).length;
    return {
      ...ev,
      registeredCount: count
    };
  });

  return eventsWithCounts.sort((a, b) => new Date(a.date) - new Date(b.date));
};

/**
 * Add an event. If featured is true, unset featured on all other events.
 */
export const addEvent = async (eventData) => {
  await new Promise((res) => setTimeout(res, 80));

  let events = getStoredEvents();

  if (eventData.featured) {
    events = events.map((ev) => ({ ...ev, featured: false }));
  }

  const newEvent = {
    id: 'ev-' + Date.now(),
    name: eventData.name.trim(),
    description: eventData.description?.trim() || '',
    date: eventData.date,
    time: eventData.time,
    venue: eventData.venue?.trim() || 'TBD',
    category: eventData.category,
    maxSeats: eventData.maxSeats ? parseInt(eventData.maxSeats, 10) : null,
    posterUrl: eventData.posterUrl?.trim() || '',
    featured: Boolean(eventData.featured),
    createdAt: new Date().toISOString()
  };

  events.push(newEvent);
  saveStoredEvents(events);

  return {
    ...newEvent,
    registeredCount: 0
  };
};

/**
 * Update an event. If featured is true, unset featured on other events.
 */
export const updateEvent = async (id, eventData) => {
  await new Promise((res) => setTimeout(res, 80));

  let events = getStoredEvents();
  const eventIndex = events.findIndex((ev) => ev.id === id);

  if (eventIndex === -1) {
    throw new Error('Event not found');
  }

  if (eventData.featured) {
    events = events.map((ev) => (ev.id === id ? ev : { ...ev, featured: false }));
  }

  const updatedEvent = {
    ...events[eventIndex],
    name: eventData.name !== undefined ? eventData.name.trim() : events[eventIndex].name,
    description: eventData.description !== undefined ? eventData.description.trim() : events[eventIndex].description,
    date: eventData.date !== undefined ? eventData.date : events[eventIndex].date,
    time: eventData.time !== undefined ? eventData.time : events[eventIndex].time,
    venue: eventData.venue !== undefined ? eventData.venue.trim() : events[eventIndex].venue,
    category: eventData.category !== undefined ? eventData.category : events[eventIndex].category,
    maxSeats: eventData.maxSeats !== undefined ? (eventData.maxSeats ? parseInt(eventData.maxSeats, 10) : null) : events[eventIndex].maxSeats,
    posterUrl: eventData.posterUrl !== undefined ? eventData.posterUrl.trim() : events[eventIndex].posterUrl,
    featured: eventData.featured !== undefined ? Boolean(eventData.featured) : events[eventIndex].featured
  };

  events[eventIndex] = updatedEvent;
  saveStoredEvents(events);

  const registrations = getStoredRegistrations();
  const count = registrations.filter((r) => r.eventId === id).length;

  return {
    ...updatedEvent,
    registeredCount: count
  };
};

/**
 * Delete an event. Cascades to delete all associated registrations.
 */
export const deleteEvent = async (id) => {
  await new Promise((res) => setTimeout(res, 80));

  let events = getStoredEvents();
  events = events.filter((ev) => ev.id !== id);
  saveStoredEvents(events);

  // Cascading delete for registrations
  let registrations = getStoredRegistrations();
  registrations = registrations.filter((r) => r.eventId !== id);
  saveStoredRegistrations(registrations);

  return true;
};

/**
 * Register for an event.
 * - Trims and lowercases email
 * - Checks seats before registration
 * - Checks duplicate email per event
 */
export const registerForEvent = async ({ eventId, name, email, collegeYear, phone }) => {
  await new Promise((res) => setTimeout(res, 120));

  const normalizedEmail = (email || '').trim().toLowerCase();
  const trimmedName = (name || '').trim();
  const trimmedPhone = (phone || '').trim();
  const cleanCollegeYear = (collegeYear || '').trim();

  if (!eventId || !trimmedName || !normalizedEmail || !cleanCollegeYear || !trimmedPhone) {
    throw new Error('All fields are required for registration');
  }

  const events = getStoredEvents();
  const targetEvent = events.find((ev) => ev.id === eventId);
  if (!targetEvent) {
    throw new Error('Target event could not be found');
  }

  const registrations = getStoredRegistrations();
  const currentCount = registrations.filter((r) => r.eventId === eventId).length;

  // Capacity check
  if (targetEvent.maxSeats !== null && currentCount >= targetEvent.maxSeats) {
    throw new Error('GAME OVER - Seats full');
  }

  // Duplicate check (unique index simulation)
  const isDuplicate = registrations.some(
    (r) => r.eventId === eventId && r.email.trim().toLowerCase() === normalizedEmail
  );

  if (isDuplicate) {
    const dupErr = new Error('DUPLICATE');
    dupErr.code = '23505';
    throw dupErr;
  }

  const newRegistration = {
    id: 'reg-' + Date.now(),
    eventId,
    name: trimmedName,
    email: normalizedEmail,
    collegeYear: cleanCollegeYear,
    phone: trimmedPhone,
    createdAt: new Date().toISOString()
  };

  registrations.unshift(newRegistration);
  saveStoredRegistrations(registrations);

  return {
    ...newRegistration,
    eventName: targetEvent.name
  };
};

/**
 * Get registrations, optionally filtered by eventId, newest first, with joined eventName
 */
export const getRegistrations = async (eventId = null) => {
  await new Promise((res) => setTimeout(res, 80));

  const registrations = getStoredRegistrations();
  const events = getStoredEvents();

  const eventsMap = new Map(events.map((ev) => [ev.id, ev.name]));

  let filtered = registrations;
  if (eventId && eventId !== 'all') {
    filtered = filtered.filter((r) => r.eventId === eventId);
  }

  return filtered.map((r) => ({
    ...r,
    eventName: eventsMap.get(r.eventId) || 'Unknown Event'
  }));
};

/**
 * Delete a registration
 */
export const deleteRegistration = async (id) => {
  await new Promise((res) => setTimeout(res, 80));

  let registrations = getStoredRegistrations();
  registrations = registrations.filter((r) => r.id !== id);
  saveStoredRegistrations(registrations);

  return true;
};

/**
 * Admin Login: validates username & password against config
 */
export const adminLogin = async (username, password) => {
  await new Promise((res) => setTimeout(res, 150));

  const cleanUser = (username || '').trim();
  const cleanPass = (password || '').trim();

  if (
    cleanUser === ADMIN_CREDENTIALS.username &&
    cleanPass === ADMIN_CREDENTIALS.password
  ) {
    const session = {
      username: cleanUser,
      token: 'token_' + Date.now(),
      loggedInAt: new Date().toISOString()
    };
    localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
    return { user: { username: cleanUser }, session };
  }

  throw new Error('Invalid credentials. Use admin / codechef7');
};

/**
 * Admin Logout
 */
export const adminLogout = async () => {
  localStorage.removeItem(ADMIN_SESSION_KEY);
};

/**
 * Get active admin session
 */
export const getAdminSession = async () => {
  try {
    const raw = localStorage.getItem(ADMIN_SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    return null;
  }
};
