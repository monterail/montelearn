const path = require("path");

module.exports = {
  roots: ["<rootDir>"],
  testRegex: "/__tests__/.*\\.spec\\.[jt]sx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "^@/(.+)$": path.join(__dirname, "/src", "$1"),
  },
  setupFilesAfterEnv: ["./jest.setup.js"],
};
