/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        secondary: '#4b5563',
        dark: {
          100: '#1a1b1e',
          200: '#2c2e33',
          300: '#3d4047',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
} 