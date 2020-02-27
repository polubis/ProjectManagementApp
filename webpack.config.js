const path = require('path');

const { TsConfigPathsPlugin } = require('awesome-typescript-loader');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env, { mode }) => {
  const [PROD] = ['production'];
  console.log(`App is running in ${mode} mode`);

  const optimization =
    mode === PROD
      ? {
          runtimeChunk: 'single',
          splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
              default: false,
              
              vendor: {
                test: /[\\/]node_modules[\\/]/,
                name(module) {
                  // We creating here node_modules single package name
                  // We replacing @ with '' because some servers don't like @ - for ex. in @babel
                  return `npm.${module.context
                    .match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
                    .replace('@', '')}`;
                }
              }
            }
          }
        }
      : {};

  return {
    devtool: mode !== PROD && 'eval-source-map',
    entry: path.resolve(__dirname, 'src/index.tsx'),
    resolve: {
      extensions: ['.ts', '.tsx', '.js', 'json'],
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
    optimization,
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
          use: [
            {
              loader: 'html-loader'
            }
          ]
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
        favicon: './public/favicon.ico',
        inject: 'body'
      }),
      new InterpolateHtmlPlugin({
        PUBLIC_URL: 'public'
      }),
      new BundleAnalyzerPlugin({
        openAnalyzer: false
      })
    ],
    devServer: {
      historyApiFallback: true,
      port: 3000
    }
  };
};
