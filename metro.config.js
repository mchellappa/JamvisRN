const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration for maximum backward compatibility
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  transformer: {
    // Disable minification completely to avoid ES6 parsing issues
    minifierPath: require.resolve('metro-minify-terser'),
    minifierConfig: {
      keep_fnames: true,
      mangle: false, // Disable mangling
      compress: false, // Disable compression
      // Parse ES6 but output ES5
      ecma: 2015, 
      output: {
        ecma: 5, // Force ES5 output
        ascii_only: true, // Ensure ASCII-only output
      },
    },
  },
  resolver: {
    // Ensure we resolve the right platform files
    platforms: ['android', 'native', 'web', 'ios'],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
