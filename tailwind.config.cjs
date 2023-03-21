/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        Alegreya: 'Alegreya, serif',
        'Noto-Serif': 'Noto Serif, serif',
      },
    },
  },
  plugins: [],
};
