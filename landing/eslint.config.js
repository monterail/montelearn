const path = require("path");
const fs = require("fs");

const cwd = process.cwd();
const tsconfigPaths = [path.join(cwd, "tsconfig.eslint.json"), path.join(cwd, "tsconfig.json")];

function getTsconfigPath() {
  for (const tsconfigPath of tsconfigPaths) {
    if (fs.existsSync(tsconfigPath)) {
      return tsconfigPath;
    }
  }

  return undefined;
}

module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: getTsconfigPath(),
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
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
        map: [["@", path.join(cwd, "src")]],
      },
    },
  },
  rules: {
    "@typescript-eslint/quotes": ["error", "double"],
    "import/prefer-default-export": "off",
    "no-restricted-syntax": "off",
    "prettier/prettier": [
      "error",
      {
        printWidth: 100,
        semi: true,
        singleQuote: false,
        tabWidth: 2,
        trailingComma: "all",
      },
      { usePrettierrc: false },
    ],
    "react/jsx-one-expression-per-line": "off",
    "react/jsx-props-no-spreading": "off",
    "react/no-array-index-key": "off",
    "react/no-danger": "off",
    "react/no-unescaped-entities": "off",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
  },
};
