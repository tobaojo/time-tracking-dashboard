/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html", // Matches all HTML files in the root directory
    "./src/**/*.{js,ts}",
    "./css/**/*.css",
  ],
  theme: {
    extend: {
      fontFamily: {
        rubik: ["Rubik", "sans-serif"],
      },
      colors: {
        customBlue: "hsl(246, 80%, 60%)",
        customLightOrange: "hsl(15, 100%, 70%)",
        customSoftBlue: "hsl(195, 74%, 62%)",
        customLightRed: "hsl(348, 100%, 68%)",
        customLimeGreen: "hsl(145, 58%, 55%)",
        customViolet: "hsl(264, 64%, 52%)",
        customSoftOrange: "hsl(43, 84%, 65%)",
        customVeryDarkBlue: "hsl(226, 43%, 10%)",
        customDarkBlue: "hsl(235, 46%, 20%)",
        customDesaturatedBlue: "hsl(235, 45%, 61%)",
        customPaleBlue: "hsl(236, 100%, 87%)",
        hoverBlue: "hsl(235, 41%, 34%)",
      },
    },
  },
  plugins: [],
};
