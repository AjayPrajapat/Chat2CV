module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          alias: {
            '@app': './src/app',
            '@components': './src/components',
            '@navigation': './src/navigation',
            '@store': './src/store',
            '@services': './src/services',
            '@utils': './src/utils',
            '@templates': './src/templates',
            '@types': './src/types',
            '@i18n': './src/i18n'
          }
        }
      ]
    ]
  };
};
