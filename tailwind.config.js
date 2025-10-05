/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'gpt': {
          'bg': '#1e1e1e',
          'sidebar': '#171717',
          'border': '#404040',
          'text': '#ffffff',
          'text-muted': '#a1a1aa',
          'hover': '#262626',
          'input': '#262626',
          'user-msg': '#171717',
          'ai-msg': '#1e1e1e',
          'button': '#525252',
          'button-hover': '#404040',
          'accent': '#d4d4d8',
          'accent-hover': '#e4e4e7',
          'success': '#71717a',
          'warning': '#a1a1aa',
          'error': '#ef4444',
          'gray-light': '#f4f4f5',
          'gray-medium': '#71717a',
          'gray-dark': '#27272a'
        }
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '0.8' }
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(88, 166, 255, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(88, 166, 255, 0.6)' }
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
  darkMode: 'class'
}