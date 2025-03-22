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
        // Add custom colors
        'cosmic-purple': '#8B5CF6',
        'cosmic-blue': '#3B82F6',
        'cosmic-pink': '#EC4899',
        'cosmic-teal': '#0D9488',
        'dark-space': '#070B34',
        'nebula': '#0D1445',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'float-particle': 'float-particle 5s ease-in-out infinite',
        'glitch-1': 'glitch-1 2s infinite linear alternate-reverse',
        'glitch-2': 'glitch-2 3s infinite linear alternate-reverse',
        'data-stream': 'data-stream 8s linear infinite',
      },
      boxShadow: {
        'glow': '0 0 15px rgba(139, 92, 246, 0.5), 0 0 10px rgba(139, 92, 246, 0.3)',
        'glow-blue': '0 0 15px rgba(59, 130, 246, 0.5), 0 0 10px rgba(59, 130, 246, 0.3)',
        'glow-pink': '0 0 15px rgba(236, 72, 153, 0.5), 0 0 10px rgba(236, 72, 153, 0.3)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}; 