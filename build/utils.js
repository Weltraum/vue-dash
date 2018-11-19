const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const resolve = exports.resolve = (dir) => {
  return path.join(__dirname, '..', dir);
};

exports.cssLoaders = (options) => {
  options = options || {};

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  };

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap,
      plugins: () => [autoprefixer({'browsers': ['> 1%', 'last 2 versions']})]
    }
  };

  const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader];
  const generateLoaders = getStyleGenerator(loaders, options);
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    sass: generateLoaders('sass', {
      indentedSyntax: true,
      data: '@import "mixins"; @import "vars";',
      includePaths: [`${resolve('src')}/uikit`]
    })
  };
};

const getStyleGenerator = (loaders, options) => {
  return (loader, loaderOptions) => {
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      });
    }

    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      });
    } else {
      return ['vue-style-loader'].concat(loaders);
    }
  };
};
