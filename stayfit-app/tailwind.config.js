/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#001E23',
        'secondary-gray': '#868686',
        'secondary-green': '#C1FF72',
        'blurred-glass': '#94B7BD',
        'light-blue-shadow': '#01282F',
        'dark-blue-shadow': '#01181B',
        'hover-buttons-shadow': '#FF7272',
      },
    },
  },
  plugins: [],
};
