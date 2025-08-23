const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration with minification DISABLED
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  transformer: {
    // Completely disable minification
    minifierPath: require.resolve('metro-minify-terser'),
    minifierConfig: {
      ecma: 8,
      keep_fnames: true,
      mangle: false,
      compress: false,
      output: {
        ascii_only: false,
        comments: true,
        beautify: true,
      },
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
