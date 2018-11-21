const path = require('path');
const utils = require('./utils');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const {NODE_ENV} = process.env;
const isProduction = NODE_ENV === 'production';

const context = path.resolve(__dirname, '../');
const src = path.resolve(__dirname, '../', 'src');
const dist = path.resolve(__dirname, '../', 'dist');
const statics = path.resolve(__dirname, '../', 'static');

const styleLoaders = utils.cssLoaders({
  extract: isProduction,
  usePostCSS: true
});

module.exports = {
  mode: NODE_ENV,
  context,
  entry: {
    app: './src/index.js'
  },
  output: {
    path: dist,
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      app: src,
      components: path.join(src, 'components'),
      plugins: path.join(src, 'plugins'),
      modules: path.join(src, 'modules'),
      store: path.join(src, 'store'),
      pages: path.join(src, 'pages'),
      uikit: path.join(src, 'uikit'),
      services: path.join(src, 'services')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: styleLoaders
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          utils.resolve('src')
        ]
      },
      {
        test: /\.css$/,
        loaders: styleLoaders.css
      },
      {
        test: /\.sass$/,
        loaders: styleLoaders.sass
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.join(statics, 'img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(eot|otf|ttf|woff2?)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  node: {
    setImmediate: false,
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
};
