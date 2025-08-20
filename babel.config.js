module.exports = {
  presets: ['@react-native/babel-preset'],
  plugins: [
    // Transform ES6 modules to CommonJS for maximum compatibility
    '@babel/plugin-transform-modules-commonjs',
  ],
};
