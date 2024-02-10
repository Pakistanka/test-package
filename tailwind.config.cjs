// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary': '#612dbf',
        'primary-focus': "#5223a6",
        'light-gray': "#b5b5b5",
        'lighter-gray': "#F6F7F9",
        'fluidGreen': '#01d4b3',
        'fluidBlue': '#4361ee',
        'fadedBlue': "#bbc2e5",
        'fadedTurqoise': '#2a9eb5',
        'fadedGreen': '#bde4de',
        'dark-gray': '#1c1b1b',
        'darker-gray': '#262626',
        'turqoise': '#238092',
        'turqoise-focus': '#1e6370'
      },
      screens: {
        '2xl': '2000px'
      }
    },
    fontFamily: {
      'sans': ['poppins', 'sans-serif'],
      'bold': ['poppins-bold', 'poppins', 'sans-serif'],
      'exBold': ['poppins-ex-bold', 'poppins-bold', 'poppins', 'sans-serif'],
      'exBoldItalic': ['poppins-ex-bold-italic', 'poppins-bold', 'poppins', 'sans-serif']
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        'light': {
          "primary": "#612dbf",
          "primary-focus": "#5223a6",
          "primary-content": "#ffffff",
          "secondary": "#f000b8",
          "secondary-focus": "#bd0091",
          "secondary-content": "#ffffff",
          "accent": "#37cdbe",
          "accent-focus": "#2aa79b",
          "accent-content": "#ffffff",
          "neutral": "#2a2e37",
          "neutral-focus": "#16181d",
          "neutral-content": "#ffffff",
          "base-100": "#3d4451",
          "base-200": "#2a2e37",
          "base-300": "#16181d",
          "base-content": "#ebecf0",
          "info": "#66c6ff",
          "success": "#87d039",
          "warning": "#e2d562",
          "error": "#ff6f6f"
        },
        'dark': {
          "primary": "#238092",
          "primary-focus": "#1e6370",
        }
      },
    ]
  },
};


