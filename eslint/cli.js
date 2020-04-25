#!/usr/bin/env node
const cps = require("child_process");
const path = require("path");

const argv = process.argv.slice(2);
const eslintConfigPath = path.join(__dirname, "/eslint.config.js");

try {
  cps.execSync(
    `npx eslint --no-error-on-unmatched-pattern --config '${eslintConfigPath}' ${argv.join(" ")}`,
    {
      stdio: "inherit",
    },
  );
} catch {
  process.exit(1);
}
