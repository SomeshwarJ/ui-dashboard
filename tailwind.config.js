/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Gemini-inspired Dark Theme Palette
        gemini: {
          950: '#0e0e11', // Deepest background (Main canvas)
          900: '#13131a', // Sidebar / Surface
          800: '#1c1c26', // Cards / Elevated surfaces
          700: '#2a2a35', // Borders / Input backgrounds
          600: '#404050', // Muted text / Icons
          300: '#e2e2e8', // Primary text
          100: '#ffffff', // Highlights
        },
        // Action Gradients & Accents (Gemini uses subtle blues/purples/pinks)
        accent: {
          primary: '#4a9cff', // Electric Blue (Primary Action)
          secondary: '#9c6dff', // Purple (Process/AI)
          success: '#66bb6a',  // Soft Green (Status)
          warning: '#ffa726',
          error: '#ef5350',
          gradientStart: '#4285f4', // Google Blue
          gradientEnd: '#9c27b0',   // Purple
        }
      },
      fontFamily: {
        sans: ['Inter', 'Google Sans', 'Roboto', 'sans-serif'], // Clean, modern fonts
      },
      boxShadow: {
        'soft-glow': '0 0 40px -10px rgba(66, 133, 244, 0.15)', // Blue glow
        'card-hover': '0 8px 30px rgba(0,0,0,0.4)',
        'surface': '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
      },
      backgroundImage: {
        'gradient-gemini': 'linear-gradient(135deg, rgba(66, 133, 244, 0.1) 0%, rgba(156, 39, 176, 0.1) 100%)',
        'btn-gradient': 'linear-gradient(90deg, #4285f4 0%, #7c4dff 100%)',
      }
    },
  },
  plugins: [],
}