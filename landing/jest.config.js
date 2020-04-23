const path = require("path");

module.exports = {
  roots: ["<rootDir>"],
  testRegex: "/__tests__/.*\\.spec\\.[jt]sx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "^@/(.+)$": path.join(__dirname, "/src", "$1"),
  },
  collectCoverage: true,
  collectCoverageFrom: ["./src/**/*"],
  coveragePathIgnorePatterns: ["./src/pages", ".*__snapshots__/.*"],
  setupFilesAfterEnv: ["./jest.setup.js"],
};
