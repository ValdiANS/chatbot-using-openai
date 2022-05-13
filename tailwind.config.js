module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bgPrimary: '#F7F7F7',
      },

      fontFamily: {
        'ibm-plex-serif': ['IBM Plex Serif', 'serif'],
      },

      screens: {
        xs: '480px',
      },
    },
  },
  plugins: [],
};
