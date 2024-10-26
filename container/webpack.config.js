const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

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
      name: 'container',
      remotes: {
        productListings: 'productListings@http://localhost:3001/remoteEntry.js',
        userAuth: 'userAuth@http://localhost:3002/remoteEntry.js',
        shoppingCart: 'shoppingCart@http://localhost:3003/remoteEntry.js',
        orderHistory: 'orderHistory@http://localhost:3004/remoteEntry.js',
      },
      shared: ['react', 'react-dom', 'redux', 'react-redux'],
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
