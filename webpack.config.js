const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = {
  entry: [
    './node_modules/webpack-dev-server/client?http://localhost:9000',
    './node_modules/webpack/hot/dev-server',
    './src/js/index.js',
    './src/shared/styles/main.scss'
  ],
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, './dist')
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist/'),
    compress: true,
    port: 9000
  },
  module: {
    rules: [
      /*
      your other rules for JavaScript transpiling go in here
      */
      { // css / sass / scss loader for webpack
        test: /\.(css|sass|scss)$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([
      {
        from: 'src/**/*.html',
        to: './',
        flatten: true
      },
      {
        from: 'src/static/',
        to: './static/'
      }
    ]),
    new ExtractTextPlugin({ // define where to save the file
      filename: '[name].css',
      allChunks: true
    }),
    new WriteFilePlugin({
      test: /^(?!.*(hot)).*/
    })
  ]
};
