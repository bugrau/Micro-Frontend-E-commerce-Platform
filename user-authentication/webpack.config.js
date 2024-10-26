const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  entry: './src/index',
  mode: 'development',
  devServer: {
    port: 3003,
  },
  output: {
    publicPath: 'http://localhost:3003/',
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
      name: 'user_authentication',
      filename: 'remoteEntry.js',
      exposes: {
        './UserAuthentication': './src/UserAuthentication',
        './authSlice': './src/authSlice',
      },
      shared: ['react', 'react-dom', '@reduxjs/toolkit', 'react-redux'],
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
