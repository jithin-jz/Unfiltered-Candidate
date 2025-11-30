/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'minimal-bg': '#FFFFFF',
        'minimal-text': '#111827',
        'minimal-accent': '#3B82F6', // Soft Blue
        'minimal-gray': '#F3F4F6',
        'minimal-border': '#E5E7EB',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'card': '0 0 0 1px rgba(0,0,0,0.03), 0 2px 8px rgba(0,0,0,0.04)',
      },
    },
  },
  plugins: [],
}
