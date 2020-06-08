module.exports = {
  moduleNameMapper: {
    "@/(.*)$": "<rootDir>/src/$1",
  },
  // defining only *.spec.* files to be regarded as tests files
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec).[jt]s?(x)"],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
};
