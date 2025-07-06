/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f8f5',
          100: '#e8f1e8',
          200: '#d1e3d1',
          300: '#aecbae',
          400: '#83aa83',
          500: '#5d8a5d',
          600: '#476d47',
          700: '#3a573a',
          800: '#324732',
          900: '#2b3c2b',
          950: '#151f15',
        },
        secondary: {
          50: '#fdf5ef',
          100: '#fae8d9',
          200: '#f4ccb0',
          300: '#eca87d',
          400: '#e58149',
          500: '#df6526',
          600: '#cc4e1b',
          700: '#a93c17',
          800: '#8a3318',
          900: '#722d18',
          950: '#3d150b',
        },
      },
    },
  },
  plugins: [],
};