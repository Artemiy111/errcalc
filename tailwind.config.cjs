/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xs: '400px',
      ...defaultTheme.screens,
    },
    container: {
      screens: {
        xs: '100%',
        md: '768px',
        lg: '900px',
      },
    },
  },
  plugins: [],
}
