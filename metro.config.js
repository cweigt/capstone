const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add support for Firebase
config.resolver.sourceExts = [...config.resolver.sourceExts, 'mjs', 'cjs'];

// Ensure Hermes is properly configured
config.transformer = {
  ...config.transformer,
  minifierConfig: {
    keep_classnames: true,
    keep_fnames: true,
    mangle: {
      keep_classnames: true,
      keep_fnames: true,
    },
  },
};

module.exports = config; 