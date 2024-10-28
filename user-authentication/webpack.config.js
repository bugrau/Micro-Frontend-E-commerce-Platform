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
    port: 3003,
    historyApiFallback: true,
  },
  output: {
    publicPath: 'auto', // Changed from hardcoded URL to auto
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
      name: 'user_authentication',
      filename: 'remoteEntry.js',
      exposes: {
        './UserAuthentication': './src/UserAuthentication',
        './authSlice': './src/authSlice',
        './store': './src/store'
      },
      shared: {
        ...deps,
        react: { 
          singleton: true, 
          requiredVersion: deps.react,
          eager: true
        },
        'react-dom': { 
          singleton: true, 
          requiredVersion: deps['react-dom'],
          eager: true
        },
        '@reduxjs/toolkit': { 
          singleton: true,
          requiredVersion: deps['@reduxjs/toolkit'],
          eager: true
        },
        'react-redux': { 
          singleton: true,
          requiredVersion: deps['react-redux'],
          eager: true
        },
        'styled-components': { 
          singleton: true,
          requiredVersion: deps['styled-components'],
          eager: true
        },
        'react-hook-form': {
          singleton: true,
          requiredVersion: deps['react-hook-form'],
          eager: true
        },
        '@hookform/resolvers': {
          singleton: true,
          requiredVersion: deps['@hookform/resolvers'],
          eager: true
        },
        'yup': {
          singleton: true,
          requiredVersion: deps['yup'],
          eager: true
        }
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
};
