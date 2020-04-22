const path = require("path");

module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    "airbnb-typescript",
    "prettier",
    "plugin:prettier/recommended",
    "prettier/react",
    "prettier/@typescript-eslint",
  ],
  plugins: ["@typescript-eslint", "jest"],
  env: {
    browser: true,
    node: true,
    "jest/globals": true,
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      alias: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
        map: [["@", path.join(__dirname, "src")]],
      },
    },
  },
  rules: {
    "@typescript-eslint/quotes": ["error", "double"],
    "import/prefer-default-export": "off",
    "no-restricted-syntax": "off",
    "prettier/prettier": ["error"],
    "react/jsx-one-expression-per-line": "off",
    "react/jsx-props-no-spreading": "off",
    "react/no-array-index-key": "off",
    "react/no-danger": "off",
    "react/no-unescaped-entities": "off",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
  },
};
