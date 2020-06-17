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

function createEslintConfig() {
  const config = {
    parser: "babel-eslint",
    parserOptions: {
      ecmaVersion: 2018,
      sourceType: "module",
      ecmaFeatures: {
        jsx: true,
      },
    },
    extends: ["airbnb", "prettier", "plugin:prettier/recommended", "prettier/react"],
    plugins: ["jest"],
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
    overrides: [
      {
        files: ["*.spec.js", "*.spec.jsx"],
        rules: {
          "import/no-extraneous-dependencies": "off",
        },
      },
    ],
    rules: {
      "no-plusplus": "off",
      "jsx-a11y/click-events-have-key-events": "off",
      "jsx-a11y/no-static-element-interactions": "off",
      "no-param-reassign": "off",
      "no-underscore-dangle": "off",
      "jsx-a11y/anchor-is-valid": "off",
      "import/prefer-default-export": "off",
      "no-restricted-syntax": "off",
      "@typescript-eslint/camelcase": "off",
      "no-await-in-loop": "off",
      "import/no-extraneous-dependencies": "off",
      "import/extensions": "off", // Remove when all .js files will be migrated to .ts
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
      "jsx-a11y/label-has-associated-control": [
        2,
        {
          components: ["label"],
          required: {
            some: ["nesting", "id"],
          },
          allowChildren: false,
        },
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

  // Modify config for use with Typescript.
  if (useTs) {
    config.parser = "@typescript-eslint/parser";
    config.parserOptions.project = tsConfigPath;
    config.plugins.unshift("@typescript-eslint");
    config.extends.push("prettier/@typescript-eslint");

    // Replace "airbnb" with "airbnb-typescript".
    config.extends = config.extends.map((e) => (e === "airbnb" ? "airbnb-typescript" : e));
  }

  return config;
}

module.exports = createEslintConfig();
