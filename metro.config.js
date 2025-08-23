const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration with minification DISABLED and ES5 output
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  transformer: {
    // Completely disable minification and force ES5
    minifierPath: require.resolve('metro-minify-terser'),
    minifierConfig: {
      ecma: 5, // Force ES5 output to avoid export issues
      keep_fnames: true,
      mangle: false,
      compress: false,
      output: {
        ascii_only: true,
        comments: true,
        beautify: true,
        ecma: 5,
      },
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
