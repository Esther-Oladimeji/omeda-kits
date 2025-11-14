// Use 'require' for CommonJS files
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  // Ensure Tailwind scans all your component files
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // All custom tokens must be defined inside the 'extend' block
    extend: {
      // --- 1. Custom Colors (Resolves 'text-gray-dark', 'bg-cream', 'bg-primary' etc.) ---
      colors: {
        'primary': '#A88BFF',
        'primary-dark': '#6A4DC5', 
        'sky': '#6EC7FF',           
        'cream': '#FDF7EE',         
        'yellow': '#FFD86E',        
        'gray-dark': '#2C2C2C',
        'gray': '#888888',
        'gray-light': '#F3F3F3',
      },
      
      // --- 2. Custom Fonts (Resolves 'font-inter' and 'font-outfit') ---
       fontFamily: {
        jakarta: ['"Plus Jakarta Sans"', ...defaultTheme.fontFamily.sans],
        nunito: ['"Nunito', ...defaultTheme.fontFamily.sans],
      },
      
      // --- 3. Custom Border Radius (Resolves 'rounded-xl' with custom values) ---
      borderRadius: {
        'sm': '0.5rem',
        'md': '1rem',
        'lg': '1.5rem',
        'xl': '1.75rem',
      },
      
      // --- 4. Custom Box Shadow (Resolves 'shadow-card') ---
      boxShadow: {
        'card': '0 4px 14px rgba(0,0,0,0.10)',
      },
      
      // --- 5. Custom Spacing (Resolves 'space-page', 'space-section' if used) ---
      spacing: {
        'page': '1.5rem',
        'section': '2.5rem',
      },
    },
  },
  plugins: [],
}