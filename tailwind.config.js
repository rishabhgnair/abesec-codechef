/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        arcade: {
          dark: '#060814',
          card: '#0c1026',
          panel: '#101736',
          border: '#1f2b60',
          neonBlue: '#0051ff',
          neonCyan: '#00e5ff',
          yellow: '#ffe600',
          red: '#ff1744',
          pink: '#ff4081',
          orange: '#ff9100',
          green: '#00e676',
          pellet: '#ffb8ae',
        }
      },
      fontFamily: {
        arcade: ['"Press Start 2P"', 'monospace', 'cursive'],
        vt: ['"VT323"', 'monospace'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'arcade-yellow': '0 0 15px rgba(255, 230, 0, 0.4), inset 0 0 10px rgba(255, 230, 0, 0.2)',
        'arcade-blue': '0 0 15px rgba(0, 81, 255, 0.4), inset 0 0 10px rgba(0, 81, 255, 0.2)',
        'arcade-cyan': '0 0 15px rgba(0, 229, 255, 0.4), inset 0 0 10px rgba(0, 229, 255, 0.2)',
        'arcade-red': '0 0 15px rgba(255, 23, 68, 0.4), inset 0 0 10px rgba(255, 23, 68, 0.2)',
        'arcade-pink': '0 0 15px rgba(255, 64, 129, 0.4), inset 0 0 10px rgba(255, 64, 129, 0.2)',
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'marquee': 'marquee 25s linear infinite',
        'chomp': 'chomp 0.5s infinite alternate ease-in-out',
        'ghost-float': 'ghostFloat 3s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '1', filter: 'drop-shadow(0 0 8px rgba(255, 230, 0, 0.8))' },
          '50%': { opacity: '0.8', filter: 'drop-shadow(0 0 2px rgba(255, 230, 0, 0.4))' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        ghostFloat: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
