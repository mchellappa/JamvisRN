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
      // Allow modern syntax but target older runtimes
      ecma: 2015, // Allow ES6 parsing but output ES5-compatible code
      compress: {
        ecma: 5, // Ensure compression is ES5-compatible
      },
      output: {
        ecma: 5, // Ensure output is ES5-compatible
      },
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
