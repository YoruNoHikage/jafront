var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: [
    'babel-polyfill',
    './src/index',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new ExtractTextPlugin('styles.css', { allChunks: true }),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss']
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    },{
      test: /\.json$/,
      loader: 'json'
    },{
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css?sourceMap!sass?sourceMap'),
      include: path.join(__dirname, 'scss')
    },{
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css?sourceMap&modules&localIdentName=[path][name]---[local]'),
      include: path.join(__dirname, 'css')
    },{
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "url-loader?limit=10000&minetype=application/font-woff"
    },{
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "file-loader"
    },{
      test: /\.png$/, loader: "url-loader?limit=100000"
    },{
      test: /\.jpg$/, loader: "file-loader"
    },]
  }
};
