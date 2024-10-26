const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  entry: './src/index',
  mode: 'development',
  devServer: {
    port: 3004,
  },
  output: {
    publicPath: 'http://localhost:3004/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'order_history',
      filename: 'remoteEntry.js',
      exposes: {
        './OrderHistory': './src/OrderHistory',
        './orderSlice': './src/orderSlice',
      },
      shared: ['react', 'react-dom', '@reduxjs/toolkit', 'react-redux'],
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
