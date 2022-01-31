module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        body: ["Roboto"]
      }
    }
  },
  plugins: [require("tailwind-scrollbar")]
};
