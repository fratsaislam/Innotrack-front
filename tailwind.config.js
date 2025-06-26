/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        colors: {
          'custom-dark': '#191b2b',
          'custom-orange': '#ff3a27',
          'custom-light': '#8a95c9',
          'custom-light-orange': '#eb594b',
        },
        borderRadius: {
          '2xl': '0.95rem',
        },
        fontFamily: {
          'epilogue': ['Epilogue', 'sans-serif'],
          'raleway': ['Raleway', 'sans-serif'],
        },
        animation: {
          'fadeIn': 'fadeIn 2s ease-in-out',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
          }
        }
      },
    },
    plugins: [],
  }