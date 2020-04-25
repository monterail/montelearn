#!/usr/bin/env node
const cps = require("child_process");
const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
const eslintConfigPathInContext = path.join(process.cwd(), "eslint.config.js");

const eslintConfigPath = fs.existsSync(eslintConfigPathInContext)
  ? eslintConfigPathInContext
  : path.join(__dirname, "eslint.config.js");

try {
  cps.execSync(
    `npx eslint --no-error-on-unmatched-pattern --config '${eslintConfigPath}' ${args.join(" ")}`,
    {
      stdio: "inherit",
    },
  );
} catch {
  process.exit(1);
}
