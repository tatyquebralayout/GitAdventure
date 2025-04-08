/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        github: {
          dark: '#ffffff',
          darker: '#f6f8fa',
          border: '#d0d7de',
          muted: '#656d76',
          accent: '#0969da',
          success: '#1a7f37',
          text: {
            primary: '#1F2328',
            secondary: '#656d76'
          }
        }
      },
      boxShadow: {
        'github': '0 1px 0 rgba(27,31,36,0.04)',
        'github-medium': '0 3px 6px rgba(140,149,159,0.15)',
        'github-heavy': '0 8px 24px rgba(140,149,159,0.2)'
      },
      backgroundImage: {
        'gradient-stars': 'radial-gradient(circle at 50% 50%, rgba(9, 105, 218, 0.1) 0%, rgba(255, 255, 255, 0) 100%)',
        'gradient-dark': 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #ffffff 100%)',
        'gradient-glow': 'radial-gradient(circle at 50% 0%, rgba(9, 105, 218, 0.05) 0%, rgba(255, 255, 255, 0) 70%)'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};