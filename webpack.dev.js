const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const ExtractTextPlugin = require('extract-text-webpack-plugin'); //installed via npm

module.exports = {
  mode: 'development',
  entry: {
    app: './src/app.js',
    history: './src/history.js'
  },
  module: {
    rules: [
      {
        test: /\.(html)$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract([
          'css-loader',
          'sass-loader',
          'postcss-loader'
        ])
      }
    ]
  },
  devServer: {
    contentBase: './build'
  },
  devtool: 'inline-source-map',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build')
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      chunks: ['app']
    }),
    new HtmlWebpackPlugin({
      filename: 'history.html',
      template: './src/history.html',
      chunks: ['history']
    }),
    new ExtractTextPlugin('styles.css')
  ]
};
