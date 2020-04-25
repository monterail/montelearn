const path = require("path");
const fs = require("fs");

const cwd = process.cwd();

function getTsconfigPath() {
  for (const filename of ["tsconfig.eslint.json", "tsconfig.json"]) {
    const tsconfigPath = path.join(cwd, filename);

    if (fs.existsSync(tsconfigPath)) {
      return tsconfigPath;
    }
  }

  return undefined;
}

const tsConfigPath = getTsconfigPath();
const useTs = !!tsConfigPath;

module.exports = {
  parser: useTs ? "@typescript-eslint/parser" : "babel-eslint",
  parserOptions: {
    project: tsConfigPath,
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    useTs ? "airbnb-typescript" : "airbnb",
    "prettier",
    "plugin:prettier/recommended",
    "prettier/react",
    useTs ? "prettier/@typescript-eslint" : undefined,
  ].filter(Boolean),
  plugins: useTs ? ["@typescript-eslint", "jest"] : ["jest"],
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
