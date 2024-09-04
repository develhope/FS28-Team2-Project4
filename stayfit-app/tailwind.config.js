/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
        'custom-blue': '#94B7BD',
        'custom-green': '#C1FF72',
        'custom-dark' : '#01181B',
        'hover-orange' : '#FF7272',
        'light-blue': '#01282F',
        'primary-blue': '#001E23',
        'white' : '#FFFFFF',
      },
  },
  plugins: [],
}

