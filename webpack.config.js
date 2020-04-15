const path = require('path');

const { TsConfigPathsPlugin } = require('awesome-typescript-loader');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env, { mode }) => {
  const [PROD] = ['production'];

  console.log(`App is running in ${mode} mode`);

  const config = {
    mode,

    devtool: mode === PROD ? false : 'inline-source-map',

    entry: path.resolve(__dirname, 'src/index.tsx'),

    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      alias: {
        styles: path.resolve(__dirname, 'src/styles')
      },
      plugins: [new TsConfigPathsPlugin()]
    },

    output: {
      path: __dirname + '/dist',
      filename: '[name].[hash].js',
      publicPath: '/'
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'awesome-typescript-loader'
        },
        {
          test: /\.scss$/,
          exclude: path.resolve(__dirname, 'src/styles/'),
          use: [
            'style-loader',
            'css-modules-typescript-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                modules: {
                  localIdentName: '[local]___[hash:base64:5]'
                }
              }
            },
            'sass-loader'
          ]
        },
        {
          test: /\.scss$/,
          include: path.resolve(__dirname, 'src/styles/'),
          use: ['style-loader', 'css-loader', 'sass-loader']
        },
        {
          test: /\.html$/,
          use: ['html-loader']
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
          exclude: /node_modules/,
          use: ['file-loader?name=[name].[ext]']
        },
        {
          test: /\.(config)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        }
      ]
    },

    plugins: [
      new HtmlWebPackPlugin({
        template: './public/index.html',
        // favicon: './public/favicon.ico',
        inject: 'body',
        hash: true
      }),
      new InterpolateHtmlPlugin({
        PUBLIC_URL: 'public'
      })
    ],

    devServer: {
      historyApiFallback: true,
      port: 3000
    }
  };

  if (mode === PROD) {
    config.optimization = {
      splitChunks: {
        chunks: 'all',
        name: 'vendor'
      }
    };
  }

  if (mode !== PROD) {
    config.plugins.push(
      new BundleAnalyzerPlugin({
        openAnalyzer: false
      })
    );
  }

  return config;
};
