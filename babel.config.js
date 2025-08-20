module.exports = {
  presets: ['@react-native/babel-preset'],
  plugins: [
    ['@babel/plugin-transform-runtime', {
      helpers: true,
      regenerator: true,
    }],
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-transform-arrow-functions',
    '@babel/plugin-transform-block-scoped-functions',
    '@babel/plugin-transform-classes',
    '@babel/plugin-transform-template-literals',
  ],
};ule.exports = {
  presets: ['module:@react-native/babel-preset'],
};
