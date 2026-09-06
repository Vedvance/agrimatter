/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kisan: {
          50: '#f2f9f1',
          100: '#e1f2df',
          200: '#c5e5c2',
          300: '#9acf96',
          400: '#6db367',
          500: '#4c9745',
          600: '#3a7b34',
          700: '#2f622b',
          800: '#284e25',
          900: '#224120',
        },
        earth: {
          50: '#fbf8f3',
          100: '#f5efe4',
          200: '#eadfca',
          300: '#dcbe9f',
          400: '#c99a6f',
          500: '#b67e4b',
          600: '#9b643e',
          700: '#7d4d34',
          800: '#673f2f',
          900: '#553629',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
