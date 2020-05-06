module.exports = {
  purge: ["./src/**/*.jsx", "./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        playfair: ["Playfair Display", "serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        white: {
          default: "var(--color-white)",
        },
        black: {
          default: "var(--color-black)",
        },
        red: {
          "100": "var(--color-red-100)",
          "200": "var(--color-red-200)",
          "300": "var(--color-red-300)",
          "400": "var(--color-red-400)",
        },
      },
    },
  },
  variants: {},
  plugins: [],
};
