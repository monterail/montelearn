module.exports = {
  purge: ["./src/**/*.jsx", "./src/**/*.tsx"],
  theme: {
    extend: {
      boxShadow: {
        custom:
          "0px 1.59602px 5.18708px rgba(0, 0, 0, 0.0161557), 0px 5.36071px 17.4223px rgba(0, 0, 0, 0.0238443), 0px 24px 78px rgba(0, 0, 0, 0.04)",
      },
      fontFamily: {
        playfair: ["Playfair Display", "serif"],
        roboto: ["Roboto", "sans-serif"],
        "roboto-mono": ["Roboto Mono", "sans-serif"],
        eczar: ["Eczar", "serif"],
      },
      fontSize: {
        title: "80px",
      },
      colors: {
        gray: {
          "100": "var(--color-gray-100)",
          "200": "var(--color-gray-200)",
          "300": "var(--color-gray-300)",
          athens: "var(--color-gray-athens)",
        },
        green: {
          "100": "var(--color-green-100)",
          "200": "var(--color-green-200)",
        },
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
          monterail: "var(--color-monterail)",
        },
      },
    },
  },
  variants: {},
  plugins: [],
};
