# 🕹️ CodeChef 7.0 | CodeChef ABESEC — Arcade Edition

Welcome to **CodeChef 7.0: Arcade Edition**, the official flagship event and hackathon portal for the **CodeChef ABESEC Student Chapter**. Featuring a nostalgic **PAC-MAN 80s arcade theme**, this web application is engineered with **React 18**, **Vite**, **Tailwind CSS**, and **Framer Motion**, powered by a responsive `localStorage` data store and session manager that runs completely out of the box with zero setup required.

---

## 🚀 Key Features Implemented

### 🎮 Public Quests & Registration Portal (`/`)
- **Arcade Aesthetic:** Custom PAC-MAN yellow/neon-blue borders, scanline overlays, 8-bit Google typography (`Press Start 2P`, `VT323`), and animated Pac-Man chomping pellets.
- **Hero Featured Showcase:** Dynamically highlights the single featured quest (*"CodeChef 7.0: The Flagship Arcade Arena"*) with countdown meters and location markers.
- **Quest Catalog & Filtering:** Search by quest name/venue/description and filter by category (`Coding`, `Workshop`, `Quiz`, `Gaming`, `Design`, `Talk`).
- **Real-Time Capacity Check:** Dynamic seat calculations (`maxSeats - registeredCount`). Switches to disabled *"GAME OVER - SOLD OUT"* when full.
- **Duplicate Prevention:** Prevents duplicate registrations with the same email for an event, displaying an inline arcade alert.
- **Celebration Effects:** Confetti fireworks triggered on successful player registration.

### 🛡️ Admin Mission Control (`/admin`)
- **Protected Routing:** `/admin` routes require an active admin session stored in `localStorage`. Unauthorized visits automatically redirect to `/admin/login`.
- **Dedicated Sidebar Layout:** Persistent sidebar with direct access to:
  - 📅 **Events Management**
  - 👥 **Registrations Roster**
  - 🌐 **Public Quests Link**
  - 🚪 **Logout**
- **Summary Stat Cards:** Live counts for:
  - Total Events
  - Upcoming Events
  - Total Registrations
- **Events Management:**
  - Table/card view of all events with Edit and Delete actions.
  - **Add Event Form:** Name, description, date, time, venue, category, max seats, optional poster image URL, and a "featured" checkbox.
  - **Single Featured Rule:** Only one event can be featured at a time. Toggling an event as featured unsets all others.
  - **Edit Event:** Pre-fills all event fields for immediate updates.
  - **Delete Event:** Confirmation dialog warning that all associated registrations will also be deleted (cascading delete).
- **Registrations Management:**
  - Full table showing attendee name, email, college/year, phone, event name, and registration timestamp.
  - Search by player name or email.
  - Filter by event dropdown and by college/year (`1st Year`, `2nd Year`, `3rd Year`, `4th Year`, `Faculty / Other`).
  - Total result counter badge.
  - **CSV Export:** One-click download of filtered registrations to a `.csv` file.

### 👾 Secret Easter Egg Mini-Game
- **Two Trigger Mechanisms:**
  1. **Konami Code:** Press `↑` `↑` `↓` `↓` `←` `→` `←` `→` `B` `A` on your keyboard anywhere on the page.
  2. **5-Ghost Click:** Click the ghost icon (`👻`) in the top ticker bar or footer 5 times.
- **Mini Pac-Man Arcade Game:** An interactive 8x8 arcade board where you navigate Pac-Man using `W/A/S/D` or Arrow keys to eat pellets while evading a roaming ghost!

---

## 🔑 Admin Login Credentials

| Role | Username | Password |
| :--- | :--- | :--- |
| **Operator** | `admin` | `codechef7` |

Stored and managed in [`src/config/adminConfig.js`](./src/config/adminConfig.js) with session persistence in `localStorage`.

---

## 💻 How to Run Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### 3. Production Build & Preview
```bash
npm run build
npm run preview
```

---

## ☁️ How to Deploy (Vercel / Netlify)

The project includes [`vercel.json`](./vercel.json) and [`public/_redirects`](./public/_redirects) for seamless single-page application (SPA) client-side routing on reloads.

### Deploy to Vercel
1. Push your repository to GitHub.
2. In the [Vercel Dashboard](https://vercel.com), click **Add New...** > **Project** and select your repo.
3. Keep default settings (`Build Command: npm run build`, `Output Directory: dist`).
4. Click **Deploy**.

### Deploy to Netlify
1. In the [Netlify Dashboard](https://app.netlify.com), click **Add new site** > **Import an existing project**.
2. Set build command to `npm run build` and publish directory to `dist`.
3. Click **Deploy**.

---

## 🎨 Customization Guide

- **Chapter Logo:** Replace [`public/logo.jpg`](./public/logo.jpg) with your official chapter logo.
- **Admin Credentials:** Edit [`src/config/adminConfig.js`](./src/config/adminConfig.js) to change the admin username or password.
- **Initial Seed Events:** Edit the `INITIAL_EVENTS` array in [`src/services/api.js`](./src/services/api.js) to adjust the default event schedule, dates, venues, or category listings.
- **Social & Footer Links:** Update social handles and chapter details in [`src/components/Footer.jsx`](./src/components/Footer.jsx).
