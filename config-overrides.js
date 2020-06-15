/* config-overrides.js */
const { override, addWebpackAlias, addBabelPlugins, overrideDevServer, addLessLoader, fixBabelImports, disableEsLint } = require('customize-cra');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

class FilterCSSConflictingWarning {
  apply(compiler) {
    compiler.hooks.afterEmit.tap('FilterWarning', (compilation) => {
      compilation.warnings = (compilation.warnings || []).filter((warning) => {
        return !warning.message.includes('Conflicting order between:');
      });
    });
  }
}

const resolve = (dir) => {
  return path.join(__dirname, '.', dir);
};

const dateFormat = (date, format) => {
  var dateTime = new Date(date);
  var o = {
    'M+': dateTime.getMonth() + 1, //month
    'd+': dateTime.getDate(), //day
    'h+': dateTime.getHours(), //hour
    'm+': dateTime.getMinutes(), //minute
    's+': dateTime.getSeconds(), //second
    'q+': Math.floor((dateTime.getMonth() + 3) / 3), //quarter
    S: dateTime.getMilliseconds(), //millisecond
  };
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (dateTime.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
    }
  }
  return format;
};

const devServerConfig = () => (config) => {
  let options = {
    target: 'http://192.168.1.9:7500',
    changeOrigin: true,
    secure: false,
  };
  if (process.env.NODE_ENV === 'development') {
    let processArgv = process.argv;
    let _url = processArgv[processArgv.length - 1].match(/url=(.*)/);
    if (_url && _url.length >= 2) {
      options.target = `${_url[1]}`;
    }
  }
  return {
    historyApiFallback: true,
    ...config,
    port: 3000,
    proxy: {
      '/sys': options,
    },
  };
};

const debugePluginsLoader = () => (config) => {
  if (process.env.NODE_ENV === 'production') {
    const date = dateFormat(new Date().getTime(), 'yyyyMMddhhmm');
    config.output = Object.assign(config.output, {
      filename: config.output.filename.replace(/\/js/, `/js${date}`),
      chunkFilename: config.output.chunkFilename.replace(/\/js/, `/js${date}`),
    });
    config.optimization.minimizer.push(
      new TerserPlugin({
        sourceMap: false,
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
      })
    );
    config.plugins.push(
      new FilterCSSConflictingWarning(),
      new CompressionWebpackPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$|\.css$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
        threshold: 10240,
        minRatio: 0.8,
      })
    );
  }
  const path = require('path');
 
  const paths = require("react-scripts/config/paths");
  paths.appBuild = path.join(path.dirname(paths.appBuild), "docs");
  config.output.path = path.join(path.dirname(config.output.path), "docs");

  return config;
};

module.exports = {
  devServer: overrideDevServer(devServerConfig()),
  webpack: override(
    (config) => {
      config.output['publicPath'] = process.env.NODE_ENV === 'production' ? '/react_admin_template' : '/';
      return config;
    },
    ...addBabelPlugins(['@babel/plugin-proposal-decorators', { legacy: true }]),
    //配置别名
    addWebpackAlias({
      '@': resolve('src'),
    }),
    fixBabelImports('antd', {
      libraryName: 'antd',
      libraryDirectory: 'lib',
      style: true,
    }),
    addLessLoader({
        lessOptions: {javascriptEnabled: true}
    }),
    debugePluginsLoader(),
    disableEsLint()
  ),
};
