var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/index',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    // new ExtractTextPlugin('/static/[name].css'),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss']
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['react-hot', 'babel'],
      include: path.join(__dirname, 'src')
    },{
      test: /\.scss$/,
      loader: 'style!css?sourceMap!sass?sourceMap',
      include: path.join(__dirname, 'scss')
    },{
      test: /\.css$/,
      loader: 'style!css?sourceMap&modules&localIdentName=[path][name]---[local]',
      include: path.join(__dirname, 'css')
    },{
      test: /\.png$/, loader: "url-loader?limit=100000"
    },{
      test: /\.jpg$/, loader: "file-loader"
    },]
  }
};
