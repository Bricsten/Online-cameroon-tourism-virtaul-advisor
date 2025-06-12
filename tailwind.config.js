/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f7e6',
          100: '#ccf0cc',
          200: '#99e099',
          300: '#66d166',
          400: '#33c133',
          500: '#00b200', // Cameroon green
          600: '#008e00',
          700: '#006b00',
          800: '#004700',
          900: '#002400',
        },
        secondary: {
          50: '#fde6e6',
          100: '#fbcccc',
          200: '#f79999',
          300: '#f36666',
          400: '#ef3333',
          500: '#eb0000', // Cameroon red
          600: '#bc0000',
          700: '#8d0000',
          800: '#5e0000',
          900: '#2f0000',
        },
        accent: {
          50: '#fff9e6',
          100: '#fff3cc',
          200: '#ffe799',
          300: '#ffdb66',
          400: '#ffcf33',
          500: '#ffc300', // Cameroon yellow
          600: '#cc9c00',
          700: '#997500',
          800: '#664e00',
          900: '#332700',
        },
        success: {
          100: '#dcf5e7',
          500: '#10b981',
          900: '#064e36',
        },
        warning: {
          100: '#fef3c7',
          500: '#f59e0b',
          900: '#78350f',
        },
        error: {
          100: '#fee2e2',
          500: '#ef4444',
          900: '#7f1d1d',
        },
        neutral: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
      fontFamily: {
        'heading': ['"Playfair Display"', 'serif'],
        'sans': ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'hero-pattern': "url('https://images.pexels.com/photos/3411135/pexels-photo-3411135.jpeg')",
        'textile-pattern': "url('/src/assets/textile-pattern.svg')",
      },
    },
  },
  plugins: [],
};