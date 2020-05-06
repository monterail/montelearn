const envalid = require("envalid");
const path = require("path");

function getConfigEnv() {
  return envalid.cleanEnv(
    process.env,
    {
      API_URL: envalid.url(),
    },
    {
      dotEnvPath: path.join(__dirname, "..", ".env"),
    },
  );
}

// Filter env variables for Next config.
// https://github.com/zeit/next.js/blob/master/errors/env-key-not-allowed.md
function filterEnvForNextjs(allEnv) {
  const env = {};

  for (const envName in allEnv) {
    if (!/^(__|NODE_)/.test(envName)) {
      env[envName] = allEnv[envName];
    }
  }

  return env;
}

function getCleanEnv() {
  return filterEnvForNextjs(getConfigEnv());
}

module.exports = {
  filterEnvForNextjs,
  getConfigEnv,
  getCleanEnv,
};
