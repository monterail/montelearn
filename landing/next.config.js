const path = require("path");

const { getCleanEnv } = require("./env");

module.exports = {
  env: getCleanEnv(),
  // We don't care about Typescript errors during development process.
  typescript: {
    ignoreDevErrors: true,
  },
  webpack(config) {
    /* eslint-disable-next-line no-param-reassign */
    config.resolve.alias["@"] = path.join(__dirname, "src");
    return config;
  },
};
