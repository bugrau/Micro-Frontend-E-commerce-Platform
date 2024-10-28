const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const path = require('path');
const deps = require('./package.json').dependencies;

module.exports = {
  entry: './src/index.tsx',
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    port: 3005,
    historyApiFallback: true,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  },
  output: {
    publicPath: 'http://localhost:3005/',
    filename: '[name].[contenthash].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'navigation',
      filename: 'remoteEntry.js',
      remotes: {
        'product-listings': 'product_listings@http://localhost:3001/remoteEntry.js',
        'shopping-cart': 'shopping_cart@http://localhost:3002/remoteEntry.js',
        'user-authentication': 'user_authentication@http://localhost:3003/remoteEntry.js',
        'order-history': 'order_history@http://localhost:3004/remoteEntry.js'
      },
      exposes: {
        './Navigation': './src/Navigation',
        './ErrorBoundary': './src/ErrorBoundary'
      },
      shared: {
        ...deps,
        react: { singleton: true, eager: true, requiredVersion: deps.react },
        'react-dom': { singleton: true, eager: true, requiredVersion: deps['react-dom'] },
        '@reduxjs/toolkit': { singleton: true, eager: true, requiredVersion: deps['@reduxjs/toolkit'] },
        'react-redux': { singleton: true, eager: true, requiredVersion: deps['react-redux'] },
        'react-router-dom': { singleton: true, eager: true, requiredVersion: deps['react-router-dom'] },
        'styled-components': { singleton: true, eager: true, requiredVersion: deps['styled-components'] }
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  optimization: {
    moduleIds: 'named',
  }
};


