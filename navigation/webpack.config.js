const HtmlWebpackPlugin = require('html-webpack-plugin');







const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');







const path = require('path');















module.exports = {







  entry: './src/index',







  mode: 'development',







  devServer: {







    port: 3000,







  },







  output: {







    publicPath: 'http://localhost:3000/',







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







      name: 'navigation',







      filename: 'remoteEntry.js',







      remotes: {







        'product-listings': 'product_listings@http://localhost:3001/remoteEntry.js',







        'shopping-cart': 'shopping_cart@http://localhost:3002/remoteEntry.js',







        'user-authentication': 'user_authentication@http://localhost:3003/remoteEntry.js',







        'order-history': 'order_history@http://localhost:3004/remoteEntry.js',







      },







      shared: ['react', 'react-dom', 'react-router-dom', '@reduxjs/toolkit', 'react-redux'],







    }),







    new HtmlWebpackPlugin({







      template: './public/index.html',







    }),







  ],







  resolve: {







    extensions: ['.ts', '.tsx', '.js'],







    alias: {







      'product-listings': path.resolve(__dirname, '../product-listings/src'),







      'shopping-cart': path.resolve(__dirname, '../shopping-cart/src'),







      'user-authentication': path.resolve(__dirname, '../user-authentication/src'),







      'order-history': path.resolve(__dirname, '../order-history/src'),







      'common': path.resolve(__dirname, '../common'),







    },







  },







};














