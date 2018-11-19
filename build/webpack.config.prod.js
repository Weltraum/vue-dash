const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const dist = path.resolve(__dirname, '../', 'dist');
const statics = path.resolve(__dirname, '../', 'static');
const html = path.resolve(__dirname, '../', 'dist', 'index.html');

module.exports = merge(baseWebpackConfig, {
  devtool: false,
  output: {
    path: dist,
    filename: 'js/[name].[chunkhash].js',
    chunkFilename: 'js/[id].[chunkhash].js'
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {root: path.resolve(__dirname, '../')}),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env.NODE_ENV)
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: false,
      parallel: true
    }),
    new ExtractTextPlugin({
      filename: 'css/[name].[chunkhash].css',
      allChunks: true
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: {safe: true}
    }),
    new HtmlWebpackPlugin({
      filename: html,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: 'dependency'
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new CopyWebpackPlugin([
      {
        from: statics,
        to: 'static',
        ignore: ['.*']
      }
    ])
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          name: 'vendor',
          test: 'vendor',
          enforce: true
        }
      }
    }
  }
});