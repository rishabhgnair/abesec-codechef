-- ============================================================
-- CodeChef 7.0 - ABESEC Chapter Arcade Edition
-- Seed Data: 8 Realistic Events Across 6 Categories
-- ============================================================

-- Clear existing data if re-seeding
truncate table public.registrations cascade;
delete from public.events;

insert into public.events (
  name,
  description,
  date,
  time,
  venue,
  category,
  max_seats,
  poster_url,
  featured
) values
(
  'CodeChef 7.0: The Flagship Arcade Arena',
  'The premier 24-hour flagship hackathon and competitive coding showdown of ABESEC. Enter the labyrinth, navigate algorithmic boss fights, outcode rival guilds, and claim glory on the national high-score leaderboard.',
  '2026-11-20',
  '09:00:00',
  'Main Auditorium & B-Block Labs, ABESEC Campus',
  'Coding',
  150,
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
  true
),
(
  'ByteQuest: Data Structures & Algorithmic Duel',
  'A high-speed speedrunning challenge through graphs, dynamic programming, and binary trees. 5 rounds of escalating complexity with instant automated judging.',
  '2026-11-28',
  '14:00:00',
  'Lab 402, Ramanujan Block',
  'Coding',
  80,
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
  false
),
(
  'Pac-Hack: Creative Web & 3D Arcade Dev',
  'Hands-on workshop exploring Three.js, Canvas APIs, and WebGL to engineer retro arcade mechanics, responsive physics engines, and custom game loops.',
  '2026-12-05',
  '11:00:00',
  'Seminar Hall 2, Academic Block',
  'Workshop',
  60,
  'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80',
  false
),
(
  'Retro Bytes: The 8-Bit Tech Quiz Showdown',
  'Fast-paced buzzer quiz spanning computer architecture, open-source lore, hacker history, and retro gaming trivia. Grab your team and hit the buzzer!',
  '2026-12-12',
  '15:30:00',
  'Mini Auditorium, Central Block',
  'Quiz',
  100,
  'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80',
  false
),
(
  'Retro Esports Arena: Valorant & Smash 1v1',
  'ABESEC annual LAN tournament. Dual brackets featuring competitive tactical FPS and retro brawler face-offs on the big stage. Live caster commentary and prize pool.',
  '2026-12-18',
  '10:00:00',
  'Student Activity Centre, ABESEC',
  'Gaming',
  120,
  'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
  false
),
(
  'PixelCraft: UI/UX & Retro Sprite Design Sprint',
  'Design marathon focused on game UI, pixel art illustration, micro-interactions, and futuristic cyberpunk design systems using Figma and Aseprite.',
  '2026-12-22',
  '13:00:00',
  'Design Studio Lab 105',
  'Design',
  50,
  'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80',
  false
),
(
  'TechTalk: Architecting Planetary Scale AI Systems',
  'Keynote discourse by industry veterans and alumni on distributed machine learning, low-latency microservices, and next-gen autonomous cloud architectures.',
  '2027-01-08',
  '16:00:00',
  'Main Auditorium, ABESEC',
  'Talk',
  200,
  'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80',
  false
),
(
  'Bug Hunt: Arcade Security & CTF Duel',
  'Capture The Flag cybersecurity simulation. Exploit vulnerabilities, reverse engineer retro binaries, and crack crypto ciphers to unlock bonus levels.',
  '2027-01-16',
  '11:30:00',
  'Cyber Security Lab, CS Department',
  'Workshop',
  75,
  'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
  false
);

-- Seed a few sample registrations for realistic count testing
insert into public.registrations (event_id, name, email, college_year, phone)
select
  id,
  'Aarav Sharma',
  'aarav.sharma@example.com',
  '3rd Year',
  '+91 9876543210'
from public.events
where name like 'CodeChef 7.0%'
limit 1;

insert into public.registrations (event_id, name, email, college_year, phone)
select
  id,
  'Priya Patel',
  'priya.patel@example.com',
  '2nd Year',
  '+91 9812345678'
from public.events
where name like 'CodeChef 7.0%'
limit 1;

insert into public.registrations (event_id, name, email, college_year, phone)
select
  id,
  'Rohan Verma',
  'rohan.verma@example.com',
  '4th Year',
  '+91 9988776655'
from public.events
where name like 'ByteQuest%'
limit 1;
