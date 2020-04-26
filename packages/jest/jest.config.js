const path = require("path");

const cwd = process.cwd();

module.exports = {
  rootDir: cwd,
  roots: ["<rootDir>"],
  testRegex: "/__tests__/.*\\.spec\\.[jt]sx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "^@/(.+)$": path.join(cwd, "src", "$1"),
  },
  collectCoverage: true,
  collectCoverageFrom: ["./src/**/*"],
  coveragePathIgnorePatterns: ["./src/pages", ".*__snapshots__/.*"],
  setupFilesAfterEnv: [path.join(__dirname, "jest.setup.js")],
};
