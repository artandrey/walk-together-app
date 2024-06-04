module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    'module:react-native-dotenv',
    [
      '@babel/plugin-proposal-decorators',
      {
        version: 'legacy', // Use the legacy version
      },
    ],
    [
      '@babel/plugin-proposal-class-properties',
      {
        loose: true, // Enable loose mode
      },
    ],
  ],
};
