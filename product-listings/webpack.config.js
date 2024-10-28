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

    port: 3001,

    historyApiFallback: true,

    headers: {

      'Access-Control-Allow-Origin': '*',

    }

  },

  output: {

    publicPath: 'http://localhost:3001/',

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

      name: 'product_listings',

      filename: 'remoteEntry.js',

      remotes: {

        'shopping-cart': 'shopping_cart@http://localhost:3002/remoteEntry.js'

      },

      exposes: {

        './ProductListings': './src/ProductListings',

        './productSlice': './src/productSlice',

        './store': './src/store'

      },

      shared: {

        react: { singleton: true, eager: true },

        'react-dom': { singleton: true, eager: true },

        '@reduxjs/toolkit': { singleton: true, eager: true },

        'react-redux': { singleton: true, eager: true },

        'styled-components': { singleton: true, eager: true }

      },

    }),

    new HtmlWebpackPlugin({

      template: './public/index.html',

    }),

  ],

};
