const path = require('path');

const DefinePlugin = require('webpack').DefinePlugin;
const TsConfigPaths = require('awesome-typescript-loader').TsConfigPathsPlugin;

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  webpackFinal: async (config, mode) => {
    config.resolve.plugins.push(new TsConfigPaths({}));
    config.resolve.alias['styles'] = path.resolve(__dirname, '../src/styles');
    config.module.rules.push(
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
      },
      {
        test: /\.scss$/,
        exclude: path.resolve(__dirname, '../src/styles/'),
        use: [
          'style-loader',
          'css-modules-typescript-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]___[hash:base64:5]',
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, '../src/styles/'),
        use: ['style-loader', 'css-loader', 'sass-loader'],
      }
    );
    config.plugins.push(
      new DefinePlugin({
        __IMAGES_PATH__: mode === 'development' ? "'public/images'" : "'images'",
        __CORE_API_PATH__: "'https://pillar-api-dev.azurewebsites.net/api/'",
      })
    );
    return config;
  },
};
