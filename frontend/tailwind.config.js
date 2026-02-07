/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0a0f1a',
        'dark-card': '#1a1f2e',
        'cyan-primary': '#00d9ff',
      },
      backdropBlur: {
        'xl': '20px',
      },
      boxShadow: {
        'cyan-glow': '0 0 30px rgba(0, 217, 255, 0.3)',
      }
    },
  },
  plugins: [],
}
