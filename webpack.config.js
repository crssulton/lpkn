var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {
  entry: {
    app: [
      'webpack-dev-server/client?http://localhost:8000',
      'webpack/hot/only-dev-server',
      './app/index'
    ],
    vendor: []
  },
  devtool: '',
  output: {
    path: path.join(__dirname, '/public/'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      '$': "jquery",
      'jQuery': "jquery",
      'window.jQuery': "jquery",
      'window.$': 'jquery'

    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js', Infinity),
    // new webpack.DefinePlugin({
    //   "require.specified": "require.resolve"
    // }),
    new webpack.DefinePlugin({ // <-- key to reducing React's size
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.DedupePlugin(), //dedupe similar code
    new webpack.optimize.UglifyJsPlugin(), //minify everything
    new webpack.optimize.AggressiveMergingPlugin(),//Merge chunks
  ],
  module: {
    noParse: [],
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, 'app')
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')

      },
      {
        test: /\.(png|jpg|gif)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.(eot|com|json|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
      }
    ]
  },
  resolve: {
    alias: { 'react/lib/ReactMount': 'react-dom/lib/ReactMount' }
  }
}

module.exports = config;
