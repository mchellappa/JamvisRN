const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration for backward compatibility
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  transformer: {
    minifierPath: require.resolve('metro-minify-terser'),
    minifierConfig: {
      keep_fnames: true,
      mangle: {
        keep_fnames: true,
      },
      ecma: 5, // Target ES5 for backward compatibility
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
