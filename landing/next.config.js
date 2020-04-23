const path = require("path");
const env = require("./env");

module.exports = {
  env,
  webpack(config) {
    /* eslint-disable-next-line no-param-reassign */
    config.resolve.alias["@"] = path.join(__dirname, "src");
    return config;
  },
};
