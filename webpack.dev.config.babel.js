const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// Visualise modules.
const Visualizer = require('webpack-visualizer-plugin');

/**
 * The webpack configuration for development.
 *
 * @type {Object}
 */
const configuration = {
  devtool: 'eval', // Enable line-based sourcemaps
  entry: {
    main: [
      'babel-polyfill', // Install babel-friendly environment
      'isomorphic-fetch', // Polyfill fetch
      './src/client.js' // Include our client source code
    ]
  },
  module: {
    loaders: [
      { exclude: /node_modules/, loader: 'babel-loader!eslint-loader?failOnWarning=false&failOnError=false', test: /\.js$/ },
      { loader: 'style!css', test: /\.css$/ },
      { loader: 'json', test: /\.json/ },
      { loader: 'raw', test: /\.html/ },
      { loader: 'style!css?modules&importLoaders=1&localIdentName=[local]!postcss-loader!resolve-url-loader!sass?sourceMap', test: /\.scss/ },
      { loader: 'file?name=[name]-[md5:hash].[ext]', test: /\.gif$|\.jpg$|\.jpeg$|\.png|\.eot$|\.svg$|\.otf$|\.ttf$|\.woff$|\.woff2$|\.pdf$/ }
    ]
  },
  postcss: () => {
    return [
      require('autoprefixer')
    ];
  },
  devServer: {
    historyApiFallback: true
  },
  output: {
    chunkFilename: '[name]-[hash].js',
    filename: '[name]-[hash].js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/'
  },
  plugins: [
    // See localhost:3003/stats.html for the report.
    new Visualizer(),
    new CopyWebpackPlugin([
      { from: './dev/version.json', to: 'version.json' },
      { from: './dev/config.json', to: './config/config.json' }
    ]),
    // Define constants used throughout the codebase
    new webpack.DefinePlugin({
      __DEVELOPMENT__: JSON.stringify(true),
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    // Protects against multiple React installs when npm linking
    new webpack.NormalModuleReplacementPlugin(/^react?$/, require.resolve('react')),
    // Enable hot reload
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    // Optimization: remove duplicates
    new webpack.optimize.DedupePlugin(),
    // Optimization: aggressive merging
    new webpack.optimize.AggressiveMergingPlugin(),
    // Optimization: assign the module and chunk ids by occurrence count
    new webpack.optimize.OccurenceOrderPlugin(),
    // Generate index.html
    new HtmlWebpackPlugin({
      inject: 'body',
      minify: {},
      template: './webpackHtmlTemplate.html'
    })
  ],
  progress: false
};

module.exports = configuration;
