const merge = require('webpack-merge');
const ExtracTextPlugin = require('extract-text-webpack-plugin');
const base = require('./webpack.base');

const config = merge.smart(base, {
  module: {
    rules: [
      {
        test: /\.css/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        })
      },
      {
        test: /\.less$/,
        use: ExtracTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true
              },
            },
            'less-loader',
          ],
        }),
      },
    ],
  }
});

config.plugins.push(new ExtracTextPlugin('[name].css'));

module.exports = config;