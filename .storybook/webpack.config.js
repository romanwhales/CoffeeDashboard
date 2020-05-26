const path = require('path');
const TSDocgenPlugin = require('react-docgen-typescript-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = async ({ config, mode }) => {
  // `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.
  config.module.rules.push({
      test: /\.(ts|tsx)$/,
      include: [
        path.resolve(__dirname, '../src'),
      ],  
      loader: require.resolve('awesome-typescript-loader'),
      options: { configFileName: path.resolve(__dirname, './tsconfig.json') }
  });
  config.resolve.plugins = config.resolve.plugins || [];
  config.resolve.plugins.push(
    new TsconfigPathsPlugin({
      configFile: path.resolve(__dirname, '../tsconfig.json'),
    })
  );
  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};