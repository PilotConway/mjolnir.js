// This file contains webpack configuration settings that allow
// examples to be built against the mjolnir.js source code in this repo instead
// of building against their installed version of mjolnir.js.
//
// This enables using the examples to debug the main mjolnir.js library source
// without publishing or npm linking, with conveniences such hot reloading etc.

const {resolve} = require('path');

const LIB_DIR = resolve(__dirname, '..');
const SRC_DIR = resolve(LIB_DIR, './src');

// Support for hot reloading changes to the mjolnir.js library:
const LOCAL_DEVELOPMENT_CONFIG = {
  // suppress warnings about bundle size
  devServer: {
    stats: {
      warnings: false
    }
  },

  resolve: {
    alias: {
      // Imports the mjolnir.js library from the src directory in this repo
      'mjolnir.js': SRC_DIR
    }
  },
  module: {
    rules: []
  }
};

function addLocalDevSettings(config) {
  Object.assign(config.resolve.alias, LOCAL_DEVELOPMENT_CONFIG.resolve.alias);
  config.module.rules = config.module.rules.concat(LOCAL_DEVELOPMENT_CONFIG.module.rules);
  return config;
}

module.exports = baseConfig => env => {
  const config = baseConfig;
  if (env && env.local) {
    addLocalDevSettings(config);
  }
  return config;
};
