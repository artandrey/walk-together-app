module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    'module:react-native-dotenv',
    ['@babel/plugin-transform-flow-strip-types'],
    ['@babel/plugin-proposal-decorators', {legacy: true}],
    // ['@babel/plugin-transform-class-static-block'],
    ['@babel/plugin-transform-class-properties', {loose: true}],
  ],
};
