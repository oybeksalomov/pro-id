/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'gt-walsheim': ["'gt-walsheim-pro'", 'sans-serif'],
        'gt-walsheim-medium': ["'gt-walsheim-pro-medium'", 'sans-serif'],
        'gt-walsheim-bold': ["'gt-walsheim-pro-bold'", 'sans-serif'],
      },
      colors: {
        "base-color": '#5FE0D8',
        "text-black": "#222222",
        "text-red": "#FF0000",
        "bg-black": "#303030",
        "base-bg": "#F6F5F7",
        "border-gray": "#ACACAC"
      },

    },
  },
  plugins: [],
}

