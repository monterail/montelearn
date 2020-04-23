const path = require("path");

module.exports = {
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    browser: true,
    node: true,
    "jest/globals": true
  },
  settings: {
    react: {
      version: "detect"
    },
    "import/resolver": {
      alias: {
        extensions: [".js", ".jsx"],
        map: [
          ["@", path.join(__dirname, "src")]
        ]
      }
    }
  },
  extends: ["airbnb", "airbnb/hooks", "prettier"],
  plugins: ["jest", "prettier"],
  rules: {
    "import/prefer-default-export": "off",
    "no-restricted-syntax": "off",
    "prettier/prettier": ["error"],
    "quotes": ["error", "double"],
    "react/jsx-one-expression-per-line": "off",
    "react/jsx-props-no-spreading": "off",
    "react/no-array-index-key": "off",
    "react/no-danger": "off",
    "react/no-unescaped-entities": "off",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off"
  }
}
