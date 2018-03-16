const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineEnvironmentVariablesPlugin = require('inline-environment-variables-webpack-plugin');


/**
 * The webpack configuration for production.
 *
 * @type {Object}
 */
const configuration = {
  entry: {
    main: [
      'babel-polyfill', // Install babel-friendly environment
      'isomorphic-fetch', // Polyfill fetch
      './src/client.js' // Include our client source code
    ]
  },
  module: {
    loaders: [
      { exclude: /node_modules/, loader: 'strip-loader?strip[]=console.log!babel-loader!eslint-loader?failOnWarning=false&failOnError=false', test: /\.js$/ },
      { loader: 'style!css', test: /\.css$/ },
      { loader: 'json', test: /\.json/ },
      { loader: 'raw', test: /\.html/ },
      { loader: 'style!css?modules&importLoaders=1&localIdentName=[local]!postcss-loader!resolve-url-loader!sass?sourceMap', test: /\.scss/ },
      { loader: 'file?name=[name]-[md5:hash].[ext]', test: /\.gif$|\.jpg$|\.jpeg$|\.png|\.eot$|\.svg$|\.ttf|\.otf$|\.woff$|\.woff2$|\.pdf$/ }
    ]
  },
  postcss: () => {
    return [
      require('autoprefixer')
    ];
  },
  output: {
    chunkFilename: '[name]-[chunkhash].js',
    filename: '[name]-[chunkhash].js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/'
  },
  plugins: [
    // Define constants used throughout the codebase
    new InlineEnvironmentVariablesPlugin({ NODE_ENV: 'production' }, { warnings: false }),
    new webpack.DefinePlugin({
      __DEVELOPMENT__: false,
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production')
      }
    }),
    new CopyWebpackPlugin([
      { from: './dev/version.json', to: 'version.json' },
      { from: './dev/config.json', to: './config/config.json' },
    ]),
    // Protects against multiple React installs when npm linking
    new webpack.NormalModuleReplacementPlugin(/^react?$/, require.resolve('react')),
    // Optimization: remove duplicates
    new webpack.optimize.DedupePlugin(),
    // Optimization: aggressive merging
    new webpack.optimize.AggressiveMergingPlugin(),
    // Optimization: assign the module and chunk ids by occurrence count
    new webpack.optimize.OccurenceOrderPlugin(),
    // Optimization: in production we minify
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false,
        max_line_len: 0 // eslint-disable-line camelcase
      }
    }),
    // Generate index.html
    new HtmlWebpackPlugin({
      inject: 'body',
      minify: {},
      template: './webpackHtmlTemplate.html'
    })
  ],
  progress: true
};

module.exports = configuration;
