const path = require("path");

const { getCleanEnv } = require("./env");

module.exports = {
  env: getCleanEnv(),
  typescript: {
    // We don't care about Typescript errors during development process.
    ignoreDevErrors: true,
  },
  webpack(config) {
    /* eslint-disable-next-line no-param-reassign */
    config.resolve.alias["@"] = path.join(__dirname, "src");
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: ["@svgr/webpack"],
    });
    return config;
  },
  experimental: {
    async redirects() {
      return [
        {
          source: "/password-reset/:uid/:token/",
          destination: "/users/reset-password?uid=:uid&token=:token",
          statusCode: 302,
        },
      ];
    },
  },
};
