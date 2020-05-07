const path = require("path");

const { getCleanEnv } = require("./env");

module.exports = {
  env: getCleanEnv(),
  webpack(config) {
    /* eslint-disable-next-line no-param-reassign */
    config.resolve.alias["@"] = path.join(__dirname, "src");
    return config;
  },
};
