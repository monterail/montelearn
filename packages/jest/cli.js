#!/usr/bin/env node
const cps = require("child_process");
const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
const jestConfigPathInContext = path.join(process.cwd(), "jest.config.js");

const jestConfigPath = fs.existsSync(jestConfigPathInContext)
  ? jestConfigPathInContext
  : path.join(__dirname, "jest.config.js");

try {
  cps.execSync(`npx jest --config '${jestConfigPath}' ${args.join(" ")}`, {
    stdio: "inherit",
  });
} catch {
  process.exit(1);
}
