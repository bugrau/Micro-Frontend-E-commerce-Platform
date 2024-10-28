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

    port: 3002,  // Keep this as 3002 for consistency with the architecture

    historyApiFallback: true,

    headers: {

      'Access-Control-Allow-Origin': '*',

    }

  },

  output: {

    publicPath: 'http://localhost:3002/',

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

      name: 'shopping_cart',

      filename: 'remoteEntry.js',

      exposes: {

        './ShoppingCart': './src/ShoppingCart',

        './cartSlice': './src/cartSlice'

      },

      shared: {

        ...deps,

        react: { singleton: true, eager: true, requiredVersion: deps.react },

        'react-dom': { singleton: true, eager: true, requiredVersion: deps['react-dom'] },

        '@reduxjs/toolkit': { singleton: true, eager: true, requiredVersion: deps['@reduxjs/toolkit'] },

        'react-redux': { singleton: true, eager: true, requiredVersion: deps['react-redux'] },

        'styled-components': { singleton: true, eager: true, requiredVersion: deps['styled-components'] }

      }

    }),

    new HtmlWebpackPlugin({

      template: './public/index.html',

    }),

  ],

};
