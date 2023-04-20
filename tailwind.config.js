/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      transitionProperty: {
        position: "right,left,top,bottom,margin,padding",
      },
    },
  },
  plugins: [],
};
