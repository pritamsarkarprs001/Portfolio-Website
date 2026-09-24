/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#050b16',
          900: '#08111f',
          800: '#0d1b2e',
          700: '#132640',
        },
        signal: {
          300: '#8ee8ff',
          400: '#38c9ed',
          500: '#13a8d1',
          600: '#087eaa',
        },
        iris: {
          300: '#c6b8ff',
          400: '#9b87fa',
          500: '#7660e8',
        },
        mint: {
          300: '#8df0c1',
          400: '#45d99b',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'ui-sans-serif', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(56, 201, 237, .12), 0 24px 80px rgba(0, 0, 0, .24)',
        'glow-sm': '0 0 0 1px rgba(56, 201, 237, .14), 0 12px 36px rgba(0, 0, 0, .18)',
      },
      backgroundImage: {
        'grid-light':
          'linear-gradient(rgba(20, 48, 75, .08) 1px, transparent 1px), linear-gradient(90deg, rgba(20, 48, 75, .08) 1px, transparent 1px)',
        'grid-dark':
          'linear-gradient(rgba(115, 180, 220, .07) 1px, transparent 1px), linear-gradient(90deg, rgba(115, 180, 220, .07) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};
