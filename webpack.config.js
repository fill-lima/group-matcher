const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const devMode = process.env.NODE_ENV === 'development';

const config = {
  mode: 'development',
  devtool: devMode ? 'source-map' : null,
  entry: {
    app: path.join(__dirname, 'src/App')
  },
  output: {
    filename: devMode ? '[name].bundle.js' : '[name].[hash].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development'
            }
          },
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors'
        },
        default: false
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'AI City',
      template: path.join(__dirname, 'src/views/home.html')
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].bundle.css' : '[name].[hash].bundle.css'
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 3000
  }
};

module.exports = config;
