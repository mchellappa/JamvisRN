module.exports = {
  presets: ['@react-native/babel-preset'],
  plugins: [
    // Add class properties plugin for better compatibility
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-transform-private-methods', { loose: true }],
    ['@babel/plugin-transform-private-property-in-object', { loose: true }],
  ],
};
